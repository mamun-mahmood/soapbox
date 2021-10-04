import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import HootOutside from '../HootOutside/HootOutside'

const ExploreHoot = ({
    hootId,
    username,
    mimeType,
    hootImgId,
}) => {
    const [userInfo, setUserInfo] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInfo(response.data);
                });
        }
        getUserData();
    }, [username])

    return (
        <Fragment>
            {userInfo.map((user) => {
                return (
                    <div key={hootId}>
                        <HootOutside
                            hootId={hootId}
                            username={username}
                            mimeType={mimeType}
                            hootImgId={hootImgId}
                            profilePicPath={`${BaseURL}/profile-pictures/${user.profilePic}`}
                        />
                    </div>
                )
            })}
        </Fragment>
    )
}

export default ExploreHoot
