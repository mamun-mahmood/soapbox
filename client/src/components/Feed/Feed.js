import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../Post'
import BeatLoader from "react-spinners/BeatLoader";
import './feed.css'

const Feed = () => {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.get(`${BaseURL}/upload`).then((response) => {
                setUploads(response.data);
            });
            setLoading(false);
        }
        // setTimeout(() => {
        getAllUploadData();
        // }, 3000);
    }, [])

    return (
        <div className="feed start">
            {loading &&
                <div className="loading">
                    <BeatLoader color={"#8249A0"} size={20} />
                </div>
            }

            {uploads &&
                uploads.map((upload) => {
                    return (<div key={upload.id}>
                        <Post
                            hootId={upload.id}
                            username={upload.authorUsername}
                            mimeType={upload.mimeType}
                            hootImgId={upload.image}
                            likes={upload.likes}
                            views={upload.views}
                            caption={upload.caption}
                            timeStamp={upload.timeStamp}
                            edited={upload.edited}
                            editedTimeStamp={upload.editedTimeStamp}
                        />
                    </div>)
                }).reverse()
            }

            {/* {uploads && uploads.length > 3 && <ScrollToTop />} */}
        </div>
    )
}

export default Feed
