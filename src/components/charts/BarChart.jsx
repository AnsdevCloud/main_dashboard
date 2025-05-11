import React, { useState, useMemo, useEffect } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Paper,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
  title,
  xtitle,
  ytitle,
  financial = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const allLabels = data?.labels || [];
  const [yearIndex, setYearIndex] = useState(null);

  useEffect(() => {
    if (financial && allLabels.length > 0 && yearIndex === null) {
      setYearIndex(allLabels.length - 1);
    }
  }, [financial, allLabels, yearIndex]);

  const selectedData = useMemo(() => {
    if (!data || !data.labels || !data.datasets) return null;

    // 👉 If financial is false, return full data
    if (!financial) return data;

    // 👉 If financial is true but yearIndex not set, don't return anything yet
    if (yearIndex === null) return null;

    // 👉 Return single year slice
    return {
      labels: [data.labels[yearIndex]],
      datasets: data.datasets.map((ds) => ({
        ...ds,
        data: [ds.data[yearIndex]],
      })),
    };
  }, [data, yearIndex, financial]);

  const handlePrev = () => setYearIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setYearIndex((prev) => Math.min(prev + 1, allLabels.length - 1));

  const defaultOptions = {
    responsive,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 10 },
        },
      },
      title: {
        display: !!title,
        text: title || "Bar Chart",
        color: "#333",
        font: { size: 14 },
        padding: { top: 10, bottom: 10 },
      },
      zoom: {
        pan: { enabled: zoom, mode: "x" },
        zoom: {
          pinch: { enabled: zoom },
          wheel: { enabled: zoom },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        title: { display: !!xtitle, text: xtitle || "X-Axis" },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: !!ytitle, text: ytitle || "Y-Axis" },
        grid: { color: "#e0e0e0" },
      },
    },
  };

  if (financial && yearIndex === null)
    return <Typography>Loading chart...</Typography>;

  return (
    <Paper
      sx={{
        width: "100%",
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      {financial && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={1.5}
          gap={1}
        >
          <Stack direction="row" spacing={1}>
            <Button
              onClick={handlePrev}
              disabled={yearIndex === 0}
              variant="outlined"
              size="small"
            >
              ⬅ Prev
            </Button>
            <Button
              onClick={handleNext}
              disabled={yearIndex === allLabels.length - 1}
              variant="outlined"
              size="small"
            >
              Next ➡
            </Button>
          </Stack>
          <Typography
            variant="subtitle2"
            color="primary"
            fontWeight={600}
            fontSize={{ xs: 13, sm: 15 }}
          >
            {allLabels[yearIndex]}
          </Typography>
        </Stack>
      )}

      {selectedData ? (
        <div
          style={{
            width: "100%",
            height: isMobile ? 220 : 320,
          }}
        >
          <Bar data={selectedData} options={options || defaultOptions} />
        </div>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      )}
    </Paper>
  );
};

export default BarChart;
