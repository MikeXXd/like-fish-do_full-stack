import { useEffect } from "react";
import useUsers from "../hooks/useUsers";
import apiClient from "../../../services/api-client";
import Logout1 from "./Logout1";
import { Link } from "react-router-dom";

export default function Account() {
  const { token } = useUsers();

  useEffect(() => {
    window.scrollTo(0, 0);
    apiClient
      .get("/users/me")
      .then((res) => {
        console.log("getMe", res.data);
      })
      .catch((err) => {
        console.log("getMeError", err);
      });
  });

  return (
    <div className="flex justify-center flex-col flex-wrap gap-3 mt-8 sm:max-w-fit w-full border-solid border-2 rounded-md p-5">
      {token ? (
        <Logout1 />
      ) : (
        <h3 className="text-2xl pb-2">
          Please <Link to="/users/login" className="font-bold hover:text-white  focus:text-green-500 py-1 px-2">log in</Link> to your account or <Link to="/users/signup" className="font-bold hover:text-white  focus:text-green-500 py-1 px-2">create a new account</Link>.
        </h3>
      )}
    </div>
  );
}
