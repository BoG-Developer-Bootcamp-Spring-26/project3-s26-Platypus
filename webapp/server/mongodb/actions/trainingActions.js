import connectDB from "../index.js";
import Training from "../models/Training.js";
import Animal from "../models/Animal.js";

export async function createTraining(data) {
  await connectDB();
  const { title, description, hours, owner, animal, date } = data;

  if (!title || !description || hours === undefined || !owner || !animal) {
    throw new Error("Required fields missing");
  }
  if (Number(hours) < 0) {
    throw new Error("Hours cannot be negative");
  }

  const animalInDB = await Animal.findById(animal);
  if (!animalInDB) {
    throw new Error("Animal not found");
  }
  if (animalInDB.owner.toString() !== String(owner)) {
    throw new Error("This animal does not belong to the specified user");
  }

  const training = await Training.create({
    title,
    description,
    hours: Number(hours),
    owner,
    animal,
    ...(date && { date }),
  });

  animalInDB.hoursTrained = Math.max(0, animalInDB.hoursTrained + Number(hours));
  await animalInDB.save();

  return training;
}

export async function updateTraining(id, data) {
  await connectDB();

  const oldTraining = await Training.findById(id);
  if (!oldTraining) {
    throw new Error("Training log not found");
  }

  if (data.owner && oldTraining.owner.toString() !== String(data.owner)) {
    throw new Error("The user does not match the training log owner");
  }

  if (data.animal && data.animal.toString() !== oldTraining.animal.toString()) {
    throw new Error("Cannot change the animal on an existing training log");
  }

  const oldHours = Number(oldTraining.hours);
  const newHours = data.hours !== undefined ? Number(data.hours) : oldHours;
  if (newHours < 0) {
    throw new Error("Hours cannot be negative");
  }

  const updatedTraining = await Training.findByIdAndUpdate(
    id,
    { ...data, ...(data.hours !== undefined ? { hours: newHours } : {}) },
    { new: true, runValidators: true }
  );

  if (newHours !== oldHours) {
    const animalInDB = await Animal.findById(oldTraining.animal);
    if (animalInDB) {
      animalInDB.hoursTrained = Math.max(0, animalInDB.hoursTrained + (newHours - oldHours));
      await animalInDB.save();
    }
  }

  return updatedTraining;
}

export async function getAllTraining() {
  await connectDB();
  const trainings = await Training.find({})
    .populate("owner", "fullName email")
    .populate("animal", "name breed")
    .sort({ date: -1 });
  return trainings;
}

export async function getTrainingByOwner(ownerId) {
  await connectDB();
  const trainings = await Training.find({ owner: ownerId })
    .populate("owner", "fullName email")
    .populate("animal", "name breed")
    .sort({ date: -1 });
  return trainings;
}