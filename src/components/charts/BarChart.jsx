// File: src/components/BarChart.js

import React from "react";
import { Bar } from "react-chartjs-2";
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
import { Paper } from "@mui/material";
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

const BarChart = ({
  data,
  options,
  zoom = false,
  responsive = true,
  minHeight = 300,
  height = "100%",
  title,
  xtitle,
  ytitle,
}) => {
  // Default Options
  const defaultOptions = {
    responsive,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 8,
          },
          onClick: (e, legendItem, legend) => {
            const index = legendItem.datasetIndex;
            const chart = legend.chart;
            const meta = chart.getDatasetMeta(index);
            meta.hidden = !meta.hidden;
            chart.update();
          },
        },
      },
      title: {
        display: title ? true : false,
        text: title || "Bar Chart",
        color: "grey",
        font: {
          size: 12,
        },
      },
      zoom: {
        pan: {
          enabled: zoom,
          mode: "x",
        },
        zoom: {
          pinch: {
            enabled: zoom,
          },
          wheel: {
            enabled: zoom,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: xtitle ? true : false,
          text: xtitle || "Categories",
        },
        ticks: {},
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: ytitle ? true : false,
          text: ytitle || "Sales",
        },
        grid: {
          display: true,
          color: "#e0e0e0",
        },
      },
    },
  };

  // Fallback for missing or invalid data
  const fallbackData = {
    labels: ["No Data"],
    datasets: [
      {
        label: "No Data Available",
        data: [0],
        backgroundColor: "#cccccc",
      },
    ],
  };

  return (
    <Paper
      sx={{
        width: "100%",
        margin: "auto",
        p: 1,
        height,
        minHeight,
      }}
      elevation={0}
    >
      <Bar data={data || fallbackData} options={options || defaultOptions} />
    </Paper>
  );
};

export default BarChart;
