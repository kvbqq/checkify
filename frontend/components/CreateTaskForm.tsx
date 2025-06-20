import { useState } from "react";
import api from "@/lib/axios";

type Props = {
  onClose: () => void;
  onTaskAdded: () => void;
};

export default function CreateTaskForm({ onClose, onTaskAdded }: Props) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    await api.post("/tasks", {
      ...form,
    });
    setForm({ title: "", description: "" });
    onClose();
    onTaskAdded();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Add new Task</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded mb-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mb-4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-custom-red text-white-bg text-sm rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-main-purple text-white-bg text-sm rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
