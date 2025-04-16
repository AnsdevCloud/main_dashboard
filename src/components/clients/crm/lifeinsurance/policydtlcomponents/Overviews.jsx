import { Grid2, Typography } from "@mui/material";
import React from "react";
import HeadlineTag from "../../../../options/HeadlineTag";

const Overviews = ({ data }) => {
  return (
    <Grid2 container spacing={1}>
      {/* ///======================Personal Details=======================/// */}
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag title={"Personal Details"} my={1} />
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
              Policy Number
            </Typography>
            <Typography variant="body1" color="text.primary">
              {data?.id}
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
              Proposer Name
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.proposerName}
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
              Life Assured
            </Typography>
            <Typography variant="body1" color="text.primary">
              {data?.lifeAssured}
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
              CIN
            </Typography>
            <Typography variant="body1" color="text.primary">
              {data?.cin}
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
              MIN
            </Typography>
            <Typography variant="body1" color="text.primary">
              {data?.min}
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
              Policy Number
            </Typography>
            <Typography variant="body1" color="text.primary">
              123456789
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* ///======================Policy Details=======================/// */}
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag title={"Policy Details"} my={1} />
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
              Policy Number
            </Typography>
            <Typography variant="body1" color="text.primary">
              {data?.id}
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
              Start Date
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.startDate}
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
              textTransform={"capitalize"}
            >
              Plan
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.plan}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Pay Term
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.payTerm}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Policy Term
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.policyTerm}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              textTransform={"capitalize"}
              color="text.secondary"
              fontWeight={400}
              gutterBottom
            >
              Policy Type
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.policyType?.split("-")?.join(" ")}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag
          title={"First Year Premium"}
          iconColor={"#1976d2"}
          titleColor={"info"}
          my={1}
          size={"small"}
        />
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
              Base Premium
            </Typography>
            <Typography variant="body1" fontWeight={600} color="info">
              &#x20B9;{" "}
              {
                discountCalculation(data?.basePremium || 0, data?.discount || 0)
                  ?.basePremium
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
              Discount ({data?.discount}%)
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="info"
              fontWeight={600}
            >
              &#x20B9;{" "}
              {
                discountCalculation(data?.basePremium || 0, data?.discount || 0)
                  ?.discountAmount
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
              textTransform={"capitalize"}
            >
              GST ({data?.withGstPremium}%)
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="info"
              fontWeight={600}
            >
              &#x20B9;{" "}
              {
                gstCalculation(
                  data?.basePremium || 0,
                  data?.withGstPremium || 0
                )?.gstAmount
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
              textTransform={"capitalize"}
              gutterBottom
            >
              Final Premium
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="info"
              fontWeight={600}
            >
              &#x20B9;{" "}
              {finalPremiumCalculation(
                discountCalculation(data?.basePremium || 0, data?.discount || 0)
                  ?.finalPremium,
                gstCalculation(
                  data?.basePremium || 0,
                  data?.withGstPremium || 0
                )?.gstAmount
              )}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag
          title={"Second Year onward Premium"}
          iconColor={"#108314"}
          titleColor={"success"}
          my={1}
          size={"small"}
        />
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
              Base Premium
            </Typography>
            <Typography variant="body1" color="success" fontWeight={600}>
              &#x20B9;{" "}
              {discountCalculation(data?.basePremium || 0, 0)?.basePremium}
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
              Discount (0%)
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="success"
              fontWeight={600}
            >
              &#8377; 0.00
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
              textTransform={"capitalize"}
            >
              GST ({data?.gst2ndyearonward}%)
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="success"
              fontWeight={600}
            >
              &#x20B9;{" "}
              {
                gstCalculation(
                  data?.basePremium || 0,
                  data?.gst2ndyearonward || 0
                )?.gstAmount
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
              textTransform={"capitalize"}
              gutterBottom
            >
              Final Premium
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="success"
              fontWeight={600}
            >
              &#x20B9;{" "}
              {finalPremiumCalculation(
                data?.basePremium || 0,
                gstCalculation(
                  data?.basePremium || 0,
                  data?.gst2ndyearonward || 0
                )?.gstAmount
              )}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* // ///======================Sum Assured Details=======================/// */}
      <Grid2 size={{ xs: 12 }}>
        {/* <HeadlineTag
          title={"Second Year onward Premium"}
          iconColor={"#108314"}
          titleColor={"success"}
          my={1}
          size={"small"}
        /> */}
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
              Sum Assured
            </Typography>
            <Typography variant="body1" color="text.primary" fontWeight={500}>
              &#x20B9; {data?.sumAssured}
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
              Company
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.company}
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
              textTransform={"capitalize"}
            >
              Payment Mode
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.paymentMode}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Frequency Payment
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.frequencyPayment}
            </Typography>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Paid Up Value
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.paidUpValue}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Surrender Value
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.surrenderValue}
            </Typography>
          </Grid2>
        </Grid2>
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
              textTransform={"capitalize"}
              gutterBottom
            >
              Maturity Date
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.maturityDate}
            </Typography>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Maturity Value
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.maturityValue}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Expected Return
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.expectedReturn}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Overviews;

const discountCalculation = (basePremium, discount) => {
  // Calculate the discount amount and return the final premium
  // Assuming discount is a percentage
  // Example: if basePremium is 1000 and discount is 10%, the final premium should be 900
  if (basePremium < 0 || discount < 0) {
    throw new Error("Invalid base premium or discount value");
  }
  if (discount > 100) {
    throw new Error("Discount cannot be more than 100%");
  }
  if (discount < 0) {
    throw new Error("Discount cannot be negative");
  }
  if (basePremium < 0) {
    throw new Error("Base premium cannot be negative");
  }
  if (discount < 0) {
    throw new Error("Discount cannot be negative");
  }
  let dis = parseFloat(discount || 0);

  let base = parseFloat(basePremium || 0);

  const discountAmount = (base * dis) / 100;

  return {
    discountAmount: discountAmount.toFixed(2),
    finalPremium: (base - discountAmount).toFixed(2),
    basePremium: base.toFixed(2),
    discount: dis.toFixed(2),
  };
};

const gstCalculation = (basePremium, gst) => {
  // Calculate the discount amount and return the final premium
  // Assuming discount is a percentage
  // Example: if basePremium is 1000 and discount is 10%, the final premium should be 900
  if (basePremium < 0 || gst < 0) {
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
  let dis = parseFloat(gst || 0);

  let base = parseFloat(basePremium || 0);

  const gstAmount = (base * dis) / 100;

  return {
    gstAmount: gstAmount.toFixed(2),
    finalPremium: (base + gstAmount).toFixed(2),
    basePremium: base.toFixed(2),
    gst: dis.toFixed(2),
  };
};

const finalPremiumCalculation = (discountedPremium, gst) => {
  return parseFloat(discountedPremium || 0) + parseFloat(gst || 0);
};
