import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
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
import { validate } from "uuid";

const formKey = {
  cin: "",
  proposer_name: "",
  policy_category: "",
  policy_category_plan: "",
  insured: [],
  policy_no: "",
  policy_at_start: "",
  start_date: "",
  policy_since: "",
  plan_name: "",
  cover_type: "",
  tenure: "",
  base_premium: 0,
  with_gst_premium: 0,
  payment_mode: "",
  sum_assured: "",
  company: "",
  frequency_payment: "",
  next_renewal_date: "",
  existing_illness: "",
  hurdles_at_claim: "",
  exclusion: "",
  comment_from_client: "",
  comment_from_rm: "",
  action: "",
  sourcing: "",
  lead_source: "",
  sourcing_enivesh_rm: "",
  sourcing_enivesh_officer: "",
  benifits: [],
  revenue: "",
  commission_statement: "",
  renewal_amount: "",
  client_expenses: "",
  partner_expenses: "",
  gst: 0,
  hurdlesat_claim: "",
  company_rm: [],
};
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

const groupOption = [
  {
    name: "Group Mediclaim",
    value: "Group Mediclaim",
  },
  {
    name: "Group Personal Accident",
    value: "Group Personal Accident",
  },
];
const retailOption = [
  {
    name: "Mediclaim",
    value: "Mediclaim",
  },
  {
    name: "Personal Accident",
    value: "Personal Accident",
  },
  {
    name: "Critical Illness",
    value: "Critical Illness",
  },
];

const sharedFields = [
  "policy_no",
  "start_date",
  "company",
  "sum_assured",
  "base_premium",
  "next_renewal_date",
  "frequency_payment",
  "payment_mode",
  "gst",
  "policy_status",
];

const fieldsByCategory = {
  "Critical Illness": [
    ...sharedFields,
    "policy_at_start",
    "policy_since",
    "plan_name",
    "cover_type",
    "tenure",
  ],
  Mediclaim: [
    ...sharedFields,
    "with_gst_premium",
    "policy_at_start",
    "policy_since",
    "plan_name",
    "cover_type",
    "tenure",
    "no_claim_bonus",
  ],
  "Personal Accident": [
    ...sharedFields,
    "policy_at_start",
    "policy_since",
    "plan_name",
    "cover_type",
    "tenure",
    "existing_illness",
  ],
  "Group Mediclaim": [
    ...sharedFields,
    "plan_type",
    "policy_documents",
    "end_date",
    "premium",
    "members_covered",
    "last_year_claim",
    "corporate_buffer",
  ],
  "Group Personal Accident": [
    ...sharedFields,
    "plan_type",
    "end_date",
    "premium",
    "plan",
  ],
};

const dateFields = [
  "start_date",
  "end_date",
  "next_renewal_date",
  "policy_since",
];
const numaricFields = ["base_premium", "gst", "sum_assured"];
const textArea = ["no_claim_bonus"];

const selectFields = {
  payment_mode: [
    { name: "ECS Auto Debit" },
    { name: "Cheque" },
    { name: "Cash" },
  ],
  company: [
    { name: "Care Health" },
    { name: "TATA AIG" },
    { name: "ICICI Lombard" },
    { name: "SBI General " },
    { name: "BAJAJ Allianz" },
    { name: "Niva Bupa" },
    { name: "Manipal Cigna" },
    { name: "HDFC ERGO" },
  ],
  plan_type: [
    { name: "Self Only" },
    { name: "Floater With Parents" },
    { name: "Floater Without Parents" },
  ],
  corporate_buffer: [{ name: "Yes" }, { name: "No" }],
  frequency_payment: [{ name: "Annual" }, { name: "Half-Yearly " }],
  tenure: [
    { name: "1 Year" },
    { name: "2 Year" },
    { name: "3 Year" },
    { name: "4 Year" },
    { name: "5 Year" },
  ],
  policy_at_start: [
    { name: "New" },
    { name: "Renewal" },
    { name: "Portibilty" },
  ],
  cover_type: [
    { name: "Individual " },
    { name: "Floater" },
    { name: "Multi-Individual" },
  ],
  policy_status: [
    { name: "Active" },
    { name: "Grace Period" },
    { name: "Lapsed" },
  ],
};

