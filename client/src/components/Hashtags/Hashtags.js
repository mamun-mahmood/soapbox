import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HashtagItem from './HashtagItem'
import { Link, useHistory } from 'react-router-dom'
import './hashtags.css'

const Hashtags = () => {
    const history = useHistory();
    const [hashtags, setHashtags] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    // getting user data
    useEffect(() => {
        const getHashtagsData = async () => {
            await axios.get(`${BaseURL}/hashtags`)
                .then((response) => {
                    setHashtags(response.data);
                    console.log(hashtags);
                });
        }
        getHashtagsData();
    }, [])

    return (
        <div className="hashtag-main">
            <div className="hashtags-page">
                {hashtags.map((hashtag) => {
                    return (<div key={hashtag.id}>
                        <Link to={`/hashtags/${(hashtag.hashtag).replace('#', '')}`} style={{ textDecoration: "none" }}>
                            <HashtagItem hashtag={hashtag.hashtag} />
                        </Link>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Hashtags
