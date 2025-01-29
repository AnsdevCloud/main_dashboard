import React, { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { Box, Button, Grid2, Typography } from "@mui/material";
import EnhancedTable from "../../../options/EnhancedTable";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Previews = () => {
  const { setRelationshipPreview, relationshipPreview } =
    useContext(ThemeContext);
  return (
    <>
      <Grid2 container spacing={1} my={1} p={1} wrap="wrap-reverse">
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Button
            size="small"
            fullWidth
            color="inherit"
            startIcon={<ArrowBack />}
            component={Link}
            to={-1}
          >
            Back
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          {relationshipPreview?.length > 0 ? (
            relationshipPreview?.map((item, index) => (
              <Box my={2}>
                <EnhancedTable
                  key={index}
                  sheetName={`Index : ${index + 1} |-| Name : ${
                    item?.sheetName
                  }`}
                  tableData={item?.data || []}
                />
              </Box>
            ))
          ) : (
            <Box m={2}>
              <Typography
                component={"h1"}
                textAlign="center"
                variant="h3"
                color={grey[400]}
              >
                No Data
              </Typography>
            </Box>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 2 }}></Grid2>
      </Grid2>
    </>
  );
};

export default Previews;
