import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import { Modal_Input_Importance } from "../../Modal/Modal_Input_Importance";
import { Modal_Input_TextArea } from "../../Modal/Modal_Input_TextArea";
import ModalFooter from "../../Modal/ModalFooter";
import TitleAndBtns from "../../TitleAndBtns";
import { TaskFormData, taskSchema } from "../constants";
import { Task } from "../contexts/Task";
import useTasks from "../hooks/useTasks";
import { FilterBar } from "./FilterBar";
import TaskList from "./TaskList";

type NewTask = Omit<Task, "id">;

export default function Tasks() {
  const { addTask } = useTasks();
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm<TaskFormData>({ resolver: zodResolver(taskSchema) });
  const errors = methods.formState.errors;

  useEffect(() => {
    // render the page at the top of the page when the page is loaded
    window.scrollTo(0, 0);
  }, []);

  function onSubmit(data: FieldValues) {
    // add new task
    const newTask: NewTask = {
      title: data.title,
      importance: data.importance,
      star: false,
      done: false,
      _createdAt: new Date()
    };
    addTask(newTask);
    methods.reset();
    setIsModalOpen(false);
  }

  function onClose() {
    // close the modal
    methods.reset();
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="flex justify-center items-center flex-col flex-wrap min-w-[300px] w-full  max-w-[800px] h-fit bg-slate-300 rounded-md p-1 gap-4">
          <TitleAndBtns
            title="Tasks"
            onPlusClick={() => setIsModalOpen(true)}
            onSettingClick={() => {}}
          />
          <FilterBar onChange={setSearch} searchName={search} />
          <TaskList searchName={search} />
        </div>
      </div>
      <Modal
        title="Add new Task"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* --Title------------------------------------------ */}
            <Modal_Input_TextArea
              labelName="text"
              registerName="title"
              errorMessages={errors.title?.message}
              autoFocus
            />

            {/* --Importance------------------------------------------ */}
            <Modal_Input_Importance />

            <ModalFooter
              closeBtnName="Close"
              onCancel={onClose}
              submitBtnName="Save Task"
            />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
