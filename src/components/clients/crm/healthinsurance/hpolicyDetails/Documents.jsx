import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Input,
  Paper,
  Divider,
  Grid,
  Grid2,
  Stack,
  TextField,
  ListItemButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import HeadlineTag from "../../../../options/HeadlineTag";
import { Add, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const HDocument = ({ data }) => {
  const [documents, setDocuments] = useState(data?.documents || []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fileName: null,
    file: "",
  });
  const [uploaded, setUploaded] = useState(null);

  const [addDoc, setAddDoc] = useState(false);

  useEffect(() => {
    if (formData?.file && !formData?.fileName) {
      setFormData({
        ...formData,
        fileName: formData?.file?.name,
      });
    }
  }, [formData?.file]);

  const hadleUpload = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    const formdata = new FormData();
    formdata.append("file", formData?.file);
    formdata.append("fileName", formData?.fileName);
    formdata.append("fileFolder", "health-policy-doccuments");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    if (formData?.file && formData?.fileName) {
      fetch("https://db.enivesh.com/storage/upload-file", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setDocuments([
            ...documents,
            {
              ...result,
              id: result?.uid,
              name: result?.title,
              url: result?.url,
              path: result?.path,
            },
          ]);
          setFormData({
            file: null,
            fileName: "",
          });
          setUploaded(result);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      documents: documents,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (data?.id) {
      fetch(
        `https://db.enivesh.com/firestore/single/health_insurance_policies/${data?.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          alert(result?.message);
          setUploaded(null);
          setFormData({
            file: null,
            fileName: "",
          });

          setAddDoc(false);
        })
        .catch((error) => console.error(error));
    } else {
      alert("Documents Not add");
    }
  };

  const handleDeleteMember = (upload) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      fileName: upload?.path,
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
        const newDocuments = documents.filter((t, i) => t?.uid !== upload?.uid);
        setDocuments(newDocuments);
        setUploaded(null);
        setTimeout(() => {
          setAddDoc(false);
        }, 5000);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag title={"Documents"} position={"space-between"}>
          <Button
            onClick={() => setAddDoc(!addDoc)}
            variant="outlined"
            startIcon={addDoc ? <Close /> : <Add />}
            color={addDoc ? "inherit" : "info"}
          >
            {addDoc ? "Close Form" : "Add Document"}
          </Button>
        </HeadlineTag>
      </Grid2>
      {addDoc && (
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <HeadlineTag title={" Upload Document"} />

                <Box component="form" noValidate autoComplete="off">
                  <Box p={2}>
                    <TextField
                      type="text"
                      variant="standard"
                      size="small"
                      placeholder="File Name"
                      label="File Name"
                      value={formData?.fileName}
                      fullWidth
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      onChange={(e) =>
                        setFormData({ ...formData, fileName: e.target.value })
                      }
                    />
                  </Box>
                  <Box p={2}>
                    <TextField
                      type="file"
                      fullWidth
                      size="small"
                      variant="standard"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          file: event.target.files[0],
                        })
                      }
                      helperText={`${parseFloat(
                        formData?.file?.size / 1024 / 1024 || 0
                      ).toFixed(2)} MB`}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<UploadFileIcon />}
                    onClick={() => hadleUpload()}
                    sx={{ marginLeft: 2 }}
                  >
                    Upload
                  </Button>
                </Box>
              </Grid2>
              {uploaded && (
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <HeadlineTag title={"Document Details"} />

                  <Box component="form" noValidate autoComplete="off">
                    <Box px={2} mt={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component={"p"}
                      >
                        File Name :{" "}
                        <Typography
                          color="info"
                          variant="body1"
                          component={"span"}
                        >
                          {uploaded?.title}
                        </Typography>
                      </Typography>
                    </Box>
                    <Box px={2} mt={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component={"p"}
                      >
                        Url :{" "}
                        <Typography
                          color="info"
                          variant="body1"
                          component={"span"}
                        >
                          {uploaded?.url}
                        </Typography>
                      </Typography>
                    </Box>
                    <Box px={2} mt={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component={"p"}
                      >
                        File Type :{" "}
                        <Typography
                          color="info"
                          variant="body1"
                          component={"span"}
                        >
                          {uploaded?.type}
                        </Typography>
                      </Typography>
                    </Box>
                    <Stack
                      mt={2}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Button
                        variant="contained"
                        color="info"
                        startIcon={<UploadFileIcon />}
                        onClick={() => handleSubmit()}
                        sx={{ marginLeft: 2 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<UploadFileIcon />}
                        onClick={() => handleDeleteMember(uploaded)}
                        sx={{ marginLeft: 2 }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                </Grid2>
              )}
            </Grid2>
          </Paper>
        </Grid2>
      )}
      <Grid2 size={{ xs: 12 }}>
        <List>
          {documents.map((doc) => (
            <React.Fragment key={doc.id}>
              <ListItemButton component={Link} to={doc?.url} target="_blank">
                <ListItem>
                  <ListItemText
                    primary={doc.name || doc?.title}
                    secondary={doc.id || doc?.uid}
                  />
                </ListItem>
              </ListItemButton>

              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Grid2>
    </Grid2>
  );
};

export default HDocument;
