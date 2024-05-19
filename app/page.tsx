import ToDoCard from "@components/ToDoCard";
import LocalStorageDemo from "@components/LocalStorageTest";
import SimpleTest from "@components/SimpleTest";
export default function Home() {
  return (
    <section className="flex w-full  flex-col  items-center ">
      <ToDoCard />
      {/* <LocalStorageDemo /> */}
      {/* <SimpleTest /> */}
    </section>
  );
}
