'use server';

import clientPromise from '../../../lib/mongo';

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db('recipesdb');
        const collection = db.collection('recipes');
        const data = await collection.find({}).toArray();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


