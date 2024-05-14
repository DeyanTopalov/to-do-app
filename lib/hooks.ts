import { useState, useEffect } from "react";

type StorageValue = string | object | null; // Define possible storage values

// Utility function to safely parse JSON
const parseJSON = (value: string): StorageValue | undefined => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Error parsing stored value", error);
    return undefined;
  }
};

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Retrieve initial value from local storage
    const item = localStorage.getItem(key);
    return item ? parseJSON(item) ?? initialValue : initialValue;
  });

  // Function to set a new value
  const setValue = (value: T) => {
    // Allow value to be a function so we have previous value access (e.g. for numeric increments)
    const newValue = value instanceof Function ? value(storedValue) : value;
    // Store state and update local storage
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // Remove data from local storage
  const removeItem = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  // Run on mount/update: update storedValue (if storage key changes)
  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue && storageValue !== JSON.stringify(storedValue)) {
      setStoredValue(parseJSON(storageValue) ?? initialValue);
    }
  }, [key]); // Only re-run on key change

  return [storedValue, setValue, removeItem];
}
