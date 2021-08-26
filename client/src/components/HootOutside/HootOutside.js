import React, { Fragment } from 'react'
import MediaProfile from './MediaProfile';
import './hootOutside.css'

const HootOutside = ({
    hootId,
    username,
    mimeType,
    hootImgId,
}) => {
    const BaseURL = process.env.REACT_APP_API_URL;
    const filePath = `${BaseURL}/images/${hootImgId}`;

    return (
        <Fragment>
            <MediaProfile
                hootId={hootId}
                username={username}
                mimeType={mimeType}
                filePath={filePath}
            />
        </Fragment>
    )
}

export default HootOutside
