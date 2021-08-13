import React, { Fragment } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import PublicProfile from '../components/PublicProfile'

const PublicProfilePage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <PublicProfile />
            </div>
        </Fragment>
    )
}

export default PublicProfilePage
