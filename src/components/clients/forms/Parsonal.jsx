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

const Parsonal = () => {
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
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            disabled
            name=""
            placeholder="CID"
            label="CID"
            size="small"
            defaultValue={"EN23d4r"}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Client Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Client Type"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Customer Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Customer Type"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            aria-readonly={true}
            name=""
            placeholder="First Name"
            label="First Name"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
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
              // value={age}
              label="Gender"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Male</MenuItem>
              <MenuItem value={20}>Female</MenuItem>
              <MenuItem value={30}>other</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="date"
            name=""
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
            type="text"
            name=""
            placeholder="Nationality"
            label="Nationality"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
            placeholder="Caste"
            label="Caste"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
            placeholder="Material Status"
            label="Material Status"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
            placeholder="PAN Number"
            label="PAN Number"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="number"
            name=""
            placeholder="Aadhar Number"
            label="Aadhar Number"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="email"
            name=""
            placeholder="Parsonal Enail"
            label="Parsonal Email"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="number"
            name=""
            placeholder="Primary Number"
            label="Primary Number"
            size="small"
            fullWidth
          />
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="number"
            name=""
            placeholder="Secondary Number"
            label="Secondary Number"
            size="small"
            fullWidth
          />
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
            placeholder="Annual Income"
            label="Annual Income"
            size="small"
            fullWidth
          />
        </Grid2>{" "}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            type="text"
            name=""
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

export default Parsonal;
