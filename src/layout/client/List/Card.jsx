import React from "react";
import { Typography, Avatar, Grid2, Paper, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { getSmartAgoString } from "../../../firebase/utils/getFirebaseDate.js";

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
    status,
  } = client;

  return (
    <Paper
      elevation={4}
      variant="outlined"
      sx={{ width: "100%", position: "relative" }}
    >
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
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              {clientType === "group"
                ? communication?.officeAddress?.slice(0, 30) + "..."
                : communication?.permanentAddress
                ? communication?.permanentAddress?.slice(0, 20) + "..."
                : "Not Set"}
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
      <Typography
        position={"absolute"}
        fontSize={8}
        px={0.5}
        borderRadius={2}
        fontWeight={600}
        color={status === "updated" ? "info.dark" : "success.dark"}
        top={1}
        right={1}
        textTransform={"uppercase"}
      >
        {getSmartAgoString(client?.updatedAt)} {status}
      </Typography>
    </Paper>
  );
};

export default ClientDetailsCard;
