import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongo';

export async function GET(req, { params }) {
    const mealSlug = parseInt(params.mealSlug, 10);
    try {
        const client = await clientPromise;
        const db = client.db('recipesdb');
        const recipes = db.collection('recipes');


        const recipe = await recipes.findOne({ slug: mealSlug });

        if (!recipe) {
            return NextResponse.json({ success: false, message: 'Meal not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, recipe });
    } catch (error) {
        console.error('Error fetching meal:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
