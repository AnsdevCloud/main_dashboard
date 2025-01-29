import React, { useState } from "react";

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
      blogging: true,
      eBooks: true,
      sales: true,
      analytics: true,
      purchase: true,
      expense: true,
      filingData: true,
      bankDetails: true,
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
  ],
  definedRoles: {
    admin: {
      access: {
        themeModes: ["lightMode", "darkMode"],
        features: [
          "blogging",
          "sales",
          "analytics",
          "purchase",
          "expense",
          "filingData",
          "bankDetails",
        ],
      },
    },
    blogger: {
      access: {
        themeModes: ["lightMode"],
        features: ["blogging"],
      },
    },
    hr: {
      access: {
        themeModes: ["darkMode"],
        features: ["analytics"],
      },
    },
    account: {
      access: {
        themeModes: ["darkMode"],
        features: ["sales", "purchase", "expense", "filingData", "bankDetails"],
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
  },
};

// Helper to get accessible theme modes
const getAccessibleThemeModes = (role) => {
  return siteSettings.definedRoles[role]?.access || {};
};

// React Component
const ThemeModeSelector = () => {
  const [role, setRole] = useState("admin"); // Default role
  const [currentMode, setCurrentMode] = useState("darkMode"); // Default mode
  const accessibleSettings = getAccessibleThemeModes(role);
  // console.log("accessibleSettings: ", accessibleSettings);

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setRole(newRole);
    // Reset to first accessible mode for new role
    setCurrentMode(
      getAccessibleThemeModes(newRole)?.themeModes[0] || "darkMode"
    );
  };

  const handleModeChange = (event) => {
    setCurrentMode(event.target.value);
  };

  const theme = siteSettings.settings.themes[currentMode];

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        borderColor: theme.border,
        backdropFilter:
          currentMode === "glassMode" ? `blur(${theme.blur})` : "",
        WebkitBackdropFilter:
          currentMode === "glassMode" ? `blur(${theme.blur})` : "",
        padding: "20px",
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <h1>Dynamic Portal</h1>

      {/* Role Selector */}
      <div>
        <label htmlFor="roleSelect">Select Role: </label>
        <select id="roleSelect" value={role} onChange={handleRoleChange}>
          {siteSettings?.roles?.map((role, index) => (
            <option key={index} value={role}>
              {role?.toLocaleUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Mode Selector */}
      {accessibleSettings?.themeModes?.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="modeSelect">Select Theme Mode: </label>
          <select
            id="modeSelect"
            value={currentMode}
            onChange={handleModeChange}
          >
            {accessibleSettings?.themeModes?.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "red" }}>
          No theme modes available for this role.
        </p>
      )}

      {/* Theme Preview */}
      <div style={{ marginTop: "20px" }}>
        <h2>Theme Preview</h2>
        <p>
          Primary Color:{" "}
          <span style={{ color: theme.primary, fontWeight: "bold" }}>
            {theme.primary}
          </span>
        </p>
        <p>
          Secondary Color:{" "}
          <span style={{ color: theme.secondary, fontWeight: "bold" }}>
            {theme.secondary}
          </span>
        </p>
        <h1>Features</h1>
        {accessibleSettings?.features?.map((feature, index) => {
          return (
            <span
              key={index}
              style={{
                color: theme?.primary,
                fontWeight: "bold",
                background: theme.secondary,
                padding: "02px 10px",
                marginRight: "10px",
              }}
            >
              {feature + " : " + siteSettings?.settings?.features[feature]}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeModeSelector;
