import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";

const FeatureCheckboxList = ({ features = [], onSave, modyRole }) => {
  // Initial state for features
  //   const [features, setFeatures] = useState({
  //     admin: true,
  //     dashboard: false,
  //     blogging: true,
  //     eBooks: true,
  //     sales: true,
  //     analytics: false,
  //     purchase: true,
  //     expense: true,
  //     filingData: true,
  //     bankDetails: true,
  //     global: true,
  //     client: true,
  //     clientRegister: true,
  //     clientDetails: true,
  //     crm: true,
  //     clientProfile: false,
  //     lifeInsurance: true,
  //     generalInsurance: true,
  //     healthInsurance: true,
  //     loans: true,
  //     mutualFund: true,
  //     aif: false,
  //     fixedDeposits: true,
  //     ofp: true,
  //     account: true,
  //     register: true,
  //     salesRegister: true,
  //     purchaseRegister: true,
  //     assetsRegister: true,
  //     subscripitonRegister: true,
  //     payment: true,
  //     utilityBill: true,
  //     tax: true,
  //     partner: true,
  //     salary: true,
  //   });

  // State to hold selected features with status
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Handle checkbox toggle
  const handleCheckboxChange = (feature) => {
    const existingFeature = selectedFeatures.find(
      (item) => item.name === feature
    );

    if (existingFeature) {
      // If feature exists, remove it
      setSelectedFeatures(
        selectedFeatures.filter((item) => item.name !== feature)
      );
    } else {
      // If feature does not exist, add it with its current status
      setSelectedFeatures([
        ...selectedFeatures,
        { name: feature, status: features[feature] ? "enabled" : "disabled" },
      ]);
    }
  };

  // Handle status toggle
  const toggleFeatureStatus = (feature) => {
    setSelectedFeatures((prevSelected) =>
      prevSelected.map((item) =>
        item.name === feature
          ? {
              ...item,
              status: item.status === "enabled" ? "disabled" : "enabled",
            }
          : item
      )
    );
  };

  return (
    <Box my={1}>
      <Stack
        width={"100%"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body2" component={"p"} color="gray" gutterBottom>
          Features
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={onSave(selectedFeatures)}
          sx={{ fontSize: 10, fontWeight: 600, p: 0.2 }}
        >
          Save
        </Button>
      </Stack>
      <FormGroup>
        {Object.keys(features).map((feature) => (
          <Box
            key={feature}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="success"
                  checked={
                    !!selectedFeatures.find((item) => item.name === feature)
                  }
                  onChange={() => handleCheckboxChange(feature)}
                />
              }
              label={feature?.toUpperCase()}
            />
            <Button
              variant="text"
              size="small"
              onClick={() => toggleFeatureStatus(feature)}
              sx={{ textTransform: "uppercase", fontSize: 8 }}
              disabled={!selectedFeatures.find((item) => item.name === feature)}
              color={
                selectedFeatures.find((item) => item.name === feature)
                  ?.status === "enabled"
                  ? "success"
                  : "secondary"
              }
            >
              {selectedFeatures.find((item) => item.name === feature)?.status ||
                "disabled"}
            </Button>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};

export default FeatureCheckboxList;
