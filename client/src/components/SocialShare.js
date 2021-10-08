import React from 'react'
import { Helmet } from 'react-helmet'
import '../App.css'

const SocialShare = (share, Icon, name) => {
  
    // <Helmet>
    // <meta name="twitter:card" content="summary" />
    // <meta name="twitter:site" content="@nytimesbits" />
    // <meta name="twitter:creator" content="@nickbilton" />
    // <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
    // <meta property="og:title" content="A Twitter for My Sister" />
    // <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
    // <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />

    // </Helmet>
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
