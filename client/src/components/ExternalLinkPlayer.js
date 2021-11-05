import axios from 'axios'
import React from 'react'
import ReactPlayer from 'react-player';
import { random } from '../Helpers/formatNumbers';

const ExternalLinkPlayer = ({ link, filePath, username, views, hootImgId, profilePicPath, hootId, mimeType, audioPosterPath }) => {
    const BaseURL = process.env.REACT_APP_API_URL;

    return (
        <div>
            {link.endsWith('.mp4') ||
                link.endsWith('.mkv') ||
                link.endsWith('.mov') ||
                link.endsWith('.ogv') ||
                link.endsWith('.webm') ||
                link.endsWith('.mpg')
                ? <div>
                    <video
                        muted controls
                        disablePictureInPicture
                        className="hoot-vdo"
                        style={{ width: "" }}
                        controlsList="nodownload"
                        onLoadStart={() => {
                            axios.put(`${BaseURL}/upload/views/external-player`, {
                                views: views + random(50, 400),
                                id: hootId
                            })
                        }}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        <source src={link} />
                        Your browser does not support HTML video.
                    </video>
                </div>
                : link.endsWith('.mp3') ||
                    link.endsWith('.ogg') ||
                    link.endsWith('.wav') ||
                    link.endsWith('.flac') ||
                    link.endsWith('.aac') ||
                    link.endsWith('.alac') ||
                    link.endsWith('.dsd')
                    ? <div>
                        <video
                            muted controls
                            poster={hootImgId ? filePath : profilePicPath}
                            className="hoot-ado"
                            controlsList="nodownload"
                            onLoadStart={() => {
                                axios.put(`${BaseURL}/upload/views/external-player`, {
                                    views: views + random(50, 400),
                                    id: hootId
                                })
                            }}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            <source src={link} />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                    : ReactPlayer.canPlay(link) &&
                    <div className='player-wrapper'>
                        <ReactPlayer
                            url={link}
                            className='react-player'
                            controls="true"
                            width={mimeType ? '97%' : '100%'}
                            height='100%'
                            onReady={() => {
                                axios.put(`${BaseURL}/upload/views/external-player`, {
                                    views: views + random(50, 400),
                                    id: hootId
                                })
                            }}
                        />
                    </div>
            }
        </div>
    )
}

export default ExternalLinkPlayer
