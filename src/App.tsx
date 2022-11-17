import React, { useState, useEffect, useRef } from "react";
import Inputfield from "./components/Inputfield";
import "./App.scss";
import { Task } from "./model";
import SingleTask from "./components/SingleTask";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [type, setType] = useState<string>("submit");

  useEffect(() => {
    if (localStorage.getItem("samgenda")) {
      setAllTasks(JSON.parse(localStorage.getItem("samgenda") || ""));
    }
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const lowerTask = task.toLowerCase();
    if (!lowerTask) {
      return toast.error("Please fill in a task.");
    } else {
      if (lowerTask.length < 3) {
        return toast.error(
          "Invalid task. Task should have at least 3 letters."
        );
      }
      if (type === "save") {
        const newTask = allTasks.find((task) => task.id === id);
        if (newTask) {
          const taskExist = allTasks
            .filter((tsk) => tsk.id !== id)
            .find((t) => t.task === lowerTask);
          if (taskExist) {
            return toast.error("Task already exist.");
          }
          newTask.task = lowerTask;
          setAllTasks([...allTasks]);
          localStorage.setItem("samgenda", JSON.stringify([...allTasks]));

          toast.success("Task saved.");
          setTask("");
          setType("submit");
        }
      } else {
        const taskExist = allTasks.find((t) => t.task === lowerTask);
        if (taskExist) {
          return toast.error("Task already exist.");
        }
        toast.success("Task added.");
        setAllTasks([
          ...allTasks,
          { id: Date.now(), task: lowerTask, complete: false },
        ]);
        localStorage.setItem(
          "samgenda",
          JSON.stringify([
            ...allTasks,
            { id: Date.now(), task: lowerTask, complete: false },
          ])
        );
        setTask("");
      }
    }
  };

  const deleteHandler = (id: number) => {
    if (type === "save") {
      return toast.error("Can't delete while editing a task.");
    }
    if (window.confirm("Are you sure you want to delete")) {
      const newTasks = allTasks.filter((task) => task.id !== id);
      setAllTasks([...newTasks]);
      localStorage.setItem("samgenda", JSON.stringify([...newTasks]));
      toast.success("Task removed.");
    }
  };

  const editHandler = (id: number) => {
    if (type === "save") {
      return toast.error("Save current edit before editing another task.");
    }
    const task = allTasks.find((task) => task.id === id);
    if (task?.complete) {
      return toast.error("Can't edit a completed task.");
    }
    setType("save");
    if (task) {
      setTask(task.task);
      setId(task.id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkHandler = (id: number) => {
    if (type === "save") {
      return toast.error("Can't mark as complete while editing a task.");
    }
    const newTask = allTasks.find((task) => task.id === id);
    if (newTask) {
      newTask.complete = !newTask.complete;
      setAllTasks([...allTasks]);
      localStorage.setItem("samgenda", JSON.stringify([...allTasks]));

      if (newTask.complete === true) {
        toast.success("Task completed.");
      } else {
        toast.error("Task not completed.");
      }
    }
  };

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (type === "save") {
      editRef.current?.focus();
    }
  }, [type]);

  return (
    <>
      <Toaster />
      <div className="container">
        <h1>
          <span>S</span>
          <span className="color">A</span>
          <span>M</span>
          <span className="color">G</span>
          <span className="color">E</span>
          <span className="color">N</span>
          <span className="color">D</span>
          <span className="color">A</span>
        </h1>
        <Inputfield
          task={task}
          setTask={setTask}
          submitHandler={submitHandler}
          type={type}
          editRef={editRef}
        />

        <div className="task-list-container">
          {allTasks.map((task) => (
            <SingleTask
              key={task.id}
              task={task}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              checkHandler={checkHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
