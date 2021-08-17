import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar';
import EditProfile from '../components/EditProfile/EditProfile'
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import FloatingButton from '../components/FloatingButton/FloatingButton';

const EditProfilePage = () => {
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
                        <EditProfile
                            userId={user.id}
                            name={user.name}
                            userName={user.username}
                            profilePic={user.profilePic}
                            website={user.website}
                            bio={user.bio}
                        />
                    </div>)
                })}
            </div>
        </Fragment>
    )
}

export default EditProfilePage
