import Head from 'next/head'
import Link from 'next/link'
import Svg from '../svg/home.svg'
export default function Home() {
  return (
    <div className="Home">
      <Head>
        <title>Live score</title>
        <meta name="description" content="Cricket Live score" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="left__container">
          <div className="main_text">
          <h1>Check Live Score</h1>
          <p>Get realtime score of Cricket matches.</p><br/>
          <Link href="/match">Get started</Link>
          </div>
        </div>
        <div className="right__container">
          
          <Svg/>
        </div>
      </div>
     
    </div>
  )
}
