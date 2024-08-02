import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({slug, title, summary, creator, image_name}) {
    return (
        <article className={classes.meal}>
            <header className={classes}>
                <div className={classes.image}>
                    <Image src={`https://ddavid-recipes-bucket.s3.eu-central-1.amazonaws.com/${image_name}`} alt={title} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}