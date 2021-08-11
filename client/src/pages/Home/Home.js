import React, { Fragment } from 'react'
import { Helmet } from "react-helmet";
import SideBar from '../../components/SideBar/SideBar'
import NavBar from '../../components/NavBar'
import Feed from '../../components/Feed/Feed'
import './home.css'

const Home = () => {

    // const formatCount = count => {
    //     if (count < 1e3) return count;
    //     if (count >= 1e3 && count < 1e6) return +(count / 1e3).toFixed(1) + "K";
    //     if (count >= 1e6 && count < 1e9) return +(count / 1e6).toFixed(1) + "M";
    //     if (count >= 1e9 && count < 1e12) return +(count / 1e9).toFixed(1) + "B";
    //     if (count >= 1e12) return +(count / 1e12).toFixed(1) + "T";
    // };

    // count will be formatted 
    const formatCount = count => {
        if (count < 1e3) return count;
        if (count >= 1e3 && count < 1e6) return +(count / 1e3).toFixed(1);
        if (count >= 1e6 && count < 1e9) return +(count / 1e6).toFixed(1);
        if (count >= 1e9 && count < 1e12) return +(count / 1e9).toFixed(1);
        if (count >= 1e12) return +(count / 1e12).toFixed(1);
    };

    // si stands for International System of Units
    const formatSi = count => {
        if (count < 1e3) return "";
        if (count >= 1e3 && count < 1e6) return "K";
        if (count >= 1e6 && count < 1e9) return "M";
        if (count >= 1e9 && count < 1e12) return "B";
        if (count >= 1e12) return "T";
    };

    console.log(formatCount(230) + formatSi(230));

    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <Feed />
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
