import { getAllTraining } from "../../../../webapp/server/mongodb/actions/trainingActions.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const trainings = await getAllTraining();
      return res.status(200).json(trainings);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}