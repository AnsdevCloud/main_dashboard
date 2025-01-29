import { Box, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TransparentBox = ({
  value,
  caption,
  fontSize = 30,
  rgbColor = "rgb(255, 77, 0)",
  bgTransparency = 0.2,
  width,
  height,
  fullHeight = false,
  fullWidth = false,
  tooltipText = null,
  tooltipPlacement = "auto",
  labelColor,
  labelText,
  children,
  onNavigate,
  labelPadding,
  overflow,
  fontWeight,
  rupeeLabal = true,
  textTransform,
  onClick,
}) => {
  // Function to calculate 20% of typography color
  const getBoxBgColor = (rgbColor) => {
    // Remove 'rgb(' and ')' then split into R, G, B
    const [r, g, b] = rgbColor.replace("rgb(", "").replace(")", "").split(",");
    return `rgba(${r.trim()}, ${g.trim()}, ${b.trim()}, ${bgTransparency})`; // Add alpha (20%)
  };

  return (
    <Tooltip
      title={tooltipText ? tooltipText : ""}
      placement={tooltipPlacement === "" ? "auto" : tooltipPlacement}
    >
      <Box
        component={onNavigate ? Link : "div"}
        padding={1}
        sx={{
          textDecoration: "none",
          pointerEvents: onNavigate ? "auto" : "none",
        }}
        to={onNavigate || ""}
        position={"relative"}
        width={fullWidth ? "100%" : width ? width : "auto"}
        height={fullHeight ? "100%" : height ? height : "auto"}
        minWidth={100}
        bgcolor={getBoxBgColor(rgbColor)}
        borderRadius={1}
        display={children ? "block" : "flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignContent={"center"}
        overflow={overflow || ""}
      >
        {children ? (
          children
        ) : (
          <>
            <Typography
              component={"h1"}
              variant="body2"
              color={rgbColor}
              fontSize={fontSize}
              fontWeight={fontWeight || 500}
              textAlign={"center"}
              textTransform={textTransform}
            >
              {rupeeLabal ? <>&#8377; {value?.toLocaleString()}</> : value}
            </Typography>
            <Typography
              component={"p"}
              variant="caption"
              color="grey"
              bgcolor={"transparent"}
              textAlign={"center"}
              fontWeight={500}
            >
              {caption}
            </Typography>
          </>
        )}
        {labelText && (
          <Box
            fontSize={12}
            fontWeight={500}
            position={"absolute"}
            top={"-5px"}
            left={0}
            p={labelPadding || 0.5}
            // bgcolor={"rgba(24, 87, 2, 0.315)"}
            borderRadius={1}
            color={labelColor || "#045f04"}
          >
            {labelText || "Rs "}
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};

export default TransparentBox;
