import React, { Fragment, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios'
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';
import { format } from 'date-fns'
import addDays from 'date-fns/addDays'
import getTime from 'date-fns/getTime'
import addSeconds from 'date-fns/addSeconds'
import addMinutes from 'date-fns/addMinutes'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import ClickAwayListener from 'react-click-away-listener';
import ReactTooltip from 'react-tooltip';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiLink2 } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import NavBar from '../components/NavBar/NavBar'
import { BiWindows } from 'react-icons/bi';

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState([]);
    const [src, setSrc] = useState(null);
    const [mimeType, setMimeType] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [ephemeralCheck, setEphemeralCheck] = useState(false);
    const [privateCheck, setPrivateCheck] = useState(false);
    const [link, setLink] = useState("");
    // const [links, setLinks] = useState([{ link: "" }]);
    const [linkModalOpen, setLinkModalOpen] = useState(false);

    const BaseURL = process.env.REACT_APP_API_URL;

    var email = "";
    var username = "";
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    if (userInfo) {
        email = userInfo.email;
        username = userInfo.username
    }

    // timeStamp can be implemented at server-side...
    const currentDate = new Date();
    const timeStamp = format(currentDate, 'LLL dd, yyyy • HH:mm');

    // by default expiry date is after 7 days of creating hoot... 
    // expiry date in Milliseconds 

    const expiryDate = addDays(currentDate, 7).getTime();

    const hashtagsFound = caption.split(' ').filter(v => v.startsWith('#'));
    const stocksFound = caption.split(' ').filter(v => v.startsWith('$'));

    const upload = (event) => {
        event.preventDefault()
        setSaveLoading(true);

        const formData = new FormData();
        formData.append("timeStamp", timeStamp)
        formData.append("caption", caption)
        formData.append("link", link)
        formData.append("ephemeral", ephemeralCheck ? 1 : 0)
        formData.append("expiryDate", ephemeralCheck ? expiryDate : 0)
        formData.append("authorEmail", email)
        formData.append("file", file);

        const uploadData = async () => {
            await axios.all([
                axios.post(`${BaseURL}/upload/create`, formData),
                hashtagsFound.map((hashtag) => {
                    axios.post(`${BaseURL}/hashtags`, {
                        hashtag: hashtag.replace(/[,.]/g, '')
                    })
                }),
                stocksFound.map((stock) => {
                    axios.post(`${BaseURL}/stocks`, {
                        stock: stock.replace(/[,.]/g, '')
                    })
                })
            ])
            // .then(axios.spread(() => {
            // }))
        }

        const uploadDataToast = uploadData();
        toast.promise(uploadDataToast, {
            loading: 'Sending Hoot...',
            success: 'Hoot Successful',
            error: 'Please try again',
        });

        setTimeout(() => {
            // history.push("/home");
            history.push("/");
        }, 500);
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);
        (file && setMimeType(file.type));
        setSrc(URL.createObjectURL(file));
    }

    const [userInformation, setUserInformation] = useState([]);

    var userName = "";
    var userProfilePic = "";

    useEffect(() => {
        //getting user data
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInformation(response.data);
                });
            setLoading(false);
        }
        getUserData();
    }, [])

    userInformation.map((user) => {
        userName = user.name
        userProfilePic = user.profilePic
    })

    const profilePicPath = `${BaseURL}/profile-pictures/${userProfilePic}`;

    const makeEphemeral = () => {
        setEphemeralCheck(!ephemeralCheck)
    }

    const makePrivate = () => {
        setPrivateCheck(!privateCheck)
    }

    // let handleChange = (i, e) => {
    //     let newLinks = [...links];
    //     newLinks[i][e.target.link] = e.target.value;
    //     setLinks(newLinks);
    // }

    // let addNewLink = () => {
    //     setLinks([...links, { link: "" }])
    // }

    // let removeLinks = (i) => {
    //     let newLinks = [...links];
    //     newLinks.splice(i, 1);
    //     setLinks(newLinks)
    // }

    // let handleSubmit = (event) => {
    //     alert(JSON.stringify(links));
    // }

    const insertLink = () => {
        // handleSubmit()
        toast.success('Link inserted')
        setLinkModalOpen(false);
    }

    // const [formValues, setFormValues] = useState([{ name: "" }])

    // let handleChange = (i, e) => {
    //     let newFormValues = [...formValues];
    //     newFormValues[i][e.target.name] = e.target.value;
    //     setFormValues(newFormValues);
    // }

    // let addFormFields = () => {
    //     setFormValues([...formValues, { name: "" }])
    // }

    // let removeFormFields = (i) => {
    //     let newFormValues = [...formValues];
    //     newFormValues.splice(i, 1);
    //     setFormValues(newFormValues)
    // }

    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(JSON.stringify(formValues));
    // }

    return (
        <Fragment>
            <NavBar />

            {loading &&
                <div className="loading">
                    <BeatLoader color={"#8249A0"} size={20} />
                </div>
            }
            {!loading &&
                <div className="upload-post">
                    <div className="back-to-home">
                        {/* <Link to="/home"> */}
                        <Link to="/">
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
                                className={userProfilePic === null ? null : "skeleton-img"}
                            />
                        </div>
                        {/* <img className="avatar" src="/images/default_user_profile.svg" alt="avatar" /> */}
                        <div className="name avatar_name">{userName}</div>

                        <ReactTooltip />

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

                            {link &&
                                <div style={{ padding: "0rem 0.5rem 1rem 0.5rem", wordBreak: "break-all" }}>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="link-content">{link}</a>
                                </div>
                            }

                            <div className="d-flex justify-content-between m-1 btn-caption-top">
                                <form action="">
                                    <div className="d-flex justify-content-end my-2 align-items-center">

                                        {/* Photo */}
                                        <label htmlFor="post-image" className="btn-label">
                                            Photo
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
                                        </label>
                                        <input
                                            type="file"
                                            name="audio"
                                            id="post-audio"
                                            accept="audio/*"
                                            onChange={handleFile}
                                            hidden
                                        />

                                        <FiLink2
                                            className="insert-link"
                                            data-tip="Insert Link" data-text-color="#8249A0" data-background-color="#D9D2FA"
                                            onClick={() => { setLinkModalOpen(true) }}
                                        />
                                    </div>
                                </form>

                                {/* Link Modal */}
                                {linkModalOpen &&
                                    <Fragment>
                                        <div className="modal-overlay"></div>
                                        <ClickAwayListener onClickAway={() => { setLinkModalOpen(false) }}>
                                            <div className="link-modal">
                                                <h4>Insert Link</h4>

                                                <input autoFocus type="text" value={link} onChange={(event) => { setLink(event.target.value) }} />
                                                {/* 
                                                <form onSubmit={handleSubmit}>
                                                    {formValues.map((element, index) => (
                                                        <div className="form-inline" key={index}>
                                                            <label>Name</label>
                                                            <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                                                        <button className="button submit" type="submit">Submit</button>
                                                    </div>
                                                </form> */}

                                                <div className="btn-post mt-2 link-info">
                                                    <Button
                                                        variant="primary"
                                                        className="btn-login"
                                                        style={{ padding: "0.2rem 0.5rem", borderRadius: "0.4rem" }}
                                                        onClick={insertLink}
                                                    // disabled={!link}
                                                    >
                                                        Insert
                                                    </Button>{' '}
                                                </div>
                                                <IoCloseOutline className="close-modal" onClick={() => setLinkModalOpen(false)} />
                                            </div>
                                        </ClickAwayListener>
                                    </Fragment>
                                }

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
                                        disabled={!caption || !src}
                                    >
                                        Hoot
                                    </Button>{' '}
                                </div>
                            </div>

                            <div className="ephemeral">
                                <input
                                    type="checkbox"
                                    className="ephemeral-toggle"
                                    checked={ephemeralCheck}
                                    onChange={makeEphemeral} />
                                <span>
                                    Ephemeral{" "}
                                </span>
                                <small>(Hoot's lifetime will be 7 days)</small>
                            </div>

                            <div className="ephemeral">
                                <input
                                    type="checkbox"
                                    className="ephemeral-toggle"
                                    checked={privateCheck}
                                    onChange={makePrivate}
                                />
                                <span>
                                    Private Hoot{" "}
                                </span>
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
            }


            <Helmet>
                {/* General tags */}
                <title>Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
                <meta name="description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />

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
