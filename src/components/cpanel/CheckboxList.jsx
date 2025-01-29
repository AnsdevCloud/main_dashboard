import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
} from "@mui/material";

const CheckboxList = ({ items = [] }) => {
  // State to store checked items
  const [checkedItems, setCheckedItems] = useState([]);
  console.log("checkedItems: ", checkedItems);

  // List of items to display
  // const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  // Handle checkbox change
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      // Add the item if checked
      setCheckedItems((prevItems) => [...prevItems, item]);
    } else {
      // Remove the item if unchecked
      setCheckedItems((prevItems) => prevItems.filter((i) => i !== item));
    }
  };

  return (
    <Box>
      <FormGroup>
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkedItems.includes(item)}
                onChange={(e) => handleCheckboxChange(e, item)}
                size="small"
              />
            }
            label={item?.toUpperCase()}
          />
        ))}
      </FormGroup>
      <Typography variant="body1" mt={2}>
        Checked Items: {checkedItems.join(", ") || "None"}
      </Typography>
    </Box>
  );
};

export default CheckboxList;
