import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../webapp/server/mongodb';
import User from '../../../../webapp/server/mongodb/models/user';

// we need the id to be passed in of the person requesting this info
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            throw new Error('Invalid HTTP method');
        }
        await connectDB();
        const requesterId = req.headers['user-id'];
        const requester = await User.findById(requesterId);

        if (!requester || !requester.isAdmin) {
            return res.status(500).json({ error: "Unauthorized"});
        }
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'There was an error' });
    }
}
