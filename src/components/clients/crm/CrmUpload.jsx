import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid2,
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
  useTheme,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/system";
import { Tabs as BaseTabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import HeadlineTag from "../../options/HeadlineTag";
import { firestore } from "../../../firebase/config";

const CrmUpload = () => {
  const [mgs, setMsg] = React.useState(null);

  const [status, setStatus] = React.useState({
    pdf: false,
    excel: false,
  });
  const [policyType, setPolicyType] = React.useState(null);

  const [extractedData, setExtractedData] = React.useState([]);
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
        console.log("result: ", result);
        setExtractedData(result || []);

        setStatus({
          excel: false,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (cin, policyNumber, type, data) => {
    let docId = type + policyNumber;
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "crm_relationship_values",
      docId: docId,
      data: {
        ...data,
        PCC: policyType,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (cin && policyNumber && policyType) {
      fetch(`https://db.enivesh.com/firestore/set`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setMsg(JSON.parse(result)?.message);
          setStatus({
            ...status,
            excel: false,
          });
        })
        .catch((error) => console.error(error));
    } else {
      alert("policyNumber and CIN not found");
    }
  };

  const handleExcelUploading = () => {
    setStatus({
      ...status,
      excel: true,
    });
    extractedData?.forEach((el, i) => {
      el?.data?.forEach((sel, i) =>
        handleSubmit(sel?.cin, sel?.policynumber, policyType, sel)
      );
      setExtractedData([]);
    });
  };

  return (
    <>
      <Grid2 container spacing={1} p={2}>
        <Grid2 size={{ sx: 12, md: 6 }}>
          <Paper elevation={0}>
            <UnstyledTabsVertical
              onExtract={(e) => handleGenerateExcel(e)}
              extractedData={extractedData}
              onUpload={() => handleExcelUploading()}
              setPolicyType={(e) => setPolicyType(e)}
              status={{ mgs: mgs, option: { ...status } }}
            />
          </Paper>
        </Grid2>
        <Grid2 size={{ sx: 12, md: 6 }}>
          {extractedData[0] && (
            <Paper elevation={0} sx={{ p: 2 }}>
              <HeadlineTag title={mgs ? mgs : "Previews"} />

              {extractedData?.map((el, i) => (
                <>
                  <HeadlineTag
                    title={el?.sheetName}
                    size={"small"}
                    iconColor={"#00f"}
                    my={2}
                    position={"right"}
                  />
                  <DynamicMuiTable data={el?.data} />
                </>
              ))}
            </Paper>
          )}
        </Grid2>
      </Grid2>
    </>
  );
};

export default CrmUpload;

const UnstyledTabsVertical = ({
  onExtract,
  extractedData = [],
  setPolicyType,
  onUpload,
  policyType,
  status,
}) => {
  const theme = useTheme();
  return (
    <Tabs
      defaultValue={0}
      orientation="vertical"
      sx={{ width: "100%", height: 500 }}
    >
      <TabsList sx={{ bgcolor: theme.palette.background.paper }}>
        <Tab>Relationship Value</Tab>
        <Tab>Doccuments</Tab>
      </TabsList>
      <TabPanel sx={{ bgcolor: theme.palette.background.default }} value={0}>
        <RelationShipTabs
          onExtract={onExtract}
          extractedData={extractedData[0]}
          onUpload={onUpload}
          value={policyType}
          setPolicyType={(e) => setPolicyType(e)}
          status={status}
        />
      </TabPanel>
      <TabPanel sx={{ bgcolor: theme.palette.background.default }} value={1}>
        <DoccumentsTabs
          extractedData={extractedData[0]}
          onExtract={onExtract}
          onUpload={onUpload}
          setPolicyType={(e) => setPolicyType(e)}
        />
      </TabPanel>
    </Tabs>
  );
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: inherit;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[200]};
  }

  &:focus {
    color: #fff;
    outline: 1px solid ${blue[200]};
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${blue[600]};
    outline: 1px solid ${blue[200]};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  /* font-family: "IBM Plex Sans", sans-serif; */

  padding: 10px;
  font-size: 0.875rem;
`;

const Tabs = styled(BaseTabs)`
  display: flex;
  gap: 16px;
  width: 200px;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `

  
  min-width: 200px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 6px;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  place-content: space-between center;

  `
);

const RelationShipTabs = ({
  onExtract,
  extractedData = [],
  setPolicyType,
  onUpload,
  value,
  status,
}) => {
  return (
    <>
      <HeadlineTag>
        Relationship Upload
        <Stack>
          {status?.mgs && (
            <Chip label={status?.mgs} size="small" color="success" />
          )}
        </Stack>
      </HeadlineTag>
      <Grid2 container spacing={1} my={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Policy Type</InputLabel>
            <Select
              label="Select Policy Type"
              value={value}
              onChange={(e) => setPolicyType(e.target.value)}
            >
              <MenuItem value={"life-insurance"}>Life Insurance</MenuItem>
              <MenuItem value={"health-insurance"}>Health Insurance</MenuItem>
              <MenuItem value={"vehicle-insurance"}>Vehicle Insurance</MenuItem>
              <MenuItem value={"other-insurnace"}>Other Insurance</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Button fullWidth sx={{ p: 1 }} variant="outlined" size="small">
            {" "}
            Select File
            <input
              style={{
                position: "absolute",
                opacity: 0,

                width: "100%",
                height: "100%",
              }}
              accept="xlxs"
              onChange={(e) => onExtract(e.target.files[0])}
              type="file"
            />
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12 }} py={2} px={1}>
          <Button
            fullWidth
            variant="outlined"
            disabled={extractedData?.length === 0 || status?.option?.excel}
            size="small"
            color="info"
            onClick={onUpload}
          >
            {" "}
            {status?.option?.excel ? "Uploading..." : "Upload"}
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

const DoccumentsTabs = ({ onExtract, extractedData = [], setPolicyType }) => {
  const [file, setFile] = React.useState(null);
  const [formData, setFormData] = React.useState({
    policyNumber: "",
    fileName: "",
    policyType: "",
    documentType: "",
    cin: "",
  });

  const [isMessage, setIsMessage] = React.useState({
    type: "error",
    message: "Wrotns",
    open: false,
  });

  //add member function

  // step -1
  const handleAddDacument = async () => {
    const docRef = doc(
      firestore,
      "crm_relationship_values",
      `${formData?.policyType}${formData?.policyNumber}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIsMessage({ open: true, message: "Processing...", type: "info" });
      setTimeout(() => {
        handleFind({ id: docSnap.id, ...docSnap.data() });
      }, 1000);
    } else {
      setIsMessage({
        open: true,
        message: "Policy Number not found",
        type: "error",
      });
    }
  };

  // step - 3

  const handleSubmit = (cin, docsData, policyData) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "crm_relationship_value_documents",
      data: {
        policyNumber: policyData?.policynumber,
        fileName: formData?.fileName,
        policyType: formData?.policyType,
        documentType: formData.documentType,
        policyId: cin,
        cin: policyData?.cin,
        ...docsData,
        PCC: policyData?.PCC,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (cin && docsData) {
      fetch(`https://db.enivesh.com/firestore/add`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setFormData({
            policyNumber: "",
            fileName: "",
            policyType: "",
            documentType: "",
            cin: "",
          });
          setFile(null);
          setTimeout(() => {
            setIsMessage({
              open: true,
              message: "Policy updated successfully ",
              type: "success",
            });
          }, 1000);
          setTimeout(() => {
            setIsMessage({
              open: false,
              message: "Policy updated successfully ",
              type: "success",
            });
          }, 5000);
        })
        .catch((error) => console.error(error));
    } else {
      setIsMessage({
        open: true,
        message: "Policy Updating failed ",
        type: "error",
      });
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

  //setp - 2
  const handleFind = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    if (!file) {
      setIsMessage({ open: true, message: "File not Selected" });
      return;
    }
    if (file) {
      const MAX_SIZE = 20 * 1024 * 1024;
      if (file?.size > MAX_SIZE) {
        // If file size is too large, update error state
        setIsMessage({
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
    formdata.append("fileFolder", "relationship_values");
    formdata.append("fileName", formData?.fileName);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    if (formData?.fileName && formData?.policyType) {
      fetch("https://db.enivesh.com/storage/upload-file", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setIsMessage({
            open: true,
            message: "Updating Policy Data , Being Proccessing...",
            type: "info",
          });
          setTimeout(() => {
            handleSubmit(data?.id, { ...result }, { ...data });
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
          setIsMessage({
            open: true,
            message: "Updating Policy Data failed ",
            type: "error",
          });
        });
    } else {
      setIsMessage({ open: true, message: "All field required" });
    }
  };
  return (
    <>
      <HeadlineTag>Doccuments Upload</HeadlineTag>
      <Grid2 container spacing={1} my={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Policy Type</InputLabel>
            <Select
              label=" Policy Type"
              value={formData?.policyType}
              onChange={(e) =>
                setFormData({ ...formData, policyType: e.target.value })
              }
            >
              <MenuItem value={"life-insurance"}>Life Insurance</MenuItem>
              <MenuItem value={"health-insurance"}>Health Insurance</MenuItem>
              <MenuItem value={"vehicle-insurance"}>Vehicle Insurance</MenuItem>
              <MenuItem value={"other-insurnace"}>Other Insurance</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Document Type</InputLabel>
            <Select
              label=" Document Type"
              value={formData?.documentType}
              onChange={(e) =>
                setFormData({ ...formData, documentType: e.target.value })
              }
            >
              <MenuItem value={"proposal-form"}>Proposal Form</MenuItem>
              <MenuItem value={"policy-documents"}>Policy Documents</MenuItem>
              <MenuItem value={"consent"}>Consent</MenuItem>
              <MenuItem value={"counter-offer"}>Counter offer</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <TextField
              size="small"
              label="File Name"
              value={formData?.fileName}
              onChange={(e) =>
                setFormData({ ...formData, fileName: e.target.value })
              }
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <TextField
              size="small"
              label="Policy Number"
              value={formData?.policyNumber}
              onChange={(e) =>
                setFormData({ ...formData, policyNumber: e.target.value })
              }
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Button
            fullWidth
            sx={{ py: 1, fontSize: file ? 10 : 14 }}
            variant={file ? "text" : "outlined"}
            size="small"
            color={file ? "success" : "primary"}
          >
            {" "}
            {file ? file?.name : " Select File"}
            <input
              style={{
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
              }}
              accept="xlxs"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
          </Button>
        </Grid2>

        <Grid2 size={{ xs: 12 }} py={2} px={1}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            disabled={!file}
            onClick={() => handleAddDacument()}
            color="info"
          >
            {" "}
            Upload
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12 }} py={2} px={1}>
          {isMessage?.open && (
            <Card elevation={0}>
              <CardContent>
                <Alert
                  onClose={() => setIsMessage({ ...isMessage, open: false })}
                  severity={isMessage?.type}
                >
                  {isMessage?.message}
                </Alert>
              </CardContent>
            </Card>
          )}
        </Grid2>
      </Grid2>
    </>
  );
};

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

const DynamicMuiTable = ({
  data = [
    { name: "Alice", age: 30, occupation: "Developer" },
    { Google: "Bob", age: 25, occupation: "Designer" },
    { name: "Charlie", age: 28, occupation: "Tester", city: "Mumbai" },
  ],
}) => {
  const theme = useTheme();

  // Sabhi objects se unique keys extract karne ke liye
  const columnHeaders = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  );

  return (
    <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 600 }}>
      <Table>
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <TableRow>
            {columnHeaders.map((col, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {col.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columnHeaders.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {row[col] !== undefined ? row[col] : "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
