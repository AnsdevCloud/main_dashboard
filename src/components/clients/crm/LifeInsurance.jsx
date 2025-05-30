import {
  Divider,
  Grid2,
  Paper,
  Stack,
  List,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadlineTag from "../../options/HeadlineTag";
import DoughnutChart from "../../charts/Doughnut";

import BarChart from "../../charts/BarChart";
import ButtonWithNewTab from "../../options/ButtonWithNewTab";
import { Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import LineChart from "../../charts/LineChart";

import TransparentCard from "../../options/TransparentCard";
import PolicySummaryAccordion from "../../options/PolicySummaryAccordion";
import InputWithValidation from "../../forms/components/InputWithValidation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
// Override default English locale
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour", // ✅ override "an hour"
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});
const LifeInsurance = () => {
  const { pathname } = useLocation();

  const [collectionName, setCollectionName] = useState("LTD");

  const [policyData, setPolicyData] = useState(null);
  const [ViewDetails, setViewDetails] = useState(false);
  const [linechartData, setLineChart] = useState(null);
  const [planDougth, setplanDougth] = useState(null);
  const [barChart, setbarChart] = useState(null);
  const [policyCountByStatus, setPolicyCountByStatus] = useState(null);
  const [policyCountByClientType, setPolicyCountByClientType] = useState(null);
  useEffect(() => {
    const unsubscribeDeatis = listenToChart(
      (data) => {
        setPolicyData(data);
      },
      collectionName,
      "overview"
    );

    const unsubscribe = listenToChart(
      (data) => {
        setLineChart(data);
      },
      collectionName,
      "company-wise-line-chart-3"
    );
    const unsubscribe2 = listenToChart(
      (data) => {
        setplanDougth(data);
      },
      collectionName,
      "plan-wise-doughnut-chart-1"
    );
    const unsubscribe3 = listenToChart(
      (data) => {
        setbarChart(data);
      },
      collectionName,
      "plan-wise-bar-chart-2"
    );
    const unsubscribe4 = listenToChart(
      (data) => {
        setPolicyCountByStatus(data);
      },
      collectionName,
      "policy-count-bystatus-doughnut-chart-4"
    );

    const unsubscribe5 = listenToChart(
      (data) => {
        setPolicyCountByClientType(data);
      },
      collectionName,
      "policy-count-byclient-type-doughnut-chart-5"
    );

    return () => {
      unsubscribeDeatis();
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
      unsubscribe5();
    }; // Cleanup on unmount
  }, [collectionName]);

  return (
    <>
      <Grid2
        container
        spacing={2}
        p={{ xs: 0.2, sm: 1, md: 2 }}
        wrap="wrap-reverse"
      >
        <Grid2 size={{ xs: 12, sm: 12, md: 10 }}>
          <Grid2
            container
            spacing={2}
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.shadows[0],
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Grid2 size={{ xs: 12 }}>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                flexWrap={"wrap"}
                gap={2}
                justifyItems={"center"}
              >
                <HeadlineTag title={"Life Insurance"} />

                <Box sx={{ maxWidth: 200 }}>
                  <InputWithValidation
                    fullWidth={true}
                    onChange={(e) => setCollectionName(e)}
                    value={collectionName}
                    type="select"
                    label={"Filter"}
                    options={[
                      { name: "WTD", value: "WTD" },
                      { name: "MTD", value: "MTD" },
                      { name: "YTD", value: "YTD" },
                      { name: "LTD", value: "LTD" },
                    ]}
                  />
                </Box>
                <Typography variant="caption" fontWeight={600} color="grey">
                  {`Last updated: ${
                    policyData?.updatedAt
                      ? dayjs(policyData?.updatedAt?.toDate()).fromNow()
                      : "N/A"
                  }`}
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Grid2 container spacing={1}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <TransparentCard
                    value={policyData?.totalPolicy}
                    caption={"Total Policy"}
                    captionColor={"grey"}
                    rupeeLabal={false}
                    onClick={() => setViewDetails(!ViewDetails)}
                    tooltipText={ViewDetails ? "Hide Details" : "View Details"}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <TransparentCard
                    value={
                      policyData?.policySummery
                        ? Object?.keys(policyData?.policySummery)?.length
                        : 0
                    }
                    caption={"Total Clients"}
                    rgbColor="rgb(5, 187, 190)"
                    captionColor={"grey"}
                    onClick={() => setViewDetails(!ViewDetails)}
                    rupeeLabal={false}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <TransparentCard
                    value={policyData?.totalPremium}
                    caption={"Total Premium"}
                    rgbColor="rgb(24, 161, 8)"
                    captionColor={"grey"}
                    onClick={() => setViewDetails(!ViewDetails)}
                    rupeeLabal={true}
                    tooltipText={ViewDetails ? "Hide Details" : "View Details"}
                  />
                </Grid2>
                {ViewDetails && (
                  <Grid2 size={{ xs: 12 }}>
                    <Paper
                      sx={{
                        p: 1,
                        bgcolor: (theme) => theme.palette.background.default,
                      }}
                    >
                      <HeadlineTag
                        title={"Policy Summery"}
                        size={"small"}
                        iconColor={"#2fac2f"}
                        my={2}
                      />
                      <PolicySummaryAccordion policyData={policyData} />
                    </Paper>
                  </Grid2>
                )}
              </Grid2>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Grid2 container spacing={1}>
                <Grid2 size={{ xs: 12 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      py: 2,
                      px: 2,
                      bgcolor: (theme) => theme?.palette.background.default,
                    }}
                  >
                    <Grid2 container spacing={1}>
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <DoughnutChart
                          data={policyCountByStatus}
                          title={"Policy Status"}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <DoughnutChart
                          title={"Plan wise Sales"}
                          data={planDougth}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <DoughnutChart
                          title={"Client Type wise Policy"}
                          data={policyCountByClientType}
                        />
                      </Grid2>
                    </Grid2>
                  </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <LineChart
                    xTitle={" Financial Year "}
                    yTitle={"Company Sales"}
                    data={linechartData}
                    mainTitle={"Company Sales FY"}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <BarChart
                    title={"Plans FY Sales "}
                    xtitle={"Financial Year"}
                    ytitle={"Plan Sales"}
                    data={barChart}
                    height={350}
                    financial={true}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 2 }}>
          <Paper elevation={0} sx={{ p: 1, position: "sticky", top: 0 }}>
            <Stack
              gap={0.2}
              flexDirection={{ xs: "row", md: "column" }}
              color={"grey"}
              alignContent={"center"}
              alignItems={"center"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              my={1}
            >
              <Typography
                variant="caption"
                component={"h2"}
                minWidth={200}
                px={2}
                color="grey"
                sx={{ pointerEvents: "none" }}
                textAlign={{ xs: "start", md: "center" }}
              >
                Actions Controls
              </Typography>
              <Divider flexItem />
              <ButtonWithNewTab
                icon={<List />}
                name={"Overveiws"}
                label={"L Overveiws"}
                link={"/crm/life-insurance/policy"}
                pathname={pathname}
              />
              <ButtonWithNewTab
                icon={<Add />}
                name={"Add Policy"}
                label={"L Add Policy"}
                link={"/crm/life-insurance/policy-register"}
                pathname={pathname}
              />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default LifeInsurance;

const listenToChart = (callback, collectionName, id) => {
  const chartRef = doc(
    firestore,
    "dashbords_data",
    "life_insurance_EN-10",
    collectionName,
    id
  );

  const unsubscribe = onSnapshot(
    chartRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    },
    (error) => {
      console.error("Snapshot error:", error);
    }
  );

  return unsubscribe; // Call this to stop listening
};

const listenToDeatils = (callback, id) => {
  const chartRef = doc(firestore, "dashbords_data", id);

  const unsubscribe = onSnapshot(
    chartRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    },
    (error) => {
      console.error("Snapshot error:", error);
    }
  );

  return unsubscribe; // Call this to stop listening
};
