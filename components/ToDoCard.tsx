"use client";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import ThemeSwitch from "./ThemeSwitch";
import { useState, useEffect } from "react";
import { useLocalStorage, useIsClient } from "@lib/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Reorder, motion } from "framer-motion";

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

  const countIncompleteTodos =
    todos?.filter((todo) => !todo.completed).length ?? 0;

  const incompleteText =
    countIncompleteTodos === 1 ? "item left" : "items left";

  const incompleteTodoText = `${countIncompleteTodos} ${incompleteText}`;

  const [allTodos, setAllTodos] = useState<ToDo[]>([]); // All todos list
  const [activeTodos, setActiveTodos] = useState<ToDo[]>([]); // Active todos list
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]); // Completed todos list

  useEffect(() => {
    if (!todos) return;
    setAllTodos(todos); // All todos
    setActiveTodos(todos.filter((todo) => !todo.completed)); // Active todos
    setCompletedTodos(todos.filter((todo) => todo.completed)); // Completed todos
  }, [todos]);

  const updateOrder = (
    newOrder: ToDo[],
    type: "all" | "active" | "completed",
  ) => {
    if (type === "all") {
      setTodos(newOrder);
    } else {
      setTodos((prevTodos) => {
        if (!prevTodos) return [];
        const reorderedIds = newOrder.map((todo) => todo.id);
        const reorderedSet = new Set(reorderedIds);

        const otherTodos = prevTodos.filter(
          (todo) => !reorderedSet.has(todo.id),
        );
        return [...newOrder, ...otherTodos];
      });
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-[33.75rem]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className=" mt-10 w-full md:mt-[4.375rem] ">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">T O D O</h1>
          <ThemeSwitch />
        </div>
        <ToDoForm
          className="mb-4 flex scale-100 items-center gap-3 rounded-xl bg-clr-card-bg px-5 py-3 shadow-md md:py-4"
          onSubmit={addToDo}
          onChange={handleInputChange}
          value={newToDo}
        />
      </div>

      <Tabs defaultValue="All" className="">
        <section className=" overflow-x-hidden rounded-lg bg-clr-card-bg  shadow-md ">
          <TabsContent
            value="All"
            className="h-[19rem] snap-y snap-mandatory overflow-y-auto overscroll-y-contain md:h-[22.75rem]"
          >
            <Reorder.Group
              values={allTodos}
              onReorder={(newOrder) => updateOrder(newOrder, "all")}
              layoutScroll
            >
              {(isClient &&
                allTodos?.map((todo) => (
                  <Reorder.Item key={todo.id} value={todo}>
                    {/* if no grip: gap-3 px-5 */}
                    <ToDoItem
                      className="group flex snap-start items-center justify-between gap-2 border-b border-clr-todo-borders py-4 pl-3 pr-5 "
                      key={todo.id}
                      todo={todo}
                      completed={todo.completed}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTodo}
                    />
                  </Reorder.Item>
                ))) ||
                null}
            </Reorder.Group>
          </TabsContent>
          <TabsContent
            value="Active"
            className="h-[19rem] snap-y snap-mandatory overflow-y-auto overscroll-y-contain md:h-[22.75rem]"
          >
            <Reorder.Group
              values={activeTodos}
              onReorder={(newOrder) => updateOrder(newOrder, "active")}
              layoutScroll
            >
              {(isClient &&
                activeTodos?.map((todo) => (
                  <Reorder.Item key={todo.id} value={todo}>
                    <ToDoItem
                      className="flex snap-start items-center justify-between gap-3 border-b border-clr-todo-borders  py-4 pl-3 pr-5 "
                      key={todo.id}
                      todo={todo}
                      completed={todo.completed}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTodo}
                    />
                  </Reorder.Item>
                ))) ||
                null}
            </Reorder.Group>
          </TabsContent>
          <TabsContent
            value="Completed"
            className="h-[19rem] snap-y snap-mandatory overflow-y-auto overscroll-y-contain md:h-[22.75rem]"
          >
            <Reorder.Group
              values={completedTodos}
              onReorder={(newOrder) => updateOrder(newOrder, "completed")}
              layoutScroll
            >
              {(isClient &&
                completedTodos?.map((todo) => (
                  <Reorder.Item key={todo.id} value={todo}>
                    <ToDoItem
                      className="flex snap-start items-center justify-between gap-3 border-b border-clr-todo-borders  py-4 pl-3 pr-5 "
                      key={todo.id}
                      todo={todo}
                      completed={todo.completed}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDeleteTodo}
                    />
                  </Reorder.Item>
                ))) ||
                null}
            </Reorder.Group>
          </TabsContent>

          <div className="flex items-center justify-between border-t-0 border-clr-todo-borders px-5 py-4 ">
            {isClient ? (
              <p className="focus:text-clr-clr-todo-text text-base font-normal text-clr-completed hover:font-medium hover:text-clr-todo-text md:text-lg">
                {incompleteTodoText}
              </p>
            ) : (
              <p>Loading...</p>
            )}
            {/* Footer desktop */}
            <TabsList className="bg-inherite hidden items-center gap-3 font-bold text-clr-completed md:flex">
              <TabsTrigger
                value="All"
                className="cursor-pointer text-base hover:text-clr-todo-text
                md:text-lg"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="Active"
                className="cursor-pointer text-base hover:text-clr-todo-text
                md:text-lg"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="Completed"
                className="cursor-pointer text-base hover:text-clr-todo-text
                md:text-lg"
              >
                Completed
              </TabsTrigger>
            </TabsList>
            <button
              aria-label="Clear Completed"
              type="button"
              onClick={clearCompletedTodos}
              className="focus:text-clr-clr-todo-text cursor-pointer text-base font-normal text-clr-completed hover:font-medium hover:text-clr-todo-text md:text-lg"
            >
              Clear Completed
            </button>
          </div>
        </section>

        {/* Footer Mobile */}
        <TabsList className="mt-4 flex items-center justify-center gap-5 rounded-lg  bg-clr-card-bg px-5 py-4 text-base font-bold text-clr-completed md:hidden">
          <TabsTrigger
            value="All"
            className="cursor-pointer text-base hover:text-clr-todo-text
                md:text-lg"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="Active"
            className="cursor-pointer text-base hover:text-clr-todo-text
                md:text-lg"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="Completed"
            className="cursor-pointer text-base hover:text-clr-todo-text
                md:text-lg"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default ToDoCard;

// Next steps:
// Delete test components
// Decide on the grip for drag
// Refactor
