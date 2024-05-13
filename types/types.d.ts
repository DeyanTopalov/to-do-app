type classNameProps = {
  className?: string;
};

type childrenProps = {
  children?: React.ReactNode;
};

interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: ToDo;
  onToggleComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
}
