import useUsers from "../hooks/useUsers";
import Login from "./Login";
import Logout1 from "./Logout1";

export default function LogInOut() {
  const { user } = useUsers();

  return user ? <Logout1 /> : <Login />;
}
