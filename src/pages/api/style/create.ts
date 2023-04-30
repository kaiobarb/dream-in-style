import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PrismaClient, Style } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_API_BASE_URL = 'https://dreambooth-api-experimental.replicate.com/v1';

const trainDreamBoothModel = async (servingUrl: string, name: string) => {
    const trainingData = {
        input: {
            instance_prompt: 'a photo of a kbc',
            class_prompt: `a style of ${name}`,
            instance_data: servingUrl,
            max_train_steps: 2000,
        },
        model: `kaiobarb/${name}`,
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
        console.log(response);
        try {
            // code to save style to db
            const style = await prisma.style.create({
                data: {
                    userId: Number(userId) ?? undefined,
                    name: styleName,
                    keywords,
                    description,
                    archiveURL: servingUrl,
                },
            });
        } catch (e) {
            console.log('Error saving style to db:', e);
        }
    } catch (e) {
        console.log(e);
    }

    return res.status(200).json({ message: 'success' });
}
