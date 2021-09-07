import React from 'react'
import { Link } from 'react-router-dom'

const EndStockHootMsg = () => {
    return (
        <div>
            <p className="end-hoot-msg" >
                <Link to="/create"> Create Hoot </Link> with
                {" "}<Link to="/stocks"> $stocks </Link>
                {" "}to get listed
            </p>
        </div>
    )
}

export default EndStockHootMsg
