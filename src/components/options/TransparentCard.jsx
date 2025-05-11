import { Box, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const TransparentCard = ({
  value,
  caption,
  fontSize = 30,
  rgbColor = "rgb(0, 115, 255)",
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
  tooltip,
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
      {onClick ? (
        <Tooltip title={tooltip ? tooltip : ""}>
          <Box
            padding={1}
            component={"div"}
            position={"relative"}
            width={fullWidth ? "100%" : width ? width : "auto"}
            height={fullHeight ? "100%" : height ? height : "auto"}
            minWidth={100}
            bgcolor={getBoxBgColor(rgbColor)}
            borderRadius={1}
            display={children ? "block" : "flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ cursor: "pointer" }}
            flexDirection={"column"}
            alignContent={"center"}
            onClick={() => onClick()}
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
                  {rupeeLabal ? (
                    <>
                      {" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(value || 0)}
                    </>
                  ) : (
                    value
                  )}
                </Typography>
                <Typography
                  component={"p"}
                  variant="body2"
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
                borderRadius={1}
                color={labelColor || "#045f04"}
              >
                {labelText || "Rs "}
              </Box>
            )}
          </Box>
        </Tooltip>
      ) : (
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
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Typography
                component={"p"}
                variant="Body2"
                color={grey[800]}
                bgcolor={"transparent"}
                textAlign={"center"}
                position={"absolute"}
                top={0}
                left={0}
                fontWeight={600}
              >
                {caption}
              </Typography>
              <Typography
                component={"h1"}
                variant="body2"
                color={rgbColor}
                fontSize={fontSize}
                fontWeight={fontWeight || 500}
                textAlign={"center"}
                textTransform={textTransform}
              >
                {rupeeLabal ? (
                  <>
                    {" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(value || 0)}
                  </>
                ) : (
                  value
                )}
              </Typography>
            </div>
          )}
          {labelText && (
            <Box
              fontSize={12}
              fontWeight={500}
              position={"absolute"}
              top={"-5px"}
              left={0}
              p={labelPadding || 0.5}
              borderRadius={1}
              color={labelColor || "#045f04"}
            >
              {labelText || "Rs "}
            </Box>
          )}
        </Box>
      )}
    </Tooltip>
  );
};

export default TransparentCard;
