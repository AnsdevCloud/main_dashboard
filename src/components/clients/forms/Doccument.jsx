import {
  Add,
  ArrowBack,
  Close,
  Delete,
  Save,
  Upload,
} from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../theme/ThemeContext";

const DoccumentUpload = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);
  const navigate = useNavigate();

  let cid = JSON.parse(sessionStorage.getItem("cid"));

  //store array
  const [file, setFile] = useState("");
  const [ctData, setCTData] = useState(null);

  //store array
  const [documents, setDocuments] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    let editData = JSON.parse(sessionStorage.getItem("edit-data"));
    let clinetType = JSON.parse(sessionStorage.getItem("ct"));
    if (editData?.id) {
      setEdit(true);
      if (editData?.documents) {
        setDocuments([...editData?.documents]);
      }
    }
    setCTData(clinetType);
  }, []);

  const documentType = [
    {
      active: null,
      value: "kycDocument",
      name: "KYC Document",
    },
    {
      active: "group",

      value: "pancard",
      name: "Pan Card",
    },
    {
      active: "group",

      value: "msmeCertificate",
      name: "MSME Certificate",
    },
    {
      active: "group",

      value: "gstCertificate",
      name: "GST Certificate ",
    },
    {
      active: "group",

      value: "addressProof",
      name: "Address Proof",
    },
    {
      active: "group",

      value: "cancelledCheque",
      name: "Cancelled Cheque",
    },
    {
      active: "group",

      value: "other",
      name: "Other",
    },
  ];
  //single member obj
  const [doccument, setDoccument] = useState({
    type: "",
    name: "",
    timestamps: new Date().getTime(),
  });

  //handle control add member form
  const [isOpen, setIsOpen] = useState(false);

  //add member function
  const handleAddMember = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    if (!file) {
      alert("file not selected");
      return;
    }
    if (file) {
      const MAX_SIZE = 20 * 1024 * 1024;
      if (file?.size > MAX_SIZE) {
        // If file size is too large, update error state
        alert("File size should not exceed 20MB.");
        setFile(null);
        return;
      }
    }
    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    if (doccument?.name && doccument?.type) {
      fetch("https://db.enivesh.com/storage/upload-file", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setDocuments([
            ...documents,
            {
              ...doccument,
              ...result,
            },
          ]);
        })
        .catch((error) => console.error(error));
    } else {
      alert("All field Required");
    }
  };
  //add member function
  const handleDeleteMember = (path, i) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      fileName: path,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://db.enivesh.com/storage/delete", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const newDocuments = documents.filter((_, index) => index !== i);
        setDocuments(newDocuments);
      })
      .catch((error) => console.error(error));
  };

  //open add member form control
  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const extractTime = (timestamp) => {
    const date = new Date(timestamp);

    // Extract individual components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      documents,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (cid && documents?.length > 0) {
      fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert(edit ? "Updated" : "added");
          setDocuments([]);
          navigate("/crm/profile");
        })
        .catch((error) => console.error(error));
    } else {
      alert("Documents Not add");
    }
  };

  return (
    <Container>
      <Grid2 container spacing={{ xs: 2, md: 3 }} px={2}>
        <Grid2 size={{ xs: 12 }}>
          <Stack
            width={"100%"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              variant="subtitle1"
              fontSize={{ xs: 24, md: 40 }}
              component={"h1"}
              my={{ xs: 1, md: 2 }}
              color="grey"
              fontWeight={600}
            >
              Documents
            </Typography>
          </Stack>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Stack
            width={"100%"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={3}
          >
            <Button
              disabled={isOpen}
              variant="outlined"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Add />}
            >
              Add Documents
            </Button>
            {!cid && (
              <Alert severity="error">
                CID Not Set{" "}
                <Link
                  to={"/crm/parsonal"}
                  style={{ color: "green", padding: "0 10px" }}
                >
                  {" "}
                  Set here
                </Link>
              </Alert>
            )}
          </Stack>
        </Grid2>
        {isOpen && (
          <Grid2 size={{ xs: 12 }}>
            <Paper
              sx={{
                p: 2,
                position: "relative",
                borderRadius: 1,
              }}
              elevation={0}
            >
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 2 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Document Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={doccument?.type}
                      label=" Document Type "
                      onChange={(e) =>
                        setDoccument({ ...doccument, type: e.target.value })
                      }
                    >
                      {documentType?.map((item, index) => (
                        <MenuItem
                          key={index}
                          disabled={
                            ctData === "group"
                              ? item?.active === "group"
                                ? false
                                : true
                              : item?.active === "group" && true
                          }
                          value={item?.value}
                        >
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <TextField
                    type="file"
                    name=""
                    label="Select File"
                    placeholder="Choose file"
                    focused
                    color="#777"
                    size="small"
                    onChange={(e) => setFile(e.target.files[0])}
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 5 }}>
                  <TextField
                    type="text"
                    name=""
                    label="File Name"
                    placeholder="File Name"
                    size="small"
                    onChange={(e) =>
                      setDoccument({ ...doccument, name: e.target.value })
                    }
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    disabled={!file}
                    fullWidth
                    onClick={() => handleAddMember()}
                    startIcon={<Upload />}
                  >
                    Upload
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
            Documents
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
                    Size
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", minWidth: 100 }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: "#0073ff", width: 50 }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 600, color: "#0073ff" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.size} M</TableCell>
                    <TableCell>{extractTime(item?.timestamps)}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={(e) => handleDeleteMember(item?.path, index)}
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
              startIcon={<Save />}
              fullWidth
              color={edit ? "success" : "info"}
              variant="contained"
              sx={{ maxWidth: 200 }}
              onClick={() => handleSubmit()}
              disabled={documents?.length === 0 || !cid}
            >
              {edit ? "Update" : "Save"}
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default DoccumentUpload;
