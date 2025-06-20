"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Task } from "@/types/types";
import Counter from "@/components/Counter";
import TaskList from "@/components/TaskList";
import BigButton from "@/components/BigButton";
import CreateTaskForm from "@/components/CreateTaskForm";
import { FaPlusCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = () => {
    api
      .get("/tasks")
      .then((res) =>
        setTasks(res.data.sort((a: Task, b: Task) => a.id - b.id))
      );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteAll = async () => {
    try {
      await api.delete(`/tasks`);
      console.log("All Tasks deleted");
      fetchTasks();
    } catch (err) {
      console.error("DELETE:", err);
    }
  };

  return (
    <main className="w-[46rem] mt-5 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Welcome to Checkify!</h1>
      <section id="buttons" className="flex justify-between">
        <Counter
          value={tasks.filter((task) => !task.done).length}
          title="Open Tasks"
          style="bg-undone"
        />
        <Counter
          value={tasks.filter((task) => task.done).length}
          title="Finished Tasks"
          style="bg-done"
        />
        <BigButton
          icon={<FaPlusCircle size={48} />}
          text="Add task"
          style="bg-main-purple"
          onClick={() => setShowForm(true)}
        />
        <BigButton
          icon={<FaTrashAlt size={48} />}
          text="Delete all"
          style="bg-custom-red"
          onClick={deleteAll}
        />
      </section>
      <TaskList tasks={tasks} onRefresh={fetchTasks} />
      {showForm && (
        <CreateTaskForm
          onClose={() => setShowForm(false)}
          onTaskAdded={fetchTasks}
        />
      )}
    </main>
  );
}
