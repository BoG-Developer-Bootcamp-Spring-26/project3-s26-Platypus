import type { NextApiRequest, NextApiResponse } from "next";
import {
  createTraining,
  updateTraining,
  deleteTraining,
  getTrainingByOwner,
} from "../../../webapp/server/mongodb/actions/trainingActions.js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const training = await createTraining(req.body);
      return res.status(200).json(training);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { id, ...updateData } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Training log id is required" });
      }
      const training = await updateTraining(id, updateData);
      return res.status(200).json(training);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { ownerId } = req.query;
      if (!ownerId || typeof ownerId !== "string") {
        return res.status(400).json({ error: "ownerId query param is required" });
      }
      const trainings = await getTrainingByOwner(ownerId);
      return res.status(200).json(trainings);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Training log id is required" });
      }
      const result = await deleteTraining(id);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
