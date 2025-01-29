// File: src/components/BarChart.js

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Paper, Typography } from "@mui/material";
import zoomPlugin from "chartjs-plugin-zoom";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ...registerables,
  zoomPlugin
);

const LineChart = ({
  data,
  options,
  xGrid,
  yGrid,
  xTitle,
  yTitle,
  responsive,
  zoom,
}) => {
  // Data for the chart
  if (!data) {
    return (
      <Typography variant="caption" component={"p"}>
        No Data
      </Typography>
    );
  }
  // Options for the chart
  const options1 = {
    responsive: responsive || true,
    maintainAspectRatio: false,
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
      title: {
        display: true,
        text: "Sourcing Monthly",
        color: "grey",
        font: {
          size: 12, // Font size for the main title
        },
      },
      zoom: {
        pan: {
          enabled: zoom ? true : false, // Enable panning
          mode: "y", // Allow panning in the x-axis only
        },
        zoom: {
          pinch: {
            enabled: zoom ? true : false, // Enable zooming by pinching
          },
          wheel: {
            enabled: zoom ? true : false, // Enable zooming using mouse wheel
          },
          mode: "y", // Zoom on the x-axis
        },
      },
    },
    scales: {
      x: {
        title: {
          display: xTitle ? true : false,
          text: xTitle,
        },
        ticks: {
          callback: function (value, index) {
            // Show year only for the first month of each year
            const label = data.labels[index];
            if (label.includes("")) {
              return label.split(" ")[1]; // Return only the year (e.g., "2022")
            }
            return label.split(" ")[0]; // Return the month (e.g., "Jan")
          },
        },
        grid: {
          display: xGrid || false, // Remove grid lines for x-axis
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: yTitle ? true : false,
          text: yTitle,
        },
        grid: {
          display: yGrid || false, // Remove grid lines for y-axis
        },
      },
    },
  };

  return (
    <Paper
      sx={{
        width: "100%",
        margin: "auto",
        p: 1,
        height: "100%",
        minHeight: 300,
      }}
      elevation={0}
    >
      <Line data={data} options={options || options1} />
    </Paper>
  );
};

export default LineChart;
