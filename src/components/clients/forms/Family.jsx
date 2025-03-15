import { Add, ArrowBack, Close, Delete, Save } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../theme/ThemeContext";
import FamilyTree from "../../charts/mindmister/FamilyTree";

const Family = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);
  let ct = JSON.parse(sessionStorage.getItem("ct"));

  const [ChildList, setChildList] = useState([]);
  const cid = JSON.parse(sessionStorage.getItem("cid"));
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [memberObj, setMemberObj] = useState({ type: "", name: "", age: "" });
  const [grandChildParents, setGrandChildParents] = useState({
    type: "",
    name: "",
    age: "",
  });
  // यदि members empty हैं और CID मौजूद है तो फॉर्म open करें
  const [isOpen, setIsOpen] = useState(members.length === 0 && Boolean(cid));

  // ctn sessionStorage से, जिससे gender आदि प्राप्त हो सके
  const ctn = JSON.parse(sessionStorage.getItem("ctn"));

  // Edit data या पहले से stored members लोड करें
  useEffect(() => {
    const editData = JSON.parse(sessionStorage.getItem("edit-data"));
    if (editData?.id) {
      setEdit(true);
      if (editData?.members) {
        setMembers(editData.members);
      }
    } else {
      const storedMembers = JSON.parse(sessionStorage.getItem("mem"));
      if (storedMembers) setMembers(storedMembers);
    }
  }, []);

  // Date of Birth से age calculate करने का function
  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }
    return { years, months, days };
  };

  const handleAddMember = () => {
    const { years, months, days } = calculateAge(memberObj.age);
    const fullage = `${years} Y, ${months} M, ${days} D`;
    if (
      memberObj.name &&
      memberObj.age &&
      memberObj.type &&
      (years > 0 || months > 0)
    ) {
      const newMember = {
        ...memberObj,
        age: years > 0 ? `${years} Y` : `${months} M`,
        fullage,
      };
      const updatedMembers = [...members, newMember];
      setMembers(updatedMembers);
      sessionStorage.setItem("mem", JSON.stringify(updatedMembers));
      setMemberObj({ type: "", name: "", age: "" });
    } else {
      alert(
        months === 0
          ? `Your age ${years}.${months} years not eligible`
          : "Not empty"
      );
    }
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    sessionStorage.setItem("mem", JSON.stringify(updatedMembers));
  };

  const handleOpenForm = () => {
    if (members.length < 20) {
      setIsOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (members.length === 0) {
      alert("Empty Members");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ members });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      );
      await response.text();
      alert(edit ? "Updated" : "Added");
      setMembers([]);
      navigate("/crm/bank");
    } catch (error) {
      console.error(error);
    }
  };
  const filterMembers = (types) =>
    members
      .filter((el) => types.includes(el.type))
      .map((i) => ({
        name: i.name,
        attributes: { type: i.type?.split("_")?.join(" ") },
        children: [],
      }));
  // treeData को compute करें: केवल उन branches को शामिल करें जिनमें members मौजूद हैं,
  // साथ ही Grand Parents का नया branch भी जोड़ें
  let gcp = JSON.parse(sessionStorage.getItem("gpc"));

  const treeData = useMemo(() => {
    // A helper to filter members by given types and format them for the tree.
    const filterMembers = (types) =>
      members
        .filter((el) => types.includes(el.type))
        .map((i) => ({
          name: i.name,
          attributes: { type: i.type.replace(/_/g, " ") },
          children: [],
        }));

    // Get family members by type.
    const spouse = filterMembers(["spouse"]);
    const siblings = filterMembers(["brother", "sister"]);
    const childs = filterMembers(["child_s", "child_d"]);
    const childsinlaw = filterMembers(["doughter_in_law", "son_in_law"]);

    // Combine both direct children and children-in-law.
    const allChildren = [...childs, ...childsinlaw];

    const grandChilds = filterMembers(["grand_son", "grand_doughter"]);
    const parents = filterMembers([
      "Father",
      "Mother",
      "father_in_law",
      "mother_in_law",
    ]);
    const grandparents = filterMembers(["grand_father", "grand_mother"]);

    // Create nested nodes: if a child's name matches the selected grandchild parent,
    // attach the grandChilds as its children.
    const childrenNodes = allChildren.map((child) => {
      if (
        grandChildParents.name &&
        child.name.toLowerCase() === grandChildParents.name.toLowerCase()
      ) {
        return { ...child, bgColor: "#ffd782", children: grandChilds };
      }
      return child;
    });

    // Build the branches only if the members exist.
    const branches = [];
    if (parents.length > 0) {
      branches.push({ name: "Parents", bgColor: "#c4ffab", children: parents });
    }
    if (spouse.length > 0) {
      branches.push({
        name: "Spouse",
        bgColor: "#e9ed70",
        children: spouse.map((s) => ({
          name: s.name,
          attributes: {
            type: ctn?.gender === "male" ? "Wife" : "Husband",
          },
        })),
      });
    }
    if (siblings.length > 0) {
      branches.push({
        name: "Sibling",
        bgColor: "#b7f1fe",
        children: siblings,
      });
    }
    if (allChildren.length > 0) {
      branches.push({
        name: "Childrens",
        bgColor: "#e0e639",
        children: childrenNodes,
      });
    }
    if (grandparents.length > 0) {
      branches.push({
        name: "Grand Parents",
        bgColor: "#ffe4b2",
        children: grandparents,
      });
    }

    return {
      name: "Self",
      children: branches,
    };
  }, [members, ctn, grandChildParents]);

  const handleChangeParent = (e) => {
    setGrandChildParents({ ...grandChildParents, name: e.target.value });
    sessionStorage.setItem("gpc", JSON.stringify({ name: e.target.value }));
  };

  useEffect(() => {
    const childs = filterMembers(["child_s", "child_d"]);
    let gcp = JSON.parse(sessionStorage.getItem("gpc"));

    setChildList(childs);
  }, [members.length]);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Family TREE (Up to 20)
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Button
              disabled={members.length >= 6 || isOpen}
              variant="outlined"
              onClick={handleOpenForm}
              startIcon={<Add />}
            >
              Add Member
            </Button>
            {!cid && (
              <Alert severity="error">
                CID Not Set{" "}
                <Link
                  to="/crm/parsonal"
                  style={{ color: "green", padding: "0 10px" }}
                >
                  Set here
                </Link>
              </Alert>
            )}
          </Stack>
        </Grid2>

        {isOpen && (
          <Grid2 size={{ xs: 12 }}>
            {members.length >= 20 && (
              <Typography variant="caption" color="error">
                20 Members completed
              </Typography>
            )}
            <Paper elevation={0} sx={{ p: 2, position: "relative" }}>
              <Grid2 container spacing={2}>
                <Grid2
                  size={{ xs: 12, sm: 3 }}
                  display={ct === "group" ? "none" : "block"}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="member-type-label">Member Type</InputLabel>
                    <Select
                      labelId="member-type-label"
                      value={memberObj.type}
                      label="Member Type"
                      onChange={(e) =>
                        setMemberObj({ ...memberObj, type: e.target.value })
                      }
                    >
                      <MenuItem value="spouse">Spouse</MenuItem>
                      <MenuItem value="brother">Brother</MenuItem>
                      <MenuItem value="sister">Sister</MenuItem>
                      <MenuItem value="child_s">Child (S)</MenuItem>
                      <MenuItem value="child_d">Child (D)</MenuItem>
                      <MenuItem value="Father">Father</MenuItem>
                      <MenuItem value="Mother">Mother</MenuItem>
                      <MenuItem value="grand_father">Grand Father</MenuItem>
                      <MenuItem value="grand_mother">Grand Mother</MenuItem>
                      <MenuItem value="father_in_law">Father in Law</MenuItem>
                      <MenuItem value="mother_in_law">Mother in Law</MenuItem>
                      <MenuItem value="grand_son" disabled>
                        Grand Son
                      </MenuItem>
                      <MenuItem value="grand_doughter" disabled>
                        Grand Daughter
                      </MenuItem>
                      <MenuItem value="son_in_law" disabled>
                        Son in Law
                      </MenuItem>
                      <MenuItem value="doughter_in_law" disabled>
                        Daughter in Law
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2
                  size={{ xs: 12, sm: 3 }}
                  display={ct === "group" ? "block" : "none"}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="member-type-label">Member Type</InputLabel>
                    <Select
                      labelId="member-type-label"
                      value={memberObj.type}
                      label="Member Type"
                      onChange={(e) =>
                        setMemberObj({ ...memberObj, type: e.target.value })
                      }
                    >
                      <MenuItem value="spouse">HR</MenuItem>
                      <MenuItem value="brother">Director1</MenuItem>
                      <MenuItem value="sister">Director1</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2
                  size={{ xs: 12, sm: 3 }}
                  display={
                    memberObj?.type === "grand_son" ||
                    memberObj?.type === "son_in_law" ||
                    memberObj?.type === "doughter_in_law" ||
                    memberObj?.type === "grand_doughter"
                      ? "block"
                      : "none"
                  }
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="member-type-label">
                      Parent of Grand Child
                    </InputLabel>
                    <Select
                      labelId="member-type-label"
                      value={grandChildParents?.name}
                      label=" Parent of Grand Child"
                      onChange={(e) => handleChangeParent(e)}
                    >
                      {ChildList?.map((el, i) => (
                        <MenuItem key={i} value={el?.name}>
                          {el?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    type="text"
                    value={memberObj.name}
                    onChange={(e) =>
                      setMemberObj({ ...memberObj, name: e.target.value })
                    }
                    label="Name"
                    placeholder="Name"
                    fullWidth
                    size="small"
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 3 }}>
                  <TextField
                    type="date"
                    value={memberObj.age}
                    label="Date of Birth"
                    fullWidth
                    size="small"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onChange={(e) =>
                      setMemberObj({ ...memberObj, age: e.target.value })
                    }
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    onClick={handleAddMember}
                    disabled={
                      !memberObj.name ||
                      !memberObj.age ||
                      !memberObj.type ||
                      members.length === 20
                    }
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                </Grid2>
              </Grid2>
              <Box sx={{ position: "absolute", top: -40, right: 0 }}>
                <IconButton onClick={() => setIsOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Paper>
          </Grid2>
        )}

        <Grid2 size={{ xs: 12 }}>
          <Typography variant="subtitle1">Members</Typography>
          <TableContainer elevation={0} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#0073ff" }}>
                    S.No.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#0073ff" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#0073ff" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#0073ff" }}>
                    Age
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#0073ff" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {item.type.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Tooltip title={item.fullage || item.age}>
                        {item.age}
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleDeleteMember(index)}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>

        <Grid2
          size={{ xs: 12 }}
          container
          spacing={2}
          justifyContent="space-between"
        >
          <Grid2 size={{ xs: 12, sm: 3 }}>
            {isOpen ? (
              <Button
                startIcon={<ArrowBack />}
                fullWidth
                color="info"
                variant="outlined"
                onClick={() => setIsOpen(false)}
              >
                Back
              </Button>
            ) : (
              <Button
                startIcon={<ArrowBack />}
                fullWidth
                variant="outlined"
                component={Link}
                to={-1}
              >
                Back
              </Button>
            )}
          </Grid2>
          {!isOpen && (
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Button
                onClick={handleSubmit}
                startIcon={<Save />}
                fullWidth
                color={edit ? "success" : "info"}
                variant="contained"
                disabled={members.length === 0}
              >
                {edit ? "Update" : "Save"}
              </Button>
            </Grid2>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <FamilyTree familyData={treeData} />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Family;
