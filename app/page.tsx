import Image from "next/image";
import ToDoCard from "@components/ToDoCard";
import ToDoTest from "@components/todotest";
export default function Home() {
  return (
    <section className="flex w-full  flex-col  items-center ">
      <ToDoCard />
    </section>
  );
}
