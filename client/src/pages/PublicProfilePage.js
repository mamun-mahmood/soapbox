import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import PublicProfile from '../components/PublicProfile'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import BeatLoader from "react-spinners/BeatLoader";

// import Loading from '../components/Loading/Loading';
// import Loadable from 'react-loadable';
// const PublicProfile = Loadable({
//     loader: () => import('../components/PublicProfile' /* webpackChunkName: "Public_Profile" */),
//     loading() {
//         return <Loading />
//     }
// })

const PublicProfilePage = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInfo(response.data);
                });
            setLoading(false);
        }
        getUserData();
    }, [])

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
                        return (<div key={user.id}>
                            <PublicProfile
                                userId={user.id}
                                verified={user.verified}
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
                                <title>{username} ({user.name}) on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                                <meta name="description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                            </Helmet>
                        </div>)
                    })
                }
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default PublicProfilePage
