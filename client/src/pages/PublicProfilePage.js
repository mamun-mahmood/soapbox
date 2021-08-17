import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import PublicProfile from '../components/PublicProfile'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PublicProfilePage = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${BaseURL}/user/${username}`)
            .then((response) => {
                setUserInfo(response.data);
            });
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                {userInfo.map((user) => {
                    return (<div key={user.id}>
                        <PublicProfile
                            userId={user.id}
                            verified={user.verified}
                            name={user.name}
                            userName={user.username}
                            profilePic={user.profilePic}
                            website={user.website}
                            bio={user.bio}
                        />
                    </div>)
                })}
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default PublicProfilePage
