import React, { createContext, useState, useMemo, useEffect } from "react";
import { lightTheme, darkTheme } from "./themes"; // Import light and dark themes
import { ThemeProvider, CssBaseline } from "@mui/material";
import { siteSettings } from "../settings/settings";
// Create the context
const ThemeContext = createContext();

// Provider component
const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [role, setRole] = useState("account");
  const [swipeFuns, setSwipeFuns] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });
  const [relationshipPreview, setRelationshipPreview] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);
  // Memoize the current theme
  const currentTheme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );
  useEffect(() => {
    let localTheme = JSON.parse(localStorage.getItem("theme"));
    setIsDarkMode(localTheme);
  }, [isDarkMode]);
  const handleSwipe = ({ type, value }) => {
    switch (type) {
      case "left":
        setSwipeFuns({ ...swipeFuns, left: value });
        break;
      case "right":
        setSwipeFuns({ ...swipeFuns, right: value });
        break;
      case "top":
        setSwipeFuns({ ...swipeFuns, top: value });
        break;
      case "bottom":
        setSwipeFuns({ ...swipeFuns, bottom: value });
        break;
      default:
        setSwipeFuns({ ...swipeFuns });

        break;
    }
  };
  const toggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  };
  const [mySetting, setMySetting] = useState([]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setRole,
        toggleTheme,
        siteSettings,
        role,
        swipeFuns,
        handleSwipe,
        setRelationshipPreview,
        relationshipPreview,
        isOpen,
        setIsOpen,
        isSideBar,
        setIsSideBar,
        setMySetting,
        mySetting,
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProviderWrapper, ThemeContext };
