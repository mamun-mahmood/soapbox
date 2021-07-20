import React, { useState } from 'react'
import './engagements.css'

const Trends = () => {
    const [trends, setTrends] = useState([
        {
            id: 1,
            trendsHeading: "Trending in USA",
            trendsKeyword: "Vero SoapBox",
            trendsHoots: "710k"
        },
        {
            id: 2,
            trendsHeading: "Trending in India",
            trendsKeyword: "DocuMega by MegaHoot",
            trendsHoots: "880k"
        },
        {
            id: 3,
            trendsHeading: "Trending in SF",
            trendsKeyword: "VeroHive",
            trendsHoots: "1145k"
        },
    ]);

    return (
        <div>
            {trends.map((trend) => {
                return (<div className="trends-map" key={trend.id}>
                    <div className="trends-country">
                        {trend.trendsHeading}
                    </div>
                    <div className="trends-keyword">
                        <strong>{trend.trendsKeyword} • {trend.trendsHoots} hoots</strong>
                    </div>
                </div>)
            })}
        </div>
    )
}

export default Trends
