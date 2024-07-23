import { useContext } from "react";
import { Context } from "../contexts/MagicWord";

export function useMagicWords() {
  const value = useContext(Context);

  if (!value) {
    throw new Error("Please use this component inside MagicWordsProvider");
  }

  return value;
}

export default useMagicWords;
