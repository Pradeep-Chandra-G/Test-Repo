import React from "react";

function TaskList({ tasks, onDelete, onToggleStatus, onView }) {
  const activeTasks = tasks.filter((task) => !task.status);
  const finishedTasks = tasks.filter((task) => task.status);

  const renderTaskCard = (task) => (
    <div
      key={task.id}
      className="border p-4 rounded shadow bg-white text-black flex flex-col justify-between"
    >
      <div>
        <h2 className="font-bold">{task.title}</h2>
        <p>{task.content}</p>
        <p className="text-sm text-gray-600">
          Status: {task.status ? "Finished ✅" : "Active ⏳"}
        </p>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onToggleStatus(task)}
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
        >
          {task.status ? "Mark Active" : "Mark Finished"}
        </button>
        <button
          onClick={() => onDelete(task)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
        <button
          onClick={() => onView(task)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
        >
          View
        </button>
      </div>
    </div>
  );

  const renderEmptyState = (text) => (
    <div className="flex items-center justify-center h-40 w-full col-span-3">
      <p className="text-gray-500 font-mono">{text}</p>
    </div>
  );

  return (
    <div className="mt-6">
      {/* Active Tasks Section */}
      <h1 className="font-bold text-2xl mb-2">Active Tasks</h1>
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg min-h-[200px] border-2 border-black">
        {activeTasks.length > 0
          ? activeTasks.map(renderTaskCard)
          : renderEmptyState("No Active Tasks")}
      </div>

      {/* Finished Tasks Section */}
      <h1 className="font-bold text-2xl mt-6 mb-2">Finished Tasks</h1>
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border-2 border-black min-h-[200px]">
        {finishedTasks.length > 0
          ? finishedTasks.map(renderTaskCard)
          : renderEmptyState("No Finished Tasks")}
      </div>
    </div>
  );
}

export default TaskList;
