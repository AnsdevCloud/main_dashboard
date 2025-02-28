import { Add, ArrowBack, Close, Delete, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  Paper,
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
import React, { useContext, useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../theme/ThemeContext";

const Family = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);
  let cid = JSON.parse(sessionStorage.getItem("cid"));
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const [edit, setEdit] = useState(false);
  useEffect(() => {
    let editData = JSON.parse(sessionStorage.getItem("edit-data"));
    if (editData?.id) {
      setEdit(true);
      if (editData?.members) {
        setMembers([...editData?.members]);
      }
    }
  }, []);

  //store array

  //single member obj
  const [memberObj, setMemberObj] = useState({
    type: "",
    name: "",
    age: "",
  });

  //handle control add member form
  const [isOpen, setIsOpen] = useState(members?.length > 0 ? false : true);

  //add member function
  const handleAddMember = () => {
    let { days, months, years } = calculateAge(memberObj?.age);
    let fullage = `${years} Y , ${months} M , ${days} D`;
    if (
      memberObj?.name &&
      memberObj?.age &&
      memberObj?.type &&
      (years > 0 || months > 0)
    ) {
      setMembers([
        ...members,
        {
          ...memberObj,
          age:
            years > 0 ? years + " Y" : months > 0 ? months + " M" : days + " D",
          fullage: fullage,
        },
      ]);
      setMemberObj({
        type: "",
        name: "",
        age: "",
      });
    } else {
      alert(
        months === 0
          ? `Your age ${years + "." + months} years not ilisible`
          : "Not empty"
      );
    }
  };
  //delete member function
  const handleDeleteMember = (e) => {
    const newMembers = members.filter((_, index) => index !== e);
    setMembers(newMembers);
  };

  //open add member form control
  const handleOpenForm = () => {
    if (members?.length <= 6) {
      setIsOpen(true);
    }
  };

  //age calculate
  function calculateAge(birthDateString) {
    const today = new Date(); // Current date
    const birthDate = new Date(birthDateString); // Convert string to Date object

    let years = today.getFullYear() - birthDate.getFullYear(); // Calculate difference in years
    let months = today.getMonth() - birthDate.getMonth(); // Calculate difference in months
    let days = today.getDate() - birthDate.getDate(); // Calculate difference in days

    // Adjust if the birthday hasn't occurred yet this year
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12; // Adjust months if birthday hasn't occurred
    }

    // Adjust for incomplete months
    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
      days += previousMonth.getDate(); // Add the number of days in the previous month
    }

    return { years, months, days };
  }

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      members: members,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (members?.length > 0) {
      fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert(edit ? "Updated" : "Added");
          setMembers([]);
          navigate("/crm/bank");
        })
        .catch((error) => console.error(error));
    } else {
      alert("Epty Members");
    }
  };

  return (
    <Container>
      <Grid2 container spacing={{ xs: 2, md: 3 }} px={2}>
        <Grid2 size={{ xs: 12 }}>
          <Typography
            variant="subtitle1"
            fontSize={{ xs: 24, md: 40 }}
            component={"h1"}
            my={{ xs: 1, md: 2 }}
            color="grey"
            fontWeight={600}
          >
            Family Members (Up to 6)
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Button
            disabled={members?.length >= 6 || isOpen}
            variant="outlined"
            onClick={() => handleOpenForm()}
            size="small"
            startIcon={<Add />}
          >
            Add Member
          </Button>
        </Grid2>
        {isOpen && (
          <Grid2 size={{ xs: 12 }}>
            {members?.length >= 6 && (
              <Typography variant="caption" my={1} color="error">
                6 Members completed
              </Typography>
            )}
            <Paper
              sx={{
                p: 2,
                position: "relative",
                // bgcolor: "rgba(204, 235, 255, 0.781)",
                borderRadius: 1,
              }}
              elevation={0}
            >
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <TextField
                    type="text"
                    name=""
                    label="Type"
                    placeholder="type"
                    size="small"
                    value={memberObj?.type}
                    onChange={(e) =>
                      setMemberObj({ ...memberObj, type: e.target.value })
                    }
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <TextField
                    type="text"
                    value={memberObj?.name}
                    onChange={(e) =>
                      setMemberObj({ ...memberObj, name: e.target.value })
                    }
                    name=""
                    label="Name"
                    placeholder="Name"
                    size="small"
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <TextField
                    type="date"
                    name=""
                    value={memberObj?.age}
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    size="small"
                    focused
                    color="#777"
                    onChange={(e) =>
                      setMemberObj({ ...memberObj, age: e.target.value })
                    }
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleAddMember()}
                    disabled={
                      !memberObj?.name ||
                      !memberObj?.age ||
                      !memberObj?.type ||
                      members?.length === 6
                    }
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                </Grid2>
              </Grid2>
              <Box position={"absolute"} top={-40} right={0}>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setIsOpen(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Paper>
          </Grid2>
        )}
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="subtitle2" color="grey">
            Members
          </Typography>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ overflowX: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", width: 60 }}
                  >
                    S.No.
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", minWidth: 100 }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", minWidth: 100 }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", minWidth: 100 }}
                  >
                    Age
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", width: 50 }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 600, color: "#0073ff" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      <Tooltip title={item?.fullage || item?.age}>
                        {item?.age}
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={(e) => handleDeleteMember(index)}
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
        <Grid2 size={{ xs: 6, md: 9 }} my={{ xs: 2, md: 3 }}>
          {isOpen ? (
            <Button
              startIcon={<ArrowBack />}
              fullWidth
              color="info"
              variant="outlined"
              sx={{ maxWidth: 200 }}
              onClick={() => setIsOpen(false)}
            >
              Back
            </Button>
          ) : (
            <Button
              startIcon={<ArrowBack />}
              fullWidth
              color="inherit"
              variant="outlined"
              sx={{ maxWidth: 200 }}
              component={Link}
              to={-1}
            >
              Back
            </Button>
          )}
        </Grid2>
        {!isOpen && (
          <Grid2 size={{ xs: 6, md: 3 }} my={{ xs: 2, md: 3 }}>
            <Button
              onClick={() => handleSubmit()}
              startIcon={<Save />}
              fullWidth
              color={edit ? "success" : "info"}
              variant="contained"
              disabled={members?.length === 0}
              sx={{ maxWidth: 200 }}
            >
              {edit ? "Update" : "Save"}
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default Family;
