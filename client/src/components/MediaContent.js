import React, { Fragment } from 'react'

const MediaContent = ({ mimeType, filePath, editOpen }) => {
    return (
        <Fragment>
            {mimeType.match(/image/gi) == "image" &&
                <img
                    src={filePath}
                    alt="soapbox-img"
                    className="hoot-img"
                    onContextMenu={(e) => e.preventDefault()}
                />
            }

            {mimeType.match(/video/gi) == "video" &&
                <video
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
            }

            {mimeType.match(/audio/gi) == "audio" &&
                <audio
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
            }
        </Fragment>
    )
}

export default MediaContent
