import {
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";
import HeadlineTag from "../../../../options/HeadlineTag";
import dayjs from "dayjs";

const HOverviews = ({ data }) => {
  return (
    <Grid2 container spacing={1}>
      {/* ///======================Personal Details=======================/// */}
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag title={"Personal Details"} my={2} />
        <Grid2
          container
          spacing={1}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
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
            <Typography variant="body1" color="info">
              {data?.id}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
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
              {data?.proposer_name}
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
          {data?.group_name && (
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              <Typography
                variant="body2"
                component={"p"}
                sx={{ cursor: "default" }}
                color="text.secondary"
                fontWeight={400}
                gutterBottom
              >
                Group Name
              </Typography>
              <Typography
                variant="body1"
                textTransform={"capitalize"}
                color="text.primary"
              >
                {data?.group_name}
              </Typography>
            </Grid2>
          )}
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              gutterBottom
            >
              Client Name
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.cleint_name}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* ///======================Insured Details=======================/// */}
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag title={`Insured (${data?.insured?.length})`} my={2} />
        <Grid2
          container
          spacing={1}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            p: 2,
            borderRadius: 1,
          }}
        >
          {data?.insured?.map((it, i) => (
            <Grid2 key={i} size={{ xs: 12, sm: 4, md: 3 }}>
              <Typography
                variant="body2"
                component={"p"}
                sx={{ cursor: "default" }}
                color="text.secondary"
                fontWeight={400}
                gutterBottom
              >
                Member({i + 1})
              </Typography>
              <Typography
                variant="body1"
                textTransform={"capitalize"}
                color="text.primary"
              >
                {it}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
      {/* ///======================Policy Details=======================/// */}

      <Grid2 size={{ xs: 12 }} mt={3}>
        <HeadlineTag title={"Policy Details"} my={2} />
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
              Policy Category
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.policy_category}
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
              Policy Type
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.policy_category_plan}
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
              Policy at Start
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.policy_at_start}
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
              {dayjs(data?.start_date)?.format("DD MMM YYYY")}
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
              Plan Name
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.plan_name}
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
              Cover Type
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.cover_type}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* // ///======================Sum Assured Details=======================/// */}
      <Grid2 size={{ xs: 12 }}>
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
            <Typography variant="body1" color="info" fontWeight={500}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(data?.sum_assured || 0)}
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
              {data?.payment_mode}
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
              {data?.frequency_payment}
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
              Tenure
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.tenure}
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
              Client Type
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.client_type?.split("-")?.join(" ")}
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
              {dayjs(data?.maturityDate).format("DD MMMM YYYY")}
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
              Policy Since
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {dayjs(data?.policy_since).format("DD MMMM YYYY")}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              textTransform={"capitalize"}
              gutterBottom
            >
              Existing illness
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              color="text.primary"
            >
              {data?.existing_illness}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12 }} mt={3}>
        <HeadlineTag
          title={"Premium"}
          iconColor={"#1976d2"}
          titleColor={"info"}
          my={1}
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
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(
                discountCalculation(
                  data?.base_premium || 0,
                  data?.discount || 0
                )?.basePremium || 0
              )}
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
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(data?.discount || 0)}
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
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(
                handleSubtract(data?.with_gst_premium, data?.base_premium)
              )}
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
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(data?.with_gst_premium)}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12 }} mt={3}>
        <HeadlineTag title={"Communition Details"} my={1} />
        <Grid2
          container
          spacing={1}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="body1"
                  component={"p"}
                  color="success"
                  fontWeight={500}
                >
                  {data?.comment_from_client}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="grey"
                  component={"h3"}
                  textAlign={"center"}
                  mt={2}
                >
                  Comment From Client
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="body1"
                  component={"p"}
                  color="success"
                  fontWeight={500}
                >
                  {data?.comment_from_rm}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="grey"
                  component={"h3"}
                  textAlign={"center"}
                  mt={2}
                >
                  Comment From RM
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="body1"
                  component={"p"}
                  color="success"
                  fontWeight={500}
                >
                  {data?.action}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  component={"h3"}
                  color="grey"
                  textAlign={"center"}
                  mt={2}
                >
                  Action
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12 }} mt={3}>
        <HeadlineTag title={"In House Details"} my={1} />
        <Grid2
          container
          spacing={1}
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              gutterBottom
            >
              Sourcing
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              fontWeight={600}
              color="info"
            >
              {data?.sourcing}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              gutterBottom
            >
              Lead Source
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              fontWeight={600}
              color="info"
            >
              {data?.lead_source?.split("-").join(" ")}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              gutterBottom
            >
              Insurance Planner
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              fontWeight={600}
              color="info"
            >
              {data?.insurance_planner}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ cursor: "default" }}
              color="text.secondary"
              fontWeight={400}
              gutterBottom
            >
              SRM
            </Typography>
            <Typography variant="body1" fontWeight={600} color="info">
              {data?.srm}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default HOverviews;

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

const handleSubtract = (a, b) => {
  let a1 = parseInt(a);
  let b1 = parseInt(b);
  return a1 - b1;
};
