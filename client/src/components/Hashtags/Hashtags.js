import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet";
import HashtagItem from './HashtagItem'
import { Link } from 'react-router-dom'
import './hashtags.css'

const Hashtags = () => {
    const [hashtags, setHashtags] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // getting user data
        const getHashtagsData = async () => {
            await axios.get(`${BaseURL}/hashtags`)
                .then((response) => {
                    setHashtags(response.data);
                });
        }
        getHashtagsData();
    }, [])

    return (
        <div className="hashtag-main">
            <div className="hashtag-head">
                Trending Hashtags
            </div>
            <div className="hashtags-page">
                {hashtags.map((hashtag) => {
                    return (<div className="hashtag-hover" key={hashtag.id}>
                        <Link to={`/hashtags/${(hashtag.hashtag).replace('#', '')}`} style={{ textDecoration: "none" }}>
                            <HashtagItem hashtag={hashtag.hashtag} />
                        </Link>
                    </div>
                    )
                })}
            </div>
            <Helmet>
                <title>Trending Hashtags on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
            </Helmet>
        </div>
    )
}

export default Hashtags
