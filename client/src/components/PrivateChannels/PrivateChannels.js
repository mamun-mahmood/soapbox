import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Post from "../Post";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "../Feed/InfiniteScrollLoader";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import { FaTumblr, IoSend } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FiTwitter, FiSearch, FiSend, FiFolder, FiImage, FiVideo, FiSmile } from "react-icons/fi";
import socket, { startSocket } from '../../socketChat';
import Picker from 'emoji-picker-react';
import {
    RiFacebookCircleLine,
    RiLiveFill,
    RiPinterestLine,
    RiRecordCircleFill,
    RiSnapchatLine,
} from "react-icons/ri";
import {
    AiOutlineInstagram,
    AiOutlineLinkedin,
    AiOutlineMedium,
    AiOutlineReddit,
} from "react-icons/ai";
import EndMsg from "../Feed/EndMsg";
import banner from "../../assets/banner-3.jfif";
import live from "../../assets/banner-3.jfif";
import "./privateChannels.css";
// import toast from "react-hot-toast";
import { toast } from 'react-toastify';
import { IoRecording } from "react-icons/io5";
import { BiVideoRecording } from "react-icons/bi";
import { Event, LiveTvRounded } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import oneonone from '../../assets/oneonone.png';
import groupcall from '../../assets/groupcall.png';
import personalmessage from '../../assets/personalmessage.png';
import { Form } from "react-bootstrap";
import ClickAwayListener from "react-click-away-listener";

