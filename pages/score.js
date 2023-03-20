import React, { useContext } from 'react'
import ScoreContext from "../store/score-context";
import useCopy from "use-copy";
import Contact from '../components/Contact';
import styles from '../styles/Score.module.css'


const Score = () => {

    const ctx = useContext(ScoreContext);

    const pie = "🥧".repeat(ctx.score)

    let pietext = ""

    ctx.score === 1 ? pietext = "pie" : pietext = "pies";

    const [copied, copy, setCopied] = useCopy
        (` My Piece of Pie score was: ${ctx.score} ${pietext} out of 5 ${pie} \n \n Can you do better? https://guess-quiz-app.vercel.app/ `)


    const copyText = () => {
        copy();
        setTimeout(() => {
            setCopied(false);
        }, 6000);
    }

    let shareButton =
        <button
            onClick={copyText}>
            Share your score
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
                You&apos;re all done!
            </h1>

            <h2> You got {ctx.score} out of 5 pies right </h2>

            <p> {pie} </p>

            {shareButton}

            <div className={styles.getAlerts}>

                <Contact />

            </div>
        </div>

    )
}

export default Score;