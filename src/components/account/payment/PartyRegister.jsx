import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import HeadlineTag from "../../options/HeadlineTag";

const PartyRegister = () => {
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
        <HeadlineTag>Party Name</HeadlineTag>
        <TextField
          fullWidth
          size="small"
          placeholder="Party Name"
          label="Party Name"
        />
        <TextField fullWidth size="small" placeholder="PAN" label="PAN" />
        <TextField
          fullWidth
          size="small"
          placeholder="Section"
          label="Section"
        />
        <TextField fullWidth size="small" placeholder="Rate" label="Rate" />
        <TextField
          fullWidth
          size="small"
          placeholder="Description"
          label="Description"
        />
        <Button>Save</Button>
      </Paper>
    </Stack>
  );
};

export default PartyRegister;
