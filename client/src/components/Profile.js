import React, { useState, useEffect, Fragment } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Avatar from 'react-avatar';
import Post from '../components/Post'
import ScrollToTop from '../components/Feed/ScrollToTop'
import { HiBadgeCheck } from 'react-icons/hi'

const Profile = ({
    verified,
    name,
    profilePic,
    website,
    bio,
}) => {
    const { username } = useParams();
    const [myUploads, setMyUploads] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

    useEffect(() => {
        axios.get(`${BaseURL}/upload/user/${username}`)
            .then((response) => {
                setMyUploads(response.data);
                console.log(response);
            });
    }, [])

    var totalViews = 0;
    var totalLikes = 0;

    myUploads.map((upload) => {
        totalViews += upload.views
        totalLikes += upload.likes
    })

    console.log(totalViews);
    console.log(totalLikes);

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

    console.log("name: ", name);
    return (
        <Fragment>
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-picture">
                        <Avatar
                            size={160}
                            round={true}
                            name={name}
                            src={profilePicPath}
                        />
                    </div>
                    {/* <img className="profile-picture" src="/images/default_user_profile.svg" alt="profile" /> */}
                    <div className="user-info">
                        <div className="display-name">
                            <div className="profile-name-verification">
                                <h1>{name}</h1>
                                {verified === 1
                                    ?
                                    <div className="profile-verification-badge">
                                        <HiBadgeCheck />
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="user-name-page">@{username}</div>
                        <div className="user-counts">
                            {/* <div><span className="counts-bold">{myUploads.length}</span> hoots</div> */}
                            <div><span className="counts-bold">0</span> Followers</div>
                            <div><span className="counts-bold">{formatCount(totalViews) + formatSi(totalViews)}</span> Views</div>
                            <div><span className="counts-bold">{formatCount(totalLikes) + formatSi(totalLikes)}</span> Likes</div>
                            {/* <div><span className="counts-bold">0</span> following</div> */}
                        </div>
                        <div className="user-desc">
                            {bio}
                        </div>
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-website"
                        >
                            {website.slice(8)}
                        </a>
                        <button className="btn-edit-profile">
                            <Link to={`/edit/profile/${username}`}>
                                Edit Profile
                            </Link>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="pt-2">
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
                            </div>
                        )
                    }).reverse()}

                    {myUploads.length > 3 && <ScrollToTop />}

                </div>
            </div>

            <Helmet>
                {/* General tags */}
                <title>{username} on MegaHoot Soapbox</title>
                <meta name="description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
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