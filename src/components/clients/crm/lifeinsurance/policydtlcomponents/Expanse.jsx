import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid2,
} from "@mui/material";

import HeadlineTag from "../../../../options/HeadlineTag";
import TransparentBox from "../../../../options/TransparentBox";
import { useLocation } from "react-router-dom";

export default function Expanse({ data }) {
  const location = useLocation();
  const [basePremium, setBasePremium] = useState();
  const [policyTerm, setPolicyTerm] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [baseRate, setBaseRate] = useState(0);
  const [rewardRate, setRewardRate] = useState(0);
  const [renewalRates, setRenewalRates] = useState();

  const [salesFirstYearRate, setSalesFirstYearRate] = useState();
  const [salesRenewalRate, setSalesRenewalRate] = useState();

  const [riders, setRiders] = useState([]);

  const [commissionDetails, setCommissionDetails] = useState([]);
  const [result, setResult] = useState(null);

  const parseRates = (rateStr) =>
    rateStr
      ?.split(",")
      .map((r) => parseFloat(r.trim()))
      .filter((r) => !isNaN(r));

  const handleRiderChange = (index, field, value) => {
    const updated = [...riders];
    updated[index][field] =
      field === "name" || field === "renewalRates" ? value : parseFloat(value);
    setRiders(updated);
  };

  const calculateCommission = () => {
    const policyRenewals = parseRates(renewalRates).slice(0, policyTerm - 1);
    const policySaleRenewals = parseRates(salesRenewalRate).slice(
      0,
      policyTerm - 1
    );
    const commissionYearly = [];

    // totalRiderBasePremium = 0;-------------------------------------------
    // totalRiderPre = 0;
    let totalRiderBasePremium = 0;
    let totalRiderPre = riders.reduce((sum, y) => sum + parseInt(y.premium), 0);
    totalRiderBasePremium = totalRiderPre + parseFloat(basePremium);

    const firstYearCommission = (basePremium * (baseRate + rewardRate)) / 100;
    commissionYearly.push({
      year: 1,
      policy: (basePremium * (baseRate + rewardRate || 0)) / 100,
      sales: (totalRiderBasePremium * salesFirstYearRate) / 100,
    });

    let totalRenewalCommission = 0;
    // totalriderPremium + basePremium for sales payout

    for (let i = 0; i < policyRenewals.length; i++) {
      const rate = policyRenewals[i];
      const salesRate = policySaleRenewals[i];
      const commission = (basePremium * rate) / 100;
      const sales = (totalRiderBasePremium * salesRate) / 100;

      totalRenewalCommission += commission;
      commissionYearly.push({ year: i + 2, policy: commission, sales });
    }

    let riderFirstYear = 0;
    let riderRenewal = 0;

    riders.forEach((rider) => {
      const riderFirst =
        (rider.premium * (rider.baseRate + rider.rewardRate || 0)) / 100;
      riderFirstYear += riderFirst;

      const riderRenewals = parseRates(rider.renewalRates).slice(
        0,
        rider.term - 1
      );

      if (commissionYearly.length < rider.term) {
        while (commissionYearly.length < rider.term) {
          commissionYearly.push({
            year: commissionYearly.length + 1,
            policy: 0,
            sales: 0,
          });
        }
      }

      for (let i = 0; i < riderRenewals?.length; i++) {
        const rate = riderRenewals[i];

        const riderCommission = (rider.premium * rate) / 100;
        riderRenewal += riderCommission;
        commissionYearly[i + 1].policy += riderCommission;
        // commissionYearly[i + 1].sales += 0;
      }
    });

    const totalFirstYear = firstYearCommission + riderFirstYear;

    const totalCommission =
      totalFirstYear + totalRenewalCommission + riderRenewal;

    const salesFirst = (parseInt(basePremium) * salesFirstYearRate) / 100;

    const salesTotal =
      salesFirst +
      commissionYearly.slice(1).reduce((sum, y) => sum + parseInt(y.sales), 0);
    const companyEarning = totalCommission;

    setCommissionDetails(commissionYearly);

    setResult({
      firstYearCommission: totalFirstYear,
      totalRenewalCommission: totalRenewalCommission + riderRenewal,
      totalCommission,
      salesTotal,
      companyEarning,
    });
  };

  useEffect(() => {
    if (data) {
      setBasePremium(data?.basePremium);
      setPolicyTerm(data?.payTerm);
      setBaseRate(data?.baseRate || 0);
      setRenewalRates(data?.renewalRates || null);
      setSalesFirstYearRate(data?.salesFirstYearRate || 0);
      setSalesRenewalRate(data?.salesRenewalRate || null);
      setRewardRate(data?.rewardRate || 0);

      let newRiders = data?.riders?.map((value) => ({
        ...value,
        name: value?.riderName,
        premium: value?.riderPremium,
        term: value?.riderPayTerm,
        baseRate: value?.baseRate || null,
        rewardRate: value?.rewardRate || null,
        renewalRates: value?.renewalRates || "",
      }));
      setRiders(newRiders);

      if (!result) {
        setResult({
          firstYearCommission: 0,
          totalRenewalCommission: 0,
          totalCommission: 0,
          salesTotal: 0,
          companyEarning: 0,
        });
      }
    }
  }, [data]);

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      renewalRates: renewalRates || null,
      rewardRate: rewardRate || 0,
      salesFirstYearRate: salesFirstYearRate || 0,
      salesRenewalRate: salesRenewalRate || null,
      baseRate: baseRate || 0,
      riders: riders || [],
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (data?.id) {
      fetch(
        `https://db.enivesh.com/firestore/single/life_insurance_policies/${data?.id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          setIsEdit(false);
        })
        .catch((error) => console.error(error));
    } else {
      alert("All Field Required");
    }
  };
  useEffect(() => {
    if (baseRate && salesFirstYearRate) {
      setTimeout(() => {
        calculateCommission();
      }, 2000);
    }
  }, [location?.search]);

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={{ xs: 12 }}>
        <HeadlineTag title={"Commission Expanses"}>
          {isEdit ? (
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: 10 }}
              color="info"
              onClick={() => handleSubmit()}
            >
              Update{" "}
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: 10 }}
              color="inherit"
              onClick={() => setIsEdit(true)}
            >
              Edit{" "}
            </Button>
          )}
          {isEdit && (
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: 10 }}
              color="error"
              onClick={() => setIsEdit(false)}
            >
              Cancel{" "}
            </Button>
          )}
        </HeadlineTag>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Paper sx={{ p: 1 }} variant="outlined">
          <Grid2 container spacing={1} p={2}>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Base Premium (₹) (Not Changed)"
                type="number"
                focused
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Base Premium"
                size="small"
                color="info"
                value={basePremium}
                onChange={(e) => setBasePremium(parseFloat(e.target.value))}
                variant="standard"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Pay Term (Years) (Not Changed)"
                type="number"
                focused
                value={policyTerm}
                color="info"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
                placeholder="Policy Term"
                onChange={(e) => setPolicyTerm(parseInt(e.target.value))}
                variant="standard"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label={`Company - Renewal Rates % `}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: !isEdit,
                  },
                }}
                placeholder="Ex. 0,0,0,0..."
                value={renewalRates?.split(",").slice(0, policyTerm - 1)}
                onChange={(e) => setRenewalRates(e.target.value)}
                variant="standard"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Company - 1st Year (%)"
                type="number"
                value={baseRate}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: !isEdit,
                  },
                }}
                placeholder="Ex. 0"
                onChange={(e) => setBaseRate(parseFloat(e.target.value))}
                variant="standard"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Reward Rate (%)"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: !isEdit,
                  },
                }}
                placeholder="Ex. 0"
                value={rewardRate}
                onChange={(e) => setRewardRate(parseFloat(e.target.value))}
                variant="standard"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Sales - 1st Year (%)"
                type="number"
                value={salesFirstYearRate}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: !isEdit,
                  },
                }}
                placeholder="Ex. 0"
                onChange={(e) =>
                  setSalesFirstYearRate(parseFloat(e.target.value))
                }
                variant="standard"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Sales - Renewal (%)"
                value={salesRenewalRate?.split(",").slice(0, policyTerm - 1)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: !isEdit,
                  },
                }}
                placeholder="Ex. 0,0,0,0..."
                onChange={(e) => setSalesRenewalRate(e.target.value)}
                variant="standard"
              />
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Paper sx={{ p: 1 }} variant="outlined">
          <Box mb={2}>
            {" "}
            <HeadlineTag
              position={"space-between"}
              iconHide={true}
              title={` ➕ Riders (${riders?.length})`}
            />
          </Box>
          {riders.map((rider, index) => (
            <Grid2
              container
              spacing={3}
              alignItems="center"
              key={index}
              sx={{ mb: 2 }}
            >
              <Grid2 size={{ xs: 2 }}>
                <TextField
                  size="small"
                  label="Name"
                  value={rider.name}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  placeholder="name"
                  focused
                  color="info"
                  onChange={(e) =>
                    handleRiderChange(index, "name", e.target.value)
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 size={{ xs: 2 }}>
                <TextField
                  size="small"
                  label="Premium"
                  focused
                  color="info"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      readOnly: true,
                    },
                  }}
                  placeholder="Ex. 0"
                  type="number"
                  value={rider.premium}
                  onChange={(e) =>
                    handleRiderChange(index, "premium", e.target.value)
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 size={{ xs: 1.5 }}>
                <TextField
                  size="small"
                  label="Term"
                  type="number"
                  focused
                  color="info"
                  value={rider.term}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      readOnly: true,
                    },
                  }}
                  placeholder="Ex. 0"
                  onChange={(e) =>
                    handleRiderChange(index, "term", e.target.value)
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 size={{ xs: 2 }}>
                <TextField
                  size="small"
                  label="Base %"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      readOnly: !isEdit,
                    },
                  }}
                  placeholder="Ex. 0"
                  value={rider.baseRate}
                  onChange={(e) =>
                    handleRiderChange(index, "baseRate", e.target.value)
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 size={{ xs: 1.5 }}>
                <TextField
                  size="small"
                  label="Reward %"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      readOnly: !isEdit,
                    },
                  }}
                  placeholder="Ex. 0"
                  type="number"
                  value={rider.rewardRate}
                  onChange={(e) =>
                    handleRiderChange(index, "rewardRate", e.target.value)
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 size={{ xs: 2.5 }}>
                <TextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      readOnly: !isEdit,
                    },
                  }}
                  placeholder="Ex. 0,0,0,..."
                  size="small"
                  label="Renewal Rates %"
                  value={rider.renewalRates
                    ?.split(",")
                    .slice(0, rider?.term - 1)}
                  onChange={(e) =>
                    handleRiderChange(index, "renewalRates", e.target.value)
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid2>
            </Grid2>
          ))}
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Box m={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => calculateCommission()}
            size="large"
          >
            🚀 Calculate Commission
          </Button>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Paper sx={{ p: 1 }} variant="outlined">
          <HeadlineTag title={"📊 Summary"} iconHide size={"small"} />
          <Grid2 container spacing={2} my={2}>
            <Grid2 size={{ xs: 12, sm: 2.2 }}>
              <TransparentBox
                fontSize={14}
                fontWeight={600}
                value={result?.firstYearCommission.toFixed(2)}
                caption={"🟢 First Year"}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.2 }}>
              <TransparentBox
                fontSize={14}
                fontWeight={600}
                value={result?.totalRenewalCommission.toFixed(2)}
                caption={" 🔁 Renewals"}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.2 }}>
              <TransparentBox
                fontSize={14}
                fontWeight={600}
                value={result?.totalCommission.toFixed(2)}
                caption={" 💰 Total Commission"}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.2 }}>
              <TransparentBox
                fontSize={14}
                fontWeight={600}
                value={result?.salesTotal?.toFixed(2)}
                caption={" 👤 Sales Payout"}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.5 }}>
              <TransparentBox
                fontSize={14}
                fontWeight={600}
                rgbColor="rgb(40, 151, 9)"
                value={result?.companyEarning.toFixed(2)}
                caption={"  🏢 Company Earnings"}
              />
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Paper sx={{ p: 1 }} variant="outlined">
          <HeadlineTag title={"📅 Yearly Breakdown"} iconHide size={"small"} />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "primary.dark", fontWeight: 600 }}>
                  Year
                </TableCell>
                <TableCell sx={{ color: "primary.dark", fontWeight: 600 }}>
                  Company + Riders(₹)
                </TableCell>
                <TableCell sx={{ color: "primary.dark", fontWeight: 600 }}>
                  Sales Payout (₹)
                </TableCell>
                <TableCell sx={{ color: "primary.dark", fontWeight: 600 }}>
                  Total Commission (₹)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commissionDetails.map((row) => (
                <TableRow key={row.year}>
                  <TableCell sx={{ color: "error.dark", fontWeight: 600 }}>
                    {row.year}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(row.policy || 0)}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(row.sales || 0)}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(row.policy + row.sales || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid2>
    </Grid2>
  );
}

const ValidateInputLength = (value = "1,3,4,5,5,5,7", length = 5) => {
  const valuesArray = value.split(","); // Convert string to array
  return valuesArray.length === length;
};
