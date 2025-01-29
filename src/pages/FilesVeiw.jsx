import React from "react";
import PDFViewer from "../components/docs/PDFVeiwer";
import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { DocumentScanner } from "@mui/icons-material";
import { GiLifeBar } from "react-icons/gi";
import TransparentBox from "../components/options/TransparentBox";
import { FaCar } from "react-icons/fa";

const FilesVeiw = () => {
  return (
    <Grid2 container spacing={1} p={1}>
      <Grid2 size={{ xs: 12, sm: 2, md: 3 }}>
        <Paper elevation={0} sx={{ p: 1 }}>
          <Typography m={1} variant="body2" color="grey">
            Policy Documents
          </Typography>

          <Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DocumentScanner />
                </ListItemIcon>
                <ListItemText>Policy 02388239</ListItemText>
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 10, md: 6 }}>
        {/* <PDFViewer
          url={
            "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4"
          }
        /> */}
        {/* <PDFViewer url={"https://tmpfiles.org/dl/18000688/document.pdf"} /> */}
        <PDFViewer url={"https://tmpfiles.org/dl/18004512/document.pdf"} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 2, md: 3 }}>
        <Paper elevation={0} sx={{ p: 1 }}>
          <Typography m={1} variant="body2" color="grey">
            Other Insurance Policy Documents
          </Typography>

          <Box my={2}>
            <TransparentBox
              value={<GiLifeBar fontSize="50px" />}
              fontSize={"50px"}
              caption={"Life Insurance Documents "}
              fullWidth
              rgbColor="rgb(99, 199, 0)"
            />
          </Box>
          <Box my={2}>
            <TransparentBox
              value={<FaCar fontSize="50px" />}
              fontSize={"50px"}
              caption={"Car Insurance Documents "}
              fullWidth
              rgbColor="rgb(0, 80, 199)"
            />
          </Box>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default FilesVeiw;

// const TransparentBox = ({
//   value,
//   caption,
//   fontSize = 30,
//   rgbColor = "rgb(255, 77, 0)",
//   bgTransparency = 0.2,
//   width,
//   height,
//   fullHeight = false,
//   fullWidth = false,
//   tooltipText = null,
//   tooltipPlacement = "auto",
//   labelColor,
//   labelText,
//   children,
// }) => {
//   // Function to calculate 20% of typography color
//   const getBoxBgColor = (rgbColor) => {
//     // Remove 'rgb(' and ')' then split into R, G, B
//     const [r, g, b] = rgbColor.replace("rgb(", "").replace(")", "").split(",");
//     return `rgba(${r.trim()}, ${g.trim()}, ${b.trim()}, ${bgTransparency})`; // Add alpha (20%)
//   };

//   return (
//     <Tooltip
//       title={tooltipText ? tooltipText : ""}
//       placement={tooltipPlacement === "" ? "auto" : tooltipPlacement}
//     >
//       <Box
//         padding={1}
//         position={"relative"}
//         width={fullWidth ? "100%" : width ? width : "auto"}
//         height={fullHeight ? "100%" : height ? height : "auto"}
//         minWidth={100}
//         bgcolor={getBoxBgColor(rgbColor)}
//         borderRadius={1}
//         display={children ? "block" : "flex"}
//         alignItems={"center"}
//         justifyContent={"center"}
//         flexDirection={"column"}
//         alignContent={"center"}
//       >
//         {children ? (
//           children
//         ) : (
//           <>
//             <Typography
//               component={"h1"}
//               variant="body2"
//               color={rgbColor}
//               fontSize={fontSize}
//               fontWeight={500}
//               textAlign={"center"}
//             >
//               {value}
//             </Typography>
//             <Typography
//               component={"p"}
//               variant="caption"
//               color="grey"
//               bgcolor={"transparent"}
//               textAlign={"center"}
//               fontWeight={500}
//             >
//               {caption}
//             </Typography>
//           </>
//         )}
//         {labelText && (
//           <Box
//             fontSize={12}
//             fontWeight={500}
//             position={"absolute"}
//             top={"-5px"}
//             left={0}
//             p={0.5}
//             // bgcolor={"rgba(24, 87, 2, 0.315)"}
//             borderRadius={1}
//             color={labelColor || "#045f04"}
//           >
//             {labelText || "Rs "}
//           </Box>
//         )}
//       </Box>
//     </Tooltip>
//   );
// };
