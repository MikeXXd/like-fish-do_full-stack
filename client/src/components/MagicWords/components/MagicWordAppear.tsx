import { useEffect, useState } from "react";
// import { Importance } from "../../../constants";
import useMagicWords from "../hooks/useMagicWords";

interface Props {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  // length?: "short" | "medium" | "long" | "any";
  frequencyInMiliSec?: number;
  // importance?: Importance | "any";
}

export function MagicWordAppear({
  size = "lg",
  // length = "medium",
  frequencyInMiliSec = 5000
  // importance = "any"
}: Props) {
  const { magicWords } = useMagicWords();
  const [shownMagicW, setShownMagicW] = useState("You Are Magical");

  useEffect(() => {
    const interval = setInterval(() => {
      getNewMagicWord();
    }, frequencyInMiliSec);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownMagicW]);

  function getNewMagicWord() {
    const randomIndex = Math.floor(Math.random() * magicWords.length);
    setShownMagicW(magicWords[randomIndex].title);
  }
  return (
    <button
      className={`text-${size} transition-all hover:border-white hover:font-bold cursor-pointer`}
      onClick={() => getNewMagicWord()}
    >
      {shownMagicW}
    </button>
  );
}
