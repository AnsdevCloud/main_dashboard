import { HealthAndSafety } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";

import { FaCar, FaDotCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ sts = true }) => {
  const [hideDetails, setHideDetils] = useState(false);
  const navigate = useNavigate();

  const arr = [
    {
      label: "Material Status",
      value: "Married",
    },
    {
      label: "Email",
      value: "example@example.com",
    },
    {
      label: "Phone ",
      value: "+91 8989898989",
    },
    {
      label: "Aadhar  ",
      value: "3456 3423 4563",
    },
    {
      label: "Annual Income  ",
      value: " 12,00,000",
    },
    {
      label: "Occupation  ",
      value: "",
    },
    {
      label: "Nationality  ",
      value: "Indian",
    },
    {
      label: "Caste  ",
      value: "Hindu",
    },
    {
      label: "Nationality  ",
      value: "Indian",
    },
    {
      label: "Phone 2  ",
      value: "+91 7878787878",
    },
  ];
  const arr2 = [
    {
      label: "Residential Address",
      value: " Govind Nagar, Borivali West, Mumbai, Maharashtra 400091",
    },
    {
      label: "Office Address",
      value: "Govind Nagar, Borivali West, Mumbai, Maharashtra 400091",
    },
    {
      label: "Permanent Address",
      value: "Govind Nagar, Borivali West, Mumbai, Maharashtra 400091",
    },
    {
      label: "SOS Name  ",
      value: "Rohan",
    },
    {
      label: "SOS Number ",
      value: "+91 9898989898",
    },
  ];
  const arr3 = [
    {
      label: "Spouse",
      value: "Rina Goe",
    },
    {
      label: "Father",
      value: "Harish Goe",
    },
    {
      label: "Mother",
      value: "Rima Goe",
    },
    {
      label: "Childs",
      value: "4",
    },
    {
      label: "Spouse Age",
      value: "27 Y",
    },
    {
      label: "Father Age",
      value: "45 Y",
    },
    {
      label: "Mother Age",
      value: "38 Y",
    },
  ];

  const transection = [
    {
      date: "12/02/24",
      name: "SBI",
      amount: "2,345",
      sts: false,
    },
    {
      date: "14/02/24",
      name: "ICICI",
      amount: "2,545",
      sts: true,
    },
    {
      date: "03/02/24",
      name: "HDFC",
      amount: "2,645",
      sts: true,
    },
    {
      date: "03/02/24",
      name: "HDFC",
      amount: "2,645",
      sts: false,
    },
    {
      date: "03/02/24",
      name: "HDFC",
      amount: "2,645",
      sts: true,
    },
    {
      date: "03/02/24",
      name: "HDFC",
      amount: "2,645",
      sts: true,
    },
  ];

  return (
    <>
      <Grid2 container spacing={1} p={{ xs: 0, md: 2 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={0}>
            <Box padding={1}>
              <Typography
                variant="subtitle1"
                component={"h1"}
                fontWeight={600}
                color="textSecondary"
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <HiDotsVertical color="#ff5c00" /> Client Profile
              </Typography>

              <Grid2 container spacing={1}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Card elevation={0}>
                    <CardContent>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        width={"100%"}
                        gap={3}
                      >
                        <Avatar sx={{ width: 80, height: 80 }} />
                        <Box>
                          <Typography
                            component={"span"}
                            variant="caption"
                            color="grey"
                            fontWeight={500}
                          >
                            Full Name
                          </Typography>
                          <Typography
                            component={"h1"}
                            variant="subtitle1"
                            color="textSecondary"
                            fontWeight={600}
                          >
                            Mr. Rohan Goe
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"space-around"}
                  >
                    <Box>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        Birthday
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        Jan 15 1984
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        CID
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        EN24g54
                      </Typography>
                    </Box>
                  </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"space-around"}
                    bgcolor={(theme) => theme?.palette.background.default}
                    borderRadius={1}
                    padding={1}
                  >
                    <Box>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        Client Type
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        xxx
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        Customer Type
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        xxx
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        Gender
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        xxx
                      </Typography>
                    </Box>
                    <Box display={{ xs: "block", md: "none" }}>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        LP
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        Hindi
                      </Typography>
                    </Box>
                    <Box display={{ xs: "none", md: "block" }}>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        Language Preference
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        Hindi
                      </Typography>
                    </Box>
                  </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12 }} display={{ md: "none" }}>
                  <Button
                    sx={{ fontSize: 10 }}
                    onClick={() => setHideDetils(!hideDetails)}
                    startIcon={
                      !hideDetails ? (
                        <FaEye style={{ fontSize: "14px" }} />
                      ) : (
                        <FaEyeSlash style={{ fontSize: "14px" }} />
                      )
                    }
                    variant="outlined"
                    fullWidth
                  >
                    {" "}
                    Hide Full Details
                  </Button>
                </Grid2>
                {!hideDetails && (
                  <Grid2 size={{ xs: 12 }}>
                    <GridRow data={arr} title={"Parsonal Details"} />
                    <Divider sx={{ my: 1 }} />
                    <GridRow title={"Comunication Details"} data={arr2} />
                    <Divider sx={{ my: 1 }} />
                    <GridRow title={"Family Members"} data={arr3} />
                  </Grid2>
                )}
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={0}>
            <Box p={1}>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                alignContent={"center"}
                width={"100%"}
              >
                <Typography
                  variant="subtitle1"
                  component={"h1"}
                  fontWeight={600}
                  color="textSecondary"
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                >
                  <HiDotsVertical color="#ff5c00" /> Policy Activity
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                >
                  <Box
                    bgcolor={(theme) => theme?.palette.background.default}
                    padding={0.5}
                    fontSize={12}
                    borderRadius={1}
                    color={"green"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={1}
                  >
                    <FaDotCircle /> Active (2)
                  </Box>
                  <Box
                    bgcolor={(theme) => theme?.palette.background.default}
                    padding={0.5}
                    fontSize={12}
                    borderRadius={1}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={1}
                    component={Button}
                  >
                    <FaDotCircle /> Actions
                  </Box>
                </Box>
              </Stack>

              <Grid2 container spacing={2} p={1}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={1}
                    justifyContent={"space-around"}
                  >
                    <TransparentBox
                      value={4}
                      caption={"Total Policy"}
                      rgbColor="rgb(9, 153, 255)"
                      fullWidth
                    />
                    <TransparentBox
                      fullWidth
                      value={4}
                      tooltipText={"(H,L,M)"}
                      caption={"Policy Type"}
                    />
                    {/* <TransparentBox value={34} label={"Toatal Insurances"} /> */}
                  </Stack>
                </Grid2>{" "}
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={1}
                    justifyContent={"space-around"}
                  >
                    <TransparentBox
                      value={1.5 + " Cr"}
                      caption={"Sum Assured"}
                      labelText="Rs"
                      rgbColor="rgb(5, 173, 22)"
                      fullWidth
                    />
                    <TransparentBox
                      fullWidth
                      value={4324}
                      rgbColor="rgb(5, 138, 227)"
                      labelText="Rs"
                      caption={"Total Premium"}
                    />
                    {/* <TransparentBox value={34} label={"Toatal Insurances"} /> */}
                  </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 12 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    alignContent={"center"}
                    width={"100%"}
                  >
                    <Typography
                      variant="subtitle1"
                      component={"h1"}
                      fontWeight={600}
                      color="textSecondary"
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <HiDotsVertical color="#ff5c00" />
                      Transection
                    </Typography>
                  </Stack>

                  <TableContainer sx={{ overflowX: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              width: 20,
                              color: "#ff5c00",
                              fontWeight: 600,
                            }}
                          >
                            S.n.
                          </TableCell>
                          <TableCell
                            sx={{
                              minWidth: 100,
                              color: "#ff5c00",
                              fontWeight: 600,
                            }}
                          >
                            Date
                          </TableCell>

                          <TableCell
                            sx={{
                              minWidth: 100,
                              color: "#ff5c00",
                              fontWeight: 600,
                            }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            sx={{
                              minWidth: 100,
                              color: "#ff5c00",
                              fontWeight: 600,
                            }}
                          >
                            Amount
                          </TableCell>
                          <TableCell
                            sx={{
                              minWidth: 100,
                              color: "#ff5c00",
                              fontWeight: 600,
                            }}
                          >
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transection?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                color: "#ff5c00",
                                fontWeight: 600,
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell sx={{ minWidth: 100 }}>
                              {item?.date}
                            </TableCell>
                            <TableCell sx={{ minWidth: 100 }}>
                              {item?.name}
                            </TableCell>
                            <TableCell sx={{ minWidth: 100 }}>
                              {item?.amount}
                            </TableCell>
                            <TableCell
                              sx={{
                                minWidth: 100,
                                bgcolor: item?.sts
                                  ? "rgba(0, 255, 0, 0.182)"
                                  : "rgba(255, 0, 0, 0.158)",
                                color: item?.sts ? "rgb(6, 113, 6)" : "#b30909",
                              }}
                            >
                              {item?.sts ? "Paided" : " Failed"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid2>
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={0}>
            <Box p={1}>
              <Grid2 container spacing={2} py={1}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    alignContent={"center"}
                    width={"100%"}
                  >
                    <Typography
                      variant="subtitle1"
                      component={"h1"}
                      fontWeight={600}
                      color="textSecondary"
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <HiDotsVertical color="#ff5c00" /> Other Details
                    </Typography>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      gap={2}
                    >
                      <Box
                        bgcolor={(theme) => theme?.palette.background.default}
                        padding={0.5}
                        fontSize={12}
                        borderRadius={1}
                        color={"green"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        gap={1}
                      >
                        <FaDotCircle /> PDF
                      </Box>
                      <Box
                        bgcolor={(theme) => theme?.palette.background.default}
                        padding={0.5}
                        fontSize={12}
                        borderRadius={1}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        gap={1}
                        component={Button}
                      >
                        <FaDotCircle /> Excel
                      </Box>
                    </Box>
                  </Stack>
                  <Stack
                    my={1}
                    flexDirection={"row"}
                    width={"100%"}
                    gap={1}
                    flexWrap={"wrap"}
                  >
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        value={"Social Media"}
                        fontSize={20}
                        caption={"Lead Source"}
                        rgbColor="rgb(8, 94, 121)"
                        fullWidth
                      />
                    </Box>
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        fontSize={20}
                        caption={"Sourcing "}
                        value={"Enivesh"}
                        fullWidth
                        rgbColor="rgb(0, 80, 199)"
                      />
                    </Box>
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        fontSize={20}
                        caption={"Policy at Start "}
                        value={"New"}
                        fullWidth
                        rgbColor="rgb(99, 199, 0)"
                      />
                    </Box>
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        fontSize={20}
                        caption={"S. ENIVESH RM "}
                        value={""}
                        fullWidth
                        rgbColor="rgb(0, 186, 199)"
                      />
                    </Box>{" "}
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        fontSize={20}
                        caption={"S. ENIVESH Officer "}
                        value={""}
                        fullWidth
                        rgbColor="rgb(0, 33, 199)"
                      />
                    </Box>
                  </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    alignContent={"center"}
                    width={"100%"}
                  >
                    <Typography
                      variant="subtitle1"
                      component={"h1"}
                      fontWeight={600}
                      color="textSecondary"
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <HiDotsVertical color="#ff5c00" /> Policy Documents
                    </Typography>
                  </Stack>
                  <Stack
                    my={1}
                    flexDirection={"row"}
                    width={"100%"}
                    gap={1}
                    flexWrap={"wrap"}
                  >
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        value={<HealthAndSafety fontSize="50px" />}
                        onNavigate={"/docviews"}
                        fontSize={"50px"}
                        caption={"Health Insurance Documents"}
                        rgbColor="rgb(8, 94, 121)"
                        fullWidth
                      />
                    </Box>
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        value={<FaCar fontSize="50px" />}
                        onNavigate={"/docviews"}
                        fontSize={"50px"}
                        caption={"Car Insurance Documents "}
                        fullWidth
                        rgbColor="rgb(0, 80, 199)"
                      />
                    </Box>
                    <Box width={{ xs: "100%", sm: "48%" }}>
                      <TransparentBox
                        onNavigate={"/docviews"}
                        value={<GiLifeBar fontSize="50px" />}
                        fontSize={"50px"}
                        caption={"Life Insurance Documents "}
                        fullWidth
                        rgbColor="rgb(99, 199, 0)"
                      />
                    </Box>
                  </Stack>
                </Grid2>
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Layout;

const GridRow = ({ data = [], p, title, viewLimit }) => {
  const [isView, setIsView] = useState(false);
  const [limit, setLimit] = useState(viewLimit || 4);
  const handleLimit = () => {
    if (!isView) {
      setLimit(data?.length);
    } else {
      setLimit(viewLimit || 4);
    }
    setIsView(!isView);
  };
  return (
    <Box p={p || 1}>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        {title && (
          <Typography
            variant="body1"
            component={"h1"}
            fontWeight={500}
            color="primary"
          >
            {title}
          </Typography>
        )}
        {data?.length > 4 && (
          <Tooltip
            title={`${isView ? "Hide" : "View"}  ${
              data?.length - (viewLimit || 4)
            } Option`}
          >
            <IconButton
              onClick={() => handleLimit()}
              size="small"
              color={!isView ? "secondary" : "success"}
            >
              {isView ? <FaEye /> : <FaEyeSlash />}
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Grid2 container spacing={2}>
        {data.slice(0, limit)?.map((item, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Typography
                component={"span"}
                variant="caption"
                color="grey"
                fontWeight={500}
              >
                {item?.label}
              </Typography>
              <Typography
                component={"h1"}
                variant="body2"
                color="textSecondary"
                fontWeight={400}
              >
                {item?.value}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

const TransparentBox = ({
  value,
  caption,
  fontSize = 30,
  rgbColor = "rgb(255, 77, 0)",
  bgTransparency = 0.2,
  width,
  height,
  fullHeight = false,
  fullWidth = false,
  tooltipText = null,
  tooltipPlacement = "auto",
  labelColor,
  labelText,
  children,
  onNavigate,
}) => {
  // Function to calculate 20% of typography color
  const getBoxBgColor = (rgbColor) => {
    // Remove 'rgb(' and ')' then split into R, G, B
    const [r, g, b] = rgbColor.replace("rgb(", "").replace(")", "").split(",");
    return `rgba(${r.trim()}, ${g.trim()}, ${b.trim()}, ${bgTransparency})`; // Add alpha (20%)
  };

  return (
    <Tooltip
      title={tooltipText ? tooltipText : ""}
      placement={tooltipPlacement === "" ? "auto" : tooltipPlacement}
    >
      <Box
        component={Link}
        padding={1}
        sx={{
          textDecoration: "none",
          pointerEvents: onNavigate ? "auto" : "none",
        }}
        to={onNavigate || ""}
        position={"relative"}
        width={fullWidth ? "100%" : width ? width : "auto"}
        height={fullHeight ? "100%" : height ? height : "auto"}
        minWidth={100}
        bgcolor={getBoxBgColor(rgbColor)}
        borderRadius={1}
        display={children ? "block" : "flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignContent={"center"}
      >
        {children ? (
          children
        ) : (
          <>
            <Typography
              component={"h1"}
              variant="body2"
              color={rgbColor}
              fontSize={fontSize}
              fontWeight={500}
              textAlign={"center"}
            >
              {value}
            </Typography>
            <Typography
              component={"p"}
              variant="caption"
              color="grey"
              bgcolor={"transparent"}
              textAlign={"center"}
              fontWeight={500}
            >
              {caption}
            </Typography>
          </>
        )}
        {labelText && (
          <Box
            fontSize={12}
            fontWeight={500}
            position={"absolute"}
            top={"-5px"}
            left={0}
            p={0.5}
            // bgcolor={"rgba(24, 87, 2, 0.315)"}
            borderRadius={1}
            color={labelColor || "#045f04"}
          >
            {labelText || "Rs "}
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};
