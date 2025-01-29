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
const defineFeatures = [
  {
    label: "CRM",
    icon: <AdminPanelSettingsRounded />,
    link: "",
    name: "crm",
    children: [
      {
        label: "Register ",
        icon: <PersonAddAlt />,
        link: "/crm/register",
        name: "register",
      },
      {
        label: "Profile ",
        icon: <RxAvatar />,
        link: "/crm/profile",
        name: "clientProfile",
      },
      {
        label: "Life Insurance ",
        icon: <GiLifeBar />,
        link: "/crm/life-insurance",
        name: "lifeInsurance",
      },
      {
        label: "Health Insurance ",
        icon: <HealthAndSafety />,
        link: "/crm/health-insurance",
        name: "healthInsurance",
      },
      {
        label: "General Insurance ",
        icon: <SafetyCheck />,
        link: "/crm/general-insurance",
        name: "generalInsurance",
      },
      {
        label: "AIF ",
        icon: <IoDocumentText />,
        link: "/crm/aif",
        name: "aif",
      },
      {
        label: "Fixed Deposits ",
        icon: <RiLuggageDepositFill />,
        link: "/crm/fixed-deposits",
        name: "fixedDeposits",
      },
      {
        label: "Other financial product ",
        icon: <AiFillProduct />,
        link: "/crm/pfp",
        name: "ofp",
      },
    ],
  },
  {
    label: "Accounts ",
    icon: <AccountBalance />,
    link: "",
    name: "account",
    children: [
      {
        label: "Register ",
        icon: <HowToReg />,
        link: "/account/register",
        name: "accountRegister",
        children: [
          {
            label: "Seles ",
            icon: <AiOutlineStock />,
            link: "/account/register/sale",
            name: "salesRegister",
          },
          {
            label: "Purchase  ",
            icon: <BiSolidPurchaseTag />,
            link: "/account/register/purchase",
            name: "purchaseRegister",
          },
          {
            label: "Asset  ",
            icon: <RiMoneyRupeeCircleFill />,
            link: "/account/register/asset",
            name: "assetsRegister",
          },
          {
            label: "Subscription   ",
            icon: <FaCheckCircle />,
            link: "/account/register/subscription",
            name: "subscripitonRegister",
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
          },
          {
            label: "TAX",
            icon: <TbReceiptTax />,
            link: "/account/payment/tax",
            name: "tax",
          },
          {
            label: "Partner   ",
            icon: <FaHandsHelping />,
            link: "/account/payment/partner",
            name: "partner ",
          },
          {
            label: "Salary   ",
            icon: <TbReceiptRupee />,
            link: "/account/payment/salary",
            name: "salary ",
          },
        ],
      },
    ],
  },
  {
    label: "HR",
    icon: <MoneyOffOutlined />,
    link: "",
    name: "expense",
  },
  {
    label: "Operations",
    icon: <GiNotebook />,
    link: "",
    name: "filingData",
  },
  {
    label: "Sales",
    icon: <BsBank />,
    link: "",
    name: "bankDetails",
  },
  {
    label: "Prospect & Quote",
    icon: <BiSolidPurchaseTag />,
    link: "",
    name: "purchase",
  },
  {
    label: "Social Media",
    icon: <FaSellsy />,
    link: "",
    name: "sales",
  },

  {
    label: "Content",
    icon: <FaSellsy />,
    link: "",
    name: "sales",
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
      },
    ],
  },
];

export default defineFeatures;
