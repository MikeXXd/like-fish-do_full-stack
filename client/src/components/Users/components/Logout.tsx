import useUsers from "../hooks/useUsers";

export default function Logout() {
  const { user, logout } = useUsers();

  return (
    <div className="flex justify-center flex-col flex-wrap gap-3 mt-8 sm:max-w-fit w-full border-solid border-2 rounded-md p-5">
      <h2 className="text-2xl pb-5 text-violet-600">{`Log out of account ${user?.email}`}</h2>

      <button
        type="submit"
        onClick={logout}
        className="bg-gray-500 hover:bg-orange-400 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        log out
      </button>
    </div>
  );
}
