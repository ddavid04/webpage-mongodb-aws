'use client';
import loadingClasses from '../../app/meals/loading.module.css'
import classes from './meals-grid.module.css'
import MealItem from "@/components/meals/meal-item";
import {useEffect, useState} from "react";
export default function MealsGrid({loadingClass}) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/recipes');
            const result = await res.json();
            setMeals(result);
            setLoading(false)
        };
        fetchData();
    }, []);


    return (<>
        {loading && <div>
            <span className={loadingClasses.loader}></span>
            <p className={loadingClass}>Fetching meals...</p>
        </div>}

        {meals.message && <h1 className={'error'} style={{color: "tan", fontSize: "5rem"}}>{meals.message}. Please refresh the page.</h1>}
        {!meals.message && <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal._id}>
                    <MealItem {...meal}/>
                </li>
            ))}
        </ul>}
    </>);
}