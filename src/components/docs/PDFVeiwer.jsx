import React, { useEffect, useState } from "react";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import DynamicDataGrid from "../options/DynamicDataGrid";
import axios from "axios";

const PDFViewer = ({ url }) => {
  const [veiwURL, setViewUrl] = useState("");
  const [type, setType] = useState();
  const [excelData, setExcelData] = useState([]);
  const gettype = (url) => {
    const extension = url.split(".").pop();
    if (["pdf", "docx", "txt"].includes(extension)) {
      setType("document");
      return "Document";
    } else if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      setType("image");
      return "Image";
    } else if (["mp4", "avi", "mov"].includes(extension)) {
      setType("video");
      return "Video";
    } else if (["xlsx", "xls"].includes(extension)) {
      fetch();
      setType("excel");
      return "Excel";
    }
    return "Unknown";
  };
  const fetch = async () => {
    try {
      await axios
        .post(
          "http://localhost:3000/api/excel-url-to-json",
          {
            fileUrl: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization:
                "b2cfa418a6bdb0c48a1d34a729adf28e4a6395dbb5046077e3964e5c5cd1a6c4",
            },
          }
        )
        .then((responce) => setExcelData(responce?.data))
        .then((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettype(url);
  }, [url]);

  // Render file viewer
  const renderFileViewer = () => {
    if (type === "document") {
      return (
        <iframe
          src={url}
          width="100%"
          height="600px"
          style={{ border: "none" }}
          allowFullScreen
        ></iframe>
      );
    } else if (type === "excel") {
      return (
        <>
          <Typography
            variant="caption"
            component={"h1"}
            textAlign={"center"}
            my={1}
            color="grey"
            textTransform={"uppercase"}
          >
            Excel Data
          </Typography>
          {excelData?.map((item, index) => (
            <DynamicDataGrid key={index} data={item?.data || []} />
          ))}
        </>
      );
    } else if (type === "image") {
      return (
        <Box>
          <img
            src={url}
            alt="Uploaded"
            style={{ width: "100%", height: "auto", maxHeight: "800px" }}
          />
        </Box>
      );
    } else if (type === "video") {
      return (
        <Box>
          <video controls style={{ width: "100%", maxHeight: "500px" }}>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography variant="h6" color="error">
            Unsupported file type
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 1 }}>
      <Typography variant="subtitle2" my={1} mx={1} color="grey">
        Overviews
      </Typography>
      {renderFileViewer()}
    </Paper>
  );
};

export default PDFViewer;
