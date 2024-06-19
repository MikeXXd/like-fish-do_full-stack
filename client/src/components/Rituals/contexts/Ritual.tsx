import { ReactNode, createContext } from "react";
import { Importance } from "../../../constants";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { RITUAL_TIME_BASE } from "../constants";

const LOCAL_STORAGE_RITUALS = {
  KEY: "rituales",
  DEFAULT: []
};

export type RitualTimeBase = (typeof RITUAL_TIME_BASE)[number];

export interface Ritual {
  _id?: string;
  title: string;
  description: string;
  importance: Importance;
  timeBase: RitualTimeBase;
  frequency: number;
  timeStamp: Date;
  performed: Date[];
  history?: {
    date: Date;
    frequency: number;
    performed: Date[];
  }[];
}

interface RitualContext {
  rituals: Ritual[];
  addRitual: (ritual: Ritual) => void;
  deleteRitual: (ritual: Ritual) => void;
  addPermormance: (ritual: Ritual) => void;
  // taskDone: (ritual: Ritual) => void;
  editRitual: (ritual: Ritual) => void;
  // setTaskImportance: (_id: string, importance: number) => void;
  // filterFinishedTasks: () => void;
  // areFinishedTasksHidden: boolean;
  // arrangeStarForTask: (ritual: Ritual) => void;
  // filterByImportance: (importance: SortingValues) => void;
  // importanceFilter: SortingValues;
  // filterByTime: (importance: SortingValues) => void;
  // timeFilterState: SortingValues;
}

export const Context = createContext<RitualContext>({} as RitualContext);

export function RitualsProvider({ children }: { children: ReactNode }) {
  const [rituals, setRituals] = useLocalStorage<Ritual[]>(
    LOCAL_STORAGE_RITUALS.KEY,
    LOCAL_STORAGE_RITUALS.DEFAULT
  );
  // const [areFinishedTasksHidden, setAreFinishedTasksHidden] =
  //   useState<boolean>(false);
  // const [importanceFilter, setImportanceFilter] = useState<SortingValues>();
  // const [timeFilterState, setTimeFilterState] = useState<SortingValues>();

  function addRitual(ritual: Ritual) {
    setRituals([ritual, ...rituals]);
  }

  function addPermormance(performedRitual: Ritual) {
    const updatedTasks = rituals.map((ritual) =>
      ritual._id === performedRitual._id
        ? { ...ritual, performed: [...ritual.performed, new Date()] }
        : ritual
    );
    setRituals(updatedTasks);
  }

  // function taskDone(taskDone: Ritual) {
  //   setRituals(
  //     rituals.map((ritual) =>
  //       ritual._id === taskDone._id
  //         ? { ...ritual, done: !ritual.done, star: false }
  //         : ritual
  //     )
  //   );
  // }

  function deleteRitual(DeleteTask: Ritual) {
    setRituals(rituals.filter((ritual) => ritual._id !== DeleteTask._id));
  }

  function editRitual(editedRitual: Ritual) {
    const updatedTasks = rituals.map((ritual) =>
      ritual._id === editedRitual._id ? editedRitual : ritual
    );
    setRituals(updatedTasks);
  }

  // function setTaskImportance(_id: string, importance: number) {
  //   const updatedTasks = rituals.map((ritual) =>
  //     ritual._id === _id ? { ...ritual, importance: importance } : ritual
  //   );
  //   setRituals(updatedTasks);
  // }

  // function filterFinishedTasks() {
  //   setAreFinishedTasksHidden((value) => !value);
  // }

  // function arrangeStarForTask(taskStar: Ritual) {
  //   setRituals(
  //     rituals.map((ritual) =>
  //       ritual._id === taskStar._id ? { ...ritual, star: !ritual.star } : ritual
  //     )
  //   );
  // }

  // function filterByImportance(importance: SortingValues = undefined) {
  //   setImportanceFilter(importance);
  // }
  // function filterByTime(timeState: SortingValues = undefined) {
  //   setTimeFilterState(timeState);
  // }

  return (
    <Context.Provider
      value={{
        rituals,
        addRitual,
        deleteRitual,
        editRitual,
        addPermormance
        // setTaskImportance,
        // filterFinishedTasks,
        // areFinishedTasksHidden,
        // arrangeStarForTask,
        // importanceFilter,
        // filterByImportance,
        // filterByTime,
        // timeFilterState
      }}
    >
      {children}
    </Context.Provider>
  );
}
