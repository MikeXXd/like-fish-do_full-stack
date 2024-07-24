import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import { Modal_Input_Importance } from "../../Modal/Modal_Input_Importance";
import { Modal_Input_Text } from "../../Modal/Modal_Input_Text";
import ModalFooter from "../../Modal/ModalFooter";
import TitleAndBtns from "../../TitleAndBtns";
import { RitualFormData, ritualSchema } from "../constants";
import { Ritual } from "../contexts/Ritual";
import useRituals from "../hooks/useRituals";
import RitualsList from "./RitualsList";
import Modal_Input_TimeBase from "../../Modal/Modal_Input_TimeBase";
import { Modal_Input_TextArea } from "../../Modal/Modal_Input_TextArea";

export function Rituals() {
  const { addRitual } = useRituals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methodes = useForm<RitualFormData>({
    resolver: zodResolver(ritualSchema)
  });
  const errors = methodes.formState.errors;

  useEffect(() => {
    // render the page at the top of the page when the page is loaded
    window.scrollTo(0, 0);
  }, []);

  function onSubmit(data: FieldValues) {
    // add new ritual
    const newRitual: Ritual = {
      title: data.title,
      description: data.description,
      importance: data.importance,
      _timeBase: data.timeBase,
      frequency: data.frequency,
      _createdAt: new Date(),
      performed: []
    };
    addRitual(newRitual);
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
          <TitleAndBtns
            title="Rituals"
            onPlusClick={() => setIsModalOpen(true)}
            onSettingClick={() => {}}
          />
        </div>
        <RitualsList />
      </div>
      <Modal
        title="Add new Ritual"
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

            {/* --Description------------------------------------------ */}
            <Modal_Input_TextArea
              labelName="description"
              registerName="description"
              errorMessages={errors.description?.message}
            />
            {/* --Importance------------------------------------------ */}
            <Modal_Input_Importance />

            {/* --basis------------------------------------------  */}
            <Modal_Input_TimeBase errorMessages={errors.frequency?.message} />

            <ModalFooter
              closeBtnName="Close"
              onCancel={onClose}
              submitBtnName="Save Ritual"
            />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
