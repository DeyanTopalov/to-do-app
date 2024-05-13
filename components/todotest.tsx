"use client";
import { useState } from "react";

const ToDoTest = () => {
  const [todos, setTodos] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);

  return (
    <div className="mt-16">
      <form action="" className="">
        <input
          type="text"
          placeholder="Create a new todo..."
          className="w-[300px] px-5 py-4"
        />
        <button className="ml-2 size-16 bg-blue-300">Add</button>
      </form>

      <ul></ul>
    </div>
  );
};

export default ToDoTest;
