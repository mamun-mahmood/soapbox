import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar'
import FloatingButton from '../components/FloatingButton/FloatingButton'

import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';

const IndividualHoot = Loadable({
    loader: () => import('../components/IndividualHoot/IndividualHoot' /* webpackChunkName: "IndividualHoot" */),
    loading() {
        return <Loading />
    }
})

const HootPage = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useLayoutEffect(() => {
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
                    return (<div key={user.id} style={{ width: "100%" }}>
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
                {!userInfo &&
                    <div style={{ width: "100%" }}>

                    </div>
                }
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default HootPage
