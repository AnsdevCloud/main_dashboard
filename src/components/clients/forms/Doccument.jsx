import {
  Add,
  ArrowBack,
  Close,
  Delete,
  Save,
  Upload,
} from "@mui/icons-material";
import {
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DoccumentUpload = () => {
  //store array
  const [file, setFile] = useState("");
  //store array
  const [documents, setDocuments] = useState([
    {
      type: "PDF",
      name: "Screen Shot",
      timestamps: new Date().getTime(),
      size: 1.2,
    },
    {
      type: "PNG",
      name: "Screen Shot",
      timestamps: new Date().getTime(),
      size: 2,
    },
    {
      type: "Word",
      name: "Screen Shot",
      timestamps: new Date().getTime(),
      size: 3,
    },
    {
      type: "Excel",
      name: "Screen Shot",
      timestamps: new Date().getTime(),
      size: 2.2,
    },
    {
      type: "JPG",
      name: "Screen Shot",
      timestamps: new Date().getTime(),
      size: 5,
    },
  ]);

  const insuranceType = [
    {
      value: "health_insurance",
      name: "Health Insurance",
    },
    {
      value: "life_insurance",
      name: "Life Insurance",
    },
    {
      value: "car_insurance",
      name: "Car Insurance",
    },
    {
      value: "fund",
      name: "Fund ",
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
  const handleAddMember = () => {};
  //add member function
  const handleDeleteMember = (e) => {};

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
            Documents
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Button
            disabled={isOpen}
            variant="outlined"
            onClick={() => handleOpenForm()}
            size="small"
            startIcon={<Add />}
          >
            Add Documents
          </Button>
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
                      Insurance Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="  Insurance Type  "
                      // onChange={handleChange}
                    >
                      {insuranceType?.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
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
                    onChange={(e) => setFile(e.target.files[0])}
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
        </Grid2>
        {!isOpen && (
          <Grid2 size={{ xs: 6, md: 3 }} my={{ xs: 2, md: 3 }}>
            <Button
              startIcon={<Save />}
              fullWidth
              color="info"
              variant="contained"
              sx={{ maxWidth: 200 }}
            >
              Save{" "}
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default DoccumentUpload;
