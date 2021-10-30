import React, { Fragment } from 'react'
import MediaProfile from './MediaProfile';
import './hootOutside.css'

const HootOutside = ({
    hootId,
    username,
    mimeType,
    hootImgId,
    audioPoster,
    profilePicPath
}) => {
    const BaseURL = process.env.REACT_APP_API_URL;
    const filePath = `${BaseURL}/images/${hootImgId}`;

    return (
        <MediaProfile
            hootId={hootId}
            username={username}
            mimeType={mimeType}
            filePath={filePath}
            audioPoster={audioPoster}
            profilePicPath={profilePicPath}
        />
    )
}

export default HootOutside
