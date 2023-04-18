import { MongoClient } from 'mongodb'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Piechart from '../../components/Piechart.js'
import OptionsModal from '../../components/OptionsModal.js'
import Results from '../../components/Results.js'
import ResetButton from '../../components/ResetButton.js'
import { collectionVersion } from '../../config/collectionVersion.js'

export async function getStaticPaths() {


    require('dotenv').config();
    const client = await MongoClient.connect(process.env.MONGODBCREDENTIALS);
    const db = client.db();
    const questionsCollection = db.collection(collectionVersion);
    const questions = await questionsCollection.find().toArray();
    client.close()

    const paths = await questions.map(question => {
        return {
            params:
            {
                questionId: `${question.questionId}`,
            }
        }
    })

    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async () => {

    // Call DB and bring back Question data
    require('dotenv').config();
    const client = await MongoClient.connect(process.env.MONGODBCREDENTIALS);
    const db = client.db();
    const questionsCollection = db.collection(collectionVersion);
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
    const [reset, setReset] = useState(false)


    // If all guesses comeplete, 'show results' button shows in Piechart component
    let guessesComplete = false
    if (guess1 && guess2 && guess3) {
        guessesComplete = true
    }

    // Take guess option number and pass to guess state
    const setGuessHandler = (guess, reset) => {
        if (reset) {
            console.log("setGuessHandler running")
            setGuess1(null)
            setGuess2(null)
            setGuess3(null)
        }
        else if (guess1 === null) {
            setGuess1(guess)
        } else if (guess1 !== null & guess2 === null) {
            setGuess2(guess)
        } else {
            setGuess3(guess)
        }
    }

    const resetGuesses = () => {
        console.log("Resetting guesses function running...")
        setGuessHandler(null, true)
        setReset(true)
    }

    const guess = {
        ...guess1,
        ...guess2,
        ...guess3
    }

    const question = props.questions[questionId - 1]

    const answer = {
        [question.option1Amount]: question.option1Text,
        [question.option2Amount]: question.option2Text,
        [question.option3Amount]: question.option3Text
    }

    let questionTitle = null
    if (!guessesComplete) {
        questionTitle =
            <h1>Here are 3 {question.title}. Click a segment and match it to a thing.</h1>
    }

    const numberOfQuestions = Object.keys(props.questions).length

    // Close modal and if no option was selected (because user used Close button), reset pie
    const onClose = (buttonId) => {
        setShowModal(false)
        if (buttonId === undefined) {
            resetGuesses()
        }
        { }
    }

    return (
        <div className="flexContainer">
            {questionTitle}
            <Piechart
                onClick={() =>
                    setShowModal(true)
                }
                setSelectPie={setSelectPie}
                data={question}
                guessesComplete={guessesComplete}
                setShowResults={setShowResults}
                showResults={showResults}
                reset={reset}
                setReset={setReset}
            />

            {/* <ResetButton
                guessesComplete={guessesComplete}
                guess1={guess1}
                onReset={resetGuesses}>
            </ResetButton> */}

            <OptionsModal
                onClose={onClose}
                unit={question.unit}
                show={showModal}
                pieSelect={selectPie}
                onGuess={setGuessHandler}
                option1Text={question.option1Text}
                option2Text={question.option2Text}
                option3Text={question.option3Text}
                reset={reset}
                setReset={setReset}
            >
            </OptionsModal>

            <Results
                questionId={questionId}
                numberOfQuestions={numberOfQuestions}
                show={showResults}
                answer={answer}
                guess={guess}
                data={question}
            />
        </div>
    )
}



export default Question;