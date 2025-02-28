import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HeadlineTag from "../../options/HeadlineTag";

const PartyRegister = () => {
  return (
    <>
      {alert?.alertMsg && (
        <Box position="fixed" top={60} left={0} px={30} width={"100%"}>
          <Alert
            onClose={() => setAlert({ ...alert, alertMsg: "" })}
            severity={alert?.alertType}
            variant="filled"
          >
            {alert?.alertMsg}
          </Alert>
        </Box>
      )}
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            size="small"
            placeholder="Party Name"
            label="Party Name"
          />
          <TextField
            onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
            fullWidth
            size="small"
            placeholder="PAN"
            label="PAN"
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
            fullWidth
            size="small"
            placeholder="Section"
            label="Section"
          />
          <TextField
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            fullWidth
            size="small"
            placeholder="Rate"
            label="Rate"
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
            size="small"
            placeholder="Description"
            label="Description"
          />
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Paper>
      </Stack>
    </>
  );
};

export default PartyRegister;
