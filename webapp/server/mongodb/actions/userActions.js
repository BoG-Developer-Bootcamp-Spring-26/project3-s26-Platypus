// contains functions for each part of CRUD (specifically for users)

import connectDB from "..";
import User from "../models/user";
import * as argon2 from 'argon2';

export async function createUser(data) {
    await connectDB();
    const existing = await User.findOne({ email: data.email });
    if (existing) {
        throw new Error("Email is already used");
    }
    const hashPass = await argon2.hash(data["password"]);
    const user = await User.create({ ...data, password: hashPass });
    return user;
}
export async function updateUser(id, data) {
    await connectDB();
    if (data.password) {
        data.password = await argon2.hash(data.password);
    }
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
        throw new Error("User not found.");
    }
    return updatedUser;
}
export async function getUser(id) {
    await connectDB();
    const inDB = await User.findById(id).select('-password'); // filters out password
    if (!inDB) {
        throw new Error("User not found.");
    }
    return inDB; // don't need to do inDB.data
}
export async function deleteUser(id) {
    await connectDB();
    const inDB = await User.findById(id); // i think you can also do User.findByIdAndDelete(id);
    if (!inDB) {
        throw new Error("User not found.");
    }
    await inDB.deleteOne();
    return { success: true,
        message: "User was deleted" };
}
