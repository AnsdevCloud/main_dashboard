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

const Utility = () => {
  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const [formData, setFormData] = useState({
    utilityName: "",
    period: "",
    paymentMode: "",
    companyName: "",
    amount: 0,
    dueDate: "",
    paymentDetail: "",
    bill: "",
  });

  const handleSubmit = async () => {
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    if (
      formData?.amount > 0 &&
      formData?.companyName &&
      formData?.utilityName &&
      formData?.paymentMode &&
      formData?.paymentDetail &&
      formData?.period
    ) {
      const formdata = new FormData();
      formdata.append(
        "file",
        formData?.bill,
        "postman-cloud:///1efb1536-cd67-4290-be90-c318af78c49e"
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://db.enivesh.com/storage/upload-file", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          {
            const myHeaders1 = new Headers();
            myHeaders1.append(
              "x-api-key",
              "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3"
            );
            myHeaders1.append("Content-Type", "application/json");
            const raw = JSON.stringify({
              collectionName: "utilitybill",
              data: {
                ...formData,
                bill: result,
                timestamp: new Date().getTime(),
              },
            });

            const requestOptions = {
              method: "POST",
              headers: myHeaders1,
              body: raw,
              redirect: "follow",
            };
            fetch("https://db.enivesh.com/firestore/add", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                setAlert({
                  alertMsg: ` ${result?.message} : ${result?.docId} `,
                  alertType: "success",
                });
                setFormData({
                  utilityName: "",
                  period: "",
                  paymentMode: "",
                  companyName: "",
                  amount: 0,
                  dueDate: "",
                  paymentDetail: "",
                  bill: "",
                });
              })
              .catch((error) => {
                setAlert({
                  alertMsg: `Failled`,
                  alertType: "error",
                });
              });
          }
        })
        .catch((error) => console.error(error));
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
            <HeadlineTag>Utility BIll</HeadlineTag>
            <Box my={2}>
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
                        Vodafone
                      </Typography>
                    </Stack>
                    <Box>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={2}
                      >
                        <Typography variant="caption" color="grey">
                          Payment Date
                        </Typography>
                        <Typography variant="body2" color="initial">
                          12/02/2025{" "}
                        </Typography>
                      </Stack>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={2}
                      >
                        <Typography variant="caption" color="grey">
                          Bill Copy Link
                        </Typography>
                        <Typography
                          variant="body2"
                          component={Link}
                          color="info"
                        >
                          Click Me
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <HeadlineTag>Add Bill</HeadlineTag>

            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Name"
                onChange={(e) =>
                  setFormData({ ...formData, utilityName: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Utility Name"
              />
              <TextField
                type="date"
                size="small"
                variant="standard"
                label="Period"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
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
                onChange={(e) =>
                  setFormData({ ...formData, paymentMode: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Payment Mode"
                label="Payment Mode"
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="Company Name"
                placeholder="Compnay "
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
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
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Due Date"
                label="Due Date"
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="Payment Details"
                placeholder="Payment Details"
                onChange={(e) =>
                  setFormData({ ...formData, paymentDetail: e.target.value })
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
                variant="standard"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Amount"
                label="Amount"
              />
              <TextField
                type="file"
                size="small"
                variant="standard"
                label="Upload Bill"
                helperText="Auto get file link after Uploading"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, bill: e.target.files[0] })
                }
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

export default Utility;
