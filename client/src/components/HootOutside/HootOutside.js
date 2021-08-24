import React, { Fragment } from 'react'
import MediaProfile from './MediaProfile';
import './hootOutside.css'

const HootOutside = ({
    mimeType,
    views,
    hootImgId
}) => {
    const BaseURL = process.env.REACT_APP_API_URL;
    const filePath = `${BaseURL}/images/${hootImgId}`;

    return (
        <Fragment>
            <MediaProfile
                mimeType={mimeType}
                filePath={filePath}
                views={views}
                image={hootImgId}
            />
        </Fragment>
    )
}

export default HootOutside
