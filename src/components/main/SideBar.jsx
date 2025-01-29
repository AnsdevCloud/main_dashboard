import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MdDashboard } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MoneyOffOutlined, Public } from "@mui/icons-material";
import { BsBank } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaSellsy } from "react-icons/fa";
import { ThemeContext } from "../../theme/ThemeContext";

const Sidebar = ({ isOpen, toggleDrawer }) => {
  const { siteSettings, role, swipeFuns } = useContext(ThemeContext);

  // Define the features and their metadata
  const defineFeatures = [
    {
      label: "Dashboard",
      icon: <MdDashboard style={{ fontWeight: 900 }} />,
      link: "",
      name: "dashboard",
    },
    {
      label: "Analytics",
      icon: <IoAnalyticsSharp style={{ fontWeight: 900 }} />,
      link: "",
      name: "analytics",
    },
    {
      label: "Expense",
      icon: <MoneyOffOutlined style={{ fontWeight: 900 }} />,
      link: "",
      name: "expense",
    },
    {
      label: "Filing Data",
      icon: <GiNotebook style={{ fontWeight: 900 }} />,
      link: "",
      name: "filingData",
    },
    {
      label: "Bank Details",
      icon: <BsBank style={{ fontWeight: 900 }} />,
      link: "",
      name: "bankDetails",
    },
    {
      label: "Purchase",
      icon: <BiSolidPurchaseTag style={{ fontWeight: 900 }} />,
      link: "",
      name: "purchase",
    },
    {
      label: "Sales",
      icon: <FaSellsy style={{ fontWeight: 900 }} />,
      link: "",
      name: "sales",
    },
    {
      label: "Global",
      icon: <Public style={{ fontWeight: 900 }} />,
      link: "",
      name: "global",
      children: [
        {
          label: "Relationship",
          icon: <FaSellsy style={{ fontWeight: 900 }} />,
          link: "",
          name: "relationship",
        },
      ],
    },
  ];

  // Get the allowed features for the current role
  const roleFeatures = siteSettings?.definedRoles[role]?.access?.features || [];

  // Filter menu items: features must be allowed by the role and enabled in settings
  const menuItems = defineFeatures.filter(
    (item) =>
      roleFeatures.includes(item.name) &&
      siteSettings?.settings?.features?.[item.name]?.status === "enabled"
  );

  return (
    <Drawer
      variant="permanent"
      open={isOpen || swipeFuns?.left}
      PaperProps={{
        sx: {
          width: {
            xs: isOpen ? 250 : 0,
            md: isOpen ? 250 : 60,
            lg: isOpen ? "100%" : 60,
          },
          transition: "width 0.3s",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          position: { xs: "fixed", md: "sticky" },
          height: "100vh",
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isOpen ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            button
            sx={{
              justifyContent: isOpen ? "flex-start" : "center",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {isOpen && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
