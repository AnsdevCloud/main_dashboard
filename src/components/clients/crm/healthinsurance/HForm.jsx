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
  proposerName: "",
  insured: [],

  policyNumber: "",
  policyatStart: "",
  startDate: "",
  policySince: "",
  planName: "",
  coverType: "",
  tenure: "",
  basePremium: 0,
  withGstPremium: 0,
  paymentMode: "",
  sumAssured: "",
  company: "",
  frequencyPayment: "",
  renewalDate: "",
  existingIllness: "",
  hurdlesAtClaim: "",
  exclusion: "",
  commentFromClient: "",
  commentFromRm: "",
  action: "",
  sourcing: "",
  leadSource: "",
  srm: "",
  insurancePlanner: "",
  riders: [],
};
const HForm = () => {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [lfm, setLFM] = useEncryptedSessionStorage("lfm", { ...formKey });
  const [fetchedLFM, setFetchedLFM] = useEncryptedSessionStorage("fe-lfm", {});
  const [isSuggested, setIsSuggested] = useState(false);
  const [insured, setInsured] = useState([]);
  const [rider, setRider] = useState({
    addedBenefitsPremium: "",
    addedBenefits: "",
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
      if (value.length >= 4) {
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

  const hndleInsured = (field, value) => {
    setInsured(value);
  };
  const handleAddRider = () => {
    if (rider?.addedBenefits && rider?.addedBenefitsPremium) {
      setRiders((prevRiders) => [...prevRiders, { ...rider }]);
      setRider({
        addedBenefits: "",
        addedBenefitsPremium: "",
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
    if (formData?.startDate) {
      setIsSuggested(true);
      const [y, m, d] = formData?.startDate?.split("-");
      const renewDate = `${parseInt(y) + 1}-${m}-${d}`;
      setFormData((prevData) => ({ ...prevData, renewalDate: renewDate }));
    }
  }, [formData?.startDate]);

  const calculateWithPremium = (base = 0, gst = 0) => {
    let newBase = parseFloat(base);
    let newGST = parseInt(gst) / 100;

    let WGSTP = newBase + newBase * newGST;
    setFormData({ ...formData, withGstPremium: WGSTP });
    return WGSTP;
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
      const q2 = query(
        usersRef,
        orderBy("firmName"),
        startAt(formData?.proposerName),
        endAt(formData?.proposerName + "\uf8ff")
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
    setLFM({ ...formKey });
    setFetchedLFM(null);
    setFormData({ ...formKey });
    setRiders([]);
    setMembers([]);
    setIsFetchedUser(null);
  };

  useEffect(() => {
    // if (formData?.basePremium && formData?.gst) {
    calculateWithPremium(formData?.basePremium, formData?.gst);
    // }
  }, [formData?.basePremium, formData?.gst]);

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
                          proposerName:
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
          <Grid2 size={{ xs: 12, md: 6 }}>
            <InputWithValidation
              label="Insured"
              onChange={(value) => handleChange("insured", value)}
              onValidate={(error) => handleValidation("insured", error)}
              type="select"
              value={formData?.insured}
              multiple
              options={members || []}
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
              label="Policy at Start"
              value={formData.policyatStart}
              onChange={(value) => handleChange("policyatStart", value)}
              onValidate={(error) => handleValidation("policyatStart", error)}
              type="date"
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
              label="Policy Since"
              value={formData?.policySince}
              onChange={(value) => handleChange("policySince", value)}
              onValidate={(error) => handleValidation("policySince", error)}
              type="date"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Plan Name"
              value={formData?.planName}
              onChange={(value) => handleChange("planName", value)}
              onValidate={(error) => handleValidation("planName", error)}
              type="text"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Cover Type "
              value={formData?.coverType}
              onChange={(value) => handleChange("coverType", value)}
              onValidate={(error) => handleValidation("coverType", error)}
              type="select"
              options={[
                {
                  name: "Individual ",
                  value: "Individual ",
                },
                {
                  name: "Floater ",
                  value: "Floater ",
                },
                {
                  name: "Multi-Individual ",
                  value: "Multi-Individual ",
                },
              ]}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label="Tenure "
              value={formData?.tenure}
              onChange={(value) => handleChange("tenure", value)}
              onValidate={(error) => handleValidation("tenure", error)}
              type="select"
              options={[
                {
                  name: "1 Year ",
                  value: "1 Years ",
                },
                {
                  name: "2 Years ",
                  value: "2 Years ",
                },
                {
                  name: "3 Years ",
                  value: "3 Years ",
                },
                {
                  name: "4 Years ",
                  value: "4 Years ",
                },
                {
                  name: "5 Years ",
                  value: "5 Years ",
                },
              ]}
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
              label="GST (%)"
              value={formData?.gst}
              onChange={(value) => handleChange("gst", value)}
              onValidate={(error) => handleValidation("gst", error)}
              type="number"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <InputWithValidation
              label=" With GST Premium"
              value={formData?.withGstPremium}
              onChange={(value) => handleChange("withGstPremium", value)}
              onValidate={(error) => handleValidation("withGstPremium", error)}
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
              label="Frequency Payment"
              value={formData.frequencyPayment}
              onChange={(value) => handleChange("frequencyPayment", value)}
              onValidate={(error) =>
                handleValidation("frequencyPayment", error)
              }
              type="select"
              options={[
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
          <Grid2
            container
            spacing={1}
            width={"100%"}
            wrap="wrap-reverse"
          ></Grid2>
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
                      value={rider?.addedBenefits}
                      onChange={(value) => hndleRider("addedBenefits", value)}
                      onValidate={(error) =>
                        handleValidation("addedBenefits", error)
                      }
                      type="text"
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 6 }}>
                    <InputWithValidation
                      label="Added Benefits Premium"
                      readOnly={true}
                      value={rider?.addedBenefitsPremium}
                      onChange={(value) =>
                        hndleRider("addedBenefitsPremium", value)
                      }
                      onValidate={(error) =>
                        handleValidation("addedBenefitsPremium", error)
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
                value={rider?.addedBenefits}
                onChange={(value) => hndleRider("addedBenefits", value)}
                onValidate={(error) => handleValidation("addedBenefits", error)}
                type="select"
                options={[
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
                ]}
              />
            </Grid2>

            <Grid2 size={{ xs: 8, sm: 4, md: 5 }}>
              <InputWithValidation
                label="Added Benefits Premium"
                value={rider?.addedBenefitsPremium}
                onChange={(value) => hndleRider("addedBenefitsPremium", value)}
                onValidate={(error) =>
                  handleValidation("addedBenefitsPremium", error)
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
        <Paper
          sx={{ p: 2, bgcolor: (theme) => theme.palette.background.default }}
          variant="outlined"
        >
          <HeadlineTag
            variant="caption"
            textAlign={"center"}
            iconHide
            my={1}
            position={"space-between"}
            title={"Inbuilt Benefts"}
            flexWrap={"wrap"}
          />

          <Grid2 container my={1} spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Auto Restoration"
                value={formData?.autoRestoration}
                onChange={(value) => handleChange("autoRestoration", value)}
                onValidate={(error) =>
                  handleValidation("autoRestoration", error)
                }
                type="text"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Organ Donor"
                value={formData?.organDonor}
                onChange={(value) => handleChange("organDonor", value)}
                onValidate={(error) => handleValidation("organDonor", error)}
                type="text"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Day Care"
                value={formData?.dayCare}
                onChange={(value) => handleChange("dayCare", value)}
                onValidate={(error) => handleValidation("dayCare", error)}
                type="text"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <InputWithValidation
                label="Domicilliary"
                value={formData?.domicilliary}
                onChange={(value) => handleChange("domicilliary", value)}
                onValidate={(error) => handleValidation("domicilliary", error)}
                type="text"
              />
            </Grid2>
          </Grid2>
          <Divider sx={{ my: 2 }} />
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
                value={formData?.roomCategoryCriteria}
                onChange={(value) =>
                  handleChange("roomCategoryCriteria", value)
                }
                onValidate={(error) =>
                  handleValidation("roomCategoryCriteria", error)
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
                value={formData?.preHopsitalisation}
                onChange={(value) => handleChange("preHopsitalisation", value)}
                onValidate={(error) =>
                  handleValidation("preHopsitalisation", error)
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
                value={formData?.postHospitalisation}
                onChange={(value) => handleChange("postHospitalisation", value)}
                onValidate={(error) =>
                  handleValidation("postHospitalisation", error)
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
      </Paper>

      {/* //Special Condition		======================================================Special Condition		=============== */}
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
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <InputWithValidation
              label="Existing Illness "
              value={formData?.existingIllness}
              onChange={(value) => handleChange("existingIllness", value)}
              onValidate={(error) => handleValidation("existingIllness", error)}
              type="text"
              multiline
              minRows={4}
              maxRows={4}
              maxChars={500}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <InputWithValidation
              label="Hurdles at Claim "
              value={formData?.hurdlesatClaim}
              onChange={(value) => handleChange("hurdlesatClaim", value)}
              onValidate={(error) => handleValidation("hurdlesatClaim", error)}
              type="text"
              multiline
              maxRows={4}
              maxChars={500}
              minRows={4}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <InputWithValidation
              label="Exclusion"
              value={formData.exclusion}
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
