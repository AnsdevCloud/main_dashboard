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
  Card,
  CardContent,
} from "@mui/material";
import ClientDetailsCard from "./Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTabs } from "../../../stores/TabsContex";
import useEncryptedSessionStorage from "../../../hooks/useEncryptedSessionStorage";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { getLastMonthClientsWithStatus } from "../../../firebase/utils/getTodaysClients";

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
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();
  const { addTab } = useTabs();
  const [isData, setDataList] = useEncryptedSessionStorage("clientData", []);
  const [searchResults, setResults] = useState([]);

  const searchByName = async (e) => {
    try {
      const usersRef = collection(firestore, "crm_clients");
      const q = query(
        usersRef,
        orderBy("fname"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );
      const q3 = query(
        usersRef,
        orderBy("lname"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );
      const q2 = query(
        usersRef,
        orderBy("firmName"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );

      const snapshot = await getDocs(q);
      const searchResults = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const snapshot2 = await getDocs(q2);
      const searchResults2 = snapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const snapshot3 = await getDocs(q3);

      const searchResults3 = snapshot3.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter out duplicates based on the 'id' field
      const email = query(
        usersRef,
        orderBy("email"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );
      const panNumber = query(
        usersRef,
        orderBy("panNumber"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );
      const primaryNumber = query(
        usersRef,
        orderBy("primaryNumber"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );
      const snapshotEmail = await getDocs(email);

      const searchResultsEmail = snapshotEmail.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const snapshotphone = await getDocs(primaryNumber);

      const searchResultsphone = snapshotphone.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const snapshotPan = await getDocs(panNumber);

      const searchResultsPan = snapshotPan.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uniqueResults = [
        ...searchResults,
        ...searchResults2,
        ...searchResults3,
        ...searchResultsEmail,
        ...searchResultsPan,
        ...searchResultsphone,
      ]?.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.cin === item.cin)
      );

      setResults(uniqueResults);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const caselater = searchTerm.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm?.length >= 3) {
      searchByName(caselater);
    } else {
      setResults(isData || []);
    }
  };

  useEffect(() => {
    const uniqueByCin = [...isData, ...recentActivity]?.filter(
      (item, index, self) => index === self.findIndex((t) => t.cin === item.cin)
    );
    setDataList(uniqueByCin);
    if (searchTerm?.length < 3) {
      setResults(uniqueByCin);
    }
  }, []);

  const handleOpen = (e, client) => {
    e.preventDefault();
    if (e.ctrlKey || e.altKey) {
      addTab({
        label: client.fname || client.firmName,
        name: client.id,
        link: `/crm/clients/${client.id}`,
      });
      navigate(`/crm/clients/${client.id}`, {
        state: { ...client },
      });
      setDataList([...isData, client]);
    } else {
      navigate(`/crm/clients/${client.id}`, {
        state: { ...client },
      });
      setDataList([...isData, client]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLastMonthClientsWithStatus();
      setRecentActivity(data || []);
    };
    fetchData();
  }, []);
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
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ flex: 2 }}
          />
        </Box>
      </Paper>

      {/* Display Client Cards */}
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 size={{ xs: 12, md: 8 }}>
          {" "}
          {searchTerm.length < 3 ? (
            <Typography variant="body2" color="grey" fontWeight={600}>
              Searched Record
            </Typography>
          ) : (
            <Typography variant="body2" color="success.dark" fontWeight={600}>
              Results
            </Typography>
          )}
        </Grid2>
        {searchResults?.map((client) => (
          <Grid2 size={{ xs: 12, md: 8 }} key={client.id}>
            <Link
              style={{ textDecoration: "none" }}
              onClick={(e) => handleOpen(e, client)}
            >
              <ClientDetailsCard client={client} />
            </Link>
          </Grid2>
        ))}
        {searchResults.length === 0 && (
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  component={"h2"}
                  variant="subtitle1"
                  textAlign={"center"}
                  color="grey"
                  sx={{ cursor: "default" }}
                >
                  No Clients Found
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

export default ClientsLandingPage;
