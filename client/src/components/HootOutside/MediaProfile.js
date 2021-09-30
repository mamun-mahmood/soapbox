import React, { useState, useRef } from 'react'
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa'
import { MdGif, MdMusicNote } from 'react-icons/md'
import { AiFillAudio } from 'react-icons/ai'

const MediaProfile = ({
    mimeType,
    filePath,
    username,
    hootId,
    profilePicPath
}) => {
    const history = useHistory();
    const [isVertical, setIsVertical] = useState("hoot-img-vertical-profile");
    const ref = useRef(null);

    const imgRef = () => {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;

        if (height > width) {
            setIsVertical("hoot-img-vertical-profile");
        } else {
            setIsVertical("hoot-img-horizontal-profile");
        }
    }

    return (
        <div className="media-center">
            {mimeType.match(/image/gi) == "image" &&
                <LazyLoad
                    offset={0}
                    className="img-container"
                >
                    <img
                        ref={ref}
                        src={filePath}
                        alt="soapbox-img"
                        className={isVertical}
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                        onLoad={(e) => {
                            imgRef();
                        }}
                    />
                    {mimeType.includes("image/gif") &&
                        <MdGif
                            className="GIF-overlay"
                            onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                        />
                    }
                </LazyLoad>
            }

            {mimeType.match(/video/gi) == "video" &&
                <LazyLoad
                    offset={0}
                    className="vdo-container"
                >
                    <video
                        loop muted
                        disablePictureInPicture
                        className="hoot-vdo-profile"
                        controlsList="nodownload"
                        onContextMenu={(event) => event.preventDefault()}
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                        onMouseOver={event => event.target.play()}
                        onMouseOut={event => event.target.pause()}
                    >
                        <source
                            src={filePath}
                            type={mimeType}
                        />
                        Your browser does not support HTML video.
                    </video>
                    <FaPlay
                        className="play-vdo-overlay"
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                    />
                </LazyLoad>
            }

            {mimeType.match(/audio/gi) == "audio" &&
                <LazyLoad
                    offset={0}
                    className="vdo-container"
                >
                    <video
                        className="hoot-vdo-profile"
                        poster={profilePicPath}
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                    >
                        <source
                            src={filePath}
                            type="video/mp4"
                        />
                        Your browser does not support the audio element.
                    </video>
                    <MdMusicNote
                        className="play-vdo-overlay"
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                    />
                </LazyLoad>
            }
        </div>
    )
}

export default MediaProfile
