import { Checkbox } from "./ui/checkbox";
import { DeleteIcon } from "./ui/icons";

const ToDoItem = ({ className }: classNameProps) => {
  return (
    <div className={className}>
      <Checkbox className="size-6 shrink-0 rounded-full border-slate-300 bg-blue-300" />
      <p className="line-clamp-1 w-full grow-0  group-hover:line-clamp-none">
        Lorem ipsum dolor sit amet.
      </p>
      <button
        className=" flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-300"
        aria-label="Delete Todo"
      >
        <p className="sr-only">Delete</p>
        <DeleteIcon className="fill-red-500" />
      </button>
    </div>
  );
};

export default ToDoItem;
