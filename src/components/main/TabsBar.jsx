import React, { useState, Fragment, useEffect } from "react";
import { Add, Clear, Close } from "@mui/icons-material";
import {
  Box,
  Paper,
  Stack,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Badge,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTabs } from "../../stores/TabsContex"; // Adjust the path as needed
import defineFeatures from "../../settings/definefeatures";

// TabsBar component manages and displays a dynamic tabbed interface.
const TabsBar = () => {
  // Destructure tab-related functions and state from the custom Tabs context.
  const { tabs, addTab, deleteTab, ClearAllTabs } = useTabs();

  // defineFeatures is an array of features that can be used to create tabs.
  const [tabsItems, setTabsItems] = useState([]);

  // State for managing the dropdown menu anchor and its open state.
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Get the current URL path and navigation function from React Router.
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Constant for dropdown menu item height.
  const ITEM_HEIGHT = 48;

  // Opens the dropdown menu.
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  // Closes the dropdown menu.
  const handleMenuClose = () => setAnchorEl(null);

  // Adds a new tab and navigates to its link.
  const handleAddTab = (option) => {
    addTab({
      name: option?.name,
      label: option?.label,
      link: option?.link,
    });
    navigate(option?.link);
    handleMenuClose();
  };

  // Recursively renders nested menu items for dropdown options.
  const renderNestedMenuItems = (options) => {
    return options.map((option, idx) => (
      <Fragment key={option?.link || idx}>
        <MenuItem
          disabled={!option?.link}
          selected={pathname === option?.link}
          sx={{ display: option?.dev ? "none" : "block" }}
          onClick={() => handleAddTab(option)}
        >
          {option?.label}
        </MenuItem>
        {option?.children && renderNestedMenuItems(option.children)}
      </Fragment>
    ));
  };

  const flattenFeatures = (features) => {
    return features.reduce((acc, feature) => {
      // Destructure children and icon from the current feature
      const { children, icon, ...rest } = feature;
      // Check if the feature originally had children
      const isParent = Boolean(children && children.length > 0);
      // Add the current feature (without its children and icon) plus the 'parent' flag
      acc.push({ ...rest, parent: isParent });
      // If children exists, recursively flatten and add them to the accumulator.
      if (children && children.length > 0) {
        acc.push(...flattenFeatures(children));
      }
      return acc;
    }, []);
  };
  useEffect(() => {
    const tabsLink = flattenFeatures(defineFeatures);

    setTabsItems(tabsLink);
  }, [defineFeatures]);

  useEffect(() => {
    let finded = tabsItems?.find(
      (value, index, array) =>
        value?.parent === true && value?.link === pathname
    );
    if (finded) {
      addTab({
        name: finded?.name,
        label: finded?.label,
        link: finded?.link,
      });
    }
  }, [pathname]);
  return (
    <Paper sx={{ borderRadius: 0 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {tabs?.length > 0 && (
          <Tooltip title="Clear All Tabs">
            <IconButton size="small" onClick={() => ClearAllTabs(pathname)}>
              <Clear fontSize="8px" />
            </IconButton>
          </Tooltip>
        )}
        <Stack
          direction="row"
          justifyContent={{ xs: "flex-start", md: "center" }}
          alignItems="flex-start"
          gap={0.2}
          overflow="auto"
          flexWrap="nowrap"
          sx={{ flex: 1, WebkitOverflowScrolling: "touch", px: 1 }}
        >
          {tabs.map((tab, index) => (
            <Box
              key={index}
              title={tab?.link}
              component="div"
              onClick={() => navigate(tab?.link)}
              sx={{
                position: "relative",
                px: 1,
                minWidth: 100,
                py: 0.4,
                bgcolor:
                  pathname === tab?.link
                    ? "rgba(250, 169, 122, 0.527)"
                    : (theme) => theme.palette.background.default,
                borderBottom:
                  pathname === tab?.link ? "1px solid #ff5c00" : "none",
                cursor: "pointer",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#fff" : "#000",
                fontSize: 10,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label || tab.name}
              {pathname !== tab?.link && (
                <Box
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    // Prevent deleting an active tab
                    if (pathname !== tab?.link) {
                      deleteTab(index);
                    } else {
                      alert("Active tab");
                    }
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    ":hover": { color: "#ff5c00" },
                    width: "10px",
                    height: "10px",
                    bgcolor: "#22020275",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <Close sx={{ fontSize: "8px" }} />
                </Box>
              )}
            </Box>
          ))}
        </Stack>

        <Tooltip title="Add Tab">
          <IconButton
            aria-label="add tab"
            size="small"
            color="primary"
            aria-controls={isMenuOpen ? "tabs-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={handleMenuOpen}
          >
            <Badge
              badgeContent={tabs?.length}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              color="primary"
            >
              <Add />
            </Badge>
          </IconButton>
        </Tooltip>
      </Stack>
      <Menu
        id="tabs-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {tabsItems?.map((option, index) => (
          <MenuItem
            key={index}
            disabled={!option?.link}
            selected={pathname === option?.link}
            sx={{ display: option?.dev ? "none" : "block" }}
            onClick={() => handleAddTab(option)}
          >
            {option?.label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default TabsBar;
