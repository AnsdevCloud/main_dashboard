import {
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

const ContextPayout = () => {
  const [formData, setFormData] = useState({
    nos: "",
    partnerName: "",
    contastName: " ",
    considerationAmount: 0,
    ReferralPayoutRate: "",
    ReferralPayout: "",
    tdsRate: "",
    afterTDS: "",
    paymentDetailFile: "",
  });
  console.log(formData);

  return (
    <Grid2 container spacing={2} p={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <HeadlineTag>Context Payout List</HeadlineTag>
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
                        User Name
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
          <HeadlineTag>Payout </HeadlineTag>
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
                setFormData({ ...formData, ReferralPayoutRate: e.target.value })
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
                  paymentDetailFile: e.target.files[0],
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Stack>
          <Button variant="outlined" color="info">
            Save
          </Button>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default ContextPayout;
