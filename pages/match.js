import Link from 'next/link'
import React from 'react'
import Live from '../component/Live'
import Result from '../component/Result'

function match() {
    
    return (
        <div className="match">
            <Link href="/">Home</Link>
            <Live/>
            <h1 className="matchResult"> Recent Result</h1>
            <Result url={"https://api.bdcrictime.com/score/matches?status=2&per_page=6&paged=1"}/>
            <h1 className="matchResult">Upcoming</h1> 
            <Result url={"https://api.bdcrictime.com/score/matches?status=1&per_page=6&paged=1"}/>
            <footer>
                Api is taken from <a target="_blank" className="footer" href="https://www.bdcrictime.com/" rel="noreferrer">bdcrictime</a>
            </footer>
        </div>
    )
}

export default match
