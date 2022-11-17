import React from "react";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: (e: React.FormEvent) => void;
  type: string;
  editRef: React.RefObject<HTMLInputElement>;
}

const Inputfield = ({ task, setTask, submitHandler, type, editRef }: Props) => {
  return (
    <form>
      <input
        type="text"
        id="task"
        name="task"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        ref={editRef}
      />
      {type === "submit" ? (
        <button onClick={submitHandler}>Submit</button>
      ) : (
        <button onClick={submitHandler}>Save</button>
      )}
    </form>
  );
};

export default Inputfield;
