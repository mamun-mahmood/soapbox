import React, { useState, useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Post from '../components/Post'
import NavBar from '../components/NavBar'
import ScrollToTop from '../components/Feed/ScrollToTop'

const Profile = () => {
    const { username } = useParams();
    const [myUploads, setMyUploads] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${BaseURL}/user/profile/${username}`).then((response) => {
            setMyUploads(response.data);
            console.log(response);
        });
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div>
                <div className="profile-container">
                    <div>
                        <img className="profile-picture" src="/images/default_user_profile.svg" alt="profile" />
                    </div>
                    <div className="user-info">
                        <div className="display-name">
                            <h1>{username}</h1>
                        </div>
                        <div className="user-counts">
                            <div><span className="counts-bold">{myUploads.length}</span> hoots</div>
                            <div><span className="counts-bold">0</span> followers</div>
                            <div><span className="counts-bold">0</span> following</div>
                        </div>
                        <div className="user-name">@{username}</div>
                        <div className="user-desc">
                            {/* Actor. Producer. Running in movies since 1981. */}
                        </div>
                        <div>
                            {/* <a className="user-website" href="http://tomcruise.com/">tomcruise.com</a> */}
                        </div>
                        <button className="btn-edit-profile">Edit Profile</button>
                    </div>
                </div>
                <hr />
                <div className="">
                    {myUploads.length === 0 &&
                        <div className="no-hoots">
                            <p>No hoots yet!</p>
                            <div className="profile-hoot">
                                <Link to="/create">
                                    Create Hoot
                                </Link>
                            </div>
                        </div>
                    }

                    {myUploads.map((upload) => {
                        return (
                            <div key={upload.id}>
                                <Post
                                    hootId={upload.id}
                                    avatar="/images/default_user_profile.svg"
                                    username={upload.authorUsername}
                                    mimeType={upload.mimeType}
                                    hootImgId={upload.image}
                                    likes={upload.likes}
                                    caption={upload.caption}
                                    timeStamp={upload.timeStamp}
                                    edited={upload.edited}
                                    editedTimeStamp={upload.editedTimeStamp}
                                />
                            </div>
                        )
                    }).reverse()}

                    {myUploads.length > 3 && <ScrollToTop />}

                </div>
            </div>

            <Helmet>
                {/* General tags */}
                <title>{username} on MegaHoot Soapbox</title>
                <meta name="description" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                {/* <meta name="image" content={ } /> */}

                {/* OpenGraph tags */}
                {/* <meta property="og:url" content={ } />
                {isBlogPost ? <meta property="og:type" content="article" /> : null}
                <meta property="og:title" content={ } />
                <meta property="og:description" content={ } />
                <meta property="og:image" content={ } />
                <meta property="fb:app_id" content={ } /> */}

                {/* Twitter Card tags */}
                {/* <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={ } />
                <meta name="twitter:title" content={ } />
                <meta name="twitter:description" content={ } />
                <meta name="twitter:image" content={ } /> */}
            </Helmet>
        </Fragment>
    )
}

export default Profile
