import React, { useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import Overviews from "./policydtlcomponents/Overviews";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import Riders from "./policydtlcomponents/Riders";
import Document from "./policydtlcomponents/Document";
import PolicyStatus from "./policydtlcomponents/PolicyStatus";
import Expanse from "./policydtlcomponents/Expanse";

import { getFirebaseDate } from "../../../../firebase/utils/getFirebaseDate.js";

const navKey = {
  0: "overviews",
  1: "riders",
  2: "document",
  3: "policy-status",
  4: "expanse",
};
function getKeyByValue(obj, targetValue) {
  return Object.keys(obj).find((key) => obj[key] === targetValue);
}
const PolicyDetails = () => {
  const [value, setValue] = React.useState(3);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const { policyID } = useParams();

  const navigate = useNavigate();
  const [data, setData] = React.useState(null);

  const [searchQ, setSearchQ] = useSearchParams();
  const qi = searchQ.get("i");
  const handleChange = (event, newValue) => {
    setValue(newValue);

    navigate(`?i=${navKey[newValue]}`);
  };

  const handleFetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://db.enivesh.com/firestore/single/life_insurance_policies/${id}`,
        {
          headers: {
            "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
            "Content-Type": "application/json",
          },
        }
      );

      return response?.data;
    } catch (error) {
      setIsLoading(false);

      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const key = getKeyByValue(navKey, qi);
    if (key) {
      setValue(parseInt(key));
    }
  }, [qi]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await handleFetchData(policyID);

      if (data) {
        setIsLoading(false);

        setData(data);
      }
    };

    if (state) {
      setData(state);
      setIsLoading(false);
    } else {
      if (data?.id === policyID) return;
      fetchData();
    }
  }, [policyID, state]);

  return (
    <Paper
      elevation={0}
      sx={{ width: "100%", mt: 2, px: 1, position: "relative" }}
    >
      {isLoading && <LinearProgress color="success" />}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Policy Details Tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#1976d2",
          },
          "& .Mui-selected": {
            color: "#1976d2",
          },
        }}
      >
        <Tab label="Policy Overviews" />
        <Tab label="Riders" />
        <Tab label="Documents" />
        <Tab label="Policy Status" />
        <Tab label="Expense" />
      </Tabs>
      <Box sx={{ p: 3 }}>
        {value === 0 && <Overviews data={data} />}
        {value === 1 && <Riders data={data} />}
        {value === 2 && <Document data={data} />}
        {value === 3 && <PolicyStatus data={data} />}
        {value === 4 && <Expanse data={data} />}
      </Box>
      <Typography
        my={1}
        component={"p"}
        textAlign={"right"}
        variant="caption"
        color="grey"
        fontSize={8}
        fontWeight={600}
      >
        Policy At Added : {getFirebaseDate(data?.createdAt)}
      </Typography>
    </Paper>
  );
};

export default PolicyDetails;
