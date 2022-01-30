import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Piechart from '../components/Piechart'
import OptionsModal from '../components/OptionsModal'
import styles from '../../styles/Home.module.css'

export async function getStaticPaths() {
    return {
        // To do: Ids should be fetched dynamically
        fallback: true,
        paths: [
            {
                params: {
                    questionId: '1'
                }
            }
        ]
    }
}

export async function getStaticProps() {

    // Call DB and bring back Question data
    require('dotenv').config();
    const client = await MongoClient.connect(process.env.MONGODBCREDENTIALS);
    const db = client.db();
    const questionsCollection = db.collection('questions');
    const questions = await questionsCollection.find().toArray();
    client.close()

    // Map question data onto props
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
        }
    }
}

export default function Question(props) {

    const router = useRouter()
    const {
        query: { questionId },
    } = router

    const [showModal, setShowModal] = useState(false);

    // Store which part of piechart has been selected (passed from Piechart component on click)
    const [selectPie, setSelectPie] = useState()

    // Store the guesses that the user makes in Options Modal key value pairs
    const [guess1, setGuess1] = useState(null)
    const [guess2, setGuess2] = useState(null)
    const [guess3, setGuess3] = useState(null)

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

    console.log("GUESS 1 = " + JSON.stringify(guess1))
    console.log("GUESS 2 = " + JSON.stringify(guess2))
    console.log("GUESS 3 = " + JSON.stringify(guess3))

    return (
        <div className={styles.container}>

            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.subtitle}>
                    Here are 3 {props.questions[0].title}. Click one to match it to a scenario.
                </h1>

                <Piechart
                    onClick={() =>
                        setShowModal(true)
                    }
                    setSelectPie={setSelectPie}

                    //To do: make into object
                    option1Text={props.questions[0].option1Text}
                    option1Amount={props.questions[0].option1Amount}
                    option1Index={props.questions[0].option1Index}
                    option2Text={props.questions[0].option2Text}
                    option2Amount={props.questions[0].option2Amount}
                    option2Index={props.questions[0].option2Index}
                    option3Text={props.questions[0].option3Text}
                    option3Amount={props.questions[0].option3Amount}
                    option3Index={props.questions[0].option3Index}
                    unit={props.questions[0].unit}
                />

                <OptionsModal
                    onClose={() => setShowModal(false)
                    }
                    show={showModal}
                    pieSelect={selectPie}
                    onGuess={setGuessHandler}>
                </OptionsModal>

                <Link href={`/result/${questionId}`} passHref>
                    <button
                        className={styles.button}>
                        Show result
                    </button>
                </Link>

            </main>

            <footer className={styles.footer}>
                Powered by Robo
            </footer>
        </div>
    )
}