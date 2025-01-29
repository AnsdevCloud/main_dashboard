import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import HeadlineTag from "../options/HeadlineTag";
import TransparentBox from "../options/TransparentBox";
import { Box, Grid2 } from "@mui/material";
import BarChart from "../charts/BarChart";
import DoughnutChart from "../charts/Doughnut";
import LineChart from "../charts/LineChart";
import { useLocation } from "react-router-dom";
const renewalDataByMonth = {
  months: ["December 2024", "January 2025", "February 2025"], // Months
  dates: ["20-Dec", "25-Dec", "05-Jan", "15-Feb", "12-Jan"], // Renewal Dates
  counts: [3, 2, 10, 7, 8], // Policies due on respective dates
};
const PolicyInvestmentOverview = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // Dummy Data
  const policyData = {
    totalPolicies: 220,
    activePolicies: 120,
    premiumsPaid: 500000,
    premiumsPending: 100000,
    investmentDetails: {
      totalInvestment: 10000000,
      annualReturns: 1200000,
    },
    policyTypes: {
      Life: 3,
      Health: 2,
      Auto: 1,
    },
  };

  const barChartData = {
    labels: [
      "Total Policies ",
      "Active Policies",
      "Premiums Paid",
      "Premiums Pending",
    ],
    datasets: [
      {
        label: "Policy Overview",
        data: [
          policyData.totalPolicies,
          policyData.activePolicies,
          policyData.premiumsPaid / 1000, // Scale for better view
          policyData.premiumsPending / 1000,
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Life", "Health", "Auto"],
    datasets: [
      {
        data: Object.values(policyData.policyTypes),
        backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56"],
      },
    ],
  };

  //   const renewalAlerts = [
  //     { policyName: "Life Insurance A", renewalDate: "20-Dec-2024" },
  //     { policyName: "Health Insurance B", renewalDate: "25-Dec-2024" },
  //   ];

  const investmentGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Investment Growth (₹)",
        data: [100000, 120000, 150000, 180000, 200000, 250000],
        borderColor: "#0a9b05",
        backgroundColor: "rgba(54, 235, 93, 0.2)",
        fill: true,
      },
    ],
  };

  //   const renewalData = {
  //     labels: ["20-Dec-2024", "25-Dec-2024", "30-Dec-2024"], // Renewal dates
  //     datasets: [
  //       {
  //         label: "Policies for Renewal",
  //         data: [2, 3, 1], // Number of policies expiring on each date
  //         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //       },
  //     ],
  //   };

  const renewalData = {
    labels: renewalDataByMonth.dates, // Renewal dates on Y-axis
    datasets: [
      {
        label: "Renewals by Month",
        data: renewalDataByMonth.counts, // Policies count
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#4d4bc0",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    plugins: {
      legend: {
        position: "bottom", // Position the legend at the bottom
        align: "start", // Align legend to the left
        labels: {
          usePointStyle: true, // Use dots instead of rectangles
          pointStyle: "circle", // Circle shape for dots
          font: {
            size: 8, // Font size for labels
          },
          onClick: (e, legendItem, legend) => {
            const index = legendItem.datasetIndex;
            const chart = legend.chart;
            const meta = chart.getDatasetMeta(index);
            // Toggle dataset visibility
            meta.hidden = !meta.hidden;
            chart.update();
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months", // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: "Renewal Dates", // Y-axis title
        },
      },
    },
  };
  return (
    <>
      <HeadlineTag>Investment Overview</HeadlineTag>

      <Grid2 container spacing={1} my={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <TransparentBox
            caption={"Total Investment"}
            fontSize={34}
            fontWeight={600}
            rgbColor="rgb(76, 175, 80)"
            value={policyData.investmentDetails.totalInvestment.toLocaleString()}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <TransparentBox
            caption={"Annual Returns"}
            fontSize={34}
            fontWeight={600}
            rgbColor="rgb(12, 178, 244)"
            value={policyData.investmentDetails.annualReturns.toLocaleString()}
          />
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Box my={5}>
            <HeadlineTag>Investment Growth</HeadlineTag>
            <LineChart data={investmentGrowthData} yGrid={true} />
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Box my={5}>
            <HeadlineTag>Policy Overview</HeadlineTag>
            <BarChart data={barChartData} />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box my={5} height={300}>
            <HeadlineTag>Policy Types Distribution</HeadlineTag>
            <DoughnutChart data={doughnutChartData} />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box my={5} height={300} width={"100%"}>
            <HeadlineTag>Renewal Alert</HeadlineTag>
            <BarChart data={renewalData} options={options} />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default PolicyInvestmentOverview;
