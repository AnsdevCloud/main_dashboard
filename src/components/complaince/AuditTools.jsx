import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import HeadlineTag from "../options/HeadlineTag";

const AuditTools = () => {
  const tools = [
    "Audit Logs Viewer",
    "Policy Comparison Tool",
    "Risk Analysis Tool",
  ];

  return (
    <div>
      <HeadlineTag variant="subtitle2" gutterBottom>
        Audit Tools
      </HeadlineTag>
      <List
        sx={{
          borderRadius: 2, // Rounded corners
          padding: 2, // Outer padding
          margin: "auto", // Center alignment
        }}
      >
        {tools.map((tool, index) => (
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
            <ListItemText primary={tool} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AuditTools;
