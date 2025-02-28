import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const PurchaseReviews = () => {
  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const [formData, setFormData] = useState({
    itc: "",
    bill: "",
    year: "",
  });

  console.log(formData);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    if (formData?.bill && formData?.itc && formData?.year) {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append(
        "file",
        formData?.bill,
        "postman-cloud:///1efb1536-cd67-4290-be90-c318af78c49e"
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://db.enivesh.com/storage/upload-file", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          {
            const myHeaders1 = new Headers();
            myHeaders1.append(
              "x-api-key",
              "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3"
            );
            myHeaders1.append("Content-Type", "application/json");
            const raw = JSON.stringify({
              collectionName: "purchase",
              data: {
                ...formData,

                bill: result,
                timestamp: new Date().getTime(),
              },
            });

            const requestOptions = {
              method: "POST",
              headers: myHeaders1,
              body: raw,
              redirect: "follow",
            };
            fetch("https://db.enivesh.com/firestore/add", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                setAlert({
                  alertMsg: ` ${result?.message} : ${result?.docId} `,
                  alertType: "success",
                });
                setFormData({
                  itc: "",
                  bill: "",
                });
                setIsLoading(false);
              })
              .catch((error) => {
                setAlert({
                  alertMsg: `Failled`,
                  alertType: "error",
                });
              });
          }
        })
        .catch((error) => {
          setIsLoading(false);

          console.error(error);
        });
    } else {
      console.error("Form Not FiIlled");
      setIsLoading(false);

      setAlert({
        alertMsg: `Form Not FiIlled `,
        alertType: "error",
      });
    }
  };

  return (
    <Stack
      width={"100%"}
      height={"80vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper sx={{ p: 1, width: "60%" }} variant="outlined">
        {alert?.alertMsg && (
          <Box position="fixed" top={60} left={0} px={30} width={"100%"}>
            <Alert
              onClose={() => setAlert({ ...alert, alertMsg: "" })}
              severity={alert?.alertType}
              variant="filled"
            >
              {alert?.alertMsg}
            </Alert>
          </Box>
        )}
        <Typography
          textAlign={"center"}
          my={2}
          variant="subtitle1"
          fontWeight={600}
        >
          Upload Purchase Data
        </Typography>
        <Stack flexDirection={"row"} gap={2} my={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.year}
              label="Select Year"
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              {Array.from({ length: 80 }, (_, i) => i + 2015)?.map(
                (value, index, array) => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                }
              )}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">ITC</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.itc}
              label="ITC"
              onChange={(e) =>
                setFormData({ ...formData, itc: e.target.value })
              }
            >
              <MenuItem value={"amj"}>AMJ</MenuItem>
              <MenuItem value={"jas"}>JAS</MenuItem>
              <MenuItem value={"ond"}>OND</MenuItem>
              <MenuItem value={"jfm"}>JFM</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          gap={2}
          my={2}
        >
          <Button color="info" variant="outlined" fullWidth>
            <input
              type="file"
              // accept="application/pdf"
              onChange={(e) =>
                setFormData({ ...formData, bill: e.target.files[0] })
              }
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
              }}
              size="small"
              label="Select File"
            />
            {formData?.bill ? formData?.bill?.name : " Select File"}
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="success"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : " Upload"}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default PurchaseReviews;
