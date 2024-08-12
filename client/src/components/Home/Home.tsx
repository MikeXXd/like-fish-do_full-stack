// import TaskList from "../../Tasks/components/TaskList";
import { Link } from "react-router-dom";
import { MagicWordAppear } from "../MagicWords/components/MagicWordAppear";
import useUsers from "../Users/hooks/useUsers";
import ShortLists from "./ShortLists";

export default function HomePage() {
const {user} = useUsers();

  window.scrollTo(0, 0);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold text-center mt-4">
        Welcome to Life Manager
      </h1>
      <div className="px-4 flex justify-center items-center h-28 w-full  max-w-[800px] ">
        <MagicWordAppear frequencyInMiliSec={4000} size="2xl" />
      </div>
      {user ? <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full  max-w-[800px] h-fit bg-slate-300 rounded-md p-1 gap-4">
        <ShortLists />
      </div> :
      <h2 className="text-xl text-center mt-4">
        Please <Link to="/users/login" className="font-bold hover:text-white  focus:text-green-500 py-1 px-2">log in</Link> to your account or <Link to="/users/signup" className="font-bold hover:text-white  focus:text-green-500 py-1 px-2">create a new account</Link>.</h2>}
    </div>
  );
}
