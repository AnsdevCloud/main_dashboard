import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import TransparentBox from "../../options/TransparentBox";
import { HiDotsVertical } from "react-icons/hi";
import HeadlineTag from "../../options/HeadlineTag";
import DoughnutChart from "../../charts/Doughnut";
import {
  ToatalLeadData,
  ToatalLeadOption,
  ToatalPolicyData,
  ToatalPolicyOption,
} from "../../../json/chart/doughnut";
import BarChart from "../../charts/BarChart";
import ButtonWithNewTab from "../../options/ButtonWithNewTab";
import { Add, List } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
const filterOptions = [
  { value: "all", label: "All" },
  { value: "quarterly", label: "Quarterly" },
  { value: "half-yearly", label: "Half-Yearly" },
  { value: "full-year", label: "Full Year" },
  { value: "jan", label: "January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" },
];
const LifeInsurance = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Grid2 container spacing={2} p={{ xs: 0.2, sm: 1, md: 2 }}>
        <Grid2 size={{ xs: 12, sm: 12, md: 10 }}>
          <Grid2
            container
            spacing={2}
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.shadows[0],
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Grid2 size={{ xs: 12 }}>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                flexWrap={"wrap"}
                gap={2}
                justifyItems={"center"}
              >
                <HeadlineTag title={"Life Insurance"} />
                <Box width={{ xs: "100%", sm: "40%", md: 200 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Filter
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      label="Filter"
                      //   onChange={handleChange}
                    >
                      {filterOptions?.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
                          {item?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 8 }}>
              <Grid2 container spacing={1}>
                <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                  <DoughnutChart
                    data={ToatalPolicyData}
                    options={ToatalPolicyOption}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                  <DoughnutChart
                    data={ToatalLeadData}
                    options={ToatalLeadOption}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <BarChart />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, md: 6 }}>
                  <TransparentBox
                    value={4}
                    height={100}
                    labelText={"New Comment "}
                    rgbColor="rgb(60, 200, 0)"
                    labelPadding={2}
                    labelColor={"grey"}
                    caption={"Client"}
                  />
                  <TransparentBox
                    value={12}
                    rgbColor="rgb(0, 117, 252)"
                    caption={"Total Comments"}
                    height={100}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, md: 6 }}>
                  <TransparentBox
                    value={18}
                    height={100}
                    labelText={"Plans"}
                    // rgbColor="rgb(60, 200, 0)"
                    labelPadding={2}
                    labelColor={"grey"}
                    caption={"Total"}
                  />
                  <TransparentBox
                    value={23}
                    labelText={"Client "}
                    labelColor={"grey"}
                    labelPadding={2}
                    rgbColor="rgb(0, 117, 252)"
                    caption={"Total"}
                    height={100}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
              <Paper elevation={0}>
                <Grid2 container spacing={1} wrap="wrap-reverse">
                  <Grid2 size={{ xs: 12 }}>
                    <TransparentBox
                      labelText={"Policy Type"}
                      labelPadding={2}
                      labelColor={"grey"}
                      rgbColor="rgb(212, 204, 204)"
                    >
                      <Box my={5}>
                        {[
                          "Ulip",
                          "Whole Life",
                          "Term Plan",
                          "Treditional",
                        ]?.map((item, index) => {
                          return (
                            <Paper
                              key={index}
                              variant="outlined"
                              sx={{ p: 1, bgcolor: "transparent", my: 0.5 }}
                            >
                              <Stack
                                flexDirection={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                gap={2}
                              >
                                <Avatar sx={{ width: 20, height: 20 }} />
                                <Typography variant="body2" component={"h1"}>
                                  {item}
                                </Typography>
                              </Stack>
                            </Paper>
                          );
                        })}
                      </Box>
                    </TransparentBox>
                  </Grid2>
                </Grid2>
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 2, md: 2 }}>
          <Paper elevation={0} sx={{ p: 1, position: "sticky", top: 0 }}>
            <Typography
              variant="caption"
              component={"h1"}
              color="grey"
              sx={{ pointerEvents: "none" }}
              textAlign={"center"}
            >
              Actions Controls
            </Typography>
            <Stack gap={0.2} color={"grey"} my={1}>
              <ButtonWithNewTab
                icon={<List />}
                name={"Overveiws"}
                label={"Overveiws"}
                link={"/crm/life-insurance/policy"}
                pathname={pathname}
              />
              <ButtonWithNewTab
                icon={<Add />}
                name={"Add Policy"}
                label={"Add Policy"}
                link={"/crm/life-insurance/policy-register"}
                pathname={pathname}
              />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default LifeInsurance;
