import Link from 'next/link'
import styles from '../../styles/Home.module.css'

//TO DO – write function to see if guess matches answer


const Results = ({ questionId, data, show, guess, answer }) => {

    const correctAnswer = JSON.stringify(answer) == JSON.stringify(guess);
    const questionIdNumber = parseInt(questionId)

    if (show && correctAnswer) {
        return (
            <div className={"flexContainer"}>

                <h1>
                    You nailed it! 😎
                </h1>

                <p>{data.option1Text}: {data.option1Amount} {data.unit} </p>
                <p>{data.option2Text}: {data.option2Amount} {data.unit}  </p>
                <p>{data.option3Text}: {data.option3Amount} {data.unit}  </p>

                <Link href={`/question/${questionIdNumber + 1}`} passHref>
                    <button> Next question </button>
                </Link>
            </div >
        )
    }
    // Else if not correct, show INCORRECT page content
    else if (show && !correctAnswer) {
        return (
            <div className={"flexContainer"}>
                <h1>
                    Not quite! 😑
                </h1>

                <p>{data.option1Text}: <b> {data.option1Amount} {data.unit} </b> </p>
                <p>{data.option2Text}: <b> {data.option2Amount} {data.unit} </b>  </p>
                <p>{data.option3Text}: <b> {data.option3Amount} {data.unit} </b>  </p>

                <Link href={`/question/${questionIdNumber + 1}`} passHref>
                    <button> Next question </button>
                </Link>
            </div>
        )

        //TO D0 = If Max number of questions reached, show SCORE component

    } else {
        return (
            null
        )
    }
}

export default Results;