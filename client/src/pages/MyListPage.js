import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import MyList from '../components/MyList/MyList'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'

const MyListPage = () => {
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));

    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <MyList username={userInfo.username} />
                <FloatingButton />
            </div>

            <Helmet>
                <title>{userInfo.username}'s List on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${userInfo.username}'s List on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.`} />
                <meta name="twitter:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                <meta property="og:url" content="https://www.megahoot.net/mylist" />
                <meta property="og:title" content={`${userInfo.username}'s List on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.`} />
                <meta property="og:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default MyListPage
