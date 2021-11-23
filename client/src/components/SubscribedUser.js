import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { HiBadgeCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom';

const SubscribedUser = ({ username }) => {
    const [user,setUser]=useState([])
    const BaseURL = process.env.REACT_APP_API_URL;
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    const path = userInfo ? ((userInfo.username === user.username ? `/profile/${user.username}` : `/user/${user.username}`)) : `/user/${user.username}`
    const getUserData=(username)=>{
        axios.get(`${BaseURL}/user/${username}`).then((res) => {
         setUser(res.data[0])
    })
    .catch(err => { console.log(err) })
    }
    useEffect(() => {
        getUserData(username)
    }, [username])
    return (
        <Fragment>
            <div className="avatar_name">
                <Link to={path}>
                    <div className="avatar-wraper">
                        <Avatar
                            size={30}
                            round={true}
                            name={user.name ? user.name : user.username}
                            src={`${BaseURL}/profile-pictures/${user.profilePic}`}
                            className={`${BaseURL}/profile-pictures/${user.profilePic}` ? "skeleton-img-no-src" : "skeleton-img"}
                        />
                    </div>
                </Link>

                <div className="div-suggested-username-name">
                    <div className="name-verification">
                        <Link to={path}>
                            <div className="name">
                                {user.name
                                    ? user.name.length > 15
                                        ? user.name.substring(0, 15) + "..."
                                        : user.name
                                    : user.username}
                            </div>
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
        </Fragment>
    )
}

export default SubscribedUser
