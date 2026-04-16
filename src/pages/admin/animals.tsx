import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AnimalCard from "../../components/AnimalCard";
import SearchBar from "../../components/SearchBar";

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
        setAnimals(data);
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Animals</h1>
          <SearchBar onSearch={setSearch} placeholder="Search by name..." />
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
  );
}
