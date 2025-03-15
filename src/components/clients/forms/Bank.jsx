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

const BankDetails = () => {
  const { regCrmClient, setRegCrmClient } = useContext(ThemeContext);
  let cid = JSON.parse(sessionStorage.getItem("cid"));
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    let editData = JSON.parse(sessionStorage.getItem("edit-data"));
    if (editData?.id) {
      setEdit(true);
      if (editData?.bank) {
        setFormData({ ...editData?.bank });
      }
    }
  }, []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cid: "",
    acNumber: "",
    bankName: "",
    acCreationDate: "",
    relationshipDate: "",
    clientTag: "",
    custmerStatus: "",
  });

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      bank: { ...formData },
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (
      cid &&
      formData?.bankName &&
      formData?.acNumber &&
      formData?.acCreationDate &&
      formData?.relationshipDate
    ) {
      fetch(
        `https://db.enivesh.com/firestore/single/crm_clients/${cid}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert(edit ? "Updated" : "Added");
          setFormData({
            acNumber: "",
            bankName: "",
            acCreationDate: "",
            relationshipDate: "",
            clientTag: "",
            custmerStatus: "",
          });
          navigate("/crm/documents");
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
            Bank Details
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
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="text"
            name=""
            placeholder="Bank Name"
            disabled={!cid}
            label="Bank Name"
            value={formData?.bankName}
            size="small"
            fullWidth
            onChange={(e) =>
              setFormData({ ...formData, bankName: e.target.value })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="number"
            disabled={!cid}
            name=""
            placeholder="Bank Account Number"
            label="Bank Account Number"
            size="small"
            value={formData.acNumber}
            fullWidth
            onChange={(e) =>
              setFormData({ ...formData, acNumber: e.target.value })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="date"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!cid}
            name=""
            placeholder="Account Creation Date"
            label="Account Creation Date"
            value={formData?.acCreationDate}
            onChange={(e) =>
              setFormData({ ...formData, acCreationDate: e.target.value })
            }
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="date"
            disabled={!cid}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            name=""
            placeholder="Relationship Date"
            onChange={(e) =>
              setFormData({ ...formData, relationshipDate: e.target.value })
            }
            label="Relationship Date"
            value={formData?.relationshipDate}
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
            fullWidth
            onClick={() => handleSubmit()}
            color={edit ? "success" : "info"}
            variant="contained"
            disabled={!cid}
            sx={{ maxWidth: 200 }}
          >
            {edit ? "Update" : "Save"}
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default BankDetails;
