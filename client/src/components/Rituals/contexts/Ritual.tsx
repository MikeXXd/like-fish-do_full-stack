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
  id: string;
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
  // setTaskImportance: (id: string, importance: number) => void;
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
      ritual.id === performedRitual.id
        ? { ...ritual, performed: [...ritual.performed, new Date()] }
        : ritual
    );
    setRituals(updatedTasks);
  }

  // function taskDone(taskDone: Ritual) {
  //   setRituals(
  //     rituals.map((ritual) =>
  //       ritual.id === taskDone.id
  //         ? { ...ritual, done: !ritual.done, star: false }
  //         : ritual
  //     )
  //   );
  // }

  function deleteRitual(DeleteTask: Ritual) {
    setRituals(rituals.filter((ritual) => ritual.id !== DeleteTask.id));
  }

  function editRitual(editedRitual: Ritual) {
    const updatedTasks = rituals.map((ritual) =>
      ritual.id === editedRitual.id ? editedRitual : ritual
    );
    setRituals(updatedTasks);
  }

  // function setTaskImportance(id: string, importance: number) {
  //   const updatedTasks = rituals.map((ritual) =>
  //     ritual.id === id ? { ...ritual, importance: importance } : ritual
  //   );
  //   setRituals(updatedTasks);
  // }

  // function filterFinishedTasks() {
  //   setAreFinishedTasksHidden((value) => !value);
  // }

  // function arrangeStarForTask(taskStar: Ritual) {
  //   setRituals(
  //     rituals.map((ritual) =>
  //       ritual.id === taskStar.id ? { ...ritual, star: !ritual.star } : ritual
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
