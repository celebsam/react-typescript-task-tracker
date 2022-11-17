import React, { useState, useEffect } from "react";
import { Task } from "../model";
import "../App.scss";
import Aos from "aos";
import toast from "react-hot-toast";

interface Props {
  task: Task;
  deleteHandler: (id: number) => void;
  editHandler: (id: number) => void;
  checkHandler: (id: number) => void;
}

const SingleTask = ({
  task,
  deleteHandler,
  editHandler,
  checkHandler,
}: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const modalHandler = () => {
    setShow(!show);
  };

  const disabledHandler = () => {
    toast.error("Can't view completed task.");
  };
  return (
    <>
      {show ? (
        <div className="modal">
          <p>{task.task}</p>
        </div>
      ) : null}

      {show ? <div onClick={modalHandler} className="backdrop"></div> : null}

      <div className={`task-container ${task.complete ? "grey" : ""}`}>
        <h3
          className={`${task.complete ? "checked" : ""}`}
          onClick={!task.complete ? modalHandler : disabledHandler}
          title="Click to view"
        >
          {task.task}
        </h3>
        <div>
          {task.complete ? (
            <i
              className="fas fa-undo"
              title="Mark as not completed"
              onClick={() => checkHandler(task.id)}
            ></i>
          ) : (
            <i
              className="fas fa-check"
              title="Mark as completed"
              onClick={() => checkHandler(task.id)}
            ></i>
          )}

          <i
            className="fas fa-edit"
            title="Edit task"
            onClick={() => editHandler(task.id)}
          ></i>
          <i
            className="fas fa-trash"
            title="Delete task"
            onClick={() => deleteHandler(task.id)}
          ></i>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
