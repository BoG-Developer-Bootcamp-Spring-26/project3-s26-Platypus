import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import AnimalCard from "../components/AnimalCard";
import SearchBar from "../components/SearchBar";
import { useUser } from "../hooks/useUser";

type Animal = {
  _id: string;
  name: string;
  breed: string;
  owner: { _id: string; fullName: string } | string;
  hoursTrained: number;
  profilePicture: string;
};

type FormData = {
  name: string;
  breed: string;
  hoursTrained: string;
  profilePicture: string;
};

export default function AnimalsPage() {
  const { user } = useUser();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", breed: "", hoursTrained: "", profilePicture: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAnimals();
  }, []);

  async function fetchAnimals() {
    setLoading(true);
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

  const myAnimals = animals.filter((a) => {
    const ownerId = typeof a.owner === "object" ? a.owner._id : a.owner;
    const matchesOwner = ownerId === user?.id;
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchesOwner && matchesSearch;
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    try {
      const res = await fetch("/api/animal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          breed: form.breed,
          hoursTrained: Number(form.hoursTrained),
          profilePicture: form.profilePicture,
          owner: user.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create animal.");
        return;
      }

      setForm({ name: "", breed: "", hoursTrained: "", profilePicture: "" });
      setShowForm(false);
      fetchAnimals();
    } catch {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Animals</h1>
          <div className="flex items-center gap-4">
            <SearchBar onSearch={setSearch} placeholder="Search by name..." />
            <button
              onClick={() => { setShowForm(true); setError(""); }}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
            >
              <Image src="/images/createNewLogo.png" alt="Create" width={16} height={16} />
              Add Animal
            </button>
          </div>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-6">New Animal</h2>
              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="Breed"
                  required
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="number"
                  placeholder="Hours Trained"
                  required
                  min={0}
                  value={form.hoursTrained}
                  onChange={(e) => setForm({ ...form, hoursTrained: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="url"
                  placeholder="Profile Picture URL"
                  value={form.profilePicture}
                  onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setError(""); }}
                    className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Animals grid */}
        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : myAnimals.length === 0 ? (
          <p className="text-gray-400 text-sm">No animals yet. Add one!</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {myAnimals.map((animal) => (
              <AnimalCard key={animal._id} animal={animal} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
