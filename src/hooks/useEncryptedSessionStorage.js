import { useState } from "react";
import CryptoJS from "crypto-js";

const secretKey = "ansdev-cloud-ai-locked"; // In production, use a secure way to manage your keys

const useEncryptedSessionStorage = (key, initialValue) => {
  // Lazy initializer: read from sessionStorage and decrypt, if available.
  const [storedValue, setStoredValue] = useState(() => {
    const item = sessionStorage.getItem(key);
    if (item) {
      try {
        // Decrypt the stored value and parse it back to an object
        const bytes = CryptoJS.AES.decrypt(item, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted ? JSON.parse(decrypted) : initialValue;
      } catch (error) {
        console.error("Error decrypting sessionStorage data:", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  // Setter function to update state and sessionStorage with encrypted data
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Encrypt the value and save it in sessionStorage
      const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(valueToStore),
        secretKey
      ).toString();
      sessionStorage.setItem(key, ciphertext);
    } catch (error) {
      console.error("Error setting sessionStorage data:", error);
    }
  };

  return [storedValue, setValue];
};

export default useEncryptedSessionStorage;
