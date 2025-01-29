import React, { useState } from "react";
import HeadlineTag from "../../options/HeadlineTag";
import {
  Grid2,
  Paper,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  Box,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const states = [
  { key: 1, name: "Andhra Pradesh", code: "AP" },
  { key: 2, name: "Arunachal Pradesh", code: "AR" },
  { key: 3, name: "Assam", code: "AS" },
  { key: 4, name: "Bihar", code: "BR" },
  { key: 5, name: "Chhattisgarh", code: "CG" },
  { key: 6, name: "Goa", code: "GA" },
  { key: 7, name: "Gujarat", code: "GJ" },
  { key: 8, name: "Haryana", code: "HR" },
  { key: 9, name: "Himachal Pradesh", code: "HP" },
  { key: 10, name: "Jharkhand", code: "JH" },
  { key: 11, name: "Karnataka", code: "KA" },
  { key: 12, name: "Kerala", code: "KL" },
  { key: 13, name: "Madhya Pradesh", code: "MP" },
  { key: 14, name: "Maharashtra", code: "MH" },
  { key: 15, name: "Manipur", code: "MN" },
  { key: 16, name: "Meghalaya", code: "ML" },
  { key: 17, name: "Mizoram", code: "MZ" },
  { key: 18, name: "Nagaland", code: "NL" },
  { key: 19, name: "Odisha", code: "OR" },
  { key: 20, name: "Punjab", code: "PB" },
  { key: 21, name: "Rajasthan", code: "RJ" },
  { key: 22, name: "Sikkim", code: "SK" },
  { key: 23, name: "Tamil Nadu", code: "TN" },
  { key: 24, name: "Telangana", code: "TG" },
  { key: 25, name: "Tripura", code: "TR" },
  { key: 26, name: "Uttar Pradesh", code: "UP" },
  { key: 27, name: "Uttarakhand", code: "UK" },
  { key: 28, name: "West Bengal", code: "WB" },
  { key: 29, name: "Andaman and Nicobar Islands", code: "AN" },
  { key: 30, name: "Chandigarh", code: "CH" },
  { key: 31, name: "Dadra and Nagar Haveli and Daman and Diu", code: "DN" },
  { key: 32, name: "Delhi", code: "DL" },
  { key: 33, name: "Jammu and Kashmir", code: "JK" },
  { key: 34, name: "Ladakh", code: "LA" },
  { key: 35, name: "Lakshadweep", code: "LD" },
  { key: 36, name: "Puducherry", code: "PY" },
];

const company = [
  {
    companyName: "SBI",
    type: "sales",
    gst: [
      {
        state: "Uttar Pradesh",
        code: "UP",
        type: "SGST",
        number: "UP3DK92NDX39",
      },
      {
        state: "Maharashtra",
        code: "MH",
        type: "CGST",
        number: "MH4NDX293ND3",
      },
    ],
  },
  {
    companyName: "HDFC Bank",
    type: "purchase",
    gst: [
      {
        state: "Gujarat",
        code: "GJ",
        type: "IGST",
        number: "GJ4NSX394ND9",
      },
      {
        state: "Delhi",
        code: "DL",
        type: "SGST",
        number: "DL2NSK3949NDX",
      },
      {
        state: "Tamil Nadu",
        code: "TN",
        type: "CGST",
        number: "TN3NDX294JD93",
      },
    ],
  },
  {
    companyName: "ICICI Bank",
    type: "sales",
    gst: [
      {
        state: "Karnataka",
        code: "KA",
        type: "SGST",
        number: "KA3NDK492JD93",
      },
      {
        state: "West Bengal",
        code: "WB",
        type: "IGST",
        number: "WB9XND39JD93N",
      },
    ],
  },
  {
    companyName: "Axis Bank",
    type: "purchase",
    gst: [
      {
        state: "Rajasthan",
        code: "RJ",
        type: "CGST",
        number: "RJ2DK39XND392",
      },
      {
        state: "Kerala",
        code: "KL",
        type: "SGST",
        number: "KL3NDX392JD93",
      },
      {
        state: "Odisha",
        code: "OR",
        type: "IGST",
        number: "OR4NDK493ND39",
      },
    ],
  },
  {
    companyName: "Tata Steel",
    type: "sales",
    gst: [
      {
        state: "Punjab",
        code: "PB",
        type: "SGST",
        number: "PB9NDK392ND93",
      },
      {
        state: "Madhya Pradesh",
        code: "MP",
        type: "CGST",
        number: "MP3NDK294ND93",
      },
    ],
  },
  {
    companyName: "Reliance Industries",
    type: "purchase",
    gst: [
      {
        state: "Telangana",
        code: "TG",
        type: "SGST",
        number: "TG3NDX392ND93",
      },
      {
        state: "Assam",
        code: "AS",
        type: "IGST",
        number: "AS4NDX394ND92",
      },
    ],
  },
  {
    companyName: "Infosys",
    type: "sales",
    gst: [
      {
        state: "Chhattisgarh",
        code: "CG",
        type: "SGST",
        number: "CG3NDK492ND93",
      },
      {
        state: "Jharkhand",
        code: "JH",
        type: "IGST",
        number: "JH9NDK394ND39",
      },
      {
        state: "Uttarakhand",
        code: "UK",
        type: "CGST",
        number: "UK4NDX293ND93",
      },
    ],
  },
  {
    companyName: "Wipro",
    type: "purchase",
    gst: [
      {
        state: "Bihar",
        code: "BR",
        type: "CGST",
        number: "BR3NDK392JD93",
      },
      {
        state: "Haryana",
        code: "HR",
        type: "SGST",
        number: "HR4NDX3949NDX",
      },
    ],
  },
  {
    companyName: "Larsen & Toubro",
    type: "sales",
    gst: [
      {
        state: "Andhra Pradesh",
        code: "AP",
        type: "SGST",
        number: "AP3NDK492ND93",
      },
      {
        state: "Kerala",
        code: "KL",
        type: "IGST",
        number: "KL9NDK3949ND92",
      },
    ],
  },
  {
    companyName: "Adani Group",
    type: "purchase",
    gst: [
      {
        state: "Tamil Nadu",
        code: "TN",
        type: "CGST",
        number: "TN3NDX2939ND92",
      },
      {
        state: "Delhi",
        code: "DL",
        type: "IGST",
        number: "DL9NDK492ND93",
      },
    ],
  },
];

const AddCompany = () => {
  const [search, setSearch] = useState("");
  return (
    <Grid2 container spacing={2} py={1}>
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag textTransform={"uppercase"}>Company Lists</HeadlineTag>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ p: 1 }}>
          <HeadlineTag size={"small"} iconColor={"grey"}>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              New Company{" "}
              <Button
                sx={{
                  fontSize: 8,
                  zIndex: 10,
                  py: 0.2,
                  textTransform: "uppercase",
                }}
                variant="outlined"
                color="info"
                size="small"
              >
                Upload Logo
              </Button>
            </Stack>
          </HeadlineTag>

          <Stack my={1} p={1} gap={2}>
            <TextField
              id="standard-helperText"
              label="Name"
              type="text"
              fullWidth
              //   helperText="Enter your TFD Amount"
              variant="standard"
              placeholder="ex: Enivesh"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              gap={5}
              justifyContent={"space-between"}
            >
              <FormControl fullWidth size="small">
                <InputLabel
                  sx={{ fontSize: 14, color: "grey" }}
                  id="demo-simple-select-label"
                  size="small"
                >
                  Type
                </InputLabel>
                <Select
                  sx={{ fontSize: 14, color: "grey" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Type"
                  size="small"
                  variant="standard"
                  // onChange={handleChange}
                >
                  <MenuItem value={10} sx={{ fontSize: 10, color: "grey" }}>
                    Sales
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 10, color: "grey" }}>
                    Purchase
                  </MenuItem>
                </Select>
              </FormControl>
              <Tooltip title="Add Type">
                <IconButton size="small" color="success">
                  <Add />
                </IconButton>
              </Tooltip>
            </Stack>
            <Divider>
              <Typography variant="caption" fontWeight={600} color="grey">
                {" "}
                GST
              </Typography>
            </Divider>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              gap={5}
              justifyContent={"space-between"}
            >
              <FormControl fullWidth size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ fontSize: 12 }}
                  size="small"
                >
                  GST Type
                </InputLabel>
                <Select
                  sx={{ fontSize: 14, color: "grey" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Type"
                  size="small"
                  variant="standard"
                  // onChange={handleChange}
                >
                  <MenuItem sx={{ fontSize: 10, color: "grey" }} value={10}>
                    GST1
                  </MenuItem>
                  <MenuItem sx={{ fontSize: 10, color: "grey" }} value={20}>
                    GST1
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ fontSize: 12 }}
                  size="small"
                >
                  States
                </InputLabel>
                <Select
                  sx={{ fontSize: 14, color: "grey" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Type"
                  size="small"
                  variant="standard"
                  // onChange={handleChange}
                >
                  {states?.map((item, index) => (
                    <MenuItem
                      key={index}
                      sx={{ fontSize: 10, color: "grey" }}
                      value={item?.code}
                    >
                      {item.name} - ({item?.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <TextField
              fullWidth
              label="GST Number"
              name="gst_number"
              type="text"
              placeholder="ASJ34JD049D9394 "
              variant="standard"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>
          <Stack
            my={2}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={3}
          >
            <Button color="info" variant="outlined" size="small" fullWidth>
              Save
            </Button>
          </Stack>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ p: 1, maxHeight: 600, overflowY: "auto" }}>
          <Box
            position={"sticky"}
            top={-10}
            zIndex={10}
            bgcolor={"inherit"}
            height={"auto"}
          >
            <HeadlineTag size={"small"}>Check Existing </HeadlineTag>
          </Box>

          <Box my={2}>
            <TextField
              size="small"
              color="info"
              id=""
              label="Search Company"
              value={search}
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
            />

            <HeadlineTag
              size={"10px"}
              variant={"caption"}
              iconColor={"grey"}
              titleColor={"grey"}
              my={2}
            >
              Results
            </HeadlineTag>

            {company
              ?.filter(
                (s, i) =>
                  s.companyName
                    .toLocaleLowerCase()
                    ?.includes(search.toLowerCase()) ||
                  s.type.toLocaleLowerCase()?.includes(search.toLowerCase())
              )
              ?.map((item, index) => (
                <Paper key={index} sx={{ p: 1 }} variant="outlined">
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={2}
                    mb={1}
                  >
                    <Avatar sx={{ width: 30, height: 30 }} />{" "}
                    <Typography
                      variant="subtitle1"
                      component={"h1"}
                      color="grey"
                      fontWeight={600}
                    >
                      {item?.companyName || "Enivesh"}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: "grey",
                            fontSize: 12,
                            textTransform: "uppercase",
                          }}
                        >
                          GST
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: "grey",
                            fontSize: 12,
                            textTransform: "uppercase",
                          }}
                        >
                          state
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: "grey",
                            fontSize: 12,
                            textTransform: "uppercase",
                          }}
                        >
                          GST Number
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item?.gst?.map((g, i) => (
                        <TableRow key={i}>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: "inherit",
                              fontSize: 10,
                            }}
                          >
                            {g?.type}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: "inherit",
                              fontSize: 10,
                            }}
                          >
                            {g?.code}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: "inherit",
                              fontSize: 10,
                            }}
                          >
                            {g.number}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              ))}
          </Box>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default AddCompany;
