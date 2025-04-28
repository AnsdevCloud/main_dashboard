import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Grid2,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useState } from "react";

import TransparentBox from "./TransparentBox";
import HeadlineTag from "./HeadlineTag";

export default function PolicySummaryAccordion({ policyData }) {
  const [selectedLetter, setSelectedLetter] = useState("");

  if (!policyData?.policySummery) return null;

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
  };

  const filteredKeys = Object.keys(policyData.policySummery).filter((item) => {
    const summary = policyData.policySummery[item];
    const proposerName =
      summary?.policyDetails?.[summary.policyNumbers[0]]?.proposerName || "";
    if (!selectedLetter) return true;
    return proposerName.toLowerCase().startsWith(selectedLetter.toLowerCase());
  });

  return (
    <Box overflow={"hidden"} maxHeight={450} mb={5} sx={{ overflowY: "auto" }}>
      {/* Letter Filter Row */}
      <Box
        display="flex"
        flexWrap="wrap"
        position={"sticky"}
        top={0}
        zIndex={1}
        bgcolor="background.default"
        borderBottom="1px solid grey.200"
        gap={1}
        mb={3}
        alignItems="center"
        justifyContent="center"
      >
        {["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => (
          <Typography
            key={letter}
            variant="subtitle2"
            onClick={() => handleLetterSelect(letter === "All" ? "" : letter)}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s",
              fontWeight:
                selectedLetter === letter ||
                (letter === "All" && selectedLetter === "")
                  ? 700
                  : 400,
              color:
                selectedLetter === letter ||
                (letter === "All" && selectedLetter === "")
                  ? "primary.main"
                  : "text.secondary",
              fontSize:
                selectedLetter === letter ||
                (letter === "All" && selectedLetter === "")
                  ? "1rem"
                  : "1rem",
              "&:hover": {
                translate: "0 -5px",
                color: "info.dark",
              },
            }}
          >
            {letter}
          </Typography>
        ))}
      </Box>

      {/* Accordions */}
      {filteredKeys.length > 0 ? (
        filteredKeys.map((item) => {
          const summary = policyData.policySummery[item];
          if (!summary) return null;

          const proposerName =
            summary?.policyDetails?.[summary.policyNumbers[0]]?.proposerName ||
            "Unknown Proposer";

          return (
            <Accordion
              key={item}
              elevation={0}
              sx={{
                bgcolor: "background.default",
                mb: 0.5,
                borderRadius: 2,
                overflow: "hidden",
              }}
              disableGutters
              variant="outlined"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${item}-content`}
                id={`${item}-header`}
                sx={{
                  bgcolor: "background.paper",
                  borderBottom: "1px solid grey.200",
                  borderColor: "divider",
                }}
              >
                <Typography
                  fontWeight={500}
                  color="primary.main"
                  textTransform={"capitalize"}
                  display={"flex"}
                  component={"h4"}
                  alignItems={"center"}
                  gap={2}
                  justifyContent={"space-between"}
                >
                  {proposerName}
                  <Typography
                    component={"p"}
                    color="text.secondary"
                    fontSize={12}
                  >
                    {summary.policyNumbers.length > 0
                      ? `(${summary.policyNumbers.length} Policies)`
                      : ""}
                  </Typography>
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ bgcolor: "background.paper" }}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      rgbColor="rgb(8, 155, 28)"
                      value={summary.totalSumAssured}
                      caption="Total Sum Assured"
                      captionSize={14}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      rgbColor="rgb(8, 155, 150)"
                      value={summary.totalBasePremium}
                      caption="Total Base Premium"
                      captionSize={14}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      rgbColor="rgb(8, 155, 28)"
                      value={summary.totalBasePremiumWithGst}
                      caption="Total Base Premium With GST"
                      captionSize={14}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      rgbColor="rgb(5, 101, 196)"
                      value={summary.totalRiders}
                      caption="Total Riders"
                      captionSize={14}
                      rupeeLabal={false}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      value={summary.totalRiderSumAssured}
                      caption="Total Rider Sum Assured"
                      captionSize={14}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      value={summary.totalRiderPremium}
                      caption="Total Rider Premium"
                      captionSize={14}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <TransparentBox
                      fontSize={22}
                      fontWeight={700}
                      value={summary.totalRiderPremiumWithGst}
                      caption="Total Rider Premium With GST"
                      captionSize={14}
                    />
                  </Grid2>
                </Grid2>

                {/* Policy Numbers List */}
                <Card variant="outlined" sx={{ mt: 3 }}>
                  <CardContent>
                    <HeadlineTag title="Policy Numbers" size="small" />
                    <Stack gap={2} flexDirection="column" p={1}>
                      {summary.policyNumbers.map((policyNo) => (
                        <Box
                          key={policyNo}
                          p={2}
                          borderRadius={2}
                          border={1}
                          borderColor="divider"
                          display="flex"
                          flexWrap="wrap"
                          alignItems="center"
                          justifyContent="space-between"
                          bgcolor="background.default"
                          sx={{
                            transition: "all 0.3s",
                            "&:hover": { boxShadow: 1 },
                          }}
                        >
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="text.secondary">
                              Policy Number
                            </Typography>
                            <Typography
                              component={Link}
                              to={`/crm/life-insurance/policy/${policyNo}`}
                              fontWeight={600}
                              color="primary.main"
                              sx={{ textDecoration: "none" }}
                            >
                              {policyNo}
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="text.secondary">
                              Company
                            </Typography>
                            <Typography fontWeight={600} color="success.main">
                              {summary?.policyDetails?.[policyNo]?.company ||
                                "Unknown Company"}
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="body2" color="text.secondary">
                              Riders
                            </Typography>
                            <Typography fontWeight={600} color="success.main">
                              {summary.ridersByPolicy[policyNo] || 0}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography
          textAlign="center"
          component={"p"}
          variant="caption"
          color="error"
          mt={5}
        >
          No Proposer Found for Selected Letter
        </Typography>
      )}
    </Box>
  );
}
