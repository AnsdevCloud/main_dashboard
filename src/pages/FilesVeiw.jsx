import React, { useEffect, useState } from "react";
import PDFViewer from "../components/docs/PDFVeiwer";
import {
  Box,
  Button,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowBack, DocumentScanner } from "@mui/icons-material";
import { GiHealthCapsule, GiLifeBar } from "react-icons/gi";
import TransparentBox from "../components/options/TransparentBox";
import { FaCar } from "react-icons/fa";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const FilesVeiw = () => {
  const [docs, setDocs] = useState(null);
  const [activeDocs, setActiveDocs] = useState(null);
  const [previesSource, setPreviewSource] = useState(null);
  const [acitveSource, setAcitveSource] = useState(null);

  useEffect(() => {
    let store = JSON.parse(sessionStorage.getItem("x04_f4"));
    // console.log("store: ", store);
    setDocs(store);
    setActiveDocs(store?.lifePCC);
  }, []);

  const handlePreviews = (e) => {
    setAcitveSource(e.uid);
    setPreviewSource(e.url);
  };
  return (
    <Grid2 container spacing={1} p={1}>
      <Grid2 size={{ xs: 12, sm: 2, md: 3 }}>
        <Paper elevation={0} sx={{ p: 1 }}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography m={1} variant="body2" color="grey">
              Policy Documents
            </Typography>
            <Button
              sx={{ fontSize: 10, color: "grey" }}
              startIcon={<ArrowBack color="disabled" fontSize="8px" />}
              component={Link}
              to={-1}
              color="inherit"
            >
              Back
            </Button>
          </Stack>
          <Box>
            <List>
              {activeDocs?.map((el, i) => {
                return (
                  <React.Fragment key={i}>
                    {el?.docciments?.map((sel, i) => (
                      <ListItem
                        key={i}
                        sx={{
                          bgcolor:
                            acitveSource === sel?.uid ? grey[400] : grey[200],
                          borderRadius: 10,
                        }}
                      >
                        <ListItemButton
                          sx={{ p: 0, bgcolor: "transparent" }}
                          onClick={() => handlePreviews(sel)}
                        >
                          <ListItemIcon>
                            <DocumentScanner />
                          </ListItemIcon>
                          <ListItemText>{sel?.title}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 10, md: 6 }}>
        {
          <PDFViewer
            url={
              previesSource ||
              "https://enivesh.com/images/eniveshicon/Enivesh_Insurance_LOGO.png"
            }
          />
        }
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 2, md: 3 }}>
        <Paper elevation={0} sx={{ p: 1 }}>
          <Typography m={1} variant="body2" color="grey">
            Other Insurance Policy Documents
          </Typography>

          {docs?.lifePCC?.length > 0 && (
            <Box my={2}>
              <TransparentBox
                value={<GiLifeBar fontSize="50px" />}
                rupeeLabal={false}
                onClick={() => setActiveDocs(docs?.lifePCC)}
                fontSize={"50px"}
                caption={"Life Insurance Documents "}
                fullWidth
                rgbColor="rgb(99, 199, 0)"
              />
            </Box>
          )}
          {docs?.healthPCC?.length > 0 && (
            <Box my={2}>
              <TransparentBox
                value={<GiHealthCapsule fontSize="50px" />}
                rupeeLabal={false}
                onClick={() => setActiveDocs(docs?.healthPCC)}
                fontSize={"50px"}
                caption={"Health Insurance Documents "}
                fullWidth
                rgbColor="rgb(15, 150, 107)"
              />
            </Box>
          )}
          {docs?.carPCC?.length > 0 && (
            <Box my={2}>
              <TransparentBox
                value={<FaCar fontSize="50px" />}
                fontSize={"50px"}
                rupeeLabal={false}
                onClick={() => setActiveDocs(docs?.carPCC)}
                caption={"Car Insurance Documents "}
                fullWidth
                rgbColor="rgb(0, 80, 199)"
              />
            </Box>
          )}
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
