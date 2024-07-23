import useMagicWords from "../hooks/useMagicWords";
import MagicWordsListItem from "./MagicWordsListItem";

export default function MagicWordsList() {
  const { magicWords } = useMagicWords();

  console.log("rituals: ", magicWords);
  return (
    <div className="flex justify-center flex-wrap gap-3 mt-8 sm:max-w-fit w-full ">
      {magicWords.map((magicW) => (
        <MagicWordsListItem key={magicW._id} magicWord={magicW} />
      ))}
    </div>
  );
}
