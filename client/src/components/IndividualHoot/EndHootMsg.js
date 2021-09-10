import React from 'react'
import { Link } from 'react-router-dom'

const EndHootMsg = () => {
    return (
        <p className="end-hoot-msg" >
            <Link to="/create"> Create Hoot </Link> with
            {" "}
            <a href="soapbox:;">
                #hashtags
            </a>
            {" "}to get listed
        </p>
    )
}

export default EndHootMsg
