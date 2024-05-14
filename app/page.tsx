import Image from "next/image";
import ToDoCard from "@components/ToDoCard";
import ToDoTest from "@components/todotest";
import LocalStorageDemo from "@components/LocalStorageTest";
export default function Home() {
  return (
    <section className="flex w-full  flex-col  items-center ">
      <ToDoCard />
      {/* <LocalStorageDemo /> */}
    </section>
  );
}
