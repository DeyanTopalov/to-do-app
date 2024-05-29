import ToDoCard from "@components/ToDoCard";

export default function Home() {
  return (
    <section className="flex w-full  flex-col  items-center ">
      <ToDoCard />
      <p className="mt-10 text-base text-clr-completed md:mt-12">
        Drag and drop to reorder list
      </p>
    </section>
  );
}
