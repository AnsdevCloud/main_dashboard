// src/components/ClientsLandingPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid2,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";
import ClientDetailsCard from "./Card";
import { Link } from "react-router-dom";
import axios from "axios";

const clientsData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Anytown, USA",
    avatarUrl: "https://via.placeholder.com/150",
    premium: true,
    label: "Gold",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 891",
    address: "456 Market St, Anytown, USA",
    avatarUrl: "https://via.placeholder.com/150",
    premium: false,
    label: "Silver",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 234 567 892",
    address: "789 Broadway, Anytown, USA",
    avatarUrl: "https://via.placeholder.com/150",
    premium: true,
    label: "Platinum",
  },
  // Add more client objects as needed
];

const ClientsLandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [premiumFilter, setPremiumFilter] = useState(false);
  const [labelFilter, setLabelFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://db.enivesh.com/firestore/all/crm_clients?limit=10",
          {
            headers: {
              "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data?.documents);
        console.log("response.data?.documents: ", response.data?.documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter clients based on search term, premium status, and label
  const filteredClients = data.filter((client) => {
    const searchMatch =
      client?.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.panNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const premiumMatch = premiumFilter ? client.premium === true : true;
    const labelMatch = labelFilter ? client.label === labelFilter : true;
    return searchMatch && premiumMatch && labelMatch;
  });

  // Extract unique labels for the dropdown
  const labels = Array.from(new Set(clientsData.map((client) => client.label)));

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      {/* Filters and Search Controls */}
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          borderRadius: 2,
          position: "sticky",
          top: 0,
          maxWidth: 800,
          margin: "auto",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Search Clients"
            variant="standard"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 2 }}
          />
          {/* 
          <FormControl
            size="small"
            variant="outlined"
            sx={{ minWidth: 120, flex: 1 }}
          >
            <InputLabel id="label-filter-label">Label</InputLabel>
            <Select
              labelId="label-filter-label"
              label="Label"
              value={labelFilter}
              onChange={(e) => setLabelFilter(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {labels.map((label, index) => (
                <MenuItem key={index} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={premiumFilter}
                onChange={(e) => setPremiumFilter(e.target.checked)}
                sx={{
                  color: "#ff5c00",
                  "&.Mui-checked": { color: "#ff5c00" },
                }}
              />
            }
            label="Premium Only"
            sx={{ flex: 1, whiteSpace: "nowrap" }}
          /> */}
        </Box>
      </Paper>

      {/* Display Client Cards */}
      <Grid2 container spacing={4} justifyContent="center">
        {filteredClients.map((client) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={client.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/crm/clients/${client.id}`}
              state={client}
            >
              <ClientDetailsCard client={client} />
            </Link>
          </Grid2>
        ))}
        {filteredClients.length === 0 && (
          <Typography
            variant="h6"
            sx={{ mt: 4, textAlign: "center", width: "100%" }}
          >
            No clients found.
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default ClientsLandingPage;
