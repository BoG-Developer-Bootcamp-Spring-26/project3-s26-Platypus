import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import AnimalCard from "../../components/AnimalCard";

type Animal = {
  _id: string;
  name: string;
  breed: string;
  owner: { _id: string; fullName: string } | string;
  hoursTrained: number;
  profilePicture: string;
};

export default function AdminAnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const res = await fetch("/api/admin/animals");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unknown error");
        setAnimals(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load animals.");
      } finally {
        setLoading(false);
      }
    }
    fetchAnimals();
  }, []);

  const filtered = animals.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <TopBar onSearch={setSearch} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 px-12 pt-6 pb-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-lg text-gray-700">All Animals</h1>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400 text-sm">No animals found.</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {filtered.map((animal) => (
                <AnimalCard key={animal._id} animal={animal} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
