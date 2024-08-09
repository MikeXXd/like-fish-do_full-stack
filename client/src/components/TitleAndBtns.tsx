import { Settings, SquarePlus } from "lucide-react";

interface Props {
  title: string;
  onPlusClick: () => void;
  onSettingClick: () => void;
  settingTitle?: string;
}

export default function TitleAndBtns({
  title,
  onPlusClick,
  onSettingClick,
  settingTitle = "Settings"
}: Props) {
  return (
    <div className="p-2 flex justify-between items-center w-full">
      <button
        onClick={onSettingClick}
        className=" outline-none hover:scale-110 hover:rotate-45 right-0 bottom-0 transition-transform"
        title={settingTitle}
      >
        <Settings size={40} strokeWidth={1} />
      </button>
      <h1 className="text-4xl sm:text-3xl font-bold">{title}</h1>

      <button
        onClick={onPlusClick}
        className=" outline-none hover:scale-110 right-0 bottom-0 transition-transform"
        title={`Add new ${title}`}
      >
        <SquarePlus size={40} strokeWidth={1} />
      </button>
    </div>
  );
}
