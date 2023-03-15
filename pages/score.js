import React, { useContext } from 'react'
import ScoreContext from "../store/score-context";
import useCopy from "use-copy";

const Score = () => {

    const ctx = useContext(ScoreContext);
    const wrongCount = 5 - ctx.score

    const pie = "🥧".repeat(ctx.score)
    const cross = "❌".repeat(5 - ctx.score)

    let pietext = ""

    ctx.score === 1 ? pietext = "pie" : pietext = "pies";

    const [copied, copy, setCopied] = useCopy
        (` My Piece of Pie score was: ${ctx.score} ${pietext} out of 5 ${pie} ${cross} \n \n Can you do better? https://guess-quiz-app.vercel.app/ `)


    const copyText = () => {
        copy();
        setTimeout(() => {
            setCopied(false);
        }, 6000);
    }

    let shareButton =
        <button
            onClick={copyText}>
            Share score
        </button>

    if (copied) {
        shareButton =
            <button
                onClick={copyText}>
                Copied to clipboard ✅
            </button>
    }

    return (
        <div className={"flexContainer"}>
            <h1>
                Your Score
            </h1>
            <p> You&apos;ve finished the quiz! </p>

            <p> You got {ctx.score} out of 5 questions right.</p>

            {shareButton}

        </div>
    )
}

export default Score;