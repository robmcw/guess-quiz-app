import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import ScoreContext from '../store/score-context'

const Results = ({ questionId, data, show, guess, answer, numberOfQuestions }) => {

    const questionIdNumber = parseInt(questionId)

    // To do: work out why this does not support decimal places
    const correctAnswer = JSON.stringify(answer) == JSON.stringify(guess);

    let button = null

    // If answer correct, add +1 to ScoreContext 
    const ctx = useContext(ScoreContext);
    useEffect(() => {
        if (correctAnswer) {
            ctx.onCorrectAnswer(++ctx.score)
        }
    }, [correctAnswer])



    // If Max number of questions reached (numberOfQuestions), show score page
    if (questionIdNumber === numberOfQuestions - 1) {
        button =
            <Link href={`/score`} passHref>
                <button> Show score </button>
            </Link>
    } else {
        button =
            <Link href={`/question/${questionIdNumber + 1}`} passHref>
                <button
                > Next question </button>
            </Link>
    }

    // If correct, show CORRECT page content
    if (show && correctAnswer) {

        return (
            <div className={"flexContainer"}>

                <h1>
                    You nailed it! 😎
                </h1>

                <p>{data.option1Text}: {data.option1Amount} {data.unit} </p>
                <p>{data.option2Text}: {data.option2Amount} {data.unit}  </p>
                <p>{data.option3Text}: {data.option3Amount} {data.unit}  </p>

                {button}
            </div >
        )
    }
    // Else if not correct, show INCORRECT page content
    else if (show && !correctAnswer) {
        return (
            <div className={"flexContainer"}>
                <h1>
                    Wrong! 😑
                </h1>

                <p>{data.option1Text}: <b> {data.option1Amount} {data.unit} </b></p>
                <p>{data.option2Text}: <b> {data.option2Amount} {data.unit} </b></p>
                <p>{data.option3Text}: <b> {data.option3Amount} {data.unit} </b> </p>

                {button}

            </div>
        )

    } else {
        return (
            null
        )
    }
}

export default Results;