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
import React, { useState } from "react";
import HeadlineTag from "../../components/options/HeadlineTag";
import { Link } from "react-router-dom";

const RegularPayout = () => {
  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const [formData, setFormData] = useState({
    nos: "",
    partnerName: "",

    considerationAmount: 0,
    ReferralPayoutRate: "",
    ReferralPayout: "",
    tdsRate: "",
    afterTDS: "",
    paymentDetailFile: "",
    clientName: "",
  });
  // console.log(formData);
  const handleSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Origin", "http://localhost:5173");
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "partners",
      data: {
        ...formData,
        collectionCode: "regularPayout",
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
      formData?.partnerName > 0 &&
      formData?.clientName &&
      formData?.afterTDS &&
      formData?.ReferralPayout &&
      formData?.nos
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
    <Grid2 container spacing={2} p={2}>
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
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <HeadlineTag>Regular Payout</HeadlineTag>
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
                        Date Of Purchase
                      </Typography>
                      <Typography variant="body2" color="initial">
                        12/02/2025{" "}
                      </Typography>
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        Brand
                      </Typography>
                      <Typography variant="body2" color="inital">
                        Samsung
                      </Typography>
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        Amount
                      </Typography>
                      <Typography variant="body2" color="initial">
                        100000
                      </Typography>
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        Financial Product
                      </Typography>
                      <Typography variant="body2" color="initial">
                        FSJ
                      </Typography>
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        EXP Date
                      </Typography>
                      <Typography
                        variant="body2"
                        component={Link}
                        color="info"
                      ></Typography>
                    </Stack>

                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography variant="caption" color="grey">
                        Product
                      </Typography>
                      <Typography
                        variant="body2"
                        component={Link}
                        color="info"
                      ></Typography>
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
          {" "}
          {/* <Box my={2} width={300}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" size="small">
                Device Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //   value={age}
                label="Device Type"
                size="small"
                //   onChange={handleChange}
              >
                <MenuItem value={"mobile"}>Mobile</MenuItem>
                <MenuItem value={"tablat"}>Tablat</MenuItem>
                <MenuItem value={"laptop"}>Laptop</MenuItem>
                <MenuItem value={"system"}>System</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
            <TextField
              type="text"
              size="small"
              fullWidth
              variant="standard"
              placeholder="Enter"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nos: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              label="Nos"
            />
            <TextField
              type="text"
              size="small"
              variant="standard"
              label="Partner Name"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  partnerName: e.target.value,
                })
              }
            />
          </Stack>
          <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
            <TextField
              type="text"
              size="small"
              fullWidth
              variant="standard"
              placeholder="Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientName: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              label="Client Name"
            />
            <TextField
              type="text"
              size="small"
              variant="standard"
              label="Financial Product"
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  financialProduct: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder="Product"
            />
          </Stack>
          <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
            <TextField
              type="text"
              size="small"
              fullWidth
              variant="standard"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  considerationAmount: e.target.value,
                })
              }
              placeholder="Consideration Amount"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              label="Consideration Amount"
            />
            <TextField
              type="text"
              size="small"
              variant="standard"
              label="Referral Payout rate"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ReferralPayoutRate: e.target.value,
                })
              }
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder="Referral Payout rate"
            />
          </Stack>
          <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
            <TextField
              type="text"
              size="small"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ReferralPayout: e.target.value,
                })
              }
              fullWidth
              variant="standard"
              placeholder="Referral Payout"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              label="Referral Payout"
            />
            <TextField
              type="text"
              size="small"
              variant="standard"
              label="TDS Rate"
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tdsRate: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder="TDS Rate"
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
                setFormData({
                  ...formData,
                  afterTDS: e.target.value,
                })
              }
              placeholder="After TDS"
              label="After TDS "
            />
            <TextField
              type="file"
              size="small"
              variant="standard"
              label="Payment Details"
              helperText="Auto get Invoice link after Uploading"
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentDetailFile: e.target.value,
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
  );
};

export default RegularPayout;
