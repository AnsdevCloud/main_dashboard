import {
  Add,
  ArrowBack,
  Close,
  OpenInNew,
  Preview,
  Save,
  Upload,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExcelToJSONAPI } from "../../../assets/api/APIUrls";
import { GiExtractionOrb } from "react-icons/gi";
import EnhancedTable from "../../options/EnhancedTable";
import { ThemeContext } from "../../../theme/ThemeContext";

const RelationShip = () => {
  const navigate = useNavigate();
  const { setRelationshipPreview, relationshipPreview } =
    useContext(ThemeContext);
  //store array
  const [file, setFile] = useState("");

  //single member obj
  const [doccument, setDoccument] = useState([]);

  //handle control add member form
  const [isOpen, setIsOpen] = useState(false);

  //add member function
  const handleAddMember = () => {};

  //open add member form control
  const handleOpenForm = () => {
    setIsOpen(true);
  };

  // Create FormData and append the file
  var formData = new FormData();
  formData.append("file", file[0]);

  const handleExtractExcelToJson = async () => {
    const headers = {
      "Content-Type": "multipart/form-data", // Sets content type to JSON
      authorization:
        "b2cfa418a6bdb0c48a1d34a729adf28e4a6395dbb5046077e3964e5c5cd1a6c4", // Example of an authorization header
    };
    axios
      .post(ExcelToJSONAPI, { file: file[0] }, { headers })
      .then((response) => {
        setDoccument(response?.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        ); // Handle error
      });
  };
  const handlePreview = () => {
    setRelationshipPreview(doccument || []);
    navigate("preview");
  };

  return (
    <Container>
      <Grid2 container spacing={{ xs: 2, md: 3 }} px={2}>
        <Grid2 size={{ xs: 12 }}>
          <Typography
            variant="subtitle1"
            fontSize={{ xs: 24, md: 40 }}
            component={"h1"}
            my={{ xs: 1, md: 2 }}
            color="grey"
            fontWeight={600}
          >
            Relationship Value
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="body2" color="grey" component={"p"} my={2}>
            Upload Excel File
          </Typography>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            alignContent={"center"}
            width={"100%"}
            flexWrap={"wrap"}
            gap={1}
          >
            <Button
              fullWidth
              sx={{ maxWidth: { xs: "100%", sm: "50%", md: "30%" } }}
              disabled={isOpen}
              variant="outlined"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Upload />}
              color="success"
            >
              Life Insurance
            </Button>
            <Button
              fullWidth
              sx={{ maxWidth: { xs: "100%", sm: "50%", md: "30%" } }}
              disabled={isOpen}
              color="info"
              variant="outlined"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Upload />}
            >
              Health Insurance
            </Button>
            <Button
              fullWidth
              color="warning"
              sx={{ maxWidth: { xs: "100%", sm: "50%", md: "30%" } }}
              disabled={isOpen}
              variant="outlined"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Upload />}
            >
              Car Insurance
            </Button>
            <Button
              fullWidth
              sx={{ maxWidth: { xs: "100%", sm: "50%", md: "30%" } }}
              disabled={isOpen}
              variant="outlined"
              color="secondary"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Upload />}
            >
              Personal Accident
            </Button>
            <Button
              fullWidth
              sx={{ maxWidth: { xs: "100%", sm: "50%", md: "30%" } }}
              disabled={isOpen}
              variant="outlined"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Upload />}
            >
              Other Insurance
            </Button>
            <Button
              fullWidth
              sx={{ maxWidth: { xs: "100%", sm: "50%", md: "30%" } }}
              disabled={isOpen}
              variant="outlined"
              onClick={() => handleOpenForm()}
              size="small"
              startIcon={<Upload />}
              color="inherit"
            >
              Mutual funds
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12 }}></Grid2>
        {isOpen && (
          <Grid2 size={{ xs: 12 }}>
            <Paper
              sx={{
                p: 2,
                position: "relative",
                borderRadius: 1,
              }}
              elevation={0}
            >
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    type="file"
                    name=""
                    label="Select File"
                    placeholder="Choose file"
                    focused
                    color="#777"
                    size="small"
                    onChange={(e) => setFile(e.target.files)}
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 2 }}>
                  <Button
                    variant="contained"
                    color="info"
                    fullwidthsize="large"
                    disabled={!file}
                    fullWidth
                    onClick={() => handleExtractExcelToJson()}
                    startIcon={<GiExtractionOrb />}
                  >
                    Extract
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 2 }}>
                  <Button
                    variant="contained"
                    color="info"
                    fullwidthsize="l
                    arge"
                    disabled={doccument?.length <= 0}
                    fullWidth
                    onClick={() => handlePreview()}
                    startIcon={<Preview />}
                  >
                    Preview
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullwidthsize="l
                    arge"
                    disabled={doccument <= 0}
                    fullWidth
                    onClick={() => handleAddMember()}
                    startIcon={<Upload />}
                  >
                    Upload
                  </Button>
                </Grid2>
              </Grid2>
              <Box position={"absolute"} top={-40} right={0}>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setIsOpen(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Paper>
          </Grid2>
        )}
        <Grid2 size={{ xs: 12 }}>
          <Divider sx={{ my: 1 }} flexItem orientation="horizontal">
            OR
          </Divider>
          {/* <Typography variant="body2" color="grey" component={"p"} my={2}>
            Use Form
          </Typography> */}
          <Button fullWidth color="inherit" size="small" variant="text">
            By Form
          </Button>
        </Grid2>

        <Grid2 size={{ xs: 4, md: 4 }} my={{ xs: 2, md: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            fullWidth
            color="inherit"
            variant="outlined"
            sx={{ maxWidth: 200 }}
            component={Link}
            to={-1}
          >
            Back
          </Button>
        </Grid2>
        {relationshipPreview.length > 0 && (
          <Grid2 size={{ xs: 4, md: 4 }} my={{ xs: 2, md: 3 }}>
            <Button
              startIcon={<OpenInNew />}
              fullWidth
              color="info"
              variant="outlined"
              sx={{ maxWidth: 200 }}
              component={Link}
              to={"preview"}
            >
              Preview
            </Button>
          </Grid2>
        )}
        {!isOpen && (
          <Grid2 size={{ xs: 4, md: 4 }} my={{ xs: 2, md: 3 }}>
            <Button
              startIcon={<Save />}
              fullWidth
              color="info"
              variant="contained"
              sx={{ maxWidth: 200 }}
            >
              Save{" "}
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default RelationShip;
