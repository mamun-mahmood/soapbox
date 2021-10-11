import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Post from "../Post";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "../Feed/InfiniteScrollLoader";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import { FaTumblr } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FiTwitter, FiSearch } from "react-icons/fi";
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
import toast from "react-hot-toast";
import { IoRecording } from "react-icons/io5";
import { BiVideoRecording } from "react-icons/bi";
import { Event, LiveTvRounded } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
const PrivateChannels = () => {
    const [uploads, setUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const [subscribe, setSubscribe] = useState(false);
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

    const [verifiedAutograph, setVerifiedAutograph] = useState(false)
    const [showRequest, setShowRequest] = useState(false)
    const [showSubscribers, setShowSubscribers] = useState(false)
    const [showNotification, setShowNotification] = useState(false)


    const [showPricingSetting, setShowPricingSetting] = useState(false)
    const { username } = useParams();
    const BaseURL = process.env.REACT_APP_API_URL;

    const LIMIT = 10;

    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);
    const [loading, setLoading] = useState(true);

    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    var totalViews = 0;
    var totalLikes = 0;
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
    }, []);

    useEffect(() => {
        const getAllUploadData = async () => {
            axios
                .get(`${BaseURL}/upload/user/p/${username}?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setUploads(response.data.results);
                });
        };
        getAllUploadData();
    }, []);

    const fetchMoreHoots = async () => {
        await axios
            .get(`${BaseURL}/upload/user/p/${username}?page=${page}&limit=${LIMIT}`)
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
        setSubscribe(!subscribe);

        toast.success(`Subscribed to ${username}`, {
            style: {
                border: "2px solid #8249A0",
                color: "#8249A0",
            },
            iconTheme: {
                primary: "#8249A0",
                secondary: "#FFFAEE",
            },
        });
    };

    const unSubscribeUser = () => {
        setSubscribe(!subscribe);

        toast.success(`Unsubscribed to ${username}`, {
            style: {
                border: "2px solid #8249A0",
                color: "#8249A0",
            },
            iconTheme: {
                primary: "#8249A0",
                secondary: "#FFFAEE",
            },
        });
    };

    const callRequestUser = () => {
        setCallRequest(!callRequest);

        toast.success(`Requested call to ${username}`, {
            style: {
                border: "2px solid #8249A0",
                color: "#8249A0",
            },
            iconTheme: {
                primary: "#8249A0",
                secondary: "#FFFAEE",
            },
        });
    };

    const cancelCallRequestUser = () => {
        setCallRequest(!callRequest);

        toast.success(`Cancelled call request to ${username}`, {
            style: {
                border: "2px solid #8249A0",
                color: "#8249A0",
            },
            iconTheme: {
                primary: "#8249A0",
                secondary: "#FFFAEE",
            },
        });
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
                <div className="channel-banner">
                    <img src={banner} alt="banner" />
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
                                                <div className="live-header">Virtual Experiences</div>
                                                {userInformation.username == username ? (
                                                    <div className="control btns">
                                                        <button
                                                            onClick={() => {
                                                                history.push(
                                                                    `/${uuidv4()}/SoapboxHall/${uuidv4()}/${userInformation.username
                                                                    }/${uuidv4()}/${uuidv4()}`
                                                                );
                                                            }}
                                                        >
                                                            <div className="channel-btn-icon">
                                                                Go Live
                                                                <BiVideoRecording
                                                                    style={{ fontSize: "1.55rem" }}
                                                                />
                                                            </div>
                                                        </button>
                                                        <button>
                                                            <div className="channel-btn-icon">
                                                                Create Event
                                                                <Event />
                                                            </div>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="control btns">
                                                        {/* <button>
                              {callRequest
                                ? "Virtual Experiences"
                                : "Virtual Experiences"}
                            </button> */}
                                                        <button onClick={() => { setOneOnOneCall(!oneOnOnecall); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false) }}>
                                                            1 on 1 call
                                                        </button>
                                                        <button onClick={() => { setOneOnOneCall(false); setGroupCall(!groupCall); setRequestMessage(false); setVerifiedAutograph(false) }} >
                                                            {callRequest ? "Group call" : "Group call"}
                                                        </button>
                                                        <button onClick={() => { setOneOnOneCall(false); setGroupCall(false); setRequestMessage(!requestMessage); setVerifiedAutograph(false) }} >
                                                            Personal Message
                                                        </button>
                                                        <button onClick={() => { setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(!verifiedAutograph) }} >
                                                            Verified Autograph
                                                        </button>
                                                        <button>
                                                            Marketplace
                                                        </button>
                                                        <button >
                                                            {subscribe ? "Subscribe" : "Subscribe"}
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
                                    <span>Hoots</span>
                                    <span>Photos</span>
                                    <span>Videos</span>
                                </div>

                                <FiSearch className="search-channel-content" />
                            </div>
                            {oneOnOnecall ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Request 1 on 1 call</h5>
                                <p>Cost: {oneOnOnecallPrice}XMG</p>

                                <div className="btns"> <button>Request</button></div>
                            </div> : null}


                            {groupCall ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Request Group call</h5>
                                <p>Cost: {groupCallPrice}XMG</p>

                                <div className="btns"> <button>Request</button></div>
                            </div> : null}

                            {requestMessage ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Request Video Message</h5>
                                <p>Cost: {requestMessagePrice}XMG</p>
                                <input placeholder="Type Message" />
                                <div className="btns"> <button>Request</button></div>
                            </div> : null}

                            {verifiedAutograph ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Verified Autograph</h5>
                                <p>Cost: {verifiedAutographPrice}XMG</p>

                                <div className="btns"> <button>Request</button></div>
                            </div> : null}

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
                                                    {upload.private === 1 ? (
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
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </InfiniteScroll>
                                )}

                                {subscribe ? null : (
                                    <div className="subscribe-to-see-more">
                                        <button>Subscribe to see more</button>
                                    </div>
                                )}



                            </div>

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
                                    <span onClick={() => { setShowRequest(false); setShowSubscribers(!showSubscribers); setShowPricingSetting(false); setShowNotification(false) }} >Subscribers</span>
                                    <span onClick={() => { setShowRequest(false); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(!showNotification) }} >Notification</span>
                                    <span onClick={() => { setShowRequest(false); setShowSubscribers(false); setShowPricingSetting(!showPricingSetting); setShowNotification(false) }} >Price Settings</span>
                                    <span
                                        onClick={() => {
                                            history.push(
                                                `/${uuidv4()}/SoapboxHall/${uuidv4()}/${userInformation.username
                                                }/${uuidv4()}/${uuidv4()}`
                                            );
                                        }}
                                    >
                                        <div className="channel-btn-icon">
                                            Record Message
                                            <LiveTvRounded />
                                        </div>
                                    </span>
                                </div>

                                {/* <FiSearch className="search-channel-content" /> */}
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

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label>Subscription :  </label><input type="number" value={subscribePrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setSubscribePrice(e.target.value) }} />XMG</div>

                                <div className="btns" >  <button onClick={() => { updatePricing() }}  >Update Changes</button></div>
                            </div> : null}
                            {showSubscribers ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Subscribers</h5>
                                <p>No Subscribers</p>
                            </div> : null}
                            {showNotification ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Notification</h5>
                                <p>No Notification</p>
                            </div> : null}


                        </div>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
};

export default PrivateChannels;
