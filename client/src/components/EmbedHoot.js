import React, { useEffect, useState, Fragment, useLayoutEffect } from 'react'
import axios from 'axios'
import MediaContent from './MediaContent';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiShare2, FiMessageSquare, FiEye } from 'react-icons/fi'
import { FaRegHeart } from 'react-icons/fa'
import { HiBadgeCheck } from 'react-icons/hi'
import Highlighter from "react-highlight-words"
import './IndividualHoot/individualHoot.css'
import Avatar from 'react-avatar';

const EmbedHoot = ({
    hootId,
    caption,
    link,
    ephemeral,
    privateHoot,
    mimeType,
    hootImgId,
    likes,
    views,
    username,
    edited
}) => {
    const BaseURL = process.env.REACT_APP_API_URL;
    const filePath = `${BaseURL}/images/${hootImgId}`;

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [userInformation, setUserInformation] = useState([]);
    const [hoverInfo, setHoverInfo] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    const path = userInfo ? ((userInfo.username === username ? `/profile/${username}` : `/user/${username}`)) : `/user/${username}`

    // finding out hashtags and stocks from caption and storing it in array 
    const hashtagsFound = caption.split(' ').filter(v => v.startsWith('#'));
    const stocksFound = caption.split(' ').filter(v => v.startsWith('$'));
    const usernamesFound = caption.split(' ').filter(v => v.startsWith('@'));

    useEffect(() => {
        axios.all[(
            axios.get(`${BaseURL}/upload/user/${username}`).then((response) => {
                setUsers(response.data);
            }), axios.get(`${BaseURL}/comment/${hootId}`)
                .then((response) => {
                    setComments(response.data);
                })
        )]
    }, [])

    // getting user data
    useLayoutEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInformation(response.data);
                });
        }
        getUserData();
    }, [])

    // for displaying total views and likes on hover username
    var totalViews = 0;
    var totalLikes = 0;

    users.map((upload) => {
        totalViews += upload.views
        totalLikes += upload.likes
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
            {userInformation.map((user) => {
                const profilePicPath = `${BaseURL}/profile-pictures/${user.profilePic}`;
                {/* const individualLink = `http://localhost:3000/${username}/hoot/${hootId}`; */ }
                const individualLink = `https://www.megahoot.net/${username}/hoot/${hootId}`;

                return (
                    <Fragment key={user.id}>
                        <div className="home" style={{ backgroundColor: "#fff" }}>
                            <div className="home-container">
                                <a href={individualLink} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
                                    <ReactTooltip />
                                    <div className="post-heading">
                                        <div
                                            onMouseEnter={() => setHoverInfo(true)}
                                            onMouseLeave={() => setHoverInfo(false)}
                                            className="avatar_name"
                                        >
                                            <Link to={path}>
                                                <div className="avatar-wraper">
                                                    <Avatar
                                                        size={50}
                                                        round={true}
                                                        name={user.name ? user.name : username}
                                                        src={profilePicPath}
                                                        className={user.profilePic === null ? null : "skeleton-img"}
                                                    />
                                                </div>

                                            </Link>
                                            <div className="div-username-name">
                                                <div className="name-verification">
                                                    <Link to={path}>
                                                        <div className="name">{user.name ? user.name : username}</div>
                                                    </Link>
                                                    {user.verified === 1
                                                        ?
                                                        <div className="verification-badge">
                                                            <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                                <div className="at-name">@{username}</div>
                                            </div>
                                        </div>

                                        {hoverInfo &&
                                            <div
                                                onMouseEnter={() => setHoverInfo(true)}
                                                onMouseLeave={() => setHoverInfo(false)}
                                                className="hover-info"
                                            >
                                                <div className="hover-user-follow">
                                                    <Link to={path}>
                                                        <div className="avatar-hover-wraper">
                                                            <Avatar
                                                                size={50}
                                                                round={true}
                                                                name={user.name ? user.name : username}
                                                                src={profilePicPath}
                                                            />
                                                        </div>
                                                    </Link>
                                                    <button
                                                        className="hover-btn-hoot-follow"
                                                    >
                                                        Follow
                                                    </button>
                                                </div>

                                                <div className="hoot-user-info">
                                                    <div className="hoot-username">
                                                        <div className="name-verification">
                                                            <Link to={path}>
                                                                <div className="name">{user.name}</div>
                                                            </Link>
                                                            {user.verified === 1
                                                                ?
                                                                <div className="verification-badge">
                                                                    <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                                                </div>
                                                                : null
                                                            }
                                                        </div>
                                                        <div className="hover-at-name">@{username}</div>
                                                    </div>

                                                    <div className="user-hoot-count">
                                                        <div>
                                                            <span className="hoot-counts">{formatCount(totalViews) + formatSi(totalViews)}</span>
                                                            views
                                                        </div>
                                                        <div>
                                                            <span className="hoot-counts">{formatCount(totalLikes) + formatSi(totalLikes)}</span>
                                                            likes
                                                        </div>
                                                    </div>
                                                    <hr style={{ margin: "0.2rem", marginRight: "0" }} />
                                                    <div className="user-bio-hover">
                                                        {user.bio}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <div className="user-actions">
                                            <button
                                                className="btn-hoot-follow"
                                            >
                                                Follow
                                            </button>
                                            <div className="more">
                                                <BiDotsHorizontalRounded
                                                    className="more-icon"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="post-comment">
                                        {" "}<span className="hoot-comment">
                                            <Highlighter
                                                highlightClassName="highlighterClass"
                                                searchWords={[...hashtagsFound, ...stocksFound, ...usernamesFound]}
                                                autoEscape={true}
                                                textToHighlight={caption}
                                            />
                                        </span>
                                        <br />
                                        {" "}<span className="hoot-link">
                                            <a href={link} target="_blank" rel="noopener noreferrer" className="link-content">{link}</a>
                                        </span>
                                    </div>
                                    <div className="right-icons">
                                        <MediaContent
                                            mimeType={mimeType}
                                            filePath={filePath}
                                            views={views}
                                            image={hootImgId}
                                        />
                                        <div className="post-icons">
                                            <div className="like-count">
                                                <div className="like">
                                                    <FaRegHeart
                                                        className="hoot-likes-border"
                                                    />
                                                </div>

                                                <div className="like-count">{likes === 0 ? likes : formatCount(likes) + formatSi(likes)}</div>
                                            </div>
                                            <div className="comment-count">
                                                <div className="comment">
                                                    <FiMessageSquare
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                                <div className="comment-count">{comments.length}</div>
                                            </div>
                                            <div className="view-count">
                                                <div className="view">
                                                    <FiEye className="cursor-pointer" />
                                                </div>
                                                <div className="view-count">{formatCount(views) + formatSi(views)}</div>
                                            </div>

                                            <div className="share">
                                                <FiShare2
                                                    onMouseEnter={() => setIsShareModalOpen(true)}
                                                    onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="view-post-comment">
                                        {(edited === 1) &&
                                            <div className="post-time">
                                                <small class="badge outline-badge d-flex flex-end">EDITED</small>
                                            </div>
                                        }

                                        {(ephemeral === 1) &&
                                            <small class="badge outline-badge d-flex flex-end">EPHEMERAL</small>
                                        }

                                        {(privateHoot === 1) &&
                                            <small class="badge outline-badge d-flex flex-end">PRIVATE</small>
                                        }
                                    </div>
                                    <hr className="mx-1 my-1 hr-color" />
                                </a>
                            </div>
                        </div>
                    </Fragment>
                )
            })}
        </Fragment>
    )
}

export default EmbedHoot
