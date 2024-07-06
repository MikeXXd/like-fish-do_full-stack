import { useFormContext } from "react-hook-form";

interface Props {
  labelName: string;
  registerName: string;
  errorMessages: string | undefined;
  defaultValue?: string;
  autoFocus?: boolean;
}

export function Modal_Input_TextArea({
  labelName,
  registerName,
  errorMessages,
  defaultValue = "",
  autoFocus = false
}: Props) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor={registerName} className="capitalize">
        {labelName}
      </label>
      <textarea
        {...register(registerName)}
        id={registerName}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        rows={2}
        className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 py-1 rounded-md text-blue-500 font-bold"
      />
      {errorMessages && <p className="text-red-500">{errorMessages}</p>}
    </div>
  );
}
