import React, { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar/NavBar'
import PrivateChannels from '../components/PrivateChannels/PrivateChannels'
import { Helmet } from "react-helmet";
import { useParams } from 'react-router';
import PrivateFloatingButton from '../components/FloatingButton/PrivateFloatingButton';
import { MyStream } from '../context/MyStreamContext';

const PrivateChannelsPage = () => {
    const { username } = useParams();
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
        <div onContextMenu={(e) => e.preventDefault()}>
            <NavBar width={"none"} header={"Soapbox Private Club"} />
            <PrivateChannels />
            <PrivateFloatingButton />

            <Helmet>
                <title>{username}'s Private Club on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${username}'s Private Club on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.`} />
                <meta name="twitter:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />


                <meta property="og:url" content={`https://www.megahoot.net/private/Club/${username}`} />
                <meta property="og:title" content={`${username}'s Private Club on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.`} />
                <meta property="og:description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png" />
            </Helmet>
        </div>
    )
}

export default PrivateChannelsPage
