import mongoose from 'mongoose';

const userSchema = new Mongoose.schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // reminder: shouldn't be pure raw password (use argon hashing)
    admin: { type: Boolean, default: false }
});

export default mongoose.models.User || mongoose.model('User', userSchema);