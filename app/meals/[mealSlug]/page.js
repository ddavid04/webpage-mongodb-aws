'use client'
import classes from './page.module.css';
import Image from "next/image";
import {notFound} from "next/navigation";
import {useEffect, useState} from "react";
import loadingClasses from "@/app/meals/loading.module.css";


export default function MealDetailsPage({params}) {
    const [meal, setMeal] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`/api/recipes/${params.mealSlug}`);
                if (res.ok) {
                    const data = await res.json();
                    setMeal(data.recipe);
                    setLoading(false)
                }
            } catch (err) {
                notFound();
            }
        };

        fetchRecipe();
    }, [params]);


    return (<>
        {loading && <div>
            <span className={loadingClasses.loader}></span>
            <p className={loadingClasses.loading}>Fetching meals...</p>
        </div>}
        {!loading && <div>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={`https://ddavid-recipes-bucket.s3.eu-central-1.amazonaws.com/${meal.image_name}`} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions.replace(/\n/g, '<br/>')
                }}></p>
            </main>
        </div>}
    </>);
}