import {
  Add,
  Analytics,
  List,
  Policy,
  Settings,
  Upload,
} from "@mui/icons-material";
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
                  pathname === "/account/register/purchase"
                    ? "success"
                    : "inherit"
                }
                startIcon={<Upload />}
                size="small"
                fullWidth
                component={Link}
                to="/account/register/purchase"
              >
                ITC
              </Button>
              <Button
                sx={{ justifyContent: "flex-start" }}
                color={
                  pathname === "/account/register/purchase/list"
                    ? "success"
                    : "inherit"
                }
                startIcon={<List />}
                size="small"
                fullWidth
                component={Link}
                to="/account/register/purchase/list"
              >
                ITC List
              </Button>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Purchase;
