import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HootInside from './HootInside';

const Post = ({
    hootId,
    username,
    mimeType,
    hootImgId,
    likes,
    views,
    caption,
    timeStamp,
    edited,
    editedTimeStamp
}) => {
    const [userInformation, setUserInformation] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    // getting user data
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInformation(response.data);
                });
        }
        getUserData();
    }, [])

    var userName = null;
    var userProfilePic = null;
    var userVerified = 0;

    userInformation.map((user) => {
        userName = user.name;
        userProfilePic = user.profilePic;
        userVerified = user.verified;
    })

    return (
        <div>
            <HootInside
                name={userName}
                profilePic={userProfilePic}
                verified={userVerified}
                hootId={hootId}
                username={username}
                mimeType={mimeType}
                hootImgId={hootImgId}
                likes={likes}
                views={views}
                caption={caption}
                timeStamp={timeStamp}
                edited={edited}
                editedTimeStamp={editedTimeStamp}
            />
        </div>
    )
}

export default Post
