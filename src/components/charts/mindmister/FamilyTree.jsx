import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a dark HSL color based on a given string.
 * - s: saturation percentage
 * - l: lightness percentage (lower = darker)
 */
function stringToHslColor(str, s = 60, l = 50) {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, ${s}%, ${l}%)`;
}

/**
 * Custom node renderer using foreignObject to render HTML.
 */
function renderCustomNode({ nodeDatum, toggleNode }) {
  const boxWidth = 160;
  const boxHeight = 60;

  return (
    <g>
      <foreignObject
        x={-boxWidth / 2}
        y={0}
        width={boxWidth}
        height={boxHeight}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          title={nodeDatum.name}
          onClick={toggleNode}
          style={{
            width: boxWidth,
            height: boxHeight,
            backgroundColor: nodeDatum?.bgColor || "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#282424",
            textAlign: "center",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textAlign: "left",
              lineHeight: 1.2,
              marginBottom: 0.5,
            }}
          >
            {nodeDatum?.name?.length > 12
              ? nodeDatum?.name?.slice(0, 12) + "..."
              : nodeDatum?.name}
          </div>
          <div
            style={{
              fontSize: "12px",
              lineHeight: 1.2,
              letterSpacing: 1,
              textTransform: "capitalize",
            }}
          >
            {nodeDatum.attributes?.type}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

export default function FamilyTree({ familyData }) {
  let ctn = JSON.parse(sessionStorage.getItem("ctn"));
  const [mindFamily, setMindFamily] = useState({});

  useEffect(() => {
    if (familyData?.name) {
      setMindFamily({
        name: "Self",
        attributes: {
          type:
            `${ctn?.name || ""} (${ctn?.gender === "male" ? "M" : "F"})` ||
            "Main",
        },
        bgColor: "#f7c69a",
        ...familyData,
      });
    } else {
      setMindFamily({
        name: "Self",
        attributes: {
          type:
            `${ctn?.name || ""} (${ctn?.gender === "male" ? "M" : "F"})` ||
            "Main",
        },
        bgColor: "#f4c69f",
      });
    }
  }, [familyData]);

  const handleDownloadPdf = () => {
    const treeElement = document.getElementById("treeWrapper");
    if (!treeElement) {
      console.error("Tree element not found!");
      return;
    }
    html2canvas(treeElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("family_tree.pdf");
    });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "600px",
        height: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Family Tree
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
        Relationship
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadPdf}
        sx={{ mb: 2 }}
      >
        Download as PDF
      </Button>
      <Paper
        elevation={0}
        sx={{
          width: "1200px",
          height: "800px",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          id="treeWrapper"
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Tree
            data={mindFamily}
            orientation="vertical"
            nodeSize={{ x: 200, y: 200 }}
            separation={{ siblings: 1, nonSiblings: 1.5 }}
            translate={{ x: 600, y: 50 }}
            zoom={0.6}
            zoomable={true}
            pathFunc="diagonal"
            pathClassFunc={() => "custom-link"}
            draggable={true}
            collapsible={true}
            enableLegacyTransitions={true}
            dimensions={{ height: 350, width: 1200 }}
            centeringTransitionDuration={1000}
            renderCustomNodeElement={(rd3tProps) =>
              renderCustomNode({ ...rd3tProps })
            }
          />
        </Box>
      </Paper>
    </Container>
  );
}
