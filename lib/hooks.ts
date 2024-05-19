import { useState, useEffect } from "react";

//from ChatGPT
// Define a generic type for the data you want to store in local storage
type StoredValue<T> = T | undefined;

// Define the hook
export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [StoredValue<T>, (value: T) => void, () => void] {
  // Initialize state with the value from local storage, if it exists
  const [storedValue, setStoredValue] = useState<StoredValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error fetching from local storage:", error);
      return initialValue;
    }
  });

  // Update local storage whenever the state changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting local storage:", error);
    }
  };

  // Remove the item from local storage and reset the state
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error("Error removing from local storage:", error);
    }
  };

  // Listen for changes to local storage from other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue(
            event.newValue ? JSON.parse(event.newValue) : undefined,
          );
        } catch (error) {
          console.error("Error parsing JSON from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
}

//! Usage example:
// import useLocalStorage from "@lib/hooks";

// const LocalStorageDemo = () => {
//   const [data, setData, removeData] = useLocalStorage<string>(
//     "myData",
//     "initial value",
//   );

//   return (
//     <div>
//       <p>Test localStorage</p>
//       <div className="grid h-[400px] w-[300px] place-items-center gap-5 bg-slate-600">
//         <button
//           className="h-10 w-full bg-green-300"
//           onClick={() => setData("test 1")}
//         >
//           setData
//         </button>
//         <button className="h-10 w-full bg-red-300" onClick={() => removeData()}>
//           removeData
//         </button>
//       </div>
//     </div>
//   );
// };

export function useIsClient(): boolean {
  // State to manage the client status. Initial is false
  const [isClient, setIsClient] = useState<boolean>(false);

  // on mount(render on client side), set the client status to true
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

//! Usage example:
// const DemoComponent = () => {
//   const isClient = useIsClient();

//   return (
//     <div className="some-container">
//       {isClient? <p>Value from localStorage</p> : <p>Loading..</p>} - to avoid layout shifts
//     </div
//   )
// }

// export default LocalStorageDemo;

// from Gemini
// type StorageValue = string | object | null; // Define possible storage values

// // Utility function to safely parse JSON
// const parseJSON = (value: string): StorageValue | undefined => {
//   try {
//     return JSON.parse(value);
//   } catch (error) {
//     console.error("Error parsing stored value", error);
//     return undefined;
//   }
// };

// export default function useLocalStorage<T>(
//   key: string,
//   initialValue: T,
// ): [T, (value: T) => void, () => void] {
//   // State to store our value
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     // Retrieve initial value from local storage
//     const item = localStorage.getItem(key);
//     return item ? parseJSON(item) ?? initialValue : initialValue;
//   });

//   // Function to set a new value
//   const setValue = (value: T) => {
//     // Allow value to be a function so we have previous value access (e.g. for numeric increments)
//     const newValue = value instanceof Function ? value(storedValue) : value;
//     // Store state and update local storage
//     setStoredValue(newValue);
//     localStorage.setItem(key, JSON.stringify(newValue));
//   };

//   // Remove data from local storage
//   const removeItem = () => {
//     localStorage.removeItem(key);
//     setStoredValue(initialValue);
//   };

//   // Run on mount/update: update storedValue (if storage key changes)
//   useEffect(() => {
//     const storageValue = localStorage.getItem(key);
//     if (storageValue && storageValue !== JSON.stringify(storedValue)) {
//       setStoredValue(parseJSON(storageValue) ?? initialValue);
//     }
//   }, [key]); // Only re-run on key change

//   return [storedValue, setValue, removeItem];
// }
