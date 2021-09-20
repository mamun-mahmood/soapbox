import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar/NavBar'

const PrivacyPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="text-center page-404-not-found">
                <h1>MegaHoot Soapbox Privacy Policy</h1>
            </div>

            <Helmet>
                {/* General tags */}
                <title>Privacy Policy / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                {/* <meta name="description" content={ } />
                <meta name="image" content={ } /> */}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Privacy Policy / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/privacy" />
                <meta property="og:title" content="Privacy Policy / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default PrivacyPage
