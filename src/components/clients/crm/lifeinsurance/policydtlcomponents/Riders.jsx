import { Grid2, Typography } from "@mui/material";
import React from "react";
import HeadlineTag from "../../../../options/HeadlineTag";

const Riders = ({ data }) => {
  return (
    <Grid2 container spacing={2}>
      {data?.riders?.map((item, index) => (
        <Grid2 size={{ xs: 12 }} key={index}>
          <Grid2 size={{ xs: 12 }}>
            <HeadlineTag size={"small"} title={item?.riderName} />
            <Grid2
              container
              spacing={1}
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                p: 2,
                borderRadius: 1,
              }}
            >
              <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
                <Typography
                  variant="body2"
                  component={"p"}
                  sx={{ cursor: "default" }}
                  color="text.secondary"
                  fontWeight={400}
                  gutterBottom
                >
                  Rider Premium
                </Typography>
                <Typography variant="body1" color="success">
                  &#x20B9; {item?.riderPremium}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
                <Typography
                  variant="body2"
                  component={"p"}
                  sx={{ cursor: "default" }}
                  color="text.secondary"
                  fontWeight={400}
                  gutterBottom
                >
                  GST ({item?.riderGst}%)
                </Typography>
                <Typography
                  variant="body1"
                  textTransform={"capitalize"}
                  color="success"
                >
                  &#x20B9;{" "}
                  {
                    gstCalculation(item?.riderPremium, item?.riderGst)
                      ?.gstAmount
                  }
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
                <Typography
                  variant="body2"
                  component={"p"}
                  sx={{ cursor: "default" }}
                  color="text.secondary"
                  fontWeight={400}
                  gutterBottom
                >
                  Rider Pay Term
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {item?.riderPayTerm}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
                <Typography
                  variant="body2"
                  component={"p"}
                  sx={{ cursor: "default" }}
                  color="text.secondary"
                  fontWeight={400}
                  gutterBottom
                >
                  Rider Policy Term
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {item?.riderPolicyTerm}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
                <Typography
                  variant="body2"
                  component={"p"}
                  sx={{ cursor: "default" }}
                  color="text.secondary"
                  fontWeight={400}
                  gutterBottom
                >
                  Final Premium
                </Typography>
                <Typography variant="body1" color="success">
                  &#x20B9;{" "}
                  {finalPremiumCalculation(
                    item?.riderPremium,
                    gstCalculation(item?.riderPremium, item?.riderGst)
                      ?.gstAmount
                  )}
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Riders;

const gstCalculation = (basePremium, gst) => {
  // Calculate the discount amount and return the final premium
  // Assuming discount is a percentage
  // Example: if basePremium is 1000 and discount is 10%, the final premium should be 900
  if (basePremium <= 0 || gst < 0) {
    throw new Error("Invalid base premium or gst value");
  }
  if (gst > 100) {
    throw new Error("gst cannot be more than 100%");
  }
  if (gst < 0) {
    throw new Error("gst cannot be negative");
  }
  if (basePremium < 0) {
    throw new Error("Base premium cannot be negative");
  }
  if (gst < 0) {
    throw new Error("gst cannot be negative");
  }
  let dis = parseFloat(gst);

  let base = parseFloat(basePremium);

  const gstAmount = (base * dis) / 100;

  return {
    gstAmount: gstAmount.toFixed(2),
    finalPremium: (base + gstAmount).toFixed(2),
    basePremium: base.toFixed(2),
    gst: dis.toFixed(2),
  };
};

const finalPremiumCalculation = (discountedPremium, gst) => {
  return parseFloat(parseFloat(discountedPremium) + parseFloat(gst)).toFixed(2);
};
