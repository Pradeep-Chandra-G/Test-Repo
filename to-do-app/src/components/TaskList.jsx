import React, { useEffect, useState } from "react";

function TaskList() {
  const URL = "http://localhost:8080/tasks";
  const [tasks, setTasks] = useState([]); // store fetched notes

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded shadow bg-white text-black"
          >
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.content}</p>
            <p>{task.status}</p>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-red-600 font-mono">
          No Tasks Created Yet!
        </p>
      )}
    </div>
  );
}

export default TaskList;
