import Link from 'next/link';
import React from 'react';
import Details from '../../component/Details';
function id() {
    
    // console.log(router)
    
    return (
        <div className="match">
            <Link href="/">Home</Link>
            <Details/>
        </div>
    )
}

export default id
