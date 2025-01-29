import { Add, Analytics, Policy, Settings, Upload } from "@mui/icons-material";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

const Purchase = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Grid2 container spacing={1} p={1}>
        <Grid2 size={{ xs: 12, sm: 10, md: 10 }}>
          <Outlet />
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
              <Button
                sx={{ justifyContent: "flex-start" }}
                color={
                  pathname === "/account/register/purchase/itc"
                    ? "success"
                    : "inherit"
                }
                startIcon={<Upload />}
                size="small"
                fullWidth
                component={Link}
                to="/account/register/purchase/itc"
              >
                ITC
              </Button>
              {/* <Button
                sx={{ justifyContent: "flex-start" }}
                startIcon={<Add />}
                color={
                  pathname === "/account/register/company-list"
                    ? "success"
                    : "inherit"
                }
                size="small"
                fullWidth
                component={Link}
                to="/account/register/company-list"
              >
                Add new Company
              </Button>

              <Button
                sx={{ justifyContent: "flex-start", fontWeight: 400 }}
                startIcon={<Policy />}
                color={
                  pathname === "/account/register/sale-overview"
                    ? "success"
                    : "inherit"
                }
                size="small"
                component={Link}
                to="/account/register/sale-overview"
                fullWidth
              >
                Sales Overviews
              </Button> */}
              {/* <Button
                sx={{ justifyContent: "flex-start" }}
                startIcon={<BsActivity />}
                color="inherit"
                size="small"
                fullWidth
              >
                All Activity
              </Button>
              <Button
                sx={{ justifyContent: "flex-start" }}
                startIcon={<Settings />}
                color="inherit"
                size="small"
                fullWidth
                component={Link}
                to="/cpanel/policy-investment-overview"
              >
                System Settings
              </Button> */}
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Purchase;
