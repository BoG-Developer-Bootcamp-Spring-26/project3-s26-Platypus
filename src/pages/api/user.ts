// creates and deletes accounts

import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, deleteUser } from '../../../webapp/server/mongodb/actions/userActions';
import User from '../../../webapp/server/mongodb/models/user';
import * as argon2 from 'argon2';
import connectDB from '../../../webapp/server/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await connectDB();
            const { fullName, email, password } = req.body;
            if (!fullName || !email || !password) {
                return res.status(400).json({ error: 'All required user information is not present.' });
            }
            const newUser = await createUser(req.body);
            return res.status(200).json({ message: 'User was created successfully', user: newUser });
        } catch(err) {
            if (err instanceof Error) {
                if (err.message === "Email is already used") {
                    return res.status(400).json({ err: err.message });
                }
            }
            return res.status(500).json({ err: 'There was an error'});
        }
    }
    else if (req.method === 'DELETE') {
        try {
            const { id, email, password } = req.body;
            if (!id || !email || !password) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            // we need to check if the inputted password is the same
            await connectDB();
            const accessor = await User.findById(id);
            if (!accessor) {
                return res.status(500).json({ error: "Account not created" });
            }
            const passwordValidity = await argon2.verify(accessor.password, password);
            if (!passwordValidity || email !== accessor.email) {
                return res.status(500).json({ error: 'Invalid credentials' });
            }
            const result = await deleteUser(id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ err: 'There was an error deleting the user.' });
        }
    }
    else {
        return res.status(500).json({ error: 'Invalid HTTP method'});
    }
}
