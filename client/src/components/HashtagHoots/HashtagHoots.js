import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { FaHashtag } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom'
import InfiniteScrollLoader from '../Feed/InfiniteScrollLoader';
import EndHootMsg from '../IndividualHoot/EndHootMsg';
import Post from '../Post';
import './hashtagHoots.css'

const HashtagHoots = () => {
    const { hashtag } = useParams();
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

    const finalHashtag = '#' + hashtag;
    return (
        <Fragment>
            <div className="hashtag-hoots-main">
                <div className="home">
                    <div className="hashtag-hoot-wrapper">
                        <div className="hashtag-hoots-name" >
                            <FaHashtag style={{ marginTop: "0.3rem" }} />{hashtag}
                        </div>
                    </div>
                </div>

                {uploads &&
                    <InfiniteScroll
                        dataLength={uploads.length}
                        next={fetchMoreHoots}
                        hasMore={hasMore}
                        loader={<InfiniteScrollLoader />}

                    >
                        {uploads.map((upload) => {
                            return (<div key={upload.id}>
                                {(upload.caption).includes(finalHashtag)
                                    ?
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
                                    : null
                                }
                            </div>)
                        })}
                    </InfiniteScroll>
                }
                <EndHootMsg />
            </div >
        </Fragment>
    )
}

export default HashtagHoots
