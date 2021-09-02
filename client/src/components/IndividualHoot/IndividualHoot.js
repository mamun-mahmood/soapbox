import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet";
import Post from '../../components/Post'
import { useParams } from 'react-router-dom'
import './individualHoot.css'
import '../../components/Feed/feed.css'

import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';
import EndHootMsg from './EndHootMsg';

const BrowseMoreHoots = Loadable({
    loader: () => import('./BrowseMoreHoots' /* webpackChunkName: "BrowseMoreHoots" */),
    loading() {
        return <Loading />
    }
})

const IndividualHoot = () => {
    const { id } = useParams();
    const [hoot, setHoot] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // here id is hootId
        const getHootById = async () => {
            await axios.get(`${BaseURL}/hoot/${id}`)
                .then((response) => {
                    setHoot(response.data);
                });
        }
        getHootById();
        window.scrollTo(0, 0);
    }, [id])

    var hashtagsFound = [];
    var iHootId = "";

    return (
        <Fragment>
            {hoot &&
                <div className="individualHoot">
                    {hoot.map((hoot) => {
                        const hostURL = "https://www.megahoot.net";
                        const shareBaseUrl = `${hostURL}/hoot/${hoot.id}`;
                        const hootUsername = hoot.authorUsername;
                        const hootCaption = hoot.caption;
                        const title = `@${hootUsername} on MegaHoot Soapbox: ${hootCaption}`

                        hashtagsFound = hoot.caption.split(' ').filter(v => v.startsWith('#'));
                        iHootId = hoot.id;

                        // url for individual hoot for main soapbox website
                        const shareMediaPath = `${BaseURL}/images/${hoot.image}`;

                        return (
                            <div className="top-margin" key={hoot.id}>
                                <Post
                                    hootId={hoot.id}
                                    username={hoot.authorUsername}
                                    mimeType={hoot.mimeType}
                                    hootImgId={hoot.image}
                                    likes={hoot.likes}
                                    views={hoot.views}
                                    caption={hoot.caption}
                                    timeStamp={hoot.timeStamp}
                                    edited={hoot.edited}
                                    editedTimeStamp={hoot.editedTimeStamp}
                                />

                                <Helmet>
                                    <title>{title}</title>
                                    <meta name="description" content={hootCaption} />

                                    <meta name="twitter:card" content="summary" />
                                    <meta name="twitter:creator" content={hootUsername} />
                                    <meta name="twitter:title" content={title} />
                                    <meta name="twitter:description" content={hootCaption} />
                                    <meta name="twitter:image" content={shareMediaPath} />

                                    <meta property="og:url" content={shareBaseUrl} />
                                    <meta property="og:title" content={title} />
                                    <meta property="og:description" content={hootCaption} />
                                    <meta property="og:image" content={shareMediaPath} />
                                </Helmet>
                            </div>
                        )
                    })}

                    <div style={{ padding: "1rem 0.5rem 0 0.5rem" }}>
                        <h2 className="browse-more">Browse more Hoots
                            <hr style={{ marginBottom: "0.2rem" }} />
                        </h2>
                    </div>

                    {hashtagsFound
                        ? <BrowseMoreHoots hashtagsFound={hashtagsFound} iHootId={iHootId} />
                        : <div style={{ padding: "1rem 0.5rem 0 0.5rem" }}>
                            <h6 className="browse-more">Related hoots will be shown here</h6>
                        </div>
                    }

                    <EndHootMsg />
                </div>
            }
        </Fragment>
    )
}

export default IndividualHoot
