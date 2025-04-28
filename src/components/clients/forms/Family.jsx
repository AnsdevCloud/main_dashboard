// InteractiveTree.js
import React, { useState, useCallback, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import {
  Paper,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  PictureAsPdf,
  Refresh,
  Save,
  Update,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js"; // Import the library
import useEncryptedSessionStorage from "../../../hooks/useEncryptedSessionStorage";

// --- Constants and Helpers ---
const initialTreeData = {
  name: "Main",
  id: 0,
  attributes: {},
  bgColor: "#fca776",
  children: [],
};

const deepClone = (obj) =>
  typeof structuredClone === "function"
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));

const calculateAge = (birthDateString) => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }
  return { years, months, days };
};

// --- Custom Node Component ---
const CustomNode = ({ nodeDatum, onDoubleClick, toggleNode }) => {
  const clickTimeoutRef = useRef(null);
  const DOUBLE_CLICK_THRESHOLD = 300; // milliseconds

  const handleClick = (e) => {
    e.stopPropagation();
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      onDoubleClick(e, nodeDatum);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        toggleNode();
        clickTimeoutRef.current = null;
      }, DOUBLE_CLICK_THRESHOLD);
    }
  };

  const boxWidth = 400;
  const boxHeight = 150;
  const backgroundColor = nodeDatum?.bgColor || "#ffffff";
  const displayName =
    nodeDatum?.name?.length > 20
      ? nodeDatum.name.slice(0, 20) + "..."
      : nodeDatum.name;

  return (
    <g onClick={handleClick} style={{ cursor: "pointer" }}>
      <foreignObject
        x={-boxWidth / 2}
        y={0}
        width={boxWidth}
        height={boxHeight}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: boxWidth,
            height: boxHeight,
            backgroundColor,
            border:
              nodeDatum.attributes?.relationshipCategory === "parents"
                ? "1px solid #b82222"
                : "1px solid #ccc",
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
              marginBottom: "0.5em",
              textTransform: "capitalize",
            }}
          >
            {displayName}
          </div>
          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.2,
              letterSpacing: 1,
              textTransform: "capitalize",
              marginBottom: 5,
              fontWeight: 600,
            }}
          >
            {nodeDatum.attributes?.relationshipType}{" "}
          </div>
          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.2,
              letterSpacing: 1,
              textTransform: "capitalize",
            }}
          >
            {nodeDatum.attributes?.dob}{" "}
            {`(${calculateAge(nodeDatum.attributes?.dob)?.years}Y ${
              calculateAge(nodeDatum.attributes?.dob)?.months
            }M ${calculateAge(nodeDatum.attributes?.dob)?.days}D)`}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

// --- Main Component ---
const InteractiveTree = () => {
  const { state } = useLocation();
  const [treeData, setTreeData] = useState(initialTreeData);

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    setTreeData({ ...initialTreeData, ...state });
  }, [refresh]);

  const toggleCollapse = useCallback(
    (e, nodeDatum) => {
      const newTree = deepClone(treeData);
      const toggleNode = (node) => {
        if (node.id === nodeDatum.id) {
          if (node.children) {
            node._children = node.children;
            node.children = undefined;
          } else if (node._children) {
            node.children = node._children;
            node._children = undefined;
          }
        } else if (node.children) {
          node.children.forEach((child) => toggleNode(child));
        }
      };
      toggleNode(newTree);
      setTreeData(newTree);
    },
    [treeData]
  );

  const handleDoubleClick = useCallback((event, nodeDatum) => {
    // your double-click logic here
  }, []);

  const renderCustomNode = (rd3tProps) => (
    <CustomNode
      {...rd3tProps}
      onDoubleClick={handleDoubleClick}
      toggleNode={() => toggleCollapse(null, rd3tProps.nodeDatum)}
    />
  );

  // Function to download tree as PDF in A4 size
  const downloadPdf = () => {
    // Option 1: Adjust the container element's style to match A4 proportions.
    // Wrap your tree with a container that has a fixed A4 size (8.27in x 11.69in).
    // You may need to adjust the tree rendering (scaling/positioning) to fit within these dimensions.
    const element = document.getElementById("pdfContainer");
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "Enivesh Members Relationship Tree.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Paper
        elevation={5}
        sx={{
          p: 1,
          position: "absolute",
          width: 200,
          top: 10,
          left: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Tooltip title="Back">
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBack fontSize="10px" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Back">
          <IconButton onClick={() => setRefresh(!refresh)} size="small">
            <Refresh fontSize="10px" />
          </IconButton>
        </Tooltip>
        <Button
          color="info"
          size="small"
          variant="text"
          startIcon={<PictureAsPdf />}
          onClick={downloadPdf}
        >
          Download
        </Button>
      </Paper>
      <Paper
        elevation={5}
        sx={{
          p: 1,
          position: "absolute",
          width: 200,
          top: 10,
          right: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          fontWeight={600}
          textTransform={"uppercase"}
          variant="subtitle1"
          component={"h1"}
        >
          Members
        </Typography>
      </Paper>
      {/* Wrap the tree in a container with fixed A4 dimensions */}
      <div
        id="pdfContainer"
        style={{
          width: "8.27in",
          height: "11.69in",
          margin: "auto",
          backgroundColor: "#fff",
          overflow: "hidden",
          padding: "0.5in", // to account for margins in the PDF
        }}
      >
        <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
          <Tree
            data={treeData}
            orientation="vertical"
            renderCustomNodeElement={renderCustomNode}
            pathFunc="diagonal"
            nodeSize={{ x: 200, y: 200 }}
            separation={{ siblings: 1.05, nonSiblings: 0.5 }}
            translate={{ x: 350, y: 30 }}
            draggable
            zoom={0.6}
            zoomable
            collapsible={true}
            enableLegacyTransitions
            dimensions={{ height: 350, width: 1440 }}
            centeringTransitionDuration={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveTree;
