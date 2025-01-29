import { Button, Grid2, TextField } from "@mui/material";
import React, { useState } from "react";
import TransparentBox from "../../../options/TransparentBox";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: 0,
    fileName: "",
    file: null,
    excel: null,
  });
  console.log(formData);

  return (
    <Grid2 container spacing={2} my={2}>
      <Grid2 size={{ xs: 12 }}>
        <TransparentBox
          value={232342}
          caption={"Last Invoice Number"}
          rupeeLabal={false}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          size="small"
          label="Invoice Number"
          variant="standard"
          type="number"
          fullWidth
          onChange={(e) =>
            setFormData({ ...formData, invoiceNumber: e.target.value })
          }
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          size="small"
          fullWidth
          label="File Name"
          onChange={(e) =>
            setFormData({ ...formData, fileName: e.target.value })
          }
          variant="standard"
          type="text"
        />
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
            title=" PDF file Select"
            accept="application/pdf"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
            }}
            type="file"
          />
          {formData?.file ? formData?.file?.name : "Select File"}
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Button
          size="large"
          variant="outlined"
          color="success"
          fullWidth
          sx={{ position: "relative", fontSize: formData?.excel ? 10 : "auto" }}
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
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, excel: e.target.files[0] })
            }
          />
          {formData?.excel ? formData?.excel?.name : "Select File"}
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
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

export default InvoiceForm;
