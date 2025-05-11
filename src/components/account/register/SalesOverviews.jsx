import React, { useEffect, useState } from "react";
import BarChart from "../../charts/BarChart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Tooltip,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import HeadlineTag from "../../options/HeadlineTag";
import TransparentBox from "../../options/TransparentBox";

import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
const fetchCompaniesData = async (startDate, endDate, owncompany) => {
  const response = await fetch(
    `https://db.enivesh.com/service/chart-data/company?startDate=${startDate}&endDate=${endDate}&owncompany=${owncompany}`,
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
const SalesOverviews = () => {
  const [selsectOwnCompany, setSelectOwnCompany] =
    useState("enivesh-insurance");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [chartData, setChartData] = useState(null);
  const [comListData, setComListData] = useState([]);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [isFilterAply, setisFilterAply] = useState(false);
  const [callData, setcallData] = useState(false);
  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
  });
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
    localStorage.setItem("fiterDate", JSON.stringify(filterDate));
    setisFilterAply(!isFilterAply);
    setcallData(true);
  };

  useEffect(() => {
    // Example Date Range
    const ftd = JSON.parse(localStorage.getItem("fiterDate"));
    const own = JSON.parse(localStorage.getItem("own"));
    setSelectOwnCompany(own);
    const StoredData = JSON.parse(sessionStorage.getItem("Chart-Store"));
    setFilterDate({
      startDate: ftd?.startDate || "",
      endDate: ftd?.endDate || "",
    });
    const fetch = async () => {
      if (callData) {
        const chartData = await fetchData(
          ftd?.startDate || "2024-01-01",
          ftd?.endDate || "2024-12-30",
          selsectOwnCompany
        );
        const companies = await fetchCompaniesData(
          ftd?.startDate || "2024-01-01",
          ftd?.endDate || "2024-12-30",
          selsectOwnCompany
        );

        sessionStorage.setItem(
          "Chart-Store",
          JSON.stringify({
            chartData,
            companies,
          })
        );

        if (companies?.data || StoredData?.companies?.data) {
          let filterList = aggregateSales(
            companies?.data || StoredData?.companies?.data
          );
          setComListData(filterList || []);
        }

        setChartData(chartData || StoredData?.chartData);
        setTotalSalesAmount(
          chartData?.datasets[0]?.data.reduce(
            (accumulator, item) => accumulator + item,
            0
          ) ||
            StoredData?.chartData?.datasets[0]?.data.reduce(
              (accumulator, item) => accumulator + item,
              0
            )
        );

        setcallData(false);
      } else {
        if (StoredData?.companies?.data) {
          let filterList = aggregateSales(StoredData?.companies?.data);

          setComListData(filterList || []);
        }

        setChartData(StoredData?.chartData);
        setTotalSalesAmount(
          StoredData?.chartData?.datasets[0]?.data.reduce(
            (accumulator, item) => accumulator + item,
            0
          )
        );
      }
    };

    fetch();
  }, [isFilterAply]);

  const handleSelectCompany = (e) => {
    setSelectOwnCompany(e);
    localStorage.setItem("own", JSON.stringify(e));
  };

  return (
    <div>
      <Paper sx={{ p: 2, my: 1 }} elevation={0}>
        <HeadlineTag>
          <Stack
            justifyContent={"space-between"}
            width={"100%"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            Total Sales
            <FormControl
              sx={{ maxWidth: 200, height: 20 }}
              fullWidth
              size="small"
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selsectOwnCompany}
                sx={{ height: 20, fontSize: 10 }}
                onChange={(e) => handleSelectCompany(e.target.value)}
                size="small"
              >
                <MenuItem sx={{ fontSize: 10 }} value={"enivesh-finance"}>
                  Enivesh Finance
                </MenuItem>
                <MenuItem sx={{ fontSize: 10 }} value={"enivesh-insurance"}>
                  Enivesh Insurance
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </HeadlineTag>
        <Stack
          flexDirection={"row"}
          gap={2}
          width={"100%"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <TransparentBox
            width={{ xs: "100%", md: "50%" }}
            rgbColor="rgb(65, 140, 3)"
            value={totalSalesAmount || 0}
            caption={"Total Sales"}
          ></TransparentBox>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
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
              {totalSalesAmount ? " Apply" : "Refresh"}
            </Button>
          </Stack>
        </Stack>
        {isMobile ? (
          <BarChart
            data={chartData}
            options={options}
            height={150}
            minHeight={"auto"}
          />
        ) : (
          <BarChart data={chartData} />
        )}
      </Paper>
      <Paper sx={{ p: 2, my: 1 }} elevation={0}>
        <HeadlineTag my={2}>Companies ( {comListData?.length} )</HeadlineTag>
        {comListData
          ?.sort((a, b) => b?.totalAmount - a?.totalAmount)
          ?.map((item, index) => {
            return (
              <ListCard
                slug={item?.slug}
                data={item}
                key={index}
                startDate={filterDate?.startDate}
                endDate={filterDate?.endDate}
              />
            );
          })}
        {/* <Link to={"sbi"} style={{ textDecoration: "none" }}>
          <Card variant="outlined" sx={{ my: 1 }}>
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
                  Bajaj
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} color="grey">
                  Jan - Oct
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="success"
                >
                  &#8377; 34,323
                </Typography>

                <Box width={{ xs: "100%", md: "10%" }}>
                  <BarChart
                    data={chartData}
                    options={options}
                    minHeight={"auto"}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Link> */}
      </Paper>
    </div>
  );
};

