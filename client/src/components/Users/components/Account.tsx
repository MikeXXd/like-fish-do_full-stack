import useUsers from "../hooks/useUsers";
import Logout from "./Logout";

export default function Account() {
  const { token } = useUsers();

  return (
    <div className="flex justify-center flex-col flex-wrap gap-3 mt-8 sm:max-w-fit w-full border-solid border-2 rounded-md p-5">
      {token ? (
        <Logout />
      ) : (
        <h3 className="text-2xl pb-2">
          Please log in to your account or create a new account.
        </h3>
      )}
    </div>
  );
}
