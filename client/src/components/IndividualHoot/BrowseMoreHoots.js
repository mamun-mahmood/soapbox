import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post'
import InfiniteScrollLoader from '../Feed/InfiniteScrollLoader';
import '../Feed/feed.css'

const BrowseMoreHoots = ({ hashtagsFound, iHootId }) => {
    const [uploads, setUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const BaseURL = process.env.REACT_APP_API_URL;

    const LIMIT = 10;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.get(`${BaseURL}/upload/p?page=1&limit=${LIMIT}`).then((response) => {
                setUploads(response.data.results);
            });
        }
        getAllUploadData();
    }, [])

    const fetchMoreHoots = async () => {
        await axios.get(`${BaseURL}/upload/p?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const hootsFromServer = response.data.results;

                setUploads([...uploads, ...hootsFromServer]);

                if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    }

    return (
        <div className="feed">
            {/* no need to reverse the list as it is getting reversed from the server itself  */}
            {uploads &&
                <InfiniteScroll
                    dataLength={uploads.length}
                    next={fetchMoreHoots}
                    hasMore={hasMore}
                    loader={<InfiniteScrollLoader />}
                >
                    {uploads.filter(upload => upload.id !== iHootId).map((upload) => {
                        return (<div key={upload.id}>
                            {hashtagsFound.some(hashtag => (upload.caption).includes(hashtag))
                                ?
                                <Post
                                    hootId={upload.id}
                                    username={upload.authorUsername}
                                    mimeType={upload.mimeType}
                                    hootImgId={upload.image}
                                    likes={upload.likes}
                                    views={upload.views}
                                    caption={upload.caption}
                                    link={upload.link}
                                    ephemeral={upload.ephemeral}
                                    expiryDate={upload.expiryDate}
                                    timeStamp={upload.timeStamp}
                                    edited={upload.edited}
                                    editedTimeStamp={upload.editedTimeStamp}
                                />
                                : null
                            }
                        </div>)
                    })}
                </InfiniteScroll>
            }
        </div>
    )
}

export default BrowseMoreHoots
