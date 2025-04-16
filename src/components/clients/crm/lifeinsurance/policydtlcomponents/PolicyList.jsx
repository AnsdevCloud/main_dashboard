import {
  Alert,
  Box,
  Button,
  Divider,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadlineTag from "../../../../options/HeadlineTag";
import DynamicDataGrid from "../../../../options/DynamicDataGrid";
import { OpenInNew, QuestionMark } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useEncryptedSessionStorage from "../../../../../hooks/useEncryptedSessionStorage";
import { firestore } from "../../../../../firebase/config";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { useTabs } from "../../../../../stores/TabsContex";

const PolicyList = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { addTab } = useTabs();
  const [searchQ, setSearchQ] = useState("");
  const navigate = useNavigate();
  const [isHestory, setIsHistory] = useEncryptedSessionStorage("lf-p-his", []);
  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://db.enivesh.com/firestore/all/life_insurance_policies?limit=10`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setSearchResult(result?.documents || []);
      });
  };
  useEffect(() => {
    // handleSubmit();
    // console.log(isHestory);
  }, []);

  const handleLinkOpen = (e, t) => {
    let newHis = isHestory?.filter(
      (value, index, array) => value?.policyNumber !== t?.policyNumber
    );

    setIsHistory([...newHis, { ...t }]);
    handleNavigate(e, { ...t });
  };

  const searchByName = async (e) => {
    try {
      const usersRef = collection(firestore, "life_insurance_policies");
      const queryName = query(
        usersRef,
        where("proposerName", ">=", searchQ),
        where("proposerName", "<=", searchQ + "\uf8ff")
      );
      const snapshot1 = await getDocs(queryName);
      const searchResultsName = snapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const queryPolicyNumber = query(
        usersRef,
        where("policyNumber", ">=", searchQ),
        where("policyNumber", "<=", searchQ + "\uf8ff")
      );
      const snapshot = await getDocs(queryPolicyNumber);
      const searchResultsPolicy = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const querypanNumber = query(
        usersRef,
        where("panNumber", ">=", searchQ),
        where("panNumber", "<=", searchQ + "\uf8ff")
      );
      const snapshotPan = await getDocs(querypanNumber);
      const searchResultsPan = snapshotPan.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSearchResult([
        ...searchResultsName,
        ...searchResultsPolicy,
        ...searchResultsPan,
      ]);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQ(e);
    if (e?.length >= 3) {
      searchByName();
    }
  };

  const handleNavigate = (e, t) => {
    e.preventDefault();
    if (e?.ctrlKey === true) {
      addTab({
        name: t?.policyNumber,
        link: `/crm/life-insurance/policy/${t?.policyNumber}`,
      });
      navigate(`/crm/life-insurance/policy/${t?.policyNumber}`, {
        state: { ...t },
      });
    } else {
      navigate(`/crm/life-insurance/policy/${t?.policyNumber}`, {
        state: { ...t },
      });
    }
  };

  return (
    <Paper elevation={1} sx={{ m: 1, p: 1 }}>
      <HeadlineTag title={"Policies"} />
      <Grid2 container spacing={1} wrap="wrap-reverse">
        <Grid2 size={{ xs: 12, sm: 8 }}>
          <HeadlineTag size={"small"} my={2} title={"Recently Visit"} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ color: "#ff5c00" }}>
                <TableRow>
                  <TableCell sx={{ minWidth: 100, color: "#ff5c00" }}>
                    Policy No.
                  </TableCell>
                  <TableCell sx={{ minWidth: 100, color: "#ff5c00" }}>
                    Pro.Name
                  </TableCell>
                  <TableCell sx={{ minWidth: 100, color: "#ff5c00" }}>
                    Riders
                  </TableCell>
                  <TableCell sx={{ minWidth: 120, color: "#ff5c00" }}>
                    Start Date
                  </TableCell>
                  <TableCell sx={{ minWidth: 120, color: "#ff5c00" }}>
                    Sum Assured
                  </TableCell>
                  <TableCell sx={{ minWidth: 120, color: "#ff5c00" }}>
                    B. Premium
                  </TableCell>
                  <TableCell sx={{ minWidth: 30, color: "#ff5c00" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isHestory?.map((t, i) => (
                  <TableRow hover>
                    <TableCell sx={{ minWidth: 100 }}>
                      {t?.policyNumber}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {t?.proposerName}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {t?.riders?.length}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>{t?.startDate}</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      {t?.sumAssured}
                    </TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      {t?.basePremium}
                    </TableCell>
                    <TableCell sx={{ minWidth: 30 }}>
                      <Button
                        endIcon={<OpenInNew />}
                        variant="text"
                        fullWidth
                        color="success"
                        onClick={(e) => {
                          handleNavigate(e, { ...t });
                        }}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {isHestory?.length === 0 && (
              <Alert sx={{ width: "100%" }} severity="info">
                0 Activilty Record
              </Alert>
            )}
          </TableContainer>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }} minHeight={"76vh"}>
          <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
            <HeadlineTag
              size={"small"}
              my={2}
              title={"Search Policy"}
              iconColor={"#15abe1"}
            />{" "}
            <TextField
              fullWidth
              size="small"
              variant="standard"
              color="info"
              onChange={(e) => handleSearch(e.target.value)}
              label="Search"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              placeholder="Policy number / Holder Name"
            />
            <Stack maxHeight={450} overflow={"auto"}>
              <Typography variant="caption" my={1} color="grey">
                Result{" "}
                <Tooltip title="Result Order: policy Number - holder name - cin ">
                  <QuestionMark fontSize="10px" />
                </Tooltip>
              </Typography>
              {searchResult?.map((t, i) => (
                <Box
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      bgcolor: (theme) => theme.palette.background.default,
                    },
                    borderRadius: 1,
                  }}
                  component={"div"}
                  onClick={(e) => handleLinkOpen(e, { ...t })}
                  px={2}
                  py={1}
                  key={i}
                >
                  <Typography variant="body2" component={"p"} color="info">
                    {" "}
                    {t?.policyNumber}
                    {" - "}
                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark" ? "#f9f9f9" : "#090900",
                      }}
                      component={"span"}
                      variant="body2"
                    >
                      {t?.proposerName} {"  -  "} {t?.cin}
                    </Typography>
                  </Typography>
                  <Divider />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default PolicyList;
