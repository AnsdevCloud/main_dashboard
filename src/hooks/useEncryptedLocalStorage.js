import { useState } from "react";
import CryptoJS from "crypto-js";

const secretKey = "ansdev-cloud-ai-locked"; // In production, use a secure method to manage your keys

const useEncryptedLocalStorage = (key, initialValue) => {
  // Initialize state with decrypted value from localStorage if it exists.
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        // Decrypt the stored value and parse it from JSON
        const bytes = CryptoJS.AES.decrypt(item, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted ? JSON.parse(decrypted) : initialValue;
      } catch (error) {
        console.error("Error decrypting localStorage data:", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  // Setter function to update state and localStorage with encrypted data
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Encrypt the value and store it in localStorage
      const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(valueToStore),
        secretKey
      ).toString();
      localStorage.setItem(key, ciphertext);
    } catch (error) {
      console.error("Error setting localStorage data:", error);
    }
  };

  return [storedValue, setValue];
};

export default useEncryptedLocalStorage;
