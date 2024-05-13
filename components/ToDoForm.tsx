import { Input } from "./ui/input";

const ToDoForm = ({ className }: classNameProps) => {
  return (
    <form className={className}>
      <button className="flex size-5 items-center justify-center rounded-full bg-blue-200">
        +
      </button>
      <Input
        type="text"
        placeholder="Create a new todo..."
        className="border-0"
      />
    </form>
  );
};

export default ToDoForm;
