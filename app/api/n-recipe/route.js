'use server';

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongo';

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db('recipesdb');
        const recipes = db.collection('recipes');

        const body = await req.json();
        console.log(body);
        const {
            slug,
            title,
            summary,
            instructions,
            creator,
            creator_email,
            image_name
        } = body;

        if (!slug || !title || !image_name || !summary || !instructions || !creator || !creator_email) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const newRecipe = {
            slug,
            title,
            summary,
            instructions,
            creator,
            creator_email,
            image_name,
        };

        const result = await recipes.insertOne(newRecipe);

        return NextResponse.json({ success: true, recipe: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error saving recipe:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

