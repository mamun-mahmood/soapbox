import React, { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import NavBar from '../components/NavBar/NavBar'
import PrivateChannels from '../components/PrivateChannels/PrivateChannels'
import { Helmet } from "react-helmet";
import { useParams } from 'react-router';

const PrivateChannelsPage = () => {
    const { username } = useParams();

    return (
        <div onContextMenu={(e) => e.preventDefault()}>
            <NavBar width={"none"} header={"Soapbox Private Clubs"} />
            <PrivateChannels />
            <FloatingButton />

            <Helmet>
                <title>{username}'s Private Club on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
               
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${username}'s Private Club on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels`} />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
  

                <meta property="og:url" content={`https://www.megahoot.net/private/channels/${username}`} />
                <meta property="og:title" content={`${username}'s Private Club on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels`} />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
            </Helmet>
        </div>
    )
}

export default PrivateChannelsPage
