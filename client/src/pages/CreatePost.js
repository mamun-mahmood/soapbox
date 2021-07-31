import React, { Fragment, useRef } from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios'
import { format } from 'date-fns'
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import NavBar from '../components/NavBar'
import MediaContent from '../components/MediaContent';

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState([]);
    const [src, setSrc] = useState(null);
    const [mimeType, setMimeType] = useState("");
    const history = useHistory();

    // const target = useRef(null);

    const BaseURL = process.env.REACT_APP_API_URL;

    var email = "";
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    if (userInfo) {
        email = userInfo.email;
    }

    console.log("email:", email);

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

    return (
        <Fragment>
            <NavBar />

            <div className="upload-post">
                <div className="post-caption d-flex flex-wrap">
                    <img className="avatar" src="/images/default_user_profile.svg" alt="avatar" />
                    <div className="name avatar_name">{userInfo && userInfo.username}</div>

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
                                    <label htmlFor="post-image" className="btn-label">Photo</label>
                                    <input
                                        type="file"
                                        id="post-image"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleFile}
                                        hidden
                                    />

                                    {/* Video */}
                                    <label htmlFor="post-video" className="btn-label">Video</label>
                                    <input
                                        type="file"
                                        name="video"
                                        id="post-video"
                                        accept="video/*"
                                        onChange={handleFile}
                                        hidden
                                    />

                                    {/* Audio */}
                                    <label htmlFor="post-audio" className="btn-label">Audio</label>
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
                <title>Create Hoot on MegaHoot Soapbox</title>
                <meta name="description" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                {/* <meta name="image" content={ } /> */}

                {/* OpenGraph tags */}
                {/* <meta property="og:url" content={ } />
                {isBlogPost ? <meta property="og:type" content="article" /> : null}
                <meta property="og:title" content={ } />
                <meta property="og:description" content={ } />
                <meta property="og:image" content={ } />
                <meta property="fb:app_id" content={ } /> */}

                {/* Twitter Card tags */}
                {/* <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={ } />
                <meta name="twitter:title" content={ } />
                <meta name="twitter:description" content={ } />
                <meta name="twitter:image" content={ } /> */}
            </Helmet>
        </Fragment>
    )
}

export default CreatePost
