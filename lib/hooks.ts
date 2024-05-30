import { useState, useEffect } from "react";

// Define a generic type for the data you want to store in local storage
type StoredValue<T> = T | undefined;

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [
  StoredValue<T>,
  (value: T | ((val: T | undefined) => T)) => void,
  () => void,
] {
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
  const setValue = (value: T | ((val: T | undefined) => T)) => {
    try {
      // Check if the value is a function and call it with the current state
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
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