export default SalesOverviews;

const fetchData = async (startDate, endDate, owncompany) => {
  const response = await fetch(
    `https://db.enivesh.com/service/chart-data/home?startDate=${startDate}&endDate=${endDate}&owncompany=${owncompany}`,
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

const ListCard = ({ slug, startDate, endDate, data }) => {
  return (
    <div>
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
            <Link
              to={`/account/register/sale-overview/${slug}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="subtitle1"
                component={"h1"}
                fontWeight={600}
                color="grey"
              >
                {data?.company}
              </Typography>
            </Link>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={{ xs: "100%", md: "auto" }}
              gap={4}
            >
              <Link
                to={`/account/register/sale-overview/${slug}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component={"h1"}
                  color="success"
                >
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(data?.totalAmount || 0)}
                </Typography>
              </Link>
              <Tooltip
                title={
                  <TransparentBox rgbColor="rgb(255, 255, 255)">
                    <Typography component={"p"} variant="caption">
                      INV Total :{" "}
                      <Typography variant="caption" color="black">
                        {data?.invoices?.length}
                      </Typography>
                    </Typography>
                  </TransparentBox>
                }
              >
                <Link
                  to={"/account/register/views-doc"}
                  style={{ textDecoration: "none" }}
                  state={data}
                >
                  {" "}
                  <Button color="info">Views Doc</Button>
                </Link>
              </Tooltip>
              <Button color="inherit" disabled>
                {" "}
                Export
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

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

// Function to aggregate data
const aggregateSales = (data) => {
  const salesMap = new Map();

  data.forEach(
    ({ company, amount, invoicenumber, slug, description, date }) => {
      const lowerCaseCompany = company?.toLowerCase(); // Normalize company names to lowercase

      if (!salesMap.has(lowerCaseCompany)) {
        salesMap.set(lowerCaseCompany, {
          company: company,
          totalAmount: 0,
          invoices: [],
          slug: slug,
        });
      }

      const companyData = salesMap.get(lowerCaseCompany);

      // Add amount to total and include the invoice number
      companyData.totalAmount += amount;
      companyData.invoices.push({
        invoicenumber,
        description,
        date,
      });
    }
  );

  // Map values to an array and format the company names
  return Array.from(salesMap.values()).map(
    ({ company, totalAmount, invoices, slug }) => ({
      company: company
        ?.split(" ")
        ?.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitalize words
        .join(" "),
      totalAmount,
      invoices,
      slug,
    })
  );
};
