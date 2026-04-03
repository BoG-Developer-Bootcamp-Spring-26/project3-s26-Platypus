// contains the schema required for a user (necesitates that users have baseline attributes like name, email, password, and if they are an admin)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // reminder: shouldn't be pure raw password (use argon hashing)
    admin: { type: Boolean, default: false }
});

export default mongoose.models.User || mongoose.model('User', userSchema);