import React, { Fragment, useState, useRef } from 'react'
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa'
import { MdGif } from 'react-icons/md'

const MediaProfile = ({
    mimeType,
    filePath,
    username,
    hootId
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
                <LazyLoad offset={0} className="img-container">
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
                <LazyLoad offset={0} className="vdo-container">
                    <video
                        loop muted
                        // controls
                        disablePictureInPicture
                        className="hoot-vdo-profile"
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
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
                <LazyLoad offset={0}>
                    <audio
                        className="hoot-ado-profile"
                        // controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}
                    >
                        <source
                            src={filePath}
                            type={mimeType}
                        />
                        Your browser does not support the audio element.
                    </audio>
                </LazyLoad>
            }
        </div>
    )
}

export default MediaProfile