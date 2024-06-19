import { useFormContext } from "react-hook-form";
import { RITUAL_TIME_BASE } from "../Rituals/constants";
import { RitualTimeBase } from "../Rituals/contexts/Ritual";



interface Props {
  errorMessages: string | undefined;
  defaultTimeBase?: RitualTimeBase;
  defaultFrequency?: number;
}

export default function Modal_Input_TimeBase({
  defaultTimeBase = RITUAL_TIME_BASE[0],
  defaultFrequency = 1,
  errorMessages
}: Props) {
  const { register, watch } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor="timeBase">Time Base</label>
      <div
        id="timeBase"
        className="flex justify-between w-full grid-cols-4 gap-2 rounded-md bg-white p-2"
      >
        {RITUAL_TIME_BASE.map((value) => (
          <div key={value}>
            <input
              {...register("timeBase")}
              type="radio"
              id={`timeBase-${value}`}
              value={value}
              className="peer hidden"
              defaultChecked={value === defaultTimeBase}
            />
            <label
              htmlFor={`timeBase-${value}`}
              className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {value}
            </label>
          </div>
        ))}
      </div>
      {/* /*--frequency------------------------------------------ */}
      <div className="flex flex-col ">
        <div className="flex justify-start items-center">
          <input
            type="number"
            min={1}
            {...register("frequency")}
            id="frequency"
            defaultValue={defaultFrequency}
            className="border-2 border-solid border-transparent outline-none focus:border-orange-400 px-2 m-2 py-1 rounded-md w-16 text-xl font-bold text-blue-500 focus:scale-150"
          />
          <label
            htmlFor="frequency"
            className="text-xl font-bold text-blue-500"
          >
            {`${watch("frequency") == 1 ? " time" : " times"}`}
          </label>
        </div>
        {errorMessages && <p className="text-red-500">{errorMessages}</p>}
      </div>
    </div>
  );
}
