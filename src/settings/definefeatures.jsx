// Import necessary icons and components.
import { BsBank } from "react-icons/bs";
import { GiLifeBar, GiNotebook } from "react-icons/gi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaCheckCircle, FaHandsHelping, FaSellsy } from "react-icons/fa";

import { IoDocumentText } from "react-icons/io5";
import {
  AccountBalance,
  AdminPanelSettingsRounded,
  HealthAndSafety,
  HowToReg,
  Info,
  MoneyOffOutlined,
  PersonAddAlt,
  Public,
  SafetyCheck,
  Upload,
} from "@mui/icons-material";
import { TbReceiptRupee, TbReceiptTax } from "react-icons/tb";
import {
  RiBillFill,
  RiLuggageDepositFill,
  RiMastercardFill,
  RiMoneyRupeeCircleFill,
} from "react-icons/ri";
import { AiFillProduct, AiOutlineStock } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Portal } from "@mui/material";

// Define a list of features with their labels, icons, links, and nested children.
const defineFeatures = [
  {
    label: "CRM", // Main feature label.
    icon: <AdminPanelSettingsRounded />, // Icon for the feature.
    link: "", // Link for the feature (empty for parent features).
    name: "crm", // Unique name identifier.
    children: [
      {
        label: "Uploads ", // Sub-feature label.
        icon: <Upload />, // Icon for the sub-feature.
        link: "/crm/uploads", // Link for the sub-feature.
        name: "register", // Unique name identifier for the sub-feature.
        dev: false, // Indicates if the feature is in development.
      },
      {
        label: "Client Add ",
        icon: <PersonAddAlt />,
        link: "/crm/register",
        name: "register",
        dev: false,
      },
      {
        label: "Clients ",
        icon: <RxAvatar />,
        link: "/crm/clients",
        name: "clientProfile",
        dev: false,
      },
      {
        label: "Life Insurance ",
        icon: <GiLifeBar />,
        link: "/crm/life-insurance",
        name: "lifeInsurance",
        dev: false,
      },
      {
        label: "Health Insurance ",
        icon: <HealthAndSafety />,
        link: "/crm/health-insurance",
        name: "healthInsurance",
        dev: true,
      },
      {
        label: "General Insurance ",
        icon: <SafetyCheck />,
        link: "/crm/general-insurance",
        name: "generalInsurance",
        dev: true,
      },
      {
        label: "AIF ",
        icon: <IoDocumentText />,
        link: "/crm/aif",
        name: "aif",
        dev: true,
      },
      {
        label: "Fixed Deposits ",
        icon: <RiLuggageDepositFill />,
        link: "/crm/fixed-deposits",
        name: "fixedDeposits",
        dev: true,
      },
      {
        label: "Other financial product ",
        icon: <AiFillProduct />,
        link: "/crm/pfp",
        name: "ofp",
        dev: true,
      },
    ],
  },
  {
    label: "Accounts ", // Another main feature.
    icon: <AccountBalance />,
    link: "",
    name: "account",
    children: [
      {
        label: "Ac Register ",
        icon: <HowToReg />,
        link: "/account/register",
        name: "accountRegister",
        children: [
          {
            label: "Seles ",
            icon: <AiOutlineStock />,
            link: "/account/register/sale",
            name: "salesRegister",
            dev: false,
          },
          {
            label: "Purchase  ",
            icon: <BiSolidPurchaseTag />,
            link: "/account/register/purchase",
            name: "purchaseRegister",
            dev: false,
          },
          {
            label: "Asset  ",
            icon: <RiMoneyRupeeCircleFill />,
            link: "/account/register/asset",
            name: "assetsRegister",
            dev: false,
          },
          {
            label: "Subscription   ",
            icon: <FaCheckCircle />,
            link: "/account/register/subscription",
            name: "subscripitonRegister",
            dev: false,
          },
        ],
      },
      {
        label: "Payment  ",
        icon: <RiMastercardFill />,
        link: "/account/payment",
        name: "payment",
        children: [
          {
            label: "Utility Bill  ",
            icon: <RiBillFill />,
            link: "/account/payment/utility-bill",
            name: "utilityBill",
            dev: false,
          },
          {
            label: "TAX",
            icon: <TbReceiptTax />,
            link: "/account/payment/tax",
            name: "tax",
            dev: false,
          },
          {
            label: "Partner   ",
            icon: <FaHandsHelping />,
            link: "/account/payment/partner",
            name: "partner ",
            dev: false,
          },
          {
            label: "Salary   ",
            icon: <TbReceiptRupee />,
            link: "/account/payment/salary",
            name: "salary ",
            dev: true,
          },
        ],
      },
    ],
  },
  {
    label: "HR",
    icon: <MoneyOffOutlined />,
    link: "",
    name: "hr",
    dev: true,
  },
  {
    label: "Operations",
    icon: <GiNotebook />,
    link: "",
    name: "filingData",
    dev: true,
  },
  {
    label: "Sales",
    icon: <BsBank />,
    link: "",
    name: "bankDetails",
    dev: true,
  },
  {
    label: "Prospect & Quote",
    icon: <BiSolidPurchaseTag />,
    link: "",
    name: "purchase",
    dev: true,
  },
  {
    label: "Social Media",
    icon: <FaSellsy />,
    link: "",
    name: "sales",
    dev: true,
  },

  {
    label: "Content",
    icon: <FaSellsy />,
    link: "",
    name: "sales",
    dev: true,
  },
  {
    label: "Global",
    icon: <Public />,
    link: "/crm/global",
    name: "global",
    children: [
      {
        label: "Relationship",
        icon: <FaSellsy />,
        link: "/crm/global/relationship",
        name: "relationship",
        dev: true,
      },
    ],
  },
];

export default defineFeatures;
