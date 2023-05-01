import { registerUser } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { clerkId, email } = req.body;
    try {
        await registerUser(clerkId, email);
        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'error' });
    }
}