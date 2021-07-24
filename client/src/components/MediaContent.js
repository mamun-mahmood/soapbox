import React from 'react'

const MediaContent = ({ mimeType, filePath }) => {
    return (
        <div>
            {mimeType.match(/image/gi) == "image" &&
                <img
                    src={filePath}
                    alt="soapbox-img"
                    className="hoot-img"
                />
            }

            {mimeType.match(/video/gi) == "video" &&
                <video
                    width="400"
                    className="hoot-img"
                    controls
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
                    className="hoot-ado"
                    controls
                >
                    <source
                        src={filePath}
                        type={mimeType}
                    />
                    Your browser does not support the audio element.
                </audio>
            }
        </div>
    )
}

export default MediaContent
