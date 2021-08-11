import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet";
import Post from '../../components/Post'
import { useParams, Link } from 'react-router-dom'
import './individualHoot.css'
import '../../components/Feed/feed.css'

const IndividualHoot = () => {
    const { id } = useParams();
    const [hoot, setHoot] = useState([]);
    const [comments, setComments] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // here id is hootId 
        axios.get(`${BaseURL}/hoot/${id}`)
            .then((response) => {
                setHoot(response.data);
            });

        // here id is hootId 
        axios.get(`${BaseURL}/comment/${id}`)
            .then((response) => {
                setComments(response.data);
            });
    }, [])

    return (
        <Fragment>
            {hoot.length === 0 &&
                <div className="no-hoots start">
                    <p>Something went wrong! please try again...</p>
                    <div className="individual-hoot">
                        <Link to="/create">
                            Create Hoot
                        </Link>
                    </div>
                </div>
            }

            <div className="individualHoot">
                {/* <div className="hootArea"> */}
                {/* <div className="back-to-feed">
                    <Link to="/home">
                        <FiArrowLeft className="left-arrow" />
                    </Link>
                    <span>
                        Back
                    </span>
                </div> */}

                {hoot.map((hoot) => {
                    const hostURL = "https://www.megahoot.net";
                    const shareBaseUrl = `${hostURL}/hoot/${hoot.id}`;
                    const hootUsername = hoot.authorUsername;
                    const hootCaption = hoot.caption;
                    const title = `@${hootUsername} on MegaHoot Soapbox: ${hootCaption}`

                    // url for individual hoot for main soapbox website
                    const shareMediaPath = `${BaseURL}/images/${hoot.image}`;

                    return (
                        <div className="top-margin" key={hoot.id}>
                            <Post
                                hootId={hoot.id}
                                avatar="/images/default_user_profile.svg"
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
                                {/* General tags */}
                                <title>{title}</title>
                                <meta name="description" content={hootCaption} />
                                {/* <meta name="image" content={ } /> */}

                                {/* Twitter Card tags */}
                                <meta name="twitter:card" content="summary" />
                                <meta name="twitter:creator" content={hootUsername} />
                                <meta name="twitter:title" content={title} />
                                <meta name="twitter:description" content={hootCaption} />
                                <meta name="twitter:image" content={shareMediaPath} />

                                {/* OpenGraph tags */}
                                <meta property="og:url" content={shareBaseUrl} />
                                <meta property="og:title" content={title} />
                                <meta property="og:description" content={hootCaption} />
                                <meta property="og:image" content={shareMediaPath} />
                                {/* <meta property="fb:app_id" content={ } /> */}
                            </Helmet>
                        </div>
                    )
                }).reverse()}

                {/* </div> */}

                {/* <Comments comments={comments} hoot={hoot} /> */}

            </div>
        </Fragment>
    )
}

export default IndividualHoot
