import {
  Alert,
  Box,
  Button,
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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadlineTag from "../../../options/HeadlineTag";

import { Edit, OpenInNew, QuestionMark } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useEncryptedSessionStorage from "../../../../hooks/useEncryptedSessionStorage";
import { firestore } from "../../../../firebase/config";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { useTabs } from "../../../../stores/TabsContex";

const HPolicyList = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { addTab } = useTabs();
  const [searchQ, setSearchQ] = useState("");
  const navigate = useNavigate();
  const [isHestory, setIsHistory] = useEncryptedSessionStorage("hi-p-his", []);

  const handleLinkOpen = (e, t) => {
    let newHis = isHestory?.filter(
      (value, index, array) => value?.policyNumber !== t?.policyNumber
    );

    setIsHistory([...newHis, { ...t }]);
    handleNavigate(e, { ...t });
  };

  const searchByName = async (e) => {
    try {
      const usersRef = collection(firestore, "health_insurance_policies");
      const queryName = query(
        usersRef,
        where("proposer_name", ">=", searchQ),
        where("proposer_name", "<=", searchQ + "\uf8ff")
      );
      const snapshot1 = await getDocs(queryName);
      const searchResultsName = snapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const queryPolicyNumber = query(
        usersRef,
        where("policy_no", ">=", searchQ),
        where("policy_no", "<=", searchQ + "\uf8ff")
      );
      const snapshot = await getDocs(queryPolicyNumber);
      const searchResultsPolicy = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const querypanNumber = query(
        usersRef,
        where("pan_number", ">=", searchQ),
        where("pan_number", "<=", searchQ + "\uf8ff")
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
        name: t?.policy_no,
        link: `/crm/health-insurance/policy/${t?.policy_no}`,
      });
      navigate(`/crm/health-insurance/policy/${t?.policy_no}`, {
        state: { ...t },
      });
    } else {
      navigate(`/crm/health-insurance/policy/${t?.policy_no}`, {
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
                    <TableCell sx={{ minWidth: 100 }}>{t?.policy_no}</TableCell>
                    <TableCell
                      sx={{ minWidth: 100, textTransform: "capitalize" }}
                    >
                      {t?.proposer_name}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {t?.benifits?.length}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {t?.start_date}
                    </TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      {t?.sum_assured}
                    </TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      {t?.base_premium || t?.premium}
                    </TableCell>
                    <TableCell sx={{ minWidth: 30 }}>
                      <IconButton
                        variant="text"
                        size="small"
                        fullWidth
                        color="inherit"
                        sx={{ fontSize: 15 }}
                        disabled
                        onClick={(e) => {
                          handleNavigate(e, { ...t });
                        }}
                      >
                        <Edit fontSize="8px" />
                      </IconButton>
                      <Tooltip title="Open">
                        <IconButton
                          variant="text"
                          sx={{ fontSize: 15 }}
                          size="small"
                          color="info"
                          onClick={(e) => {
                            handleNavigate(e, { ...t });
                          }}
                        >
                          <OpenInNew fontSize="8px" />
                        </IconButton>
                      </Tooltip>
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
                    {t?.policy_no}
                    {" - "}
                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark" ? "#f9f9f9" : "#090900",
                      }}
                      component={"span"}
                      variant="body2"
                    >
                      {t?.proposer_name} {"  -  "} {t?.cin}
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

export default HPolicyList;
