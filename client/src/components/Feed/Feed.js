import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Post from '../Post'
import ScrollToTop from './ScrollToTop'
import './feed.css'

const Feed = () => {
    const [uploads, setUploads] = useState([])

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${BaseURL}/upload`).then((response) => {
            setUploads(response.data);
        });
    }, [])

    return (
        <div className="feed start">

            {uploads.length === 0 &&
                <div className="no-hoots-feed">
                    <p>Your timeline is empty</p>
                    <div className="profile-hoot">
                        <Link to="/create">
                            Create Hoot
                        </Link>
                    </div>
                </div>
            }

            {uploads.map((upload) => {
                return (<div key={upload.id}>
                    <Post
                        hootId={upload.id}
                        avatar="/images/default_user_profile.svg"
                        username={upload.authorUsername}
                        mimeType={upload.mimeType}
                        hootImgId={upload.image}
                        likes={upload.likes}
                        caption={upload.caption}
                        timeStamp={upload.timeStamp}
                        edited={upload.edited}
                        editedTimeStamp={upload.editedTimeStamp}
                    />
                </div>)
            }).reverse()}

            {uploads.length > 3 && <ScrollToTop />}

        </div>
    )
}

export default Feed
