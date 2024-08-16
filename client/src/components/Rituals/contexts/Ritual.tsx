import _ from "lodash";
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
    fetchRituals();
  }, []);

  function fetchRituals() {
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
  }

  // sorting rituals based on the remaining time within it's timeBase and frequency
  useEffect(() => {
    rituals.map((r) => console.log(r.title, ritualTimeSortingValue(r)));
    const sortedRituals = rituals.sort(
      (a, b) => ritualTimeSortingValue(a) - ritualTimeSortingValue(b)
    );
    setSortedRituals(sortedRituals);
  }, [rituals]);

  function addRitual(ritual: Ritual) {
    try {
      const res = apiClient.post("/rituals", ritual);
      console.log("Ritual added response: ", res);
      // Optimistic update
      setRituals([...rituals, ritual]);
      // get reality from database
      fetchRituals();
    } catch (error) {
      console.log(error);
    }
  }

  function deleteRitual(DeleteRitual: Ritual) {
    try {
      const res = apiClient.delete(`/rituals/${DeleteRitual._id}`);
      console.log("Ritual deleted response: ", res);
      setRituals(
        rituals.filter((magicWord) => magicWord._id !== DeleteRitual._id)
      );
      fetchRituals();
    } catch (error) {
      console.log(error);
    }
  }

  async function editRitual(editedRitual: Ritual) {
    try {
      const ritualData = _.omit(editedRitual, ["history", "_id", "_createdAt"]);
      console.log("ritualData", ritualData);
      const res = await apiClient.put(
        `/rituals/${editedRitual._id}`,
        ritualData
      );
      console.log("Ritual edited response: ", res);
      const updatedRituals = rituals.map((ritual) =>
        ritual._id === editedRitual._id ? editedRitual : ritual
      );
      setRituals(updatedRituals);
      fetchRituals();
    } catch (error) {
      console.log(error);
    }
  }

  function addPermormance(performedRitual: Ritual) {
    const ritualWithNewPerformance = {
      ...performedRitual,
      performed: [...performedRitual.performed, new Date()]
    };
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
