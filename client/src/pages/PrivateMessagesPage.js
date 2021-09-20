import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar/NavBar'

const PrivateMessagesPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="text-center page-404-not-found">
                <h3>Our Developers are working hard</h3>
                <span style={{ color: "#8249A0", fontWeight: "500" }}>Private Messages</span>{" "}<span style={{ fontWeight: "400" }}>coming soon...</span>
            </div>

            <Helmet>
                {/* General tags */}
                <title>Private Messages / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                {/* <meta name="description" content={ } />
                <meta name="image" content={ } /> */}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Private Messages / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/private-messages" />
                <meta property="og:title" content="Private Messages / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default PrivateMessagesPage
