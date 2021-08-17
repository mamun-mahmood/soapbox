import React, { Fragment, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar'
import IndividualHoot from '../components/IndividualHoot/IndividualHoot'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const HootPage = () => {
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
                        <IndividualHoot
                            userId={user.id}
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

export default HootPage
