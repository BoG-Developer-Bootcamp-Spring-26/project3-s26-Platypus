// verifies if person logging in puts in correct credentials

import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../webapp/server/mongodb";
import User from "../../../../webapp/server/mongodb/models/user";
import * as argon2 from 'argon2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            throw new Error('Invalid HTTP method');
        }
        await connectDB();
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ error: 'Invalid Username/Password'} );
        }
        const isPassValid = await argon2.verify(user.password, password);
        if (!isPassValid) {
            return res.status(500).json({ error: 'Invalid Username/Password'} );
        }
        return res.status(200).json({
            id: user._id,
            admin: user.admin
        }); // whenever the user logs in, their id and admin status is saved for the duration of their stay on the site
    } catch(error) {
        return res.status(500).json({ error: 'There was an error' });
    }
}