import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HeadlineTag from "../../options/HeadlineTag";

const MonthalyBill = () => {
  const [formData, setFormData] = useState({
    invMonth: "",
    paymentDate: "",
    grossAtm: "",
    dateofChalan: "",
    chalanNum: "",
    bsrCode: "",
    bill: "",
  });

  const [data, setData] = useState([]);

  const [alert, setAlert] = useState({
    alertType: "",
    alertMsg: "",
    time: 5000,
  });
  const handleSubmit = async () => {
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    if (
      formData?.invMonth &&
      formData?.paymentDate &&
      formData?.grossAtm &&
      formData?.dateofChalan &&
      formData?.chalanNum &&
      formData?.bsrCode &&
      formData?.bill
    ) {
      console.log(formData);

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
              collectionName: "tax-monthlyBill",
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
                  invMonth: "",
                  paymentDate: "",
                  grossAtm: "",
                  dateofChalan: "",
                  chalanNum: "",
                  bsrCode: "",
                  bill: "",
                });
              })
              .catch((error) => {
                setAlert({
                  alertMsg: `Failled`,
                  alertType: "error",
                });
              });
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.error("Form Not FiIlled");
      setAlert({
        alertMsg: `Form Not FiIlled `,
        alertType: "error",
      });
    }
  };
  return (
    <>
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
      <Stack width={"100%"} alignItems={"center"} justifyContent={"flex-start"}>
        <Paper
          sx={{
            width: 350,
            p: 2,
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <HeadlineTag>Payment Details</HeadlineTag>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter Party Name"
            label="Search & Select"
          />

          <Divider />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, invMonth: e.target.value })
            }
            fullWidth
            type="date"
            size="small"
            placeholder="INV Month"
            label="INV Month"
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, paymentDate: e.target.value })
            }
            fullWidth
            size="small"
            placeholder="Payment Date"
            label="Payment Date"
            type="date"
          />

          <TextField
            onChange={(e) =>
              setFormData({ ...formData, grossAtm: e.target.value })
            }
            fullWidth
            size="small"
            placeholder="Gross AMT"
            label="Gross AMT"
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, dateofChalan: e.target.value })
            }
            fullWidth
            size="small"
            type="date"
            placeholder="Date of Chalan"
            label="Date of Chalan"
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, chalanNum: e.target.value })
            }
            fullWidth
            size="small"
            type="number"
            placeholder="Chalan No."
            label="Chalan No."
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, bsrCode: e.target.value })
            }
            fullWidth
            size="small"
            placeholder="BSR CODE"
            label="BSR CODE"
          />

          <TextField
            onChange={(e) =>
              setFormData({ ...formData, bill: e.target.files[0] })
            }
            fullWidth
            type="file"
            size="small"
            placeholder="Chalan Link"
            label="Chalan Link"
            helperText="Upload file then Get Link Automatic."
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Paper>
      </Stack>
    </>
  );
};

export default MonthalyBill;
