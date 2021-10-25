import React, { Fragment, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import { MyStream } from '../context/MyStreamContext'

const PageNotFound = () => {
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
            <div className="text-center page-404-not-found">
                <h3>Sorry, this page doesn’t exist.</h3>
                <h6 style={{ color: "#8E8E8E" }}>The link you followed may be broken, or the page may have been removed. Go back to
                    {/* <Link to="/home" className="primary-color home-link"> Home Page</Link> */}
                    <Link to="/" className="primary-color home-link"> Home Page</Link>
                </h6>
                <img className="page-404 my-4" src="/images/page_not_found.svg" alt="404 Page not Found" />
            </div>

            <Helmet>
                {/* General tags */}
                <title>404 - Page Not Found / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                {/* <meta name="description" content={ } />
                <meta name="image" content={ } /> */}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="404 - Page Not Found / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/home" />
                <meta property="og:title" content="404 - Page Not Found / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default PageNotFound
