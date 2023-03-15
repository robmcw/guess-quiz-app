import '../styles/globals.css'
import '../styles/utilities.css'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Router from "next/router";
import ScoreContext from '../store/score-context'
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0)
  const [value, setValue] = useState()

  useEffect(() => {

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const scoreHandler = (newScore) => {
    console.log("Updating score to " + newScore)
    setScore(newScore)
  }

  return (
    <>
      <ScoreContext.Provider value={{
        score: score,
        value: value,
        onCorrectAnswer: scoreHandler
      }}>
        <Head>
          <title>Piece of Pie</title>
          <meta name="description" content="5 scenarios. 5 piecharts. Can you match them?" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {loading ? (
          <Loader />
        ) : (
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        )}
      </ScoreContext.Provider>
    </>
  )
}

export default MyApp




