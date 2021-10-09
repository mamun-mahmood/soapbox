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
    followers,
    caption,
    link,
    ephemeral,
    privateHoot,
    expiryDate,
    timeStamp,
    edited,
    editedTimeStamp,
    privateProtected
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
                return (
                    <div key={user.id}>
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
                            followers={followers}
                            caption={caption}
                            link={link}
                            ephemeral={ephemeral}
                            privateHoot={privateHoot}
                            expiryDate={expiryDate}
                            timeStamp={timeStamp}
                            edited={edited}
                            editedTimeStamp={editedTimeStamp}
                            privateProtected={privateProtected}
                        />
                    </div>);
            })}
        </div>
    )
}

export default Post
