import { useContext } from "react";
import { Context } from "../contexts/User";

export function useUsers() {
  const value = useContext(Context);

  if (!value) {
    throw new Error("Please use this component inside UsersProvider");
  }

  return value;
}

export default useUsers;
