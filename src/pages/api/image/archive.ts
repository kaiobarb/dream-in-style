import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseForm, FormidableError } from '../../../lib/parse-form';
import fs from 'fs';
import { getAuth } from '@clerk/nextjs/server';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_API_BASE_URL = 'https://dreambooth-api-experimental.replicate.com/v1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    try {
        const { fields, files } = await parseForm(req);
        const zipFile = files.zipFile;

        const response = await axios.post(
            `${REPLICATE_API_BASE_URL}/upload/${zipFile.newFilename}`,
            {},
            { headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` } }
        );

        console.log('Uploading file to GCS...');
        // Upload file data to the provided upload_url
        await axios.put(response.data.upload_url, fs.readFileSync(zipFile.filepath), {
            headers: {
                'Content-Type': zipFile.mimetype,
            },
        });

        return res.status(200).json({ upload_url: response.data.upload_url, serving_url: response.data.serving_url });
    } catch (e) {
        console.log('Error:', e);
        if (e instanceof FormidableError) {
            res.status(e.httpCode || 400).json({ message: e.message });
        } else {
            res.status(500).json({ message: `Internal Server Error: ${e.message}` });
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
