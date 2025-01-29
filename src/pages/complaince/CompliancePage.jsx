import React from "react";
import { Container, Grid2, Typography, Card, CardContent } from "@mui/material";
import ComplianceChecklist from "../../components/complaince/ComplianceChecklist";
import AuditTools from "../../components/complaince/AuditTools";
import FraudDetectionReports from "../../components/complaince/FraudDetectionReports";
import RegulatoryUpdates from "../../components/complaince/RegulatoryUpdates";
import DataAnalytics from "../../components/complaince/DataAnalytics";
import HeadlineTag from "../../components/options/HeadlineTag";

const CompliancePage = () => {
  const DATA = [
    {
      companyName: "SBI",
      type: "sales",
      gst: [
        {
          number: "23412easDE",
          state: "MH",
        },
        {
          number: "23412easDE",
          state: "UP",
        },
      ],
    },
  ];
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <HeadlineTag variant="h4" my={2}>
        Compliance Management
      </HeadlineTag>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card elevation={0}>
            <CardContent>
              <ComplianceChecklist />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card elevation={0}>
            <CardContent>
              <AuditTools />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card elevation={0}>
            <CardContent>
              <FraudDetectionReports />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card elevation={0}>
            <CardContent>
              <RegulatoryUpdates />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Card elevation={0}>
            <CardContent>
              <DataAnalytics />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CompliancePage;
