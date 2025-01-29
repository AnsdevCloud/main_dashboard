import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import HeadlineTag from "../options/HeadlineTag";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";

const ReportAnalytics = () => {
  // Dummy Data
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [5000, 8000, 6000, 10000, 9000, 12000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const barChartData = {
    labels: [
      "Ulip Plan",
      "Term Plan",
      "Saving Plan",
      "Health",
      "Group",
      "Other",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [50, 75, 60, 90, 100, 45, 32],
        backgroundColor: [
          "#FF5C00",
          "#36A2EB",
          "#026c02",
          "#20aeae",
          "#2048ae",
          ,
          "#8a46c1",
        ],
      },
    ],
  };

  const pieChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}`;
        },
        color: "#000",
        font: {
          size: 14,
        },
        align: "end",
        anchor: "end",
      },
    },
  };

  return (
    <Paper elevation={0} style={{ padding: "20px" }}>
      <div style={{ marginBottom: "40px" }}>
        <HeadlineTag>Monthly Sales</HeadlineTag>
        <LineChart data={lineChartData} xGrid={true} yGrid={true} />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <HeadlineTag>Product Performance</HeadlineTag>
        <BarChart data={barChartData} />
      </div>

      <Box height={300}>
        <HeadlineTag>Traffic Source</HeadlineTag>
        <PieChart data={pieChartData} options={options} />
      </Box>
    </Paper>
  );
};

export default ReportAnalytics;
