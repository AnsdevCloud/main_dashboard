import {
  Button,
  FormControl,
  Grid2,
  Select,
  TextField,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

const CompanyData = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    file: null,
  });
  console.log(formData);

  return (
    <Grid2 container spacing={2} my={2}>
      <Grid2 size={{ xs: 12 }}>
        <FormControl fullWidth size="small">
          <InputLabel size="small" id="demo-simple-select-label">
            Company
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Company"
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            size="small"
          >
            <MenuItem value={"enivesh-finance"}>Enivesh Finance</MenuItem>
            <MenuItem value={"enivesh-insurance"}>Enivesh Insurance</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <Button
          size="large"
          variant="outlined"
          color="success"
          fullWidth
          sx={{ position: "relative", fontSize: formData?.file ? 10 : "auto" }}
        >
          <input
            title=" Excel file Select"
            accept=".xls,.xlsx"
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
            }}
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
            type="file"
          />
          {formData?.file ? formData?.file?.name : "Select File"}
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Button
          size="large"
          variant="contained"
          color="info"
          fullWidth
          sx={{ position: "relative" }}
        >
          Upload
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default CompanyData;
