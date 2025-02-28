import React, { useEffect, useState } from "react";
import HeadlineTag from "../../options/HeadlineTag";
import {
  Grid2,
  Paper,
  TextField,
  Stack,
  Button,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Table,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import TransparentBox from "../../options/TransparentBox";
import InvoiceForm from "./uploads/InvoiceForm";
import ExcelUpload from "./uploads/ExcelUpload";
import CompanyData from "./uploads/CompanyData";
import { firestore } from "../../../firebase/config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
const states = [
  { key: 1, name: "Andhra Pradesh", code: "AP" },
  { key: 2, name: "Arunachal Pradesh", code: "AR" },
  { key: 3, name: "Assam", code: "AS" },
  { key: 4, name: "Bihar", code: "BR" },
  { key: 5, name: "Chhattisgarh", code: "CG" },
  { key: 6, name: "Goa", code: "GA" },
  { key: 7, name: "Gujarat", code: "GJ" },
  { key: 8, name: "Haryana", code: "HR" },
  { key: 9, name: "Himachal Pradesh", code: "HP" },
  { key: 10, name: "Jharkhand", code: "JH" },
  { key: 11, name: "Karnataka", code: "KA" },
  { key: 12, name: "Kerala", code: "KL" },
  { key: 13, name: "Madhya Pradesh", code: "MP" },
  { key: 14, name: "Maharashtra", code: "MH" },
  { key: 15, name: "Manipur", code: "MN" },
  { key: 16, name: "Meghalaya", code: "ML" },
  { key: 17, name: "Mizoram", code: "MZ" },
  { key: 18, name: "Nagaland", code: "NL" },
  { key: 19, name: "Odisha", code: "OR" },
  { key: 20, name: "Punjab", code: "PB" },
  { key: 21, name: "Rajasthan", code: "RJ" },
  { key: 22, name: "Sikkim", code: "SK" },
  { key: 23, name: "Tamil Nadu", code: "TN" },
  { key: 24, name: "Telangana", code: "TG" },
  { key: 25, name: "Tripura", code: "TR" },
  { key: 26, name: "Uttar Pradesh", code: "UP" },
  { key: 27, name: "Uttarakhand", code: "UK" },
  { key: 28, name: "West Bengal", code: "WB" },
  { key: 29, name: "Andaman and Nicobar Islands", code: "AN" },
  { key: 30, name: "Chandigarh", code: "CH" },
  { key: 31, name: "Dadra and Nagar Haveli and Daman and Diu", code: "DN" },
  { key: 32, name: "Delhi", code: "DL" },
  { key: 33, name: "Jammu and Kashmir", code: "JK" },
  { key: 34, name: "Ladakh", code: "LA" },
  { key: 35, name: "Lakshadweep", code: "LD" },
  { key: 36, name: "Puducherry", code: "PY" },
];

const company = [
  {
    companyName: "SBI",
    type: "sales",
    gst: [
      {
        state: "Uttar Pradesh",
        code: "UP",
        type: "SGST",
        number: "UP3DK92NDX39",
      },
      {
        state: "Maharashtra",
        code: "MH",
        type: "CGST",
        number: "MH4NDX293ND3",
      },
    ],
  },
  {
    companyName: "HDFC Bank",
    type: "purchase",
    gst: [
      {
        state: "Gujarat",
        code: "GJ",
        type: "IGST",
        number: "GJ4NSX394ND9",
      },
      {
        state: "Delhi",
        code: "DL",
        type: "SGST",
        number: "DL2NSK3949NDX",
      },
      {
        state: "Tamil Nadu",
        code: "TN",
        type: "CGST",
        number: "TN3NDX294JD93",
      },
    ],
  },
  {
    companyName: "ICICI Bank",
    type: "sales",
    gst: [
      {
        state: "Karnataka",
        code: "KA",
        type: "SGST",
        number: "KA3NDK492JD93",
      },
      {
        state: "West Bengal",
        code: "WB",
        type: "IGST",
        number: "WB9XND39JD93N",
      },
    ],
  },
  {
    companyName: "Axis Bank",
    type: "purchase",
    gst: [
      {
        state: "Rajasthan",
        code: "RJ",
        type: "CGST",
        number: "RJ2DK39XND392",
      },
      {
        state: "Kerala",
        code: "KL",
        type: "SGST",
        number: "KL3NDX392JD93",
      },
      {
        state: "Odisha",
        code: "OR",
        type: "IGST",
        number: "OR4NDK493ND39",
      },
    ],
  },
  {
    companyName: "Tata Steel",
    type: "sales",
    gst: [
      {
        state: "Punjab",
        code: "PB",
        type: "SGST",
        number: "PB9NDK392ND93",
      },
      {
        state: "Madhya Pradesh",
        code: "MP",
        type: "CGST",
        number: "MP3NDK294ND93",
      },
    ],
  },
  {
    companyName: "Reliance Industries",
    type: "purchase",
    gst: [
      {
        state: "Telangana",
        code: "TG",
        type: "SGST",
        number: "TG3NDX392ND93",
      },
      {
        state: "Assam",
        code: "AS",
        type: "IGST",
        number: "AS4NDX394ND92",
      },
    ],
  },
  {
    companyName: "Infosys",
    type: "sales",
    gst: [
      {
        state: "Chhattisgarh",
        code: "CG",
        type: "SGST",
        number: "CG3NDK492ND93",
      },
      {
        state: "Jharkhand",
        code: "JH",
        type: "IGST",
        number: "JH9NDK394ND39",
      },
      {
        state: "Uttarakhand",
        code: "UK",
        type: "CGST",
        number: "UK4NDX293ND93",
      },
    ],
  },
  {
    companyName: "Wipro",
    type: "purchase",
    gst: [
      {
        state: "Bihar",
        code: "BR",
        type: "CGST",
        number: "BR3NDK392JD93",
      },
      {
        state: "Haryana",
        code: "HR",
        type: "SGST",
        number: "HR4NDX3949NDX",
      },
    ],
  },
  {
    companyName: "Larsen & Toubro",
    type: "sales",
    gst: [
      {
        state: "Andhra Pradesh",
        code: "AP",
        type: "SGST",
        number: "AP3NDK492ND93",
      },
      {
        state: "Kerala",
        code: "KL",
        type: "IGST",
        number: "KL9NDK3949ND92",
      },
    ],
  },
  {
    companyName: "Adani Group",
    type: "purchase",
    gst: [
      {
        state: "Tamil Nadu",
        code: "TN",
        type: "CGST",
        number: "TN3NDX2939ND92",
      },
      {
        state: "Delhi",
        code: "DL",
        type: "IGST",
        number: "DL9NDK492ND93",
      },
    ],
  },
];

const Invoice = () => {
  const [status, setStatus] = useState({
    pdf: false,
    excel: false,
  });
  const [lastInvoice, setLastInvoice] = useState(null);
  const [sheetName, setSheetName] = useState(null);
  const [ownCompany, setOwnCompany] = useState(null);

  const [uploading, setuploading] = useState(null);
  const [extractedData, setExtractedData] = useState([]);

  const [isFormSelect, setIsFormSelect] = useState("");

  const handleGeneratePDF = async () => {
    const myHeaders = new Headers();
    setStatus({ pdf: true });

    myHeaders.append(
      "authorization",
      "b2cfa418a6bdb0c48a1d34a729adf28e4a6395dbb5046077e3964e5c5cd1a6c4"
    );
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ ...htne }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://restfileconvert.ansdev.cloud/api/html-to-pdf",
        requestOptions
      );

      if (!response.ok) {
        setStatus({ pdf: false });

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert response to blob
      const blob = await response.blob();

      // Create a URL for the blob
      const blobURL = URL.createObjectURL(blob);

      // Create a link element to download the file
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "invoice.pdf"; // Set the desired filename
      document.body.appendChild(a); // Append the link to the document
      a.click(); // Programmatically click the link
      a.remove(); // Remove the link after download

      // Revoke the blob URL to free memory
      URL.revokeObjectURL(blobURL);
      setStatus({ pdf: false });
    } catch (error) {
      console.error("Error generating and downloading the file:", error);
      setStatus({ pdf: false });
    }
  };
  const handleGenerateExcel = async (file) => {
    setStatus({ excel: true });

    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      "b2cfa418a6bdb0c48a1d34a729adf28e4a6395dbb5046077e3964e5c5cd1a6c4"
    );

    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://restfileconvert.ansdev.cloud/api/excel-to-json",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setExtractedData(result || []);

        setStatus({
          excel: false,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleUpload = (data) => {
    setStatus({ excel: true });
    setOwnCompany(data?.owncompany);
    let slug = data?.company?.split(" ").join("-").toLocaleLowerCase();
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "invoices",
      docId: JSON.stringify(data?.invoicenumber),
      data: {
        owncompany: data?.owncompany || ownCompany,
        amount: data?.amount || null,
        cgst: data?.cgst || null,
        company: data?.company || null,
        date: data?.date || null,
        description: data?.description || null,
        igst: data?.igst || null,
        invoicenumber: data?.invoicenumber || null,
        sgst: data?.sgst || null,
        totalamount: data?.totalamount || null,
        slug: slug,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://db.enivesh.com/service/invoice/set", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setuploading(data?.invoicenumber);
        setStatus({ excel: false });
      })
      .catch((error) => console.error(error));
  };

  const ExtractingUpload = () => {
    if (ownCompany) {
      extractedData.forEach((value) =>
        value?.data?.forEach((val) => handleUpload(val))
      );
    } else {
      setStatus({ excel: false });
      alert("Company Not Defined");
    }
  };

  useEffect(() => {
    // Firestore query to get the last invoice in real-time
    const invoicesQuery = query(
      collection(firestore, "invoices"), // Collection name
      orderBy("invoicenumber", "desc"), // Sort by invoiceId in descending order
      limit(1) // Fetch only the last invoice
    );

    // Real-time listener
    const unsubscribe = onSnapshot(invoicesQuery, (snapshot) => {
      if (!snapshot.empty) {
        const invoiceData = snapshot.docs[0].data();
        setLastInvoice(invoiceData);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleCompanyDataUpload = (e) => {
    handleGenerateExcel(e.file);
    setOwnCompany(e.companyName);

    if (extractedData[0]) {
      ExtractingUpload();
    }
  };
  const handleSingleDataUpload = (e) => {
    if (e.excel) {
      handleGenerateExcel(e.excel);
    }

    if (extractedData[0]) {
      ExtractingUpload();
    }
  };

  const handleExcelUpload = () => {
    if (extractedData[0]) {
      extractedData.forEach((value) => {
        value?.data?.forEach((val) => handleUpload(val));
        setSheetName(value?.sheetName);
      });
    }
  };
  return (
    <Grid2 container spacing={2} py={1}>
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag textTransform={"uppercase"}>Files Upload</HeadlineTag>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper elevation={0} sx={{ p: 1 }}>
          <HeadlineTag size={"small"} iconColor={"grey"}>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
              height={"100%"}
            >
              Fill Data
              {sheetName && (
                <Button
                  sx={{ textTransform: "uppercase", fontSize: 10 }}
                  variant="text"
                  color="success"
                >
                  Sheet Name - {sheetName}
                </Button>
              )}
              {uploading && (
                <Button
                  sx={{ textTransform: "uppercase", fontSize: 10 }}
                  variant="text"
                  color="success"
                >
                  Uploaded - {uploading}
                </Button>
              )}
              <Button
                sx={{ textTransform: "uppercase", fontSize: 10 }}
                variant="outlined"
              >
                {ownCompany}
              </Button>
            </Stack>
          </HeadlineTag>

          {isFormSelect === "singleInvoice" && (
            <InvoiceForm
              lastInvoice={lastInvoice?.invoicenumber}
              onExcel={(e) => handleSingleDataUpload(e)}
              disabled={!extractedData[0]}
            />
          )}
          {isFormSelect === "excelinvoice" && (
            <ExcelUpload
              onExcel={(e) => handleGenerateExcel(e)}
              disabled={!extractedData[0] || status?.excel}
              status={status}
              ExtractedData={extractedData}
              lastInvoice={lastInvoice?.invoicenumber}
              onUpload={() => handleExcelUpload()}
            />
          )}
          {isFormSelect === "companydata" && (
            <CompanyData
              onExcel={(e) => handleCompanyDataUpload(e)}
              onCompany={(e) => setOwnCompany(e)}
              ExtractData={extractedData || []}
              ownCompany={ownCompany}
            />
          )}
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 1,
          }}
        >
          <HeadlineTag size={"small"}>What's do you Upload</HeadlineTag>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "79vh",
              overflow: "hidden", // Ensures content doesn't spill out
              border: "none",
              position: "relative",
              overflowY: "auto",
            }}
          >
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              flexWrap={"wrap"}
            >
              <Card variant="outlined" sx={{ width: "45%" }}>
                <CardActionArea
                  onClick={() => setIsFormSelect("singleInvoice")}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      textAlign={"center"}
                      component={"h1"}
                      textTransform={"uppercase"}
                      fontWeight={600}
                      color="error"
                    >
                      Invoice Upload
                    </Typography>
                    <Typography
                      variant="caption"
                      textAlign={"center"}
                      component={"h1"}
                      color="error"
                      fontWeight={500}
                    >
                      Single Invoice Upload
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card variant="outlined" sx={{ width: "45%" }}>
                <CardActionArea onClick={() => setIsFormSelect("excelinvoice")}>
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      textAlign={"center"}
                      component={"h1"}
                      textTransform={"uppercase"}
                      fontWeight={600}
                      color="success"
                    >
                      Excel Data
                    </Typography>
                    <Typography
                      variant="caption"
                      textAlign={"center"}
                      component={"h1"}
                      fontWeight={500}
                      // color=""
                    >
                      Excel Invoice Upload
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card variant="outlined" sx={{ width: "45%" }}>
                <CardActionArea onClick={() => setIsFormSelect("companydata")}>
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      textAlign={"center"}
                      component={"h1"}
                      textTransform={"uppercase"}
                      fontWeight={600}
                      color="success"
                    >
                      Company Data
                    </Typography>
                    <Typography
                      variant="caption"
                      textAlign={"center"}
                      component={"h1"}
                      fontWeight={500}
                    >
                      Invoice Upload by Company
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Paper>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Invoice;
