import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
    return res.status(200).json({ message: 'Logged out' });
}
