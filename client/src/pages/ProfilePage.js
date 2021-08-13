import React, { Fragment } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'

const ProfilePage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <Profile />
            </div>
        </Fragment>
    )
}

export default ProfilePage
