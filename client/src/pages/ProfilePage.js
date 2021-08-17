import React, { Fragment, useState, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
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
                        <Profile
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

export default ProfilePage
