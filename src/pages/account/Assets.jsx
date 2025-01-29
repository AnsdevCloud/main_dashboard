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
import React from "react";
import HeadlineTag from "../../components/options/HeadlineTag";
import { Link } from "react-router-dom";

const Assets = () => {
  return (
    <Grid2 container spacing={2} p={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <HeadlineTag>Assets List</HeadlineTag>
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
          <HeadlineTag>Assets Details</HeadlineTag>
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
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              label="Model Name"
            />
            <TextField
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
              placeholder="Exp Date"
            />
          </Stack>
          <Stack flexDirection={"row"} gap={2} my={2} width={"100%"}>
            <TextField
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
              type="date"
              size="small"
              variant="standard"
              label="Renewal Date"
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
          <Button variant="outlined" color="info">
            Save
          </Button>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Assets;
