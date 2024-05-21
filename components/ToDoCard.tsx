"use client";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import ThemeSwitch from "./ThemeSwitch";
import { useState } from "react";
import { useLocalStorage, useIsClient } from "@lib/hooks";

const ToDoCard = () => {
  //? checks if the page is rendered on the client
  const isClient = useIsClient();

  //? state to manage todo items on localStorage
  const [todos, setTodos, removeTodos] = useLocalStorage<ToDo[] | undefined>(
    "todos",
    undefined,
  );

  //? state to manage new todo item
  const [newToDo, setNewTodo] = useState<string>("");

  //? state to manage filter (all, active, completed)
  const [filter, setFilter] = useState<string>("all"); // State to manage filter (all, active, completed)

  //? responsible for updating the input field value as the user types.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  //? responsible for adding a new todo when the form is submitted. Relies on the newToDo state, which is updated by handleInputChange, to know what todo to add.
  const addToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newToDo.trim() !== "") {
      const newTodo = {
        id: todos?.length ? todos[todos.length - 1].id + 1 : 1,
        title: newToDo,
        completed: false,
      };
      setTodos([...(todos || []), newTodo]);
      setNewTodo("");
    }
  };
  const handleToggleComplete = (id: number) => {
    if (todos) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      setTodos(updatedTodos);
    }
  };

  const handleDeleteTodo = (id: number) => {
    if (todos) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const clearCompletedTodos = () => {
    const activeTodos = todos?.filter((todo) => !todo.completed);
    setTodos(activeTodos ?? []);
  };

  //! Not in use, but this is how to implement a clear all button
  //   const clearAllTodos = () => {
  //     removeTodos();
  //   };

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    }
    return true; // "all" filter, return all todos
  });

  const countIncompleteTodos =
    todos?.filter((todo) => !todo.completed).length ?? 0;

  const incompleteText =
    countIncompleteTodos === 1 ? "item left" : "items left";

  const incompleteTodoText = `${countIncompleteTodos} ${incompleteText}`;

  return (
    <div className="relative w-full max-w-[33.75rem]">
      <div className=" mt-10 w-full ">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold ">T O D O</h1>
          <ThemeSwitch />
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
          {(isClient &&
            filteredTodos?.map((todo) => (
              <ToDoItem
                className="flex snap-start items-center justify-between gap-3 border-b border-clr-todo-borders  px-5 py-4 "
                key={todo.id}
                todo={todo}
                completed={todo.completed}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo}
              />
            ))) ||
            null}
        </div>

        <div className="footer-mobile flex items-center justify-between border-t-0 border-clr-todo-borders px-5 py-4 ">
          {isClient ? <p>{incompleteTodoText}</p> : <p>Loading...</p>}

          <div className="hidden items-center gap-3 md:flex">
            <button
              aria-label="Show All"
              type="button"
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              aria-label="Show Active"
              type="button"
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              aria-label="Show Completed"
              type="button"
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button
            aria-label="Clear Completed"
            type="button"
            onClick={clearCompletedTodos}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className="footer-desktop flex items-center justify-center gap-5 rounded-lg  bg-white px-5 py-4 md:hidden">
        <button
          aria-label="Show All"
          type="button"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          aria-label="Show Active"
          type="button"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          aria-label="Show Completed"
          type="button"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default ToDoCard;
