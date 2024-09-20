import { useState } from "react";

export default function NewTask({ onAddTask }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleAddTask() {
    if(enteredTask.trim() === '') {
        return
    }
    
    setEnteredTask('');
    onAddTask(enteredTask);
  }

  return (
    <div className="flex items-center gap-4">
      <input
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        value={enteredTask}
        onChange={handleChange}
      />
      <button className="text-stone-700 hover:text-stone-950" onClick={handleAddTask}>Add Task</button>
    </div>
  );
}
