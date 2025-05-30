import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import Invoice from "../components/account/register/Invoice";
import AddCompany from "../components/account/register/AddCompany";

import Assets from "../pages/account/Assets";
import Utility from "../pages/account/Utility";
import Tax from "../pages/account/Tax";
import PartyRegister from "../components/account/payment/PartyRegister";
import MonthalyBill from "../components/account/payment/MonthalyBill";
import SalesOverviews from "../components/account/register/SalesOverviews";
import CompanySalesOverviews from "../components/account/register/CompanySalesOverviews";
import ViewsDoc from "../components/account/register/ViewsDoc";
import Purchase from "../pages/account/Purchase";
import Partner from "../pages/account/Partner";
import RegularPayout from "../pages/account/RegularPayout";
import ContextPayout from "../pages/account/ContextPayout";
import Subscriptions from "../pages/account/Subscriptions";
import Poratl from "../pages/Portal";
import Pages from "../pages/portal/Pages";
import PurchaseOverviews from "../pages/account/PurchaseReviews";
import PurchaseList from "../pages/account/PurchaseList";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login";
import OTPVerification from "../pages/auth/OTP";
import ClintListIndex from "../layout/client/List/ClintListIndex";
import ClientsOutlet from "../layout/client/List/Outlet";
import CrmUpload from "../components/clients/crm/CrmUpload";
import D3Tree from "../components/charts/mindmister/D3Tree";
import InteractiveTree from "../components/charts/mindmister/D3Tree";
import LeadsDeatils from "../components/clients/forms/Leads";
import LIndex from "../components/clients/crm/lifeinsurance/LIndex";
import LForm from "../components/clients/crm/lifeinsurance/LForm";
import PolicyDetails from "../components/clients/crm/lifeinsurance/PolicyDetails";
import PolicyList from "../components/clients/crm/lifeinsurance/policydtlcomponents/PolicyList";
import CommissionCalculator from "../test/Epanse";
import PolicyStatus from "../test/Epanse";
import HForm from "../components/clients/crm/healthinsurance/HForm";
import HPolicyList from "../components/clients/crm/healthinsurance/HPolicyList";
import HPolicyDetails from "../components/clients/crm/healthinsurance/HPolicyDetails";

// Lazy-loaded clients components
const GlobelIndex = React.lazy(() =>
  import("../components/clients/globel/GlobalIndex/GlobelIndex")
);
const RelationIndex = React.lazy(() =>
  import("../components/clients/globel/GlobalIndex/RelationIndex")
);
const Previews = React.lazy(() =>
  import("../components/clients/globel/option/Previews")
);
const FilesVeiw = React.lazy(() => import("../pages/FilesVeiw"));
const LifeInsurance = React.lazy(() =>
  import("../components/clients/crm/LifeInsurance")
);
const HealthInsurance = React.lazy(() =>
  import("../components/clients/crm/HealthInsurance")
);

// Lazy-loaded admin components
const ReportAnalytics = React.lazy(() =>
  import("../components/cpanel/ReportAnalytics")
);
const RoleAccess = React.lazy(() => import("../components/cpanel/RoleAccess"));
const PolicyInvestmentOverview = React.lazy(() =>
  import("../components/cpanel/PolicyInvestmentsOverviews")
);

// Lazy-loaded pages
const CompliancePage = React.lazy(() =>
  import("../pages/complaince/CompliancePage")
);
const Sales = React.lazy(() => import("../pages/account/Sales"));
// Lazy-loaded clients components
const Layout = React.lazy(() => import("../layout/MainApp"));
const ClientLayout = React.lazy(() => import("../layout/Client/Layout"));
const Parsonal = React.lazy(() =>
  import("../components/clients/forms/Parsonal")
);
const Communication = React.lazy(() =>
  import("../components/clients/forms/Communication")
);
const Family = React.lazy(() => import("../components/clients/forms/Family"));
const BankDetails = React.lazy(() =>
  import("../components/clients/forms/Bank")
);
const DoccumentUpload = React.lazy(() =>
  import("../components/clients/forms/Doccument")
);
const Profile = React.lazy(() => import("../layout/client/profile/Layout"));
const RelationShip = React.lazy(() =>
  import("../components/clients/globel/RelationShip")
);

