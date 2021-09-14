import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Post from '../Post'
import EndMsg from './EndMsg';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollLoader from './InfiniteScrollLoader';
import './feed.css'

const Feed = () => {
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
        <div className="feed start">
            {/* no need to reverse the list as it is getting reversed from the server itself  */}
            {uploads &&
                <InfiniteScroll
                    dataLength={uploads.length}
                    next={fetchMoreHoots}
                    hasMore={hasMore}
                    loader={<InfiniteScrollLoader />}
                    endMessage={<EndMsg />}
                // refreshFunction={fetchMoreHoots}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={<PullDown />}
                // releaseToRefreshContent={<Release />}
                >
                    {uploads.map((upload) => {
                        return (<div key={upload.id}>
                            <Post
                                hootId={upload.id}
                                username={upload.authorUsername}
                                mimeType={upload.mimeType}
                                hootImgId={upload.image}
                                likes={upload.likes}
                                views={upload.views}
                                caption={upload.caption}
                                ephemeral={upload.ephemeral}
                                timeStamp={upload.timeStamp}
                                edited={upload.edited}
                                editedTimeStamp={upload.editedTimeStamp}
                            />
                        </div>)
                    })}
                </InfiniteScroll>
            }
        </div>
    )
}

export default Feed
