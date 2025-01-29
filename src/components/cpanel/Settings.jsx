import { Grid2 } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeContext";

import { useEffect } from "react";

import { Outlet } from "react-router-dom";

const Settings = () => {
  const { siteSettings, setRole, role, setMySetting, mySetting } =
    useContext(ThemeContext);
  const [mdifyRole, setModifyRole] = useState("");
  const [mdifyFeature, setModifyFetaures] = useState([]);

  useEffect(() => {
    if (siteSettings) {
      setModifyFetaures(
        siteSettings?.definedRoles[mdifyRole]?.access?.features || []
      );
    }
  }, [mdifyRole]);

  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12 }}>
          <Outlet />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Settings;
