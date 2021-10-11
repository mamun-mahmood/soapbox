import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload';
import faker from 'faker';
import BeatLoader from "react-spinners/BeatLoader";

const MediaContent = ({
    hootId,
    mimeType,
    filePath,
    views,
    image,
    editOpen,
    profilePicPath
}) => {
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
            // console.log(response.data.views);
        })
    }, [viewCount])

    const fakeCommentFirstName = faker.name.firstName();
    const fakeCommentUsername = fakeCommentFirstName.toLowerCase();
    // const fakeCommentBody = faker.random.words() + " " + faker.random.words();
    const fakeCommentAvatar = faker.image.avatar();

    const words = [
        "Awesome",
        "Brilliant",
        "Amazing",
        "cool",
        "exciting",
        "Stay creative",
        "Awesome Hoot",
        "Sweet",
        "kewl",
        "beautiful",
        "you blew me away",
        "Love it!",
        "Keep rolling!!",
        "Join the Club",
        "confidence is key , throw the key away 🥰😘😊",
        "Just keep smiling 💖✌🏻😘",
        "this inspired me🧚‍♀️💖",
        "Practice makes perfect 🥰",
        "You’re on top of the world",
        "wow look at your talent!",
        "Neat!",
        "Never seen a selfie of yours that I don’t like.",
        "You are the coolest.",
        "Blessing your Soapbox feed once again",
        "The hottest pal in the town",
        "Keep Shining",
        "make the most of it all",
        "come join us",
        "awesome content",
        "wicked hoot",
        "where's the MORE",
        "who did what and why",
        "where are we going",
        "dont know why but I like this hoot",
        "Hoots are bad ass",
        "my comments are my own",
        "wheres your club?",
        "Twitter Twitter yadda yadda",
        "InstaWHAT....",
        "Keep sharing the wicked content",
        "Jumpin' head first",
        "who what and when",
        "bring the noise",
        "Funky",
        "sweet hoot",
        "saucy but kewl",
        "hey , cool hoot",
        "keep posting sweet stuff",
        "Watching the waves",
        "Sun is shinning",
        "Post more Hoots!",
        "Life is life",
        "love it",
        "looking good",
        "sharp",
        "whaaaatttt",
        "bring it dont sing it",
        "woooowwww",
        "whoooaaaaaaa",
        "WTF",
        "FOMO",
        "Bringing it round and round",
    ]

    const emojis = [
        "😀",
        "😀😍",
        "",
        "🙏🏻👏🏻",
        "😍",
        "👏🏻🙏🏻😊",
        "😊",
        "",
        "😍💗",
        "🙏🏻",
        "😍🦉",
        "👍🏻",
        "",
        "👏🏻👍🏻😀",
        "🦉",
        "💗",
        "😊💗",
        "",
        "👏🏻",
        "👍🏻👏🏻",
        "🦉😀👍🏻",
        "",
        "😍😍😍",
    ]

    // auto commenting  
    const autoComments = async () => {
        await axios.post(`${BaseURL}/comment/`, {
            name: fakeCommentFirstName,
            username: fakeCommentUsername,
            commentBody: words[Math.floor(Math.random() * words.length)] + " " + emojis[Math.floor(Math.random() * emojis.length)],
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
                        onLoadStart={(e) => setViewCount(viewCount + 1), autoComments
                        }
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
                        className={editOpen ? "hoot-ado-fix" : "hoot-ado"}
                        controls
                        poster={profilePicPath}
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1), autoComments
                        }
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
{/* <LazyLoad
                    offset={15000}
                    placeholder={<PlaceholderComponent />}
                >
                    <audio
                        className={editOpen ? "hoot-ado-fix" : "hoot-ado"}
                        controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadStart={(e) => setViewCount(viewCount + 1)}
                    >
                        <source
                            src={filePath}
                        // type={mimeType}
                        />
                        Your browser does not support the audio element.
                    </audio>
                </LazyLoad> */}


export default MediaContent
