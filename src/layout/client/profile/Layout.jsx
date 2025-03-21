import { ArrowBack, Edit, HealthAndSafety } from "@mui/icons-material";
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
import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Firestore,
} from "firebase/firestore";

import { FaCar, FaDotCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../../firebase/config";

const Layout = ({ sts = true }) => {
  const { state } = useLocation();

  const { profile } = useParams();

  const [hideDetails, setHideDetils] = useState(false);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState({
    pd: [],
    cd: [],
    fd: [],
  });
  const navigate = useNavigate();
  const [policyData, setPolicyData] = useState([]);
  const [policyDocs, setPolicyDocs] = useState(null);
  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://db.enivesh.com/firestore/single/crm_clients/${id}`,
        {
          headers: {
            "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
            "Content-Type": "application/json",
          },
        }
      );
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFetchPolicy = async (id) => {
    const q = query(
      collection(firestore, "crm_relationship_values"),
      where("cin", "==", id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const polices = [];
      querySnapshot.forEach((doc) => {
        polices.push({ id: doc.id, ...doc.data() });
      });

      setPolicyData(polices);
      console.log("polices: ", polices);
      handleDocsMining(polices);
    });
  };

  const handleDocsMining = async (data) => {
    const lifePCC = data?.filter((v) => v.PCC === "life-insurance");
    const healthPCC = data?.filter((v) => v.PCC === "health-insurance");
    const carPCC = data?.filter((v) => v.PCC === "car-insurance");

    setPolicyDocs({ lifePCC, healthPCC, carPCC });
    sessionStorage.setItem(
      "x04_f4",
      JSON.stringify({ lifePCC, healthPCC, carPCC })
    );
  };
  console.log(policyDocs);

  useEffect(() => {
    if (state) {
      setData(state);
    } else {
      fetchData(profile);
    }
    if (policyData?.length < 1) {
      handleFetchPolicy(profile);
    }
    handleDocsMining(policyData);
  }, []);

  const arr = [
    {
      label: "Material Status",
      value: data?.meterialStatus,
    },
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "Phone ",
      value: `+91 ${data?.primaryNumber}`,
    },

    {
      label: "Annual Income  ",
      value: ` ${parseInt(data?.anualIncome)?.toLocaleString()}`,
      code: <>&#8377;</>,
    },
    {
      label: "Occupation  ",
      value: data?.occupation,
    },
    {
      label: "Nationality  ",
      value: data?.nationality,
    },
    {
      label: "Caste  ",
      value: data?.coste,
    },

    {
      label: "Phone 2  ",
      value: `+91 ${data?.secondaryNumber}`,
    },
    {
      label: "PAN  ",
      value: `${data?.panNumber}`,
    },
  ];
  const communication = [
    {
      label: "Residential Address",
      value: data?.communication?.residentialAddress,
    },
    {
      label: "Office Address",
      value: data?.communication?.officeAddress,
    },
    {
      label: "Permanent Address",
      value: data?.communication?.permanentAddress,
    },
    {
      label: "SOS Name  ",
      value: data?.communication?.emergencyContactName,
    },
    {
      label: "SOS Number ",
      value: data?.communication?.emergencyContactNumber,
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

  const handleEdit = () => {
    sessionStorage.setItem("cid", JSON.stringify(data?.cin));
    sessionStorage.setItem("cid-lock", JSON.stringify(true));
    sessionStorage.setItem("edit-data", JSON.stringify(data));
    navigate("/crm/parsonal/");
  };
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
                <HiDotsVertical color="#ff5c00" />
                <Stack
                  flexDirection={"row"}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  Client Profile - {profile}
                  <Button
                    size="small"
                    sx={{
                      fontSize: 10,
                    }}
                    color="inherit"
                    startIcon={<Edit fontSize={"8px"} />}
                    onClick={() => handleEdit()}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      fontSize: 10,
                    }}
                    color="inherit"
                    startIcon={<ArrowBack fontSize={"8px"} />}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </Stack>
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
                            {`${data?.fname} ${data?.lname}`}
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
                        {data?.dob}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component={"span"}
                        variant="caption"
                        color="grey"
                        fontWeight={500}
                      >
                        CIN
                      </Typography>
                      <Typography
                        component={"h1"}
                        variant="body2"
                        color="textSecondary"
                        fontWeight={500}
                      >
                        {data?.cin || data?.id}
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
                        textTransform={"capitalize"}
                      >
                        {data?.clientType?.split("-").join(" ")}
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
                        textTransform={"capitalize"}
                        fontWeight={500}
                      >
                        {data?.customerType}
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
                        textTransform={"uppercase"}
                        fontWeight={500}
                      >
                        {data?.gender}
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
                        {data?.communication?.languagePreference}
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
                        {data?.communication?.languagePreference}
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
                    <GridRow
                      title={"Comunication Details"}
                      data={communication}
                    />
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
                <Grid2 size={{ xs: 12, md: 2 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={1}
                    justifyContent={"space-around"}
                  >
                    <TransparentBox
                      value={policyData?.length}
                      caption={"Total Policy"}
                      rgbColor="rgb(9, 153, 255)"
                      fullWidth
                    />
                    {/* <TransparentBox
                      fullWidth
                      value={4}
                      tooltipText={"(H,L,M)"}
                      caption={"Policy Type"}
                    /> */}
                    {/* <TransparentBox value={34} label={"Toatal Insurances"} /> */}
                  </Stack>
                </Grid2>{" "}
                <Grid2 size={{ xs: 12, md: 10 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                    gap={1}
                    justifyContent={"space-around"}
                  >
                    <TransparentBox
                      value={policyData
                        .reduce((sum, policy) => sum + policy.sumassured, 0)
                        ?.toLocaleString()}
                      caption={"Sum Assured"}
                      labelText="Rs"
                      rgbColor="rgb(5, 173, 22)"
                      fullWidth
                    />
                    <TransparentBox
                      fullWidth
                      value={policyData
                        .reduce((sum, policy) => sum + policy.premium, 0)
                        ?.toLocaleString()}
                      rgbColor="rgb(5, 138, 227)"
                      labelText="Rs"
                      caption={"Total Premium"}
                    />
                    {/* <TransparentBox value={34} label={"Toatal Insurances"} /> */}
                  </Stack>
                </Grid2>
                {/* <Grid2 size={{ xs: 12, md: 12 }}>
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
                </Grid2> */}
              </Grid2>
            </Box>
          </Paper>
          {/* <Paper sx={{ p: 2, my: 2 }} elevation={0}>
            {policyData?.map((el, i) => (
              <Typography key={i}>{el?.cin}</Typography>
            ))}
          </Paper> */}
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
                    {policyDocs?.healthPCC?.length > 0 && (
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
                    )}
                    {policyDocs?.carPCC?.length > 0 && (
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
                    )}
                    {policyDocs?.lifePCC?.length > 0 && (
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
                    )}
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
                {item?.code} {item?.value}
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
