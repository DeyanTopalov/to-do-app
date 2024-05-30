import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const TabsTest = () => {
  return (
    <Tabs
      defaultValue="All"
      className="mt-20 grid w-[400px] place-items-center place-self-center bg-slate-600"
    >
      <TabsContent value="All">
        <p className="my-1 rounded-lg bg-slate-400 px-6 py-2 text-base">
          Lorem, ipsum dolor.
        </p>
        <p className="my-1 rounded-lg bg-slate-400 px-6 py-2 text-base">
          Lorem, ipsum dolor.
        </p>
      </TabsContent>
      <TabsContent value="Active">
        <p className="my-1 rounded-lg bg-slate-400 px-6 py-2 text-base">
          Active 1
        </p>
        <p className="my-1 rounded-lg bg-slate-400 px-6 py-2 text-base">
          Active 2
        </p>
      </TabsContent>
      <TabsContent value="Completed">
        <p className="my-1 rounded-lg bg-slate-400 px-6 py-2 text-base">
          Completed 1
        </p>
        <p className="my-1 rounded-lg bg-slate-400 px-6 py-2 text-base">
          Completed 2
        </p>
      </TabsContent>
      <div className="flex items-center justify-between">
        <p className="text-sm">3 items</p>
        <TabsList className="hidden md:block">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
        <p className="text-sm text-red-500">Clear completed</p>
      </div>
      <TabsList className="mt-4 block rounded-lg bg-green-700 md:hidden">
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Active">Active</TabsTrigger>
        <TabsTrigger value="Completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsTest;
