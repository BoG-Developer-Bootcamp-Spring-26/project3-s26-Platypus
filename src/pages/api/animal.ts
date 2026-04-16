import type { NextApiRequest, NextApiResponse } from "next";
import { createAnimal, updateAnimal, deleteAnimal } from "../../../webapp/server/mongodb/actions/animalActions.js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const animal = await createAnimal(req.body);
      return res.status(201).json(animal);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { id, ...data } = req.body;
      const animal = await updateAnimal(id, data);
      if (!animal) return res.status(404).json({ error: "Animal not found" });
      return res.status(200).json(animal);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Animal id is required" });
      }
      const result = await deleteAnimal(id);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
