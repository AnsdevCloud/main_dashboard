import { Alert, Button, Grid2, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../../../../firebase/config";

const InvoiceDocument = ({}) => {
  const [file, setFile] = useState(null);

  const [invNum, setInvNum] = useState(null);
  const [isAlert, setIsAlert] = useState({
    open: false,
    type: "info",
    message: "Alert Here",
  });

  const handleChange = (e) => {
    const convertBytesToKB = (bytes) => {
      let kb = (bytes / 1024).toFixed(2);
      if (kb > 1024) {
        return (kb / 1024).toFixed(2) + " MB"; // 1 MB = 1024 KB
      } else {
        return kb + " KB"; // 1 KB = 1024 Bytes
      }
    };
    setFile(e.target.files[0]);
    let max_Size = 20 * 1024 * 1024;

    if (e.target.files[0].size > max_Size) {
      setIsAlert({
        type: "error",
        open: true,
        message: `Your File Too Large :  ${convertBytesToKB(
          e.target.files[0].size
        )}`,
      });
    } else {
      setIsAlert({
        type: "info",
        open: true,
        message: `Your File Size :  ${convertBytesToKB(
          e.target.files[0].size
        )}`,
      });
    }
  };

  const handleFind = async () => {
    setIsAlert({
      open: true,
      message: "Uploading... ",
      type: "info",
    });
    setTimeout(async () => {
      if (invNum) {
        let docID = invNum.includes("ef", invNum)
          ? `"${invNum.toUpperCase()}"`
          : invNum;

        const docRef = doc(firestore, "invoices", `${docID}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setIsAlert({
            open: true,
            message: "Document Checking ...",
            type: "info",
          });
          setTimeout(() => {
            handleFileUpload({ id: docSnap.id, ...docSnap.data() });
            console.log("docSnap.data(): ", docSnap.data());
          }, 1000);
        } else {
          setIsAlert({
            open: true,
            message: "Invoice Number not found",
            type: "error",
          });
        }
      }
    }, 1000);
  };

  //setp - 2
  const handleFileUpload = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    if (!file) {
      setIsAlert({ open: true, message: "File not Selected" });
      return;
    }
    if (file) {
      const MAX_SIZE = 20 * 1024 * 1024;
      if (file?.size > MAX_SIZE) {
        // If file size is too large, update error state
        setIsAlert({
          open: true,
          type: "warning",
          message: "File size should not exceed 20MB.",
        });

        setFile(null);
        return;
      }
    }
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("fileFolder", "invoice_documents");
    // formdata.append("fileName", formData?.fileName);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    if (file && invNum) {
      fetch("https://db.enivesh.com/storage/upload-file", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setIsAlert({
            open: true,
            message: "Proccessing...",
            type: "info",
          });
          setTimeout(() => {
            handleSubmit(data?.id, { ...result }, { ...data });
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
          setIsAlert({
            open: true,
            message: "Proccessing failed ",
            type: "error",
          });
        });
    } else {
      setIsAlert({ open: true, type: "error", message: "All field required" });
    }
  };

  // step - 3

  const handleSubmit = (id, docsData, invoiceData) => {
    setTimeout(() => {
      setIsAlert({
        open: true,
        message: "Uploading... ",
        type: "info",
      });
    }, 1000);
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "invoice_documents",
      data: {
        invoiceid: id,
        invoicenumber: invoiceData?.invoicenumber,
        owncompany: invoiceData?.owncompany,
        ...docsData,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (invNum && docsData) {
      fetch(`https://db.enivesh.com/firestore/add`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setFile(null);
          setInvNum(null);

          setTimeout(() => {
            setIsAlert({
              open: true,
              message: "Invoice Uploaded successfully ",
              type: "success",
            });
          }, 1000);
          setTimeout(() => {
            setIsAlert({
              open: false,
              message: " ",
              type: "",
            });
          }, 5000);
        })
        .catch((error) => console.error(error));
    } else {
      setIsAlert({
        open: true,
        message: "Invoice Uploading failed ",
        type: "error",
      });
    }
  };
  return (
    <Grid2 container spacing={2} my={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          onChange={(e) => setInvNum(e.target.value)}
          type="text"
          size="small"
          label="Invoice Number"
          fullWidth
          value={invNum}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          type="file"
          size="small"
          label="Invoice Number"
          onChange={(e) => handleChange(e)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: isAlert.open ? 6 : 12 }}>
        <Button
          size="large"
          variant="contained"
          color="info"
          disabled={!invNum && !file}
          fullWidth
          sx={{ position: "relative", p: 0.5 }}
          onClick={() => handleFind()}
        >
          Upload
        </Button>
      </Grid2>
      {isAlert?.open && (
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Alert
            severity={isAlert?.type}
            sx={{ p: 0, px: 1 }}
            variant="standard"
          >
            {isAlert?.message}
          </Alert>
        </Grid2>
      )}
    </Grid2>
  );
};

export default InvoiceDocument;
