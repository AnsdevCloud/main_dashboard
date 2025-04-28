import { Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import HeadlineTag from "../../options/HeadlineTag";
import DoughnutChart from "../../charts/Doughnut";

import BarChart from "../../charts/BarChart";
import ButtonWithNewTab from "../../options/ButtonWithNewTab";
import { Add, List } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import LineChart from "../../charts/LineChart";

const HealthInsurance = () => {
  const { pathname } = useLocation();
  const [linechartData, setLineChart] = useState(null);
  const [planDougth, setplanDougth] = useState(null);
  const [barChart, setbarChart] = useState(null);
  const [policyCountByStatus, setPolicyCountByStatus] = useState(null);
  const [policyCountByClientType, setPolicyCountByClientType] = useState(null);
  useEffect(() => {
    const unsubscribe = listenToChart((data) => {
      setLineChart(data);
    }, "company-wise-line-chart-3");
    const unsubscribe2 = listenToChart((data) => {
      setplanDougth(data);
    }, "plan-wise-doughnut-chart-1");
    const unsubscribe3 = listenToChart((data) => {
      setbarChart(data);
    }, "plan-wise-bar-chart-2");
    const unsubscribe4 = listenToChart((data) => {
      setPolicyCountByStatus(data);
    }, "policy-count-bystatus-doughnut-chart-4");

    const unsubscribe5 = listenToChart((data) => {
      setPolicyCountByClientType(data);
    }, "policy-count-byclient-type-doughnut-chart-5");
    return () => {
      unsubscribe(), unsubscribe2();
      unsubscribe3();
      unsubscribe4();
      unsubscribe5();
    }; // Cleanup on unmount
  }, []);

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
                <HeadlineTag title={"Health Insurance"} />
              </Stack>
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
                    mainTitle={"Company Seles FY"}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <BarChart
                    title={"Plans FY Sales "}
                    xtitle={"Financial Year"}
                    ytitle={"Plan Sales"}
                    data={barChart}
                  />
                </Grid2>
                {/* <Grid2 size={{ xs: 12, sm: 4, md: 6 }}>
                  <TransparentBox
                    value={4}
                    height={100}
                    labelText={"New Comment "}
                    rgbColor="rgb(60, 200, 0)"
                    labelPadding={2}
                    labelColor={"grey"}
                    caption={"Client"}
                  />
                  <TransparentBox
                    value={12}
                    rgbColor="rgb(0, 117, 252)"
                    caption={"Total Comments"}
                    height={100}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, md: 6 }}>
                  <TransparentBox
                    value={18}
                    height={100}
                    labelText={"Plans"}
                    // rgbColor="rgb(60, 200, 0)"
                    labelPadding={2}
                    labelColor={"grey"}
                    caption={"Total"}
                  />
                  <TransparentBox
                    value={23}
                    labelText={"Client "}
                    labelColor={"grey"}
                    labelPadding={2}
                    rgbColor="rgb(0, 117, 252)"
                    caption={"Total"}
                    height={100}
                  />
                </Grid2> */}
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
                label={"H Overveiws"}
                link={"/crm/health-insurance/policy"}
                pathname={pathname}
              />
              <ButtonWithNewTab
                icon={<Add />}
                name={"Add Policy"}
                label={"H Add Policy"}
                link={"/crm/health-insurance/policy-register"}
                pathname={pathname}
              />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default HealthInsurance;

const listenToChart = (callback, id) => {
  const chartRef = doc(
    firestore,
    "dashbords_data",
    "life_insurance_EN-10",
    "charts",
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
