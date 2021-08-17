import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Avatar from 'react-avatar';
import { Helmet } from 'react-helmet'
import Post from './Post'
import { useParams } from 'react-router-dom'
import { HiBadgeCheck } from 'react-icons/hi'

const PublicProfile = ({
    verified,
    name,
    profilePic,
    website,
    bio,
}) => {
    const [users, setUsers] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

    const { username } = useParams();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

        axios.get(`${BaseURL}/upload/user/${username}`).then((response) => {
            setUsers(response.data);
        });

        console.log(users);
    }, [])

    var totalViews = 0;
    var totalLikes = 0;

    users.map((user) => {
        totalViews += user.views
        totalLikes += user.likes
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

    return (
        <Fragment>
            <div className="public-profile-page">
                <div className="profile-container">
                    <div className="profile-picture">
                        <Avatar
                            size={160}
                            round={true}
                            name={name}
                            src={profilePicPath}
                        />
                    </div>
                    {/* <img className="profile-picture" src="/images/default_user_profile.svg" alt="profile-pic" /> */}
                    <div className="user-info">
                        {/* <div className="follow-user"> */}
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

                        {/* </div> */}

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
                        <div className="user-follow">
                            <button className="btn-follow">Follow</button>
                        </div>
                        {/* <div className="followed-by">
                            <small >
                                Followed by
                                <span className="followed-by-user"> louis</span>,
                                <span className="followed-by-user"> hrshmistry</span>,
                                and
                                <span className="followed-by-user"> aakash</span>
                            </small>
                        </div> */}
                    </div>
                </div>
                <hr />
                <div className="pt-2">
                    {users.map((user) => {
                        return (<div key={user.id}>
                            <Post
                                hootId={user.id}
                                username={user.authorUsername}
                                mimeType={user.mimeType}
                                hootImgId={user.image}
                                likes={user.likes}
                                views={user.views}
                                caption={user.caption}
                                timeStamp={user.timeStamp}
                                edited={user.edited}
                                editedTimeStamp={user.editedTimeStamp}
                            />
                        </div>)
                    }).reverse()}
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

export default PublicProfile
