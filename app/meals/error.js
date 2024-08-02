'use client';
export default function Error ({error}) {

return (<main className={'error'}>
<h1>An error has occurred!</h1>
    <p>Failed to fetch meal data.</p>
    <p>{error}</p>
</main>);
}