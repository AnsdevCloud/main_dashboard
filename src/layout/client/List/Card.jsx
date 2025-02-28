import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CardActionArea,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

const PrimaryColor = "#ff5c00";

// Styled Card with a subtle shadow, rounded corners, and a primary-colored border.
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  margin: "auto",
  borderRadius: 16,
  //   boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
  border: `1px solid ${PrimaryColor}`,
  overflow: "visible", // to allow the avatar to overlap if desired
}));

// Styled Avatar with a primary-colored border.
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: `3px solid ${PrimaryColor}`,
  marginTop: -50, // Pull the avatar upward for a cool overlapping effect
  backgroundColor: "#fff",
}));

const ClientDetailsCard = ({ client }) => {
  const {
    fname,
    email,
    primaryNumber,
    permanentAddress,
    avatarUrl,
    customerType,
  } = client;

  return (
    <StyledCard elevation={0}>
      <CardActionArea>
        <CardContent sx={{ pt: 6, pb: 4 }}>
          <Box py={1} display="flex" flexDirection="column" alignItems="center">
            <StyledAvatar
              sx={{
                borderColor:
                  customerType === "dimond"
                    ? "#E5E4E2"
                    : customerType === "silver"
                    ? "#C0C0C0"
                    : customerType === "gold"
                    ? "#FFD700"
                    : PrimaryColor,
              }}
              alt={fname}
              src={avatarUrl}
            />
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ mt: 1, color: PrimaryColor, fontWeight: "bold" }}
            >
              {fname}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, mb: 1 }}
              color="text.secondary"
            >
              {email}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {primaryNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {permanentAddress}
            </Typography>
          </Box>
          <Chip
            sx={{
              position: "absolute",
              top: 1,
              left: 2,
              textTransform: "capitalize",
              fontSize: 10,
              color:
                customerType === "dimond"
                  ? "#B9F2FF"
                  : customerType === "silver"
                  ? "#C0C0C0"
                  : customerType === "gold"
                  ? "#FFD700"
                  : PrimaryColor,
            }}
            variant="outlined"
            size="small"
            label={customerType}
          />
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ClientDetailsCard;
