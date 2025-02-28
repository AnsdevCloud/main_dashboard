// Site Settings JSON
const siteSettings = {
  settings: {
    themeModes: ["lightMode", "darkMode", "glassMode"],
    themes: {
      lightMode: {
        primary: "#ffffff",
        secondary: "#d83600",
        text: "#333333",
        background: "#f4f4f4",
      },
      darkMode: {
        primary: "#d83600",
        secondary: "#ffffff",
        text: "#ffffff",
        background: "#000000",
      },
      glassMode: {
        primary: "rgba(255, 255, 255, 0.8)",
        secondary: "rgba(216, 54, 0, 0.6)",
        text: "rgba(255, 255, 255, 0.9)",
        background: "rgba(0, 0, 0, 0.2)",
        blur: "10px",
        border: "rgba(255, 255, 255, 0.3)",
      },
    },
    features: {
      //----cpanel----//
      admin: true,
      dashboard: true,
      //--key features---//
      blogging: true,
      eBooks: true,
      sales: true,
      analytics: false,
      purchase: true,
      expense: true,
      filingData: true,
      bankDetails: true,
      global: true,
      client: true,
      clientRegister: true,
      clientDetails: true,
      //crm
      crm: true,
      register: true,
      clientProfile: true,
      lifeInsurance: true,
      generalInsurance: true,
      healthInsurance: true,
      loans: true,
      mutualFund: true,
      aif: true,
      fixedDeposits: true,
      ofp: true,

      //accounts
      account: true,

      //register featues

      accountRegister: true,

      salesRegister: true,
      purchaseRegister: true,
      assetsRegister: true,
      subscripitonRegister: true,
      //payment features
      payment: true,
      utilityBill: true,
      tax: true,
      partner: true,
      salary: true,
      relationship: true,
      portal: true,
      global: true,
      hr: true,
    },
  },
  roles: [
    "admin",
    "hr",
    "account",
    "blogger",
    "operation",
    "sales",
    "back_office",
    "complaince",
    "Prospect_quote",
    "social_mdia",
    "cntent",
  ],
  definedRoles: {
    admin: {
      access: {
        themeModes: ["lightMode", "darkMode"],
        features: [
          { name: "admin", status: "enabled" },
          { name: "account", status: "enabled" },
          { name: "subscripitonRegister", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "purchaseRegister", status: "enabled" },
          { name: "salesRegister", status: "enabled" },
          { name: "accountRegister", status: "enabled" },
          { name: "utilityBill", status: "enabled" },
          { name: "tax", status: "enabled" },
          { name: "salary", status: "enabled" },
          { name: "relationship", status: "enabled" },
          { name: "partner", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "global", status: "enabled" },
          { name: "portal", status: "enabled" },
          { name: "crm", status: "enabled" },
          { name: "analytics", status: "enabled" },
          { name: "global", status: "enabled" },
          { name: "dashboard", status: "enabled" },
          { name: "mutualFund", status: "enabled" },
          { name: "sales", status: "enabled" },
          { name: "purchase", status: "enabled" },
          { name: "filingData", status: "enabled" },
          { name: "bankDetails", status: "enabled" },
          { name: "hr", status: "enabled" },
        ],
      },
    },
    account: {
      access: {
        themeModes: ["lightMode"],
        features: [
          { name: "admin", status: "enabled" },
          { name: "account", status: "enabled" },
          { name: "subscripitonRegister", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "purchaseRegister", status: "enabled" },
          { name: "salesRegister", status: "enabled" },
          { name: "accountRegister", status: "enabled" },
          { name: "utilityBill", status: "enabled" },
          { name: "tax", status: "enabled" },
          { name: "salary", status: "enabled" },
          { name: "relationship", status: "enabled" },
          { name: "partner", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "assetsRegister", status: "enabled" },
          { name: "global", status: "enabled" },
          { name: "portal", status: "enabled" },
        ],
      },
    },
    hr: {
      access: {
        themeModes: ["darkMode"],
        features: ["analytics"],
      },
    },
    blogger: {
      access: {
        themeModes: ["darkMode"],
        features: [
          { name: "admin", status: "disabled" },
          { name: "crm", status: "disabled" },
          { name: "analytics", status: "disabled" },
          { name: "mutualFund", status: "disabled" },
        ],
      },
    },
    operation: {
      access: {
        themeModes: ["glassMode"],
        features: [],
      },
    },
    sales: {
      access: {
        themeModes: ["lightMode"],
        features: [],
      },
    },
    back_office: {
      access: {
        themeModes: ["glassMode"],
        features: [],
      },
    },
    complaince: {
      access: {
        themeModes: ["glassMode"],
        features: [],
      },
    },
    cntent: {
      access: {
        themeModes: ["darkMode"],
        features: [],
      },
    },
  },
};

export { siteSettings };
