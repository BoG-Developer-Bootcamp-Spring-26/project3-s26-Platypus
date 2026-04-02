import connectDB from "../index.js";
import Animal from "../models/Animal.js";

export async function createAnimal(data) {
  await connectDB();
  const animal = await Animal.create(data);
  return animal;
}

export async function updateAnimal(id, data) {
  await connectDB();
  const animal = await Animal.findByIdAndUpdate(id, data, { new: true });
  return animal;
}

export async function getAllAnimals() {
  await connectDB();
  const animals = await Animal.find({}).populate("owner", "fullName email");
  return animals;
}
