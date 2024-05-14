"use client";
import useLocalStorage from "@lib/hooks";

const LocalStorageDemo = () => {
  const [data, setData, removeData] = useLocalStorage<string>(
    "myData",
    "initial value",
  );

  return (
    <div>
      <p>Test localStorage</p>
      <div className="grid h-[400px] w-[300px] place-items-center gap-5 bg-slate-600">
        <button
          className="h-10 w-full bg-green-300"
          onClick={() => setData("test 1")}
        >
          setData
        </button>
        <button className="h-10 w-full bg-red-300" onClick={() => removeData()}>
          removeData
        </button>
      </div>
    </div>
  );
};

export default LocalStorageDemo;
