import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Post from "../Post";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "../Feed/InfiniteScrollLoader";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import { FaTumblr, IoSend, FaWindowClose } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import {FcInvite, FcRules} from 'react-icons/fc';
import { FiTwitter, FiSearch, FiSend, FiFolder, FiImage, FiVideo, FiSmile, FiStopCircle, FiSkipBack, FiPlayCircle, FiPlus } from "react-icons/fi";
import socket, { startSocket } from '../../socketChat';
import {GiHamburgerMenu} from 'react-icons/gi'
import Picker from 'emoji-picker-react';

import Linkify from 'react-linkify';

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
import { Call, Event, LiveTvRounded, VideoCall } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import oneonone from '../../assets/oneonone.png';
import groupcall from '../../assets/groupcall.png';
import personalmessage from '../../assets/personalmessage.png';
import { Form } from "react-bootstrap";
import ClickAwayListener from "react-click-away-listener";
import Autolinker from 'autolinker';
import RandomSuggestedFollows from '../SideBar/RandomSuggestedFollows'
import RandomCommunitySuggestion from "../SideBar/RandomCommunitySuggestion";
import { HiBadgeCheck } from "react-icons/hi";
import ReactTooltip from "react-tooltip";
import VideoChat from "../VideoChat/VideoChat";
import ReactPlayer from "react-player";
import ExploreHoot from "../Explore/ExploreHoot";
import HootOutside from "../HootOutside/HootOutside";
import { Link } from "react-router-dom";
import { SoapboxTooltip } from "../SoapboxTooltip";
import inviteicon from "../../assets/inviteicon.png";
import rules from "../../assets/rules.png";
import videolive from "../../assets/videoLive.png";
import marketplaceicon from "../../assets/marketplace.png";
import messagesicon from "../../assets/messages.png";
import sendIcon from "../../assets/send.png";

