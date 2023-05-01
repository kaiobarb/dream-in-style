import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PrismaClient, Style } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';
import { createStyle } from '@/lib/db';

const prisma = new PrismaClient();

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_API_BASE_URL = 'https://dreambooth-api-experimental.replicate.com/v1';

const trainDreamBoothModel = async (servingUrl: string, name: string) => {
    const trainingData = {
        input: {
            instance_prompt: `a photo of a kbc ${name.toLowerCase()}}`,
            class_prompt: `a style of ${name.toLowerCase()}`,
            instance_data: servingUrl,
            max_train_steps: 2000,
        },
        model: `kaiobarb/${name.toLowerCase()}`,
        trainer_version:
            'cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa',
    };

    return axios.post(`${REPLICATE_API_BASE_URL}/trainings`, trainingData, {
        headers: { Authorization: `Token ${REPLICATE_API_TOKEN}`, 'Content-Type': 'application/json' },
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);

    let response;
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const { servingUrl, styleName, keywords, description } = req.body;
    try {
        response = await trainDreamBoothModel(servingUrl, styleName);
        if (userId) await createStyle(userId, styleName, keywords, description, servingUrl)
    } catch (e) {
        console.log(e);
    }

    return res.status(200).json({ message: 'success' });
}
