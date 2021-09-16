import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import './backToFeed.css'

const BackToFeed = () => {
    return (
        <div className="back-to-feed">
            {/* <Link to="/home"> */}
            <Link to="/">
                <FiArrowLeft className="left-arrow" />
            </Link>
            <span>
                Back
            </span>
        </div>
    )
}

export default BackToFeed
