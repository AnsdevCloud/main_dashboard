import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HeadlineTag from "../../components/options/HeadlineTag";
import { Link } from "react-router-dom";

const Subscriptions = () => {
  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const [formData, setFormData] = useState({
    companyName: "",
    subscriptionDate: "",
    amount: 0,
    renewalDate: "",
    gstAmount: 0,
    paymentDetails: "",
    serviceTakenFor: "",
    bill: "",
  });

  const handleSubmit = async () => {
    const myHeaders = new Headers();
    // myHeaders.append("Origin", "http://localhost:5173");
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "subscription",
      data: {
        ...formData,
        timestamp: new Date().getTime(),
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (
      formData?.amount > 0 &&
      formData?.companyName &&
      formData?.subscriptionDate &&
      formData?.renewalDate &&
      formData?.serviceTakenFor
    ) {
      fetch("https://db.enivesh.com/firestore/add", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setAlert({
            alertMsg: ` ${result?.message} : ${result?.docId} `,
            alertType: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          setAlert({
            alertMsg: `Failled`,
            alertType: "error",
          });
        });
    } else {
      console.error("Form Not FiIlled");
      setAlert({
        alertMsg: `Form Not FiIlled `,
        alertType: "error",
      });
    }
  };

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
      <Grid2 container spacing={2} p={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <HeadlineTag>Subscriptions</HeadlineTag>
            {/* <Box my={2}>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={3}
                >
                  <Stack
                    justifyContent={"center"}
                    gap={2}
                    alignItems={"center"}
                  >
                    <Avatar />
                    <Typography variant="subtitle2" color="info">
                      Hostinger VPS Server
                    </Typography>
                  </Stack>
                  <Box>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        Renewal Date
                      </Typography>
                      <Typography variant="body2" color="initial">
                        12/02/2025{" "}
                      </Typography>
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        Invoice Link
                      </Typography>
                      <Typography variant="body2" component={Link} color="info">
                        Click Me
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box> */}
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <HeadlineTag>Add Sebcription Details</HeadlineTag>

            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Enter"
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Company Name"
              />
              <TextField
                type="date"
                size="small"
                variant="standard"
                label="Subcription Date"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subscriptionDate: e.target.value,
                  })
                }
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>

            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="number"
                size="small"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                variant="standard"
                placeholder="Enter"
                value={formData?.amount?.toLocaleString()}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Amount "
              />
              <TextField
                type="date"
                size="small"
                variant="standard"
                label="Renewal Date"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, renewalDate: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Enter"
                onChange={(e) =>
                  setFormData({ ...formData, gstAmount: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="GST Amount "
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="Payment Details"
                fullWidth
                placeholder="Details"
                onChange={(e) =>
                  setFormData({ ...formData, paymentDetails: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="text"
                size="small"
                fullWidth
                variant="standard"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, serviceTakenFor: e.target.value })
                }
                placeholder="Service "
                label="Service Taken For"
              />
              <TextField
                type="file"
                size="small"
                variant="standard"
                label="Upload Bill"
                onChange={(e) =>
                  setFormData({ ...formData, bill: e.target.files[0] })
                }
                helperText="Auto get Bill link after Uploading"
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
            <Button
              onClick={() => handleSubmit()}
              variant="outlined"
              color="info"
            >
              Save
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Subscriptions;
