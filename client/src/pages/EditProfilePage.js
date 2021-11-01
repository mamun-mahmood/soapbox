import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import BeatLoader from "react-spinners/BeatLoader";
import { useParams, useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar';
import EditProfile from '../components/EditProfile/EditProfile'

const EditProfilePage = () => {
    const history = useHistory();
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                });
        }
        getUserData();
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                {loading &&
                    <div className="loading-ep">
                        <BeatLoader color={"#8249A0"} size={20} />
                    </div>
                }

                {!loading &&
                    userInfo.map((user) => {
                        return (<div style={{ width: "100%" }} key={user.id}>
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
                                <title>Edit Profile for {username} ({user.name}) on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
                                <meta name="description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                            </Helmet>
                        </div>)
                    })
                }
            </div>
        </Fragment>
    )
}

export default EditProfilePage
