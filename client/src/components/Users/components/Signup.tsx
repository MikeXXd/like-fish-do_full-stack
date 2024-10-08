import { FieldValues, useForm } from "react-hook-form";
import { SignupUser, UserSignupFormData, userSignupSchema } from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import useUsers from "../hooks/useUsers";

export default function Login() {
  const { signup, error, info, user } = useUsers();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<UserSignupFormData>({
    resolver: zodResolver(userSignupSchema)
  });

  function onSubmit(data: FieldValues) {
    const user: SignupUser = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    signup(user);
    reset();
  }

  return (
    <>
      {user && (
        <h2 className="text-2xl p-5 text-violet-600">{`You are now logged in with account ${user?.email}`}</h2>
      )}
      <div className="flex justify-center flex-col flex-wrap gap-3 mt-8 sm:max-w-fit w-full border-solid border-2 rounded-md p-5">
        <h3 className="text-2xl pb-2">Create a new account</h3>
        {info && <p className="text-orange-500 text-xl font-bold">{info}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="name" className="capitalize">
              name
            </label>
            <input
              type="text"
              {...register("name")}
              id="name"
              defaultValue=""
              autoFocus
              className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md text-blue-500 font-bold"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="capitalize">
              email
            </label>
            <input
              type="text"
              {...register("email")}
              id="email"
              defaultValue=""
              className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md text-blue-500 font-bold"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              defaultValue=""
              className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md text-blue-500 font-bold"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
