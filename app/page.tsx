import ToDoCard from "@components/ToDoCard";
// import GripTest from "@components/gripTest";

export default function Home() {
  return (
    <section className="flex w-full  flex-col  items-center ">
      <ToDoCard />
      {/* <GripTest /> */}
      <p className="mt-10 text-base text-clr-completed md:mt-12">
        Drag and drop to reorder list
      </p>
    </section>
  );
}
