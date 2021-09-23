import React, { useLayoutEffect, useState } from 'react'
import axios from 'axios';
import HootInside from './HootInside';

const Post = ({
    hootId,
    username,
    mimeType,
    hootImgId,
    likes,
    views,
    caption,
    link,
    ephemeral,
    expiryDate,
    timeStamp,
    edited,
    editedTimeStamp
}) => {
    const [userInformation, setUserInformation] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    // getting user data
    useLayoutEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInformation(response.data);
                });
        }
        getUserData();
    }, [])

    return (
        <div>
            {userInformation.map((user) => {
                return (<div key={user.id}>
                    <HootInside
                        name={user.name}
                        profilePic={user.profilePic}
                        verified={user.verified}
                        hootId={hootId}
                        bio={user.bio}
                        username={username}
                        mimeType={mimeType}
                        hootImgId={hootImgId}
                        likes={likes}
                        views={views}
                        caption={caption}
                        link={link}
                        ephemeral={ephemeral}
                        expiryDate={expiryDate}
                        timeStamp={timeStamp}
                        edited={edited}
                        editedTimeStamp={editedTimeStamp}
                    />
                </div>);
            })}
        </div>
    )
}

export default Post
