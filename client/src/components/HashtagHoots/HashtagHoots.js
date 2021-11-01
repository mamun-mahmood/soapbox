import axios from 'axios';
import { Helmet } from "react-helmet";
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
    const [allUploads, setAllUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const BaseURL = process.env.REACT_APP_API_URL;

    const LIMIT = 10;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.all[(
                axios.get(`${BaseURL}/upload/public/p?page=1&limit=${LIMIT}`).then((response) => {
                    setUploads(response.data.results);
                }),
                axios.get(`${BaseURL}/upload`).then((response) => {
                    setAllUploads(response.data);
                })
            )]
        }
        getAllUploadData();
    }, [])

    const fetchMoreHoots = async () => {
        await axios.get(`${BaseURL}/upload/public/p?page=${page}&limit=${LIMIT}`)
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

    var totalViews = 0;

    // const updateTotalHashtagViews = useCallback((finalHashtag, totalViews) => {
    //     axios.put(`${BaseURL}/hashtags`, {
    //         hashtag: finalHashtag,
    //         totalViews: totalViews
    //     })
    // }, [totalViews])

    // const delHashtag = async (finalHashtag) => {
    //     await axios.put(`${BaseURL}/hashtags`, {
    //         hashtag: finalHashtag,
    //         totalViews: 0
    //     })

    //     console.log(`${finalHashtag} deleted`);
    // }

    // (totalViews += upload.views, updateTotalHashtagViews(finalHashtag, totalViews))
    allUploads.map((upload) => {
        return (<div key={upload.id}>
            {(upload.caption).includes(finalHashtag)
                ?
                (totalViews += upload.views)
                : null
            }
        </div>)
    })

    // count will be formatted 
    const formatCount = count => {
        if (count < 1e3) return count;
        if (count >= 1e3 && count < 1e6) return +(count / 1e3).toFixed(1);
        if (count >= 1e6 && count < 1e9) return +(count / 1e6).toFixed(1);
        if (count >= 1e9 && count < 1e12) return +(count / 1e9).toFixed(1);
        if (count >= 1e12) return +(count / 1e12).toFixed(1);
    };

    // si stands for International System of Units
    const formatSi = count => {
        if (count < 1e3) return "";
        if (count >= 1e3 && count < 1e6) return "K";
        if (count >= 1e6 && count < 1e9) return "M";
        if (count >= 1e9 && count < 1e12) return "B";
        if (count >= 1e12) return "T";
    };

    return (
        <Fragment>
            <div className="hashtag-hoots-main">
                <div className="home">
                    <div className="hashtag-hoot-wrapper">
                        <div className="hashtag-hoots-name" >
                            <div className="hashtag-header">
                                <FaHashtag />{hashtag.toLowerCase()}
                            </div>
                            <span>
                                {formatCount(totalViews) + formatSi(totalViews)} Views
                                {/* {allUploads.length !== 0 &&
                                    `${formatCount(totalViews)}${formatSi(totalViews)} Views`
                                } */}
                            </span>
                        </div>
                    </div>
                </div>

                {/* {uploads &&
                    <InfiniteScroll
                        dataLength={uploads.length}
                        next={fetchMoreHoots}
                        hasMore={hasMore}
                        loader={<InfiniteScrollLoader />}

                    > */}
                {allUploads.map((upload) => {
                    return (<div key={upload.id}>
                        {
                            (upload.caption).includes(finalHashtag)
                                ? <Post
                                    hootId={upload.id}
                                    username={upload.authorUsername}
                                    mimeType={upload.mimeType}
                                    hootImgId={upload.image}
                                    audioPoster={upload.audioPoster}
                                    likes={upload.likes}
                                    views={upload.views}
                                    followers={upload.followers}
                                    caption={upload.caption}
                                    link={upload.link}
                                    ephemeral={upload.ephemeral}
                                    privateHoot={upload.private}
                                    expiryDate={upload.expiryDate}
                                    timeStamp={upload.timeStamp}
                                    edited={upload.edited}
                                    editedTimeStamp={upload.editedTimeStamp}
                                />
                                : null
                        }
                    </div>)
                })}
                {/* </InfiniteScroll> */}
                {/* } */}
                <EndHootMsg />
            </div>
            <Helmet>
                <title>#{hashtag} Hoots on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
            </Helmet>
        </Fragment>
    )
}

export default HashtagHoots
