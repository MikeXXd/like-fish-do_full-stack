import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TitleAndBtns from "../components/TitleAndBtns";

export function UsersLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full max-w-[800px] h-fit text-gray-800 bg-slate-300 rounded-md p-1 gap-4">
        <TitleAndBtns
          title="User account"
          onPlusClick={() => {
            navigate("/users/signup");
          }}
          onSettingClick={() => {
            navigate("/users/login");
          }}
          settingTitle="Login"
        />
      </div>
      <Outlet />
    </div>
  );
}
