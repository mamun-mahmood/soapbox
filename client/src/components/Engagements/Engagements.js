import React from 'react'
import Trends from './Trends'
import './engagements.css'

const Engagements = () => {
    return (
        <div className="engagements">
            <div className="engagements-title">
                <h5>Engagements</h5>
            </div>
            <div className="trends-card">
                <div className="trends-heading">
                    <h4>Trending</h4>
                </div>
                <Trends />
                <Trends />
            </div>
        </div>
    )
}

export default Engagements
