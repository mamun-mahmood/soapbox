import React, { Fragment, useEffect } from 'react'
import { Helmet } from "react-helmet";
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import './home.css'

import Loadable from 'react-loadable';
import Loading from '../../components/Loading/Loading';

const Feed = Loadable({
    loader: () => import('../../components/Feed/Feed' /* webpackChunkName: "Feed" */),
    loading() {
        return <Loading />
    }
})

const Home = () => {
    useEffect(() => {
        // window.location.reload();
    }, [])
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <Feed />
                <FloatingButton />
            </div>

            <Helmet>
                {/* General tags */}
                <title>Home / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@megahootinc" />
                <meta name="twitter:creator" content="@megahootinc" />
                <meta name="twitter:title" content="Megahoot Soapbox, where Content Creators monetize their Private Channels, Virtual Experiences, Personal Messages and build their brand." />
                <meta name="twitter:description" content="Megahoot Soapbox allows Content Creators to monetize their work and themselves, market on public Soapbox, build their Private Channel and Market Place, and interact in real time with their audience" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar2.png" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar3.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/" />
                <meta property="og:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar2.png" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar3.png" />
            </Helmet>
        </Fragment>
    )
}

export default Home
