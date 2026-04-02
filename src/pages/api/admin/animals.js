import { getAllAnimals } from "../../../../webapp/server/mongodb/actions/animalActions.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const animals = await getAllAnimals();
      return res.status(200).json(animals);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
