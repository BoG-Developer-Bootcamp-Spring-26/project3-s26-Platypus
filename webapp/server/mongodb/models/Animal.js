import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hoursTrained: { type: Number, default: 0 },
  profilePicture: { type: String, default: "" },
});

export default mongoose.models.Animal || mongoose.model("Animal", AnimalSchema);
