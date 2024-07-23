import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, Pencil, ShieldX, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useActionOnOutsideClick } from "../../../hooks/useActionOnOutsideClick";
import { cc } from "../../../util/cc";
import ImportanceIconFish from "../../ImportanceIconFish";
import Modal from "../../Modal/Modal";
import { Modal_Input_Importance } from "../../Modal/Modal_Input_Importance";
import { Modal_Input_Text } from "../../Modal/Modal_Input_Text";
import { Modal_Input_TextArea } from "../../Modal/Modal_Input_TextArea";
import ModalFooter from "../../Modal/ModalFooter";
import { MagicWordFormData, magicWordSchema } from "../constants";
import { MagicWord } from "../contexts/MagicWord";
import useMagicWords from "../hooks/useMagicWords";

const ICON_SIZE = 27;

export default function RitualsListItem({
  magicWord
}: {
  magicWord: MagicWord;
}) {
  const { editMagicWord, deleteMagicWord } = useMagicWords();
  const [isMagicWordMenuOpen, setIsMagicWordMenuOpen] = useState(false);
  const [isMagicWordDeleting, setIsMagicWordDeleting] = useState(false); // showing JSX deleting state
  const [isImportanceIconVisible, setIsImportanceIconVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeMenuRef = useRef<HTMLDivElement>(null);
  useActionOnOutsideClick(isMagicWordMenuOpen, closeMenuRef, () =>
    setIsMagicWordMenuOpen(false)
  );
  const methodes = useForm<MagicWordFormData>({
    resolver: zodResolver(magicWordSchema)
  });
  const errors = methodes.formState.errors;

  function onSubmit(data: FieldValues) {
    const editedMagicW: MagicWord = {
      ...magicWord,
      title: data.title,
      note: data.note,
      importance: data.importance
    };
    editMagicWord(editedMagicW);
    methodes.reset();
    setIsModalOpen(false);
  }

  function onModalClose() {
    methodes.reset();
    setIsModalOpen(false);
  }

  function onMenuOpen() {
    setIsMagicWordMenuOpen(true);
  }

  // --JSX--deleting-state---------------------------------------------------------
  if (isMagicWordDeleting) {
    return (
      <div className="mx-2 bg-red-200 rounded-md hover:bg-red-300 transition-all border-red-500 border-2">
        <div className="flex justify-between gap-5 p-2  mx-auto font-semibold text-lg ">
          <button
            onClick={() => deleteMagicWord(magicWord)}
            className="hover:scale-125"
            title="Delete MagicWord"
          >
            <Trash2 size={ICON_SIZE} />
          </button>
          <span className="font-bold text-ellipsis overflow-hidden flex align-middle">
            {magicWord.title}
          </span>
          <div className=" flex justify-between">
            <button
              onClick={() => setIsMagicWordDeleting(false)}
              className="`text-red-700 hover:scale-125"
              title="Cancel Deleting"
            >
              <ShieldX size={ICON_SIZE} />{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --JSX--non-deleting-state-------------------------------------------------------
  else
    return (
      <>
        <div
          className={cc(
            "relative flex mx-2 bg-slate-200 rounded-md hover:bg-slate-100 transition-all max-w-",
            isMagicWordMenuOpen
              ? "border-2 border-orange-400"
              : "border-transparent border-2"
          )}
        >
          {/* --left-side---title-------------------------------- */}
          <div className="p-2 font-semibold text-lg sm:text-xl transition-all">
           
              {magicWord.title}
            
          </div>
          {/* ----right-side---note and icons------------------------------ */}
          <div className={`flex items-center gap-3 `}>
            {!isMagicWordMenuOpen ? (
              //----- menu close -------------------------------------------------------
              <div className="flex items-center gap-1">
                {" "}
                {isImportanceIconVisible && <ImportanceIconFish
                  importance={magicWord.importance}
                  size={ICON_SIZE}
                />}
                <button
                  onClick={onMenuOpen}
                  className="hover:scale-125 transition-transform"
                >
                  <EllipsisVertical
                    size={ICON_SIZE}
                    className="text-gray-500 hover:text-black "
                  />
                </button>
              </div>
            ) : (
              //------ menu open --------------------------------------------
              <div
                className="flex gap-3 z-10 bg-slate-300 rounded-md p-1 ps-3 me-1 border-2 border-orange-400"
                ref={closeMenuRef}
              >
                <button
                  onClick={() => {
                    setIsMagicWordMenuOpen(false);
                    setIsMagicWordDeleting(true);
                  }}
                  className=" hover:scale-125 transition-transform"
                >
                  <Trash2
                    size={ICON_SIZE}
                    className="text-red-700 hover:text-red-500 "
                  />
                </button>
                <button
                  onClick={() => {
                    setIsMagicWordMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="hover:scale-125 transition-transform"
                >
                  <Pencil
                    size={ICON_SIZE}
                    className="text-gray-800 hover:text-black"
                  />
                </button>
                <button
                  onClick={() => setIsMagicWordMenuOpen(false)}
                  className="hover:scale-125 transition-transform"
                >
                  <EllipsisVertical
                    size={ICON_SIZE}
                    className={"text-gray-500 hover:text-black"}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        <Modal
          title="Edit MagicWord"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <FormProvider {...methodes}>
            <form
              onSubmit={methodes.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {/* --Title------------------------------------------ */}
              <Modal_Input_Text
                name="title"
                errorMessages={errors.title?.message}
                defaultValue={magicWord.title}
              />

              {/* --Description------------------------------------------ */}
              <Modal_Input_TextArea
                labelName="note"
                registerName="note"
                errorMessages={errors.note?.message}
                defaultValue={magicWord.note || ""}
              />

              {/* --Importance------------------------------------------ */}
              <Modal_Input_Importance defaultValue={magicWord.importance} />

              {/*--footer--buttons------------------------------------------*/}
              <ModalFooter
                closeBtnName="Close"
                onCancel={onModalClose}
                submitBtnName="Save Changes"
              />
            </form>
          </FormProvider>
        </Modal>
      </>
    );
}
