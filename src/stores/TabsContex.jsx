import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useEncryptedSessionStorage from "../hooks/useEncryptedSessionStorage";
import { useLocation } from "react-router-dom";

// Create a context for managing tabs.
const TabsContext = createContext();

// TabsProvider component provides tab-related state and functions to its children.
export const TabsProvider = ({ children }) => {
  const [storeTabs, setStoreTabs] = useEncryptedSessionStorage(
    "enivesh-nv-kthe231-233-3njs",
    []
  );

  // Initialize tabs from sessionStorage or as an empty array.
  const getInitialTabs = () => {
    try {
      return storeTabs;
    } catch (error) {
      console.error("Error parsing tabs from sessionStorage:", error);
      return [];
    }
  };

  // State to store the list of tabs.
  const [tabs, setTabs] = useState(getInitialTabs);

  // Persist tabs in sessionStorage whenever they change.
  useEffect(() => {
    setStoreTabs(tabs);
  }, [tabs]);

  // Adds a new tab if it doesn't already exist.
  const addTab = useCallback((tab) => {
    setTabs((prev) => {
      if (prev.some((existingTab) => existingTab.link === tab.link)) {
        return prev;
      }
      return [...prev, tab];
    });
  }, []);

  // Deletes a tab by its index.
  const deleteTab = useCallback((indexToRemove) => {
    setTabs((prev) => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  // Clears all tabs.
  const ClearAllTabs = useCallback((pathname) => {
    setTabs((prev) => prev.filter((item) => item?.link === pathname));
  }, []);

  return (
    <TabsContext.Provider value={{ ClearAllTabs, tabs, addTab, deleteTab }}>
      {children}
    </TabsContext.Provider>
  );
};

// Custom hook to use the TabsContext.
export const useTabs = () => useContext(TabsContext);
