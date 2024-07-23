import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import { Modal_Input_Importance } from "../../Modal/Modal_Input_Importance";
import { Modal_Input_Text } from "../../Modal/Modal_Input_Text";
import ModalFooter from "../../Modal/ModalFooter";
import TitlePlusBtn from "../../TitlePlusBtn";
import { MagicWordFormData, magicWordSchema } from "../constants";
import { MagicWord } from "../contexts/MagicWord";
import useMagicWords from "../hooks/useMagicWords";
import MagicWordsList from "./MagicWordsList";

export function MagicWords() {
  const { addMagicWord } = useMagicWords();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methodes = useForm<MagicWordFormData>({
    resolver: zodResolver(magicWordSchema)
  });
  const errors = methodes.formState.errors;

  useEffect(() => {
    // render the page at the top of the page when the page is loaded
    window.scrollTo(0, 0);
  }, []);

  function onSubmit(data: FieldValues) {
    // add new Power Word TODO: use loudash in this case => learn
    const newMagicWord: MagicWord = {
      title: data.title,
      note: data.note,
      importance: data.importance
    };
    addMagicWord(newMagicWord);
    methodes.reset();
    setIsModalOpen(false);
  }

  function onClose() {
    // close the modal
    methodes.reset();
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full max-w-[800px] h-fit text-gray-800 bg-slate-300 rounded-md p-1 gap-4">
          <TitlePlusBtn
            title="Magic Words"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <MagicWordsList />
      </div>
      <Modal
        title="Add new Magic Word"
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
              autoFocus
            />

            {/* --note------------------------------------------ */}
            <Modal_Input_Text
              name="note"
              errorMessages={errors.note?.message}
            />
            {/* --Importance------------------------------------------ */}
            <Modal_Input_Importance />

            <ModalFooter
              closeBtnName="Close"
              onCancel={onClose}
              submitBtnName="Save Magic Word"
            />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
