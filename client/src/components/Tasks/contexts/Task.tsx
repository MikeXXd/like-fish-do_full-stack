import { ReactNode, createContext, useEffect, useState } from "react";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Importance } from "../../../constants";
import axios from "axios";

// const LOCAL_STORAGE_TASKS = {
//   KEY: "taskies",
//   DEFAULT: []
// };

const SORTING_VALUES = ["ascend", "descend", undefined] as const;

export type SortingValues = (typeof SORTING_VALUES)[number];

export interface Task {
  _id?: string;
  title: string;
  importance: Importance;
  done: boolean;
  star: boolean;
  timeStamp: Date;
  // finishedAt: Date;
}

interface TasksContext {
  tasks: Task[];
  addTask: (task: Task) => void;
  taskDone: (task: Task) => void;
  editTask: (task: Task) => void;
  setTaskImportance: (_id: string, importance: Importance) => void;
  deleteTask: (task: Task) => void;
  filterFinishedTasks: () => void;
  areFinishedTasksHidden: boolean;
  arrangeStarForTask: (task: Task) => void;
  filterByImportance: (importance: SortingValues) => void;
  importanceFilter: SortingValues;
  filterByTime: (importance: SortingValues) => void;
  timeFilterState: SortingValues;
}

export const Context = createContext<TasksContext>({} as TasksContext);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [areFinishedTasksHidden, setAreFinishedTasksHidden] =
    useState<boolean>(false);
  const [importanceFilter, setImportanceFilter] = useState<SortingValues>();
  const [timeFilterState, setTimeFilterState] = useState<SortingValues>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((tasks) => {
        setTasks(tasks.data);
      })
      .catch((error) => console.log(error));
  }, [tasks]);

  function addTask(task: Task) {
    axios
      .post("http://localhost:3001/", task)
      .then((res) => {
        const data = res.data;
        setTasks([...tasks, data]);
      })
      .catch((error) => console.log(error));
  }

  function deleteTask(DeleteTask: Task) {
    console.log("DeleteTaskId", DeleteTask._id);
    axios
      .delete("http://localhost:3001/", { data: { id: DeleteTask._id } })
      .then(() => {
        console.log("Task deleted successfully");
      })
      .catch((error) => console.log(error));
  }

  function taskDone(taskDone: Task) {
    setTasks(
      tasks.map((task) =>
        task._id === taskDone._id
          ? { ...task, done: !task.done, star: false }
          : task
      )
    );
  }

  // function deleteTask(DeleteTask: Task) {
  //   setTasks(tasks.filter((task) => task._id !== DeleteTask._id));
  // }

  function editTask(updatingTask: Task) {
    const updatedTasks = tasks.map((task) =>
      task._id === updatingTask._id ? updatingTask : task
    );
    setTasks(updatedTasks);
  }

  function setTaskImportance(_id: string, importance: Importance) {
    const updatedTasks = tasks.map((task) =>
      task._id === _id ? { ...task, importance: importance } : task
    );
    setTasks(updatedTasks);
  }

  function filterFinishedTasks() {
    setAreFinishedTasksHidden((value) => !value);
  }

  function arrangeStarForTask(taskStar: Task) {
    setTasks(
      tasks.map((task) =>
        task._id === taskStar._id ? { ...task, star: !task.star } : task
      )
    );
  }

  function filterByImportance(importance: SortingValues = undefined) {
    setImportanceFilter(importance);
  }
  function filterByTime(timeState: SortingValues = undefined) {
    setTimeFilterState(timeState);
  }

  return (
    <Context.Provider
      value={{
        tasks,
        addTask,
        taskDone,
        deleteTask,
        editTask,
        setTaskImportance,
        filterFinishedTasks,
        areFinishedTasksHidden,
        arrangeStarForTask,
        importanceFilter,
        filterByImportance,
        filterByTime,
        timeFilterState
      }}
    >
      {children}
    </Context.Provider>
  );
}
