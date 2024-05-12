import Image from "next/image";
import ToDoCard from "@components/ToDoCard";

export default function Home() {
  return (
    <section className="flex w-full flex-col items-center   ">
      <ToDoCard />
    </section>
  );
}
