import React, { Fragment, useState, useEffect, useContext } from 'react'
// import User from '../context/UserContext'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar/NavBar'
import Profile from '../components/Profile'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import BeatLoader from "react-spinners/BeatLoader";
import { MyLists } from '../context/MyListContext'
import { MyStream } from '../context/MyStreamContext'

const ProfilePage = () => {
    const history = useHistory();
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const BaseURL = process.env.REACT_APP_API_URL;

    const { myStream, hookStream } = useContext(MyStream);

    useEffect(() => {
        if (myStream) {
            const tracks = myStream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }

        if (hookStream) {
            const tracks = hookStream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }

        if (username !== userInformation.username) {
            const profilePath = `/user/${username}`;
            history.push(profilePath);
        }
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInfo(response.data);
                });
            setLoading(false);
        }
        getUserData();
    }, [username])

    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                {loading &&
                    <div className="loading">
                        <BeatLoader color={"#8249A0"} loading={loading} size={20} />
                    </div>
                }
                {!loading &&
                    userInfo.map((user) => {
                        return (<div style={{ width: "100%" }} key={user.id}>
                            <Profile
                                userId={user.id}
                                verified={user.verified}
                                privateChannel={user.privateChannel}
                                followers={user.followers}
                                name={user.name}
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
                                <title>{user.name} (@{username}) on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
                                <meta name="description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                            </Helmet>
                        </div>)
                    })
                }
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default ProfilePage
