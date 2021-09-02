import React, { Fragment } from 'react'
import { Helmet } from "react-helmet";
import NavBar from '../../components/NavBar'
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
                {/* <meta name="description" content={ } />
                <meta name="image" content={ } /> */}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/home" />
                <meta property="og:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default Home
