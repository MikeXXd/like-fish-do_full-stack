import { ReactNode, createContext, useEffect, useState } from "react";
import { Importance } from "../../../constants";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { RITUAL_TIME_BASE } from "../constants";
import apiClient from "../../../services/api-client";
import { CanceledError } from "axios";
import ritualTimeSortingValue from "../util/ritualTimeSortingValue";

// const LOCAL_STORAGE_RITUALS = {
//   KEY: "rituales",
//   DEFAULT: []
// };

export type RitualTimeBase = (typeof RITUAL_TIME_BASE)[number];

export interface Ritual {
  _id?: string;
  title: string;
  description: string;
  importance: Importance;
  _timeBase: RitualTimeBase;
  frequency: number;
  _createdAt: Date;
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
  editRitual: (ritual: Ritual) => void;
}

export const Context = createContext<RitualContext>({} as RitualContext);

export function RitualsProvider({ children }: { children: ReactNode }) {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [sortedRituals, setSortedRituals] = useState<Ritual[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/rituals", { signal: controller.signal })
      .then((rituals) => {
        setRituals(rituals.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
      });

    return () => controller.abort();
  }, []);

  // sorting rituals based on the remaining time within it's timeBase and frequency
  useEffect(() => {
    rituals.map((r) => console.log(r.title, ritualTimeSortingValue(r)));
    const sortedRituals = rituals.sort(
      (a, b) => ritualTimeSortingValue(a) - ritualTimeSortingValue(b)
    );
    setSortedRituals(sortedRituals);
  }, [rituals]);

  function addRitual(ritual: Ritual) {
    apiClient
      .post("/rituals", ritual)
      .then((res) => {
        // Optimistic update
        const data = res.data;
        console.log(data);
        setRituals([...rituals, data]);
      })
      .catch((error) => console.log(error));
  }

  function deleteRitual(DeleteRitual: Ritual) {
    apiClient
      .delete("/rituals", { data: { id: DeleteRitual._id } })
      .then(() => {
        // Optimistic update
        setRituals(rituals.filter((ritual) => ritual._id !== DeleteRitual._id));
      })
      .catch((error) => console.log(error));
  }

  function editRitual(editedRitual: Ritual) {
    apiClient
      .put("/rituals", { id: editedRitual._id, ...editedRitual })
      .then(() => {
        // Optimistic update
        const updatedRituals = rituals.map((ritual) =>
          ritual._id === editedRitual._id ? editedRitual : ritual
        );
        setRituals(updatedRituals);
      })
      .catch((error) => console.log(error));
  }

  function addPermormance(performedRitual: Ritual) {
    const ritualWithNewPerformance = {
      ...performedRitual,
      performed: [...performedRitual.performed, new Date()]
    };
    // Optimistic update
    const updatedRituals = rituals.map((ritual) =>
      ritual._id === performedRitual._id ? ritualWithNewPerformance : ritual
    );
    setRituals(updatedRituals);

    editRitual(ritualWithNewPerformance);
  }

  return (
    <Context.Provider
      value={{
        rituals: sortedRituals,
        addRitual,
        deleteRitual,
        editRitual,
        addPermormance
      }}
    >
      {children}
    </Context.Provider>
  );
}
