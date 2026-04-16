import connectDB from "../index.js";
import Animal from "../models/Animal.js";
import Training from "../models/Training.js";

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

export async function deleteAnimal(id) {
  await connectDB();

  const animal = await Animal.findById(id);
  if (!animal) {
    throw new Error("Animal not found");
  }

  await Training.deleteMany({ animal: id });
  await animal.deleteOne();
  return { success: true, message: "Animal was deleted" };
}

export async function getAllAnimals() {
  await connectDB();
  const animals = await Animal.find({}).populate("owner", "fullName email");
  return animals;
}
