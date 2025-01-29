import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";
import HeadlineTag from "../options/HeadlineTag";

const ComplianceChecklist = () => {
  const checklistItems = [
    "Review Investment Policies",
    "Verify Legal Documentation",
    "Ensure Data Security Compliance",
    "Monitor Policy Updates",
  ];

  return (
    <div>
      <HeadlineTag variant="subtitle2" gutterBottom>
        Compliance Checklist
      </HeadlineTag>
      <List
        sx={{
          borderRadius: 2, // Rounded corners
          padding: 2, // Outer padding
          margin: "auto", // Center alignment
        }}
      >
        {checklistItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              fontSize: "1rem", // Font size for the list item
              color: "#0082d8", // Custom color
              margin: "4px 0", // Vertical margin
              border: "none", // Border style
              borderRadius: 1, // Item border radius
              p: "2px 10px",
              "&:hover": {
                // Hover effect
                backgroundColor: "#e0ecff",
              },
            }}
          >
            <ListItemIcon>
              <Checkbox size="small" color="secondary" edge="start" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ComplianceChecklist;
