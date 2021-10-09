import axios from 'axios'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import Avatar from 'react-avatar'
import toast from 'react-hot-toast'
import { HiBadgeCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { formatCount, formatSi } from '../../Helpers/formatNumbers'

const SuggestedFollow = ({ verifiedUser }) => {
    const [users, setUsers] = useState([]);
    const [hoverInfo, setHoverInfo] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [followedAlready, setFollowedAlready] = useState(true);
    const [userFollowers, setUserFollowers] = useState([]);

    const getUserFollowData = async () => {
        await axios.get(`${BaseURL}/user/followers/${verifiedUser.username}`)
            .then((response) => {
                setUserFollowers(response.data);
            })
    }

    useEffect(() => {
        getUserFollowData();
    }, [followed])

    const BaseURL = process.env.REACT_APP_API_URL;

    // getting all uploads(hoots) of particuler user for counting all views and likes
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/upload/user/${verifiedUser.username}`)
                .then((response) => {
                    setUsers(response.data);
                })
        }

        getUserData();
    }, [])

    var totalViews = 0;
    var totalLikes = 0;

    users.map((user) => {
        totalViews += user.views
        totalLikes += user.likes
    })

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    const path = userInfo ? ((userInfo.username === verifiedUser.username ? `/profile/${verifiedUser.username}` : `/user/${verifiedUser.username}`)) : `/user/${verifiedUser.username}`

    const addFollower = async () => {
        await getUserFollowData();

        if (userInfo) {
            setFollowed(true)

            axios.post(`${BaseURL}/user/followedBy`, {
                username: verifiedUser.username,
                loggedInUsername: userInfo.username
            })
        }

        if (userInfo) {
            toast.success(`Followed ${verifiedUser.username}`, {
                style: {
                    border: '2px solid #8249A0',
                    color: '#8249A0',
                },
                iconTheme: {
                    primary: '#8249A0',
                    secondary: '#FFFAEE',
                },
            });
        } else {
            toast.error('Please login', {
                style: {
                    border: '2px solid #8249A0',
                    color: '#8249A0',
                },
                iconTheme: {
                    primary: '#8249A0',
                    secondary: '#FFFAEE',
                },
            });
        }
    }

    const removeFollower = async () => {
        await getUserFollowData();
        setFollowed(false);
        setFollowedAlready(false);

        if (userInfo) {
            axios.post(`${BaseURL}/user/followedBy/delete`, {
                username: verifiedUser.username,
                loggedInUsername: userInfo.username
            })
        }

        toast.success(`Unfollowed ${verifiedUser.username}`, {
            style: {
                border: '2px solid #8249A0',
                color: '#8249A0',
            },
            iconTheme: {
                primary: '#8249A0',
                secondary: '#FFFAEE',
            },
        });
    }

    // converting array of object to normal array
    const userFollowersArr = userFollowers.map((user) => {
        return (
            user.followedBy
        )
    })

    const followAction = () => {
        if (userInfo) {
            null
        } else {
            toast.error('Please login', {
                style: {
                    border: '2px solid #8249A0',
                    color: '#8249A0',
                },
                iconTheme: {
                    primary: '#8249A0',
                    secondary: '#FFFAEE',
                },
            });
        }
    }

    return (
        <Fragment>
            <div style={{ position: 'relative' }} className="suggested-follow">
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
                                name={verifiedUser.name ? verifiedUser.name : verifiedUser.username}
                                src={`${BaseURL}/profile-pictures/${verifiedUser.profilePic}`}
                                className={`${BaseURL}/profile-pictures/${verifiedUser.profilePic}` ? "skeleton-img-no-src" : "skeleton-img"}
                            // className="skeleton-img"
                            />
                        </div>

                    </Link>

                    <div className="div-suggested-username-name">
                        <div className="name-verification">
                            <Link to={path}>
                                <div className="name">{verifiedUser.name ? verifiedUser.name : verifiedUser.username}</div>
                            </Link>

                            {verifiedUser.verified === 1
                                ?
                                <div className="verification-badge">
                                    <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                </div>
                                : null
                            }
                        </div>
                        <div className="at-suggested-name">@{verifiedUser.username}</div>
                    </div>
                </div>

                {hoverInfo &&
                    <div
                        onMouseEnter={() => setHoverInfo(true)}
                        onMouseLeave={() => setHoverInfo(false)}
                        className="suggested-hover-info"
                    >
                        <div className="hover-user-follow">
                            <Link to={path}>
                                <div className="avatar-hover-wraper">
                                    <Avatar
                                        size={50}
                                        round={true}
                                        name={verifiedUser.name ? verifiedUser.name : verifiedUser.username}
                                        src={`${BaseURL}/profile-pictures/${verifiedUser.profilePic}`}
                                    // className="skeleton-img"
                                    />
                                </div>
                            </Link>

                            {/* <button className="hover-btn-hoot-follow">Follow</button> */}
                            {userInfo
                                ?
                                userInfo.username === verifiedUser.username
                                    ?
                                    null
                                    :
                                    userFollowers.length === 0
                                        ?
                                        <button
                                            className="btn-hoot-follow"
                                            onClick={addFollower}
                                        >
                                            {followed
                                                ? "Following"
                                                : "Follow"
                                            }
                                        </button>
                                        :
                                        userFollowersArr.some(user => (userInfo && userInfo.username).includes(user))
                                            ?
                                            <button
                                                className="btn-hoot-follow"
                                                onClick={followedAlready ? removeFollower : addFollower}
                                            >
                                                {followedAlready
                                                    ? "Following"
                                                    : "Follow"
                                                }
                                            </button>
                                            :
                                            <button
                                                className="btn-hoot-follow"
                                                onClick={followed ? removeFollower : addFollower}
                                            >
                                                {followed
                                                    ? "Following"
                                                    : "Follow"
                                                }
                                            </button>
                                :
                                <button
                                    className="btn-hoot-follow"
                                    onClick={followAction}
                                >
                                    Follow
                                </button>
                            }
                        </div>

                        <div className="hoot-user-info">
                            <div className="hoot-username">
                                <div className="name-verification">
                                    <Link to={path}>
                                        <div className="name">{verifiedUser.name}</div>
                                    </Link>
                                    {verifiedUser.verified === 1
                                        ?
                                        <div className="verification-badge">
                                            <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className="hover-at-name">@{verifiedUser.username}</div>
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
                                {verifiedUser.bio}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default SuggestedFollow
