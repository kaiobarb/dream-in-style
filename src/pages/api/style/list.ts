import type { NextApiRequest, NextApiResponse } from 'next';
import { getStyles } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    try {
        const allStyles = await getStyles();
        return res.status(200).json({ styles: allStyles });
    } catch (e) {
        console.log(e);
    }

    return res.status(200).json({ message: 'success' });
}
