import { Analytics, Pages, Policy, Settings } from "@mui/icons-material";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { BsActivity } from "react-icons/bs";

import { Link, Outlet, useLocation } from "react-router-dom";

const Poratl = () => {
  const { pathname } = useLocation();

  return (
    <Grid2 container spacing={1} p={1}>
      <Grid2 size={{ xs: 12, md: 10 }}>
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
                pathname === "/portal/pages"
                  ? "success"
                  : pathname === "/portal"
                  ? "success"
                  : "inherit"
              }
              startIcon={<Pages />}
              size="small"
              fullWidth
              component={Link}
              to="/portal/pages"
            >
              Pages
            </Button>
            {/* <Button
              sx={{ justifyContent: "flex-start" }}
              startIcon={<Analytics />}
              color={pathname === "/cpanel" ? "success" : "inherit"}
              size="small"
              fullWidth
              component={Link}
              to="/cpanel"
            >
              Report & Analytics
            </Button> */}
            {/* 
            <Button
              sx={{ justifyContent: "flex-start", fontWeight: 400 }}
              startIcon={<Policy />}
              color={
                pathname === "/cpanel/policy-investment-overview"
                  ? "success"
                  : "inherit"
              }
              size="small"
              component={Link}
              to="/cpanel/policy-investment-overview"
              fullWidth
            >
              Policy Overviews
            </Button>
            <Button
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
  );
};

export default Poratl;
