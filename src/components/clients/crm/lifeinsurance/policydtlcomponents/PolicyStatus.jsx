import React, { useEffect, useState } from "react";
import {
  format,
  addYears,
  addMonths,
  addDays,
  parseISO,
  isAfter,
  isBefore,
  differenceInDays,
  differenceInYears,
  isToday,
  differenceInMonths,
} from "date-fns";
import HeadlineTag from "../../../../options/HeadlineTag";
import TransparentBox from "../../../../options/TransparentBox";
import {
  Divider,
  Grid2,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, Save } from "@mui/icons-material";
const PolicyStatusCalculator = ({ data }) => {
  const [policyTerm, setPolicyTerm] = useState(data?.policyTerm);
  const [PolicyType, setPolicyType] = useState(null);
  const [payTerm, setPayTerm] = useState(null);
  const [startDate, setStartDate] = useState(data?.startDate || null);
  const [renewalDate, setRenewalDate] = useState(null);
  const [paymentFrequency, setPaymentFrequency] = useState(
    data?.frequencyPayment || "yearly"
  );
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [payTermEndDate, setPayTermEndDate] = useState("");
  const [premiumStatus, setPremiumStatus] = useState(null);
  const [isDirence, stIsDirence] = useState(null);
  // Calculate next renewal date based on frequency

  const calculateStatus = () => {
    if (!startDate || !renewalDate) return null;

    const today = new Date();
    const renewal = parseISO(renewalDate);
    const nextRenewal = getNextRenewalDate(renewal, paymentFrequency);
    const daysUntilRenewal = differenceInDays(renewal, today);

    let status = "";
    let daysMessage = "";

    // Case 1: Before or on Renewal Date
    if (daysUntilRenewal >= 0) {
      // Agar last payment date renewal ke on ya pehle hua ho, policy active ho
      if (lastPaymentDate) {
        const payment = parseISO(lastPaymentDate);
        if (!isAfter(payment, renewal)) {
          status = "Active";
        } else {
          if (daysUntilRenewal <= 20) {
            status = "Pending Renewal";
          }
          status = "Active - Exapiry";
        }
      } else {
        if (daysUntilRenewal <= 20) {
          status = "Pending Renewal";
        }
        status = "Active";
      }
      daysMessage = `Renewal due in ${daysUntilRenewal} day(s)`;
    }
    // Case 2: After Renewal Date but within grace period (29 days)
    else {
      const daysPastRenewal = differenceInDays(today, renewal);
      if (daysPastRenewal <= 29) {
        if (lastPaymentDate) {
          const payment = parseISO(lastPaymentDate);

          if (paymentFrequency === "monthly") {
            if (
              !isBefore(payment, renewal) &&
              !isAfter(payment, addDays(renewal, 14))
            ) {
              status = "Active";
            } else {
              status = "Grace Period: Not Renewed";
            }
          } else {
            // Agar payment renewal date ke baad aur renewal+29 ke andar hui ho
            if (
              !isBefore(payment, renewal) &&
              !isAfter(payment, addDays(renewal, 29))
            ) {
              status = "Active";
            } else {
              status = "Grace Period: Not Renewed";
            }
          }
        } else {
          if (paymentFrequency === "monthly" && daysPastRenewal <= 14) {
            status = "Grace Period: Not Renewed";
          } else {
            if (paymentFrequency === "monthly") {
              status = "Lapsed";
            } else {
              status = "Grace Period: Not Renewed";
            }
          }
        }

        if (paymentFrequency === "monthly" && daysPastRenewal <= 14) {
          const daysLeftGrace = 14 - daysPastRenewal;
          daysMessage = `Grace period expires in ${daysLeftGrace} day(s)`;
        } else {
          const daysLeftGrace = 29 - daysPastRenewal;
          daysMessage = `Grace period expires in ${daysLeftGrace} day(s)`;
        }
      }
      // Case 3: After Grace Period (i.e., 30 or more days past renewal)
      else {
        if (lastPaymentDate) {
          const payment = parseISO(lastPaymentDate);
          // Agar last payment date is before the next renewal due date, override to Active
          if (isBefore(payment, nextRenewal)) {
            status = "Active";
            daysMessage = "Payment received before next renewal due date";
          } else {
            status = "Lapsed";
            daysMessage = "Renewal period lapsed";
          }
        } else {
          if (premiumStatus?.years >= 2 && PolicyType === "Traditional Plans") {
            status = "Paid UP";
            daysMessage = "Renewal period Paid UP";
          } else {
            if (premiumStatus?.years === payTerm) {
              status = "Fully Paid UP";
              daysMessage = "Pay term Completed";
            } else {
              status = "Lapsed";
              daysMessage = "Renewal period lapsed";
            }
          }
        }
      }
    }

    return {
      status,
      nextRenewal: format(nextRenewal, "dd-MM-yyy"),
      daysMessage,
    };
  };

  const getNextRenewalDate = (date, frequency) => {
    switch (frequency) {
      case "monthly":
        return addMonths(date, 1);
      case "quarterly":
        return addMonths(date, 3);
      case "yearly":
        return addYears(date, 1);
      default:
        return addYears(date, 1);
    }
  };

  const getYearsBetweenDates = (startDate, renewalDate) => {
    const start =
      typeof startDate === "string" ? parseISO(startDate) : startDate;
    const renewal =
      typeof renewalDate === "string" ? parseISO(renewalDate) : renewalDate;

    return differenceInYears(renewal, start);
  };
  const result = calculateStatus();

  useEffect(() => {
    if (data) {
      const {
        policyTerm,
        startDate,
        renewalDate,
        frequencyPayment,
        payTerm,
        policyType,
      } = data;
      setPolicyTerm(policyTerm);
      setPaymentFrequency(frequencyPayment);
      let formated1 = format(startDate, "dd MMMM yyyy");
      setStartDate(formated1);

      setRenewalDate(renewalDate);
      setPayTerm(payTerm);
      // let formated2 = format(data?.lastPaymentDate || null, "dd MMMM yyyy");

      setLastPaymentDate(data?.lastPaymentDate || null);

      setPolicyType(policyType);
      let endDate = getPaytermEndDate(startDate, payTerm - 1);
      let formated = format(endDate, "dd MMMM yyyy");
      setPayTermEndDate(formated);
      let difrem = getYearsBetweenDates(startDate, renewalDate);
      stIsDirence(difrem);
      let go = getYearsMonthsAndPayments(
        startDate,
        renewalDate,
        frequencyPayment
      );
      setPremiumStatus(go);
    }
  }, [data]);

  const [edit, setEdit] = useState({
    lastPayDate: false,
    renewalDate: false,
  });

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      renewalDate: renewalDate,
      lastPaymentDate: lastPaymentDate,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (data?.id && renewalDate && lastPaymentDate) {
      fetch(
        `https://db.enivesh.com/firestore/single/life_insurance_policies/${data?.id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          alert("Updated");
          setEdit({
            renewalDate: false,
            lastPayDate: false,
          });
        })
        .catch((error) => console.error(error));
    } else {
      alert("All Field Required");
    }
  };

  return (
    <Paper elevation={0}>
      <HeadlineTag className="text-2xl font-bold mb-4 text-center">
        Life Insurance Policy Status Calculator
      </HeadlineTag>

      <Grid2 container spacing={4} my={1} p={{ xs: 0, md: 2 }}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(254, 61, 27)"}
                value={data?.sumAssured}
                caption={"SumAssured"}
                rupeeLabal={true}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(111, 132, 239)"}
                value={Addition(
                  data?.basePremium,
                  (parseInt(data?.basePremium) * data?.withGstPremium) / 100
                )}
                caption={"With GST Premium (1st) "}
                rupeeLabal={true}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(47, 140, 69)"}
                value={Addition(
                  data?.basePremium,
                  (parseInt(data?.basePremium) * data?.gst2ndyearonward) / 100
                )}
                caption={"With GST Premium (2st Onward) "}
                rupeeLabal={true}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }}>Riders</Divider>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(25, 67, 8)"}
                value={data?.riders?.length}
                caption={"Riders"}
                rupeeLabal={false}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(111, 132, 239)"}
                value={data?.riders?.reduce(
                  (sum, policy) => sum + parseInt(policy?.sumAssured || 0),
                  0
                )}
                caption={"Riders SumAssured  "}
                rupeeLabal={true}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(47, 140, 69)"}
                value={data?.riders.reduce((sum, rider) => {
                  const gstAmount = parseInt(rider.riderPremium || 0) * 0.18;
                  return sum + parseInt(rider.riderPremium) + gstAmount;
                }, 0)}
                caption={"Riders Premium + GST(18%) "}
                rupeeLabal={true}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(135, 111, 239)"}
                // fontSize={"large"}

                fullWidth
                value={policyTerm}
                caption={"Policy Term"}
                height={150}
                rupeeLabal={false}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(48, 128, 207)"}
                // fontSize={"large"}
                fullWidth
                value={payTerm}
                height={150}
                caption={"Pay Term"}
                rupeeLabal={false}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(167, 88, 14)"}
                // fontSize={"large"}
                height={150}
                fullWidth
                value={startDate}
                caption={"Policy Start Date"}
                rupeeLabal={false}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(61, 170, 201)"}
                // fontSize={"large"}
                fullWidth
                textTransform={"capitalize"}
                height={150}
                value={paymentFrequency}
                caption={"Premium Payment Frequency"}
                rupeeLabal={false}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(119, 143, 23)"}
                // fontSize={"large"}
                height={150}
                fullWidth
                value={premiumStatus?.months}
                caption={"Primium Paid Months (Last 1Y)"}
                rupeeLabal={false}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(7, 143, 131)"}
                value={payTermEndDate}
                height={150}
                rupeeLabal={false}
                caption={"Pay Term End"}
                fullWidth
              />
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={
                  result?.status === "Active"
                    ? "rgb(17, 133, 17)"
                    : result?.status === "Lapsed"
                    ? "rgb(255, 0, 0)"
                    : "rgb(255, 196, 0)"
                }
                // fontSize={"large"}
                height={200}
                value={result?.status}
                rupeeLabal={false}
                fullWidth
                caption={"Policy Status"}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TransparentBox
                captionSize={"medium"}
                rgbColor={"rgb(6, 138, 145)"}
                fontSize={"small"}
                value={result?.daysMessage}
                rupeeLabal={false}
                caption={"Note"}
                fullWidth
              />
            </Grid2>
            {result && (
              <Grid2 size={{ xs: 12 }}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TransparentBox
                      captionSize={"medium"}
                      rgbColor={"rgb(101, 152, 5)"}
                      fontSize={"large"}
                      fullWidth
                      fontWeight={600}
                      value={premiumStatus?.years}
                      caption={"Premium Paid Years"}
                      rupeeLabal={false}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TransparentBox
                      captionSize={"medium"}
                      rgbColor={"rgb(7, 162, 35)"}
                      fontSize={"large"}
                      fontWeight={600}
                      fullWidth
                      value={premiumStatus?.totalPayments}
                      caption={"Total Payments"}
                      rupeeLabal={false}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
            )}
            <Grid2 size={{ xs: 12 }} pt={2}>
              <HeadlineTag title={"Edit Section"} size={"small"} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {edit?.renewalDate ? (
                <>
                  <TextField
                    size="small"
                    variant="standard"
                    fullWidth
                    type="date"
                    label="Renewal Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    value={renewalDate}
                    onChange={(e) => setRenewalDate(e.target.value)}
                  />
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    py={0.5}
                    width={"100%"}
                  >
                    <IconButton
                      size="small"
                      onClick={() => setEdit({ ...edit, renewalDate: false })}
                      color="inherit"
                    >
                      <Close fontSize="10px" />
                    </IconButton>
                    <Tooltip title="Save ">
                      <IconButton
                        size="small"
                        onClick={() => handleSubmit()}
                        color="success"
                      >
                        <Save fontSize="10px" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </>
              ) : (
                <TransparentBox
                  captionSize={"medium"}
                  rgbColor={"rgb(255, 143, 7)"}
                  fontSize={"large"}
                  fullWidth
                  tooltip={"Edit"}
                  value={format(renewalDate || null, "dd MMMM yyyy")}
                  caption={"Next Renewal Date"}
                  rupeeLabal={false}
                  onClick={() => setEdit({ ...edit, renewalDate: true })}
                />
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              {edit?.lastPayDate ? (
                <>
                  <TextField
                    variant="standard"
                    size="small"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="date"
                    label="Last Premium Paid Date"
                    value={lastPaymentDate}
                    onChange={(e) => setLastPaymentDate(e.target.value)}
                  />
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    py={0.5}
                    width={"100%"}
                  >
                    <IconButton
                      size="small"
                      onClick={() => setEdit({ ...edit, lastPayDate: false })}
                      color="inherit"
                    >
                      <Close fontSize="10px" />
                    </IconButton>
                    <Tooltip title="Save ">
                      <IconButton
                        size="small"
                        onClick={() => handleSubmit()}
                        color="success"
                      >
                        <Save fontSize="10px" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </>
              ) : (
                <TransparentBox
                  captionSize={"medium"}
                  rgbColor={"rgb(20, 180, 25)"}
                  fontSize={"large"}
                  fullWidth
                  tooltip={"Edit"}
                  value={format(lastPaymentDate || null, "dd MMMM yyyy")}
                  caption={"Last Payment Date"}
                  rupeeLabal={false}
                  onClick={() => setEdit({ ...edit, lastPayDate: true })}
                />
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default PolicyStatusCalculator;

const Addition = (a, b) => {
  let a1 = parseFloat(a);
  let b1 = parseFloat(b);
  return a1 + b1;
};

const getPaytermEndDate = (startDate, years) => {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  return addYears(start, years);
};

const getYearsMonthsAndPayments = (startDate, endDate, frequency) => {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;

  const totalMonths = differenceInMonths(end, start);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let frequencyMonths = 1;
  switch (frequency.toLowerCase()) {
    case "monthly":
      frequencyMonths = 1;
      break;
    case "quarterly":
      frequencyMonths = 3;
      break;
    case "half-yearly":
      frequencyMonths = 6;
      break;
    case "yearly":
      frequencyMonths = 12;
      break;
    default:
      frequencyMonths = 1; // fallback to monthly
  }

  const totalPayments = Math.floor(totalMonths / frequencyMonths);

  return { years, months, totalPayments };
};
