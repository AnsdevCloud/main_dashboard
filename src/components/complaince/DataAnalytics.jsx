import React from "react";
import { Box, Typography } from "@mui/material";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import BarChart from "../charts/BarChart";
import HeadlineTag from "../options/HeadlineTag";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DataAnalytics = () => {
  // Sample data for charts
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Fraud Cases",
        data: [10, 20, 15, 30, 25],
        backgroundColor: "#d83600",
      },
    ],
  };

  const lineData = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Compliance Score",
        data: [70, 75, 80, 85, 90],
        borderColor: "#0073e6",
        backgroundColor: "rgba(0, 115, 230, 0.2)",
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Policy Violations", "Fraud Reports", "Audit Issues"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <HeadlineTag variant="subtitle1" gutterBottom>
          Fraud Cases Over Time
        </HeadlineTag>
        <BarChart data={barData} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <HeadlineTag variant="subtitle1" gutterBottom>
          Compliance Score Progress
        </HeadlineTag>
        <LineChart data={lineData} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <HeadlineTag variant="subtitle1" gutterBottom>
          Issue Breakdown
        </HeadlineTag>
        <Box height={300}>
          <PieChart data={pieData} />
        </Box>
      </div>
    </div>
  );
};

export default DataAnalytics;
