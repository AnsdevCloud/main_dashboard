import React, { useState } from "react";
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
  const [file, setFile] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isInvoice, setIsInvoice] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

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
        "http://localhost:3000/api/html-to-pdf",
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

    fetch("http://localhost:3000/api/excel-to-json", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setExtractedData(result || []);
        console.log("result: ", result);
        setStatus({
          excel: false,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleUpload = (data) => {
    // setStatus({ excel: true });
    let slug = data?.company?.split(" ").join("-").toLocaleLowerCase();
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "invoices",
      docId: JSON.stringify(data?.invoicenumber),
      data: {
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

    // console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:25000/service/invoice/set", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        setStatus({ excel: false });
      })
      .catch((error) => console.error(error));
  };

  const ExtractingUpload = () => {
    let data = [
      {
        date: "10/10/2024",
        company: "HDFC",
        description: "Loan Payment",
        amount: 15000,
        invoiceNumber: "INV0011",
      },
      {
        date: "25/10/2024",
        company: "ICICI",
        description: "Insurance Premium",
        amount: 12000,
        invoiceNumber: "INV0012",
      },
      {
        date: "05/11/2024",
        company: "Axis Bank",
        description: "Account Maintenance",
        amount: 5000,
        invoiceNumber: "INV0013",
      },
      {
        date: "18/11/2024",
        company: "Kotak Mahindra",
        description: "Business Loan EMI",
        amount: 20000,
        invoiceNumber: "INV0014",
      },
      {
        date: "02/12/2024",
        company: "SBI",
        description: "Mutual Fund Investment",
        amount: 30000,
        invoiceNumber: "INV0015",
      },
      {
        date: "15/12/2024",
        company: "Bank of Baroda",
        description: "Fixed Deposit",
        amount: 25000,
        invoiceNumber: "INV0016",
      },
      {
        date: "28/12/2024",
        company: "Canara Bank",
        description: "Car Loan EMI",
        amount: 18000,
        invoiceNumber: "INV0017",
      },
      {
        date: "05/01/2025",
        company: "IDBI",
        description: "Credit Card Payment",
        amount: 10000,
        invoiceNumber: "INV0018",
      },
      {
        date: "12/01/2025",
        company: "Union Bank",
        description: "Overdraft Settlement",
        amount: 22000,
        invoiceNumber: "INV0019",
      },
      {
        date: "20/01/2025",
        company: "PNB",
        description: "Home Loan EMI",
        amount: 40000,
        invoiceNumber: "INV0020",
      },
    ];
    extractedData.forEach((value) =>
      value?.data?.slice(1)?.forEach((val) => handleUpload(val))
    );
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
              <Button
                sx={{ textTransform: "uppercase", fontSize: 10 }}
                variant="outlined"
                color={isInvoice ? "inherit" : "success"}
                onClick={() => setIsInvoice(!isInvoice)}
              >
                {isInvoice ? "Cancel " : "  Upload invoice"}
              </Button>
            </Stack>
          </HeadlineTag>
          {isFormSelect === "singleInvoice" && <InvoiceForm />}
          {isFormSelect === "excelinvoice" && (
            <ExcelUpload
              onExcel={(e) => handleGenerateExcel(e)}
              disabled={!extractedData}
            />
          )}
          {isFormSelect === "companydata" && <CompanyData />}
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
                      color="success"
                    >
                      Invoice Upload
                    </Typography>
                    <Typography
                      variant="caption"
                      textAlign={"center"}
                      component={"h1"}
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
