import React, { Fragment, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios'
import Avatar from 'react-avatar';
import { format } from 'date-fns'
import addDays from 'date-fns/addDays'
import getTime from 'date-fns/getTime'
import addSeconds from 'date-fns/addSeconds'
import addMinutes from 'date-fns/addMinutes'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import ClickAwayListener from 'react-click-away-listener';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { IoCloseOutline, IoRadioButtonOn } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiLink2 } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import NavBar from '../components/NavBar/NavBar'
import Picker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import { SoapboxTooltip } from '../components/SoapboxTooltip';

const CreateHoot = () => {
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
        // formData.append("link", JSON.stringify(formValues))
        formData.append("link", link)
        formData.append("ephemeral", ephemeralCheck ? 1 : 0)
        formData.append("private", privateCheck ? 1 : 0)
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
            ]).then(axios.spread((res1, res2) => {
                if (res1) {
                    setTimeout(() => {
                        history.push("/");
                    }, 500);
                }
            }))
        }

        const uploadDataToast = uploadData();
        toast.promise(uploadDataToast, {
            pending: 'Sending Hoot...',
            success: 'Hoot Successful',
            error: 'Please try again',
        });
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);
        (file && setMimeType(file.type));
        setSrc(URL.createObjectURL(file));
    }

    // const [userInformation, setUserInformation] = useState([]);

    // var userName = "";
    // var userProfilePic = "";
    // var userPrivateChannel = "";

    // //getting user data
    // useEffect(() => {
    //     const getUserData = async () => {
    //         await axios.get(`${BaseURL}/user/${username}`)
    //             .then((response) => {
    //                 setUserInformation(response.data);
    //             });
    //         setLoading(false);
    //     }
    //     getUserData();
    // }, [])

    // userInformation.map((user) => {
    //     userName = user.name
    //     userProfilePic = user.profilePic
    //     userPrivateChannel = user.privateChannel
    // })

    const [userData, setUserData] = useState([]);

    //getting user data
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${userInfo && userInfo.username}`)
                .then((response) => {
                    setUserData(response.data[0]);
                });
            setLoading(false);
        }

        try {
            getUserData();
        } catch (error) {
            console.log(error);
        }
    }, [userInfo && userInfo.username])

    const profilePicPath = `${BaseURL}/profile-pictures/${userData.profilePic}`;

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
    //     // event.preventDefault();
    //     // alert(JSON.stringify(formValues));
    //     // console.log(formValues);
    // }

    const insertLink = (event) => {
        // handleSubmit()
        toast.success('Link inserted'
            // , {
            //     style: {
            //         border: '2px solid #8249A0',
            //         color: '#8249A0',
            //     },
            //     iconTheme: {
            //         primary: '#8249A0',
            //         secondary: '#FFFAEE',
            //     },
            // }
        )

        setLinkModalOpen(false);
        event.preventDefault();
        // alert(JSON.stringify(formValues));

        // let jsonObject = Object.assign(...formValues.map(key => Object.values(key)).map(value => { value[0] }));
        // let json = JSON.stringify(jsonObject);
        // console.log(formValues);
        // console.log(json);
        // const stringify = JSON.stringify(formValues);
        // const parse = JSON.parse(stringify);
        // const parse1 = JSON.parse(formValues);
        // console.log("formValues: ", formValues);
        // console.log("stringify: ", stringify);
        // console.log("parse: ", parse);
        // console.log("parse1: ", parse1);
    }

    const closePreview = () => {
        setMimeType("");
        setSrc(null);
        setFile([]);
    }

    const [emojiPicker, setEmojiPicker] = useState(false);

    const emojis = ["😍", "🦉", "😂", "👏🏻", "💖", "😜", "🤯", "🤓", "🥰", "😎", "😋"];
    const [defaultEmoji, setDefaultEmoji] = useState("😄");

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
                                name={userData.name}
                                src={profilePicPath}
                                className={userData.profilePic === null ? null : "skeleton-img"}
                            />
                        </div>
                        {/* <img className="avatar" src="/images/default_user_profile.svg" alt="avatar" /> */}
                        <div className="name avatar_name">{userData.name}</div>

                        <div className="post-content">
                            <textarea
                                autoFocus
                                maxLength="300"
                                className="textarea-style"
                                placeholder="Share Your World. Hoot Hoot!"
                                value={caption}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setCaption(value);
                                }}
                            ></textarea>

                            {/* inserted links  */}
                            {link &&
                                <div style={{ padding: "0rem 0.5rem 1rem 0.5rem", wordBreak: "break-all" }}>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="link-content">{link}</a>
                                </div>
                            }
                            {/* <div style={{ marginBottom: "1rem", marginTop: "-0.5rem" }}>
                                {formValues.map((link, index) => {
                                    return (
                                        <div key={index} style={{ padding: "0rem 0.5rem 0rem 0.5rem", wordBreak: "break-all" }}>
                                            <a href={link.name} target="_blank" rel="noopener noreferrer" className="link-content">{link.name}</a>
                                        </div>
                                    )
                                })}
                            </div> */}

                            <div className="d-flex justify-content-between m-1 btn-caption-top">
                                <form action="">
                                    <div className="d-flex justify-content-end my-2 align-items-center" style={{ position: "relative" }}>

                                        {/* Photo */}
                                        <label
                                            htmlFor="post-image"
                                            className="btn-label"
                                        >
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
                                        <label
                                            htmlFor="post-video"
                                            className="btn-label"
                                        >
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
                                        <label
                                            htmlFor="post-audio"
                                            className="btn-label"
                                        >
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

                                        <div
                                            className="emoji-hover"
                                            onClick={() => { setEmojiPicker(!emojiPicker) }}
                                        >
                                            <span
                                                onMouseEnter={() => { emojiPicker || setDefaultEmoji(emojis[Math.floor(Math.random() * emojis.length)]) }}
                                            >
                                                {defaultEmoji}
                                            </span>
                                        </div>

                                        {emojiPicker && (
                                            <ClickAwayListener onClickAway={() => { setEmojiPicker(false) }}>
                                                <div>
                                                    <Picker
                                                        native
                                                        onEmojiClick={(event, emojiObject) => {
                                                            setCaption(caption + emojiObject.emoji);
                                                        }}
                                                        pickerStyle={{ position: "absolute", top: "2.5rem", left: "0.2rem", zIndex: "1111" }}
                                                    />
                                                </div>
                                            </ClickAwayListener>
                                        )}

                                        {/* data-tip="Insert Link" data-text-color="#8249A0" data-background-color="#D9D2FA" */}
                                        <SoapboxTooltip title="Insert Link" placement="right">
                                            <div>
                                                <FiLink2 className="insert-link" onClick={() => { setLinkModalOpen(true) }} />
                                            </div>
                                        </SoapboxTooltip>
                                    </div>
                                </form>

                                {/* Link Modal */}
                                {linkModalOpen &&
                                    <Fragment>
                                        <div className="modal-overlay"></div>
                                        <ClickAwayListener onClickAway={() => { setLinkModalOpen(false) }}>
                                            <div className="link-modal">
                                                <h5>Insert link(s)</h5>

                                                <input autoFocus type="text" value={link} onChange={(event) => { setLink(event.target.value) }} />

                                                {/* <form onSubmit={handleSubmit}> */}
                                                {/* <div>
                                                    {formValues.map((element, index) => (
                                                        <div className="form-inline" key={index}>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={element.name || ""}
                                                                onChange={e => handleChange(index, e)}
                                                                placeholder="link to"
                                                                autoFocus
                                                            />
                                                            {index ?
                                                                <AiFillMinusCircle className="btn-minus-link" onClick={() => removeFormFields(index)} />
                                                                : null
                                                            }
                                                        </div>
                                                    ))}
                                                </div> */}

                                                <div className="btn-post mt-2 link-info">
                                                    {/* <button className="btn-add-link" type="button" onClick={() => addFormFields()}>
                                                        Add
                                                    </button> */}
                                                    <button
                                                        className="btn-insert-link"
                                                        onClick={insertLink}
                                                    >
                                                        Insert
                                                    </button>{' '}
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
                                        disabled={file.length === 0}
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
                                    disabled={userData.privateChannel === 0}
                                />
                                <span>Private{" "}</span>
                                <small>
                                    {userData.privateChannel === 0 ? "(Requires Private Club, Please go to Profile and add Private Club)" : null}
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="record-on-create-hoot">
                        <div className="media-preview">
                            {mimeType === "" && <p>Upload Preview</p>}
                            {mimeType !== "" &&
                                <IoCloseOutline className="close-preview" onClick={closePreview} />
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
                                    <source src={src} />
                                    Your browser does not support HTML video.
                                </video>
                            }

                            {mimeType.match(/audio/gi) == "audio" &&
                                <video
                                    poster={profilePicPath}
                                    className="hoot-ado"
                                    controls
                                >
                                    <source src={src} />
                                    Your browser does not support the audio element.
                                </video>
                            }
                        </div>
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
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/create" />
                <meta property="og:title" content="Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="Create Hoot on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default CreateHoot
