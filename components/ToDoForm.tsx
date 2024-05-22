import { Input } from "./ui/input";

interface FormProps extends classNameProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const ToDoForm = ({ className, onSubmit, value, onChange }: FormProps) => {
  return (
    <form className={className} onSubmit={onSubmit}>
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
        className="border-0 bg-inherit text-lg focus:scale-100"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default ToDoForm;
