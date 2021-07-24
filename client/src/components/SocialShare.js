import React from 'react'
import '../App.css'

const SocialShare = (share, Icon, name) => {
    return (
        <div className="share-icons">
            <a href={share} target="_blank" rel="nofollow" class="block button-transparent">
                <div className="share-icons-text">
                    <Icon className="twitter-share" />
                    <span className="share-hoot-to">
                        {name}
                    </span>
                </div>
            </a>
        </div>
    )
}

export default SocialShare
