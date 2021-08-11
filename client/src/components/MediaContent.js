import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload';

const MediaContent = ({ mimeType, filePath, views, image, editOpen }) => {
    const BaseURL = process.env.REACT_APP_API_URL;

    const [viewCount, setViewCount] = useState(views);
    const [isVertical, setIsVertical] = useState("hoot-img-vertical");
    const ref = useRef(null);

    const random = (min = 10, max = 50) => {
        let num = Math.random() * (max - min) + min;

        return Math.round(num);
    };

    // on every page load view will increase reandomly - just remove this useEffect to get back to normal view counts
    useEffect(() => {
        setViewCount(viewCount + random(1, 200));

        // to make view count 0 
        // setViewCount(0)
    }, [])

    // view functionality added to hoots.
    useEffect(() => {
        axios.put(`${BaseURL}/upload/views`, {
            views: viewCount,
            image: image
        }).then((response) => {
            // console.log(response.data.views);
        })
    }, [viewCount])

    const imgRef = () => {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;

        if (height > width) {
            setIsVertical("hoot-img-vertical");
        } else {
            setIsVertical("hoot-img-horizontal");
        }
    }

    return (
        <Fragment>
            {mimeType.match(/image/gi) == "image" &&
                <LazyLoad offset={500}>
                    <img
                        ref={ref}
                        src={filePath}
                        alt="soapbox-img"
                        className={isVertical}
                        onContextMenu={(e) => e.preventDefault()}
                        onLoad={(e) => {
                            setViewCount(viewCount + 1)
                            imgRef();
                        }}
                    />
                </LazyLoad>
            }

            {mimeType.match(/video/gi) == "video" &&
                <LazyLoad offset={500}>
                    <video
                        loop muted controls autoPlay
                        disablePictureInPicture
                        className="hoot-vdo"
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1)}
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
                <LazyLoad offset={500}>
                    <audio
                        className={editOpen ? "hoot-ado-fix" : "hoot-ado"}
                        controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1)}
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
