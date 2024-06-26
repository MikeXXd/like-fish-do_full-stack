// import TaskList from "../../Tasks/components/TaskList";
import TasksShortList from "./TasksShortList";

export default function HomePage() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full  max-w-[800px] h-fit bg-slate-300 rounded-md p-1 gap-4">
        <TasksShortList />
        {/* <TaskList searchName={""} /> */}
      </div>
    </div>
  );
}
