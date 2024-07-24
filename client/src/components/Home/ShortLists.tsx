import { Link } from "react-router-dom";
import { ReactNode } from "react";

import useTasks from "../Tasks/hooks/useTasks";
import useRituals from "../Rituals/hooks/useRituals";
import getRitualAchievementInPercentage from "../Rituals/util/ritualAchievementInPercentage";

export default function ShortLists() {
  const { tasks } = useTasks();
  const { rituals } = useRituals();

  return (
    <div className="flex flex-col gap-10 justify-center mt-5 w-full">
      <Section title="Tasks" link="/tasks">
        <ol className="list-inside list-disc font-bold ">
          {tasks.map((t, i) =>
            i < 3 ? (
              <li className="" key={t._id}>
                {t.title}
              </li>
            ) : null
          )}
        </ol>
        {tasks.length > 3 ? (
          <span>... and {tasks.length - 3} more.</span>
        ) : null}
      </Section>
      <Section title="Rituals" link="/rituals">
        <ol className="list-inside list-disc font-bold ">
          {rituals.map((r, i) =>
            i < 3 ? (
              <li className="" key={r._id}>
                {r.title}{" "}
                <span className="ps-4 text-slate-500">{`${r._timeBase} - ${getRitualAchievementInPercentage(r)} %`}</span>
              </li>
            ) : null
          )}
        </ol>
        {rituals.length > 3 ? (
          <span>... and {rituals.length - 3} more to fill.</span>
        ) : null}
      </Section>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
  link: string;
}

//-------Section component-----------------------
function Section({ title, children, link }: SectionProps) {
  return (
    <div className="text-slate-900 w-full">
      <Link to={link}>
        <h1 className="text-start text-2xl text-black  font-bold">{title}</h1>
        <div className=" p-2 border-2 border-slate-500 h-min w-full rounded-md bg-gray-300 hover:bg-gray-200 transition duration-150 ease-in-out">
          {children}
        </div>
      </Link>
    </div>
  );
}
