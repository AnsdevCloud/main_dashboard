import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return <Outlet />;
};

export default ClientLayout;
