import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import TrainingCard from "../../components/TrainingCard";

type TrainingLog = {
  _id: string;
  title: string;
  description: string;
  hours: number;
  date: string;
  owner: { _id: string; fullName: string } | string;
  animal: { _id: string; name: string; breed: string } | string;
};

export default function AdminTrainingPage() {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/admin/training");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unknown error");
        setLogs(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load training logs.");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const filtered = logs.filter((log) =>
    log.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar onSearch={setSearch} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-12 pt-6 pb-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-lg text-gray-700">All Training Logs</h1>
          </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-sm">No training logs found.</p>
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl">
            {filtered.map((log) => (
              <TrainingCard key={log._id} log={log} />
            ))}
          </div>
        )}
        </main>
      </div>
    </div>
  );
}