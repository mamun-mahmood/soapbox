import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload';

const MediaProfile = ({ mimeType, filePath, image }) => {
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
        <Fragment>
            {mimeType.match(/image/gi) == "image" &&
                <LazyLoad offset={0}>
                    <img
                        ref={ref}
                        src={filePath}
                        alt="soapbox-img"
                        className={isVertical}
                        onContextMenu={(e) => e.preventDefault()}
                        onLoad={(e) => {
                            imgRef();
                        }}
                    />
                </LazyLoad>
            }

            {mimeType.match(/video/gi) == "video" &&
                <LazyLoad offset={0}>
                    <video
                        loop muted controls autoPlay
                        disablePictureInPicture
                        className="hoot-vdo-profile"
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <source
                            src={filePath}
                            type={mimeType}
                        />
                        Your browser does not support HTML video.
                    </video>
                </LazyLoad>
            }

            {mimeType.match(/audio/gi) == "audio" &&
                <LazyLoad offset={0}>
                    <audio
                        className="hoot-ado-profile"
                        controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <source
                            src={filePath}
                            type={mimeType}
                        />
                        Your browser does not support the audio element.
                    </audio>
                </LazyLoad>
            }
        </Fragment>
    )
}

export default MediaProfile
