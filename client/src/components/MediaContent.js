import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload';
import faker from 'faker';
import { words, numbers } from '../Helpers/Constants'
import BeatLoader from "react-spinners/BeatLoader";

const MediaContent = ({
    hootId,
    mimeType,
    filePath,
    audioPoster,
    views,
    image,
    editOpen,
    profilePicPath
}) => {
    const BaseURL = process.env.REACT_APP_API_URL;

    const [viewCount, setViewCount] = useState(views);
    const [isVertical, setIsVertical] = useState("hoot-img-vertical");
    const ref = useRef(null);

    const audioPosterPath = `${BaseURL}/audio-posters/${audioPoster}`; // media url from server

    const random = (min = 10, max = 50) => {
        let num = Math.random() * (max - min) + min;

        return Math.round(num);
    };

    // on every page load view will increase reandomly - just remove this useEffect to get back to normal view counts
    useEffect(() => {
        setViewCount(viewCount + random(50, 400));

        // to make view count 0 
        // setViewCount(0)
    }, [])

    // view functionality added to hoots.
    useEffect(() => {
        axios.put(`${BaseURL}/upload/views`, {
            views: viewCount,
            image: image
        }).then((response) => {
        })
    }, [viewCount])

    const fakeCommentFirstName = faker.name.firstName();
    const fakeCommentLastName = faker.name.lastName();
    const fakeCommentUsername = fakeCommentFirstName.toLowerCase();
    const fakeCommentAvatar = faker.image.avatar();
    const fakeCommentBody = words[Math.floor(Math.random() * words.length)];
    const fakeCommentNumber = numbers[Math.floor(Math.random() * numbers.length)].toLowerCase();

    // auto commenting  
    const autoComments = async () => {
        await axios.post(`${BaseURL}/comment/`, {
            name: fakeCommentFirstName + " " + fakeCommentLastName,
            username: fakeCommentUsername + fakeCommentNumber,
            commentBody: fakeCommentBody,
            profilePic: fakeCommentAvatar,
            hootId: hootId
        })
    }

    const imgRef = () => {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;

        if (height > width) {
            setIsVertical("hoot-img-vertical");
        } else {
            setIsVertical("hoot-img-horizontal");
        }

        autoComments();
    }

    const PlaceholderComponent = () => {
        return (
            <div className="placeholder">
                <BeatLoader color={"#8249A0"} size={20} />
            </div>
        )
    }

    return (
        <Fragment>
            {mimeType.match(/image/gi) == "image" &&
                <div
                // offset={15000}
                // placeholder={<PlaceholderComponent />}
                >
                    <img
                        ref={ref}
                        src={filePath}
                        alt="soapbox-img"
                        className={isVertical}
                        onContextMenu={(e) => e.preventDefault()}
                        onLoad={(e) => { setViewCount(viewCount + 1), imgRef() }}
                    />
                </div>
            }

            {mimeType.match(/video/gi) == "video" &&
                <div
                // offset={15000}
                // placeholder={<PlaceholderComponent />}
                >
                    <video
                        loop muted controls autoPlay
                        disablePictureInPicture
                        className="hoot-vdo"
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1), autoComments}
                    >
                        <source
                            src={filePath}
                        // type={mimeType}
                        />
                        Your browser does not support HTML video.
                    </video>
                </div>
            }

            {mimeType.match(/audio/gi) == "audio" &&
                <div
                // offset={15000}
                // placeholder={<PlaceholderComponent />}
                >
                    <video
                        className={editOpen ? "hoot-ado-fix" : "hoot-vdo"}
                        controls
                        poster={audioPoster !== null ? audioPosterPath : profilePicPath}
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1), autoComments}
                    >
                        <source
                            src={filePath}
                        // type="video/mp4"
                        />
                        Your browser does not support the audio element.
                    </video>
                </div>

            }
        </Fragment>
    )
}

export default MediaContent
