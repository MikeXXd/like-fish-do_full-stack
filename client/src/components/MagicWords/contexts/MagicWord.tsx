import { ReactNode, createContext, useEffect, useState } from "react";
import { Importance } from "../../../constants";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";
import apiClient from "../../../services/api-client";
import { CanceledError } from "axios";
import useUsers from "../../Users/hooks/useUsers";

// const LOCAL_STORAGE_RITUALS = {
//   KEY: "rituales",
//   DEFAULT: []
// };

export interface MagicWord {
  _id?: string;
  title: string;
  note: string;
  importance: Importance;
}

interface MagicWordContext {
  magicWords: MagicWord[];
  addMagicWord: (magicWord: MagicWord) => void;
  deleteMagicWord: (magicWord: MagicWord) => void;
  editMagicWord: (magicWord: MagicWord) => void;
  importanceVisibility: boolean;
  toggleImportanceVisibility: () => void;
}

export const Context = createContext<MagicWordContext>({} as MagicWordContext);

export function MagicWordsProvider({ children }: { children: ReactNode }) {
  const [magicWords, setMagicWords] = useState<MagicWord[]>([]);
  const [importanceVisibility, setImportanceVisibility] = useState(false);
  const { token } = useUsers();

  useEffect(() => {
    if (token) {
      fetchPowerWords();
    }
  }, [token]);

  function fetchPowerWords() {
    const controller = new AbortController();
    apiClient
      .get("/magic_words", { signal: controller.signal })
      .then((magicWords) => {
        setMagicWords(magicWords.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
      });

    return () => controller.abort();
  }

  async function addMagicWord(magicWord: MagicWord) {
    console.log("magicWords: ", magicWord);
    try {
      const res = await apiClient.post("/magic_words", magicWord);
      const data = res.data;
      setMagicWords([...magicWords, data]);
      fetchPowerWords();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMagicWord(deleteMagicWord: MagicWord) {
    try {
      await apiClient.delete(`/magic_words/${deleteMagicWord._id}`);
      setMagicWords(
        magicWords.filter((magicWord) => magicWord._id !== deleteMagicWord._id)
      );
      fetchPowerWords();
    } catch (error) {
      console.log(error);
    }
  }

  async function editMagicWord(editedMagicW: MagicWord) {
    try {
      await apiClient.put(`/magic_words/${editedMagicW._id}`, {
        ...editedMagicW
      });
      const updatedMagicWord = magicWords.map((magicWord) =>
        magicWord._id === editedMagicW._id ? editedMagicW : magicWord
      );
      setMagicWords(updatedMagicWord);
      fetchPowerWords();
    } catch (err) {
      console.log(err);
    }
  }

  function toggleImportanceVisibility() {
    setImportanceVisibility(!importanceVisibility);
  }

  return (
    <Context.Provider
      value={{
        magicWords,
        addMagicWord,
        deleteMagicWord,
        editMagicWord,
        toggleImportanceVisibility,
        importanceVisibility
      }}
    >
      {children}
    </Context.Provider>
  );
}
