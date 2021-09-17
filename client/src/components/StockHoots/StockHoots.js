import axios from 'axios';
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { BiDollar } from 'react-icons/bi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom'
import InfiniteScrollLoader from '../Feed/InfiniteScrollLoader';
import Post from '../Post';
import './stockHoots.css'
import EndStockHootMsg from './EndStockHootMsg';
import { useCallback } from 'react';

const stockHoots = () => {
    const { stock } = useParams();
    const [uploads, setUploads] = useState([]);
    const [allUploads, setAllUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const BaseURL = process.env.REACT_APP_API_URL;

    const LIMIT = 10;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.all[(
                axios.get(`${BaseURL}/upload/p?page=1&limit=${LIMIT}`).then((response) => {
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

    const finalStock = '$' + stock;

    var totalViews = 0;

    // const updateTotalStockViews = useCallback((finalStock, totalViews) => {
    //     axios.put(`${BaseURL}/stocks`, {
    //         stock: finalStock,
    //         totalViews: totalViews
    //     })
    // }, [totalViews])

    // (totalViews += upload.views, updateTotalStockViews(finalStock, totalViews))
    allUploads.map((upload) => {
        return (<div key={upload.id}>
            {(upload.caption).includes(finalStock)
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
            <div className="stock-hoots-main">
                <div className="home">
                    <div className="stock-hoot-wrapper">
                        <div className="stock-hoots-name" >
                            <div className="stock-header">
                                <BiDollar />{stock.toUpperCase()}
                            </div>
                            <span>
                                {formatCount(totalViews) + formatSi(totalViews)} Views
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
                        {(upload.caption).includes(finalStock)
                            ?
                            <Post
                                hootId={upload.id}
                                username={upload.authorUsername}
                                mimeType={upload.mimeType}
                                hootImgId={upload.image}
                                likes={upload.likes}
                                views={upload.views}
                                caption={upload.caption}
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
                {/* </InfiniteScroll>
                } */}
                <EndStockHootMsg />
            </div>
            <Helmet>
                <title>${stock} Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
            </Helmet>
        </Fragment>
    )
}

export default stockHoots
