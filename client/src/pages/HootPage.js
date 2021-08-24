import React, { Fragment, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar'
import IndividualHoot from '../components/IndividualHoot/IndividualHoot'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const HootPage = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${BaseURL}/user/${username}`)
            .then((response) => {
                setUserInfo(response.data);
            });
        setTimeout(() => {
            setLoading(false);
        }, 100);
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
                    })
                }
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default HootPage