const Requred = [
  "policy_no",
  "start_date",
  "company",
  "sum_assured",
  "base_premium",
  "next_renewal_date",
  "frequency_payment",
  "payment_mode",
  "gst",
  "policy_status",
  "cover_type",
  "tenure",
  "plan_type",
  "premium",
  "end_date",
];

const HForm = () => {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [lfm, setLFM] = useEncryptedSessionStorage("hfm", null);
  const [fetchedLFM, setFetchedLFM] = useEncryptedSessionStorage(
    "fe-hfm",
    null
  );
  const [isSuggested, setIsSuggested] = useState(false);
  const [companyRM, setCompanyRM] = useState([]);
  const [companyRMData, setCompanyRMData] = useState({
    rm_contact: "",
    rm_email: "",
    rm_name: "",
    rm_service_type: "",
  });
  const [rider, setRider] = useState({
    added_benefits_premium: "",
    added_benefits: "",
  });
  const [totalRiderPremium, setTotalRiderPremium] = useState({
    tbPremium: 0,
    tbPremiumWithGST: 0,
    tgst: 0,
  });
  const [formData, setFormData] = useState(null);

  const [isFetchedUser, setIsFetchedUser] = useState(null);
  const [members, setMembers] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === "renewalDate") {
      setIsSuggested(false);
    }
    if (field === "proposer_name") {
      if (value.length >= 4 && !formData?.cin) {
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
      collectionName: "health_insurance_policies",
      docId: formData?.policy_no,
      data: {
        ...formData,
        branch: isFetchedUser?.branch,
        cleint_name:
          isFetchedUser?.firmName ||
          `${isFetchedUser?.fname} ${isFetchedUser?.lname}`,

        client_type: isFetchedUser?.clientType,
        pan_number: isFetchedUser?.panNumber,
        primary_number: isFetchedUser?.primaryNumber,
        gender: isFetchedUser?.gender,
        dob: isFetchedUser?.dob,
        email: isFetchedUser?.email,
        group_name: isFetchedUser?.groupName || null,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (
      formData?.cin &&
      formData?.policy_no &&
      formData?.proposer_name &&
      formData?.policy_category &&
      formData?.policy_category_plan
    ) {
      try {
        fetch(`https://db.enivesh.com/firestore/set`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            alert("Added");
            setFormData(null);
            setRiders([]);
            setCompanyRM([]);
            setIsFetchedUser(null);
            setLFM(null);
            setFetchedLFM(null);
            setRider({
              added_benefits: "",
              added_benefits_premium: "",
            });
            setCompanyRMData({
              rm_contact: "",
              rm_email: "",
              rm_name: "",
              rm_service_type: "",
            });
            setTotalRiderPremium({
              tbPremium: 0,
              tbPremiumWithGST: 0,
              tgst: 0,
            });
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error("error: ", error);
      }
    } else {
      alert("Add Required data!");
    }
  };
  const hndleRider = (field, value) => {
    setRider({ ...rider, [field]: value });
  };

  const handleAddRider = () => {
    if (rider?.added_benefits && rider?.added_benefits_premium) {
      setRiders((prevRiders) => [...prevRiders, { ...rider }]);
      setRider({
        added_benefits_premium: "",
        added_benefits: "",
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
            accumulator + parseInt(item?.added_benefits_premium || 0),
          0
        );
        setTotalRiderPremium({
          tbPremium: sum,
          tbPremiumWithGST: parseFloat(sum * 1.18).toFixed(2),
          tgst: parseFloat(sum * 0.18).toFixed(2),
        });
      } else {
        setTotalRiderPremium({
          tbPremium: 0,
          tbPremiumWithGST: 0,
          tgst: 0,
        });
      }
    };
    if (riders?.length > 0) {
      setFormData({ ...formData, benifits: riders });
      calculateRiderPremium();
    }
  }, [riders]);

  useEffect(() => {
    setFormData({ ...formData, company_rm: companyRM });
  }, [companyRM]);
  useEffect(() => {
    const fetchUserData = async () => {
      if (formData?.cin && !isFetchedUser) {
        const user = await fetchData(formData?.cin);

        if (user) {
          setIsFetchedUser(user);
          setFormData((prevData) => ({
            ...prevData,
            proposer_name: user?.firmName || `${user?.fname} ${user?.lname}`,
          }));
          const familyList = flattenData(user?.members?.children || []);
          setMembers([
            {
              name: user?.fname
                ? `${user?.fname} ${user?.lname}`
                : `${isFetchedUser?.fname} ${isFetchedUser?.lname}` ||
                  user?.firmName
                ? `${user?.firmName} `
                : `${isFetchedUser?.firmName} ` || "not set",
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
            proposer_name:
              isFetchedUser?.firmName ||
              `${isFetchedUser?.fname} ${isFetchedUser?.lname}`,
          }));
          const familyList = flattenData(
            isFetchedUser?.members?.children || []
          );
          setMembers([
            {
              name:
                isFetchedUser?.firmName ||
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
    if (formData?.start_date) {
      setIsSuggested(true);
      const [y, m, d] = formData?.start_date?.split("-");
      const renewDate = `${parseInt(y) + 1}-${m}-${d}`;
      setFormData((prevData) => ({ ...prevData, renewalDate: renewDate }));
    }
  }, [formData?.start_date]);

  const calculateWithPremium = (base = 0, gst = 0) => {
    let newBase = parseFloat(base);
    let newGST = parseInt(gst) / 100;

    let WGSTP = newBase + newBase * newGST;
    setFormData({ ...formData, with_gst_premium: WGSTP });
    return WGSTP;
  };

  const [results, setResults] = useState([]);

  const searchByName = async (e) => {
    try {
      const usersRef = collection(firestore, "crm_clients");
      const q = query(
        usersRef,
        orderBy("fname"),
        startAt(formData?.proposer_name),
        endAt(formData?.proposer_name + "\uf8ff")
      );
      const q2 = query(
        usersRef,
        orderBy("firmName"),
        startAt(formData?.proposer_name),
        endAt(formData?.proposer_name + "\uf8ff")
      );

      const snapshot = await getDocs(q);
      const searchResults = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const snapshot2 = await getDocs(q2);
      const searchResults2 = snapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults([...searchResults, ...searchResults2]);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // auto save chache
  const [isFormClear, setIsFormClear] = useState(false);
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
    setLFM(null);
    setFetchedLFM(null);
    setFormData(null);
    setRiders([]);
    setMembers([]);
    setIsFetchedUser(null);
    setTotalRiderPremium({
      tbPremium: 0,
      tbPremiumWithGST: 0,
      tgst: 0,
    });
  };

  useEffect(() => {
    calculateWithPremium(formData?.base_premium, formData?.gst);
  }, [formData?.base_premium, formData?.gst]);

  const hndleCompanyRM = (field, value) => {
    setCompanyRMData({ ...companyRMData, [field]: value });
  };

  const handleAddCompanyRM = () => {
    if (
      companyRMData?.rm_contact &&
      companyRMData?.rm_email &&
      companyRMData?.rm_service_type
    ) {
      setCompanyRM((precompanyrm) => [...precompanyrm, { ...companyRMData }]);
      setCompanyRMData({
        rm_contact: "",
        rm_email: "",
        rm_name: "",
        rm_service_type: "",
      });
    } else {
      alert("Please fill all CompanyRM fields before adding.");
    }
  };

  const handleRemoveCompanyRM = (index) => {
    setCompanyRM((companyRM) => companyRM.filter((_, i) => i !== index));
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
        title={" Health Insurance Form"}
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
          <Grid2 size={{ xs: 12, sm: 6, md: 1 }}>
            <InputWithValidation
              label="CIN"
              value={formData?.cin}
              onChange={(value) => handleChange("cin", value)}
              onValidate={(error) => handleValidation("cin", error)}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} position={"relative"}>
            <InputWithValidation
              label="Proposer Name"
              value={formData?.proposer_name}
              onChange={(value) => handleChange("proposer_name", value)}
              onValidate={(error) => handleValidation("proposer_name", error)}
              required
              type={members?.length > 0 ? "select" : "text"}
              options={members || []}
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
                          proposer_name:
                            value?.firmName ||
                            `${value?.fname} ${value?.lname}`,
                          cin: value?.cin,
                        });
                        setIsFetchedUser(value);
                        setResults([]);
                      }}
                      sx={{ p: 0, px: 2, textTransform: "capitalize" }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 12 }}
                        primary={`${value?.cin} - ${
                          value?.firmName || value?.fname
                        } ${!value?.firmName && value?.lname}`}
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
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InputWithValidation
              label="Insured"
              onChange={(value) => handleChange("insured", value)}
              onValidate={(error) => handleValidation("insured", error)}
              type="select"
              value={formData?.insured}
              multiple
              required
              options={members || []}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 2 }}>
            <InputWithValidation
              required
              label="Policy Category"
              onChange={(value) => handleChange("policy_category", value)}
              onValidate={(error) => handleValidation("policy_category", error)}
              type="select"
              value={formData?.policy_category}
              options={
                [
                  {
                    name: "retail",
                    label: "Retail",
                  },
                  {
                    name: "group",
                    label: "Group",
                  },
                ] || []
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 2 }}>
            <InputWithValidation
              required
              label={`Policy Type ${
                formData?.policy_category === "group"
                  ? "(Group)"
                  : formData?.policy_category === "retail"
                  ? "(Retail)"
                  : ""
              }`}
              onChange={(value) => handleChange("policy_category_plan", value)}
              onValidate={(error) =>
                handleValidation("policy_category_plan", error)
              }
              type="select"
              value={formData?.policy_category_plan}
              options={
                formData?.policy_category === "group"
                  ? groupOption
                  : retailOption || []
              }
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
            {isFetchedUser?.groupName && (
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography color="grey" variant="caption" component={"p"}>
                  Group Name
                </Typography>
                <Typography
                  color=""
                  textTransform={"capitalize"}
                  variant="caption"
                  component={"p"}
                >
                  {`${isFetchedUser?.groupName} `}
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
          {[...new Set(fieldsByCategory[formData?.policy_category_plan])].map(
            (field) => {
              const value = formData[field] || "";

              if (dateFields.includes(field)) {
                return (
                  <Grid2 key={field} size={{ xs: 12, md: 3 }}>
                    <InputWithValidation
                      label={field?.split("_")?.join(" ")}
                      value={value}
                      onChange={(value) => handleChange(field, value)}
                      onValidate={(error) => handleValidation(field, error)}
                      type="date"
                      required={Requred.includes(field)}
                    />
                  </Grid2>
                );
              }

              if (numaricFields.includes(field)) {
                return (
                  <Grid2 key={field} size={{ xs: 12, md: 3 }}>
                    <InputWithValidation
                      label={field?.split("_")?.join(" ")}
                      value={value}
                      required={Requred.includes(field)}
                      onChange={(value) => handleChange(field, value)}
                      onValidate={(error) => handleValidation(field, error)}
                      type="number"
                    />
                  </Grid2>
                );
              }
              if (textArea.includes(field)) {
                return (
                  <Grid2 key={field} size={{ xs: 12, md: 3 }}>
                    <InputWithValidation
                      label={field?.split("_")?.join(" ")}
                      value={value}
                      onChange={(value) => handleChange(field, value)}
                      onValidate={(error) => handleValidation(field, error)}
                      type="text"
                      maxChars={500}
                      multiline
                      required={Requred.includes(field)}
                      maxRows={5}
                    />
                  </Grid2>
                );
              }

              if (Object.keys(selectFields).includes(field)) {
                return (
                  <Grid2 size={{ xs: 12, md: 3 }} key={field}>
                    <InputWithValidation
                      label={field?.split("_")?.join(" ")}
                      value={value}
                      required={Requred.includes(field)}
                      onChange={(value) => handleChange(field, value)}
                      onValidate={(error) => handleValidation(field, error)}
                      type="select"
                      options={selectFields[field] || []}
                    />
                  </Grid2>
                );
              }

              return (
                <Grid2 size={{ xs: 12, md: 3 }} key={field}>
                  <InputWithValidation
                    required={Requred.includes(field)}
                    label={field?.split("_")?.join(" ")}
                    value={value}
                    onChange={(value) => handleChange(field, value)}
                    onValidate={(error) => handleValidation(field, error)}
                    type="text"
                    maxChars={field === "no_claim_bonus" && 250}
                  />
                </Grid2>
              );
            }
          )}
          {formData?.corporate_buffer === "Yes" && (
            <Grid2 size={{ xs: 12, md: 3 }}>
              <InputWithValidation
                label={"Corporate Buffer Vlaue"}
                value={formData?.corporate_buffer_value}
                onChange={(value) =>
                  handleChange("corporate_buffer_value", value)
                }
                onValidate={(error) =>
                  handleValidation("corporate_buffer_value", error)
                }
                type="text"
              />
            </Grid2>
          )}
        </Grid2>
      </Paper>
      {/* ======================benefits=====================================================benefits========================================== */}
      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <HeadlineTag
          variant="caption"
          textAlign={"center"}
          my={1}
          iconColor={"#00aeff"}
          position={"space-between"}
          title={"What it covers and how it covers			 "}
          flexWrap={"wrap"}
        >
          <Grid2 container spacing={1} width={"100%"} wrap="wrap-reverse">
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
              {" "}
              <Typography variant="caption" title="Total Rider Premium">
                All Benifits :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {riders?.length}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
              {" "}
              <Typography variant="caption" title="Total Rider Premium">
                All Benifits Premium :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(totalRiderPremium?.tbPremium)}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
              {" "}
              <Typography variant="caption" title="Total Rider Premium">
                All Benifits Premium + GST (18%) :{" "}
                <Typography variant="caption" fontWeight={600} color="success">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(totalRiderPremium?.tbPremiumWithGST)}
                </Typography>
              </Typography>
            </Grid2>
          </Grid2>
        </HeadlineTag>
        <Grid2 container spacing={1}>
          {riders?.map((rider, index) => (
            <Grid2 size={{ xs: 12, sm: 12, md: 6 }} key={index}>
              <Box
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
                  <Grid2 size={{ xs: 6 }}>
                    <InputWithValidation
                      readOnly={true}
                      label="Added Benefits"
                      value={rider?.added_benefits}
                      onChange={(value) => hndleRider("added_benefits", value)}
                      onValidate={(error) =>
                        handleValidation("added_benefits", error)
                      }
                      type="text"
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <InputWithValidation
                      label="Added Benefits Premium"
                      readOnly={true}
                      value={rider?.added_benefits_premium}
                      onChange={(value) =>
                        hndleRider("added_benefits_premium", value)
                      }
                      onValidate={(error) =>
                        handleValidation("added_benefits_premium", error)
                      }
                      type="number"
                    />
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
          ))}
        </Grid2>
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
            Not add in Benefits List
          </Typography>
          <Grid2 container spacing={2} mt={2} width={"100%"}>
            <Grid2 size={{ xs: 12, sm: 4, md: 5 }}>
              <InputWithValidation
                label="Added Benefits"
                value={rider?.added_benefits}
                onChange={(value) => hndleRider("added_benefits", value)}
                onValidate={(error) =>
                  handleValidation("added_benefits", error)
                }
                type="select"
                options={
                  formData?.policy_category === "group"
                    ? [
                        {
                          name: "Health Check Up",
                        },
                        {
                          name: "OPD Benefits",
                        },
                        {
                          name: "Robotic Procedures",
                        },
                        { name: "Fitness Benefits" },
                        { name: "Air Ambulance" },
                        { name: "Domicilary Coverage" },
                        { name: "Organ Donar" },
                        { name: "Day Care" },
                        { name: "Auto Reacharge" },
                      ]
                    : [
                        {
                          name: "Health Check Up",
                          value: "Health Check Up ",
                        },
                        {
                          name: "OPD Benefits ",
                          value: "OPD Benefits  ",
                        },
                        {
                          name: "Maternity Benefits ",
                          value: "Maternity Benefits  ",
                        },
                        {
                          name: "Fitness Benefits  ",
                          value: "Fitness Benefits   ",
                        },
                        {
                          name: "Dental OPD ",
                          value: "Dental OPD  ",
                        },
                        {
                          name: "International Coverage ",
                          value: "International Coverage  ",
                        },
                        {
                          name: "Air Ambulance ",
                          value: "Air Ambulance  ",
                        },
                        {
                          name: "Compassionate Travel",
                          value: "Compassionate Travel ",
                        },
                        {
                          name: "Consumable Coverage",
                          value: "Consumable Coverage ",
                        },
                        {
                          name: "Accident Death Benefit",
                          value: "Accident Death Benefit ",
                        },
                        {
                          name: "Hi-End Dignostic OPD",
                          value: "Hi-End Dignostic OPD ",
                        },
                      ]
                }
              />
            </Grid2>

            <Grid2 size={{ xs: 8, sm: 4, md: 5 }}>
              <InputWithValidation
                label="Added Benefits Premium"
                value={rider?.added_benefits_premium}
                onChange={(value) =>
                  hndleRider("added_benefits_premium", value)
                }
                onValidate={(error) =>
                  handleValidation("added_benefits_premium", error)
                }
                type="number"
              />
            </Grid2>
            <Grid2 size={{ xs: 4, sm: 4, md: 2 }}>
              <Button
                variant="outlined"
                sx={{ fontSize: 12 }}
                color="info"
                size="small"
                startIcon={<Add fontSize="10px" />}
                onClick={() => handleAddRider()}
              >
                Add Benefit
              </Button>
            </Grid2>
          </Grid2>
        </Box>

        <Divider sx={{ my: 2 }} />
        {(formData?.policy_category_plan === "Mediclaim" ||
          formData?.policy_category_plan === "Group Mediclaim") && (
          <Paper
            sx={{
              p: 2,
              bgcolor: (theme) => theme.palette.background.default,
            }}
            variant="outlined"
          >
            <HeadlineTag
              variant="caption"
              textAlign={"center"}
              iconHide
              my={1}
              position={"space-between"}
              title={"Base Benefits"}
              flexWrap={"wrap"}
            />
            <Grid2 container spacing={2} my={1}>
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <InputWithValidation
                  label="Room Category Criteria"
                  value={formData?.room_category_criteria}
                  onChange={(value) =>
                    handleChange("room_category_criteria", value)
                  }
                  onValidate={(error) =>
                    handleValidation("room_category_criteria", error)
                  }
                  type="select"
                  options={[
                    {
                      name: "2% & 4% of SI",
                      value: "2% & 4% of SI",
                    },
                    {
                      name: "Up to Single Private AC Room",
                      value: "Up to Single Private AC Room",
                    },
                    {
                      name: "No Sub Limit",
                      value: "No Sub Limit",
                    },
                  ]}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <InputWithValidation
                  label="Pre Hopsitalisation"
                  value={formData?.pre_hopsitalisation}
                  onChange={(value) =>
                    handleChange("pre_hopsitalisation", value)
                  }
                  onValidate={(error) =>
                    handleValidation("pre_hopsitalisation", error)
                  }
                  type="select"
                  options={[
                    {
                      name: "30 Days",
                      value: "30 Days",
                    },
                    {
                      name: "60 Days",
                      value: "60 Days",
                    },
                    {
                      name: "90 Days",
                      value: "90 Days",
                    },
                  ]}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <InputWithValidation
                  label="Post Hospitalisation"
                  value={formData?.post_hospitalisation}
                  onChange={(value) =>
                    handleChange("post_hospitalisation", value)
                  }
                  onValidate={(error) =>
                    handleValidation("post_hospitalisation", error)
                  }
                  type="select"
                  options={[
                    {
                      name: "60 Days",
                      value: "60 Days",
                    },
                    {
                      name: "90 Days",
                      value: "90 Days",
                    },
                    {
                      name: "180 Days",
                      value: "180 Days",
                    },
                  ]}
                />
              </Grid2>
            </Grid2>
          </Paper>
        )}
      </Paper>
      {/* //Company RM		=======================================================Company RM		=============== */}
      {formData?.policy_category === "group" && (
        <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
          <HeadlineTag
            variant="caption"
            textAlign={"center"}
            my={1}
            iconColor={"#00aeff"}
          >
            Company RM
          </HeadlineTag>
          <Grid2 container spacing={2}>
            {companyRM?.map((item, i) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    my: 2,
                    bgcolor: (theme) => theme?.palette?.background?.default,
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    textTransform={"capitalize"}
                    fontWeight={600}
                    color="success"
                    component={"h3"}
                  >
                    {item?.rm_name}
                  </Typography>
                  <Typography
                    mt={0.5}
                    variant="caption"
                    textTransform={"capitalize"}
                    component={"h3"}
                    color="grey"
                  >
                    {item?.rm_email}
                  </Typography>
                  <Typography
                    mt={0.5}
                    variant="caption"
                    textTransform={"capitalize"}
                    component={"h3"}
                    fontSize={8}
                    fontWeight={600}
                    color="black"
                  >
                    {item?.rm_contact}
                  </Typography>
                  <Typography
                    mt={0.5}
                    sx={{
                      position: "absolute",
                      right: 2,
                      bottom: 2,
                      fontSize: 8,
                    }}
                    variant="caption"
                    textTransform={"capitalize"}
                    component={"h3"}
                    color="info"
                    fontWeight={600}
                  >
                    {item?.rm_service_type}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", right: 2, top: 2 }}
                    onClick={() => handleRemoveCompanyRM(i)}
                  >
                    <Close fontSize="10px" />
                  </IconButton>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Name "
                value={companyRMData?.rm_name}
                onChange={(value) => hndleCompanyRM("rm_name", value)}
                onValidate={(error) => handleValidation("rm_name", error)}
                type="text"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Contact"
                value={companyRMData?.rm_contact}
                onChange={(value) => hndleCompanyRM("rm_contact", value)}
                onValidate={(error) => handleValidation("rm_contact", error)}
                type="text"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Email"
                value={companyRMData?.rm_email}
                onChange={(value) => hndleCompanyRM("rm_email", value)}
                onValidate={(error) => handleValidation("rm_email", error)}
                type="email"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Service Type"
                value={companyRMData?.rm_service_type}
                onChange={(value) => hndleCompanyRM("rm_service_type", value)}
                onValidate={(error) =>
                  handleValidation("rm_service_type", error)
                }
                type="select"
                options={[
                  {
                    name: "Sales",
                  },
                  { name: "Service/Claims" },
                  { name: "Intimate Claim" },
                ]}
              />
            </Grid2>
            <Grid2 size={{ xs: 4, sm: 4, md: 2 }}>
              <Button
                variant="outlined"
                sx={{ fontSize: 12 }}
                color="info"
                size="small"
                startIcon={<Add fontSize="10px" />}
                onClick={() => handleAddCompanyRM()}
              >
                Add
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      )}
      {/* //Special Condition		======================================================Special Condition		=============== */}
      {formData?.policy_category === "retail" &&
        formData?.policy_category_plan === "Mediclaim" && (
          <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
            <HeadlineTag
              variant="caption"
              textAlign={"center"}
              my={1}
              iconColor={"#00aeff"}
            >
              Special Condition
            </HeadlineTag>
            <Grid2 container spacing={2}>
              <HeadlineTag variant="caption" textAlign={"center"} iconHide>
                Hurdles at Claim
              </HeadlineTag>
              <Grid2 size={{ xs: 12 }}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputWithValidation
                      label="Co Payment"
                      value={formData?.co_payment}
                      onChange={(value) => handleChange("co_payment", value)}
                      onValidate={(error) =>
                        handleValidation("co_payment", error)
                      }
                      type="select"
                      options={[
                        {
                          value: 5,
                          label: "5%",
                        },
                        {
                          value: 10,
                          label: "10%",
                        },
                        {
                          value: 15,
                          label: "15%",
                        },
                        {
                          value: 20,
                          label: "20%",
                        },
                        {
                          value: 25,
                          label: "20%",
                        },
                        {
                          value: 30,
                          label: "30%",
                        },
                      ]}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputWithValidation
                      label="Surgery Capping"
                      value={formData?.surgery_capping}
                      onChange={(value) =>
                        handleChange("surgery_capping", value)
                      }
                      onValidate={(error) =>
                        handleValidation("surgery_capping", error)
                      }
                      type="text"
                      multiline
                      maxRows={4}
                      maxChars={200}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputWithValidation
                      label="Deductible"
                      value={formData?.deductible}
                      onChange={(value) => handleChange("deductible", value)}
                      onValidate={(error) =>
                        handleValidation("deductible", error)
                      }
                      type="text"
                      multiline
                      maxRows={4}
                      maxChars={200}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                <InputWithValidation
                  label="Existing Illness "
                  value={formData?.existing_illness}
                  onChange={(value) => handleChange("existing_illness", value)}
                  onValidate={(error) =>
                    handleValidation("existing_illness", error)
                  }
                  type="text"
                  multiline
                  minRows={4}
                  maxRows={4}
                  maxChars={500}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputWithValidation
                  label="Exclusion"
                  value={formData?.exclusion}
                  onChange={(value) => handleChange("exclusion", value)}
                  onValidate={(error) => handleValidation("exclusion", error)}
                  type="text"
                  multiline
                  maxRows={4}
                  maxChars={500}
                  minRows={4}
                />
              </Grid2>
            </Grid2>
          </Paper>
        )}

      {/* =========================================================================Final Amount========================================================= */}

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
              value={formData?.comment_from_client}
              onChange={(value) => handleChange("comment_from_client", value)}
              onValidate={(error) =>
                handleValidation("comment_from_client", error)
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
              value={formData?.comment_from_rm}
              onChange={(value) => handleChange("comment_from_rm", value)}
              onValidate={(error) => handleValidation("comment_from_rm", error)}
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
              value={formData?.action}
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
              value={formData?.sourcing}
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
                value={formData?.lead_source}
                onChange={(value) => handleChange("lead_source", value)}
                onValidate={(error) => handleValidation("lead_source", error)}
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
              value={formData?.srm}
              onChange={(value) => handleChange("srm", value)}
              onValidate={(error) => handleValidation("srm", error)}
              type="text"
              title="Servicing Relationship Manager"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputWithValidation
              label="Insurance Planner"
              value={formData?.insurance_planner}
              onChange={(value) => handleChange("insurance_planner", value)}
              onValidate={(error) =>
                handleValidation("insurance_planner", error)
              }
              type="text"
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

export default HForm;

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
