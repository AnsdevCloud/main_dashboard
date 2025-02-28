import { Button, Grid2, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import TransparentBox from "../../../options/TransparentBox";

const ExcelUpload = ({
  onExcel,
  status,
  onUpload,
  disabled,
  lastInvoice,
  ExtractedData = [],
}) => {
  const [file, setFile] = useState(null);
  const handleFile = (e) => {
    onExcel(e);
    setFile(e);
  };
  return (
    <Grid2 container spacing={2} my={2}>
      <Grid2 size={{ xs: 12 }}>
        <TransparentBox
          value={lastInvoice}
          caption={"Last Invoice Number"}
          rupeeLabal={false}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <Button
          size="large"
          variant="outlined"
          color="success"
          fullWidth
          sx={{ position: "relative", fontSize: file ? 10 : "auto" }}
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
            onChange={(e) => handleFile(e.target.files[0])}
            type="file"
          />
          {ExtractedData[0]
            ? `Sheet Name : ${ExtractedData[0]?.sheetName} ,  Row : ${ExtractedData[0]?.data?.length}`
            : file
            ? file?.name
            : "  Select File"}
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Stack alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Button
            size="medium"
            disabled={disabled}
            variant="outlined"
            color="info"
            fullWidth
            sx={{ position: "relative", maxWidth: 300 }}
            onClick={() => onUpload()}
          >
            Upload
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default ExcelUpload;
