import { ArrowBack, Save } from "@mui/icons-material";
import {
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
import React from "react";
import { Link } from "react-router-dom";

const BankDetails = () => {
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
          <TextField
            type="text"
            name=""
            placeholder="Bank Name"
            label="Bank Name"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="number"
            name=""
            placeholder="Bank Account Number"
            label="Bank Account Number"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="date"
            focused
            color="#777"
            name=""
            placeholder="Account Creation Date"
            label="Account Creation Date"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            type="date"
            focused
            color="#777"
            name=""
            placeholder="Relationship Date"
            label="Relationship Date"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Client Tag</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Client Tag"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Tag1</MenuItem>
              <MenuItem value={20}>Tag2</MenuItem>
              <MenuItem value={30}>Tag3</MenuItem>
            </Select>
          </FormControl>
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Customer Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label=" Customer Status"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Status1</MenuItem>
              <MenuItem value={20}>Status2</MenuItem>
              <MenuItem value={30}>Status3</MenuItem>
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

export default BankDetails;
