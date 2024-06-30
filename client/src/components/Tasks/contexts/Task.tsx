import { ReactNode, createContext, useEffect, useState } from "react";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Importance } from "../../../constants";
import apiClient from "../../../services/api-client";
import { CanceledError } from "axios";

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
  _createdAt: Date;
  finishedAt?: Date;
}

interface TasksContext {
  tasks: Task[];
  addTask: (task: Task) => void;
  taskDone: (task: Task) => void;
  editTask: (task: Task) => void;
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
    const controller = new AbortController();
    apiClient
      .get("/tasks", { signal: controller.signal })
      .then((tasks) => {
        setTasks(tasks.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
      });

    return () => controller.abort();
  }, []);

  function addTask(task: Task) {
    apiClient
      .post("/tasks", task)
      .then((res) => {
        // Optimistic update
        const data = res.data;
        setTasks([...tasks, data]);
      })
      .catch((error) => console.log(error));
  }

  function deleteTask(DeleteTask: Task) {
    apiClient
      .delete("/tasks", { data: { id: DeleteTask._id } })
      .then(() => {
        // Optimistic update
        setTasks(tasks.filter((task) => task._id !== DeleteTask._id));
      })
      .catch((error) => console.log(error));
  }

  function editTask(task: Task) {
    apiClient
      .put("/tasks", { id: task._id, ...task })
      .then(() => {
        // Optimistic update
        const updatedTasks = tasks.map((t) => (t._id === task._id ? task : t));
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  }

  function taskDone(editingTask: Task) {
    const newStatus = !editingTask.done;
    // task marked as done, consequently not starred and finished time added(that will cause deleting of the task in 24 hours(taking care by mongodb) if not unmarked by the time)
    const taskChanged = {
      ...editingTask,
      done: newStatus,
      star: false,
      finishedAt: new Date()
    };
    editTask(taskChanged);
    // Optimistic update
    const updatedTasks = tasks.map((task) =>
      task._id === editingTask._id
        ? { ...task, done: newStatus, star: false }
        : task
    );
    setTasks(updatedTasks);
  }

  function filterFinishedTasks() {
    setAreFinishedTasksHidden((value) => !value);
  }

  function arrangeStarForTask(editingTask: Task) {
    const newStatus = !editingTask.star;
    const taskChanged = { ...editingTask, star: newStatus };
    editTask(taskChanged);
    // Optimistic update
    const updatedTasks = tasks.map((task) =>
      task._id === editingTask._id ? { ...task, star: newStatus } : task
    );
    setTasks(updatedTasks);
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
