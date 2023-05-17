import { useSession, signIn } from 'next-auth/react'
import DashboardActionBar from '../components/DashboardActionBar'
import DashboardNav from '../components/DashboardNav'
import DashboardQuestionTable from '../components/DashboardQuestionTable'
import { MongoClient } from 'mongodb'
import { collectionVersion } from '../config/collectionVersion.js'

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

const dashboard = (questions) => {
    const { data: session, status } = useSession({ required: true })


    // console.log(questions.questions[0].title)



    let index = Object.keys(questions.questions)

    // console.log(index)

    // console.log(index.map((key) => {
    //     return questions.questions[key].title
    // }))

    if (status === 'authenticated') {

        console.log("User is " + status)

        return (
            <div>

                <div>
                    <DashboardNav
                    />
                </div>

                <div>
                    <DashboardActionBar />
                </div>

                <div>
                    <DashboardQuestionTable
                        questions={questions}
                    />

                </div>

                <div className="flexContainer">
                    <button >Add question</button>
                </div>

            </div>
        )
    } else {
        console.log("User is " + status)
        return (
            <div>
                <p>You are not logged in</p>
                <button
                    onClick={() => signIn()}
                >Sign in</button>
            </div>
        )
    }
}

export default dashboard