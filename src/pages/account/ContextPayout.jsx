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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { ProductionQuantityLimitsSharp } from "@mui/icons-material";

const ContextPayout = () => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const [formData, setFormData] = useState({
    nos: "",
    partnerName: "",
    contastName: " ",
    considerationAmount: 0,
    ReferralPayoutRate: "",
    ReferralPayout: "",
    tdsRate: "",
    afterTDS: "",
    bill: "",
  });
  // console.log(formData);
  const handleSubmit = async () => {
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    if (
      formData?.nos > 0 &&
      formData?.partnerName &&
      formData?.ReferralPayout &&
      formData?.contastName &&
      formData?.afterTDS &&
      formData?.tdsRate &&
      formData?.considerationAmount &&
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
          {
            const myHeaders1 = new Headers();
            myHeaders1.append(
              "x-api-key",
              "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3"
            );
            myHeaders1.append("Content-Type", "application/json");
            const raw = JSON.stringify({
              collectionName: "partner",
              data: {
                ...formData,
                bill: result,
                payType: "cp",
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
                  nos: "",
                  partnerName: "",
                  contastName: " ",
                  considerationAmount: 0,
                  ReferralPayoutRate: "",
                  ReferralPayout: "",
                  tdsRate: "",
                  afterTDS: "",
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
    const partnersRef = collection(firestore, "partner");
    const q = query(partnersRef, where("payType", "==", "cp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const asets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(asets);
    });

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
          <Paper elevation={0} sx={{ p: 2 }}>
            <HeadlineTag>Regualer Payout</HeadlineTag>
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
                          {d?.partnerName}
                        </Typography>
                      </Stack>
                      <Box>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            Contest Name
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {d?.contastName}
                          </Typography>
                        </Stack>

                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            C. amount
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {d?.considerationAmount}
                          </Typography>
                        </Stack>

                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <Typography variant="caption" color="grey">
                            TDS
                          </Typography>
                          <Typography variant="body2" color="grey">
                            {d?.afterTDS}
                          </Typography>
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
            <HeadlineTag>Payout </HeadlineTag>

            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="text"
                size="small"
                fullWidth
                variant="standard"
                placeholder="Nos"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, nos: e.target.value })
                }
                label="Nos"
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="Partner name"
                placeholder="Name"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, partnerName: e.target.value })
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
                onChange={(e) =>
                  setFormData({ ...formData, contastName: e.target.value })
                }
                variant="standard"
                placeholder="Contest name"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Contest name"
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="Consideration Amount"
                fullWidth
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    considerationAmount: e.target.value,
                  })
                }
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
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ReferralPayoutRate: e.target.value,
                  })
                }
                variant="standard"
                placeholder="Referral Payout rate"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Referral Payout rate"
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="Referral Payout"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, ReferralPayout: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Referral Payout"
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              <TextField
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, tdsRate: e.target.value })
                }
                variant="standard"
                placeholder="TDS Rate"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="TDS Rate"
              />
              <TextField
                type="text"
                size="small"
                variant="standard"
                label="After TDS"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, afterTDS: e.target.value })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="After TDS"
              />
            </Stack>
            <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
              {/* <TextField
              type="text"
              size="small"
              fullWidth
               onChange={(e) =>
                setFormData({ ...formData, nos: e.target.value })
              }
              variant="standard"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder="Company Name"
              label="Company Name "
            /> */}
              <TextField
                type="file"
                size="small"
                variant="standard"
                label="Payment Details –"
                helperText="Auto get Invoice link after Uploading"
                fullWidth
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bill: e.target.files[0],
                  })
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

export default ContextPayout;
