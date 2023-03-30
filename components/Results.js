import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import ScoreContext from '../store/score-context'

const Results = ({ questionId, data, show, guess, answer, numberOfQuestions }) => {

    const questionIdNumber = parseInt(questionId)

    // This should now support decimal places
    const correctAnswer = JSON.stringify(answer) === JSON.stringify(guess);

    let button = null

    // If answer correct, add +1 to ScoreContext 
    const ctx = useContext(ScoreContext);
    useEffect(() => {
        if (correctAnswer) {
            ctx.onCorrectAnswer(++ctx.score)
        }
    }, [correctAnswer])


    // Group amount to text 

    const resultsUnsorted = [
        {
            text: data.option1Text,
            amount: data.option1Amount,
        },

        {
            text: data.option2Text,
            amount: data.option2Amount,
        },

        {
            text: data.option3Text,
            amount: data.option3Amount,
        }
    ]

    // Sort by biggest amount first
    const resultsSorted = resultsUnsorted.sort((firstItem, secondItem) => firstItem.amount - secondItem.amount).reverse();


    // If Max number of questions reached (numberOfQuestions), show score page
    if (questionIdNumber === numberOfQuestions) {
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

                <p>{resultsSorted[0].text}: {resultsSorted[0].amount} {data.unit} </p>
                <p>{resultsSorted[1].text}: {resultsSorted[1].amount} {data.unit}  </p>
                <p>{resultsSorted[2].text}: {resultsSorted[2].amount} {data.unit}  </p>

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

                <p>{resultsSorted[0].text}: {resultsSorted[0].amount} {data.unit} </p>
                <p>{resultsSorted[1].text}: {resultsSorted[1].amount} {data.unit}  </p>
                <p>{resultsSorted[2].text}: {resultsSorted[2].amount} {data.unit}  </p>

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