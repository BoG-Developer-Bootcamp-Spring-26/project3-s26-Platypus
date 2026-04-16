// allows you to get all user information, given that you are an admin 

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../webapp/server/mongodb';
import User from '../../../../webapp/server/mongodb/models/User';

// we need the id to be passed in of the person requesting this info
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            throw new Error('Invalid HTTP method');
        }
        await connectDB();
        const requesterId = req.headers['user-id'];
        if (!requesterId || requesterId === 'undefined' || requesterId === '') {
            return res.status(400).json({ error: "Missing or invalid User ID." });
        }
        const requester = await User.findById(requesterId);

        if (!requester || !requester.admin) {
            return res.status(500).json({ error: "Unauthorized"});
        }
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        console.error("Backend Crash Error:", error); // debug timE!!
        return res.status(500).json({ error: 'There was an error' });
    }
}
