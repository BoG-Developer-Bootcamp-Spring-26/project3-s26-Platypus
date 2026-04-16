import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../webapp/server/mongodb";
import User from "../../../../webapp/server/mongodb/models/User";
import * as argon2 from 'argon2';
import { signToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Invalid HTTP method' });
        }
        await connectDB();
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Username' });
        }
        const isPassValid = await argon2.verify(user.password, password);
        if (!isPassValid) {
            return res.status(400).json({ error: 'Invalid Username/Password' });
        }

        const token = await signToken({
            id: user._id.toString(),
            fullName: user.fullName,
            isAdmin: user.admin,
        });

        const isProduction = process.env.NODE_ENV === 'production';
        res.setHeader(
            'Set-Cookie',
            `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProduction ? '; Secure' : ''}`
        );

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: 'There was an error' });
    }
}
