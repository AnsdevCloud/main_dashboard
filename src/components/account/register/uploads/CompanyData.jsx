import {
  Button,
  FormControl,
  Grid2,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CompanyData = ({ onExcel, onCompany, ownCompany, ExtractData = [] }) => {
  const [formData, setFormData] = useState({
    file: null,
  });

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
            onChange={(e) => onCompany(e.target.value)}
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
          {ExtractData?.length >= 1
            ? "Total Data : " + ExtractData?.length
            : formData?.file
            ? formData?.file?.name
            : "Select File"}
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Button
          size="large"
          variant="contained"
          color="info"
          disabled={!ownCompany}
          fullWidth
          sx={{ position: "relative" }}
          onClick={() => onExcel(formData)}
        >
          Upload
        </Button>
        {!ownCompany && (
          <Typography component={"span"} variant="caption" color="grey">
            {ExtractData?.length > 0
              ? "Data not upload select company then try "
              : "Select Company"}
          </Typography>
        )}
      </Grid2>
    </Grid2>
  );
};

export default CompanyData;
