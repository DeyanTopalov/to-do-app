import { Input } from "./ui/input";
import { Plus } from "lucide-react";

interface FormProps extends classNameProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const ToDoForm = ({ className, onSubmit, value, onChange }: FormProps) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      <button
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border border-clr-completed"
        type="submit"
        aria-label="Add Todo"
        role="button"
      >
        <Plus className="w-4/5" />
      </button>
      <Input
        type="text"
        placeholder="Create a new todo..."
        className="border-0 bg-inherit text-lg focus:scale-100 focus-visible:ring-2 focus-visible:ring-clr-completed focus-visible:ring-offset-2"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default ToDoForm;
