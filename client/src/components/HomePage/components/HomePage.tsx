// import TaskList from "../../Tasks/components/TaskList";
import ShortLists from "./ShortLists";

export default function HomePage() {
  window.scrollTo(0, 0);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold text-center mt-4">
        Welcome to Life Manager
      </h1>
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full  max-w-[800px] h-fit bg-slate-300 rounded-md p-1 gap-4">
        <ShortLists />
      </div>
    </div>
  );
}
