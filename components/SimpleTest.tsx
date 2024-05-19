"use client";
import useLocalStorage from "@lib/hooks";
import { Input } from "./ui/input";

const SimpleTest = () => {
  const [todos, setTodos, removeTodos] = useLocalStorage<ToDo[]>("todos", []);

  return (
    <div>
      <h1 className="my-6">Simple Test</h1>
      <div className="mb-4 flex scale-100 items-center gap-3 rounded-lg bg-white px-5 py-4 shadow-md">
        <button
          className="flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-blue-200"
          type="submit"
          aria-label="Add Todo"
          role="button"
        >
          +
        </button>
        <Input
          type="text"
          placeholder="Create a new todo..."
          className="border-0 text-lg focus:scale-100"
          //   value={value}
          //   onChange={onChange}
        />
      </div>
      <div className="mt-10 rounded-lg bg-white shadow-md">
        <div className="flex items-center justify-between px-2">
          <button className="text-sm">Check</button>
          <p className="px-5 py-4">Example todo</p>
          <button className="text-sm">Del</button>
        </div>
      </div>
    </div>
  );
};

export default SimpleTest;
