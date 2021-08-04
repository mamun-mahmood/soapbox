import React, { Fragment } from 'react'
import LazyLoad from 'react-lazyload';

const MediaContent = ({ mimeType, filePath, editOpen }) => {
    return (
        <Fragment>
            {mimeType.match(/image/gi) == "image" &&
                <LazyLoad>
                    <img
                        onLoad={() => { console.log("loaded...") }}
                        src={filePath}
                        alt="soapbox-img"
                        className="hoot-img"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </LazyLoad>
            }

            {mimeType.match(/video/gi) == "video" &&
                <LazyLoad>
                    <video
                        onLoad={() => { console.log("loaded...") }}
                        width="400"
                        className="hoot-img"
                        controls
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
                <LazyLoad>
                    <audio
                        onLoad={() => { console.log("loaded...") }}
                        className={editOpen ? "hoot-ado-fix" : "hoot-ado"}
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

export default MediaContent
