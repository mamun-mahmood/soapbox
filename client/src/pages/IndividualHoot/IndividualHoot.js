import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet";
import Post from '../../components/Post'
import NavBar from '../../components/NavBar'
import Comments from '../../components/Comment/Comments'
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
        <div>
            <NavBar />
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
                {hoot.map((hoot) => {
                    return (<div className="top-margin" key={hoot.id}>
                        <Post
                            hootId={hoot.id}
                            avatar="/images/default_user_profile.svg"
                            username={hoot.authorUsername}
                            mimeType={hoot.mimeType}
                            hootImgId={hoot.image}
                            likes={hoot.likes}
                            caption={hoot.caption}
                            timeStamp={hoot.timeStamp}
                            edited={hoot.edited}
                            editedTimeStamp={hoot.editedTimeStamp}
                        />

                    </div>)
                }).reverse()}

                {hoot.map((hoot) => {
                    const hostURL = "https://www.megahoot.net";
                    const shareBaseUrl = `${hostURL}/hoot/${hoot.id}`;
                    const hootUsername = hoot.authorUsername;
                    const hootCaption = hoot.caption;
                    const title = `@${hootUsername} on MegaHoot Soapbox: ${hootCaption}`
                    const shareMediaPath = "https://soapboxapi.megahoot.net/images/1627200388187.jpg";

                    return (<div className="top-margin" key={hoot.id}>
                        <Helmet>
                            {/* General tags */}
                            <title>{title}</title>
                            <meta name="description" content={hootCaption} />
                            {/* <meta name="image" content={ } /> */}

                            {/* OpenGraph tags */}
                            <meta property="og:url" content={shareBaseUrl} />
                            <meta property="og:title" content={title} />
                            <meta property="og:description" content={hootCaption} />
                            <meta property="og:image" content={shareMediaPath} />
                            {/* <meta property="fb:app_id" content={ } /> */}

                            {/* Twitter Card tags */}
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:creator" content={hootUsername} />
                            <meta name="twitter:title" content={title} />
                            <meta name="twitter:description" content={hootCaption} />
                            <meta name="twitter:image" content={shareMediaPath} />
                        </Helmet>

                    </div>)
                }).reverse()}
                {/* </div> */}

                {/* <Comments comments={comments} hoot={hoot} /> */}

            </div>
        </div>
    )
}

export default IndividualHoot
