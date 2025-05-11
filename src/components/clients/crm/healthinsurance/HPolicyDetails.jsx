import React, { useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Paper,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

import HDocument from "./hpolicyDetails/Documents";
import HOverviews from "./hpolicyDetails/HOverview";
import Benifits from "./hpolicyDetails/Benifits";
import dayjs from "dayjs";
import { toDate } from "date-fns";
import { getFirebaseDate } from "../../../../firebase/utils/getFirebaseDate.js";

const navKey = {
  0: "overviews",
  1: "benifits",
  2: "document",
  3: "policy-status",
  4: "expanse",
};
function getKeyByValue(obj, targetValue) {
  return Object.keys(obj).find((key) => obj[key] === targetValue);
}
const HPolicyDetails = () => {
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
        `https://db.enivesh.com/firestore/single/health_insurance_policies/${id}`,
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
    <Paper elevation={0} sx={{ width: "100%", mt: 2, px: 1 }}>
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
        <Tab label="Benifits" />
        <Tab label="Documents" />
      </Tabs>
      <Box sx={{ p: 3 }}>
        {value === 0 && <HOverviews data={data} />}
        {value === 1 && <Benifits data={data} />}
        {value === 2 && <HDocument data={data} />}
        {/* {value === 3 && <PolicyStatus data={data} />}
        {value === 4 && <Expanse data={data} />} */}
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

export default HPolicyDetails;
