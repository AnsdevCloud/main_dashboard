import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import HeadlineTag from "../options/HeadlineTag";

const RegulatoryUpdates = () => {
  const updates = [
    "New RBI regulations for NBFCs effective Jan 2025",
    "SEBI updates on investment compliance rules",
    "Revised GST filing deadlines for Q1 2025",
    "Taxation changes for international investments",
  ];

  return (
    <div>
      <HeadlineTag variant="subtitle2" gutterBottom>
        Regulatory Updates
      </HeadlineTag>
      <List
        sx={{
          borderRadius: 2, // Rounded corners
          padding: 2, // Outer padding
          margin: "auto", // Center alignment
        }}
      >
        {updates.map((update, index) => (
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
            <ListItemText primary={update} sx={{ fontSize: 10 }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RegulatoryUpdates;
