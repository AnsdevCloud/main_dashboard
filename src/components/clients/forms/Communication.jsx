import { ArrowBack, Save } from "@mui/icons-material";
import { Button, Container, Grid2, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../theme/ThemeContext";

const Communication = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  let cid = JSON.parse(sessionStorage.getItem("cid"));
  const [formData, setFormData] = useState({
    cid: "",
    residentialAddress: "",
    officeAddress: "",
    permanentAddress: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    languagePreference: "",
  });
  useEffect(() => {
    let editData = JSON.parse(sessionStorage.getItem("edit-data"));
    if (editData?.id) {
      setEdit(true);
      setFormData({ ...editData?.communication });
    }
  }, []);
  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      communication: { ...formData },
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (
      cid &&
      formData?.emergencyContactName &&
      formData?.emergencyContactNumber &&
      formData?.languagePreference &&
      formData?.officeAddress &&
      formData?.permanentAddress &&
      formData?.residentialAddress
    ) {
      fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert(edit ? "Updated" : "Added");
          setFormData({
            residentialAddress: "",
            officeAddress: "",
            permanentAddress: "",
            emergencyContactName: "",
            emergencyContactNumber: "",
            languagePreference: "",
          });
          navigate("/crm/family");
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
            Communication Details
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="text"
            multiline
            rows={3}
            name=""
            value={formData?.residentialAddress}
            placeholder="Residential Address"
            onChange={(e) =>
              setFormData({ ...formData, residentialAddress: e.target.value })
            }
            label="Residential Address"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="text"
            multiline
            value={formData?.officeAddress}
            onChange={(e) =>
              setFormData({ ...formData, officeAddress: e.target.value })
            }
            rows={3}
            name=""
            placeholder="Office Address"
            label="Office Address"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="text"
            value={formData?.permanentAddress}
            onChange={(e) =>
              setFormData({ ...formData, permanentAddress: e.target.value })
            }
            multiline
            rows={3}
            name=""
            placeholder="Permanent Address"
            label="Permanent Address"
            size="small"
            fullWidth
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
            placeholder="Emergency Contact Name"
            label="Emergency Contact Name"
            value={formData?.emergencyContactName}
            onChange={(e) =>
              setFormData({ ...formData, emergencyContactName: e.target.value })
            }
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="number"
            name=""
            value={formData?.emergencyContactNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                emergencyContactNumber: e.target.value,
              })
            }
            placeholder="Emergency Contact Number"
            label="Emergency Contact Number"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
            value={formData?.languagePreference}
            onChange={(e) =>
              setFormData({ ...formData, languagePreference: e.target.value })
            }
            placeholder="Language Preference"
            label="Language Preference"
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
            to={-1}
          >
            Back
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }} my={{ xs: 2, md: 3 }}>
          <Button
            startIcon={<Save />}
            onClick={() => handleSubmit()}
            fullWidth
            color={edit ? "success" : "info"}
            variant="contained"
            sx={{ maxWidth: 200 }}
          >
            {edit ? "Update" : "Save"}
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Communication;
