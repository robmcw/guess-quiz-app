import '../styles/globals.css'
import '../styles/utilities.css'
import Layout from '../pages/components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Suprising Scales</title>
        <meta name="description" content="Know your scales from your fails" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp




