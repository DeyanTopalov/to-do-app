import ToDoCard from "@components/ToDoCard";
import TabsTest from "@components/tabsTest";

export default function Home() {
  return (
    <section className="flex w-full  flex-col  items-center ">
      <ToDoCard />
      {/* <TabsTest /> */}
      <p className="mt-10 text-base text-clr-completed md:mt-12">
        Drag and drop to reorder list
      </p>
    </section>
  );
}
