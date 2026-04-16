import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TrainingCard from "../../components/TrainingCard";
import SearchBar from "../../components/SearchBar";

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
        setLogs(data);
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Training Logs</h1>
          <SearchBar onSearch={setSearch} placeholder="Search by title..." />
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
  );
}