import { Checkbox } from "./ui/checkbox";
import { DeleteIcon } from "./ui/icons";

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
        className={`size-6 shrink-0 rounded-full border-slate-300  ${completed ? "bg-red-500" : "bg-blue-300"}`}
        checked={completed}
        onClick={() => {
          if (onToggleComplete) {
            onToggleComplete(todo.id);
          }
        }}
      />
      <p className="line-clamp-1 w-full grow-0  group-hover:line-clamp-none">
        {todo.title}
      </p>
      <button
        className=" flex size-6 shrink-0 items-center justify-center rounded-full"
        aria-label="Delete Todo"
        type="button"
        onClick={() => {
          if (onDelete) {
            onDelete(todo.id);
          }
        }}
      >
        <p className="sr-only">Delete</p>
        <DeleteIcon className="fill-clr-todo-placeholder" />
      </button>
    </div>
  );
};

export default ToDoItem;
