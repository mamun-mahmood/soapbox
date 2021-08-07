import React, { Fragment } from 'react'
import { Helmet } from "react-helmet";
import SideBar from '../../components/SideBar/SideBar'
import NavBar from '../../components/NavBar'
import Feed from '../../components/Feed/Feed'
import './home.css'

const Home = () => {
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
                {/* <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content={ } />
                <meta name="twitter:title" content={ } />
                <meta name="twitter:description" content={ } />
                <meta name="twitter:image" content={ } /> */}

                {/* OpenGraph tags */}
                {/* <meta property="og:url" content={ } />
                {isBlogPost ? <meta property="og:type" content="article" /> : null}
                <meta property="og:title" content={ } />
                <meta property="og:description" content={ } />
                <meta property="og:image" content={ } />
                <meta property="fb:app_id" content={ } /> */}
            </Helmet>
        </Fragment>
    )
}

export default Home
