import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../webapp/server/mongodb/actions/userActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            throw new Error('Invalid HTTP method');
        }
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                error: 'All required user information is not present.'
            });
        }
        const newUser = await createUser(req.body);
        return res.status(200).json({
            message: 'User was created successfully',
            user: newUser
        });
    } catch(err) {
        if (err instanceof Error) {
            if (err.message === "Email is already used") {
            return res.status(400).json({ err: err.message });
            }
        return res.status(500).json({ err: 'There was an error'});
        }
    }
}