import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const TabsContainer = ({ tabs, children }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [searchQ] = useSearchParams();

  const qi = searchQ.get("i");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`?i=${tabs[newValue].key}`);
  };

  useEffect(() => {
    if (qi) {
      const index = tabs.findIndex((tab) => tab.key === qi);
      if (index !== -1) {
        setValue(index);
      }
    }
  }, [qi, tabs]);

  return (
    <Paper elevation={0} sx={{ width: "100%", mt: 2, px: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Policy Details Tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#1976d2",
          },
          "& .Mui-selected": {
            color: "#1976d2",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.key} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ py: 1 }}>
        {/* Children array se active tab ka content show kar rahe hain */}
        {Array.isArray(children) ? children[value] : children}
      </Box>
    </Paper>
  );
};

export default TabsContainer;
