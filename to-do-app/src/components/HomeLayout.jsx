import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";

function HomeLayout() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTask, setSelectedTask] = useState(null); // for sidebar view/edit

  const URL = "http://localhost:8080/tasks";

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, status: false }),
      });
      setTitle("");
      setContent("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (task) => {
    await fetch(`${URL}/${task.id}`, { method: "DELETE" });
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    await fetch(`${URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: !task.status }),
    });
    fetchTasks();
  };

  const handleUpdateSidebarTask = async (updatedTask) => {
    await fetch(`${URL}/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
    setSelectedTask(null);
  };

  return (
    <div className="flex flex-row">
      {/* Left Panel */}
      <div className="w-2/3 bg-ash border-2 h-screen rounded-md ml-2 mt-2 mb-2 p-4">
        <h1 className="font-bold text-3xl mb-4">Create Task...</h1>

        <div className="bg-white border-black border-2 rounded-lg shadow-md p-6 mb-6 w-[70%]">
          <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
            >
              Add Task
            </button>
          </form>
        </div>

        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onView={setSelectedTask}
        />
      </div>

      {/* Sidebar */}
      <div className="w-1/3 bg-ash border-2 h-screen rounded-md m-2 p-4">
        {selectedTask ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="font-bold text-2xl mb-2">Edit Task</h1>
            <input
              type="text"
              value={selectedTask.title}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, title: e.target.value })
              }
              className="p-2 border rounded mb-2 w-full"
            />
            <textarea
              value={selectedTask.content}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, content: e.target.value })
              }
              className="p-2 border rounded mb-2 w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateSidebarTask(selectedTask)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            Select a task to view/edit
          </p>
        )}
      </div>
    </div>
  );
}

export default HomeLayout;
