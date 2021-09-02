import React from 'react'
import './hashtags.css'

const HashtagItem = ({ hashtag }) => {
    return (
        <div className="hashtag-name">
            {hashtag}
        </div>
    )
}

export default HashtagItem
