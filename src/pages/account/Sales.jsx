import { Add, Analytics, Policy, Settings, Upload } from "@mui/icons-material";
import {
  Button,
  Grid2,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { BsActivity } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTabs } from "../../stores/TabsContex";
import ButtonWithNewTab from "../../components/options/ButtonWithNewTab";

const Sales = () => {
  const { pathname } = useLocation();
  const { addTab } = useTabs();
  const navigate = useNavigate();
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
              <ButtonWithNewTab
                icon={<Upload />}
                name={"Uploads"}
                label={"Uploads"}
                link={"/account/register/upload-data"}
                pathname={pathname}
                navigation={true}
              />
              <ButtonWithNewTab
                icon={<Add />}
                name={"Add new Company"}
                label={"Add new Company"}
                link={"/account/register/company-list"}
                pathname={pathname}
                navigation={true}
              />

              <ButtonWithNewTab
                icon={<Policy />}
                name={"Sales Overviews"}
                label={"Sales Overviews"}
                link={"/account/register/sale-overview"}
                link2={"/account/register"}
                pathname={pathname}
                navigation={true}
              />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Sales;
