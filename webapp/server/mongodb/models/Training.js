import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
});

export default mongoose.models.Training || mongoose.model("Training", TrainingSchema);