import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadlineTag from "../../components/options/HeadlineTag";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { ProductionQuantityLimitsSharp } from "@mui/icons-material";

const Assets = () => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const [formData, setFormData] = useState({
    companyName: "",
    dateofPurchase: "",
    amount: 0,
    modelNumber: "",

    paymentDetails: "",
    userName: "",
    expDate: "",
    product: "",
    warrentyExpDate: "",
    bill: "",
  });
  const handleSubmit = async () => {
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    if (
      formData?.amount > 0 &&
      formData?.companyName &&
      formData?.dateofPurchase &&
      formData?.modelNumber &&
      formData?.product &&
      formData?.userName &&
      formData?.bill
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
          setAlert({
            alertMsg: `File URL : ${result?.url}`,
            alertType: "success",
          });
          {
            const myHeaders1 = new Headers();
            myHeaders1.append(
              "x-api-key",
              "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3"
            );
            myHeaders1.append("Content-Type", "application/json");
            const raw = JSON.stringify({
              collectionName: "assets",
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
                  companyName: "",
                  dateofPurchase: "",
                  amount: 0,
                  modelNumber: "",

                  paymentDetails: "",
                  userName: "",
                  expDate: "",
                  product: "",
                  warrentyExpDate: "",
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "assets"),
      (snapshot) => {
        const asets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(asets);
      }
    );

    // Cleanup function to unsubscribe from real-time listener when the component unmounts
    return () => unsubscribe();
  }, []);

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
          <Paper elevation={0} sx={{ p: 2, maxHeight: 600, overflowY: "auto" }}>
            <HeadlineTag>Assets List</HeadlineTag>
            {data?.map((d, i) => (
              <Box key={i} my={2}>
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
                        <Avatar>
                          <ProductionQuantityLimitsSharp />
                        </Avatar>
                        <Typography variant="subtitle2" color="info">
                          {d?.companyName}
                        </Typography>
                      </Stack>
                      <Box>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            Date Of Purchase
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {d?.dateofPurchase}
                          </Typography>
                        </Stack>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            Product
                          </Typography>
                          <Typography variant="body2" color="inital">
                            {d?.product}
                          </Typography>
                        </Stack>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            Amount
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {d?.amount}
                          </Typography>
                        </Stack>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            User Name
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {d?.userName}
                          </Typography>
                        </Stack>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            EXP Date
                          </Typography>
                          <Typography variant="body2" color="grey">
                            {d?.expDate}{" "}
                          </Typography>
                        </Stack>

                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            Product
                          </Typography>
                          <Typography
                            variant="body2"
                            component={Link}
                            color="info"
                          ></Typography>
                        </Stack>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            Invoice Link
                          </Typography>
                          <Typography
                            variant="body2"
                            component={Link}
                            color="info"
                            target="_blank"
                            to={d?.bill?.url}
                          >
                            Click Me
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <HeadlineTag>Assets Details</HeadlineTag>

            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                value={formData?.modelNumber}
                onChange={(e) =>
                  setFormData({ ...formData, modelNumber: e.target.value })
                }
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Enter"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Model Name"
              />
              <TextField
                value={formData?.dateofPurchase}
                onChange={(e) =>
                  setFormData({ ...formData, dateofPurchase: e.target.value })
                }
                type="date"
                size="small"
                variant="standard"
                label="Date Of Purchase"
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
                value={formData?.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                type="number"
                size="small"
                fullWidth
                variant="standard"
                placeholder="00000"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Amount"
              />
              <TextField
                value={formData?.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                type="text"
                size="small"
                variant="standard"
                label="User Name"
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="User"
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                value={formData?.paymentDetails}
                onChange={(e) =>
                  setFormData({ ...formData, paymentDetails: e.target.value })
                }
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Details"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Payment Details"
              />
              <TextField
                value={formData?.warrentyExpDate}
                onChange={(e) =>
                  setFormData({ ...formData, warrentyExpDate: e.target.value })
                }
                type="date"
                size="small"
                variant="standard"
                label="Warranty Exp Date"
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Warranty Exp Date"
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                value={formData?.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Name"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Product"
              />
              <TextField
                value={formData?.expDate}
                onChange={(e) =>
                  setFormData({ ...formData, expDate: e.target.value })
                }
                type="date"
                size="small"
                variant="standard"
                label="Exp Date"
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Exp Date"
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                value={formData?.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                type="text"
                size="small"
                fullWidth
                variant="standard"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Company Name"
                label="Company Name "
              />
              <TextField
                onChange={(e) =>
                  setFormData({ ...formData, bill: e.target.files[0] })
                }
                type="file"
                size="small"
                variant="standard"
                label="Upload Invoice"
                helperText="Auto get Invoice link after Uploading"
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

export default Assets;
