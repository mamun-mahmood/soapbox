import React, { Fragment, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios'
import Avatar from 'react-avatar';
import { format } from 'date-fns'
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
// import { MdPhotoLibrary } from "react-icons/md";
// import { FaVideo } from "react-icons/fa";
// import { AiFillAudio } from "react-icons/ai";
import NavBar from '../components/NavBar'

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState([]);
    const [src, setSrc] = useState(null);
    const [mimeType, setMimeType] = useState("");
    const history = useHistory();
    // const target = useRef(null);

    const BaseURL = process.env.REACT_APP_API_URL;

    var email = "";
    var username = "";
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    if (userInfo) {
        email = userInfo.email;
        username = userInfo.username
    }

    // timeStamp can be implemented at server-side...
    const date = new Date();
    const timeStamp = format(date, 'LLL dd, yyyy • HH:mm');

    const upload = (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("timeStamp", timeStamp)
        formData.append("caption", caption)
        formData.append("authorEmail", email)
        formData.append("file", file);

        axios.post(`${BaseURL}/upload`, formData)
            .then((response) => {
                console.log(response);
                history.push("/home");
            })
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);
        (file && setMimeType(file.type));
        setSrc(URL.createObjectURL(file));
    }

    const [userInformation, setUserInformation] = useState([]);

    //getting user data
    useEffect(() => {
        axios.get(`${BaseURL}/user/${username}`)
            .then((response) => {
                setUserInformation(response.data);
            });
    }, [])

    var userName = "";
    var userProfilePic = "";

    userInformation.map((user) => {
        userName = user.name
        userProfilePic = user.profilePic
    })

    const profilePicPath = `${BaseURL}/profile-pictures/${userProfilePic}`;

    return (
        <Fragment>
            <NavBar />
            <div className="upload-post">
                <div className="back-to-home">
                    <Link to="/home">
                        <FiArrowLeft className="left-arrow" />
                    </Link>
                    <span>
                        Back
                    </span>
                </div>
                <div className="post-caption d-flex flex-wrap">
                    <div className="avatar-wraper">
                        <Avatar
                            size={50}
                            round={true}
                            name={userName}
                            src={profilePicPath}
                        />
                    </div>
                    {/* <img className="avatar" src="/images/default_user_profile.svg" alt="avatar" /> */}
                    <div className="name avatar_name">{userName}</div>

                    <div className="post-content">
                        <textarea
                            autoFocus
                            maxLength="300"
                            className="textarea-style"
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(event) => {
                                const value = event.target.value;
                                setCaption(value);
                            }}
                        ></textarea>

                        <div className="d-flex justify-content-between m-1 btn-caption-top">
                            <form action="">
                                <div className="d-flex justify-content-end my-2">

                                    {/* Photo */}
                                    <label htmlFor="post-image" className="btn-label">
                                        Photo
                                        {/* <MdPhotoLibrary /> */}
                                    </label>
                                    <input
                                        type="file"
                                        id="post-image"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleFile}
                                        hidden
                                    />

                                    {/* Video */}
                                    <label htmlFor="post-video" className="btn-label">
                                        Video
                                        {/* <FaVideo /> */}
                                    </label>
                                    <input
                                        type="file"
                                        name="video"
                                        id="post-video"
                                        accept="video/*"
                                        onChange={handleFile}
                                        hidden
                                    />

                                    {/* Audio */}
                                    <label htmlFor="post-audio" className="btn-label">
                                        Audio
                                        {/* <AiFillAudio /> */}
                                    </label>
                                    <input
                                        type="file"
                                        name="audio"
                                        id="post-audio"
                                        accept="audio/*"
                                        onChange={handleFile}
                                        hidden
                                    />
                                </div>
                            </form>

                            <div className="caption-count">
                                <h6 className={caption.length > 280 && "text-danger"}>
                                    {" "}
                                    {caption.length}/300
                                </h6>
                            </div>

                            <div className="btn-post my-2">
                                <Button
                                    variant="primary mx-1"
                                    className="btn-create-hoot"
                                    onClick={upload}
                                    disabled={!caption}
                                >
                                    Hoot
                                </Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="media-preview">
                    {mimeType === "" && <p>Upload Preview</p>}
                    {mimeType !== "" &&
                        <IoCloseOutline
                            className="close-preview"
                            onClick={() => {
                                setMimeType("");
                                setSrc(null);
                            }}
                        />
                    }

                    {mimeType.match(/image/gi) == "image" &&
                        <img
                            src={src}
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
                                src={src}
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
                                src={src}
                                type={mimeType}
                            />
                            Your browser does not support the audio element.
                        </audio>
                    }
                </div>
            </div>

            <Helmet>
                {/* General tags */}
                <title>Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                <meta name="description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                {/* <meta name="image" content={ } /> */}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/create" />
                <meta property="og:title" content="Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default CreatePost
