import React from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import HeadlineTag from "../options/HeadlineTag";

const FraudDetectionReports = () => {
  const reports = [
    "Suspicious Login Attempts",
    "Anomalous Transaction Patterns",
  ];

  return (
    <div>
      <HeadlineTag variant="subtitle2" gutterBottom>
        Fraud Detection Reports
      </HeadlineTag>

      <List
        sx={{
          borderRadius: 2, // Rounded corners
          padding: 2, // Outer padding
          margin: "auto", // Center alignment
        }}
      >
        {reports.map((report, index) => (
          <ListItem
            key={index}
            sx={{
              fontSize: "1rem", // Font size for the list item
              color: "#0082d8", // Custom color
              margin: "4px 0", // Vertical margin
              border: "1px solid #b2d8ff", // Border style
              borderRadius: 1, // Item border radius
              p: "2px 10px",
              "&:hover": {
                // Hover effect
                backgroundColor: "#e0ecff",
              },
            }}
          >
            <ListItemText primary={report} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FraudDetectionReports;
