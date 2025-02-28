import { ArrowBack, Lock, LockOpen, Save } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../theme/ThemeContext";
import { RiAiGenerate } from "react-icons/ri";

const Parsonal = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);

  const [errorMsg, setErrorMsg] = useState({
    name: null,
    msg: null,
  });

  const navigate = useNavigate();
  const [idStatus, setIdStatus] = useState(null);
  const [cinLock, setCinLock] = useState(null);
  let old = JSON.parse(sessionStorage.getItem("cid"));
  let editData = JSON.parse(sessionStorage.getItem("edit-data"));

  useEffect(() => {
    let cinLockstore = JSON.parse(sessionStorage.getItem("cid-lock"));
    let editData = JSON.parse(sessionStorage.getItem("edit-data"));

    setCinLock(cinLockstore);
    if (regCrmClient?.clientID === null) {
      let old = JSON.parse(sessionStorage.getItem("cid"));
      setIdStatus("old");
      sessionStorage.setItem("cid", JSON.stringify(old));
      setRegCrmClient({
        ...regCrmClient,
        clientID: old,
      });
    } else {
      if (regCrmClient?.data) {
        sessionStorage.setItem("cid", JSON.stringify(regCrmClient?.clientID));
        setFormData({ ...formData, cin: regCrmClient?.clientID });
      } else {
        let cid = JSON.parse(sessionStorage.getItem("cid"));
        setFormData({ ...formData, cin: cid });
      }
    }
    if (editData) {
      setFormData({ ...editData });
    }
  }, [idStatus, regCrmClient?.clientID, cinLock]);

  const [formData, setFormData] = useState({
    cin: "",
    clientType: "",
    customerType: "",
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    coste: "",
    meterialStatus: "",
    email: "",
    panNumber: "",
    primaryNumber: "",
    secondaryNumber: "",
    anualIncome: "",
    occupation: "",
    nationality: "",
  });

  const handleSubmit = () => {
    sessionStorage.setItem("cid-lock", JSON.stringify(true));
    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "crm_clients",
      docId: regCrmClient?.clientID,
      data: {
        ...formData,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (
      formData?.cin &&
      formData?.anualIncome &&
      formData?.clientType &&
      formData?.email &&
      formData?.panNumber &&
      formData?.coste &&
      formData?.fname &&
      formData?.primaryNumber &&
      formData?.dob &&
      formData?.customerType &&
      formData?.secondaryNumber &&
      formData?.gender
    ) {
      fetch(`https://db.enivesh.com/firestore/set`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert("Added");
          setFormData({
            clientType: "",
            customerType: "",
            fname: "",
            lname: "",
            gender: "",
            dob: "",
            coste: "",
            meterialStatus: "",
            email: "",
            panNumber: "",
            adharNumber: "",
            primaryNumber: "",
            secondaryNumber: "",
            anualIncome: "",
            occupation: "",
            nationality: "",
          });
          navigate("/crm/communication");
        })
        .catch((error) => console.error(error));
    } else {
      alert("All field requried");
    }
  };

  const handleGenerateId = () => {
    let cid = generateRandomId(cinLock);
    setIdStatus("new");
    sessionStorage.setItem("cid", JSON.stringify(cid));
    sessionStorage.setItem("cid-lock", JSON.stringify(false));
    setRegCrmClient({
      ...regCrmClient,
      clientID: cid,
    });
  };

  const handleCINLock = (e) => {
    if (editData?.id) {
      return;
    }
    if (old) {
      sessionStorage.setItem("cid-lock", JSON.stringify(e));
      setCinLock(e);
    } else {
      alert("CIN not set ");
    }
  };

  const handleUpdate = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      ...formData,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (old && editData?.id) {
      fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${old}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert("Updated");

          navigate("/crm/communication");
        })
        .catch((error) => console.error(error));
    } else {
      alert("All Field Required");
    }
  };

  const handleNewReg = () => {
    if (formData?.cin) {
      if (window.confirm("Your form data lost ? ")) {
        sessionStorage.setItem("cid-lock", JSON.stringify(false));
        sessionStorage.setItem("cid", JSON.stringify(null));
        sessionStorage.setItem("edit-data", JSON.stringify(null));
        window.location.reload();
      } else {
        return;
      }
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
            Parsonal Details
            <Tooltip title="New Form ">
              <Button
                disabled={editData?.id ? false : cinLock}
                onClick={() => handleNewReg()}
                size="small"
                sx={{ ml: 2 }}
              >
                New
              </Button>
            </Tooltip>
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={2}
          >
            <TextField
              onChange={(e) =>
                setFormData({ ...formData, cin: e.target.value })
              }
              type="text"
              disabled={!idStatus || cinLock}
              placeholder="CIN"
              value={formData?.cin}
              label="CIN"
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              fullWidth
            />
            {!cinLock && (
              <Tooltip title="Click Locked CIN">
                <IconButton
                  color="info"
                  size="small"
                  onClick={() => handleCINLock(true)}
                >
                  <LockOpen />
                </IconButton>
              </Tooltip>
            )}
            {cinLock && (
              <Tooltip
                title={
                  editData?.id
                    ? "Not Unlock , Update Mode Active "
                    : "Click Unlocked"
                }
              >
                <IconButton
                  color="success"
                  size="small"
                  onClick={() => handleCINLock(false)}
                >
                  <Lock />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Generate CIN">
              <IconButton
                color="primary"
                size="small"
                disabled={cinLock}
                onClick={() => handleGenerateId()}
              >
                <RiAiGenerate />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Client Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.clientType}
              label="Client Type"
              onChange={(e) =>
                setFormData({ ...formData, clientType: e.target.value })
              }
            >
              <MenuItem value={"family-wealth"}>Family Wealth</MenuItem>
              <MenuItem value={"comprehansive"}>Comprehansive</MenuItem>
              <MenuItem value={"new-relationship"}>New Relationship</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Customer Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.customerType}
              label="Customer Type"
              onChange={(e) =>
                setFormData({ ...formData, customerType: e.target.value })
              }
            >
              <MenuItem value={"silver"}>Silver</MenuItem>
              <MenuItem value={"gold"}>Gold</MenuItem>
              <MenuItem value={"dimond"}>Dimond</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
            type="text"
            aria-readonly={true}
            name=""
            value={formData?.fname}
            placeholder="First Name"
            label="First Name"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, lname: e.target.value })
            }
            type="text"
            value={formData?.lname}
            name=""
            placeholder="Last Name"
            label="Last Name"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.gender}
              label="Gender"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"general"}>General</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            type="date"
            name=""
            value={formData?.dob}
            placeholder="Date of Birth"
            label="Date of Birth"
            size="small"
            color="#000"
            focused
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
            type="text"
            value={formData?.nationality}
            name=""
            placeholder="Nationality"
            label="Nationality"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, coste: e.target.value })
            }
            type="text"
            value={formData?.coste}
            name=""
            placeholder="Native Language"
            label="Native Language"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Material Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.meterialStatus}
              label="Material Status"
              onChange={(e) =>
                setFormData({ ...formData, meterialStatus: e.target.value })
              }
            >
              <MenuItem value={"married"}>Married</MenuItem>
              <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
              <MenuItem value={"window"}>Window</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, panNumber: e.target.value })
            }
            type="text"
            name=""
            placeholder="PAN Number"
            label="PAN Number"
            size="small"
            value={formData?.panNumber}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            value={formData?.email}
            name=""
            placeholder="Parsonal Enail"
            label="Parsonal Email"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, primaryNumber: e.target.value })
            }
            type="number"
            name=""
            value={formData?.primaryNumber}
            placeholder="Primary Number"
            label="Primary Number"
            size="small"
            fullWidth
          />
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, secondaryNumber: e.target.value })
            }
            type="number"
            value={formData?.secondaryNumber}
            name=""
            placeholder="Secondary Number"
            label="Secondary Number"
            size="small"
            fullWidth
          />
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, anualIncome: e.target.value })
            }
            type="number"
            value={formData?.anualIncome}
            name=""
            placeholder="Annual Income"
            label="Annual Income"
            size="small"
            fullWidth
          />
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, occupation: e.target.value })
            }
            type="text"
            name=""
            value={formData?.occupation}
            placeholder="Occupation"
            label="Occupation"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 9 }} my={{ xs: 2, md: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            fullWidth
            color="inherit"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            component={Link}
            to={"/crm/register"}
          >
            Back
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }} my={{ xs: 2, md: 3 }}>
          {editData ? (
            <Button
              onClick={() => handleUpdate()}
              startIcon={<Save />}
              fullWidth
              color="success"
              variant="contained"
              sx={{ maxWidth: 200 }}
            >
              Update{" "}
            </Button>
          ) : (
            <Button
              onClick={() => handleSubmit()}
              startIcon={<Save />}
              fullWidth
              color="info"
              variant="contained"
              sx={{ maxWidth: 200 }}
            >
              Save{" "}
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Parsonal;

// Utility function to generate a random ID
function generateRandomId() {
  const chars = "0123456789abcdfghijklmnopqrstuvwxyz";
  let id = "en";
  for (let i = 1; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return id;
}
