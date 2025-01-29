import { ArrowBack, Save } from "@mui/icons-material";
import { Button, Container, Grid2, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Communication = () => {
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
            placeholder="Residential Address"
            label="Residential Address"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="text"
            multiline
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
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="number"
            name=""
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
            to="/client"
          >
            Back
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }} my={{ xs: 2, md: 3 }}>
          <Button
            startIcon={<Save />}
            fullWidth
            color="info"
            variant="contained"
            sx={{ maxWidth: 200 }}
          >
            Save{" "}
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Communication;
