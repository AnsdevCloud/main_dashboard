// File: src/components/pie.js

import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";

import { Paper } from "@mui/material";

const PieChart = ({ data, options }) => {
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
    <Paper elevation={0} sx={{ height: "100%", width: "100%" }}>
      <Pie data={data} options={options1} />
    </Paper>
  );
};

export default PieChart;
