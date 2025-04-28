import { ArrowBack, Save } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../theme/ThemeContext";
import useEncryptedSessionStorage from "../../../hooks/useEncryptedSessionStorage";

const leadsVariables = {
  leadsSource: [
    {
      name: "Social Media",
      value: "social_Media",
    },
    {
      name: "Client Reference",
      value: "client_Reference",
    },
    {
      name: "Inhouse New Sales",
      value: "inhouse_New_Sales",
    },
    {
      name: "Partner Sales",
      value: "partner_Sales",
    },
    {
      name: "Compaign Activity",
      value: "compaign_Activity",
    },
    {
      name: "Corporate Activity",
      value: "corporate_Activity",
    },
    {
      name: "Residential Activity",
      value: "residential_Activity",
    },
    {
      name: "Financial Avarness Compaign",
      value: "financial_Avarness_Compagn",
    },
  ],
  sourcing: [
    {
      name: "Mohd. Zaid",
      value: "mohd._zaid",
      labal: "sales",
    },
    {
      name: "Sandeep Jagtap",
      value: "sandeep_jagtap",
      labal: "partner",
    },
    {
      name: "Raj Sura",
      value: "raj_sura",
      labal: "partner",
    },
    {
      name: "Narendra",
      value: "narendra",
      labal: "partner",
    },
    {
      name: "Kuldeep Singh",
      value: "kuldeep_Singh",
      labal: "partner",
    },
  ],
  servicingManager: [
    {
      name: "Shubhangi Kamble",
      value: "shubhangi_kamble",
    },
  ],
  financialGoalOrganiser: [
    {
      name: "Babasaheb Kadam",
      value: "babasaheb_kadam",
    },
    {
      name: "Mohd. Zaid",
      value: "mohd._zaid",
    },
    {
      name: "Sandeep Jagtap",
      value: "sandeep_Jagtab",
    },
    {
      name: "Raj Sura",
      value: "raj_sura",
    },
    {
      name: "Kuldeep Singh",
      value: "kuldeep Singh",
    },
  ],
};

const LeadsDeatils = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);
  const [editData, setEditData] = useEncryptedSessionStorage("edit-code");

  let cid = JSON.parse(sessionStorage.getItem("cid"));

  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (editData?.id) {
      setEdit(editData?.edit);
      if (editData?.leads) {
        setFormData({ ...editData?.leads });
      }
    }
  }, []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadSource: "",
    sourcing: "",
    servicingManager: "",
    y: "",
  });

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      leads: { ...formData },
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (
      cid &&
      formData?.leadSource &&
      formData?.sourcing &&
      formData?.financialGoalOrganiser &&
      formData?.servicingManager
    ) {
      fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert(edit ? "Updated" : "Added");
          setFormData({
            leadSource: "",
            sourcing: "",
            policyAtStart: "",
            sourceEniveshRM: "",
            sourceEniveshOfficer: "",
          });
          navigate("/crm/register");
        })
        .catch((error) => console.error(error));
    } else {
      alert("All Field Required");
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
            Leads Details
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
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
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Lead Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.leadSource}
              label="Lead Source"
              disabled={!cid}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leadSource: e.target.value,
                  sourcing: "",
                })
              }
            >
              {leadsVariables?.leadsSource?.map((el, i) => (
                <MenuItem key={i} value={el?.value}>
                  {el?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Sourcing</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.sourcing}
              label="Sourcing"
              disabled={!cid}
              onChange={(e) => {
                setFormData({ ...formData, sourcing: e.target.value });
              }}
            >
              {leadsVariables?.sourcing?.map((el, i) => (
                <MenuItem
                  key={i}
                  value={el?.value}
                  disabled={
                    formData?.leadSource === "partner_Sales"
                      ? el?.labal === "sales"
                        ? true
                        : false
                      : el?.labal === "partner"
                      ? true
                      : false
                  }
                >
                  {el?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Servicing Manager
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.servicingManager}
              label="  Servicing Manager"
              disabled={!cid}
              onChange={(e) =>
                setFormData({ ...formData, servicingManager: e.target.value })
              }
            >
              {leadsVariables?.servicingManager?.map((el, i) => (
                <MenuItem key={i} value={el?.value}>
                  {el?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Financial Goal Organiser
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.financialGoalOrganiser}
              label=" Financial Goal Organiser "
              disabled={!cid}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  financialGoalOrganiser: e.target.value,
                })
              }
            >
              {leadsVariables?.financialGoalOrganiser?.map((el, i) => (
                <MenuItem key={i} value={el?.value}>
                  {el?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        <Grid2 size={{ xs: 6, md: 3 }} my={{ xs: 2, md: 3 }}>
          <Button
            startIcon={<Save />}
            fullWidth
            onClick={() => handleSubmit()}
            color={edit ? "success" : "info"}
            variant="contained"
            disabled={
              !cid ||
              !formData?.leadSource ||
              !formData?.financialGoalOrganiser ||
              !formData?.servicingManager ||
              !formData?.sourcing
            }
            sx={{ maxWidth: 200 }}
          >
            {edit ? "Update" : "Save"}
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default LeadsDeatils;
