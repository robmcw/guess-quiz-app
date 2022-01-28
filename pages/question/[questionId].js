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

export async function getStaticProps(context) {

    const questionId = context.params.questionId;

    // Call DB and bring back Question
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
        }
    }

}

export default function Question(props) {

    const [showModal, setShowModal] = useState(false);

    const [selectPie0, setSelectPie0] = useState(false)
    const [selectPie1, setSelectPie1] = useState(false)
    const [selectPie2, setSelectPie2] = useState(false)

    const [selectOption0, setSelectOption0] = useState(false)
    const [selectOption1, setSelectOption1] = useState(false)
    const [selectOption2, setSelectOption2] = useState(false)

    console.log(`SELECT OPTION 0`, selectOption0)
    console.log(`SELECT OPTION 1`, selectOption1)
    console.log(`SELECT OPTION 2`, selectOption2)

    const router = useRouter()
    const {
        query: { questionId },
    } = router

    return (
        <div className={styles.container}>
            isSelected: false
            }}>
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
                    onClick={(option) =>
                        setShowModal(true)
                    }
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
                    onClose={() => setShowModal(false)}
                    show={showModal}
                    onSelectOption0={() => setSelectOption0(true)}
                    onSelectOption1={() => setSelectOption1(true)}
                    onSelectOption2={() => setSelectOption2(true)}>
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