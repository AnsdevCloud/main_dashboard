import React, { useContext, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { ThemeContext } from "../../theme/ThemeContext";
import defineFeatures from "../../settings/definefeatures";
import { MdControlCamera, MdDashboard } from "react-icons/md";
// import { Home } from "@mui/icons-material";
import { GrAction, GrActions } from "react-icons/gr";
import { Close } from "@mui/icons-material";
import { link } from "d3";
import { useTabs } from "../../stores/TabsContex";

const SideBarNested = ({ isOpen, toggleDrawer }) => {
  const { addTab } = useTabs();

  const { siteSettings, role, swipeFuns, mySetting, setMySetting } =
    useContext(ThemeContext);
  // console.log("mySetting: ", mySetting, role);

  let fe = JSON.parse(localStorage.getItem("fe")) || [];

  const location = useLocation(); // Get the current location
  const [openSubMenu, setOpenSubMenu] = React.useState({}); // Track submenu state

  //novigate hook
  const navigate = useNavigate();

  const features = siteSettings?.definedRoles[role]?.access?.features;
  useEffect(() => {
    setMySetting(fe);
  }, []);

  const menuItems = defineFeatures.filter(
    (obj) =>
      features?.some(
        (feature) => feature.name === obj.name && feature.status === "enabled"
      ) && siteSettings?.settings?.features[obj?.name] === true
  );

  const handleSubMenuToggle = (name) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    setMySetting(siteSettings?.definedRoles[role]?.access?.features);
    let va = mySetting?.find(
      (value, index, array) =>
        value.name === "global" && value?.status === "enabled"
    );
  }, []);

  const haodleSubDrower = (item) => {
    handleSubMenuToggle(item.name);
    navigate(item.link);
    addTab({
      ...item,
      name: item?.name,
      link: item?.link,
    });
  };

  const MyListDefine = ({ menuItems = [] }) => {
    return (
      <>
        <List>
          {menuItems?.map((item, index) => (
            <React.Fragment key={index}>
              {item?.children && (
                <Divider sx={{ my: 1 }}>
                  <Typography
                    bgcolor={"background.default"}
                    px={0.3}
                    borderRadius={1}
                    fontSize={isOpen ? 12 : 6}
                  >
                    {item?.label?.toLocaleUpperCase()}
                  </Typography>
                </Divider>
              )}
              <ListItem
                button
                sx={{
                  backgroundColor:
                    location.pathname === item.link
                      ? "info.light"
                      : item?.children &&
                        !openSubMenu[item?.name] &&
                        item?.children?.find(
                          (value) => value?.link === location.pathname
                        )
                      ? "info.light"
                      : "inherit",
                  justifyContent: isOpen ? "flex-start" : "center",

                  px: 2,
                  display:
                    fe?.find(
                      (value, index, array) =>
                        value.name === item?.name && value?.status === "enabled"
                    ) === undefined && "none",
                }}
                onClick={() => haodleSubDrower(item)}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                  {
                    <Typography
                      component={"span"}
                      sx={{
                        fontSize: 6,
                        fontWeight: 600,
                        position: "absolute",
                        right: 1,
                        top: "30%",
                        bgcolor: `${item?.dev ? "red" : "green"}`,
                        color: "#fff",

                        px: 1,
                        borderRadius: 2,
                      }}
                    >
                      {item?.dev ? "in Dev" : "Live"}
                    </Typography>
                  }
                </ListItemIcon>
                {isOpen && <ListItemText primary={item.label} />}
                {item.children && (
                  <>
                    {isOpen &&
                      (openSubMenu[item.name] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </>
                )}
              </ListItem>
              {item.children && (
                <Collapse
                  in={openSubMenu[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{ bgcolor: "background.default" }}
                  >
                    {item.children.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        button
                        sx={{
                          pl: isOpen ? 4 : 0,
                          backgroundColor:
                            location.pathname === subItem.link
                              ? "info.light"
                              : "inherit",
                          pointerEvents:
                            location.pathname === subItem.link
                              ? "none"
                              : "auto",
                          display:
                            fe?.find(
                              (value, index, array) =>
                                (value.name === subItem?.name &&
                                  value?.status === "enabled") ||
                                (value.name === item?.name &&
                                  value?.status === "enabled")
                            ) === undefined && "none",
                        }}
                        onClick={() => {
                          navigate(subItem?.link);
                          addTab({
                            label: subItem?.label || "",
                            name: subItem?.name || "",
                            link: subItem?.link || "",
                          });
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            justifyContent: "center",
                            color: "inherit",
                          }}
                        >
                          {subItem.icon}
                          {
                            <Typography
                              component={"span"}
                              sx={{
                                fontSize: 6,
                                fontWeight: 600,
                                position: "absolute",
                                right: 1,
                                top: "30%",
                                bgcolor: `${subItem?.dev ? "red" : "green"}`,
                                color: "#fff",

                                px: 1,
                                borderRadius: 2,
                              }}
                            >
                              {subItem?.dev ? "in Dev" : "Live"}
                            </Typography>
                          }
                        </ListItemIcon>
                        {isOpen && <ListItemText primary={subItem.label} />}
                      </ListItem>
                    ))}
                    {item?.children && <Divider />}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </>
    );
  };
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

          transition: "width 0.3s ",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          position: { xs: "fixed", md: "sticky" },
          height: { xs: "100vh", md: "87vh" },
          pb: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
      onMouseEnter={() => toggleDrawer(true)}
      onMouseLeave={() => toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isOpen ? "center" : "center",
          alignItems: "center",
          p: 1,
        }}
      >
        {!isOpen ? (
          <IconButton size="small">
            <GrAction />
          </IconButton>
        ) : (
          <Typography
            fontWeight={600}
            color="textSecondary"
            variant="subtitle2"
            component={"h1"}
          >
            Short Action
          </Typography>
        )}
      </Box>

      <List>
        <ListItem
          button
          sx={{
            backgroundColor:
              location.pathname === "/cpanel" ? "info.light" : "inherit",
            justifyContent: isOpen ? "flex-start" : "center",
            px: 2,

            display:
              mySetting?.find(
                (value, index, array) =>
                  value.name === "admin" && value?.status === "enabled"
              ) === undefined && "none",
          }}
          onClick={() => {
            navigate("/cpanel");
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: "inherit",
            }}
          >
            <MdControlCamera />
            <Typography
              component={"span"}
              sx={{
                fontSize: 6,
                fontWeight: 600,
                position: "absolute",
                right: 1,
                top: "30%",
                bgcolor: "red",
                color: "#fff",

                px: 1,
                borderRadius: 2,
              }}
            >
              in Dev
            </Typography>
          </ListItemIcon>
          {isOpen && <ListItemText primary={"C Panel"} />}
        </ListItem>
        <ListItem
          button
          sx={{
            backgroundColor:
              location.pathname === "/dashboard" ? "info.light" : "inherit",
            justifyContent: isOpen ? "flex-start" : "center",
            px: 2,
            display:
              mySetting?.find(
                (value, index, array) =>
                  value.name === "dashboard" && value?.status === "enabled"
              ) === undefined && "none",
          }}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: "inherit",
            }}
          >
            <MdDashboard />
            {
              <Typography
                component={"span"}
                sx={{
                  fontSize: 6,
                  fontWeight: 600,
                  position: "absolute",
                  right: 1,
                  top: "30%",
                  bgcolor: "red",
                  color: "#fff",

                  px: 1,
                  borderRadius: 2,
                }}
              >
                in Dev
              </Typography>
            }
          </ListItemIcon>
          {isOpen && <ListItemText primary={"Dashboard"} />}
        </ListItem>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item?.children && (
              <Divider sx={{ my: 1 }}>
                <Typography
                  bgcolor={"background.default"}
                  px={0.3}
                  borderRadius={1}
                  fontSize={isOpen ? 12 : 6}
                >
                  {item?.label?.toLocaleUpperCase()}
                </Typography>
              </Divider>
            )}
            <ListItem
              button
              onClick={() =>
                item.children ? handleSubMenuToggle(item.name) : null
              }
              // onMouseEnter={() => handleSubMenuToggle(item.name)}
              sx={{
                backgroundColor:
                  location.pathname === item.link
                    ? "info.light"
                    : item?.children &&
                      !openSubMenu[item?.name] &&
                      item?.children?.find(
                        (value) => value?.link === location.pathname
                      )
                    ? "info.light"
                    : "inherit",
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
                {item?.dev && (
                  <Typography
                    component={"span"}
                    sx={{
                      fontSize: 6,
                      fontWeight: 600,
                      position: "absolute",
                      right: 1,
                      top: "30%",
                      bgcolor: "red",
                      color: "#fff",

                      px: 1,
                      borderRadius: 2,
                    }}
                  >
                    in Dev
                  </Typography>
                )}
              </ListItemIcon>
              {isOpen && <ListItemText primary={item.label} />}
              {item.children && (
                <>
                  {isOpen &&
                    (openSubMenu[item.name] ? <ExpandLess /> : <ExpandMore />)}
                </>
              )}
            </ListItem>
            {item.children && (
              <Collapse
                in={openSubMenu[item.name]}
                timeout="auto"
                unmountOnExit
                sx={{ bgcolor: "background.default" }}
              >
                <MyListDefine menuItems={item.children} />
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <ListItem
        button
        sx={{
          backgroundColor:
            location.pathname === "/cpanel" ? "info.light" : "inherit",
          justifyContent: isOpen ? "flex-start" : "center",
          px: 2,

          display:
            mySetting?.find(
              (value, index, array) =>
                value.name === "portal" && value?.status === "enabled"
            ) === undefined && "none",
        }}
        onClick={() => navigate("/portal")}
      >
        <ListItemIcon
          sx={{
            justifyContent: "center",
            color: "inherit",
          }}
        >
          <GrActions />
          {
            <Typography
              component={"span"}
              sx={{
                fontSize: 6,
                fontWeight: 600,
                position: "absolute",
                right: 1,
                top: "30%",
                bgcolor: "red",
                color: "#fff",

                px: 1,
                borderRadius: 2,
              }}
            >
              in Dev
            </Typography>
          }
        </ListItemIcon>
        {isOpen && <ListItemText primary={"Portal"} />}
      </ListItem>
      <ListItem
        button
        onClick={() => toggleDrawer()}
        sx={{
          justifyContent: isOpen ? "flex-start" : "center",
          px: 2,
          position: "relative",

          bgcolor: (theme) => theme.palette.warning.light,
          display:
            mySetting?.find(
              (value, index, array) =>
                value.name === "portal" && value?.status === "enabled"
            ) === undefined && "none",
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: "center",
            color: "inherit",
          }}
        >
          {isOpen ? <Close /> : <MenuIcon />}
        </ListItemIcon>
        {isOpen && <ListItemText primary={"Sidebar Close"} />}
      </ListItem>
    </Drawer>
  );
};

export default SideBarNested;
