import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import InputWithValidation from "../../../forms/components/InputWithValidation"; // Ensure this path is correct
import HeadlineTag from "../../../options/HeadlineTag";

import { Add, ArrowBack, Close } from "@mui/icons-material";
import axios from "axios";
import { firestore } from "../../../../firebase/config";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import useEncryptedSessionStorage from "../../../../hooks/useEncryptedSessionStorage";
import { useNavigate } from "react-router-dom";

const fetchData = async (id) => {
  try {
    const response = await axios.get(
      `https://db.enivesh.com/firestore/single/crm_clients/${id}`,
      {
        headers: {
          "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const formKey = {
  cin: "",
  riders: [],
  proposerName: "",
  lifeAssured: "",
  min: "",
  policyNumber: "",
  startDate: "",
  plan: "",
  payTerm: "",
  policyTerm: "",
  basePremium: 0,
  discount: 0,
  withGstPremium: 0,
  gst2ndyearonward: 0,
  paymentMode: "",
  sumAssured: "",
  company: "",
  counterOffer: "",
  frequencyPayment: "",
  renewalDate: "",
  maturityDate: "",
  policyType: "",
  surrenderValue: "",
  maturityValue: "",
  paidUpValue: "",
  expectedReturn: "",
  commentFromClient: "",
  commentFromRm: "",
  action: "",
  sourcing: "",
  leadSource: "",
  srm: "",
  insurancePlanner: "",
};
const LForm = () => {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [lfm, setLFM] = useEncryptedSessionStorage("lfm", { ...formKey });
  const [fetchedLFM, setFetchedLFM] = useEncryptedSessionStorage("fe-lfm", {});
  const [isSuggested, setIsSuggested] = useState(false);
  const [rider, setRider] = useState({
    riderGst: 18,
    riderName: "",
    riderPayTerm: "",
    riderPolicyTerm: "",
    riderPremium: "",
  });
  const [totalRiderPremium, setTotalRiderPremium] = useState({
    trPremium: 0,
    trPremiumWithGST: 0,
    tgst: 0,
  });
  const [formData, setFormData] = useState({ ...formKey });

  const [isFetchedUser, setIsFetchedUser] = useState(null);
  const [members, setMembers] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === "renewalDate") {
      setIsSuggested(false);
    }
    if (field === "proposerName") {
      if (field.length >= 4) {
        searchByName();
      }
    }
  };

  const handleValidation = (field, error) => {
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    const myHeaders = new Headers();

    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      collectionName: "life_insurance_policies",
      docId: formData?.policyNumber,
      data: {
        ...formData,
        branch: isFetchedUser?.branch,
        clientType: isFetchedUser?.clientType,
        panNumber: isFetchedUser?.panNumber,
        primaryNumber: isFetchedUser?.primaryNumber,
        gender: isFetchedUser?.gender,
        dob: isFetchedUser?.dob,
        email: isFetchedUser?.email,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (formData?.cin && formData?.proposerName && formData?.policyNumber) {
      fetch(`https://db.enivesh.com/firestore/set`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert("Added");
          setFormData({ ...formKey });
          setRiders([]);
          setIsFetchedUser(null);
          setLFM({ ...formKey });
          setFetchedLFM(null);
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please fill all fields before submitting.");
    }
  };
  const hndleRider = (field, value) => {
    setRider({ ...rider, [field]: value });
  };

  const handleAddRider = () => {
    if (
      rider?.riderName &&
      rider?.riderPayTerm &&
      rider?.riderPolicyTerm &&
      rider?.riderPremium
    ) {
      setRiders((prevRiders) => [...prevRiders, { ...rider }]);
      setRider({
        riderGst: 18,
        riderName: "",
        riderPayTerm: "",
        riderPolicyTerm: "",
        riderPremium: "",
      });
    } else {
      alert("Please fill all rider fields before adding.");
    }
  };

  const handleRemoveRider = (index) => {
    setRiders((prevRiders) => prevRiders.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const calculateRiderPremium = () => {
      if (riders?.length > 0) {
        const sum = riders.reduce(
          (accumulator, item) =>
            accumulator + parseInt(item?.riderPremium || 0),
          0
        );
        setTotalRiderPremium({
          trPremium: sum,
          trPremiumWithGST: parseFloat(sum * 1.18).toFixed(2),
          tgst: parseFloat(sum * 0.18).toFixed(2),
        });
      } else {
        setTotalRiderPremium({
          trPremium: 0,
          trPremiumWithGST: 0,
          tgst: 0,
        });
      }
    };
    setFormData({ ...formData, riders: riders });

    calculateRiderPremium();
  }, [riders]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (formData?.cin && !isFetchedUser) {
        const user = await fetchData(formData?.cin);

        if (user) {
          setIsFetchedUser(user);
          setFormData((prevData) => ({
            ...prevData,
            proposerName: user?.firmName || `${user?.fname} ${user?.lname}`,
          }));
          const familyList = flattenData(user?.members?.children || []);
          setMembers([
            {
              name: user?.fname
                ? `${user?.fname} ${user?.lname}`
                : `${isFetchedUser?.fname} ${isFetchedUser?.lname}` || "",
              id: 0,
              self: true,
              attributes: {
                min: user?.cin || isFetchedUser?.cin,
                gender: user?.gender || isFetchedUser?.gender,
              },
            },
            ...familyList,
          ]);
        } else {
          setMembers([]);
        }
      } else if (isFetchedUser) {
        if (isFetchedUser) {
          setFormData((prevData) => ({
            ...prevData,
            proposerName:
              isFetchedUser?.firmName ||
              `${isFetchedUser?.fname} ${isFetchedUser?.lname}`,
          }));
          const familyList = flattenData(
            isFetchedUser?.members?.children || []
          );
          setMembers([
            {
              name:
                isFetchedUser?.fname ||
                `${isFetchedUser?.fname} ${isFetchedUser?.lname}` ||
                "",
              id: 0,
              self: true,
              attributes: {
                min: isFetchedUser?.cin,
                gender: isFetchedUser?.gender,
              },
            },
            ...familyList,
          ]);
        } else {
          setMembers([]);
        }
      }
    };

    setTimeout(() => {
      fetchUserData();
    }, 300);
  }, [formData?.cin, isFetchedUser]);

  useEffect(() => {
    if (formData?.lifeAssured) {
      const matchedMember = members?.find(
        (item) => item?.name === formData?.lifeAssured
      );
      setFormData((prevData) => ({
        ...prevData,
        min: matchedMember?.attributes?.min || "",
      }));
    }
  }, [formData?.lifeAssured, members]);

  useEffect(() => {
    if (formData?.startDate) {
      setIsSuggested(true);
      const [y, m, d] = formData?.startDate?.split("-");
      const renewDate = `${parseInt(y) + 1}-${m}-${d}`;
      setFormData((prevData) => ({ ...prevData, renewalDate: renewDate }));
    }
  }, [formData?.startDate]);

  const calculateFinalPremium = (
    basePremiumWithGST = 0,
    totalRiderPremiumWithGST = 0
  ) => {
    return parseFloat(
      parseFloat(basePremiumWithGST) + parseFloat(totalRiderPremiumWithGST)
    ).toFixed(2);
  };

  const [results, setResults] = useState([]);

  const searchByName = async (e) => {
    try {
      const usersRef = collection(firestore, "crm_clients");
      const q = query(
        usersRef,
        orderBy("fname"),
        startAt(formData?.proposerName),
        endAt(formData?.proposerName + "\uf8ff")
      );

      const snapshot = await getDocs(q);
      const searchResults = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(searchResults);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // auto save chache
  const [isFormClear, serIsFormClear] = useState(false);
  useEffect(() => {
    if (formData?.cin && isFetchedUser) {
      setLFM({ ...formData });
      setFetchedLFM({ ...isFetchedUser });
    }
    if (!formData?.cin) {
      if (lfm?.cin) {
        setFormData(lfm);
        setIsFetchedUser(fetchedLFM);
        setRiders(lfm?.riders || []);
      }
    }
  }, [isFormClear, formData]);

  const handeleFormClear = () => {
    setLFM({ ...formKey });
    setFetchedLFM(null);
    setFormData({ ...formKey });
    setRiders([]);
    setIsFetchedUser(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: { xs: 0, sm: 1, md: 3 } }}
    >
      <HeadlineTag
        position={"space-between"}
        textAlign={"center"}
        title={" Life Insurance Form"}
        my={1}
      >
        <Button
          color="inherit"
          startIcon={<ArrowBack fontSize="10px" />}
          sx={{ fontSize: 10 }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          title="You Lost All Data"
          onClick={() => handeleFormClear()}
          sx={{ fontSize: 10 }}
          variant="outlined"
          color="error"
        >
          Clear Data
        </Button>
      </HeadlineTag>
      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <HeadlineTag
          variant="caption"
          textAlign={"center"}
          iconColor={"#00aeff"}
        >
          Personal Details
        </HeadlineTag>

        <Grid2 container spacing={2} mt={1}>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <InputWithValidation
              label="CIN"
              value={formData.cin}
              onChange={(value) => handleChange("cin", value)}
              onValidate={(error) => handleValidation("cin", error)}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} position={"relative"}>
            <InputWithValidation
              label="Proposer Name"
              value={formData.proposerName}
              onChange={(value) => handleChange("proposerName", value)}
              onValidate={(error) => handleValidation("proposerName", error)}
              required
            />

            <Box
              position={"absolute"}
              width={"100%"}
              display={results?.length > 0 ? "block" : "none"}
              height={200}
              bgcolor={(theme) => theme?.palette.background.paper}
              zIndex={99}
              borderRadius={1}
              overflow={"hidden"}
              border={"1px solid #000"}
              sx={{ overflowY: "auto" }}
              p={1}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {results?.map((value) => (
                  <ListItem sx={{ p: 0 }} key={value} disableGutters>
                    <ListItemButton
                      onClick={() => {
                        setFormData({
                          ...formData,
                          proposerName: `${value?.fname} ${value?.lname}`,
                          cin: value?.cin,
                        });
                        setIsFetchedUser(value);
                        setResults([]);
                      }}
                      sx={{ p: 0, px: 2, textTransform: "capitalize" }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 12 }}
                        primary={`${value?.cin} - ${value?.fname} ${value?.lname}`}
                        secondary={`${value?.clientType
                          ?.split("-")
                          ?.join(" ")} `}
                        secondaryTypographyProps={{ fontSize: 8 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Life Assured"
              value={formData.lifeAssured}
              onChange={(value) => handleChange("lifeAssured", value)}
              onValidate={(error) => handleValidation("lifeAssured", error)}
              type="select"
              options={members || []}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="MIN"
              title={"Member Identification Number"}
              value={formData.min}
              onChange={(value) => handleChange("MIN", value)}
              onValidate={(error) => handleValidation("MIN", error)}
            />
          </Grid2>
        </Grid2>
      </Paper>
      {isFetchedUser && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 2,
            bgcolor: (theme) => theme.palette.background.default,
            border: "1px solid #eb7c3c",
          }}
        >
          <Grid2 container spacing={2} mt={1}>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography color="grey" variant="caption" component={"p"}>
                {isFetchedUser?.firmName ? "Firm Name" : "Name"}
              </Typography>
              <Typography
                textTransform={"capitalize"}
                variant="caption"
                component={"p"}
              >
                {isFetchedUser?.firmName ||
                  `${isFetchedUser?.fname} ${isFetchedUser?.lname}` ||
                  ""}
              </Typography>
            </Grid2>
            {isFetchedUser?.gender && (
              <Grid2 size={{ xs: 12, sm: 6, md: 1 }}>
                <Typography color="grey" variant="caption" component={"p"}>
                  Gender
                </Typography>
                <Typography
                  color=""
                  textTransform={"capitalize"}
                  variant="caption"
                  component={"p"}
                >
                  {`${isFetchedUser?.gender} `}
                </Typography>
              </Grid2>
            )}
            {isFetchedUser?.dob && (
              <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography color="grey" variant="caption" component={"p"}>
                  Date of Borth
                </Typography>
                <Typography color="" variant="caption" component={"p"}>
                  {`${isFetchedUser?.dob} `}
                </Typography>
              </Grid2>
            )}
            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography color="grey" variant="caption" component={"p"}>
                Phone
              </Typography>
              <Typography color="" variant="caption" component={"p"}>
                {`${isFetchedUser?.primaryNumber} `}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography color="grey" variant="caption" component={"p"}>
                Client Type
              </Typography>
              <Typography
                textTransform={"capitalize"}
                color=""
                variant="caption"
                component={"p"}
              >
                {`${isFetchedUser?.clientType?.split("-")?.join(" ")} `}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography color="grey" variant="caption" component={"p"}>
                Email
              </Typography>
              <Typography
                textTransform={"capitalize"}
                color=""
                variant="caption"
                component={"p"}
              >
                {`${isFetchedUser?.email} `}
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      )}

      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <HeadlineTag
          variant="caption"
          textAlign={"center"}
          my={1}
          iconColor={"#00aeff"}
        >
          Policy Details
        </HeadlineTag>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Policy Number"
              value={formData.policyNumber}
              onChange={(value) => handleChange("policyNumber", value)}
              onValidate={(error) => handleValidation("policyNumber", error)}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Start Date"
              value={formData.startDate}
              onChange={(value) => handleChange("startDate", value)}
              onValidate={(error) => handleValidation("startDate", error)}
              type="date"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Plan"
              value={formData.plan}
              onChange={(value) => handleChange("plan", value)}
              onValidate={(error) => handleValidation("plan", error)}
              type="text"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Pay Term"
              value={formData.payTerm}
              onChange={(value) => handleChange("payTerm", value)}
              onValidate={(error) => handleValidation("payTerm", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Policy Term"
              value={formData.policyTerm}
              onChange={(value) => handleChange("policyTerm", value)}
              onValidate={(error) => handleValidation("policyTerm", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Base Premium"
              value={formData.basePremium}
              onChange={(value) => handleChange("basePremium", value)}
              onValidate={(error) => handleValidation("basePremium", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Discount (%)"
              value={formData.discount}
              onChange={(value) => handleChange("discount", value)}
              onValidate={(error) => handleValidation("discount", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label=" GST (%)"
              value={formData.withGstPremium}
              onChange={(value) => handleChange("withGstPremium", value)}
              onValidate={(error) => handleValidation("withGstPremium", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label=" GST 2nd (%)"
              title={"GST 2nd year onwards"}
              value={formData.gst2ndyearonward}
              onChange={(value) => handleChange("gst2ndyearonward", value)}
              onValidate={(error) =>
                handleValidation("gst2ndyearonward", error)
              }
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Payment Mode"
              value={formData.paymentMode}
              onChange={(value) => handleChange("paymentMode", value)}
              onValidate={(error) => handleValidation("paymentMode", error)}
              type="select"
              options={[
                {
                  value: "ECS-Auto-Debit",
                  label: "ECS - Auto Debit",
                },
                {
                  value: "Cash/Cheque",
                  label: "Cash / Cheque",
                },
              ]}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Sum Assured"
              value={formData.sumAssured}
              onChange={(value) => handleChange("sumAssured", value)}
              onValidate={(error) => handleValidation("sumAssured", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Company"
              value={formData.company}
              onChange={(value) => handleChange("company", value)}
              onValidate={(error) => handleValidation("company", error)}
              type="select"
              options={[
                {
                  label: "HDFC Life",
                  value: "HDFC Life",
                },
                {
                  name: "ICICI Prudential Life",
                  value: "ICICI Prudential Life",
                },
                {
                  label: "Max Life",
                  value: "Max Life",
                },
                {
                  label: "Bajaj Allianz Life",
                  value: "Bajaj Allianz Life",
                },
                {
                  name: "PNB Metlife ",
                  value: "PNB Metlife ",
                },
                {
                  label: "LIC",
                  value: "LIC",
                },
              ]}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Counter Offer"
              value={formData.counterOffer}
              onChange={(value) => handleChange("counterOffer", value)}
              onValidate={(error) => handleValidation("counterOffer", error)}
              type="select"
              options={[
                {
                  value: "yes",
                  label: "Yes",
                },
                {
                  value: "no",
                  label: "No",
                },
              ]}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Frequency Payment"
              value={formData.frequencyPayment}
              onChange={(value) => handleChange("frequencyPayment", value)}
              onValidate={(error) =>
                handleValidation("frequencyPayment", error)
              }
              type="select"
              options={[
                {
                  value: "monthly",
                  label: "Monthly",
                },
                {
                  value: "quarterly",
                  label: "Quarterly",
                },
                {
                  value: "half-yearly",
                  label: "Half-Yearly",
                },
                {
                  value: "Annually",
                  label: "Annually",
                },
              ]}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Renewal Date "
              value={formData?.renewalDate}
              onChange={(value) => handleChange("renewalDate", value)}
              onValidate={(error) => handleValidation("renewalDate", error)}
              suggested={isSuggested}
              type="date"
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Maturity Date"
              value={formData.maturityDate}
              onChange={(value) => handleChange("maturityDate", value)}
              onValidate={(error) => handleValidation("maturityDate", error)}
              type="date"
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Policy Type"
              value={formData.policyType}
              onChange={(value) => handleChange("policyType", value)}
              onValidate={(error) => handleValidation("policyType", error)}
              type="select"
              options={[
                {
                  value: "ULIP Plans",
                  label: "ULIP Plans",
                },
                {
                  value: "TULIP Plans",
                  label: "TULIP Plans",
                },
                { value: "Term Plan", label: "Term Plan" },
                { value: "Pension Plans", label: "Pension Plans" },
                { value: "Traditional Plans", label: "Traditional Plans" },
              ]}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Surrender Value"
              value={formData.surrenderValue}
              onChange={(value) => handleChange("surrenderValue", value)}
              onValidate={(error) => handleValidation("surrenderValue", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Maturity Value"
              value={formData.maturityValue}
              onChange={(value) => handleChange("maturityValue", value)}
              onValidate={(error) => handleValidation("maturityValue", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Paid Up Value"
              value={formData.paidUpValue}
              onChange={(value) => handleChange("paidUpValue", value)}
              onValidate={(error) => handleValidation("paidUpValue", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Expected Return"
              value={formData.expectedReturn}
              onChange={(value) => handleChange("expectedReturn", value)}
              onValidate={(error) => handleValidation("expectedReturn", error)}
              type="number"
            />
          </Grid2>
        </Grid2>
      </Paper>
      {/* ======================Rider=====================================================Rider========================================== */}
      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <HeadlineTag
          variant="caption"
          textAlign={"center"}
          my={1}
          iconColor={"#00aeff"}
          position={"space-between"}
          title={" Rider Details"}
          flexWrap={"wrap"}
        >
          <Grid2 container spacing={1} width={"100%"} wrap="wrap-reverse">
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              <Button
                variant="outlined"
                sx={{ fontSize: 12 }}
                color="info"
                size="small"
                startIcon={<Add fontSize="10px" />}
                onClick={() => handleAddRider()}
              >
                Add Rider
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              {" "}
              <Typography variant="caption" title="Rider GST">
                Rider GST :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {" "}
                  18%
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              {" "}
              <Typography
                variant="caption"
                title="Total Rider Premium with GST"
              >
                T.R.Premium + GST :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {" "}
                  &#x20B9; {totalRiderPremium?.trPremiumWithGST}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              {" "}
              <Typography variant="caption" title="Total Rider Premium">
                T.R.Premium :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {" "}
                  &#x20B9; {totalRiderPremium?.trPremium}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              {" "}
              <Typography variant="caption" title="Total GST Amount">
                Total GST Amount :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {" "}
                  &#x20B9; {totalRiderPremium?.tgst}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
              {" "}
              <Typography variant="caption">
                Total R. :{" "}
                <Typography variant="caption" color="info">
                  {" "}
                  {riders?.length}
                </Typography>
              </Typography>
            </Grid2>
          </Grid2>
        </HeadlineTag>
        {riders?.map((rider, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              gap: 2,
              alignItems: "center",
              border: "1px solid #339b1e",
              bgcolor: (theme) => theme.palette.background.default,
              borderRadius: 1,
            }}
          >
            <Button
              size="small"
              onClick={() => handleRemoveRider(index)}
              variant="text"
              startIcon={<Close fontSize="10px" />}
              color="error"
            >
              {index + 1}
            </Button>
            <Grid2 container spacing={2} mt={2} width={"100%"}>
              <Grid2 size={{ xs: 6, sm: 3, md: 3 }}>
                <InputWithValidation
                  readOnly={true}
                  label="Rider Name"
                  value={rider?.riderName}
                  onChange={(value) => hndleRider("riderName", value)}
                  onValidate={(error) => handleValidation("riderName", error)}
                  type="text"
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 3, md: 3 }}>
                <InputWithValidation
                  label="Rider Pay Term"
                  readOnly={true}
                  value={rider?.riderPayTerm}
                  onChange={(value) => hndleRider("riderPayTerm", value)}
                  onValidate={(error) =>
                    handleValidation("riderPayTerm", error)
                  }
                  type="text"
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 3, md: 3 }}>
                <InputWithValidation
                  label="Rider Policy Term"
                  readOnly={true}
                  value={rider?.riderPolicyTerm}
                  onChange={(value) => hndleRider("riderPolicyTerm", value)}
                  onValidate={(error) =>
                    handleValidation("riderPolicyTerm", error)
                  }
                  type="text"
                />
              </Grid2>

              <Grid2 size={{ xs: 6, sm: 3, md: 3 }}>
                <InputWithValidation
                  label="Rider Premium"
                  readOnly={true}
                  value={rider?.riderPremium}
                  onChange={(value) => hndleRider("riderPremium", value)}
                  onValidate={(error) =>
                    handleValidation("riderPremium", error)
                  }
                  type="number"
                />
              </Grid2>
            </Grid2>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            gap: 2,
            p: 2,
            position: "relative",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            position={"absolute"}
            bottom={-1}
            left={20}
            fontSize={8}
            color="error"
            fontWeight={600}
          >
            Not add in Rider List
          </Typography>
          <Grid2 container spacing={2} mt={2} width={"100%"}>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Rider Name"
                value={rider?.riderName}
                onChange={(value) => hndleRider("riderName", value)}
                onValidate={(error) => handleValidation("riderName", error)}
                type="text"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Rider Pay Term"
                value={rider?.riderPayTerm}
                onChange={(value) => hndleRider("riderPayTerm", value)}
                onValidate={(error) => handleValidation("riderPayTerm", error)}
                type="number"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Rider Policy Term"
                value={rider?.riderPolicyTerm}
                onChange={(value) => hndleRider("riderPolicyTerm", value)}
                onValidate={(error) =>
                  handleValidation("riderPolicyTerm", error)
                }
                type="number"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Rider Premium"
                value={rider?.riderPremium}
                onChange={(value) => hndleRider("riderPremium", value)}
                onValidate={(error) => handleValidation("riderPremium", error)}
                type="number"
              />
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
      {/* =========================================================================Final Amount========================================================= */}
      <Paper
        elevation={0}
        sx={{ p: 2, mt: 2, bgcolor: (theme) => theme.palette.background.paper }}
      >
        <HeadlineTag title={"Final Amount"} iconColor={"#00aaff"} />
        <Grid2 container spacing={2} mt={1}>
          <Grid2
            size={{ xs: 12, sm: 6, md: 2.4 }}
            bgcolor={(theme) => theme?.palette.background.default}
            p={1}
            borderRadius={1}
          >
            <HeadlineTag
              size={"small"}
              titleColor={"#4cbc07"}
              iconColor={"#4cbc07"}
              title={"Base + Discount"}
            />
            <Typography
              variant="caption"
              component={"p"}
              title="Base Premium"
              color="grey"
            >
              Base Premium :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9; {parseFloat(formData?.basePremium || 0).toFixed(2)}
              </Typography>
            </Typography>
            {/* step2 */}
            <Typography
              variant="caption"
              color="info"
              component={"p"}
              mt={2}
              title="Discount"
            >
              Discount Amount ({formData?.discount}%) :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  parseFloat(formData?.basePremium) *
                    (formData?.discount / 100) || 0
                ).toFixed(2)}
              </Typography>
            </Typography>
            {/* stap -3 =============== */}
            <Typography mt={2} variant="caption" component={"p"}>
              Discounted Base Premium :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  formData?.basePremium -
                    (formData?.basePremium * formData?.discount) / 100 ||
                    formData?.basePremium ||
                    0
                ).toFixed(2)}
              </Typography>
            </Typography>
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 6, md: 2.4 }}
            bgcolor={(theme) => theme?.palette.background.default}
            p={1}
            borderRadius={1}
          >
            <HeadlineTag
              size={"small"}
              titleColor={"#cc0ef7"}
              iconColor={"#cc0ef7"}
              title={"Base + Discount + GST"}
            />
            <Typography
              variant="caption"
              component={"p"}
              title="Discounted Premium"
            >
              Base Premium + Discount ({formData?.discount}%) :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  formData?.basePremium -
                    (formData?.basePremium * formData?.discount) / 100 ||
                    formData?.basePremium ||
                    0
                ).toFixed(2)}
              </Typography>
            </Typography>

            <Typography
              variant="caption"
              mt={2}
              component={"p"}
              title="GST Amount"
            >
              GST Amount ({formData?.withGstPremium}%) :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  formData?.basePremium * (formData?.withGstPremium / 100) || 0
                ).toFixed(2)}
              </Typography>
            </Typography>

            <Typography variant="caption" component={"p"} mt={2}>
              Base Premium + GST ({formData?.withGstPremium}%):{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  formData?.basePremium -
                    (formData?.basePremium * formData?.discount) / 100 +
                    formData?.basePremium * (formData?.withGstPremium / 100) ||
                    formData?.basePremium -
                      (formData?.basePremium * formData?.discount) / 100 ||
                    formData?.basePremium ||
                    0
                ).toFixed(2)}
              </Typography>
            </Typography>
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 6, md: 2.4 }}
            bgcolor={(theme) => theme?.palette.background.default}
            p={1}
            borderRadius={1}
          >
            <HeadlineTag
              size={"small"}
              titleColor={"#03c6d4"}
              iconColor={"#03c6d4"}
              title={"Base + Discount + GST + Riders"}
            />
            <Typography
              variant="caption"
              component={"p"}
              title="Total Rider Premium"
            >
              Tatal Rider :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9; {totalRiderPremium?.trPremium}
              </Typography>
            </Typography>

            <Typography
              variant="caption"
              component={"p"}
              mt={2}
              title="Total GST Amount"
            >
              GST Amount (18%):{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9; {totalRiderPremium?.tgst}
              </Typography>
            </Typography>
            <Typography
              variant="caption"
              component={"p"}
              mt={2}
              title="Total Rider Premium + GST Amount"
            >
              Total Rider Premium + GST(18%):{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9; {totalRiderPremium?.trPremiumWithGST}
              </Typography>
            </Typography>
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 6, md: 2.4 }}
            bgcolor={(theme) => theme?.palette.background.default}
            p={1}
            borderRadius={1}
          >
            <HeadlineTag
              size={"small"}
              titleColor={"#ff5c00"}
              title={"First Year"}
            />
            <Typography
              variant="caption"
              component={"p"}
              title={`  Base Premium + GST(${formData?.withGstPremium || 0}%) `}
            >
              Base Premium + GST({formData?.withGstPremium}%) :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  formData?.basePremium -
                    (formData?.basePremium * formData?.discount) / 100 +
                    formData?.basePremium * (formData?.withGstPremium / 100) ||
                    formData?.basePremium -
                      (formData?.basePremium * formData?.discount) / 100 ||
                    formData?.basePremium ||
                    0
                ).toFixed(2)}
              </Typography>
            </Typography>

            <Typography
              variant="caption"
              component={"p"}
              mt={2}
              title="  Total Rider Premium + GST(18%)"
            >
              Total Rider Premium + GST(18%) :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9; {totalRiderPremium?.trPremiumWithGST}
              </Typography>
            </Typography>

            <Typography
              variant="caption"
              component={"p"}
              mt={2}
              title="Final Premium"
            >
              Final Premium :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {calculateFinalPremium(
                  formData?.basePremium -
                    (formData?.basePremium * formData?.discount) / 100 +
                    formData?.basePremium * (formData?.withGstPremium / 100) ||
                    formData?.basePremium ||
                    0,
                  totalRiderPremium?.trPremiumWithGST
                )}
              </Typography>
            </Typography>
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 6, md: 2.4 }}
            bgcolor={(theme) => theme?.palette.background.default}
            p={1}
            borderRadius={1}
          >
            <HeadlineTag
              size={"small"}
              titleColor={"#006eff"}
              iconColor={"#006eff"}
              title={"2nd Year Onwards"}
            />
            <Typography
              variant="caption"
              component={"p"}
              title=" Base Premium + GST 2nd years onwards"
            >
              Base Premium + GST ({formData?.gst2ndyearonward}%) 2nd :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {parseFloat(
                  parseFloat(formData?.basePremium) +
                    formData?.basePremium *
                      (formData?.gst2ndyearonward / 100) ||
                    formData?.basePremium ||
                    0
                ).toFixed(2)}
              </Typography>
            </Typography>

            <Typography
              variant="caption"
              component={"p"}
              mt={2}
              title="Total Rider Premium + GST(18%)"
            >
              Total Rider Premium + GST(18%) :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9; {totalRiderPremium?.trPremiumWithGST}
              </Typography>
            </Typography>

            <Typography
              variant="caption"
              component={"p"}
              mt={2}
              title=" 2nd Year onwards Final Premium"
            >
              2nd Final Premium :{" "}
              <Typography
                variant="caption"
                component={"p"}
                fontWeight={600}
                color="success"
              >
                {" "}
                &#x20B9;{" "}
                {calculateFinalPremium(
                  parseFloat(formData?.basePremium) +
                    formData?.basePremium *
                      (formData?.gst2ndyearonward / 100) ||
                    parseFloat(formData?.basePremium) ||
                    0,
                  totalRiderPremium?.trPremiumWithGST || 0
                )}
              </Typography>
            </Typography>
          </Grid2>
        </Grid2>
      </Paper>
      {/* //comunication */}
      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <HeadlineTag
          variant="caption"
          textAlign={"center"}
          my={1}
          iconColor={"#00aeff"}
        >
          Communication Details
        </HeadlineTag>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <InputWithValidation
              label="Comment from Client"
              value={formData.commentFromClient}
              onChange={(value) => handleChange("commentFromClient", value)}
              onValidate={(error) =>
                handleValidation("commentFromClient", error)
              }
              type="text"
              multiline
              minRows={4}
              maxRows={4}
              maxChars={500}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <InputWithValidation
              label="Comment from RM "
              value={formData.commentFromRm}
              onChange={(value) => handleChange("commentFromRm", value)}
              onValidate={(error) => handleValidation("commentFromRm", error)}
              type="text"
              multiline
              maxRows={4}
              maxChars={500}
              minRows={4}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <InputWithValidation
              label="Action"
              value={formData.action}
              onChange={(value) => handleChange("action", value)}
              onValidate={(error) => handleValidation("action", error)}
              type="text"
              multiline
              maxRows={4}
              maxChars={500}
              minRows={4}
            />
          </Grid2>
        </Grid2>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <HeadlineTag
          variant="caption"
          textAlign={"center"}
          my={1}
          iconColor={"#00aeff"}
        >
          In House Details
        </HeadlineTag>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Sourcing"
              value={formData.sourcing}
              onChange={(value) => handleChange("sourcing", value)}
              onValidate={(error) => handleValidation("sourcing", error)}
              type="select"
              options={[
                {
                  value: "enivesh",
                  label: "Enivesh",
                },
                {
                  value: "non-enivesh",
                  label: "Non-Enivesh",
                },
              ]}
            />
          </Grid2>
          {formData?.sourcing !== "non-enivesh" && (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Lead Source"
                value={formData.leadSource}
                onChange={(value) => handleChange("leadSource", value)}
                onValidate={(error) => handleValidation("leadSource", error)}
                type="select"
                options={[
                  {
                    value: "client-reference",
                    label: "Client Reference",
                  },
                  {
                    value: "social-media",
                    label: "Social Media",
                  },
                  {
                    value: "website",
                    label: "Website",
                  },
                  {
                    value: "pos",
                    label: "POS",
                  },
                  {
                    value: "tele-calling",
                    label: "Tele Calling",
                  },
                  {
                    value: "others",
                    label: "Others",
                  },
                ]}
              />
            </Grid2>
          )}
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="SRM"
              value={formData.srm}
              onChange={(value) => handleChange("srm", value)}
              onValidate={(error) => handleValidation("srm", error)}
              type="text"
              title="Servicing Relationship Manager"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Insurance Planner"
              value={formData.insurancePlanner}
              onChange={(value) => handleChange("insurancePlanner", value)}
              onValidate={(error) =>
                handleValidation("insurancePlanner", error)
              }
              type="number"
            />
          </Grid2>
        </Grid2>
      </Paper>

      <Box m={2}>
        <Button type="submit" variant="outlined" color="info">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default LForm;

// Recursive function to flatten the data
const flattenData = (items) => {
  let flatArray = [];
  items?.forEach((item) => {
    // Sabse pehle current item ko add karein
    flatArray.push({ ...item, children: undefined }); // Agar aap children ko remove karna chahte hain
    // Agar item me children hai to unko recursively flatten karein
    if (item.children && item.children.length > 0) {
      flatArray = flatArray.concat(flattenData(item.children));
    }
  });
  return flatArray;
};