// Lazy Loaded pages
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/Portal"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Settings = React.lazy(() => import("../pages/Settings"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const ClintIndex = React.lazy(() => import("../components/clients/Index"));
const CPanel = React.lazy(() => import("../layout/controls/Layout"));

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "cpanel",
        element: <CPanel />,
        children: [
          {
            path: "",
            element: <ReportAnalytics />,
          },
          {
            path: "access-define",
            element: <RoleAccess />,
          },
          {
            path: "policy-investment-overview",
            element: <PolicyInvestmentOverview />,
          },
        ],
      },
      {
        path: "crm/",
        element: <ClientLayout />,
        children: [
          {
            path: "uploads",
            element: <CrmUpload />,
          },
          {
            path: "*",
            element: <ClintIndex />,
          },
          {
            path: "parsonal",
            element: <Parsonal />,
          },
          {
            path: "communication",
            element: <Communication />,
          },
          {
            path: "family",
            element: <InteractiveTree />,
          },
          {
            path: "bank",
            element: <BankDetails />,
          },
          {
            path: "global",
            element: <GlobelIndex />,
            children: [
              {
                path: "",
                element: <RelationShip />,
              },
              {
                path: "relationship",
                element: <RelationIndex />,
                children: [
                  {
                    path: "",
                    element: <RelationShip />,
                  },
                  {
                    path: "preview",
                    element: <Previews />,
                  },
                ],
              },
            ],
          },
          {
            path: "documents",
            element: <DoccumentUpload />,
          },
          {
            path: "leads",
            element: <LeadsDeatils />,
          },
          {
            path: "clients",
            element: <ClientsOutlet />,
            children: [
              {
                path: "",
                element: <ClintListIndex />,
              },
              {
                path: "family-members",
                element: <Family />,
              },
              {
                path: ":profile",
                element: <Profile />,
              },
            ],
          },
          {
            path: "life-insurance",
            element: <LIndex />,
            children: [
              {
                path: "",
                element: <LifeInsurance />,
              },
              {
                path: "policy-register",
                element: <LForm />,
              },
              {
                path: "policy",
                element: <PolicyList />,
              },
              {
                path: "policy/:policyID",
                element: <PolicyDetails />,
              },
            ],
          },
          {
            path: "health-insurance",
            element: <LIndex />,
            children: [
              {
                path: "",
                element: <HealthInsurance />,
              },
              {
                path: "policy-register",
                element: <HForm />,
              },
              {
                path: "policy",
                element: <HPolicyList />,
              },
              {
                path: "policy/:policyID",
                element: <HPolicyDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "account",
        element: <Outlet />,
        children: [
          {
            path: "register",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Sales />,
                children: [
                  {
                    path: "",
                    element: <SalesOverviews />,
                  },
                  {
                    path: "upload-data",
                    element: <Invoice />,
                  },
                  {
                    path: "company-list",
                    element: <AddCompany />,
                  },
                  {
                    path: "sale-overview",
                    element: <SalesOverviews />,
                  },
                  {
                    path: "sale",
                    element: <SalesOverviews />,
                  },
                  {
                    path: "sale-overview/:company",
                    element: <CompanySalesOverviews />,
                  },
                  {
                    path: "views-doc",
                    element: <ViewsDoc />,
                  },
                ],
              },

              {
                path: "*",
                element: <Sales />,
              },
              {
                path: "purchase",
                element: <Purchase />,
                children: [
                  {
                    path: "",
                    element: <PurchaseOverviews />,
                  },
                  {
                    path: "list",
                    element: <PurchaseList />,
                  },
                ],
              },
              {
                path: "asset",
                element: <Assets />,
              },
              {
                path: "subscription",
                element: <Subscriptions />,
              },
            ],
          },
          {
            path: "payment",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Utility />,
              },
              {
                path: "*",
                element: <Utility />,
              },
              {
                path: "tax",
                element: <Tax />,
                children: [
                  {
                    path: "",
                    element: <PartyRegister />,
                  },
                  {
                    path: "monthaly-bill",
                    element: <MonthalyBill />,
                  },
                ],
              },
              {
                path: "partner",
                element: <Partner />,
                children: [
                  {
                    path: "",
                    element: <RegularPayout />,
                  },
                  {
                    path: "context-payout",
                    element: <ContextPayout />,
                  },
                ],
              },
              {
                path: "salary",
                element: <h2>I AM SALARY</h2>,
              },
            ],
          },
        ],
      },

      {
        path: "complaince",
        element: <CompliancePage />,
      },
      { path: "about", element: <About /> },
      { path: "docviews", element: <FilesVeiw /> },
      { path: "contact/*", element: <Contact /> },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [{ path: "settings", element: <Settings /> }],
      },
      {
        path: "portal",
        element: <Poratl />,
        children: [
          {
            path: "",
            element: <Pages />,
          },
          {
            path: "pages",
            element: <Pages />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
  { path: "test", element: <PolicyStatus /> },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "otp",
        element: <OTPVerification />,
      },
    ],
  },
]);
export default router;
