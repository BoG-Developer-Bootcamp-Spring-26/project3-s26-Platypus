import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import TrainingCard from "../components/TrainingCard";
import { useUser } from "../hooks/useUser";

type TrainingLog = {
  _id: string;
  title: string;
  description: string;
  hours: number;
  date: string;
  owner: { _id: string; fullName: string } | string;
  animal: { _id: string; name: string; breed: string } | string;
};

type FormData = {
  title: string;
  description: string;
  hours: string;
  animal: string;
};

const emptyForm: FormData = { title: "", description: "", hours: "", animal: "" };

export default function TrainingPage() {
  const { user } = useUser();
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user?.id) fetchLogs();
  }, [user?.id]);

  async function fetchLogs() {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/training?ownerId=${user.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setLogs(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load training logs.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = logs.filter((log) =>
    log.title.toLowerCase().includes(search.toLowerCase())
  );

  function openCreateModal() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditModal(log: TrainingLog) {
    const animalId = typeof log.animal === "object" ? log.animal._id : log.animal;
    setEditingId(log._id);
    setForm({
      title: log.title,
      description: log.description,
      hours: String(log.hours),
      animal: animalId,
    });
    setError("");
    setShowForm(true);
  }

  function closeModal() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("You must be logged in.");
      return;
    }

    try {
      const isEditing = editingId !== null;
      const res = await fetch("/api/training", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing
            ? { id: editingId, owner: user.id, title: form.title, description: form.description, hours: Number(form.hours), animal: form.animal }
            : { title: form.title, description: form.description, hours: Number(form.hours), animal: form.animal, owner: user.id }
        ),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || `Failed to ${isEditing ? "update" : "create"} training log.`);
        return;
      }

      closeModal();
      fetchLogs();
    } catch {
      setError("Something went wrong.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this training log?")) return;

    try {
      const res = await fetch("/api/training", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete training log.");
        return;
      }

      fetchLogs();
    } catch {
      alert("Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar onSearch={setSearch} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-12 pt-6 pb-10">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-lg text-gray-700">Training logs</h1>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 border border-gray-300 rounded text-gray-500">+</span>
              Create new
            </button>
          </div>

          {/* Create / Edit modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-10">
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">
                  {editingId ? "Edit Training Log" : "New Training Log"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  <textarea
                    placeholder="Description"
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 resize-none"
                  />
                  <input
                    type="number"
                    placeholder="Hours"
                    required
                    min={0}
                    step="0.5"
                    value={form.hours}
                    onChange={(e) => setForm({ ...form, hours: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  <input
                    type="text"
                    placeholder="Animal ID"
                    required
                    value={form.animal}
                    onChange={(e) => setForm({ ...form, animal: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition"
                    >
                      {editingId ? "Save Changes" : "Create"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Training logs list */}
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400 text-sm">No training logs yet. Add one!</p>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((log) => (
                <TrainingCard key={log._id} log={log} onEdit={() => openEditModal(log)} onDelete={() => handleDelete(log._id)} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