import privatehooticon from "../../assets/private-hoot.png";
const PrivateChannels = () => {
    const hallId = uuidv4()
    const [userProfilePic, setUserProfilePic] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('');
    const [chatData,setChatData] = useState([])
    const [uploads, setUploads] = useState([]);
    const [onDemandUploads, setOnDemandUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const [onDemandPage, setOnDemandPage] = useState(2);
    const [subscribe, setSubscribe] = useState(false);
    const [showSubscribeButton, setShowSubscribeButton] = useState(true)
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
    const [showFeed, setShowFeed] = useState(true);
    const [clubFloor, setClubFloor] = useState(true);
    
    const [privateChat, setPrivateChat] = useState(false);
    const [VideoAvailable, setVideoAvailable] = useState(false)
    const [onDemandMedia, setOnDemandMedia] = useState(false);
    const [onDemandHasMore, setOnDemandHasMore] = useState(true);
    const [media, setMedia] = useState("");

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
    const [broadcastStream, setBroadcastStream] = useState(false);

    const [messageInboxValue, setMessageInboxValue] = useState("");
    const [file, setFile] = useState([]);
    const [src, setSrc] = useState(null);
    const [mimeType, setMimeType] = useState("");
    const [currentInvoice, setCurrentInvoice] = useState('')
    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageInp');

    var totalViews = 0;
    var totalLikes = 0;


    var autolinker = new Autolinker({
        urls: {
            schemeMatches: true,
            wwwMatches: true,
            tldMatches: true
        },
        email: true,
        phone: true,
        mention: false,
        hashtag: false,

        stripPrefix: true,
        stripTrailingSlash: true,
        newWindow: true,

        truncate: {
            length: 0,
            location: 'end'
        },

        className: 'link-content'
    });

  

   
    const append = (chatname, message, position, imgSrc, isEmoji, isVideo, isImage) => {
        // if (message) {
if(message){
    let data={chatname, message, position, imgSrc, isEmoji, isVideo, isImage}
    console.log(data,"data",chatData)
    setChatData(data);
  
    alert(message)
}
           
        //     var messageContainer = document.querySelector('.chatarea')
        //     const messageBox = document.createElement('div');
        //     const ProfileBox = document.createElement('div');
        //     const messageElement = document.createElement('div');
        //     const image = document.createElement('img')
        //     const name = document.createElement('p')

        //     messageContainer.append(messageBox);
        //     messageBox.append(ProfileBox);
        //     messageBox.append(messageElement);
        //     ProfileBox.onclick = function () {


        //         //     toast.success(`Requested Private Chat to ${chatname}`
        //         //     // , {
        //         //     //     style: {
        //         //     //         border: "2px solid #A279BA",
        //         //     //         color: "#A279BA",
        //         //     //     },
        //         //     //     iconTheme: {
        //         //     //         primary: "#A279BA",
        //         //     //         secondary: "#FFFAEE",
        //         //     //     },
        //         //     // }
        //         // );
        //         const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
        //         toast.promise(
        //             resolveAfter3Sec,
        //             {
        //                 pending: `Requesting Private Chat to ${chatname}`,
        //                 success: setPrivateChat(true),
        //                 error: 'Request Rejected'
        //             }
        //         )


        //     }

        //     ProfileBox.append(image)
        //     ProfileBox.append(name)

        //     messageBox.classList.add('messageBox');
        //     ProfileBox.classList.add('ProfileBox')

        //     var myLinkedMessage = autolinker.link(message);
        //     if (!isVideo && !isImage) { messageElement.innerHTML += myLinkedMessage; }

        //     name.innerText = chatname;
        //     messageElement.classList.add('message');
        //     if (isEmoji) {
        //         messageElement.classList.add('message-emoji');
        //     }



        //     if (imgSrc) {

        //         image.src = imgSrc;
        //         if (position == "right") {
        //             image.classList.add('chat-profile');
        //         } else {
        //             image.classList.add('chat-profile');
        //         }



        //     }
        //     if (isVideo) {

        //         const video = document.createElement('video')
        //         video.src = message;
        //         messageElement.append(video);
        //         video.style.maxWidth = "100%";
        //         video.style.maxHeight = "auto";
        //         video.style.marginTop = "10px";
        //         video.style.borderRadius = "5px";
        //         video.controls = true
        //         // if (position == "right") {
        //         //     image.classList.add('chat-profile');
        //         // } else {
        //         //     image.classList.add('chat-profile');
        //         // }



        //     }
        //     if (isImage) {

        //         const img = document.createElement('img')
        //         img.src = message;
        //         messageElement.append(img);
        //         img.style.maxWidth = "100%";
        //         img.style.maxHeight = "auto";
        //         img.style.marginTop = "10px";
        //         img.style.borderRadius = "5px";
        //         // if (position == "right") {
        //         //     image.classList.add('chat-profile');
        //         // } else {
        //         //     image.classList.add('chat-profile');
        //         // }



        //     }


        //     // messageContainer.append(messageElement);
        //     messageContainer.scrollTop = messageContainer.scrollHeight;
        // }


    }
    function isEmoji(str) {
        var ranges = [
            '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
        ];
        if (str.match(ranges.join('|'))) {
            return true;
        } else {
            return false;
        }
    }
    const messagesubmit = (e) => {
        e.preventDefault();
        const message = messageInboxValue;
        let emojiValidator = isEmoji(message)
        append(userFullName, `${message}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, emojiValidator)
        // socket.emit('send',message);
        socket.emit('send', {
            name: userFullName,
            message: message,
            profilePic: userProfilePic,
            isEmoji: isEmoji(message)
        });
        setMessageInboxValue('')

    }

    useEffect(() => {
        socket.on('user-joined', name => {

            append(`${name.name} Joined the chat`, '', "", `${BaseURL}/profile-pictures/${name.profilePic}`)
        })

        socket.on('receive', data => {
            console.log("data")
            if (data.isEmoji) {
                append(data.name, `${data.message}`, 'left', `${BaseURL}/profile-pictures/${data.profilePic}`, data.isEmoji)

            } else {
                append(data.name, `${data.message}`, 'left', `${BaseURL}/profile-pictures/${data.profilePic}`, data.isEmoji, data.isVideo, data.isImage)
            }
        })

        socket.on('left', name => {
            append(name, `${name} left the chat`)
        })
    }, [])

    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`).then((response) => {
                setUserInfo(response.data);
                console.log("dky");
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
                            console.log("res.data")
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
            setUserFullName(res.data[0].name);
            setUserId(res.data[0].id);
            setUserEmail(res.data[0].email)
        })
            .catch(err => { console.log(err) })
    }, []);

    useEffect(() => {
        let invoice = uuidv4()
        setCurrentInvoice(invoice);

    }, [])
    useEffect(() => {
        const getAllUploadData = async () => {
            axios
                .get(`${BaseURL}/upload/user/private/p/${username}?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setUploads(response.data.results);
                 setTimeout(() => {
                    document.getElementById('chatRoomopen').click()
                 }, 1000);

                });
        };
        getAllUploadData();
        
    }, []);

    const getAllOnDemandMedia = async (media) => {
        setMedia(media);
        axios.get(`${BaseURL}/upload/user/private/onDemandMedia/p/${username}?page=1&limit=${LIMIT}&media=${media}`)
            .then((response) => {
                setOnDemandUploads(response.data.results);
            });
    };

    // useEffect(() => {
    // }, []);
        

    const checkMembership = () => {
        axios.post(`${BaseURL}/user/getMember`, {
            member: userInformation.username
        }).then((res) => {


            setShowSubscribeButton(false);
            setShowFeed(true);
            setSubscribe(true);
        })
    }

    useEffect(() => {
        checkMembership()

    }, [])


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

    const fetchMoreOnDemandHoots = async () => {
        await axios
            .get(`${BaseURL}/upload/user/private/onDemandMedia/p/${username}?page=${onDemandPage}&limit=${LIMIT}&media=${media}`)
            .then((response) => {
                const hootsFromServer = response.data.results;

                setOnDemandUploads([...onDemandUploads, ...hootsFromServer]);

                if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
                    setOnDemandHasMore(false);
                }
            });

        setOnDemandPage(onDemandPage + 1);
    };

    const privateProtected = {
        userSelect: "none",
    };

    const subscribeUser = () => {

        if(showSubscribeButton){
            document.getElementById('slideSSB').style.transition='2sec';
            document.getElementById('slideSSB').style.right='-100vw';
                                                                     
           setTimeout(() => {
            setShowSubscribeButton(false)
             
           }, 1000)
        }else{
            setShowSubscribeButton(!showSubscribeButton)
        setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false)
      
            setTimeout(() => {
           
        if(document.getElementById('slideSSB')){

            document.getElementById('slideSSB').style.transition='1sec';
            document.getElementById('slideSSB').style.right='250px';
        }
      
    }, 1)   
        }

    };

    const unSubscribeUser = () => {

        if(showSubscribeButton){
            document.getElementById('slideSSB').style.transition='2sec';
            document.getElementById('slideSSB').style.right='-100vw';
                                                                     
           setTimeout(() => {
            setShowSubscribeButton(false)
             
           }, 1000)
        }else{
            setShowSubscribeButton(!showSubscribeButton)
        setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false)
      
            setTimeout(() => {
           
        if(document.getElementById('slideSSB')){

            document.getElementById('slideSSB').style.transition='1sec';
            document.getElementById('slideSSB').style.right='250px';
        }
      
    }, 1)   
        }

    };

    const callRequestUser = () => {
        setCallRequest(!callRequest);

        toast.success(`Requested call to ${username}`
            // , {
            //     style: {
            //         border: "2px solid #A279BA",
            //         color: "#A279BA",
            //     },
            //     iconTheme: {
            //         primary: "#A279BA",
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
            //         border: "2px solid #A279BA",
            //         color: "#A279BA",
            //     },
            //     iconTheme: {
            //         primary: "#A279BA",
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

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);
        (file && setMimeType(file.type));
        setSrc(URL.createObjectURL(file));
        // setMessageInboxValue(file.name);



    }

    const addMembershipInDb = () => {
        if (!subscribe) {

            axios.post(`${BaseURL}/user/membership`, {
                owner: username,
                member: userInformation.username,
                price: subscribePrice

            }).then((res) => {

                toast.success(`${username} Membership Activated`)
                setShowSubscribeButton(false);
                setShowFeed(true)
                setSubscribe(true);
            })
                .catch(err => console.log(err))
        }

    }

    const verifyOrder = () => {

        axios.post('https://messangerapi533cdgf6c556.amaprods.com/api/users/showPurchasedOrder', {
            email: userEmail
        })
            .then((res) => {
                res.data.message.forEach((e) => {
                    axios.get(`https://megahoot.org/api/req.php?type=check_merchant_transaction_status&merch_key=SB7MQws35cr7x4tDnAdyKyx0grdOx3yEWi736OKuExjPXVrPF9TKYTvOLxJJl6UyrMz4yFSBahDVF1l3eKgZHf4W1k4TM34hAak1GDnM6RgcN6VqaTJreY8vL8NV7ewvEAf14Voigb3U&inv=${e.invoice_id}`)
                        .then((res) => {
                            console.log(res.data.status, typeof (res.data.status), "sky xmg")
                            if (res.data.status == "1") {
                                addMembershipInDb()
                            }
                        })
                        .catch(err => console.log(err))
                })
            })
            .catch((err) => {
                toast.success(`No Record Found or something went wrong`)
            })
    }

    const dataUploaderForOrder = () => {
        // handleSubmit();
        // props.history.push("/signin?redirec=shipping");
        // generateInvoice()
        if (!subscribe) {


            axios.post(`https://messangerapi533cdgf6c556.amaprods.com/api/users/storePurchasedOrder/`, {
                product: username,
                invoice_id: currentInvoice,
                user_id: userId,
                product_id: currentInvoice,
                email: userEmail

            })
                .then((res) => { console.log('success'); document.getElementById('redirectToPayment').click() })
                .catch((err) => { console.log(err); alert(err) })


        } else {
            console.log('Please Add Some Items In Cart To Checkout')
        }

    };


    const upload = (file, mimeType) => {

        // setSaveLoading(true);

        const formData = new FormData();
        // formData.append("timeStamp", timeStamp)
        // formData.append("caption", caption)
        // // formData.append("link", JSON.stringify(formValues))
        // formData.append("link", link)
        // formData.append("ephemeral", ephemeralCheck ? 1 : 0)
        // formData.append("private", privateCheck ? 1 : 0)
        // formData.append("expiryDate", ephemeralCheck ? expiryDate : 0)
        // formData.append("authorEmail", email)
        formData.append("file", file);

        const uploadData = async () => {
            await axios.all([
                axios.post(`${BaseURL}/upload/uploadMedia`, formData),
            ]).then(axios.spread((res1, res2) => {
                if (res1) {

                    if (mimeType.substr(0, 5) == ('video' || 'audio')) {
                        append(userFullName, `${BaseURL}/storageChat/${res1.data}`, "left", `${BaseURL}/profile-pictures/${userProfilePic}`, false, true, false)
                        socket.emit('send', {
                            name: userFullName,
                            message: `${BaseURL}/storageChat/${res1.data}`,
                            profilePic: userProfilePic,
                            isEmoji: false,
                            isVideo: true,
                            isImage: false
                        });
                    } else {
                        append(userFullName, `${BaseURL}/storageChat/${res1.data}`, "left", `${BaseURL}/profile-pictures/${userProfilePic}`, false, false, true)
                        socket.emit('send', {
                            name: userFullName,
                            message: `${BaseURL}/storageChat/${res1.data}`,
                            profilePic: userProfilePic,
                            isEmoji: false,
                            isVideo: false,
                            isImage: true
                        });
                    }


                }
            }))
        }

        uploadData();
        // toast.promise(uploadDataToast, {
        //     pending: 'Sending Hoot...',
        //     success: 'Hoot Successful',
        //     error: 'Please try again',
        // });
    }
    return (
        <Fragment>
            <div className="private-channels" style={{ userSelect: "none" }}>
                <div className="channel-banner" >
                    {/* <img src={banner} alt="banner" /> */}
                </div>
                <div className="channel-content"  >
                    {userInfo.map((user) => {
                        return (
                            <Fragment key={user.id}>
                                <div className="channel-user-info"  >
                                    <ul
                                        style={{
                                            position: "sticky",
                                            maxHeight: '90vh',
                                            overflowY: 'scroll',
                                            alignSelf: "flex-start",

                                        }}
                                    >
                                        <div className="channel-banner" style={{ position: 'relative' }} >
                                            <div style={{ position: 'absolute', bottom: '75px', left: '75px', zIndex: 5 }} className="clubOwner">Club Owner</div>
                                            <div style={{ position: 'absolute', bottom: '59px', left: '130px', zIndex: 5 }} className="arrow-down"></div>

                                            <img src={banner} alt="banner" /></div>

                                        <div className="profile-pic">

                                            <img
                                                src={`${BaseURL}/profile-pictures/${user.profilePic}`}
                                                alt="profile"
                                            />
                                        </div>
                                        <div>
                                            <div className="user-information">

                                                <div className="name verificationBadgeContainer" style={{fontSize:'14px'}}>{user.name}
                                                    {user.verified === 1
                                                        ?
                                                        <div className="profile-verification-badge">
                                                            <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                                <div className="username" style={{fontSize:'14px'}}>@{user.username}</div>
                                                <div className="followers">
                                                    <b style={{fontSize:'14px'}} >
                                                        {formatCount(likes) +
                                                            formatSi(likes)}
                                                    </b>
                                                    <span style={{fontSize:'14px'}} > Likes    </span>
                                                    <b style={{fontSize:'14px'}}>
                                                        {formatCount(views) +
                                                            formatSi(views)}
                                                    </b>
                                                    <span style={{fontSize:'14px'}}> Views</span>
                                                </div>


                                                {/* {user.bio && (
                                                    <div
                                                        className="user-desc"
                                                        style={{ textAlign: "center" }}
                                                    >
                                                        {user.bio}
                                                    </div>
                                                )} */}

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
                                                <div>
                                                    {userInformation.username !== username ? <div className="live-header" style={{ backgroundColor: '#8249A0', color: 'white', borderRadius: '3px' }} >Request a Virtual Experience</div> : null}
                                                    {userInformation.username == username ? (
                                                        <div>
 <div className="live-header" style={{ backgroundColor: '#8249A0', color: 'white', borderRadius: '3px' }}>Membership</div>
                                                            <div className="control">
                                                            <button  style={{ minWidth: '208px' }} onClick={() => { 
                                                                
                                                               
                                                                if(showSubscribers){
                                                                    document.getElementById('slideM').style.transition='2sec';
                                                                    document.getElementById('slideM').style.right='-100vw';
                                                                                                                             
                                                                   setTimeout(() => {
                                                                      setShowSubscribers(false)
                                                                     
                                                                   }, 1000)
                                                                }else{
                                                                    setOnDemandMedia(false),setShowRequest(false); setShowFeed(false); setShowSubscribers(!showSubscribers); setShowPricingSetting(false); setShowNotification(false); setShowChatRoom(true) 
                                                            
                                                                setTimeout(() => {
                                                                   
                                                                if(document.getElementById('slideM')){

                                                                    document.getElementById('slideM').style.transition='1sec';
                                                                    document.getElementById('slideM').style.right='250px';
                                                                }
                                                              
                                                            }, 1)   
                                                                }
                        
                                                            
                                                            }}  >Membership</button>
                                                               
                                                                <button  style={{ minWidth: '208px' }} onClick={() => { 
                                                                    
                                                                    if(showRequest){
                                                                        document.getElementById('slideR').style.transition='2sec';
                                                                        document.getElementById('slideR').style.right='-100vw';
                                                                                                                                 
                                                                       setTimeout(() => {
                                                                          setShowRequest(false)
                                                                         
                                                                       }, 1000)
                                                                    }else{
                                                                        setOnDemandMedia(false),setShowRequest(true); setShowFeed(false); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(false); setShowChatRoom(true) 
                                                                
                                                                    setTimeout(() => {
                                                                       
                                                                    if(document.getElementById('slideR')){
    
                                                                        document.getElementById('slideR').style.transition='1sec';
                                                                        document.getElementById('slideR').style.right='250px';
                                                                    }
                                                                  
                                                                }, 1)   
                                                                    }}}
                                                                    
                                                                    >Requests</button>
                                                                </div>

                                                            <div className="live-header" style={{ backgroundColor: '#8249A0', color: 'white', borderRadius: '3px' }} >Club Toolbox</div>
                                                            <div className="control">
                                                                <button style={{ minWidth: '208px' }} >Schedule a Virtual Experience</button>
                                                                <button style={{ minWidth: '208px' }} >Schedule Pay Per View</button>

                                                                <button style={{ minWidth: '208px' }}
                                                                onClick={() => {
                                                                    const Id = uuidv4()
                                                                    history.push({
                                                                        pathname: `/${uuidv4()}/AudioHall/${uuidv4()}`,
                                                                        state: {
                                                                            host: true,
                                                                            userName: userInformation.username,
                                                                            hallId: Id,
                                                                            hostUserName: username,
                                                                            profilePic:`${BaseURL}/profile-pictures/${userProfilePic}`
                                                                        }


                                                                    });
                                                                }}
                                                                >Make a Vero Audio Call</button>
                                                                <button style={{ minWidth: '208px' }} onClick={() => {
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
                                                                }} >Make a Vero Video Call</button>

                                                                {/* <button style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        setShowRequest(false);
                                                                        setShowSubscribers(false);
                                                                        setShowPricingSetting(!showPricingSetting);
                                                                        setShowNotification(false);
                                                                        setShowFeed(false);
                                                                        setShowChatRoom(false);
                                                                        setOnDemandMedia(false);

                                                                        setTimeout(() => {
                                                                            if(document.getElementById('slide')){

                                                                                document.getElementById('slide').style.transition='1sec';
                                                                                document.getElementById('slide').style.right='250px';
                                                                            }
                                                                          
                                                                        }, 1)
                                                                    }}
                                                                >Price Settings</button> */}
 <button style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        setShowRequest(false);
                                                                        setShowSubscribers(false);
                                                                        setShowPricingSetting(!showPricingSetting);
                                                                        setShowNotification(false);
                                                                        setShowFeed(false);
                                                                        setShowChatRoom(true);
                                                                        setOnDemandMedia(false);

                                                                        setTimeout(() => {
                                                                            if(document.getElementById('slide')){

                                                                                document.getElementById('slide').style.transition='1sec';
                                                                                document.getElementById('slide').style.right='250px';
                                                                            }
                                                                          
                                                                        }, 1)
                                                                    }}
                                                                >Price Settings</button>
                                                                <button style={{ minWidth: '208px' }} >Podcasts</button>

                                                                <button
                                                                    style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        setShowRequest(false);
                                                                        setShowSubscribers(false);
                                                                        setShowPricingSetting(false);
                                                                        setShowNotification(false);
                                                                        setShowFeed(false);
                                                                        setShowChatRoom(false);
                                                                     setClubFloor(false)
                                                                        !onDemandMedia && setOnDemandMedia(!onDemandMedia);
                                                                        getAllOnDemandMedia("audio");
                                                                    }}
                                                                >Ondemand Audio</button>

                                                                <button
                                                                    style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        setShowRequest(false);
                                                                        setShowSubscribers(false);
                                                                        setShowPricingSetting(false);
                                                                        setShowNotification(false);
                                                                        setShowFeed(false);
                                                                        setShowChatRoom(false);
                                                                        setClubFloor(false)
                                                                        !onDemandMedia && setOnDemandMedia(!onDemandMedia);
                                                                        getAllOnDemandMedia("video");
                                                                    }}
                                                                >Ondemand Video</button>

                                                                <button
                                                                    style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        setShowRequest(false);
                                                                        setShowSubscribers(false);
                                                                        setShowPricingSetting(false);
                                                                        setShowNotification(false);
                                                                        setShowFeed(false);
                                                                        setShowChatRoom(false);
                                                                        setClubFloor(false)
                                                                        !onDemandMedia && setOnDemandMedia(!onDemandMedia);
                                                                        getAllOnDemandMedia("image");
                                                                    }}
                                                                >Ondemand Photos</button>
                                                            </div>

                                                            <br></br>
                                                           
                                                            <div className="live-header" style={{ backgroundColor: '#8249A0', color: 'white', borderRadius: '3px' }}>Create Pay Per View Event</div>
                                                            <div className="control">

                                                                <button style={{ minWidth: '208px' }}>Broadcast Vero Live PPV</button>
                                                                <button style={{ minWidth: '208px' }} >Broadcast Vero Pre-recorded PPV</button>

                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="control">
                                                                {/* <button>
                              {callRequest
                                ? "Virtual Experiences"
                                : "Virtual Experiences"}
                            </button> */}
                                                                <button onClick={() => { 
                                                                    
                                                                    if(oneOnOnecall){
                                                                        document.getElementById('slideOOC').style.transition='2sec';
                                                                        document.getElementById('slideOOC').style.right='-100vw';
                                                                                                                                 
                                                                       setTimeout(() => {
                                                                          setOneOnOneCall(false)
                                                                         
                                                                       }, 1000)
                                                                    }else{
                                                                        setOneOnOneCall(!oneOnOnecall); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setShowFeed(false); setShowSubscribeButton(false)
                                                                    setTimeout(() => {
                                                                       
                                                                    if(document.getElementById('slideOOC')){
    
                                                                        document.getElementById('slideOOC').style.transition='1sec';
                                                                        document.getElementById('slideOOC').style.right='250px';
                                                                    }
                                                                  
                                                                }, 1)   
                                                                    }
                                                                   }}>
                                                                    1 on 1 call
                                                                </button>
                                                                <button onClick={() => { 
                                                                    
                                                                  
                                                                    if(groupCall){
                                                                        document.getElementById('slidegC').style.transition='2sec';
                                                                        document.getElementById('slidegC').style.right='-100vw';
                                                                                                                                 
                                                                       setTimeout(() => {
                                                                          setGroupCall(false)
                                                                         
                                                                       }, 1000)
                                                                    }else{
                                                                        setOneOnOneCall(false); setGroupCall(!groupCall); 
                                                                        setRequestMessage(false); setVerifiedAutograph(false); 
                                                                        setShowFeed(false); setShowSubscribeButton(false)
                                                                     
                                                                        setTimeout(() => {
                                                                       
                                                                    if(document.getElementById('slidegC')){
    
                                                                        document.getElementById('slidegC').style.transition='1sec';
                                                                        document.getElementById('slidegC').style.right='250px';
                                                                    }
                                                                  
                                                                }, 1)   
                                                                    }
                                                                     }} >
                                                                    {callRequest ? "Group call" : "Group call"}
                                                                </button>
                                                                <button onClick={() => {
                                                                    
                                                                    
                                                                     if(requestMessage){
                                                                        document.getElementById('slideRM').style.transition='2sec';
                                                                        document.getElementById('slideRM').style.right='-100vw';
                                                                                                                                 
                                                                       setTimeout(() => {
                                                                        setRequestMessage(false)
                                                                         
                                                                       }, 1000)
                                                                    }else{
                                                                        setOneOnOneCall(false); setGroupCall(false); 
                                                                        setRequestMessage(!requestMessage); setVerifiedAutograph(false); 
                                                                        setShowFeed(false); setShowSubscribeButton(false);
                                                                     
                                                                     
                                                                        setTimeout(() => {
                                                                       
                                                                    if(document.getElementById('slideRM')){
    
                                                                        document.getElementById('slideRM').style.transition='1sec';
                                                                        document.getElementById('slideRM').style.right='250px';
                                                                    }
                                                                  
                                                                }, 1)   
                                                                    }

                                                                    
                                                                    }} >
                                                                    
                                                                    Message
                                                                </button>
                                                                <button onClick={() => { 
                                                                   
                                                                    if(verifiedAutograph){
                                                                        document.getElementById('slideVA').style.transition='2sec';
                                                                        document.getElementById('slideVA').style.right='-100vw';
                                                                                                                                 
                                                                       setTimeout(() => {
                                                                        setVerifiedAutograph(false)
                                                                         
                                                                       }, 1000)
                                                                    }else{
                                                                        setOneOnOneCall(false); 
                                                                    setGroupCall(false); 
                                                                    setRequestMessage(false); 
                                                                    setVerifiedAutograph(!verifiedAutograph); 
                                                                    setShowFeed(false); 
                                                                    setShowSubscribeButton(false)
                                                                     
                                                                        setTimeout(() => {
                                                                       
                                                                    if(document.getElementById('slideVA')){
    
                                                                        document.getElementById('slideVA').style.transition='1sec';
                                                                        document.getElementById('slideVA').style.right='250px';
                                                                    }
                                                                  
                                                                }, 1)   
                                                                    }


                                                                    }} >
                                                                    Autograph
                                                                </button>
                                                                <button>
                                                                    Marketplace
                                                                </button>

                                                                <button onClick={() => { 
                                                                    subscribe ? unSubscribeUser() : subscribeUser()
                                                                    
                                                                    
                                                                    }} >

                                                                    {subscribe ? "Membership" : "Get Membership"}
                                                                </button>
                                                            </div>
                                                            <div className="live-header" style={{ backgroundColor: '#8249A0', color: 'white', borderRadius: '3px' }} >On-demand Media</div>
                                                            <div className="control">
                                                                {/* <button style={{ minWidth: '208px' }} >Schedule a Virtual Experience</button>
                                                            <button style={{ minWidth: '208px' }} >Schedule Pay Per View</button>
                                                               
                                                                <button style={{ minWidth: '208px' }} >Make a Vero Audio Call</button>
                                                                <button style={{ minWidth: '208px' }} >Make a Vero Video Call</button>
                                                               
                                                                <button style={{ minWidth: '208px' }} 
                                                                  onClick={() => {
                                                                    setShowRequest(false);
                                                                    setShowSubscribers(false);
                                                                    setShowPricingSetting(!showPricingSetting);
                                                                    setShowNotification(false);
                                                                    setShowFeed(false);
                                                                    setShowChatRoom(false);
                                                                }}
                                                                >Price Settings</button> */}
                                                                {/* <button style={{ minWidth: '208px' }} >Podcasts</button> */}
                                                                {/* <button style={{ minWidth: '208px' }} >Audio</button>
                                                                <button style={{ minWidth: '208px' }} >Video</button>
                                                                <button style={{ minWidth: '208px' }} >Photos</button> */}

                                                                <button
                                                                    style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        if (subscribe) {
                                                                            setShowRequest(false);
                                                                            setShowSubscribers(false);
                                                                            setShowPricingSetting(false);
                                                                            setShowNotification(false);
                                                                            setShowFeed(false);
                                                                            setShowChatRoom(false);
                                                                            setClubFloor(false)
                                                                            !onDemandMedia && setOnDemandMedia(!onDemandMedia);
                                                                            getAllOnDemandMedia("audio");
                                                                        }
                                                                    }}
                                                                >Ondemand Audio</button>

                                                                <button
                                                                    style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        if (subscribe) {
                                                                            setShowRequest(false);
                                                                            setShowSubscribers(false);
                                                                            setShowPricingSetting(false);
                                                                            setShowNotification(false);
                                                                            setShowFeed(false);
                                                                            setShowChatRoom(false);
                                                                            setClubFloor(false)
                                                                            !onDemandMedia && setOnDemandMedia(!onDemandMedia);
                                                                            getAllOnDemandMedia("video");
                                                                        }

                                                                    }}
                                                                >Ondemand Video</button>

                                                                <button
                                                                    style={{ minWidth: '208px' }}
                                                                    onClick={() => {
                                                                        if (subscribe) {
                                                                            setShowRequest(false);
                                                                            setShowSubscribers(false);
                                                                            setShowPricingSetting(false);
                                                                            setShowNotification(false);
                                                                            setShowFeed(false);
                                                                            setShowChatRoom(false);
                                                                            setClubFloor(false)
                                                                            !onDemandMedia && setOnDemandMedia(!onDemandMedia);
                                                                            getAllOnDemandMedia("image");
                                                                        }

                                                                    }}
                                                                >Ondemand Photos</button>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>


                                            </div>

                                            <div className="channel-live-events">
                                                <div className="live-header" style={{ backgroundColor: '#8249A0', color: 'white', borderRadius: '3px' }} >Live Events</div>
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
                                <div className="tabs" style={{ margin: "0 0.5rem" }}>
                                    <span onClick={() => {
                                        setOneOnOneCall(false);
                                        setGroupCall(false);
                                        setRequestMessage(false);
                                        setVerifiedAutograph(false);
                                        setClubFloor(true);
                                        setShowSubscribeButton(false);
                                        setShowChatRoom(true)
                                        setOnDemandMedia(false);

                                    }}
                                    style={{fontSize:'14px'}}  >
                                        CLUB FLOOR
                                    </span>

                                    {/* <span>Audio</span>
                                    <span>Video</span>
                                    <span>Podcasts</span> */}

                                    {/* <span>Marketplace</span> */}
                                    <span  style={{fontSize:'14px'}}>CLUB AMENITIES</span>
                                    <span  style={{fontSize:'14px'}}>EVENTS</span>
                                 
                                    <span 
                                       
                                       >
                                            <SoapboxTooltip title={"MARKETPLACE"} placement="left"> 
                                            <img src={marketplaceicon} width="25px" />
                                           </SoapboxTooltip>
                                           </span>
                                 
                                    <span 
                                       
                                       >
                                            <SoapboxTooltip title={"MESSAGES"} placement="left"> 
                                            <img src={messagesicon} width="25px" />
                                           </SoapboxTooltip>
                                           </span>
                                    <span 
                                       
                                       >
                                            <SoapboxTooltip title={"Club Rules"} placement="left"> 
                                            <img src={rules} width="25px" />
                                           </SoapboxTooltip>
                                           </span>
                                   
                                    {/* <button  style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}}>INVITE</button> */}
                                    {/* <button  style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}}>CLUB RULES</button> */}
                                    <span id="chatRoomopen" onClick={() => {
                                        setOneOnOneCall(false); setGroupCall(false); 
                                        setRequestMessage(false); setVerifiedAutograph(false);
                                         setShowFeed(true); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                        setOnDemandMedia(false)
                                        socket.emit('room', userInfo[0].username);
                                        socket.emit('new-user-joined', { name: userFullName, profilePic: userProfilePic });
                                    }} style={{display:'none'}} >CLUB CHAT</span>
                                   

                                </div>

                                <FiSearch className="search-channel-content" />
                            </div>
                            {oneOnOnecall ?
                            <div className="slide-container">
                            <div id="slideOOC" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                           
<FaWindowClose style={{cursor:'pointer',position:'relative',left:'200px',color:'red',top:'-5px'}} onClick={()=>{
document.getElementById('slideOOC').style.transition='2sec';
document.getElementById('slideOOC').style.right='-100vw';
                          
setTimeout(() => {
setShowSubscribeButton(false)

}, 1000)
}} />
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
                            </div></div>: null}

                            {showSubscribeButton ?
                                <div className="slide-container">
                                   
                                <div id="slideSSB" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <FaWindowClose style={{cursor:'pointer',position:'relative',left:'200px',color:'red',top:'-5px'}} onClick={()=>{
document.getElementById('slideSSB').style.transition='2sec';
document.getElementById('slideSSB').style.right='-100vw';
                          
setTimeout(() => {
setShowSubscribeButton(false)

}, 1000)
}} />
                                    <img src={groupcall} width="400px" />
                                    <Form className="login-form mx-auto p-4 pb-0" onSubmit={(e) => e.preventDefault()}>

                                        <h5 className="text-center mb-1 signup-head">
                                            {!subscribe ? `Request Membership` : `Already a Member`}
                                        </h5>

                                        {/* <p>Cost: {groupCallPrice} XMG</p> */}
                                        <form method="POST" action="https://megahoot.org/mh_api_checkout.php">
                                            <input type="hidden" name="mid" value="SB7MQws35cr7x4tDnAdyKyx0grdOx3yEWi736OKuExjPXVrPF9TKYTvOLxJJl6UyrMz4yFSBahDVF1l3eKgZHf4W1k4TM34hAak1GDnM6RgcN6VqaTJreY8vL8NV7ewvEAf14Voigb3U" />
                                            <input type="hidden" name="inv" value={currentInvoice} />
                                            <input type="hidden" name="subtotal" value={subscribePrice} />
                                            <input type="hidden" name="curr" value="XMG" />

                                            <input type="hidden" name="tp[]" value="1" />
                                            <input type="hidden" name="name[]" value={userInformation.username} />
                                            <input type="hidden" name="amount[]" value={subscribePrice} />
                                            <input type="hidden" name="q[]" value="1" />


                                            <input
                                                type="submit"

                                                id="redirectToPayment"
                                                value="Proceed to checkout"
                                                className="primary block"
                                                style={{
                                                    display: 'none',
                                                    padding: "5px",
                                                    backgroundColor: "rgb(241, 195, 89)",
                                                    borderRadius: "5px",
                                                    color: "black",
                                                }}
                                            />
                                        </form>
                                        <button
                                            onClick={() => {
                                                dataUploaderForOrder()




                                            }}
                                            className="d-grid col-12 btn-main login-form-button"
                                            variant="primary"
                                            type="submit"


                                        >
                                            {!subscribe ? `Get Membership Now for ${subscribePrice} XMG` : `Already a Member`}
                                        </button>
                                        <br></br>
                                        <button
                                            onClick={() => {
                                                verifyOrder()




                                            }}
                                            className="d-grid col-12 btn-main login-form-button"
                                            variant="primary"
                                            type="submit"


                                        >
                                            {!subscribe ? `Activate Services If Paid Already` : `Already a Member`}
                                        </button>


                                    </Form>     {/* <div className="btns"> <button>Request</button></div> */}
                                </div></div>
                                : null}
                            {groupCall ? 
                            <div className="slide-container">
                            <div id="slidegC" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                         
                            <FaWindowClose style={{cursor:'pointer',position:'relative',left:'200px',color:'red',top:'-5px'}} onClick={()=>{
document.getElementById('slidegC').style.transition='2sec';
document.getElementById('slidegC').style.right='-100vw';
                          
setTimeout(() => {
setShowSubscribeButton(false)

}, 1000)
}} />
                             
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
                            </div></div> : null}

                            {requestMessage ?
                             <div className="slide-container">
                            <div id="slideRM" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                {/* <h5>Request Personal Message</h5>
                                
                                <img src={personalmessage} width="400px" />
                                <p>Cost: {requestMessagePrice} XMG</p>
                                <input placeholder="Type Message" /> */}
                                {/* <div className="btns"> <button>Request</button></div> */}

                                
                            <FaWindowClose style={{cursor:'pointer',position:'relative',left:'200px',color:'red',top:'-5px'}} onClick={()=>{
document.getElementById('slideRM').style.transition='2sec';
document.getElementById('slideRM').style.right='-100vw';
                          
setTimeout(() => {
setShowSubscribeButton(false)

}, 1000)
}} />
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
                            </div></div> : null}

                            {verifiedAutograph ?
                             <div className="slide-container">
                            <div id="slideVA" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                {/* <h5>Verified Autograph</h5>
                                <p>Cost: {verifiedAutographPrice} XMG</p>
                                <div className="btns"> <button>Request</button></div> */}

<FaWindowClose style={{cursor:'pointer',position:'relative',left:'200px',color:'red',top:'-5px'}} onClick={()=>{
document.getElementById('slideVA').style.transition='2sec';
document.getElementById('slideVA').style.right='-100vw';
                          
setTimeout(() => {
setShowSubscribeButton(false)

}, 1000)
}} />
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
                            </div></div> : null}



                            {(subscribe) ?
                                <div>
                                <div className="channel-media" id="feed" style={{display:'flex'}}>
                                      <GiHamburgerMenu className="GiHamburgerMenu" data-tip={clubFloor?"Hide Feeds":"Show Feeds"} onClick={() => {
                                          setClubFloor(!clubFloor)
                                        //   if(document.getElementById('slideFeed')){

                                        //     document.getElementById('slideFeed').style.transition='1sec';
                                        //     document.getElementById('slideFeed').style.left=clubFloor?'-100vw':'30px';
                                        // }
                                         

                                    }} />
                                    {clubFloor?
                                    uploads && (
                                       
                                        <InfiniteScroll
                                            dataLength={uploads.length}
                                            next={fetchMoreHoots}
                                            hasMore={hasMore}
                                        // loader={<InfiniteScrollLoader />}
                                        >
                                            {uploads.map((upload) => {
                                                return (
                                                    <div key={upload}>
                                                        <Post
                                                            hootId={upload.id}
                                                            username={upload.authorUsername}
                                                            mimeType={upload.mimeType}
                                                            hootImgId={upload.image}
                                                            audioPoster={upload.audioPoster}
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
                                      
                                    ):null}
                                    
                            {showChatRoom ?
                                <div style={{ position: 'relative' }} >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        {privateChat ? <div className="privateChat-club">
                                            <div className="live-header" style={{ backgroundColor: '#8149a06c', color: 'white', borderRadius: '3px', maxWidth: '300px' }} >Private Chat<FaWindowClose className="icon-text"
                                                onClick={() => {
                                                    setPrivateChat(false);
                                                }}
                                            /></div>

                                        </div> : null}

                                        <div className="container" style={{ left: clubFloor ? "20px" : "100px", width: clubFloor ? "40%" : "80%",minWidth:clubFloor ? "500px" : "700px" }}  >

                                            <div className="live-header" style={{ backgroundColor: '#C1A9D5', color: 'white', borderRadius: '3px', marginLeft: '-15px', marginTop: '-33px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', width: '25%',minWidth:clubFloor ? "450px" : "650px", zIndex: '5' }} >  {userInfo[0].name}`s Club Chat

                                            </div>
                                            <div>

                                                <VideoChat hallId={hallId} userName={userInformation.username} videoAvailable={() => { setVideoAvailable(true) }} host={username} />
                                            </div>

                                            <div className="chatarea" style={{ marginTop: VideoAvailable ? "300px" : '0px' }}>
                                            {chatData.length?chatData.map((e)=>{
     <div className="messageBox">
         <div className="profileBox"><img className="chat-profile" src={e.imgSrc?e.imgSrc:null} /><p>{e.chatname}</p></div>
         <div className={e.isEmoji?"message-emoji":"message"}>{!e.isVideo && !e.isImage?autolinker.link(e.message):null}</div>
     </div>
    }):null}
                                                {/* {  chatData.forEach(e=>{
        if (e.message) {

            var messageContainer = document.querySelector('.chatarea')
            const messageBox = document.createElement('div');
            const ProfileBox = document.createElement('div');
            const messageElement = document.createElement('div');
            const image = document.createElement('img')
            const name = document.createElement('p')

            messageContainer.append(messageBox);
            messageBox.append(ProfileBox);
            messageBox.append(messageElement);
            ProfileBox.onclick = function () {


                //     toast.success(`Requested Private Chat to ${chatname}`
                //     // , {
                //     //     style: {
                //     //         border: "2px solid #A279BA",
                //     //         color: "#A279BA",
                //     //     },
                //     //     iconTheme: {
                //     //         primary: "#A279BA",
                //     //         secondary: "#FFFAEE",
                //     //     },
                //     // }
                // );
                const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
                toast.promise(
                    resolveAfter3Sec,
                    {
                        pending: `Requesting Private Chat to ${e.chatname}`,
                        success: setPrivateChat(true),
                        error: 'Request Rejected'
                    }
                )


            }

            ProfileBox.append(image)
            ProfileBox.append(name)

            messageBox.classList.add('messageBox');
            ProfileBox.classList.add('ProfileBox')

            var myLinkedMessage = autolinker.link(e.message);
            if (!e.isVideo && !e.isImage) { messageElement.innerHTML += myLinkedMessage; }

            name.innerText = e.chatname;
            messageElement.classList.add('message');
            if (e.isEmoji) {
                messageElement.classList.add('message-emoji');
            }



            if (e.imgSrc) {

                image.src = e.imgSrc;
                if (e.position == "right") {
                    image.classList.add('chat-profile');
                } else {
                    image.classList.add('chat-profile');
                }



            }
            if (e.isVideo) {

                const video = document.createElement('video')
                video.src = e.message;
                messageElement.append(video);
                video.style.maxWidth = "100%";
                video.style.maxHeight = "auto";
                video.style.marginTop = "10px";
                video.style.borderRadius = "5px";
                video.controls = true
                // if (position == "right") {
                //     image.classList.add('chat-profile');
                // } else {
                //     image.classList.add('chat-profile');
                // }



            }
            if (e.isImage) {

                const img = document.createElement('img')
                img.src = e.message;
                messageElement.append(img);
                img.style.maxWidth = "100%";
                img.style.maxHeight = "auto";
                img.style.marginTop = "10px";
                img.style.borderRadius = "5px";
                // if (position == "right") {
                //     image.classList.add('chat-profile');
                // } else {
                //     image.classList.add('chat-profile');
                // }



            }


            // messageContainer.append(messageElement);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        } 
    })} */}
                                            </div>






                                            {emojiPicker && (
                                                <ClickAwayListener onClickAway={() => { setEmojiPicker(false) }}>
                                                    <div>
                                                        <Picker
                                                            native
                                                            onEmojiClick={(event, emojiObject) => {
                                                                setMessageInboxValue(messageInboxValue + emojiObject.emoji)
                                                                // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                                                //  // socket.emit('send',message);
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
                                            {src && mimeType.substr(0, 5) == "image" ? <div className="messageBox">
                                                <img src={src} style={{ width: '100%', height: 'auto', marginTop: '-10px' }} />
                                                <button onClick={() => {
                                                    upload(file, file.type);
                                                    setFile([]);
                                                    setSrc(null);
                                                    setMimeType("")
                                                }}>Confirm</button>
                                                <button onClick={() => {

                                                    setFile([]);
                                                    setSrc(null);
                                                    setMimeType("")
                                                }}>Cancel</button>
                                            </div> : null}
                                            {src && mimeType.substr(0, 5) == "video" ?
                                                <div className="messageBox">
                                                    <video src={src} style={{ width: '100%', height: 'auto', marginTop: '-10px' }} className="messageBox" />
                                                    <button onClick={() => {
                                                        upload(file, file.type);
                                                        setFile([]);
                                                        setSrc(null);
                                                        setMimeType("")
                                                    }}>Confirm</button>
                                                    <button onClick={() => {

                                                        setFile([]);
                                                        setSrc(null);
                                                        setMimeType("")
                                                    }}>Cancel</button>
                                                </div>
                                                : null}
                                        </div>
                                        {/* {!clubFloor? <div className="community-club">
                                            <div className="live-header" style={{ backgroundColor: '#8149a06c', color: 'white', borderRadius: '3px' }} >Community Clubs</div>
                                            <RandomCommunitySuggestion />
                                        </div>:null} */}
                                       

                                    </div>

                                    <div className="send">
                                        <ReactTooltip />
                                        <form action="#" id="send-container" style={{marginLeft:!clubFloor?'50px':'5px'}} onSubmit={(e) => messagesubmit(e)}>
                                            {/* <FaWindowClose data-tip="Close ChatRoom" className="icon-text"
                                                onClick={() => {
                                                    setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setClubFloor(!clubFloor); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                                }}

                                            /> */}
                                            <label
                                                htmlFor="post-video"

                                            >
                                                <FiVideo data-tip="Share Video" className="icon-text" />
                                            </label>
                                            <input
                                                type="file"
                                                id="post-video"
                                                name="video"
                                                accept="video/*"
                                                onChange={handleFile}
                                                hidden
                                            />
                                            <label
                                                htmlFor="post-image"

                                            >
                                                <FiImage data-tip="Share Photos" className="icon-text" />
                                            </label>
                                            <input
                                                type="file"
                                                id="post-image"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleFile}
                                                hidden
                                            />
                                            <FiFolder data-tip="Share File" className="icon-text" />
                                            <FiSmile className="icon-text" data-tip="Emoji"
                                                onClick={() => { setEmojiPicker(!emojiPicker) }}
                                            />
                                            <input type="text" name="messageInp" value={messageInboxValue} id="messageInp" style={{width:clubFloor?'350px':'600px'}} onChange={(e) => { setMessageInboxValue(e.target.value) }} />
                                            <button type="submit" style={{border:'none',outline:'none',background:'none',marginLeft:'5px'}}> 
                                                 <SoapboxTooltip title={
                                     "Send Message"
                                  } placement="top">
                                     <img src={sendIcon} width="27px" />
                                  </SoapboxTooltip>
                                               </button>

                                        </form>
                                    </div>
                                </div> : null}
                                </div></div>
                                : null
                            }

                            {onDemandMedia
                                ? <div className="channel-media" id="feed" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                    {onDemandUploads && (
                                        <InfiniteScroll
                                            dataLength={onDemandUploads.length}
                                            next={fetchMoreOnDemandHoots}
                                            hasMore={onDemandHasMore}
                                            style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'wrap',padding:'1rem',margin:'1rem'}}
                                        >
                                            {onDemandUploads.map((hoot) => {
                                                return (

                                                    // <div key={upload}>
                                                    //     <Post
                                                    //         hootId={upload.id}
                                                    //         username={upload.authorUsername}
                                                    //         mimeType={upload.mimeType}
                                                    //         hootImgId={upload.image}
                                                    //         audioPoster={upload.audioPoster}
                                                    //         likes={upload.likes}
                                                    //         views={upload.views}
                                                    //         followers={upload.followers}
                                                    //         caption={upload.caption}
                                                    //         link={upload.link}
                                                    //         ephemeral={upload.ephemeral}
                                                    //         privateHoot={upload.private}
                                                    //         onDemandMedia={upload.onDemandMedia}
                                                    //         expiryDate={upload.expiryDate}
                                                    //         timeStamp={upload.timeStamp}
                                                    //         edited={upload.edited}
                                                    //         editedTimeStamp={upload.editedTimeStamp}
                                                    //     />
                                                    // </div>
                                                    <div key={hoot.id}>
                                                    {!hoot.mimeType
                                                        ?
                                                        <div className="img-container">
                                                            <div
                                                                className="hoot-img-vertical-profile"
                                                                style={{ animation: "none", backgroundColor: "#d9d1f8" }}
                                                                //onContextMenu={(e) => e.preventDefault()}
                                                                onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${btoa(hoot.id)}`) }}
                                                            >
                                                                {ReactPlayer.canPlay(hoot.link) &&
                                                                    hoot.link.endsWith('.mp4') ||
                                                                    hoot.link.endsWith('.mkv') ||
                                                                    hoot.link.endsWith('.mov') ||
                                                                    hoot.link.endsWith('.ogv') ||
                                                                    hoot.link.endsWith('.webm') ||
                                                                    hoot.link.endsWith('.mpg')
                                                                    ?
                                                                    <div className="vdo-container">
                                                                        <video
                                                                            muted
                                                                            disablePictureInPicture
                                                                            className="hoot-vdo-profile"
                                                                            style={{ margin: "0" }}
                                                                            onMouseOver={event => event.target.play()}
                                                                            onMouseOut={event => event.target.pause()}
                                                                            onDragStart={(e) => e.preventDefault()}
                                                                        >
                                                                            <source src={hoot.link} />
                                                                            Your browser does not support HTML video.
                                                                        </video>
                                                                    </div>
                                                                    :
                                                                    hoot.link.endsWith('.mp3') ||
                                                                        hoot.link.endsWith('.ogg') ||
                                                                        hoot.link.endsWith('.wav') ||
                                                                        hoot.link.endsWith('.flac') ||
                                                                        hoot.link.endsWith('.aac') ||
                                                                        hoot.link.endsWith('.alac') ||
                                                                        hoot.link.endsWith('.dsd')
                                                                        ?
                                                                        <div className="vdo-container">
                                                                            <video
                                                                                muted
                                                                                poster={`${BaseURL}/profile-pictures/${`${BaseURL}/profile-pictures/${hoot.profilePic}`}`}
                                                                                className="hoot-vdo-profile"
                                                                                style={{ margin: "0" }}
                                                                                onDragStart={(e) => e.preventDefault()}
                                                                            >
                                                                                <source src={hoot.link} />
                                                                                Your browser does not support HTML video.
                                                                            </video>
                                                                        </div>
                                                                        :
                                                                        ReactPlayer.canPlay(hoot.link) &&
                                                                        <div className='player-profile-wrapper'>
                                                                            <ReactPlayer
                                                                                url={hoot.link}
                                                                                className='react-player'
                                                                                controls="true"
                                                                                width={hoot.mimeType ? '97%' : '100%'}
                                                                                height='100%'
                                                                                light={true}
                                                                            />
                                                                        </div>
                                                                }
                                                            </div>
                                                            <FiPlayCircle
                                                                className="GIF-overlay"
                                                                style={{ borderRadius: "50%" }}
                                                                onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${btoa(hoot.id)}`) }}
                                                            />
                                                        </div>
                                                        :
                                                        hoot.mimeType.substr(0, 5) == "audio"
                                                            ? <ExploreHoot
                                                                hootId={(hoot.id)}
                                                                username={hoot.authorUsername}
                                                                mimeType={hoot.mimeType}
                                                                hootImgId={hoot.image}
                                                            />
                                                            : <HootOutside
                                                                hootId={(hoot.id)}
                                                                username={hoot.authorUsername}
                                                                mimeType={hoot.mimeType}
                                                                hootImgId={hoot.image}
                                                            />
                                                    }
                                                </div>
                                                );
                                            })}
                                        </InfiniteScroll>
                                    )}
                                </div>
                                : null
                            }

                        </div>
                    )
                        : null
                    }

                    {userInformation.username == username ? (
                        <div className="channel-user-content" >
                             
                            <div
                                className="channel-tabs shadow-sm"
                                style={{
                                    position: "sticky",
                                    top: "4.2rem",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <div className="tabs" style={{ margin: "0 0.5rem" }}>
                                    <span
                                        style={{ backgroundColor: clubFloor ? "#8249A0" : '#A279BA', borderRadius: '8px' }}
                                        onClick={() => {
                                            setShowRequest(false);
                                            setClubFloor(true);
                                            setShowSubscribers(false);
                                            setShowPricingSetting(false);
                                            setShowNotification(false);
                                            setShowChatRoom(true)
                                            setOnDemandMedia(false);
                                        }}
                                        style={{fontSize:'14px'}}
                                    >
                                       CLUB FLOOR
                                    </span>
                                    {/* <span
                                        style={{ backgroundColor: showRequest ? "#8249A0" : '#A279BA', borderRadius: '8px' }}
                                        onClick={() => { setShowRequest(!showRequest);
                                         setShowFeed(false); setShowSubscribers(false);
                                          setShowPricingSetting(false); setShowNotification(false); 
                                          setShowChatRoom(false) }} >Requests</span> */}
                                    {/* <span
                                        style={{ backgroundColor: showSubscribers ? "#8249A0" : '#A279BA', borderRadius: '8px' }}
                                        onClick={() => { setShowRequest(false); setShowFeed(false); setShowSubscribers(!showSubscribers); setShowPricingSetting(false); setShowNotification(false); setShowChatRoom(false) }} >Memberships</span> */}
                                    {/* <span onClick={() => { setShowRequest(false); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(!showNotification) }} >Notifications</span> */}
                                    {/* <span>Marketplace</span> */}

                                    {/* <span 
                                        onClick={() => {
                                            history.push(
                                                `/${uuidv4()}/RecordMessage/${uuidv4()}/${userInfo[0].name
                                                }/${uuidv4()}/${uuidv4()}`
                                            );
                                        }}
                                    >
                                        <div className="channel-btn-icon">
                                            Record Message
                                        </div>
                                    </span> */}
                                    <span id="chatRoomopen" style={{display:'none', backgroundColor: showChatRoom ? "#8249A0" : '#A279BA', borderRadius: '8px' }} onClick={() => {
                                        setShowRequest(false);
                                        setShowSubscribers(false);
                                        setShowPricingSetting(false);
                                        setShowNotification(false);
                                        setShowFeed(true);
                                        setShowChatRoom(false);
                                        setShowChatRoom(!showChatRoom);
                                        setOnDemandMedia(false)
                                        socket.emit('room', userInfo[0].username);
                                        socket.emit('new-user-joined', { name: userFullName, profilePic: userProfilePic });
                                    }}  >CLUB CHAT</span>
                                    <span
                                   
                                        style={{ backgroundColor: '#A279BA', borderRadius: '8px' ,fontSize:'14px '}}
                                    >CLUB AMENITIES</span>

<span  
                                        style={{ backgroundColor: '#A279BA',fontSize:'14px ', borderRadius: '8px' }}
                                    >EVENTS</span>
{/*                                                                    
                                                                       <span  style={{fontSize:'14px'}}
                                        style={{ backgroundColor: '#A279BA', borderRadius: '8px',fontSize:'14px ' }}
                                    >MARKETPLACE</span>
                                     <span  style={{fontSize:'14px'}}
                                        style={{ backgroundColor: '#A279BA', borderRadius: '8px',fontSize:'14px ' }}
                                    >MESSAGES</span> */}
                                           <span 
                                       
                                       >
                                            <SoapboxTooltip title={"MARKETPLACE"} placement="left"> 
                                            <img src={marketplaceicon} width="25px" />
                                           </SoapboxTooltip>
                                           </span>
                                 
                                    <span 
                                       
                                       >
                                            <SoapboxTooltip title={"MESSAGES"} placement="left"> 
                                            <img src={messagesicon} width="25px" />
                                           </SoapboxTooltip>
                                           </span>
                                        
                                        
                                           <span  
                                    >
                                          <SoapboxTooltip title={"Invite"} placement="left">  
                                          <img src={inviteicon} width="25px" /></SoapboxTooltip></span>
                                      <span 
                                       
                                    >
                                         <SoapboxTooltip title={"Club Rules"} placement="left"> 
                                         <img src={rules} width="25px" />
                                        </SoapboxTooltip>
                                        </span>
                                    {/* <button  style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}}>INVITE</button>
                                    <button style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}} >CLUB RULES</button> */}
                               <span onClick={()=>{history.push('/create-private')}}>
                                  
                <SoapboxTooltip title={
                   "Create Private Hoot"
                } placement="left">
                   <img src={privatehooticon} width="25px" />
                </SoapboxTooltip>
          </span>
                                </div>


                                {/* <span onClick={() => { setShowRequest(false); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(!showNotification) }} >Notifications</span> */}

                                {/* <FiSearch className="search-channel-content" /> */}
                            </div>
                            {showRequest ?<div className="slide-container">
                                 <div  id="slideR" 
                             style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor:'#D6C8E1', margin: '1rem' ,minWidth:'600px',minHeight:'400px'}}>
                            
                                 
                            <div style={{backgroundColor:'#8249A0',padding:'5px',width:'600px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',color:'white'}}>

                             
<h5>Requests</h5>
<FaWindowClose style={{cursor:'pointer'}} onClick={()=>{
document.getElementById('slideR').style.transition='2sec';
document.getElementById('slideR').style.right='-100vw';
                          
setTimeout(() => {
setShowRequest(false)

}, 1000)
}} />
</div>
                                <p>No Requests</p>
                            </div></div> : null}
                            {showPricingSetting ?
                            <div className="slide-container">
                               
                            <div id="slide" 
                             style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor:'#D6C8E1', margin: '1rem' ,minWidth:'600px',minHeight:'400px'}}>
                              <div style={{backgroundColor:'#8249A0',padding:'5px',width:'600px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',color:'white'}}>

                             
<h5>Set Service Price</h5>
<FaWindowClose style={{cursor:'pointer'}} onClick={()=>{
document.getElementById('slide').style.transition='2sec';
document.getElementById('slide').style.right='-100vw';
                          
setTimeout(() => {
setShowPricingSetting(false)

}, 1000)
}} />
</div>
                      
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label  style={{minWidth:'300px'}}>1 on 1 call :  </label><input style={{borderRadius:'10px',padding:'4px',border:'none',borderBottom:'3px solid grey',marginRight:'5px',outline:'none'}} type="number" value={oneOnOnecallPrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setOneOnOneCallPrice(e.target.value) }} />XMG</div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label style={{minWidth:'300px'}}>Group call :  </label><input style={{borderRadius:'10px',padding:'4px',border:'none',borderBottom:'3px solid grey',marginRight:'5px',outline:'none'}} type="number" value={groupCallPrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setGroupCallPrice(e.target.value) }} />XMG</div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label style={{minWidth:'300px'}}>Personal Message :  </label><input style={{borderRadius:'10px',padding:'4px',border:'none',borderBottom:'3px solid grey',marginRight:'5px',outline:'none'}} type="number" value={requestMessagePrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setRequestMessagePrice(e.target.value) }} />XMG</div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label style={{minWidth:'300px'}}>verified Autograph Price :  </label><input style={{borderRadius:'10px',padding:'4px',border:'none',borderBottom:'3px solid grey',marginRight:'5px',outline:'none'}} type="number" value={verifiedAutographPrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setVerifiedAutographPrice(e.target.value) }} />XMG</div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem', alignItems: 'center' }}> <label style={{minWidth:'300px'}}>Membership :  </label><input style={{borderRadius:'10px',padding:'4px',border:'none',borderBottom:'3px solid grey',marginRight:'5px',outline:'none'}} type="number" value={subscribePrice} placeholder="Amount XMG" min={5} max={100} onChange={(e) => { setSubscribePrice(e.target.value) }} />XMG</div>

                                <div className="btns" > 
                                 <button onClick={() => { updatePricing() }} style={{minWidth:'400px',borderRadius:'8px',backgroundColor:'#8249A0'}}  >Update Changes</button>
                                 
                                 </div>
                                 <p>Note: The minimum amount for service price is 5 XMG</p>
                            </div> </div>: null}
                            {showSubscribers ?
                            <div className="slide-container">
                            <div id="slideM" style={{ borderRadius:'10px',minWidth:'600px',minHeight:'400px',display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#D6C8E1',margin: '1rem' }}>
                              <div style={{backgroundColor:'#8249A0',padding:'5px',width:'600px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',color:'white'}}>

                             
                                <h5>Memberships</h5>
                                <FaWindowClose style={{cursor:'pointer'}} onClick={()=>{
 document.getElementById('slideM').style.transition='2sec';
 document.getElementById('slideM').style.right='-100vw';
                                                          
setTimeout(() => {
   setShowSubscribers(false)
  
}, 1000)
                                }} />
                              </div>
                            
                                {subscribePrice} XMG
                                <p>No Members</p>
                            </div></div> : null}
                            {showNotification ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCD5FA', padding: '1rem', margin: '1rem' }}>
                                <h5>Notification</h5>
                                <p>No Notification</p>
                            </div> : null}
                           
                             <div className="channel-media" id="feed" style={{display:'flex'}}>

                                <GiHamburgerMenu className="GiHamburgerMenu"  data-tip={clubFloor?"Hide Feeds":"Show Feeds"} onClick={() => {
                                          setClubFloor(!clubFloor)
                                        //   if(document.getElementById('slideFeed')){

                                        //     document.getElementById('slideFeed').style.transition='1sec';
                                        //     document.getElementById('slideFeed').style.left=clubFloor?'-100vw':'30px';
                                        // }
                                        }} />

                                        {clubFloor?
                                          uploads && (
                                           
                                            <InfiniteScroll 
                                                dataLength={uploads.length}
                                                next={fetchMoreHoots}
                                                hasMore={hasMore}
                                            // loader={<InfiniteScrollLoader />}
                                            >
                                                {uploads.map((upload, index) => {
                                                    return (
                                                        <div key={upload}>
                                                            <Post
                                                                hootId={upload.id}
                                                                username={upload.authorUsername}
                                                                mimeType={upload.mimeType}
                                                                hootImgId={upload.image}
                                                                audioPoster={upload.audioPoster}
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
                                           
                                        ):null}
                               
                                 {showChatRoom ?
                                <div style={{ position: 'relative' }} >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        {privateChat ? <div className="privateChat-club">
                                            <div className="live-header" style={{ backgroundColor: '#8149a06c', color: 'white', borderRadius: '3px', maxWidth: '300px' }} >Private Chat<FaWindowClose className="icon-text"
                                                onClick={() => {
                                                    setPrivateChat(false);
                                                }}
                                            /></div>

                                        </div> : null}

                                        <div className="container" style={{ left: clubFloor ? "20px" : "100px", width: clubFloor ? "40%" : "80%" ,minWidth:clubFloor ? "500px" : "700px"}} >
                                            <div className="live-header" style={{ backgroundColor: '#C1A9D5', color: 'white', borderRadius: '3px', marginLeft: '-15px', marginTop: '-33px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', width: '25%',minWidth:clubFloor ? "450px" : "650px", zIndex: '5' }} >  {userInfo[0].name}`s Club Chat
                                            <SoapboxTooltip title={"Stream Live"} placement="top"> 
                                            <img src={videolive} style={{ cursor: 'pointer'}} width="30px" onClick={() => { setBroadcastStream(true) }} />
                                           </SoapboxTooltip>
                                                     
                                            </div>
                                            {broadcastStream ? <VideoChat hallId={hallId} userName={userInformation.username} videoAvailable={() => { setVideoAvailable(true) }} host={username} /> : null}


                                            <div className="chatarea" style={{ marginTop: VideoAvailable ? "300px" : '0px', zIndex: '-1' }}>
                                            {chatData.length?chatData.map((e)=>{
     <div className="messageBox">
         <div className="profileBox"><img className="chat-profile" src={e.imgSrc?e.imgSrc:null} /><p>{e.chatname}</p></div>
         <div className={e.isEmoji?"message-emoji":"message"}>{!e.isVideo && !e.isImage?autolinker.link(e.message):null}</div>
     </div>
    }):null}
                                               
                                                {/* {  chatData.forEach(e=>{
        if (e.message) {

        
            ProfileBox.onclick = function () {


                const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
                toast.promise(
                    resolveAfter3Sec,
                    {
                        pending: `Requesting Private Chat to ${e.chatname}`,
                        success: setPrivateChat(true),
                        error: 'Request Rejected'
                    }
                )


            }

            if (!e.isVideo && !e.isImage) { messageElement.innerHTML += myLinkedMessage; }

            name.innerText = e.chatname;
            messageElement.classList.add('message');
            if (e.isEmoji) {
                messageElement.classList.add('message-emoji');
            }



            if (e.imgSrc) {

                image.src = e.imgSrc;
                if (e.position == "right") {
                    image.classList.add('chat-profile');
                } else {
                    image.classList.add('chat-profile');
                }



            }
            if (e.isVideo) {

                const video = document.createElement('video')
                video.src = e.message;
                messageElement.append(video);
                video.style.maxWidth = "100%";
                video.style.maxHeight = "auto";
                video.style.marginTop = "10px";
                video.style.borderRadius = "5px";
                video.controls = true
                // if (position == "right") {
                //     image.classList.add('chat-profile');
                // } else {
                //     image.classList.add('chat-profile');
                // }



            }
            if (e.isImage) {

                const img = document.createElement('img')
                img.src = e.message;
                messageElement.append(img);
                img.style.maxWidth = "100%";
                img.style.maxHeight = "auto";
                img.style.marginTop = "10px";
                img.style.borderRadius = "5px";
                // if (position == "right") {
                //     image.classList.add('chat-profile');
                // } else {
                //     image.classList.add('chat-profile');
                // }



            }


            // messageContainer.append(messageElement);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        } 
    })} */}
   
                                            </div>


                                            {emojiPicker && (
                                                <ClickAwayListener onClickAway={() => { setEmojiPicker(false) }}>
                                                    <div>
                                                        <Picker
                                                            native
                                                            onEmojiClick={(event, emojiObject) => {
                                                                setMessageInboxValue(messageInboxValue + emojiObject.emoji)
                                                                // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                                                //  // socket.emit('send',message);
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
                                            {src && mimeType.substr(0, 5) == "image" ? <div className="messageBox">
                                                <img src={src} style={{ width: '100%', height: 'auto', marginTop: '-10px' }} />
                                                <button onClick={() => {
                                                    upload(file, file.type);
                                                    setFile([]);
                                                    setSrc(null);
                                                    setMimeType("")
                                                }}>Confirm</button>
                                                <button onClick={() => {

                                                    setFile([]);
                                                    setSrc(null);
                                                    setMimeType("")
                                                }}>Cancel</button>
                                            </div> : null}
                                            {src && mimeType.substr(0, 5) == "video" ?
                                                <div className="messageBox">
                                                    <video src={src} style={{ width: '100%', height: 'auto', marginTop: '-10px' }} className="messageBox" />
                                                    <button onClick={() => {
                                                        upload(file, file.type);
                                                        setFile([]);
                                                        setSrc(null);
                                                        setMimeType("")
                                                    }}>Confirm</button>
                                                    <button onClick={() => {

                                                        setFile([]);
                                                        setSrc(null);
                                                        setMimeType("")
                                                    }}>Cancel</button>
                                                </div>
                                                : null}
                                        </div>
                                        {/* {!clubFloor? <div className="community-club">
                                            <div className="live-header" style={{ backgroundColor: '#8149a06c', color: 'white', borderRadius: '3px' }} >Community Clubs</div>
                                            <RandomCommunitySuggestion />
                                        </div>:null} */}

                                    </div>

                                    <div className="send">
                                        <ReactTooltip />
                                        <form action="#" id="send-container" style={{marginLeft:!clubFloor?'50px':'5px'}} onSubmit={(e) => messagesubmit(e)}>
                                            {/* <FaWindowClose className="icon-text" data-tip="Close Chatroom"
                                                onClick={() => {
                                                    setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setClubFloor(!clubFloor); setShowSubscribeButton(false);setOnDemandMedia(false); setShowChatRoom(!showChatRoom);
                                                }}

                                            /> */}

                                            <label
                                                htmlFor="post-video"

                                            >
                                                <FiVideo className="icon-text" data-tip="Share Video" />
                                            </label>
                                            <input
                                                type="file"
                                                id="post-video"
                                                name="video"
                                                accept="video/*"
                                                onChange={handleFile}
                                                hidden
                                            />
                                            <label
                                                htmlFor="post-image"

                                            >
                                                <FiImage className="icon-text" data-tip="Share Photos" />
                                            </label>
                                            <input
                                                type="file"
                                                id="post-image"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleFile}
                                                hidden
                                            />

                                            <FiFolder className="icon-text" data-tip="Share File" />
                                            <FiSmile className="icon-text" data-tip="Emoji"
                                                onClick={() => { setEmojiPicker(!emojiPicker) }}
                                            />
                                            <input type="text" name="messageInp" value={messageInboxValue} id="messageInp" style={{width:clubFloor?'350px':'600px'}} onChange={(e) => { setMessageInboxValue(e.target.value) }} />
                                            <button type="submit" style={{border:'none',outline:'none',background:'none',marginLeft:'5px'}}> 
                                                 <SoapboxTooltip title={
                                     "Send Message"
                                  } placement="top">
                                     <img src={sendIcon} width="27px" />
                                  </SoapboxTooltip>
                                               </button>

                                        </form>
                                    </div>
                                </div> : null}
                            </div>
                               
                            

                            {onDemandMedia 
                                ? <div className="channel-media" id="feed" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                    {onDemandUploads && (
                                        <InfiniteScroll
                                            dataLength={onDemandUploads.length}
                                            next={fetchMoreOnDemandHoots}
                                            hasMore={onDemandHasMore}
                                            style={{display:'flex',margin:'1rem',flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'wrap',padding:'1rem'}}
                                        >
                                            {onDemandUploads.map((hoot) => {
                                                return (
                                                    // <div key={upload}>
                                                    //     <Post
                                                    //         hootId={upload.id}
                                                    //         username={upload.authorUsername}
                                                    //         mimeType={upload.mimeType}
                                                    //         hootImgId={upload.image}
                                                    //         audioPoster={upload.audioPoster}
                                                    //         likes={upload.likes}
                                                    //         views={upload.views}
                                                    //         followers={upload.followers}
                                                    //         caption={upload.caption}
                                                    //         link={upload.link}
                                                    //         ephemeral={upload.ephemeral}
                                                    //         privateHoot={upload.private}
                                                    //         onDemandMedia={upload.onDemandMedia}
                                                    //         expiryDate={upload.expiryDate}
                                                    //         timeStamp={upload.timeStamp}
                                                    //         edited={upload.edited}
                                                    //         editedTimeStamp={upload.editedTimeStamp}
                                                    //     />
                                                    // </div>
                                                    <div key={hoot.id}>
                                                    {!hoot.mimeType
                                                        ?
                                                        <div className="img-container">
                                                            <div
                                                                className="hoot-img-vertical-profile"
                                                                style={{ animation: "none", backgroundColor: "#d9d1f8" }}
                                                               // onContextMenu={(e) => e.preventDefault()}
                                                                onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${btoa(hoot.id)}`) }}
                                                            >
                                                                {ReactPlayer.canPlay(hoot.link) &&
                                                                    hoot.link.endsWith('.mp4') ||
                                                                    hoot.link.endsWith('.mkv') ||
                                                                    hoot.link.endsWith('.mov') ||
                                                                    hoot.link.endsWith('.ogv') ||
                                                                    hoot.link.endsWith('.webm') ||
                                                                    hoot.link.endsWith('.mpg')
                                                                    ?
                                                                    <div className="vdo-container">
                                                                        <video
                                                                            muted
                                                                            disablePictureInPicture
                                                                            className="hoot-vdo-profile"
                                                                            style={{ margin: "0" }}
                                                                            onMouseOver={event => event.target.play()}
                                                                            onMouseOut={event => event.target.pause()}
                                                                            onDragStart={(e) => e.preventDefault()}
                                                                        >
                                                                            <source src={hoot.link} />
                                                                            Your browser does not support HTML video.
                                                                        </video>
                                                                    </div>
                                                                    :
                                                                    hoot.link.endsWith('.mp3') ||
                                                                        hoot.link.endsWith('.ogg') ||
                                                                        hoot.link.endsWith('.wav') ||
                                                                        hoot.link.endsWith('.flac') ||
                                                                        hoot.link.endsWith('.aac') ||
                                                                        hoot.link.endsWith('.alac') ||
                                                                        hoot.link.endsWith('.dsd')
                                                                        ?
                                                                        <div className="vdo-container">
                                                                            <video
                                                                                muted
                                                                                poster={`${BaseURL}/profile-pictures/${`${BaseURL}/profile-pictures/${hoot.profilePic}`}`}
                                                                                className="hoot-vdo-profile"
                                                                                style={{ margin: "0" }}
                                                                                onDragStart={(e) => e.preventDefault()}
                                                                            >
                                                                                <source src={hoot.link} />
                                                                                Your browser does not support HTML video.
                                                                            </video>
                                                                        </div>
                                                                        :
                                                                        ReactPlayer.canPlay(hoot.link) &&
                                                                        <div className='player-profile-wrapper'>
                                                                            <ReactPlayer
                                                                                url={hoot.link}
                                                                                className='react-player'
                                                                                controls="true"
                                                                                width={hoot.mimeType ? '97%' : '100%'}
                                                                                height='100%'
                                                                                light={true}
                                                                            />
                                                                        </div>
                                                                }
                                                            </div>
                                                            <FiPlayCircle
                                                                className="GIF-overlay"
                                                                style={{ borderRadius: "50%" }}
                                                                onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${btoa(hoot.id)}`) }}
                                                            />
                                                        </div>
                                                        :
                                                        hoot.mimeType.substr(0, 5) == "audio"
                                                            ? <ExploreHoot
                                                                hootId={(hoot.id)}
                                                                username={hoot.authorUsername}
                                                                mimeType={hoot.mimeType}
                                                                hootImgId={hoot.image}
                                                            />
                                                            : <HootOutside
                                                                hootId={(hoot.id)}
                                                                username={hoot.authorUsername}
                                                                mimeType={hoot.mimeType}
                                                                hootImgId={hoot.image}
                                                            />
                                                    }
                                                </div>
                                                );
                                            })}
                                        </InfiniteScroll>
                                    )}
                                </div>
                                : null
                            }

                            
                           

                        </div>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
};

export default PrivateChannels;