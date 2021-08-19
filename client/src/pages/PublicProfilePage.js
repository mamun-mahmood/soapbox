import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import PublicProfile from '../components/PublicProfile'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const PublicProfilePage = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
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
                {userInfo.length
                    ? userInfo.map((user) => {
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
                        </div>)
                    })
                    :
                    <div className="no-profile">
                        {/* <p>No Profile Found!</p>
                        <div className="profile-hoot">
                            <Link to="/create">
                                Create Hoot
                            </Link>
                        </div> */}
                    </div>
                }
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default PublicProfilePage
