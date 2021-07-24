import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
            {uploads.map((upload) => {
                return (<div key={upload.id}>
                    <Post
                        hootId={upload.id}
                        avatar="https://pbs.twimg.com/profile_images/603269306026106880/42CwEF4n_200x200.jpg"
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

            <ScrollToTop />

        </div>
    )
}

export default Feed
