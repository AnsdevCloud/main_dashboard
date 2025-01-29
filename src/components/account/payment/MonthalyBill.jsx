import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import HeadlineTag from "../../options/HeadlineTag";

const MonthalyBill = () => {
  return (
    <Stack width={"100%"} alignItems={"center"} justifyContent={"flex-start"}>
      <Paper
        sx={{
          width: 350,
          p: 2,
          mt: 5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <HeadlineTag>Payment Details</HeadlineTag>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter Party Name"
          label="Search & Select"
        />

        <Divider />
        <TextField
          fullWidth
          size="small"
          placeholder="INV Month"
          label="INV Month"
        />
        <TextField
          fullWidth
          size="small"
          placeholder="Payment Date"
          label="Payment Date"
        />

        <TextField
          fullWidth
          size="small"
          placeholder="Gross AMT"
          label="Gross AMT"
        />
        <TextField
          fullWidth
          size="small"
          placeholder="Date of Chalan"
          label="Date of Chalan"
        />
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="Chalan No."
          label="Chalan No."
        />
        <TextField
          fullWidth
          size="small"
          placeholder="BSR CODE"
          label="BSR CODE"
        />

        <TextField
          fullWidth
          type="file"
          size="small"
          placeholder="Chalan Link"
          label="Chalan Link"
          helperText="Upload file then Get Link Automatic."
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button>Save</Button>
      </Paper>
    </Stack>
  );
};

export default MonthalyBill;
