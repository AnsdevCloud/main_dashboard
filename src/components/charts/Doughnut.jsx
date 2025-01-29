// File: src/components/DoughnutChart.js

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Paper } from "@mui/material";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, options }) => {
  if (!data) {
    return <p>No Data </p>;
  }
  // Options for the chart
  const options1 = {
    responsive: true,
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
    },
    scales: {},
  };

  return (
    <Paper
      elevation={0}
      sx={{ padding: "10px", width: "100%", height: "100%" }}
    >
      <Doughnut data={data} options={options || options1} />
    </Paper>
  );
};

export default DoughnutChart;
