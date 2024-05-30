import { Checkbox } from "./ui/checkbox";
import { Trash2 } from "lucide-react";

interface ItemProps extends classNameProps, TodoItemProps {
  completed: boolean;
  onClick?: (event: React.MouseEventHandler<HTMLButtonElement>) => void;
}

const ToDoItem = ({
  className,
  todo,
  completed,
  onToggleComplete,
  onDelete,
}: ItemProps) => {
  return (
    <div className={className}>
      <Checkbox
        className={`size-6 shrink-0 cursor-pointer rounded-full border-clr-completed text-white ${completed ? "bg-gradient-to-br from-clr-linear-start to-clr-linear-end" : ""}`}
        checked={completed}
        onClick={() => {
          if (onToggleComplete) {
            onToggleComplete(todo.id);
          }
        }}
      />
      <p
        className={`line-clamp-1 w-full grow-0   group-hover:line-clamp-none  ${completed ? "text-clr-completed line-through" : "text-clr-todo-text"}`}
      >
        {todo.title}
      </p>
      <button
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full"
        aria-label="Delete Todo"
        type="button"
        onClick={() => {
          if (onDelete) {
            onDelete(todo.id);
          }
        }}
      >
        <p className="sr-only">Delete</p>
        <Trash2 className="text-clr-todo-placeholder" />
      </button>
    </div>
  );
};

export default ToDoItem;
