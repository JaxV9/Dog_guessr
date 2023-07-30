import React, { useState, useEffect } from 'react';

function Scores() {

    const [scores, setScores] = useState(null);

    useEffect(() => { // Fetch the scores from the API
        fetch('http://localhost:8000/scores/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setScores(data);
            });
    }, []);

    if (!scores) {
        return <div>Loading...</div>;
    }

    const numScores = scores.map(score => score.score);

    const highestScore = Math.max(...numScores);

    return (
        <>
            <div className='navigation'>
                <a href="/">
                    <button className='navigationButton'>Home</button>
                </a><br />
                <a href="/breed">
                    <button className='navigationButton'>KPI about the API</button>
                </a>
            </div>
            <div>
                <h1>Dashboard</h1>

                <h2>Highest Score: {highestScore}</h2>

                <h2>Number of games played: {scores.length}</h2>

                <h2>Score list:</h2>

                <ul>
                    {scores.map(score => (
                        <li key={score.id}>
                            {score.score}
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
}

export default Scores;
