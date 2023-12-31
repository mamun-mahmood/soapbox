import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar/NavBar'

const PrivateMessagesPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="private-message-page">
                <h2>Our Developers are working hard</h2>
                <span style={{ color: "#8249A0", fontWeight: "500", fontSize: "1.2rem" }}>Private Messages</span>{" "}<span style={{ fontWeight: "400", fontSize: "1.2rem" }}>coming soon</span>
            </div>

            <Helmet>
                {/* General tags */}
                <title>Private Messages / MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
                {/* <meta name="description" content={ } />
                <meta name="image" content={ } /> */}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Private Messages / MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/private-messages" />
                <meta property="og:title" content="Private Messages / MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default PrivateMessagesPage
