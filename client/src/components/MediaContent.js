import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload';

const MediaContent = ({ mimeType, filePath, views, image, editOpen }) => {
    const BaseURL = process.env.REACT_APP_API_URL;

    const [viewCount, setViewCount] = useState(views);
    const [isVertical, setIsVertical] = useState("hoot-img-vertical");
    const ref = useRef(null);

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

        // console.log("width: ", width);
        // console.log("height: ", height);

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
                        className="hoot-vdo"
                        controls
                        controlsList="nodownload"
                        disablepictureinpicture
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1)}
                        // onMouseOver={event => event.target.play()}
                        autoPlay
                        muted
                    // onMouseOut={event => event.target.pause()}
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
