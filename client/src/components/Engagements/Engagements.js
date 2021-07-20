import React from 'react'
import Trends from './Trends'
import './engagements.css'

const Engagements = () => {
    return (
        <div className="engagements">
            <div className="engagements-title">
                <h4>Engagements</h4>
            </div>
            <div className="trends-card">
                <div className="trends-heading">
                    <h3>Trending</h3>
                </div>
                <Trends />
                <Trends />
            </div>
        </div>
    )
}

export default Engagements