const PrivateChannels = () => {

    const [userProfilePic, setUserProfilePic] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [uploads, setUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const [subscribe, setSubscribe] = useState(false);
    const [showSubscribeButton, setShowSubscribeButton] = useState(false)
    const [callRequest, setCallRequest] = useState(false);
    const [oneOnOnecall, setOneOnOneCall] = useState(false)
    const [groupCall, setGroupCall] = useState(false)
    const [requestMessage, setRequestMessage] = useState(0)
    const [subscribePrice, setSubscribePrice] = useState(0);
    const [callRequestPrice, setCallRequestPrice] = useState(0);
    const [oneOnOnecallPrice, setOneOnOneCallPrice] = useState(0)
    const [groupCallPrice, setGroupCallPrice] = useState(0)
    const [requestMessagePrice, setRequestMessagePrice] = useState(0)
    const [verifiedAutographPrice, setVerifiedAutographPrice] = useState(0)
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [showFeed, setShowFeed] = useState(true)

    const [showChatRoom, setShowChatRoom] = useState(false)

    const [verifiedAutograph, setVerifiedAutograph] = useState(false)
    const [showRequest, setShowRequest] = useState(false)
    const [showSubscribers, setShowSubscribers] = useState(false)
    const [showNotification, setShowNotification] = useState(false)


    const [showPricingSetting, setShowPricingSetting] = useState(false)
    const { username } = useParams();
    const BaseURL = process.env.REACT_APP_API_URL;

    const LIMIT = 4;

    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);
    const [loading, setLoading] = useState(true);
    const [messageInboxValue, setMessageInboxValue] = useState("");

    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');

    var totalViews = 0;
    var totalLikes = 0;
    const append = (message, position, imgSrc, isEmoji) => {

        var messageContainer = document.querySelector('.container')
        const messageElement = document.createElement('div');


        messageElement.innerText = message;
        messageElement.classList.add('message');
        if (isEmoji) {
            messageElement.classList.add('message-emoji');
        }
        messageElement.classList.add(position);
        if (imgSrc) {
            const image = document.createElement('img');
            image.src = imgSrc;
            if (position == "right") {
                image.classList.add('chat-profile-right');
            } else {
                image.classList.add('chat-profile-left');
            }


            messageElement.append(image);
        }

        messageContainer.append(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;

    }
    const messagesubmit = (e) => {
        e.preventDefault();
        const message = messageInboxValue;
        append(`${message}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`)
        // socket.emit('send',message);
        socket.emit('send', {
            name: userFullName,
            message: message,
            profilePic: userProfilePic,
            isEmoji: false
        });
        setMessageInboxValue('')

    }

    useEffect(() => {
        socket.on('user-joined', name => {

            append(`${name.name} Joined the chat`, 'right', `${BaseURL}/profile-pictures/${name.profilePic}`)
        })

        socket.on('receive', data => {
            console.log(data, "data")
            if (data.isEmoji) {
                append(`${data.message}`, 'left', `${BaseURL}/profile-pictures/${data.profilePic}`, data.isEmoji)

            } else {
                append(`${data.name}:${data.message}`, 'left', `${BaseURL}/profile-pictures/${data.profilePic}`, data.isEmoji)
            }
        })

        socket.on('left', name => {
            append(`${name} left the chat`, 'right')
        })
    }, [])

    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`).then((response) => {
                setUserInfo(response.data);
                console.log(response, "dky");
                axios.get(`${BaseURL}/upload/user/${username}`)
                    .then((response) => {
                        response.data.map((user) => {
                            totalViews += user.views
                            totalLikes += user.likes
                        })
                        setLikes(totalLikes);
                        setViews(totalViews);

                        axios.post(`${BaseURL}/user/pricings`, {
                            username: username
                        }).then((res) => {
                            console.log(res.data)
                            setOneOnOneCallPrice(res.data[0].oneOnOneCall);
                            setGroupCallPrice(res.data[0].groupCall);
                            setRequestMessagePrice(res.data[0].personalMessage);
                            setSubscribePrice(res.data[0].subscription);
                            setVerifiedAutographPrice(res.data[0].verifiedAutographPrice)

                        })
                    })
            });
            setLoading(false);
        };
        getUserData();
        axios.get(`${BaseURL}/user/${userInformation.username}`).then((res) => {
            setUserProfilePic(res.data[0].profilePic);
            setUserFullName(res.data[0].name)
        })
            .catch(err => { console.log(err) })
    }, []);

    useEffect(() => {
        const getAllUploadData = async () => {
            axios
                .get(`${BaseURL}/upload/user/private/p/${username}?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setUploads(response.data.results);

                });
        };
        getAllUploadData();
    }, []);

    const fetchMoreHoots = async () => {
        await axios
            .get(`${BaseURL}/upload/user/private/p/${username}?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const hootsFromServer = response.data.results;

                setUploads([...uploads, ...hootsFromServer]);

                if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    };

    const privateProtected = {
        userSelect: "none",
    };

    const subscribeUser = () => {

        setShowSubscribeButton(!showSubscribeButton)
        setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false)


    };

    const unSubscribeUser = () => {

        setShowSubscribeButton(!showSubscribeButton)
        setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false)


    };

    const callRequestUser = () => {
        setCallRequest(!callRequest);

        toast.success(`Requested call to ${username}`
            // , {
            //     style: {
            //         border: "2px solid #8249A0",
            //         color: "#8249A0",
            //     },
            //     iconTheme: {
            //         primary: "#8249A0",
            //         secondary: "#FFFAEE",
            //     },
            // }
        );
    };

    const cancelCallRequestUser = () => {
        setCallRequest(!callRequest);

        toast.success(`Cancelled call request to ${username}`
            // , {
            //     style: {
            //         border: "2px solid #8249A0",
            //         color: "#8249A0",
            //     },
            //     iconTheme: {
            //         primary: "#8249A0",
            //         secondary: "#FFFAEE",
            //     },
            // }
        );
    };

    const updatePricing = () => {
        axios.post(`${BaseURL}/user/UpdatePricings`, {
            oneOnOneCall: oneOnOnecallPrice,
            groupCall: groupCallPrice,
            personalMessage: requestMessagePrice,
            subscription: subscribePrice,
            verifiedAutographPrice: verifiedAutographPrice,
            username: username,

        })
            .then((res) => { alert('Updated successfully') })
            .catch((err) => { console.log(err) })
    }
    return (
        <Fragment>
            <div className="private-channels" style={{ userSelect: "none" }}>
                <div className="channel-banner" style={{ position: 'relative' }}>
                    <img src={banner} alt="banner" />
                    <div style={{ position: 'absolute', bottom: '50px', left: '120px', zIndex: 5 }} className="clubOwner">Club Owner</div>
                </div>
                <div className="channel-content">
                    {userInfo.map((user) => {
                        return (
                            <Fragment key={user.id}>
                                <div className="channel-user-info">
                                    <ul
                                        style={{
                                            position: "sticky",
                                            top: "9rem",
                                            alignSelf: "flex-start",
                                            padding: "1rem",
                                        }}
                                    >

                                        <div className="profile-pic">

                                            <img
                                                src={`${BaseURL}/profile-pictures/${user.profilePic}`}
                                                alt="profile"
                                            />
                                        </div>
                                        <div style={{ maxHeight: '70vh', overflowY: 'scroll' }} >
                                            <div className="user-information">
                                                <div className="name">{user.name}</div>
                                                <div className="username">@{user.username}</div>
                                                <div className="followers">
                                                    <b>
                                                        {formatCount(likes) +
                                                            formatSi(likes)}
                                                    </b>
                                                    <span> Likes  </span>
                                                    <b>
                                                        {formatCount(views) +
                                                            formatSi(views)}
                                                    </b>
                                                    <span> Views</span>
                                                </div>


                                                {user.bio && (
                                                    <div
                                                        className="user-desc"
                                                        style={{ textAlign: "center" }}
                                                    >
                                                        {user.bio}
                                                    </div>
                                                )}

                                                {user.website && (
                                                    <a
                                                        href={
                                                            !user.website.includes("https://")
                                                                ? "https://" + user.website
                                                                : user.website
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="profile-website"
                                                    >
                                                        {user.website.includes("https://")
                                                            ? user.website.slice(8)
                                                            : user.website}
                                                    </a>
                                                )}
                                                <div>
                                                    {userInformation.username !== username ? <div className="live-header">Request a Virtual Experience</div> : null}
                                                    {userInformation.username == username ? (
                                                        <div>
                                                            {/* <button
                                                            onClick={() => {
                                                                const Id = uuidv4()
                                                                history.push({
                                                                    pathname: `/${uuidv4()}/SoapboxHall/${uuidv4()}`,
                                                                    state: {
                                                                        host: true,
                                                                        userName: userInformation.username,
                                                                        hallId: Id,
                                                                        hostUserName: username
                                                                    }


                                                                });
                                                            }}
                                                        > </button> */}

                                                            <div className="live-header">Schedule Virtual Experience</div>
                                                            <div className="control">

                                                                <button>Schedule Vero Call or PPV</button>

                                                            </div>
                                                            <br></br>
                                                            <br></br>
                                                            <div className="live-header">Create Pay Per View Event</div>
                                                            <div className="control">

                                                                <button>Brodcast Vero Live PPV</button>
                                                                <button>Brodcast Vero Pre-recorded PPV</button>

                                                            </div>
                                                            {/* <div className="channel-btn-icon">
                                                                Go Live
                                                                <BiVideoRecording
                                                                    style={{ fontSize: "1.55rem" }}
                                                                />
                                                            </div>
                                                       
                                                        <button>
                                                            <div className="channel-btn-icon">
                                                                Create Event
                                                                <Event />
                                                            </div>
                                                        </button> */}
                                                        </div>
                                                    ) : (
                                                        <div className="control">
                                                            {/* <button>
                              {callRequest
                                ? "Virtual Experiences"
                                : "Virtual Experiences"}
                            </button> */}
                                                            <button onClick={() => { setOneOnOneCall(!oneOnOnecall); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false); setShowSubscribeButton(false) }}>
                                                                1 on 1 call
                                                            </button>
                                                            <button onClick={() => { setOneOnOneCall(false); setGroupCall(!groupCall); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false); setShowSubscribeButton(false) }} >
                                                                {callRequest ? "Group call" : "Group call"}
                                                            </button>
                                                            <button onClick={() => { setOneOnOneCall(false); setGroupCall(false); setRequestMessage(!requestMessage); setVerifiedAutograph(false); setShowFeed(false); setShowSubscribeButton(false) }} >
                                                                Message
                                                            </button>
                                                            <button onClick={() => { setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(!verifiedAutograph); setShowFeed(false); setShowSubscribeButton(false) }} >
                                                                Autograph
                                                            </button>
                                                            <button>
                                                                Marketplace
                                                            </button>
                                                            <button onClick={() => { subscribe ? unSubscribeUser() : subscribeUser() }} >

                                                                {subscribe ? "Membership" : "Get Membership"}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div
                                                    className="social-profile-icon-links"
                                                    style={{ flexWrap: "wrap" }}
                                                >
                                                    {user.twitter && (
                                                        <a
                                                            href={
                                                                !user.twitter.includes("https://")
                                                                    ? "https://" + user.twitter
                                                                    : user.twitter
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <FiTwitter className="social-profile-icon s-twitter" />
                                                        </a>
                                                    )}
                                                    {user.instagram && (
                                                        <a
                                                            href={
                                                                !user.instagram.includes("https://")
                                                                    ? "https://" + user.instagram
                                                                    : user.instagram
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <AiOutlineInstagram className="social-profile-icon s-instagram" />
                                                        </a>
                                                    )}
                                                    {user.linkedIn && (
                                                        <a
                                                            href={
                                                                !user.linkedIn.includes("https://")
                                                                    ? "https://" + user.linkedIn
                                                                    : user.linkedIn
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <AiOutlineLinkedin className="social-profile-icon s-linkedin" />
                                                        </a>
                                                    )}
                                                    {user.facebook && (
                                                        <a
                                                            href={
                                                                !user.facebook.includes("https://")
                                                                    ? "https://" + user.facebook
                                                                    : user.facebook
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <RiFacebookCircleLine className="social-profile-icon s-facebook" />
                                                        </a>
                                                    )}
                                                    {user.tiktok && (
                                                        <a
                                                            href={
                                                                !user.tiktok.includes("https://")
                                                                    ? "https://" + user.tiktok
                                                                    : user.tiktok
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <SiTiktok className="social-profile-icon s-tiktok" />
                                                        </a>
                                                    )}
                                                    {user.snapchat && (
                                                        <a
                                                            href={
                                                                !user.snapchat.includes("https://")
                                                                    ? "https://" + user.snapchat
                                                                    : user.snapchat
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <RiSnapchatLine className="social-profile-icon s-snapchat" />
                                                        </a>
                                                    )}
                                                    {user.reddit && (
                                                        <a
                                                            href={
                                                                !user.reddit.includes("https://")
                                                                    ? "https://" + user.reddit
                                                                    : user.reddit
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <AiOutlineReddit className="social-profile-icon s-reddit" />
                                                        </a>
                                                    )}
                                                    {user.pinterest && (
                                                        <a
                                                            href={
                                                                !user.pinterest.includes("https://")
                                                                    ? "https://" + user.pinterest
                                                                    : user.pinterest
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <RiPinterestLine className="social-profile-icon s-pinterest" />
                                                        </a>
                                                    )}
                                                    {user.medium && (
                                                        <a
                                                            href={
                                                                !user.medium.includes("https://")
                                                                    ? "https://" + user.medium
                                                                    : user.medium
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <AiOutlineMedium className="social-profile-icon s-medium" />
                                                        </a>
                                                    )}
                                                    {user.tumblr && (
                                                        <a
                                                            href={
                                                                !user.tumblr.includes("https://")
                                                                    ? "https://" + user.tumblr
                                                                    : user.tumblr
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <FaTumblr className="social-profile-icon s-tumblr" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="channel-live-events">
                                                <div className="live-header">Live Events</div>
                                                <div className="live-events">
                                                    <div className="live-cards">
                                                        <img src={live} alt="live" />
                                                        <button>Buy</button>
                                                    </div>
                                                    <div className="live-cards">
                                                        <img src={live} alt="live" />
                                                        <button>Buy</button>
                                                    </div>
                                                    <div className="live-cards">
                                                        <img src={live} alt="live" />
                                                        <button>Buy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </Fragment>
                        );
                    })}

                    {userInformation.username !== username ? (
                        <div className="channel-user-content">
                            {/* <div className="channel-tabs shadow-sm" style={{ position: "sticky", top: "4.2rem", alignSelf: "flex-start" }}>
                            <div className="tabs">
                                <span>Requests</span>
                                <span>Subscribers</span>
                                <span>Notification</span>
                                <span onClick={() => { history.push(`/SoapboxHall/${uuidv4()}/${userInformation.username}/${uuidv4()}/${uuidv4()}`) }}>
                                    <div className="channel-btn-icon">
                                        Live Room
                                        <LiveTvRounded />
                                    </div>
                                </span>
                            </div>
                            <FiSearch className="search-channel-content" />
                        </div> */}
                            <div
                                className="channel-tabs shadow-sm"
                                style={{
                                    position: "sticky",
                                    top: "4.2rem",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <div className="tabs">
                                    <span onClick={() => { setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(true); setShowSubscribeButton(false) }} >Timeline</span>
                                    <span>On-demand Photos</span>
                                    <span>On-demand Videos</span>
                                    <span>Marketplace</span>
                                    <span onClick={() => {
                                        setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(!showFeed); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                        socket.emit('room', userInfo[0].username);
                                        socket.emit('new-user-joined', { name: userFullName, profilePic: userProfilePic });
                                    }} >Club Chat</span>

                                </div>

                                <FiSearch className="search-channel-content" />
                            </div>
                            {oneOnOnecall ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>

                                <img src={oneonone} width="400px" />
                                <Form className="login-form mx-auto p-4 pb-0">
                                    <h5 className="text-center mb-1 signup-head">Request 1 on 1 call</h5>
                                    {/* <Form.Label className="text-color-auth">This Message is for</Form.Label> */}
                                    {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Form.Group className="mb-1" controlId="formBasicText" >
                   
                    <Form.Check 
                        type="radio"
                       
                      
                      
                     
                    />
                       <Form.Text className="text-muted">
                        Me
                    </Form.Text>
                   
                   
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicText" >
                   
                   <Form.Check 
                       type="radio"
                      
                     
                     
                    
                   />
                      <Form.Text className="text-muted">
                      Someone else
                   </Form.Text>
                  
                  
               </Form.Group>
</div> */}
                                    {/* <Form.Group className="mb-1" controlId="formBasicText">
                    <Form.Label className="text-color-auth">My email is:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@mail.com"
                      
                       
                     
                    />
                </Form.Group> */}




                                    <button
                                        disabled={oneOnOnecallPrice == 0 ? true : false}
                                        className="d-grid col-12 btn-main login-form-button"
                                        variant="primary"
                                        type="submit"


                                    >
                                        Request Now for {oneOnOnecallPrice} XMG
                                    </button>

                                </Form>
                                {/* <p>Cost: {oneOnOnecallPrice}XMG</p>

                                <div className="btns"> <button>Request</button></div> */}
                            </div> : null}

                            {showSubscribeButton ?
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                    <img src={groupcall} width="400px" />
                                    <Form className="login-form mx-auto p-4 pb-0" onSubmit={(e) => e.preventDefault()}>

                                        <h5 className="text-center mb-1 signup-head">
                                            {!subscribe ? `Request Membership` : `Already a Member`}
                                        </h5>

                                        {/* <p>Cost: {groupCallPrice} XMG</p> */}
                                        <button
                                            onClick={() => {
                                                setSubscribe(true);
                                                toast.success(`Subscribed to ${username}`)
                                                setShowSubscribeButton(false);
                                                setShowFeed(true)

                                            }}
                                            className="d-grid col-12 btn-main login-form-button"
                                            variant="primary"
                                            type="submit"


                                        >
                                            {!subscribe ? `Get Membership Now for ${subscribePrice} XMG` : `Already a Member`}
                                        </button>
                                    </Form>     {/* <div className="btns"> <button>Request</button></div> */}
                                </div>
                                : null}
                            {groupCall ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <img src={groupcall} width="400px" />
                                <Form className="login-form mx-auto p-4 pb-0">

                                    <h5 className="text-center mb-1 signup-head">Request Group call</h5>

                                    {/* <p>Cost: {groupCallPrice} XMG</p> */}
                                    <button
                                        disabled={groupCallPrice == 0 ? true : false}
                                        className="d-grid col-12 btn-main login-form-button"
                                        variant="primary"
                                        type="submit"


                                    >
                                        Request Now for {groupCallPrice} XMG
                                    </button>
                                </Form>     {/* <div className="btns"> <button>Request</button></div> */}
                            </div> : null}

                            {requestMessage ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                {/* <h5>Request Personal Message</h5>
                                
                                <img src={personalmessage} width="400px" />
                                <p>Cost: {requestMessagePrice} XMG</p>
                                <input placeholder="Type Message" /> */}
                                {/* <div className="btns"> <button>Request</button></div> */}
                                <img src={personalmessage} width="400px" />
                                <Form className="login-form mx-auto p-4 pb-0">
                                    <h5 className="text-center mb-1 signup-head">Request Personal Message</h5>

                                    {/* <p>Cost: {groupCallPrice} XMG</p> */}
                                    <button
                                        disabled={requestMessagePrice == 0 ? true : false}
                                        className="d-grid col-12 btn-main login-form-button"
                                        variant="primary"
                                        type="submit"


                                    >
                                        Request Now for {requestMessagePrice} XMG
                                    </button></Form>
                            </div> : null}

                            {verifiedAutograph ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                {/* <h5>Verified Autograph</h5>
                                <p>Cost: {verifiedAutographPrice} XMG</p>

                                <div className="btns"> <button>Request</button></div> */}
                                <img src={groupcall} width="400px" />
                                <Form className="login-form mx-auto p-4 pb-0">

                                    <h5 className="text-center mb-1 signup-head">Request Verified Autograph</h5>

                                    {/* <p>Cost: {groupCallPrice} XMG</p> */}
                                    <button
                                        disabled={verifiedAutographPrice == 0 ? true : false}
                                        className="d-grid col-12 btn-main login-form-button"
                                        variant="primary"
                                        type="submit"


                                    >
                                        Request Now for {verifiedAutographPrice} XMG
                                    </button></Form>
                            </div> : null}



                            {(showFeed && subscribe) ?
                                <div className="channel-media" id="feed">
                                    {uploads && (
                                        <InfiniteScroll
                                            dataLength={uploads.length}
                                            next={fetchMoreHoots}
                                            hasMore={hasMore}
                                            loader={<InfiniteScrollLoader />}
                                        >
                                            {uploads.map((upload) => {
                                                return (
                                                    <div key={upload}>
                                                        <Post
                                                            hootId={upload.id}
                                                            username={upload.authorUsername}
                                                            mimeType={upload.mimeType}
                                                            hootImgId={upload.image}
                                                            likes={upload.likes}
                                                            views={upload.views}
                                                            followers={upload.followers}
                                                            caption={upload.caption}
                                                            link={upload.link}
                                                            ephemeral={upload.ephemeral}
                                                            privateHoot={upload.private}
                                                            expiryDate={upload.expiryDate}
                                                            timeStamp={upload.timeStamp}
                                                            edited={upload.edited}
                                                            editedTimeStamp={upload.editedTimeStamp}
                                                        // privateProtected={privateProtected}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </InfiniteScroll>
                                    )}





                                </div> : null}

                            {subscribe ? null : (
                                <div className="subscribe-to-see-more">
                                    <button>Be a Member to get access</button>
                                </div>
                            )}

                            {showChatRoom ? <div >
                                <div className="container">
                                    {emojiPicker && (
                                        <ClickAwayListener onClickAway={() => { setEmojiPicker(false) }}>
                                            <div>
                                                <Picker
                                                    native
                                                    onEmojiClick={(event, emojiObject) => {

                                                        append(`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                                        // socket.emit('send',message);
                                                        socket.emit('send', {
                                                            name: userFullName,
                                                            message: emojiObject.emoji,
                                                            profilePic: userProfilePic,
                                                            isEmoji: true
                                                        });

                                                    }}
                                                    pickerStyle={{ position: "absolute", bottom: "0px", left: "0.2rem", zIndex: "1111", width: '50v' }}
                                                />
                                            </div>
                                        </ClickAwayListener>
                                    )}
                                </div>

                                <div className="send">
                                    <form action="#" id="send-container" onSubmit={(e) => messagesubmit(e)}>
                                        <FiVideo className="icon-text" /> <FiImage className="icon-text" />   <FiFolder className="icon-text" />
                                        <FiSmile className="icon-text"
                                            onClick={() => { setEmojiPicker(!emojiPicker) }}
                                        />
                                        <input type="text" name="messageInp" value={messageInboxValue} id="messageInp" onChange={(e) => { setMessageInboxValue(e.target.value) }} />
                                        <div className="btns"> <button type="submit"><FiSend /></button></div>

                                    </form>
                                </div>
                            </div> : null}
                        </div>
                    ) : null}





                    {userInformation.username == username ? (
                        <div className="channel-user-content">
                            <div
                                className="channel-tabs shadow-sm"
                                style={{
                                    position: "sticky",
                                    top: "4.2rem",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <div className="tabs">
                                    <span onClick={() => { setShowRequest(!showRequest); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(false) }} >Requests</span>
                                    <span onClick={() => { setShowRequest(false); setShowSubscribers(!showSubscribers); setShowPricingSetting(false); setShowNotification(false) }} >Memberships</span>
                                    <span onClick={() => { setShowRequest(false); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(!showNotification) }} >Notifications</span>
                                    <span
                                        onClick={() => {
                                            setShowRequest(false);
                                            setShowSubscribers(false);
                                            setShowPricingSetting(!showPricingSetting);
                                            setShowNotification(false)
                                        }} >Price Settings</span>
                                    <span
                                        onClick={() => {
                                            history.push(
                                                `/${uuidv4()}/RecordMessage/${uuidv4()}/${userInfo[0].name
                                                }/${uuidv4()}/${uuidv4()}`
                                            );
                                        }}
                                    >
                                        <div className="channel-btn-icon">
                                            Record Message
                                            <LiveTvRounded />
                                        </div>

                                    </span>
                                    <span onClick={() => {
                                        setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(!showFeed); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                        socket.emit('room', userInfo[0].username);
                                        socket.emit('new-user-joined', { name: userFullName, profilePic: userProfilePic });
                                    }}  >Club Chat</span>
                                </div>

                                <FiSearch className="search-channel-content" />
                            </div>
                            {showRequest ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Requests</h5>
                                <p>No Requests</p>
                            </div> : null}
                            {showPricingSetting ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Set Service Price</h5>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label>1 on 1 call :  </label><input type="number" value={oneOnOnecallPrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setOneOnOneCallPrice(e.target.value) }} />XMG</div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label>Group call :  </label><input type="number" value={groupCallPrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setGroupCallPrice(e.target.value) }} />XMG</div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label>Personal Message :  </label><input type="number" value={requestMessagePrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setRequestMessagePrice(e.target.value) }} />XMG</div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label>verifiedAutographPrice :  </label><input type="number" value={verifiedAutographPrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setVerifiedAutographPrice(e.target.value) }} />XMG</div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label>Membership :  </label><input type="number" value={subscribePrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setSubscribePrice(e.target.value) }} />XMG</div>

                                <div className="btns" >  <button onClick={() => { updatePricing() }}  >Update Changes</button></div>
                            </div> : null}
                            {showSubscribers ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Memberships</h5>
                                {subscribePrice} XMG
                                <p>No Members</p>
                            </div> : null}
                            {showNotification ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Notification</h5>
                                <p>No Notification</p>
                            </div> : null}
                            {showFeed ? <div className="channel-media" id="feed">
                                {uploads && (
                                    <InfiniteScroll
                                        dataLength={uploads.length}
                                        next={fetchMoreHoots}
                                        hasMore={hasMore}
                                        loader={<InfiniteScrollLoader />}
                                    >
                                        {uploads.map((upload, index) => {
                                            return (
                                                <div key={upload}>
                                                    <Post
                                                        hootId={upload.id}
                                                        username={upload.authorUsername}
                                                        mimeType={upload.mimeType}
                                                        hootImgId={upload.image}
                                                        likes={upload.likes}
                                                        views={upload.views}
                                                        followers={upload.followers}
                                                        caption={upload.caption}
                                                        link={upload.link}
                                                        ephemeral={upload.ephemeral}
                                                        privateHoot={upload.private}
                                                        expiryDate={upload.expiryDate}
                                                        timeStamp={upload.timeStamp}
                                                        edited={upload.edited}
                                                        editedTimeStamp={upload.editedTimeStamp}
                                                    // privateProtected={privateProtected}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </InfiniteScroll>
                                )}
                            </div> : null}
                            {showChatRoom ? <div >
                                <div className="container">
                                    {emojiPicker && (
                                        <ClickAwayListener onClickAway={() => { setEmojiPicker(false) }}>
                                            <div>
                                                <Picker
                                                    native
                                                    onEmojiClick={(event, emojiObject) => {
                                                        append(`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                                        // socket.emit('send',message);
                                                        socket.emit('send', {
                                                            name: userFullName,
                                                            message: emojiObject.emoji,
                                                            profilePic: userProfilePic,
                                                            isEmoji: true
                                                        });
                                                    }}
                                                    pickerStyle={{ position: "absolute", bottom: '0px', left: "0.2rem", zIndex: "1111" }}
                                                />
                                            </div>
                                        </ClickAwayListener>
                                    )}
                                </div>

                                <div className="send">
                                    <form action="#" id="send-container" onSubmit={(e) => messagesubmit(e)}>
                                        <FiVideo className="icon-text" /> <FiImage className="icon-text" />   <FiFolder className="icon-text" />
                                        <FiSmile className="icon-text"
                                            onClick={() => { setEmojiPicker(!emojiPicker) }}
                                        />
                                        <input type="text" name="messageInp" value={messageInboxValue} id="messageInp" onChange={(e) => { setMessageInboxValue(e.target.value) }} />
                                        <div className="btns"> <button type="submit"><FiSend /></button></div>

                                    </form>
                                </div>
                            </div> : null}

                        </div>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
};

export default PrivateChannels;