import React, { useState, useRef } from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { MdGif, MdMusicNote } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import CustomHandler from "./CustomHandler";
const MediaProfile = ({
  mimeType,
  filePath,
  audioPoster,
  username,
  hootId,
  profilePicPath,
  url,
}) => {
  const BaseURL = process.env.REACT_APP_API_URL;

  const history = useHistory();
  const [isVertical, setIsVertical] = useState("hoot-img-vertical-profile");
  const ref = useRef(null);

  const audioPosterPath = `${BaseURL}/audio-posters/${audioPoster}`; // media url from server

  const imgRef = () => {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    if (height > width) {
      setIsVertical("hoot-img-vertical-profile");
    } else {
      setIsVertical("hoot-img-horizontal-profile");
    }
  };

  return (
    <div className="media-center">
      {url ? (
        <a
          href={url}
          style={{ color: "black", textDecoration: "none", margin: "2px" }}
        >
          <div
            style={{
              height: "200px",
              width: "100%",
              background: "white",
              overflow: "hidden",
            }}
          >
            <CustomHandler url={url} />
          </div>
        </a>
      ) : (
        mimeType &&
        mimeType.match(/image/gi) == "image" && (
          <LazyLoad offset={0} className="img-container">
            <img
              ref={ref}
              src={filePath}
              alt="soapbox-img"
              className={isVertical}
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => {
                history.push(`/${username}/hoot/${btoa(hootId)}/${uuidv4()}`);
              }}
              onLoad={(e) => {
                imgRef();
              }}
              onDragStart={(e) => e.preventDefault()}
            />
            {mimeType.includes("image/gif") && (
              <MdGif
                className="GIF-overlay"
                onClick={() => {
                  history.push(`/${username}/hoot/${btoa(hootId)}/${uuidv4()}`);
                }}
              />
            )}
          </LazyLoad>
        )
      )}

      {mimeType && mimeType.match(/video/gi) == "video" && (
        <LazyLoad offset={0} className="vdo-container">
          <video
            loop
            muted
            disablePictureInPicture
            className="hoot-vdo-profile"
            controlsList="nodownload"
            onContextMenu={(event) => event.preventDefault()}
            onClick={() => {
              history.push(`/${username}/hoot/${btoa(hootId)}/${uuidv4()}`);
            }}
            onMouseOver={(event) => event.target.play()}
            onMouseOut={(event) => event.target.pause()}
            onDragStart={(e) => e.preventDefault()}
          >
            <source
              src={filePath}
              // type={mimeType}
            />
            Your browser does not support HTML video.
          </video>
          <FaPlay
            className="play-vdo-overlay"
            onClick={() => {
              history.push(`/${username}/hoot/${btoa(hootId)}/${uuidv4()}`);
            }}
          />
        </LazyLoad>
      )}

      {mimeType && mimeType.match(/audio/gi) == "audio" && (
        <LazyLoad offset={0} className="vdo-container">
          <video
            className="hoot-vdo-profile"
            poster={audioPoster !== null ? audioPosterPath : profilePicPath}
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => {
              history.push(`/${username}/hoot/${btoa(hootId)}/${uuidv4()}`);
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            <source
              src={filePath}
              // type="video/mp4"
              // type={mimeType}
            />
            Your browser does not support the audio element.
          </video>
          <MdMusicNote
            className="play-vdo-overlay"
            onClick={() => {
              history.push(`/${username}/hoot/${btoa(hootId)}/${uuidv4()}`);
            }}
          />
        </LazyLoad>
      )}
    </div>
  );
};

export default MediaProfile;
