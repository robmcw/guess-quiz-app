import React, { useContext } from 'react'
import ScoreContext from "../store/score-context";

const Score = () => {

    const ctx = useContext(ScoreContext);

    return (
        <div className={"flexContainer"}>
            <h1>
                Your Score
            </h1>
            <p> You&apos;ve finished the quiz! </p>

            <p> You got {ctx.score} out of 5 questions right.</p>

        </div>
    )
}

export default Score;