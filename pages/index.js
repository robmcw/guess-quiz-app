import Head from 'next/head'
import Link from 'next/link'
// import utilityStyles from '../styles/utilities'
import styles from '../styles/Home.module.css'

export default function Home() {

  const questionId = "1"

  return (
    <main>
      <h1>
        Suprising Scales
      </h1>

      <p>
        Do you know your scales from your fails?
      </p>

      <p>
        Play through these 10 questions and match up the options to the size of the bar. The answers might suprise you!
      </p>

      <Link href={`/question/${questionId}`} passHref>
        <button> Start </button>
      </Link>
    </main>
  )
}
