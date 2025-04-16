import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";

const HeadlineTag = ({
  title,
  iconColor,
  my,
  mx,
  m,
  p,
  gap,
  fontWeight,
  variant,
  textTransform,
  titleColor,
  children,
  position,
  size,
  flexWrap,
  iconHide = false,
}) => {
  return (
    <Typography
      variant={variant || "subtitle1"}
      component={"h1"}
      fontSize={size || "auto"}
      flexWrap={flexWrap}
      textTransform={textTransform || "capitalize"}
      sx={{
        pointerEvents: children ? "auto" : "none",
        cursor: children ? "auto" : "default",
      }}
      fontWeight={fontWeight || 600}
      color={titleColor || "textSecondary"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={position || "flex-start"}
      m={m || 0}
      my={my || 0}
      mx={mx || 0}
      p={p || 0}
      gap={gap || 1}
    >
      <Stack
        direction={"row"}
        gap={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        {iconHide ? "" : <HiDotsVertical color={iconColor || "#ff5c00"} />}
        {title}
      </Stack>
      {children || ""}
    </Typography>
  );
};

export default HeadlineTag;
