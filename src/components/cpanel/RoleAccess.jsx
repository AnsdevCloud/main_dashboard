import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeContext";

import FeatureCheckboxList from "./FeatureCheckboxList";
import { useEffect } from "react";

const RoleAccess = () => {
  const [accessFeatured, setAccessedFeatures] = useState([]);

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
  const HandleSave = (e) => {
    setModifyFetaures(e);
    setMySetting(e);
    let fe = JSON.parse(localStorage.getItem("fe"));
    if (fe?.leanth > 0 || e[0]) {
      const mergedArray = mergeAndUpdate(fe, e);
      localStorage.setItem("fe", JSON.stringify(mergedArray));
    }
  };

  const mergeAndUpdate = (oldData, updatedData) => {
    // Create a Map to track objects by name from oldData
    const dataMap = new Map(oldData?.map((item) => [item.name, item]));

    // Iterate through updatedData
    updatedData.forEach((update) => {
      if (dataMap.has(update.name)) {
        // If name exists, update the status
        const existing = dataMap.get(update.name);
        existing.status = update.status;
      } else {
        // If name doesn't exist, add the new object
        dataMap.set(update.name, update);
      }
    });

    // Return the merged result as an array
    return Array.from(dataMap.values());
  };
  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={0}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ fontSize: 12 }} id="demo-simple-select-label">
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mdifyRole}
                label="Select Role"
                sx={{ fontSize: 12 }}
                onChange={(e) => setModifyRole(e.target.value)}
              >
                {siteSettings?.roles?.map((value, index) => (
                  <MenuItem
                    sx={{ fontSize: 10 }}
                    key={index}
                    value={value?.toLocaleLowerCase()}
                  >
                    {value?.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
          <FeatureCheckboxList
            modyRole={mdifyRole}
            onSave={(e) => HandleSave(e)}
            features={siteSettings?.settings?.features}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default RoleAccess;
