import React, { useEffect, useState } from "react";
import BarChart from "../../charts/BarChart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HeadlineTag from "../../options/HeadlineTag";
import TransparentBox from "../../options/TransparentBox";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

const fetchData = async (startDate, endDate, company, owncompany) => {
  const response = await fetch(
    `https://db.enivesh.com/service/chart-data/company?startDate=${startDate}&endDate=${endDate}&slug=${company}&owncompany=${owncompany}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
      },
    }
  );

  const chartData = await response.json();

  return chartData;
};
const CompanySalesOverviews = () => {
  const mainDate = JSON.parse(localStorage.getItem("fiterDate"));
  const own = JSON.parse(localStorage.getItem("own"));

  const { company } = useParams();

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [chartData, setChartData] = useState([]);
  const [comInvoices, setComInvoices] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [], // Months grouped by years
    datasets: [
      {
        label: "Enivesh",
        data: [], // Replace with your Enivesh data
        backgroundColor: "rgba(255, 118, 69, 0.945)",
        borderColor: "rgb(255, 127, 63)",
        borderWidth: 1,
      },
    ],
  });

  const [filterDate, setFilterDate] = useState({
    startDate: mainDate?.startDate,
    endDate: mainDate?.endDate,
  });

  const [isFilterAply, setisFilterAply] = useState(false);
  const [callData, setcallData] = useState(false);
  // Data for the chart

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        display: false,
        labels: {
          usePointStyle: true, // Use dots instead of rectangles
          pointStyle: "circle",
          font: {
            size: 8,
          },
        },
      },
      //   title: { display: true, text: `${"companyName"} - Monthly Sales` },
    },
    scales: {
      x: {
        display: false, // Hides the X-axis
      },
      y: {
        display: false, // Hides the Y-axis
      },
    },
  };
  const handleAply = () => {
    localStorage.setItem("singlefiterDate", JSON.stringify(filterDate));
    setisFilterAply(!isFilterAply);
    setcallData(true);
  };
  useEffect(() => {
    const fetchCompany = async () => {
      const ComInv = await fetchCompanyData(
        filterDate?.startDate,
        filterDate?.endDate,
        company,

        own
      );
      setComInvoices(ComInv?.data || []);
    };
    const fetch = async () => {
      const chartData = await fetchData(
        filterDate?.startDate,
        filterDate?.endDate,
        company,
        own
      );

      fetchCompany();

      const monthlyTotals = {};

      // Calculate total amounts for each month
      chartData?.data?.forEach(({ date, amount }) => {
        const [year, month, day] = date.split("-");
        const monthName = new Date(`${year}-${month}-01`).toLocaleString(
          "default",
          { month: "long", year: "numeric" } // Month and Year for clarity
        );

        if (!monthlyTotals[monthName]) monthlyTotals[monthName] = 0;
        monthlyTotals[monthName] += amount;
      });
      // Prepare labels and datasets
      const labels = Object.keys(monthlyTotals);

      const data = labels.map((month) => monthlyTotals[month]);

      setGraphData({
        datasets: [
          {
            label: "Sales",
            data: data, // Replace with your Enivesh data
            backgroundColor: "rgba(255, 118, 69, 0.945)",
            borderColor: "rgb(255, 127, 63)",
            borderWidth: 1,
          },
        ],
        labels: labels,
      });

      const parseTooltips = {
        invoices: chartData?.data?.map((value) => value.invoiceNumber),
        company: chartData?.data[0]?.company,
        total: chartData?.data?.reduce(
          (accumulator, item) => accumulator + item.amount,
          0
        ),
        amount: chartData?.data?.map((value) => value.amount),
      };

      setChartData(parseTooltips);
    };
    fetch();
  }, [isFilterAply]);
  return (
    <div>
      <Paper sx={{ p: 2, my: 1 }} elevation={0}>
        <HeadlineTag textTransform={"uppercase"}>
          {company?.toUpperCase()} Sales
        </HeadlineTag>

        <TransparentBox
          rgbColor="rgb(65, 140, 3)"
          value={` ${parseInt(chartData?.total)?.toLocaleString()}`}
          caption={"Total Sales"}
        ></TransparentBox>
        <Stack
          flexDirection={"row"}
          gap={2}
          width={"100%"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            my={1}
            width={{ xs: "100%", md: "auto" }}
          >
            <TextField
              size="small"
              type="date"
              id=""
              label=""
              helperText="Start Date"
              fullWidth
              value={filterDate?.startDate}
              onChange={(e) =>
                setFilterDate({ ...filterDate, startDate: e.target.value })
              }
            />
            <TextField
              size="small"
              helperText="End Date"
              type="date"
              fullWidth
              value={filterDate?.endDate}
              onChange={(e) =>
                setFilterDate({ ...filterDate, endDate: e.target.value })
              }
            />
            <Button
              onClick={() => handleAply()}
              size="small"
              variant="outlined"
            >
              Apply
            </Button>
          </Stack>
        </Stack>
        {isMobile ? (
          <BarChart
            data={data1}
            options={options}
            height={150}
            minHeight={"auto"}
          />
        ) : (
          <BarChart data={graphData} />
        )}
      </Paper>
      <Paper sx={{ p: 2, my: 1 }} elevation={0}>
        <HeadlineTag my={2}>Months ( {comInvoices?.length} )</HeadlineTag>
        {comInvoices?.map((item, i) => (
          <Card variant="outlined">
            <CardContent>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexWrap={"wrap"}
                gap={1}
                width={"100%"}
              >
                <Typography variant="subtitle1" fontWeight={600} color="grey">
                  {new Date(item?.date).toLocaleString(
                    "default",
                    { month: "long", year: "numeric" } // Month and Year for clarity
                  )}
                </Typography>

                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={4}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="success"
                  >
                    &#8377; {parseInt(item?.amount)?.toLocaleString()}
                  </Typography>

                  {/* <Button color="inherit"> Export</Button> */}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </div>
  );
};

export default CompanySalesOverviews;

const fetchCompanyData = async (startDate, endDate, slug, owncompany) => {
  const response = await fetch(
    `https://db.enivesh.com/service/chart-data/company?startDate=${
      startDate || "2024-09-01"
    }&endDate=${endDate || "2024-11-1"}&slug=${slug}&owncompany=${owncompany}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
      },
    }
  );

  const chartData = await response.json();

  return chartData;
};
