import axios from 'axios'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { HiBadgeCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { formatCount, formatSi } from '../../Helpers/formatNumbers'

const SuggestedFollow = ({
    suggestedUsername
}) => {
    const [suggestedUser, setSuggestedUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [hoverInfo, setHoverInfo] = useState(false);
    const BaseURL = process.env.REACT_APP_API_URL;

    // getting user data
    useLayoutEffect(() => {
        const getSuggestedUserData = async () => {
            await axios.get(`${BaseURL}/user/${suggestedUsername}`)
                .then((response) => {
                    setSuggestedUser(response.data);
                });
        }
        getSuggestedUserData();
    }, [])

    // getting all uploads(hoots) of particuler user 
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/upload/user/${suggestedUsername}`).then((response) => {
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
    const path = userInfo ? ((userInfo.username === suggestedUsername ? `/profile/${suggestedUsername}` : `/user/${suggestedUsername}`)) : `/user/${suggestedUsername}`

    return (
        <Fragment>
            {suggestedUser.map((user) => {
                return (
                    <div key={user.id} style={{ position: 'relative' }} className="suggested-follow">
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
                                        name={user.name ? user.name : user.username}
                                        src={`${BaseURL}/profile-pictures/${user.profilePic}`}
                                        className={`${BaseURL}/profile-pictures/${user.profilePic}` === null ? null : "skeleton-img"}
                                    />
                                </div>

                            </Link>

                            <div className="div-suggested-username-name">
                                <div className="name-verification">
                                    <Link to={path}>
                                        <div className="name">{user.name ? user.name : user.username}</div>
                                    </Link>

                                    {user.verified === 1
                                        ?
                                        <div className="verification-badge">
                                            <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className="at-suggested-name">@{user.username}</div>
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
                                                name={user.name ? user.name : user.username}
                                                src={`${BaseURL}/profile-pictures/${user.profilePic}`}
                                            // className="skeleton-img"
                                            />
                                        </div>
                                    </Link>
                                    <button className="hover-btn-hoot-follow">Follow</button>
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
                                        <div className="hover-at-name">@{user.username}</div>
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
                    </div>
                )
            })}
        </Fragment>
    )
}

export default SuggestedFollow
