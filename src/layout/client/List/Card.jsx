import React from "react";
import { Typography, Avatar, Grid2, Paper, Divider } from "@mui/material";
import { Stack, styled } from "@mui/system";

const ClientDetailsCard = ({ client }) => {
  const {
    fname,
    firmName,
    email,
    primaryNumber,
    lname,
    communication,
    avatarUrl,
    clientType,
  } = client;

  return (
    <Paper elevation={4} variant="outlined" sx={{ width: "100%" }}>
      <Grid2 container spacing={2} p={1}>
        <Grid2 size={{ xs: 12, sm: 4, md: 2.5 }} sx={{ cursor: "default" }}>
          <Stack
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Avatar
              src={avatarUrl || "/eniveshfavicon.png"}
              alt={fname || firmName}
            />
            <Typography
              variant="subtitle2"
              textTransform={"capitalize"}
              color="info"
              sx={{ cursor: "pointer" }}
            >
              {firmName || `${fname} ${lname}`}
            </Typography>
          </Stack>
        </Grid2>
        <Divider flexItem orientation="vertical" />
        <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
          {" "}
          <Stack
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography variant="subtitle2" sx={{ cursor: "pointer" }}>
              {email?.slice(0, 15) + "..."}
            </Typography>
          </Stack>
        </Grid2>{" "}
        <Divider flexItem orientation="vertical" />
        <Grid2 size={{ xs: 12, sm: 4, md: 1.5 }}>
          {" "}
          <Stack
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography variant="subtitle2" sx={{ cursor: "pointer" }}>
              {primaryNumber}
            </Typography>
          </Stack>
        </Grid2>{" "}
        <Divider flexItem orientation="vertical" />
        <Grid2 size={{ xs: 12, sm: 8, md: 2.5 }}>
          <Stack
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography variant="subtitle2" sx={{ cursor: "pointer" }}>
              {communication?.permanentAddress?.slice(0, 20) + "..."}
            </Typography>
          </Stack>
        </Grid2>{" "}
        <Divider flexItem orientation="vertical" />
        <Grid2 size={{ xs: 12, sm: 2, md: 1.5 }}>
          <Stack
            flexDirection={"row"}
            alignContent={"center"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography
              textTransform={"capitalize"}
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
            >
              {clientType?.split("-")?.join(" ")}
            </Typography>
          </Stack>
        </Grid2>{" "}
      </Grid2>
    </Paper>
  );
};

export default ClientDetailsCard;
