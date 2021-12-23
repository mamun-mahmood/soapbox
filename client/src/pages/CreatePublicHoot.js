import React, { Fragment, useState, useEffect, useRef, useCallback, useContext } from 'react'
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
import { FiArrowLeft, FiCamera, FiDownload, FiLink2, FiVideo } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import NavBar from '../components/NavBar/NavBar'
import { AiOutlineAudio } from 'react-icons/ai';
import { VscDebugRestart } from 'react-icons/vsc';
import { FaStopCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Picker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import { SoapboxTooltip } from '../components/SoapboxTooltip';
import shutterClick from '../assets/shutter-click.wav';
import useRecorder from "react-hook-recorder";
import { v4 as uuidv4 } from 'uuid';
import { MyStream } from '../context/MyStreamContext';
import ReactPlayer from 'react-player'
import imagerecord from '../assets/imagerecord.png';
import videorecord from '../assets/videorecord.png';
import audiorecord from '../assets/audiorecord.png';
import imageupload from '../assets/imageupload.png';
import audioupload from '../assets/audioupload.png';
import videoupload from '../assets/videoupload.png';
import emojiupload from '../assets/emoji.png';
import addlink from '../assets/addlink.png';
import hooticon from '../assets/hooticon.png';

const CreatePrivateHoot = (props) => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState([]);
    const [audioPoster, setAudioPoster] = useState([]);
    const [src, setSrc] = useState(null);
    const [mimeType, setMimeType] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [ephemeralCheck, setEphemeralCheck] = useState(false);
    const [privateCheck, setPrivateCheck] = useState(false);
    const [link, setLink] = useState("");
    const [showLinkPreview, setShowLinkPreview] = useState(false);
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
        formData.append("onDemandMedia", 0);
        formData.append("file", file);
        formData.append("audioPoster", audioPoster);

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
                    props.closeHoot()
                    setTimeout(() => {
                        history.push("/All-Hoots");
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
        event.preventDefault();
        toast.success('Link inserted');

        ReactPlayer.canPlay(link) && setShowLinkPreview(true);
        setLinkModalOpen(false);
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

    const [emojiPicker, setEmojiPicker] = useState(false);

    const emojis = ["😍", "🦉", "😂", "👏🏻", "💖", "😜", "🤯", "🤓", "🥰", "😎", "😋"];
    const [defaultEmoji, setDefaultEmoji] = useState("😄");

    const closePreview = () => {
        setMimeType("");
        setSrc(null);
        setFile([]);
        setAudioPoster([]);
    }

    return (
        <Fragment>
            <div className="upload-post-private">
                <div className="record-on-create-hoot">
                    <div className="media-preview-private">
                        {!showLinkPreview ?
                            link ?
                                <div style={{ padding: "0rem 0.5rem 1rem 0.5rem", wordBreak: "break-all", marginTop: "-0.5rem" }}>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="link-content">{link}</a>
                                </div>
                                : null
                            : null}

                        {mimeType === "" && !showLinkPreview && !link && <p>Upload Preview</p>}

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
                                poster={audioPoster.length !== 0 ? URL.createObjectURL(audioPoster) : profilePicPath}
                                className="hoot-vdo-private"
                                controls
                            >
                                <source src={src} />
                                Your browser does not support the audio element.
                            </video>
                        }
                    </div>

                    <div className="extra-features" style={{ height: 370 }}>
                        {/* upload image */}
                        <label htmlFor="post-image">
                            <SoapboxTooltip title="upload image" placement="right">
                                <img
                                    className="emoji-hover"
                                    src={imageupload}
                                    style={{ cursor: 'pointer' }}
                                    width="35px"
                                />
                            </SoapboxTooltip>
                        </label>
                        <input
                            type="file"
                            id="post-image"
                            name="photo"
                            accept="image/*"
                            onChange={handleFile}
                            hidden
                        />

                        {/* upload video */}
                        <label htmlFor="post-video">
                            <SoapboxTooltip title="upload video" placement="right">
                                <img
                                    className="emoji-hover"
                                    src={videoupload}
                                    style={{ cursor: 'pointer' }}
                                    width="35px"
                                />
                            </SoapboxTooltip>
                        </label>
                        <input
                            type="file"
                            name="video"
                            id="post-video"
                            accept="video/*"
                            onChange={handleFile}
                            hidden
                        />

                        {/* upload audio */}
                        <label htmlFor="post-audio">
                            <SoapboxTooltip title="upload audio" placement="right">
                                <img
                                    className="emoji-hover"
                                    src={audioupload}
                                    style={{ cursor: 'pointer' }}
                                    width="35px"
                                />
                            </SoapboxTooltip>
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
                            <SoapboxTooltip title="Emoji" placement="right">
                                <img
                                    className="emoji-hover"
                                    src={emojiupload}
                                    style={{ cursor: 'pointer' }}
                                    width="35px"
                                />
                            </SoapboxTooltip>
                        </div>

                        {/* Emoji component */}
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
                        <SoapboxTooltip title="Insert Link" placement="right">
                            <img className="emoji-hover" src={addlink} style={{ cursor: 'pointer' }} onClick={() => { setLinkModalOpen(true) }} width="35px" />
                        </SoapboxTooltip>
                    </div>

                    <div
                        className="btn-post my-2"
                        style={{
                            backgroundColor: 'whitesmoke',
                            display: 'flex',
                            minWidth: 150,
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            border: '2px dashed #8249A0',
                            paddingLeft: '5px'
                        }}
                    >
                        <div className="ephemeral">
                            <input
                                type="checkbox"
                                className="ephemeral-toggle"
                                checked={privateCheck}
                                onChange={() => { setPrivateCheck(!privateCheck) }}
                                disabled={!userData.privateChannel}
                            />
                            <span>Private{" "}</span>
                            <small>
                                {userData.privateChannel === 0 ? "(Requires Private Club, Please go to Profile and add Private Club)" : null}
                            </small>
                        </div>

                        <SoapboxTooltip title="Hoot's lifetime will be 7 days" placement="bottom">
                            <div className="ephemeral">
                                <input
                                    type="checkbox"
                                    className="ephemeral-toggle"
                                    checked={ephemeralCheck}
                                    onChange={makeEphemeral} />
                                <span>
                                    Ephemeral{" "}
                                </span>
                            </div>
                        </SoapboxTooltip>

                        <SoapboxTooltip title="Hoot" placement="bottom">
                            <img src={hooticon} className="emoji-hover"
                                onClick={upload}
                                disabled={!ReactPlayer.canPlay(link) && file.length === 0}
                                style={{ cursor: 'pointer' }} width="60px" style={{ margin: "0 auto" }} />
                        </SoapboxTooltip>
                    </div>
                </div>

                <div className="post-caption d-flex flex-wrap">
                    <div className="post-content">
                        <textarea
                            autoFocus
                            maxLength="2200"
                            className="textarea-style-private"
                            placeholder="Share Your World. Hoot Hoot! (optional)"
                            value={caption}
                            onChange={(event) => {
                                const value = event.target.value;
                                setCaption(value);
                            }}
                        >
                        </textarea>

                        <div className="caption-count-private">
                            <h6 className={caption.length > 280 && "text-danger"} style={{ marginBottom: 0, color: "white" }}>
                                {" "}
                                {caption.length}/300
                            </h6>
                        </div>

                        <div className="d-flex justify-content-between m-1 btn-caption-top">
                            <form action="">
                                <div className="d-flex justify-content-end my-2 align-items-center" style={{ position: "relative" }}>
                                    {/* Photo */}
                                </div>
                            </form>

                            {/* Link Modal */}
                            {linkModalOpen &&
                                <Fragment>
                                    <div className="modal-overlay"></div>
                                    <ClickAwayListener onClickAway={() => { setLinkModalOpen(false) }}>
                                        <div className="link-modal">
                                            <h5>Add your Youtube, Podcast and Media Links</h5>

                                            <input
                                                autoFocus
                                                type="text"
                                                value={link}
                                                onChange={(event) => { setLink(event.target.value) }}
                                            />

                                            <div className="btn-post mt-2 link-info">
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
                        </div>


                        {showLinkPreview ?
                            link.endsWith('.mp4') || link.endsWith('.mkv') || link.endsWith('.mov') || link.endsWith('.ogv') || link.endsWith('webm') || link.endsWith('.mpg')
                                ?
                                <video
                                    muted controls
                                    disablePictureInPicture
                                    className="hoot-vdo-private"
                                    style={{ width: "none" }}
                                    controlsList="nodownload"
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    <source
                                        src={link}
                                    />
                                    Your browser does not support HTML video.
                                </video>
                                :
                                link.endsWith('.mp3') || link.endsWith('.ogg') || link.endsWith('.wav') || link.endsWith('.flac') || link.endsWith('.aac') || link.endsWith('.alac') || link.endsWith('.dsd')
                                    ?
                                    <video
                                        muted controls
                                        poster={src ? src : `${BaseURL}/profile-pictures/${userData.profilePic}`}
                                        className="hoot-vdo-private"
                                        style={{ width: "auto" }}
                                        controlsList="nodownload"
                                        onDragStart={(e) => e.preventDefault()}
                                    >
                                        <source
                                            src={link}
                                        />
                                        Your browser does not support HTML video.
                                    </video>
                                    :
                                    ReactPlayer.canPlay(link) &&
                                    <div className='player-wrapper-private'>
                                        <ReactPlayer
                                            url={link}
                                            className='react-player'
                                            controls="true"
                                            width='473px'
                                            height='252px'
                                        />
                                    </div>
                            : null
                        }

                        {showLinkPreview &&
                            link.endsWith('.mp3') || link.endsWith('.ogg') || link.endsWith('.wav') || link.endsWith('.flac') || link.endsWith('.aac') || link.endsWith('.alac') || link.endsWith('.dsd')
                            ?
                            <small style={{ margin: "0 0.5rem", color: "#6B7280", display: "block", fontWeight: "500" }}>
                                (By Default <b>Profile Picture</b> will be taken as <b>Audio Poster</b> and it can be changed by <b>Selecting Photo</b>)
                            </small>
                            : null
                        }

                        {file.length !== 0 &&
                            file.type.match(/audio/gi) == "audio"
                            ? <Fragment>
                                <label
                                    htmlFor="change-audio-poster"
                                    className="change-audio-poster"
                                >
                                    Change Audio Poster
                                </label>
                                <input
                                    type="file"
                                    name="audio"
                                    id="change-audio-poster"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const poster = event.target.files[0];
                                        setAudioPoster(poster);
                                    }}
                                    hidden
                                />
                            </Fragment>
                            : null
                        }

                        {file.length !== 0 &&
                            file.type.match(/audio/gi) == "audio"
                            ? <small style={{ margin: "0 0.5rem", color: "#6B7280", display: "block", fontWeight: "500" }}>
                                (By Default <b>Profile Picture</b> will be taken as
                                <b>Audio Poster</b> and it can be changed by <b>Selecting Audio Poster</b>)
                            </small>
                            : null
                        }
                    </div>
                </div>
            </div>

            <Helmet>
                {/* General tags */}
                <title>Create Hoot on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
                <meta name="description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Create Hoot on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:description" content="Create Hoot on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta name="twitter:image" content="https://soapboxapi.megahoot.net/profile-pictures/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/create" />
                <meta property="og:title" content="Create Hoot on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:description" content="Create Hoot on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                <meta property="og:image" content="https://soapboxapi.megahoot.net/profile-pictures/MegaHoot_Owl3_app.png" />
            </Helmet>
        </Fragment>
    )
}

export default CreatePrivateHoot
