"use client";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import { useState } from "react";

const ToDoCard = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newToDo, setNewTodo] = useState<string>("");

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newToDo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          title: newToDo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // basic funct works, add localstorage.

  return (
    <div className="relative w-full max-w-[33.75rem]">
      <div className=" mt-10 w-full ">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold ">T O D O</h1>
          <div className="b-1 size-7 rounded-full border-slate-300 bg-slate-700"></div>
        </div>
        <ToDoForm
          className="mb-4 flex scale-100 items-center gap-3 rounded-lg bg-white px-5 py-4 shadow-md"
          onSubmit={addToDo}
          onChange={handleInputChange}
          value={newToDo}
        />
      </div>

      <div
        className="to-do-card
       mb-4  overflow-x-hidden rounded-lg bg-white shadow-md"
      >
        <div className="todo-container max-h-[22.75rem] min-h-[7.75rem] snap-y snap-mandatory overflow-y-auto overscroll-y-contain">
          {todos.map((todo) => (
            <ToDoItem
              className="flex snap-start items-center justify-between gap-3 border-b border-clr-todo-borders  px-5 py-4 "
              key={todo.id}
              todo={todo}
              completed={todo.completed}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>

        <div className="footer-mobile flex items-center justify-between border-t-0 border-clr-todo-borders px-5 py-4 ">
          <p>5 items left</p>
          <div className="hidden items-center gap-3 md:flex">
            <p>All</p>
            <p>Active</p>
            <p>Completed</p>
          </div>
          <p>Clear Completed</p>
        </div>
      </div>
      <div className="footer-desktop flex items-center justify-center gap-5 rounded-lg  bg-white px-5 py-4 md:hidden">
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>
    </div>
  );
};

export default ToDoCard;
