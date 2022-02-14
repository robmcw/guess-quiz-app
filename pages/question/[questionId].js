import { MongoClient } from 'mongodb'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Piechart from '../../components/Piechart.js'
import OptionsModal from '../../components/OptionsModal.js'
import Results from '../../components/Results.js'
import { route } from 'next/dist/server/router'

export async function getStaticPaths() {

    require('dotenv').config();
    const client = await MongoClient.connect(process.env.MONGODBCREDENTIALS);
    const db = client.db();
    const questionsCollection = db.collection('questions');
    const questions = await questionsCollection.find().toArray();
    client.close()

    return {
        // To do: Ids should be fetched dynamically
        fallback: true,
        paths: [
            {
                params: { questionId: '0' },
            }
        ]
    }
}

export const getStaticProps = async () => {

    // Call DB and bring back Question data

    require('dotenv').config();
    const client = await MongoClient.connect(process.env.MONGODBCREDENTIALS);
    const db = client.db();
    const questionsCollection = db.collection('questions');
    const questions = await questionsCollection.find().toArray();
    client.close()

    return {
        props: {
            questions: questions.map(questions => ({
                title: questions.title,
                description: questions.description,
                unit: questions.unit,

                option1Text: questions.option1.text,
                option1Amount: questions.option1.amount,
                option1Index: 0,

                option2Text: questions.option2.text,
                option2Amount: questions.option2.amount,
                option2Index: 1,

                option3Text: questions.option3.text,
                option3Amount: questions.option3.amount,
                option3Index: 2,
                id: questions._id.toString()
            }))
        },
    }
}



const Question = (props) => {


    const router = useRouter()

    const {
        query: { questionId },
    } = router

    const dynamicRoute = useRouter().asPath

    useEffect(() => {
        setShowModal(false),
            setSelectPie(),
            setGuess1(null),
            setGuess2(null),
            setGuess3(null),
            setShowResults(false)
    }, [dynamicRoute])

    const [showModal, setShowModal] = useState(false);

    // Store which part of piechart has been selected (passed from Piechart component on click)
    const [selectPie, setSelectPie] = useState()

    // Store the guesses that the user makes in Options Modal key value pairs
    const [guess1, setGuess1] = useState(null)
    const [guess2, setGuess2] = useState(null)
    const [guess3, setGuess3] = useState(null)
    const [showResults, setShowResults] = useState(false)

    // If all guesses comeplete, 'show results' button shows in Piechart component
    let guessesComplete = false
    if (guess1 && guess2 && guess3) {
        guessesComplete = true
    }

    // Take guess option number and pass to guess state
    const setGuessHandler = (guess) => {
        if (guess1 === null) {
            setGuess1(guess)
        } else if (guess1 !== null & guess2 === null) {
            setGuess2(guess)
        } else {
            setGuess3(guess)
        }
    }
    const guess = {
        ...guess1,
        ...guess2,
        ...guess3
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    const answer = {
        [props.questions[questionId].option1Amount]: props.questions[questionId].option1Text,
        [props.questions[questionId].option2Amount]: props.questions[questionId].option2Text,
        [props.questions[questionId].option3Amount]: props.questions[questionId].option3Text
    }

    let questionTitle = null
    if (!guessesComplete) {
        questionTitle =
            <h1>Here are 3 {props.questions[questionId].title}. Click one to match it to a scenario.</h1>
    }


    return (
        <div className="flexContainer">
            {questionTitle}
            <Piechart
                onClick={() =>
                    setShowModal(true)
                }
                setSelectPie={setSelectPie}
                data={props.questions[questionId]}
                guessesComplete={guessesComplete}
                setShowResults={setShowResults}
                showResults={showResults}
            />

            <OptionsModal
                onClose={() => setShowModal(false)
                }
                questionTitle={questionTitle}
                show={showModal}
                pieSelect={selectPie}
                onGuess={setGuessHandler}
                option1Text={props.questions[questionId].option1Text}
                option2Text={props.questions[questionId].option2Text}
                option3Text={props.questions[questionId].option3Text}
            >
            </OptionsModal>

            <Results
                questionId={questionId}
                show={showResults}
                answer={answer}
                guess={guess}
                data={props.questions[questionId]}
            />
        </div>
    )
}


export default Question;