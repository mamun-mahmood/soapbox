import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar';
import EditProfile from '../components/EditProfile/EditProfile'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import FloatingButton from '../components/FloatingButton/FloatingButton';

const EditProfilePage = () => {
    const history = useHistory();
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (username !== userInformation.username) {
            const profilePath = `/user/${username}`;
            history.push(profilePath);
        }
        const getUserData = async () => {
            axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInfo(response.data);
                });
        }

        getUserData();
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                {userInfo.map((user) => {
                    return (<div key={user.id}>
                        <EditProfile
                            userId={user.id}
                            name={user.name}
                            verified={user.verified}
                            userName={user.username}
                            profilePic={user.profilePic}
                            website={user.website}
                            bio={user.bio}
                            twitter={user.twitter}
                            instagram={user.instagram}
                            linkedIn={user.linkedIn}
                            facebook={user.facebook}
                            tiktok={user.tiktok}
                            snapchat={user.snapchat}
                            reddit={user.reddit}
                            pinterest={user.pinterest}
                            medium={user.medium}
                            tumblr={user.tumblr}
                        />
                        <Helmet>
                            <title>Edit Profile for {username} ({user.name}) on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                            <meta name="description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                        </Helmet>
                    </div>)
                })}
            </div>
        </Fragment>
    )
}

export default EditProfilePage
