import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useTabs } from "../../stores/TabsContex";
import { Link, useNavigate } from "react-router-dom";

const ButtonWithNewTab = ({
  icon,
  link,
  link2,
  pathname,
  label,
  name,
  tabNavigation = false,
}) => {
  const { addTab } = useTabs();
  const navigate = useNavigate();
  return (
    <Tooltip placement="left" arrow title="With Tab (ctrl + Click)">
      <Button
        sx={{ justifyContent: "flex-start", fontWeight: 400 }}
        startIcon={icon}
        color={pathname === link || pathname === link2 ? "success" : "inherit"}
        size="small"
        component={Link}
        onClick={(event) => {
          event.preventDefault();
          if (event.ctrlKey || event.altKey) {
            addTab({
              label: label,
              name: name,
              link: link,
            });
            if (tabNavigation) {
              navigate(link);
            }
          }
          if (!tabNavigation) {
            navigate(link);
          }
        }}
        fullWidth
      >
        {label}
      </Button>
    </Tooltip>
  );
};

export default ButtonWithNewTab;
