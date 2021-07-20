import React, { Fragment } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import Feed from '../components/Feed/Feed'
import Engagements from '../components/Engagements/Engagements'

const Home = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="soapbox">
                <SideBar />
                <Feed />
                <Engagements />
            </div>
        </Fragment>
    )
}

export default Home
