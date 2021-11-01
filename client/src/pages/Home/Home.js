import React, { Fragment, useContext, useEffect } from 'react'
import { Helmet } from "react-helmet";
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import './home.css'

import Loadable from 'react-loadable';
import Loading from '../../components/Loading/Loading';
import { MyStream } from '../../context/MyStreamContext';

const Feed = Loadable({
    loader: () => import('../../components/Feed/Feed' /* webpackChunkName: "Feed" */),
    loading() {
        return <Loading />
    }
})

const Home = () => {
    const { myStream, hookStream } = useContext(MyStream);

    useEffect(() => {
        if (myStream) {
            const tracks = myStream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }
        if (hookStream) {
            const tracks = hookStream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }
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
                <title>Home / MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@megahootinc" />
                <meta name="twitter:creator" content="@megahootinc" />
                <meta name="twitter:title" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:description" content="MegaHoot Soapbox is a Club Community where our Club Owners can build a real business, members can connect, share and grow" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar2.png" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar3.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/" />
                <meta property="og:title" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar2.png" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar3.png" />
            </Helmet>
        </Fragment>
    )
}

export default Home
