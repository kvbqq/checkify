"use client";

import { Task } from "@/types/types";
import { FaTrashAlt } from "react-icons/fa";
import api from "@/lib/axios";

export default function TaskList({
  tasks,
  onRefresh,
}: {
  tasks: Task[];
  onRefresh: () => void;
}) {
  const taskToggle = async (taskId: number) => {
    try {
      await api.patch(`/tasks/${taskId}`);
      console.log("Task status updated");
      onRefresh();
    } catch (err) {
      console.error("PATCH:", err);
    }
  };

  const taskDelete = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      console.log("Task deleted");
      onRefresh();
    } catch (err) {
      console.error("DELETE:", err);
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between border-b-2 border-b-custom-gray">
        <h2 className="text-lg font-bold">Tasks Overview</h2>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between ml-1 p-5 mb-2 shadow-[-4px_0_0] ${
                task.done ? "shadow-done" : "shadow-undone"
              } border-2 border-custom-gray`}
            >
              <div>
                <div className="flex gap-5 items-center">
                  <h1 className="text-xl font-semibold">{task.title}</h1>
                  <p
                    className={`px-3 py-1 text-xs font-medium text-white-bg rounded-full ${
                      task.done ? "bg-done" : "bg-undone"
                    }`}
                  >
                    {task.done ? "FINISHED" : "OPEN"}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex gap-5 text-white-bg text-sm font-semibold">
                <button
                  className="p-5 bg-custom-red rounded-lg"
                  onClick={() => taskDelete(task.id)}
                >
                  <FaTrashAlt size={24} />
                </button>
                <button
                  className={`p-5 ${
                    task.done ? "bg-undone" : "bg-done"
                  } rounded-lg`}
                  onClick={() => taskToggle(task.id)}
                >
                  {task.done ? "Mark as Open" : "Mark as Finished"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>You do not have any tasks yet</p>
        </div>
      )}
    </section>
  );
}
