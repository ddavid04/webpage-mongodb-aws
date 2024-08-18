'use server';

import {redirect} from 'next/navigation';
import {revalidatePath} from "next/cache";

const BASE_URL = process.env.BASE_URL;

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
    const currentTimeStamp = Date.now();
    const newImgName = `${currentTimeStamp}-${formData.get('image').name}`;
    formData.set('imageName', newImgName);

    const meal = {
        slug: currentTimeStamp,
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        image_name: newImgName
    };

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator_email) ||
        isInvalidText(meal.creator) ||
        !meal.creator_email.includes('@') ||
        !formData.get('image') ||
        formData.get('image').size === 0) {
            return {
                message: 'Invalid input.'
            };
        }
        try {
            const response = await fetch(`${BASE_URL}api/images/new-image`, {
                method: 'POST',
                body: formData,

            });
            const data = await response.json();
        } catch (error) {
            return {
                message: error,
            }
        }


    try {
        const response = await fetch(`${BASE_URL}api/n-recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meal),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred while saving the recipe');
        }
        const data = await response.json();

    } catch (error) {
        console.error('Error submitting recipe:', error);
        throw error;
    }

        revalidatePath('/meals')
        redirect('/meals');
    }