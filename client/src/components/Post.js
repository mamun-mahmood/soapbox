import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import HootInside from "./HootInside";

const Post = ({
  hootId,
  username,
  mimeType,
  hootImgId,
  audioPoster,
  likes,
  views,
  followers,
  caption,
  link,
  ephemeral,
  privateHoot,
  onDemandMedia,
  expiryDate,
  timeStamp,
  edited,
  editedTimeStamp,
  privateProtected,
  fontFamilyStyle,
  fontColor,
  fontStyleSize,
  sensitivity,
}) => {
  const [userInformation, setUserInformation] = useState([]);
  const BaseURL = process.env.REACT_APP_API_URL;
  const [isSensitive, setIsSensitive] = useState(sensitivity);

  // getting user data
  useLayoutEffect(() => {
    const getUserData = async () => {
      await axios.get(`${BaseURL}/user/${username}`).then((response) => {
        setUserInformation(response.data);
      });
    };
    getUserData();
  }, []);

  return (
    <div>
      {userInformation.map((user) => {
        return (
          <div key={user.id}>
            <HootInside
              name={user.name}
              profilePic={user.profilePic}
              verified={user.verified}
              badge={user.badge}
              designation={user.designation}
              hootId={hootId}
              bio={user.bio}
              username={username}
              mimeType={mimeType}
              hootImgId={hootImgId}
              audioPoster={audioPoster}
              likes={likes}
              views={views}
              followers={followers}
              caption={caption}
              link={link}
              ephemeral={ephemeral}
              privateHoot={privateHoot}
              onDemandMedia={onDemandMedia}
              expiryDate={expiryDate}
              timeStamp={timeStamp}
              edited={edited}
              editedTimeStamp={editedTimeStamp}
              privateProtected={privateProtected}
              fontFamilyStyle={fontFamilyStyle}
              fontColor={fontColor}
              fontStyleSize={fontStyleSize}
              isSensitive={isSensitive}
              setIsSensitive={setIsSensitive}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Post;
