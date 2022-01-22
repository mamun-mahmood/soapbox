import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Post from "../Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import { FaRegTrashAlt, FaTumblr, FaWindowClose } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { RiCalendarEventLine, RiLiveLine, RiBookmark3Fill, RiBookmark3Line } from "react-icons/ri"
import { BsPlusCircleFill, BsTrash } from 'react-icons/bs'
import { IoCloseCircle } from 'react-icons/io5'
import {
  FiTwitter,
  FiSearch,
  FiPlayCircle,
} from "react-icons/fi";
import socket, { startSocket } from "../../socketChat";
import { GiHamburgerMenu } from "react-icons/gi";
import Picker from "emoji-picker-react";
import Linkify from "react-linkify";
import CreatePrivateHoot from "../../pages/CreatePrivateHoot";
import {
  RiFacebookCircleLine,
  RiPinterestLine,
  RiSnapchatLine,
} from "react-icons/ri";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMedium,
  AiOutlineReddit,
} from "react-icons/ai";
import banner from "../../assets/banner-3.jfif";
import live from "../../assets/banner-3.jfif";
import "./privateChannels.css";
import { toast } from "react-toastify";
import SubscribedUser from "../SubscribedUser";
import { v4 as uuidv4 } from "uuid";
import oneonone from "../../assets/oneonone.png";
import groupcall from "../../assets/groupcall.png";
import personalmessage from "../../assets/personalmessage.png";
import membershipGraphic from "../../assets/membershipGraphic.png";

import { Button, Form, ProgressBar } from "react-bootstrap";
import ClickAwayListener from "react-click-away-listener";
import Autolinker from "autolinker";
import { HiBadgeCheck, HiMenuAlt2 } from "react-icons/hi";
import ReactTooltip from "react-tooltip";
import VideoChat from "../VideoChat/VideoChat";
import ReactPlayer from "react-player";
import ExploreHoot from "../Explore/ExploreHoot";
import HootOutside from "../HootOutside/HootOutside";
import inviteicon from "../../assets/inviteicon.png";
import rules from "../../assets/rules.png";
import videolive from "../../assets/videoLive.png";
import marketplaceicon from "../../assets/marketplace.png";
import messagesicon from "../../assets/messages.png";
import chathive from "../../assets/chathive.png";
import sendIcon from "../../assets/send.png";
import videochat from "../../assets/videochat.png";
import imagechat from "../../assets/imagechat.png";
import filechat from "../../assets/filechat.png";
import emojiIcon from "../../assets/emoji.png";
import privatehooticon from "../../assets/private-hoot.png";
import { loadStripe } from "@stripe/stripe-js";
import MyVerticallyCenteredModal from "./model";
import { SoapboxTooltip } from "../SoapboxTooltip";
import SoapboxPrivateClubRules from "./SoapboxPrivateClubRules";
import Media from 'react-media';
import NavBar from "../NavBar/NavBar";
import MyVerticallyCenteredScheduler from "./scheduler";
import ReplyModal from './reply';
import { Share } from "@material-ui/icons";
import stickerIcon from '../../assets/stickerIcon.png'
import FortisSignIn from "../FortisIntegration/FortisSignIn";
import FortisMarketplaceArea from "../FortisIntegration/FortisMarketplaceArea";
import InboxMessage from "./inboxMessage";

const stripe = loadStripe(
  "pk_test_51IoEG4L1MA97pYvHkAXQ9r7wBejIZ0ZLcrXozHKsGZe56aMR7FfB0LVp6jXuiw0FgUZVjNn6IkL3AFiu4nnd79rh009nQr6Lxz"
);

const PrivateChannels = () => {
  const hallId = uuidv4();
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [chatData, setChatData] = useState([]);
  const [FormEditPoll, setFormEditPoll] = useState(true)
  const [chatDataPrivate, setChatDataPrivate] = useState([]);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeBox, setIframeBox] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [clubName, setClubName] = useState('')
  const [onDemandUploads, setOnDemandUploads] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setpage] = useState(2);
  const [onDemandPage, setOnDemandPage] = useState(2);
  const [subscribe, setSubscribe] = useState(false);
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);
  const [callRequest, setCallRequest] = useState(false);
  const [oneOnOnecall, setOneOnOneCall] = useState(false);
  const [groupCall, setGroupCall] = useState(false);
  const [requestMessage, setRequestMessage] = useState(0);
  const [subscribePrice, setSubscribePrice] = useState(0);
  const [callRequestPrice, setCallRequestPrice] = useState(0);
  const [oneOnOnecallPrice, setOneOnOneCallPrice] = useState(0);
  const [groupCallPrice, setGroupCallPrice] = useState(0);
  const [requestMessagePrice, setRequestMessagePrice] = useState(0);
  const [verifiedAutographPrice, setVerifiedAutographPrice] = useState(0);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [stickerPicker, setStickerPicker] = useState(false);
  const [stickerPickerPrivate, setStickerPickerPrivate] = useState(false);
  
 const [chatUnview,setChatUnview] = useState(0)
  const [emojiPickerPrivate, setEmojiPickerPrivate] = useState(false);
  const [AllMyEvents, setAllMyEvents] = useState([])
  const [showAllMyEvents, setShowAllMyEvents] = useState(false)

  const [showFeed, setShowFeed] = useState(true);
  const [clubFloor, setClubFloor] = useState(true);
  const [showCreateHoot, setShowCreateHoot] = useState(false);
  const [privateChat, setPrivateChat] = useState(false);
  const [privateChatList, setPrivateChatList] = useState(false);
  const [showBreakoffForm, setShowBreakoffForm] = useState(false);

  const [VideoAvailable, setVideoAvailable] = useState(false);
  const [onDemandMedia, setOnDemandMedia] = useState(false);
  const [onDemandHasMore, setOnDemandHasMore] = useState(true);
  const [media, setMedia] = useState("");
  const [showClubRules, setShowClubRules] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [privateChatPerson, setPrivateChatPerson] = useState();
  const [verifiedAutograph, setVerifiedAutograph] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const {retrievePaymentIntent, confirmPayment} = useStripe()

  const [showPricingSetting, setShowPricingSetting] = useState(false);
  const { username } = useParams();

  const BaseURL = process.env.REACT_APP_API_URL;

  const LIMIT = 4;

  const history = useHistory();
  const [userInfo, setUserInfo] = useState([]);
  const [subscribedMembers, setSubscribedMembers] = useState([]);
  const [clubRequestsData, setClubRequestsData] = useState([])
  const [inviteBox, setInviteBox] = useState(false);
  const [inviteBoxChat, setInviteBoxChat] = useState(false);
  
  const [scheduleBox, setScheduleBox] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [broadcastStream, setBroadcastStream] = useState(false);
  const [messageInboxValuePrivate, setMessageInboxValuePrivate] = useState("");
  const [messageInboxValue, setMessageInboxValue] = useState("");
  const [breakOffInput, setBreakOffInput] = useState("");
  const [showPollForm, setShowPollForm] = useState(false)
  const [pollFormData, setPollFormData] = useState({ Question: '', OptionA: '', OptionB: '', OptionC: '', createdBy: '', threadId: '', pollA: 90, pollB: 50, pollC: 60 })
  const [pollFormDataQ, setPollFormDataQ] = useState("")
  const [pollFormExpiry, setPollFormExpiry] = useState("24")
  const [pollFormDataOA, setPollFormDataOA] = useState("")
  const [pollFormDataOB, setPollFormDataOB] = useState("")
  const [pollFormDataOC, setPollFormDataOC] = useState("")
  const [file, setFile] = useState([]);
  const [src, setSrc] = useState(null);
  const [mimeType, setMimeType] = useState("");
  const [filePrivate, setFilePrivate] = useState([]);
  const [srcPrivate, setSrcPrivate] = useState(null);
  const [mimeTypePrivate, setMimeTypePrivate] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState("");
  const [marketPlaceArea, setMarketPlaceArea] = useState(false);
  const [showReply,setShowReply]= useState(false);
  const [replyData,setReplyData] = useState([]);
  const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
  const form = document.getElementById("send-container");
  const messageInput = document.getElementById("messageInp");
  const stickersImages = ["https://soapboxapi.megahoot.net/stickers/sticker1.png",
    "https://soapboxapi.megahoot.net/stickers/sticker2.png",
    "https://soapboxapi.megahoot.net/stickers/sticker3.png",
    "https://soapboxapi.megahoot.net/stickers/sticker4.png",
    "https://soapboxapi.megahoot.net/stickers/sticker5.png",
    "https://soapboxapi.megahoot.net/stickers/sticker6.png",
    "https://soapboxapi.megahoot.net/stickers/sticker7.png",
    "https://soapboxapi.megahoot.net/stickers/sticker8.png",
    "https://soapboxapi.megahoot.net/stickers/sticker9.png",
    "https://soapboxapi.megahoot.net/stickers/sticker10.png",
    "https://soapboxapi.megahoot.net/stickers/sticker11.png",
    "https://soapboxapi.megahoot.net/stickers/sticker12.png",
    "https://soapboxapi.megahoot.net/stickers/sticker13.png",
    "https://soapboxapi.megahoot.net/stickers/sticker14.png",
  ]
  var totalViews = 0;
  var totalLikes = 0;

  var autolinker = new Autolinker({
    urls: {
      schemeMatches: true,
      wwwMatches: true,
      tldMatches: true,
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
      location: "end",
    },

    className: "link-content",
  });
  
  const verifyExpiration = async (data) => {
    var resultTimeExp;
    let threadId = data.threadId
    axios.post(`${BaseURL}/upload/verifyExpiration`, {
      threadId: threadId,
      username: userInformation.username
    })
      .then((res) => {
        console.log("success")
        resultTimeExp = res.data

      }).then(() => {
        if (resultTimeExp) {
          return (resultTimeExp)
        }

      })

  };
const sendReplyToChat=(data)=>{
  let chatname=data.chatname;
  let pollData = "";
  let position="left";
  let imgSrc= `${BaseURL}/profile-pictures/${data.profilePic}` ;
  let isEmoji=false;
  let timestamp=data.timestamp;
  let isImage=false;
  let isVideo=false;
  let isPoll=false;
  let isEvent=false;
  let expiryTime="";
  let isSticker=false;
  let message=data.reply;
  let replyCount=data.replyCount;
  let isReply=true;
  // setChatData((e) => [
  //   ...e,
  //   data.parentChat,
  // ]);
 let parentChat=data.parentChat;
 
  setChatData(chatData.filter(item=>item.parentChat!==parentChat))
  


  setChatData((e) => [
    ...e,
    { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isSticker,isReply,parentChat,replyCount},
  ]);



   
      let threadId = uuidv4()
    
      // socket.emit('send',message);
      let isCommunity = userInfo[0].communityClub
      let isClub = userInfo[0].communityClub == 1 ? 0 : 1

  socket.emit("send", {
        threadId:threadId,
        name: userFullName,
        isClub: isClub,
        isPrivate: 0,
        isCommunity: isCommunity,
        message: message,
        profilePic: userProfilePic,
        isEmoji: false,
        timestamp: timestamp,
        isReply:true,
        parentChat:parentChat,
        parentThreadId:parentChat.threadId,
        replyCount
      });

   

  setTimeout(() => {
    if (document.querySelector(".chatarea")) {
      var messageContainer = document.querySelector(".chatarea");

      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, 2000);



}


const openPrivateChatfromInbox=(e)=>{
  setPrivateChatPerson({
    name: e.chatname,
    profilePic: e.imgSrc,
  });
  setPrivateChat(true);
  setClubFloor(false);
  setShowChatRoom(false);
  // socket.emit("room", userInfo[0].username+userInformation.username);
  getChatDataPrivate(e.chatname, userFullName)
  // socket.emit("new-user-joined", {
  //     name: userFullName,
  //     profilePic: userProfilePic,
  //   });

  setTimeout(() => {
    if (
      document.getElementById(
        "privatechatslide"
      )
    ) {
      document.getElementById(
        "privatechatslide"
      ).style.transition = "1sec";
      document.getElementById(
        "privatechatslide"
      ).style.right = "500px";
    }
  }, 1);
}

  const append = (
    chatname,
    message,
    position,
    imgSrc,
    isEmoji,
    isVideo,
    isImage,
    isPoll,
    timestamp,
    isEvent,
    isSticker,
    isReply,
    parentChat
  ) => {
    if (isPoll) {
      let pollData = JSON.parse(message)

      // let expiryTime= verifyExpiration(pollData)

      //   setChatData((e) => [
      //     ...e,
      //     { chatname, pollData, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp,expiryTime },
      //   ]);


      let expiryTime;
      axios.post(`${BaseURL}/upload/verifyExpiration`, {
        threadId: pollData.threadId,
        username: userInformation.username
      }).then((res) => {
        expiryTime = res.data.expiryTime
        pollData.isVoted = res.data.isVoted

        setChatData((e) => [
          ...e,
          { chatname, pollData, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isEvent, expiryTime, isSticker },

        ]);
      })



    } else if (isEvent) {
      let event = JSON.parse(message)

      setChatData((e) => [
        ...e,
        { chatname, event, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isEvent, isSticker },
      ]);
    }else if(isReply){
      setChatData((e) => [
        ...e,
        { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isSticker,isReply,parentChat },
      ]);
    }
    else {
      setChatData((e) => [
        ...e,
        { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isSticker },
      ]);
    }



    var messageContainer = document.querySelector(".chatarea");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  };
  const appendPrivate = (
    chatname,
    message,
    position,
    imgSrc,
    isEmoji,
    timestamp,
    isVideo,
    isImage,
    isSticker
  ) => {
    
    setChatDataPrivate((e) => [
      ...e,
      { chatname, message, position, imgSrc, isEmoji,timestamp, isVideo, isImage ,isSticker},
    ]);

    
    if(document.querySelector(".privateChat-club")){
      var messageContainer = document.querySelector(".privateChat-club");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
   
  };
  function isEmoji(str) {
    var ranges = [
      "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
    ];

    if (str.match(ranges.join("|"))) {
      return true;
    } else {
      return false;
    }
  }

  const getVotingPercentage = (num, num1, num2) => {

    var total = num + num1 + num2;
    if (total == 0) {
      total = 1
    }
    var numPercentage = Math.floor((num / total)) * 100

    return Math.floor((num / total) * 100);


  }



  const messagesubmit = (e) => {
    e.preventDefault();
    if (messageInboxValue) {
      let today = new Date();

      let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
      const message = messageInboxValue;
      let emojiValidator = isEmoji(message);
      let threadId = uuidv4()
      append(
        userFullName,
        `${message}`,
        "right",
        `${BaseURL}/profile-pictures/${userProfilePic}`,
        emojiValidator, "", "", "", timestamp
      );
      // socket.emit('send',message);
      let isCommunity = userInfo[0].communityClub
      let isClub = userInfo[0].communityClub == 1 ? 0 : 1
      socket.emit("send", {
        threadId:threadId,
        name: userFullName,
        isClub: isClub,
        isPrivate: 0,
        isCommunity: isCommunity,
        message: message,
        profilePic: userProfilePic,
        isEmoji: isEmoji(message),
        timestamp: timestamp
      });
      setMessageInboxValue("");
    }
  };

  const messagesubmitPrivate = (e,privateChatPerson,userProfilePic,userFullName) => {

    e.preventDefault();
    if (messageInboxValuePrivate) {
      const message = messageInboxValuePrivate;
      let today = new Date();
  let threadId = uuidv4()
      let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
      let emojiValidator = isEmoji(message);

      appendPrivate(
        userFullName,
        `${message}`,
        "right",
        `${BaseURL}/profile-pictures/${userProfilePic}`,
        emojiValidator,
        timestamp
      );
      // socket.emit('send',message);
      socket.emit("private-message-soapbox", {
        threadId:threadId,
        to: privateChatPerson.name,
        from: userFullName,
        isClub: 0,
        isPrivate: 1,
        isCommunity: 0,
        name: userFullName,
        message: message,
        profilePic: userProfilePic,
        isEmoji: isEmoji(message),
        timestamp: timestamp
      });
      setMessageInboxValuePrivate("");
    }
  };

  const getAllEvents = (username) => {
    axios.post(`${BaseURL}/upload/getMyEvents`, {
      username: username
    })
      .then(res => {
        setAllMyEvents(res.data)
        setShowAllMyEvents(true)

        setTimeout(() => {
          if (document.getElementById("slideE")) {
            // document.getElementById("slideE").style.transition = "1sec";
            // document.getElementById("slideE").style.right = "250px";

            // document.getElementById("slideE").style.transition = "2sec";
            // document.getElementById("slideE").style.left = "50%";
            // document.getElementById("slideE").style.top = "50%";
            // document.getElementById("slideE").style.transform = "translate(-50%, -50%)";
          }
        }, 0);
      })
  }

const myTotalUnviewChats=(username)=>{
  axios.post(`${BaseURL}/upload/myTotalUnviewChats`,{
    chatTo:username
  }).then(res=>{
    setChatUnview(res.data.length)
    })
}

const resetChatView=(username)=>{
  setChatUnview(0)
  axios.post(`${BaseURL}/upload/resetChatView`,{
    chatTo:username
  }).then((res)=>{console.log('success')})
  .catch(err=>console.log(err))
}
  useEffect(() => {
   myTotalUnviewChats(userFullName)
  }, [userFullName])

  useEffect(() => {
    socket.on("user-joined", (name) => {
      append(
        `${name.name} Joined the chat`,
        "",
        "",
        `${BaseURL}/profile-pictures/${name.profilePic}`
      );
    });



    socket.on("receive", (data) => {
      console.log("data");
      if (data.isEmoji) {
        append(
          data.name,
          `${data.message}`,
          "left",
          `${BaseURL}/profile-pictures/${data.profilePic}`,
          data.isEmoji,
          "",
          "",
          "",
          data.timestamp,

        );
      }else if(data.isReply){
        append(
          data.name,
          `${data.message}`,
          "left",
          `${BaseURL}/profile-pictures/${data.profilePic}`,
          data.isEmoji,
          data.isVideo,
          data.isImage,
          data.isPoll,
          data.timeStamp,
          data.isEvent,
          "",
          data.isReply,
          data.parentChat


        );
      } else {
        append(
          data.name,
          `${data.message}`,
          "left",
          `${BaseURL}/profile-pictures/${data.profilePic}`,
          data.isEmoji,
          data.isVideo,
          data.isImage,
          data.isPoll,
          data.timeStamp,
          data.isEvent
        );
      }
    });
 

    socket.on("left", (name) => {

      if (userFullName && userFullName !== name) {
        append(name, `${name} left the chat`);
      }
    });
  }, [userFullName]);


  useEffect(()=>{
    let FullName=userFullName
    let privateChat=privateChatPerson
    socket.on("receive-private-chat-soapbox", (data) => {

      if(data.to === FullName){
      
       setChatUnview(chatUnview+1)
      }
      if(data.to === FullName){
     
        if(privateChat&&(data.from === privateChat.name)){
         if (data.isEmoji) {
           appendPrivate(
             data.name,
             `${data.message}`,
             "left",
             `${BaseURL}/profile-pictures/${data.profilePic}`,
             data.isEmoji,
             data.timestamp
           );
         } else {
           appendPrivate(
             data.name,
             `${data.message}`,
             "left",
             `${BaseURL}/profile-pictures/${data.profilePic}`,
             data.isEmoji,
             data.timestamp,
             data.isVideo,
             data.isImage,
             data.isSticker,
             data.timeStamp,
           );
         }
   //          if (userFullName&&privateChatPerson&&(data.to == userFullName)&&(data.from == privateChatPerson.name)) {
     
    
   // }
        }
      }
 

 });
  },[userFullName,privateChatPerson])
  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`${BaseURL}/user/${username}`).then((response) => {
        setUserInfo(response.data);
        setClubName(response.data[0].isCommunity == 1 ? response.data[0].username : `${response.data[0].username}'s Private'`)
        console.log("dky");
        axios.get(`${BaseURL}/upload/user/${username}`).then((response) => {
          response.data.map((user) => {
            totalViews += user.views;
            totalLikes += user.likes;
          });
          setLikes(totalLikes);
          setViews(totalViews);

          axios
            .post(`${BaseURL}/user/pricings`, {
              username: username,
            })
            .then((res) => {
              console.log("res.data");
              setOneOnOneCallPrice(res.data[0].oneOnOneCall);
              setGroupCallPrice(res.data[0].groupCall);
              setRequestMessagePrice(res.data[0].personalMessage);
              setSubscribePrice(res.data[0].subscription);
              setVerifiedAutographPrice(res.data[0].verifiedAutographPrice);
              const params = new URLSearchParams(window.location.search); // id=123
              let paymentIntent = params.get("payment_intent"); // 123
              let redirect_status = params.get("redirect_status");
              let payment_intent_client_secret = params.get(
                "payment_intent_client_secret"
              );
              if (!paymentIntent) {
                // Stripe.js has not yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
              } else if (
                paymentIntent &&
                payment_intent_client_secret &&
                redirect_status == "succeeded"
              ) {
                // addMembershipInDb(username,subscribePrice)
                addMembershipInDb(
                  username,
                  res.data[0].subscription,
                  payment_intent_client_secret,
                  "",
                  0
                );
              }
            });
        });
      });
      setLoading(false);
    };
    getUserData();
    axios
      .get(`${BaseURL}/user/${userInformation.username}`)
      .then((res) => {
        setUserProfilePic(res.data[0].profilePic);
        setUserFullName(res.data[0].name);
        setUserId(res.data[0].id);
        setUserEmail(res.data[0].email);

        socket.emit("new-user-joined", {
          name: res.data[0].name,
          profilePic: res.data[0].profilePic,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updatePollData = (e) => {

    let threadId = e.pollData.threadId
    // axios.post(`${BaseURL}/upload/updatePollData`,{
    //   threadId:threadId,
    //   message:e.pollData
    // })
  }

  const getChatData = (username) => {
    axios
      .post(`${BaseURL}/upload/getChatData`, {
        roomname: username,
      })
      .then((res) => {
        console.log(chatData, "sky5");

        res.data.forEach(async (i) => {
          let chatname = i.chat.name,
            message = i.chat.message,
            position = i.chat.position,
            imgSrc = `${BaseURL}/profile-pictures/${i.chat.profilePic}`,
            isEmoji = i.chat.isEmoji,
            isVideo = i.chat.isVideo,
            isImage = i.chat.isImage,
            isPoll = i.chat.isPoll,
            timestamp = i.chat.timestamp,
            isEvent = i.chat.isEvent,
            isSticker = i.chat.isSticker,
            threadId=i.chat.threadId,
            isReply=i.chat.isReply,
            parentChat=i.chat.parentChat,
            replyCount=i.chat.replyCount

          if (isPoll) {
            let pollData = JSON.parse(message)
            let expiryTime;
            axios.post(`${BaseURL}/upload/verifyExpiration`, {
              threadId: pollData.threadId,
              username: userInformation.username
            }).then((res) => {
              expiryTime = res.data.expiryTime
              pollData.isVoted = res.data.isVoted

              setChatData((e) => [
                ...e,
                { chatname, pollData, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isEvent, expiryTime, isSticker,threadId },

              ]);
            }).finally(() => {
              setTimeout(() => {
                if (document.querySelector(".chatarea")) {
                  var messageContainer = document.querySelector(".chatarea");

                  messageContainer.scrollTop = messageContainer.scrollHeight;
                }
              }, 3000);
            })




          } else if (isEvent) {
            let event = JSON.parse(message)

            setChatData((e) => [
              ...e,
              { chatname, event, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isEvent, isSticker ,threadId},

            ]);

          }else if(isReply){
          
            setChatData((e) => [
              ...e,
              { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isSticker,isReply,parentChat,replyCount},
            ]);
          }
          else {
            setChatData((e) => [
              ...e,
              { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, isPoll, timestamp, isEvent, isSticker,threadId },
            ]);

          }


          if (document.querySelector(".chatarea")) {
            let messageContainer = document.querySelector(".chatarea");
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }

        });




      }).finally(() => {
        setTimeout(() => {
          if (document.querySelector(".chatarea")) {
            var messageContainer = document.querySelector(".chatarea");

            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        }, 3000);
      })
  };

  useEffect(() => {
    if (document.querySelector(".chatarea")) {
      var messageContainer = document.querySelector(".chatarea");
      messageContainer.scrollTop = messageContainer.scrollHeight;

    }

  }, [chatData])

  const getChatDataPrivate = (a, b) => {
    setChatDataPrivate([]);
    axios
      .post(`${BaseURL}/upload/getChatDataPrivate`, {
        to: a,
        from: b
      })
      .then((res) => {

        res.data.forEach((i) => {
          let chatname = i.chat.name,
            message = i.chat.message,
            position = i.chat.position,
            imgSrc = `${BaseURL}/profile-pictures/${i.chat.profilePic}`,
            isEmoji = i.chat.isEmoji,
            isVideo = i.chat.isVideo,
            isImage = i.chat.isImage,
            timestamp = i.chat.timestamp,
            isSticker=i.chat.isSticker
          setChatDataPrivate((e) => [
            ...e,
            { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, timestamp,isSticker },
          ]);
        });
        setTimeout(() => {
          if (document.querySelector(".privateChat-club")) {
            var messageContainer = document.querySelector(".privateChat-club");

            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        }, 1000);

      });
  };

  useEffect(() => {
    getChatData(username);
  }, []);

  useEffect(() => {
    let invoice = uuidv4();
    setCurrentInvoice(invoice);
  }, []);

  useEffect(() => {
    const getAllUploadData = async () => {
      axios
        .get(
          `${BaseURL}/upload/user/private/p/${username}?page=1&limit=${LIMIT}`
        )
        .then((response) => {
          setUploads(response.data.results);
          setTimeout(() => {
            if (subscribe || userInformation.username == username) {
              document.getElementById("chatRoomopen").click();
            }
          }, 2000);
        });
    };
    getAllUploadData();
  }, []);

  useEffect(() => { }, []);

  const getAllOnDemandMedia = async (media) => {
    setMedia(media);
    axios
      .get(
        `${BaseURL}/upload/user/private/onDemandMedia/p/${username}?page=1&limit=${LIMIT}&media=${media}`
      )
      .then((response) => {
        setOnDemandUploads(response.data.results);
      });
  };

  const checkMembership = () => {
    axios
      .post(`${BaseURL}/user/getMember`, {
        member: userInformation.username,
        owner: username,
      })
      .then((res) => {
        setShowSubscribeButton(false);
        setShowFeed(true);
        setSubscribe(true);
        document.getElementById("chatRoomopen").click();
      });
  };

  useEffect(() => {
    checkMembership();
  }, []);

  const fetchMoreHoots = async () => {
    await axios
      .get(
        `${BaseURL}/upload/user/private/p/${username}?page=${page}&limit=${LIMIT}`
      )
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
      .get(
        `${BaseURL}/upload/user/private/onDemandMedia/p/${username}?page=${onDemandPage}&limit=${LIMIT}&media=${media}`
      )
      .then((response) => {
        const hootsFromServer = response.data.results;

        setOnDemandUploads([...onDemandUploads, ...hootsFromServer]);

        if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
          setOnDemandHasMore(false);
        }
      });

    setOnDemandPage(onDemandPage + 1);
  };

  const subscribeUser = () => {
    if (showSubscribeButton) {
      document.getElementById("slideSSB").style.transition = "2sec";
      document.getElementById("slideSSB").style.right = "-100vw";

      setTimeout(() => {
        setShowSubscribeButton(false);
      }, 1000);
    } else {
      setShowSubscribeButton(!showSubscribeButton);
      setOneOnOneCall(false);
      setGroupCall(false);
      setRequestMessage(false);
      setVerifiedAutograph(false);
      setShowFeed(false);

      setTimeout(() => {
        if (document.getElementById("slideSSB")) {
          document.getElementById("slideSSB").style.transition = "1sec";
          document.getElementById("slideSSB").style.right = "250px";
        }
      }, 1);
    }
  };

  const unSubscribeUser = () => {
    if (showSubscribeButton) {
      document.getElementById("slideSSB").style.transition = "2sec";
      document.getElementById("slideSSB").style.right = "-100vw";

      setTimeout(() => {
        setShowSubscribeButton(false);
      }, 1000);
    } else {
      setShowSubscribeButton(!showSubscribeButton);
      setOneOnOneCall(false);
      setGroupCall(false);
      setRequestMessage(false);
      setVerifiedAutograph(false);
      setShowFeed(false);

      setTimeout(() => {
        if (document.getElementById("slideSSB")) {
          document.getElementById("slideSSB").style.transition = "1sec";
          document.getElementById("slideSSB").style.right = "250px";
        }
      }, 1);
    }
  };

  const deletePrivateChatAll = (roomname) => {

    if (window.confirm("Are you Sure,you want to delete all chats Permanently?")) {
      axios.post(`${BaseURL}/upload/deleteChatAll`, {
        roomname: roomname
      }).then((res) => {
        setChatData([])
        toast.success(res.data.message)

      }).catch(err => console.log(err))
    }
  }

  const deletePrivateChatDuo = (a, b) => {

    if (window.confirm("Are you Sure,you want to delete all chats Permanently?")) {
      axios.post(`${BaseURL}/upload/deleteChatDuo`, {
        from: a,
        to: b
      }).then((res) => {
        setChatDataPrivate([])
        toast.success(res.data.message)

      }).catch(err => console.log(err))
    }
  }

  const callRequestUser = () => {
    setCallRequest(!callRequest);

    toast.success(`Requested call to ${username}`);
  };

  const cancelCallRequestUser = () => {
    setCallRequest(!callRequest);

    toast.success(`Cancelled call request to ${username}`);
  };

  const updatePricing = () => {
    axios
      .post(`${BaseURL}/user/UpdatePricings`, {
        oneOnOneCall: oneOnOnecallPrice,
        groupCall: groupCallPrice,
        personalMessage: requestMessagePrice,
        subscription: subscribePrice,
        verifiedAutographPrice: verifiedAutographPrice,
        username: username,
      })
      .then((res) => {
        alert("Updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
    file && setMimeType(file.type);
    setSrc(URL.createObjectURL(file));
    // setMessageInboxValue(file.name);
    setTimeout(() => {
      let messageContainer = document.querySelector(".chatarea");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 500);
  };
  const handleFilePrivate = (event) => {
    const file = event.target.files[0];
    setFilePrivate(file);
    file && setMimeTypePrivate(file.type);
    setSrcPrivate(URL.createObjectURL(file));
    // setMessageInboxValue(file.name);
    setTimeout(() => {
      if(document.querySelector(".privateChat-club")){
      var messageContainer = document.querySelector(".privateChat-club");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    }, 500);


      
   
  };

  const addMembershipInDb = (
    username,
    subscribePrice,
    client_id,
    invoice,
    communityClub
  ) => {
    if (!subscribe) {
      axios
        .post(`${BaseURL}/user/membership`, {
          owner: username,
          member: userInformation.username,
          price: subscribePrice,
          client_id: client_id,
          invoice: invoice,
          communityClub: communityClub,
        })
        .then((res) => {
          toast.success(`${username} Membership Activated`);
          setShowSubscribeButton(false);
          setShowFeed(true);
          setSubscribe(true);
          document.getElementById("chatRoomopen").click();
        })
        .catch((err) => alert(JSON.stringify(err)));
    }
  };

  const verifyOrder = (username) => {
    axios
      .post(
        "https://messangerapi533cdgf6c556.amaprods.com/api/users/showPurchasedOrderSoapbox",
        {
          email: userEmail,
          product: username,
        }
      )
      .then((res) => {
        // res.data.message.forEach((e) => {

        //     axios.get(`https://megahoot.org/api/req.php?type=check_merchant_transaction_status&merch_key=SB7MQws35cr7x4tDnAdyKyx0grdOx3yEWi736OKuExjPXVrPF9TKYTvOLxJJl6UyrMz4yFSBahDVF1l3eKgZHf4W1k4TM34hAak1GDnM6RgcN6VqaTJreY8vL8NV7ewvEAf14Voigb3U&inv=${e.invoice_id}`)
        //         .then((res) => {

        //             console.log(res.data.status, typeof (res.data.status), "sky xmg")
        //             if (res.data.status == "1") {
        //                 addMembershipInDb(username,subscribePrice)
        //             }
        //         })
        //         .catch(err => console.log(err))
        // })

        axios
          .get(
            `https://megahoot.org/api/req.php?type=check_merchant_transaction_status&merch_key=SB7MQws35cr7x4tDnAdyKyx0grdOx3yEWi736OKuExjPXVrPF9TKYTvOLxJJl6UyrMz4yFSBahDVF1l3eKgZHf4W1k4TM34hAak1GDnM6RgcN6VqaTJreY8vL8NV7ewvEAf14Voigb3U&inv=${res.data.message[0].invoice_id}`
          )
          .then((res) => {
            console.log(res.data.status, typeof res.data.status, "sky xmg");
            if (res.data.status == "1") {
              addMembershipInDb(
                username,
                subscribePrice,
                "",
                res.data.message[0].invoice_id,
                0
              );
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.success(`No Record Found or something went wrong`);
      });
  };

  const dataUploaderForOrder = () => {
    // handleSubmit();
    // props.history.push("/signin?redirec=shipping");
    // generateInvoice()
    if (!subscribe) {
      axios
        .post(
          `https://messangerapi533cdgf6c556.amaprods.com/api/users/storePurchasedOrder/`,
          {
            product: username,
            invoice_id: currentInvoice,
            user_id: userId,
            product_id: currentInvoice,
            email: userEmail,
          }
        )
        .then((res) => {
          console.log("success");
          document.getElementById("redirectToPayment").click();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      console.log("Please Add Some Items In Cart To Checkout");
    }
  };

  const upload = (file, mimeType) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadData = async () => {
      await axios
        .all([axios.post(`${BaseURL}/upload/uploadMedia`, formData)])
        .then(
          axios.spread((res1, res2) => {
            if (res1) {
              if (mimeType.substr(0, 5) == ("video" || "audio")) {
                append(
                  userFullName,
                  `${BaseURL}/storageChat/${res1.data}`,
                  "left",
                  `${BaseURL}/profile-pictures/${userProfilePic}`,
                  false,
                  true,
                  false
                );
                socket.emit("send", {
                  name: userFullName,
                  message: `${BaseURL}/storageChat/${res1.data}`,
                  profilePic: userProfilePic,
                  isEmoji: false,
                  isVideo: true,
                  isImage: false,
                });
              } else {
                append(
                  userFullName,
                  `${BaseURL}/storageChat/${res1.data}`,
                  "left",
                  `${BaseURL}/profile-pictures/${userProfilePic}`,
                  false,
                  false,
                  true
                );
                socket.emit("send", {
                  name: userFullName,
                  message: `${BaseURL}/storageChat/${res1.data}`,
                  profilePic: userProfilePic,
                  isEmoji: false,
                  isVideo: false,
                  isImage: true,
                });
              }
            }
          })
        );
    };

    uploadData();
  };

  const uploadPrivate = (file, mimeType) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadDataPrivate = async () => {
      await axios
        .all([axios.post(`${BaseURL}/upload/uploadMedia`, formData)])
        .then(
          axios.spread((res1, res2) => {
            if (res1) {
              if (mimeType.substr(0, 5) == ("video" || "audio")) {
                // appendPrivate(
                //   userFullName,
                //   `${BaseURL}/storageChat/${res1.data}`,
                //   "left",
                //   `${BaseURL}/profile-pictures/${userProfilePic}`,
                //   false,
                //   true,
                //   false
                // );
                // socket.emit("send", {
                //   name: userFullName,
                //   message: `${BaseURL}/storageChat/${res1.data}`,
                //   profilePic: userProfilePic,
                //   isEmoji: false,
                //   isVideo: true,
                //   isImage: false,
                // });
                const message = `${BaseURL}/storageChat/${res1.data}`;
                let today = new Date();
            let threadId = uuidv4()
                let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
                let emojiValidator = isEmoji(message);
          
                appendPrivate(
                  userFullName,
                  `${message}`,
                  "right",
                  `${BaseURL}/profile-pictures/${userProfilePic}`,
                  emojiValidator,
                  timestamp,
                  true,
                );
                // socket.emit('send',message);
                socket.emit("private-message-soapbox", {
                  threadId:threadId,
                  to: privateChatPerson.name,
                  from: userFullName,
                  isClub: 0,
                  isPrivate: 1,
                  isCommunity: 0,
                  name: userFullName,
                  message: message,
                  profilePic: userProfilePic,
                  isEmoji: isEmoji(message),
                  timestamp: timestamp,
                  isVideo: true,
                });
              } else {
                // append(
                //   userFullName,
                //   `${BaseURL}/storageChat/${res1.data}`,
                //   "left",
                //   `${BaseURL}/profile-pictures/${userProfilePic}`,
                //   false,
                //   false,
                //   true
                // );
                // socket.emit("send", {
                //   name: userFullName,
                //   message: `${BaseURL}/storageChat/${res1.data}`,
                //   profilePic: userProfilePic,
                //   isEmoji: false,
                //   isVideo: false,
                //   isImage: true,
                // });

                const message = `${BaseURL}/storageChat/${res1.data}`;
                let today = new Date();
            let threadId = uuidv4()
                let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
                let emojiValidator = isEmoji(message);
          
                appendPrivate(
                  userFullName,
                  `${message}`,
                  "right",
                  `${BaseURL}/profile-pictures/${userProfilePic}`,
                  emojiValidator,
                  timestamp,
                  false,
                  true
                );
                // socket.emit('send',message);
                socket.emit("private-message-soapbox", {
                  threadId:threadId,
                  to: privateChatPerson.name,
                  from: userFullName,
                  isClub: 0,
                  isPrivate: 1,
                  isCommunity: 0,
                  name: userFullName,
                  message: message,
                  profilePic: userProfilePic,
                  isEmoji: isEmoji(message),
                  timestamp: timestamp,
                  isVideo: false,
                  isImage:true
                });
              }
            }
          })
        );
    };

    uploadDataPrivate();
  };

  const createBreakoff = () => {

    axios.post(`${BaseURL}/Upload/createBreakOff`, {
      mainClub: username,
      topic: breakOffInput,
      createdBy: userInformation.username
    })
      .then((res) => {
        if (res.data.status == 0) {
          toast.success(res.data.message)
        } else {
          toast.success(res.data.message);
          setBreakOffInput('');
          document.getElementById("showBreakoffFormId").style.transition =
            "2s";
          document.getElementById("showBreakoffFormId").style.right = "-100vw";

          setTimeout(() => {
            setShowBreakoffForm(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePollFormSubmission = (user) => {
    if (pollFormDataQ && (pollFormDataOA || pollFormDataOB || pollFormDataOC)) {

      let threadId = uuidv4()
      setPollFormData({
        Question: pollFormDataQ,
        OptionA: pollFormDataOA,
        OptionB: pollFormDataOB,
        OptionC: pollFormDataOC,
        pollFormExpiry: pollFormExpiry,
        createdBy: user,
        threadId: threadId,
        pollA: 0,
        pollB: 0,
        pollC: 0
      })
      setFormEditPoll(!FormEditPoll)
    }
  }

  const uploadPollResponse = (e) => {

    axios.post(`${BaseURL}/upload/uploadPollResponse`, {
      threadId: e.pollData.threadId,
      pollA: e.pollData.pollA,
      pollB: e.pollData.pollB,
      pollC: e.pollData.pollC,
      username: userInformation.username
    }).then(() => { console.log("done") })
  }

  const sumitChatDataFromScheduler = (data) => {
    sentEventMessageInChat(data)
  }
  const sentEventMessageInChat = (data) => {
    let today = new Date();

    let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
    append(
      userFullName,
      `${JSON.stringify(data)}`,
      "right",
      `${BaseURL}/profile-pictures/${userProfilePic}`,
      false,
      "",
      "",
      false,
      timestamp,
      true
    );

    let isCommunity = userInfo[0].communityClub
    let isClub = userInfo[0].communityClub == 1 ? 0 : 1
    let Eventdata = JSON.stringify(data);
    let threadId = uuidv4()
    socket.emit("send", {
      name: userFullName,
      isClub: isClub,
      isPrivate: 0,
      isCommunity: isCommunity,
      message: Eventdata,
      profilePic: userProfilePic,
      isEmoji: false,
      isVideo: "",
      isImage: "",
      isPoll: false,
      timestamp: timestamp,
      isEvent: true,
      threadId: threadId,
    });
  }

  const sentPollMessageInChat = (pollFormData) => {
    let today = new Date();

    let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
    setShowPollForm(false)
    append(
      userFullName,
      `${JSON.stringify(pollFormData)}`,
      "right",
      `${BaseURL}/profile-pictures/${userProfilePic}`,
      false,
      "",
      "",
      true,
      timestamp
    );

    let isCommunity = userInfo[0].communityClub
    let isClub = userInfo[0].communityClub == 1 ? 0 : 1
    let data = JSON.stringify(pollFormData)
    socket.emit("send", {
      name: userFullName,
      isClub: isClub,
      isPrivate: 0,
      isCommunity: isCommunity,
      message: data,
      profilePic: userProfilePic,
      isEmoji: false,
      isVideo: "",
      isImage: "",
      isPoll: true,
      timestamp: timestamp
    });
    toast.success('Created Poll Successfully!')
    setFormEditPoll(true)
    setPollFormDataQ("");
    setPollFormDataOA("");
    setPollFormDataOB("");
    setPollFormDataOC("");
    setPollFormData({ Question: '', OptionA: '', OptionB: '', OptionC: '', createdBy: '', threadId: '', pollA: 0, pollB: 0, pollC: 0 })

  }

  const getAllSubscribedMembers = () => {
    axios
      .post(`${BaseURL}/user/getAllMember`, {
        owner: username,
      })
      .then((res) => {
        setSubscribedMembers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getIntent = () => {
    axios
      .post(`${BaseURL}/Payments/checkout`, {
        data: { amount: subscribePrice, currency: "usd" },
      })
      .then((res) => {
        return res.data.client_secret;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllSubscribedMembers();
  }, []);

  const deleteClubRequest = (user) => {
    axios.post(`${BaseURL}/upload/removeRequest`, {
      username: user.username
    }).then(res => {
      setClubRequestsData(clubRequestsData.filter((e) => e.username !== user.username))
      toast.success("Deleted Request")
    })
  }

  const deleteClubRequestAuto = (user) => {
    axios.post(`${BaseURL}/upload/clearRequestList`, {
      username: user.username
    }).then(res => {
      setClubRequestsData(clubRequestsData.filter((e) => e.username !== user.username))
    })
  }

  const handleClubRequestApprove = (user) => {
    axios.post(`${BaseURL}/upload/approveRequest`, {
      username: user.username
    }).then(res => {
      if (res.data.status == 1) {
        toast.success(res.data.message)
        deleteClubRequestAuto(user)
      }
    })
  }

  const getAllClubRequest = () => {
    axios.post(`${BaseURL}/upload/getAllClubRequests`, {
      username: username
    }).then(res => {
      setClubRequestsData(res.data)
    })
  }

  useEffect(() => {
    getAllClubRequest()
  }, [username])
  //    useEffect(() => {

  //     let clientSecret ="pi_3JytnwL1MA97pYvH1vTUJhgu_secret_b5a40SDcurxmKiyEdNsmiBRo0"
  //     //     const {paymentIntent} =  await stripe.retrievePaymentIntent(client_secret);
  //     //     if (paymentIntent && paymentIntent.status === 'succeeded') {
  //     //       // Handle successful payment here
  //     //       alert("success")
  //     //     } else {
  //     //       // Handle unsuccessful, processing, or canceled payments and API errors here
  //     //     }
  //     //   })();

  //       stripe.confirmCardPayment(clientSecret).then(function(response) {
  //         if (response.error) {
  //           // Handle error here
  //         } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
  //           // Handle successful payment here
  //           alert('sucesss')
  //         }
  //       });
  //    }, [stripe])

  const [showExtraFeatures, setShowExtraFeatures] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 930) {
      setShowExtraFeatures(true);
    }
    if (window.innerWidth < 930) {
      setShowExtraFeatures(false);
      setClubFloor(false);
    }
  }, [clubFloor])

  return (
    <Fragment>
      {/* NavBar for Private Boapbox */}
      <NavBar
        width={"none"}
        height={60}
        header={"Soapbox Private Club"}
        showExtraFeatures={showExtraFeatures}
        setShowExtraFeatures={setShowExtraFeatures}
        privateUserImage={`${BaseURL}/profile-pictures/${userInfo[0] && userInfo[0].profilePic}`}
      />

      <div className="private-channels" style={{ userSelect: "none", overflowX: "clip" }}>
        <div className="channel-content" >
          {/* Sidebar Drawer which includes Private User Profile and other Extra Features... */}
          <div style={{ flex: '0.2' }}  >
            <Fragment key={userInfo[0] && userInfo[0].id}>
              <div className="channel-user-info">
                {showExtraFeatures
                  ? <ul
                    style={{
                      // position: "fixed",
                      minWidth: '100% !important',
                      alignSelf: "flex-start",
                      // maxHeight: '105vh',
                      maxHeight: '93vh',
                      overflowY: 'scroll',

                      // OR this for full height ...
                      // height: "-webkit-fill-available",
                      // marginBottom: '5%'
                    }}
                  >
                    {/* Club Banner */}
                    <div className="channel-banner">
                      <img
                        src={banner}
                        alt="banner"
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>

                    {/* Club Profile with Badge*/}
                    <div className="profile-pic" onDragStart={(e) => e.preventDefault()} style={{ position: "relative" }}>
                      <img
                        src={`${BaseURL}/profile-pictures/${userInfo[0] && userInfo[0].profilePic}`}
                        alt="profile"
                      />
                      <div
                        className="clubOwner"
                        style={{
                          position: "absolute",
                          bottom: "4.5rem",
                          zIndex: 5,
                        }}
                      >
                        Club Owner
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          bottom: "4rem",
                          zIndex: 5,
                        }}
                        className="arrow-down"
                      ></div>
                    </div>

                    {/* User Information & Live Events */}
                    <div>
                      {/* user information */}
                      <div className="user-information">
                        {/* user's full name with verified badge */}
                        <div
                          className="name verificationBadgeContainer"
                          style={{ fontSize: "14px", gap: "0.2rem" }}
                        >
                          {userInfo[0] && userInfo[0].name}
                          {userInfo[0] && userInfo[0].verified === 1 ? (
                            <div
                              className="profile-verification-badge"
                              style={{
                                padding: 0,
                                fontSize: "1.2rem",
                                marginBottom: "0.2rem"
                              }}
                            >
                              <HiBadgeCheck
                                data-tip="Verified account"
                                data-text-color="#8249A0"
                                data-background-color="#D9D2FA"
                              />
                            </div>
                          ) : null}
                        </div>

                        {/* user's username  */}
                        <div
                          className="username"
                          style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            marginTop: "-0.3rem",
                            marginBottom: "0.5rem"
                          }}
                        >
                          @{userInfo[0] && userInfo[0].username}
                        </div>

                        {/* user's likes and views */}
                        <div className="followers">
                          <b style={{ fontSize: "14px", color: "#334155" }}>
                            {formatCount(likes) + formatSi(likes)}
                          </b>

                          <span style={{ fontSize: "14px", color: "#4B5563", marginRight: "0.5rem" }}> Likes </span>

                          <b style={{ fontSize: "14px", color: "#334155" }}>
                            {formatCount(views) + formatSi(views)}
                          </b>

                          <span style={{ fontSize: "1rem", color: "#4B5563" }}> Views</span>
                        </div>

                        {/* user's bio */}
                        {/* {userInfo[0]&&userInfo[0].bio && (
                              <div
                                className="user-desc"
                                style={{ textAlign: "center" }}
                              >
                                {userInfo[0]&&userInfo[0].bio}
                              </div>
                            )} */}

                        {/* user's website link */}
                        {userInfo[0] && userInfo[0].website && (
                          <a
                            href={
                              !userInfo[0] && userInfo[0].website.includes("https://")
                                ? "https://" + userInfo[0] && userInfo[0].website
                                : userInfo[0] && userInfo[0].website
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-website"
                          >
                            {userInfo[0] && userInfo[0].website.includes("https://")
                              ? userInfo[0] && userInfo[0].website.slice(8)
                              : userInfo[0] && userInfo[0].website}
                          </a>
                        )}

                        {/* user's social media links */}
                        <div
                          className="social-profile-icon-links"
                          style={{ flexWrap: "wrap", gap: "0.5rem" }}
                        >
                          {userInfo[0] && userInfo[0].twitter && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].twitter.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].twitter
                                  : userInfo[0] && userInfo[0].twitter
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FiTwitter className="social-profile-icon s-twitter" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].instagram && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].instagram.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].instagram
                                  : userInfo[0] && userInfo[0].instagram
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiOutlineInstagram className="social-profile-icon s-instagram" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].linkedIn && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].linkedIn.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].linkedIn
                                  : userInfo[0] && userInfo[0].linkedIn
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiOutlineLinkedin className="social-profile-icon s-linkedin" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].facebook && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].facebook.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].facebook
                                  : userInfo[0] && userInfo[0].facebook
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <RiFacebookCircleLine className="social-profile-icon s-facebook" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].tiktok && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].tiktok.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].tiktok
                                  : userInfo[0] && userInfo[0].tiktok
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <SiTiktok className="social-profile-icon s-tiktok" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].snapchat && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].snapchat.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].snapchat
                                  : userInfo[0] && userInfo[0].snapchat
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <RiSnapchatLine className="social-profile-icon s-snapchat" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].reddit && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].reddit.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].reddit
                                  : userInfo[0] && userInfo[0].reddit
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiOutlineReddit className="social-profile-icon s-reddit" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].pinterest && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].pinterest.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].pinterest
                                  : userInfo[0] && userInfo[0].pinterest
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <RiPinterestLine className="social-profile-icon s-pinterest" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].medium && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].medium.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].medium
                                  : userInfo[0] && userInfo[0].medium
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiOutlineMedium className="social-profile-icon s-medium" />
                            </a>
                          )}

                          {userInfo[0] && userInfo[0].tumblr && (
                            <a
                              href={
                                !userInfo[0] && userInfo[0].tumblr.includes("https://")
                                  ? "https://" + userInfo[0] && userInfo[0].tumblr
                                  : userInfo[0] && userInfo[0].tumblr
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaTumblr className="social-profile-icon s-tumblr" />
                            </a>
                          )}
                        </div>

                        {/* channel info */}
                        <div>
                          {userInfo[0] && userInfo[0].communityClub == 1 ? (
                            <div>
                              {/* Club Tools label */}
                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                Club Tools
                              </div>

                              {/* Club Tools buttons */}
                              <div className="control">
                                {/* Marketplace button */}
                                <button>
                                  Marketplace
                                </button>

                                {/* Get Membership/Membership button */}
                                <button
                                  onClick={() => {
                                    subscribe
                                      ? unSubscribeUser()
                                      : subscribeUser();
                                  }}
                                >
                                  {subscribe
                                    ? "Membership"
                                    : "Get Membership"}
                                </button>
                              </div>
                            </div>
                          ) : null}

                          {userInformation.username !== username ? (
                            <div>
                              {/* Member Tools label */}
                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                Member Tools
                              </div>

                              <div className="control">
                                {/* Video Meetings button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.verohive.net', title: 'VeroHive' });
                                      setShowIframe(true);
                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Video Meetings
                                </button>

                                {/* eDocuments button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.documega.com/enterprise-solutions/documega/', title: 'DocuMega' });
                                      setShowIframe(true);
                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  eDocuments
                                </button>

                                {/* MegaHoot Vault button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.megahoot.com/vault/megahoot-vault/', title: 'MegaHoot Vault' });
                                      setShowIframe(true);

                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  MegaHoot Vault
                                </button>

                                {/* Scheduler button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => { setScheduleBox(!scheduleBox) }}
                                >
                                  Scheduler
                                </button>
                              </div>

                              {/* Crypto Tools label */}
                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                Crypto Tools
                              </div>

                              {/* Crypto Tools buttons */}
                              <div className="control">
                                {/* Buy XMG Coins button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 500);
                                    } else {
                                      setIframeBox({ src: 'https://www.megahoot.com/xmg-fintech-digital-payment-portal/xmg-fintech/', title: 'XMG Wallet' });
                                      setShowIframe(true);

                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Buy XMG Coins
                                </button>

                                {/* Pecu Novus Wallet button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://pecunovus.org/login/', title: 'Pecu Novus Wallet' });
                                      setShowIframe(true);

                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Pecu Novus Wallet
                                </button>

                                {/* Crypto Index button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.megahootvault.com/', title: 'Crypto Index' });
                                      setShowIframe(true);
                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Crypto Index
                                </button>
                              </div>
                            </div>
                          ) : null}

                          {userInformation.username !== username &&
                            userInfo[0] && userInfo[0].communityClub !== 1 ? (
                            <div
                              className="live-header"
                              style={{
                                backgroundColor: "#8249A0",
                                color: "white",
                                borderRadius: "3px",
                              }}
                            >
                              Request a Virtual Experience
                            </div>
                          ) : null}

                          {userInformation.username == username ? (
                            <div className="top-features-medium">
                              {/* Membership label */}
                              <div
                                className="live-header top-option-medium"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                }}
                              >
                                Membership
                              </div>

                              {/* Membership bottons */}
                              <div className="control">
                                {/* Membership button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showSubscribers) {
                                      document.getElementById("slideM").style.transition = "2sec";
                                      document.getElementById("slideM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowSubscribers(false);
                                      }, 1000);
                                    } else {
                                      setOnDemandMedia(false);
                                      setShowRequest(false);
                                      setShowFeed(false);
                                      setShowSubscribers(!showSubscribers);
                                      setShowPricingSetting(false);
                                      setShowNotification(false);
                                      setShowChatRoom(true);

                                      setTimeout(() => {
                                        if (document.getElementById("slideM")) {
                                          document.getElementById("slideM").style.transition = "1sec";
                                          document.getElementById("slideM").style.right = "calc(100vw/5)";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Membership
                                </button>

                                {/* Requests button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showRequest) {
                                      document.getElementById(
                                        "slideR"
                                      ).style.transition = "2sec";
                                      document.getElementById(
                                        "slideR"
                                      ).style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowRequest(false);
                                      }, 1000);
                                    } else {
                                      setOnDemandMedia(false),
                                        setShowRequest(true);
                                      setShowFeed(false);
                                      setShowSubscribers(false);
                                      setShowPricingSetting(false);
                                      setShowNotification(false);
                                      setShowChatRoom(true);

                                      setTimeout(() => {
                                        if (document.getElementById("slideR")) {
                                          document.getElementById(
                                            "slideR"
                                          ).style.transition = "1sec";
                                          document.getElementById(
                                            "slideR"
                                          ).style.right = "calc(100vw/5)";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Requests
                                </button>
                              </div>

                              {/* Member Tools label */}
                              <div
                                className="live-header top-option-medium"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                }}
                              >
                                Member Tools
                              </div>

                              {/* Member Tools buttons */}
                              <div className="control">
                                {/* Video Meetings button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.verohive.net', title: 'VeroHive' });
                                      setShowIframe(true);
                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Video Meetings
                                </button>

                                {/* eDocuments button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.documega.com/enterprise-solutions/documega/', title: 'DocuMega' });
                                      setShowIframe(true);
                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  eDocuments
                                </button>

                                {/* MegaHoot Vault button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.megahoot.com/vault/megahoot-vault/', title: 'MegaHoot Vault' });
                                      setShowIframe(true);
                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  MegaHoot Vault
                                </button>

                                {/* Scheduler button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => { setScheduleBox(!scheduleBox) }}
                                >
                                  Scheduler
                                </button>
                              </div>

                              {/* Crypto Tools label */}
                              <div
                                className="live-header top-option-medium"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                }}
                              >
                                Crypto Tools
                              </div>

                              {/* Crypto Tools buttons */}
                              <div className="control">
                                {/* Buy XMG Coins button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setClubFloor(true);
                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.megahoot.com/xmg-fintech-digital-payment-portal/xmg-fintech/', title: 'XMG Wallet' });
                                      setShowIframe(true);
                                      setClubFloor(false);

                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Buy XMG Coins
                                </button>

                                {/* Pecu Novus Wallet button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setClubFloor(true);
                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://pecunovus.org/login/', title: 'Pecu Novus Wallet' });
                                      setShowIframe(true);
                                      setClubFloor(false);

                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Pecu Novus Wallet
                                </button>

                                {/* Crypto Index button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showIframe) {
                                      document.getElementById("slideIFM").style.transition = "2sec";
                                      document.getElementById("slideIFM").style.right = "-100vw";

                                      setClubFloor(true);
                                      setTimeout(() => {
                                        setShowIframe(false);
                                      }, 1000);
                                    } else {
                                      setIframeBox({ src: 'https://www.megahootvault.com/', title: 'Crypto Index' });
                                      setShowIframe(true);
                                      setClubFloor(false);

                                      setTimeout(() => {
                                        if (document.getElementById("slideIFM")) {
                                          document.getElementById("slideIFM").style.transition = "1sec";
                                          document.getElementById("slideIFM").style.right = "-16px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Crypto Index
                                </button>
                              </div>

                              {/* Club Toolbox label */}
                              <div
                                className="live-header top-option-medium"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                }}
                              >
                                Club Toolbox
                              </div>

                              {/* Club Toolbox buttons */}
                              <div className="control">
                                {/* Schedule a Virtual Experience button
                                <button
                                  style={{ minWidth: "208px" }}
                                >
                                  Schedule a Virtual Experience
                                </button> */}

                                {/* Schedule An Event button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => { setScheduleBox(!scheduleBox) }}
                                >
                                  Schedule An Event
                                </button>

                                {/* Make a Vero Audio Call button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    const Id = uuidv4();

                                    history.push({
                                      pathname: `/${uuidv4()}/AudioHall/${uuidv4()}`,
                                      state: {
                                        host: true,
                                        userName: userInformation.username,
                                        hallId: Id,
                                        hostUserName: username,
                                        profilePic: `${BaseURL}/profile-pictures/${userProfilePic}`,
                                      },
                                    });
                                  }}
                                >
                                  Make a Vero Audio Call
                                </button>

                                {/* Make a Vero Video Call button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    const Id = uuidv4();

                                    history.push({
                                      pathname: `/${uuidv4()}/SoapboxHall/${uuidv4()}`,
                                      state: {
                                        host: true,
                                        userName: userInformation.username,
                                        hallId: Id,
                                        hostUserName: username,
                                      },
                                    });
                                  }}
                                >
                                  Make a Vero Video Call
                                </button>

                                {/* Price Settings button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showPricingSetting) {
                                      document.getElementById("slide").style.transition = "2sec";
                                      document.getElementById("slide").style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowPricingSetting(false);
                                      }, 1000);
                                    } else {
                                      setOnDemandMedia(false);
                                      setShowRequest(false);
                                      setShowFeed(false);
                                      setShowSubscribers(false);
                                      setShowPricingSetting(!showPricingSetting);
                                      setShowNotification(false);
                                      setShowChatRoom(true);
                                      setPrivateChat(false);

                                      setTimeout(() => {
                                        if (document.getElementById("slide")) {
                                          document.getElementById("slide").style.transition = "1sec";
                                          document.getElementById("slide").style.right = "calc(100vw/5)";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Price Settings
                                </button>

                                {/* Podcasts button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                >
                                  Podcasts
                                </button>

                                {/* On-demand Audio button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    setShowRequest(false);
                                    setShowSubscribers(false);
                                    setShowPricingSetting(false);
                                    setShowNotification(false);
                                    setShowFeed(false);
                                    setShowChatRoom(false);
                                    setClubFloor(false);
                                    setPrivateChat(false);
                                    !onDemandMedia &&
                                      setOnDemandMedia(!onDemandMedia);
                                    getAllOnDemandMedia("audio");
                                  }}
                                >
                                  On-demand Audio
                                </button>

                                {/* On-demand Video button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    setShowRequest(false);
                                    setShowSubscribers(false);
                                    setShowPricingSetting(false);
                                    setShowNotification(false);
                                    setShowFeed(false);
                                    setShowChatRoom(false);
                                    setClubFloor(false);
                                    setPrivateChat(false);
                                    !onDemandMedia &&
                                      setOnDemandMedia(!onDemandMedia);
                                    getAllOnDemandMedia("video");
                                  }}
                                >
                                  On-demand Video
                                </button>

                                {/* On-demand Photos button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    setShowRequest(false);
                                    setShowSubscribers(false);
                                    setShowPricingSetting(false);
                                    setShowNotification(false);
                                    setShowFeed(false);
                                    setShowChatRoom(false);
                                    setClubFloor(false);
                                    setPrivateChat(false);
                                    !onDemandMedia &&
                                      setOnDemandMedia(!onDemandMedia);
                                    getAllOnDemandMedia("image");
                                  }}
                                >
                                  On-demand Photos
                                </button>
                              </div>

                              <br />

                              {/* Pay Per View Event label */}
                              <div
                                className="live-header top-option-medium"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                }}
                              >
                                Pay Per View Event
                              </div>

                              {/* Pay Per View Event buttons */}
                              <div className="control">
                                {/* Schedule Pay Per View button */}
                                <button style={{ minWidth: "208px" }}>
                                  Schedule Pay Per View
                                </button>

                                {/* Broadcast Vero Live PPV button */}
                                <button style={{ minWidth: "208px" }}>
                                  Broadcast Vero Live PPV
                                </button>

                                {/* Broadcast Vero Pre-recorded PPV button */}
                                <button style={{ minWidth: "208px" }}>
                                  Broadcast Vero Pre-recorded PPV
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {userInfo[0] && userInfo[0].communityClub !== 1 ? (
                                <div className="control">
                                  {/* 1 on 1 call button */}
                                  <button
                                    onClick={() => {
                                      if (oneOnOnecall) {
                                        document.getElementById("slideOOC").style.transition = "2sec";
                                        document.getElementById("slideOOC").style.right = "-100vw";

                                        setTimeout(() => {
                                          setOneOnOneCall(false);
                                        }, 1000);
                                      } else {
                                        setOneOnOneCall(!oneOnOnecall);
                                        setGroupCall(false);
                                        setRequestMessage(false);
                                        setVerifiedAutograph(false);
                                        setShowFeed(false);
                                        setShowSubscribeButton(false);

                                        setTimeout(() => {
                                          if (document.getElementById("slideOOC")) {
                                            document.getElementById("slideOOC").style.transition = "1sec";
                                            document.getElementById("slideOOC").style.right = "calc(100vw/5)";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    1 on 1 call
                                  </button>

                                  {/* Group call button */}
                                  <button
                                    onClick={() => {
                                      if (groupCall) {
                                        document.getElementById("slidegC").style.transition = "2sec";
                                        document.getElementById("slidegC").style.right = "-100vw";

                                        setTimeout(() => {
                                          setGroupCall(false);
                                        }, 1000);
                                      } else {
                                        setOneOnOneCall(false);
                                        setGroupCall(!groupCall);
                                        setRequestMessage(false);
                                        setVerifiedAutograph(false);
                                        setShowFeed(false);
                                        setShowSubscribeButton(false);

                                        setTimeout(() => {
                                          if (document.getElementById("slidegC")) {
                                            document.getElementById("slidegC").style.transition = "1sec";
                                            document.getElementById("slidegC").style.right = "calc(100vw/5)";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    {callRequest ? "Group call" : "Group call"}
                                  </button>

                                  {/* Message button */}
                                  <button
                                    onClick={() => {
                                      if (requestMessage) {
                                        document.getElementById("slideRM").style.transition = "2sec";
                                        document.getElementById("slideRM").style.right = "-100vw";

                                        setTimeout(() => {
                                          setRequestMessage(false);
                                        }, 1000);
                                      } else {
                                        setOneOnOneCall(false);
                                        setGroupCall(false);
                                        setRequestMessage(!requestMessage);
                                        setVerifiedAutograph(false);
                                        setShowFeed(false);
                                        setShowSubscribeButton(false);

                                        setTimeout(() => {
                                          if (document.getElementById("slideRM")) {
                                            document.getElementById("slideRM").style.transition = "1sec";
                                            document.getElementById("slideRM").style.right = "250px";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    Message
                                  </button>

                                  {/* Autograph button */}
                                  <button
                                    onClick={() => {
                                      if (verifiedAutograph) {
                                        document.getElementById("slideVA").style.transition = "2sec";
                                        document.getElementById("slideVA").style.right = "-100vw";

                                        setTimeout(() => {
                                          setVerifiedAutograph(false);
                                        }, 1000);
                                      } else {
                                        setOneOnOneCall(false);
                                        setGroupCall(false);
                                        setRequestMessage(false);
                                        setVerifiedAutograph(!verifiedAutograph);
                                        setShowFeed(false);
                                        setShowSubscribeButton(false);

                                        setTimeout(() => {
                                          if (document.getElementById("slideVA")) {
                                            document.getElementById("slideVA").style.transition = "1sec";
                                            document.getElementById("slideVA").style.right = "250px";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    Autograph
                                  </button>

                                  {/* Marketplace button */}
                                  <button>
                                    Marketplace
                                  </button>

                                  {/* Get Membership/Membership button */}
                                  <button
                                    onClick={() => {
                                      subscribe
                                        ? unSubscribeUser()
                                        : subscribeUser();
                                    }}
                                  >
                                    {subscribe
                                      ? "Membership"
                                      : "Get Membership"}
                                  </button>
                                </div>
                              ) : null}

                              {/* On-demand Media buttons */}
                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                On-demand Media
                              </div>

                              <div className="control">
                                {/* On-demand Audio button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (subscribe) {
                                      setShowRequest(false);
                                      setShowSubscribers(false);
                                      setShowPricingSetting(false);
                                      setShowNotification(false);
                                      setShowFeed(false);
                                      setShowChatRoom(false);
                                      setClubFloor(false);
                                      !onDemandMedia &&
                                        setOnDemandMedia(!onDemandMedia);
                                      getAllOnDemandMedia("audio");
                                    }
                                  }}
                                >
                                  On-demand Audio
                                </button>

                                {/* On-demand Video button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (subscribe) {
                                      setShowRequest(false);
                                      setShowSubscribers(false);
                                      setShowPricingSetting(false);
                                      setShowNotification(false);
                                      setShowFeed(false);
                                      setShowChatRoom(false);
                                      setClubFloor(false);
                                      !onDemandMedia &&
                                        setOnDemandMedia(!onDemandMedia);
                                      getAllOnDemandMedia("video");
                                    }
                                  }}
                                >
                                  On-demand Video
                                </button>

                                {/* On-demand Photos button */}
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (subscribe) {
                                      setShowRequest(false);
                                      setShowSubscribers(false);
                                      setShowPricingSetting(false);
                                      setShowNotification(false);
                                      setShowFeed(false);
                                      setShowChatRoom(false);
                                      setClubFloor(false);
                                      !onDemandMedia &&
                                        setOnDemandMedia(!onDemandMedia);
                                      getAllOnDemandMedia("image");
                                    }
                                  }}
                                >
                                  On-demand Photos
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* live events */}
                      <div className="channel-live-events">
                        <div
                          className="live-header live-events-medium"
                          style={{
                            backgroundColor: "#8249A0",
                            color: "white",
                          }}
                        >
                          Live Events
                        </div>
                        <div className="live-events" style={{ marginBottom: "10rem" }}>
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
                  : null
                }
              </div>
            </Fragment>
          </div>

          {/* non owner user */}
          {userInformation.username !== username ? (
            <div className="channel-user-content" style={{ flex: '0.8' }} >
              <div
                onmousedown={(event) => {
                  event.preventDefault
                    ? event.preventDefault()
                    : (event.returnValue = false);
                }}
                onDragStart={(e) => e.preventDefault()}
                className="channel-tabs shadow-sm"
                style={{
                  position: "sticky",
                  top: "3.5rem",
                  alignSelf: "flex-start",
                }}
              >
                <div className="tabs" style={{ margin: "0 0.5rem" }}>
                  {subscribe ?
                    <SoapboxTooltip title={clubFloor ? "Hide Feeds" : "Show Feeds"} placement="bottom">
                      <div>
                        <HiMenuAlt2
                          style={{
                            color: "#FFFFFF",
                            cursor: "pointer",
                            outline: "none",
                            fontSize: "1.4rem",
                            marginTop: "0.2rem"
                          }}
                          onClick={() => {
                            if (privateChat == false) {
                              setClubFloor(!clubFloor);
                              setMarketPlaceArea(false);
                            } else {
                              toast.success("Please close Private chat to view feeds");
                            }
                          }}
                        />
                      </div>
                    </SoapboxTooltip>
                    : null}

                  <span
                    style={{
                      backgroundColor: clubFloor ? "#8249A0" : "#A279BA",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      if (privateChat == false) {
                        setOneOnOneCall(false);
                        setGroupCall(false);
                        setRequestMessage(false);
                        setVerifiedAutograph(false);
                        setClubFloor(true);
                        setShowSubscribeButton(false);
                        setShowChatRoom(true);
                        setOnDemandMedia(false);
                      } else {
                        toast.success("Please close Private chat to view feeds");
                      }
                    }}
                    style={{ fontSize: "14px" }}
                  >
                    CLUB FLOOR
                  </span>

                  <span style={{ fontSize: "14px" }}>CLUB AMENITIES</span>
                  <span style={{ fontSize: "14px" }}>EVENTS</span>

                  <span>
                    <SoapboxTooltip title={"MARKETPLACE"} placement="bottom" privateTooltip={true}>
                      <img src={marketplaceicon} width="30px" />
                    </SoapboxTooltip>
                  </span>

                  <span 
                   onClick={() => {
                     resetChatView(userFullName)
                        if (!privateChatList) {
                          setPrivateChatList(!privateChatList)

                          setTimeout(() => {
                            if (
                              document.getElementById(
                                "privateChatList"
                              )
                            ) {
                              document.getElementById(
                                "privateChatList"
                              ).style.transition = "1sec";
                              document.getElementById(
                                "privateChatList"
                              ).style.right = "0.8rem";
                            }
                          }, 1);
                        } else {
                          document.getElementById(
                            "privateChatList"
                          ).style.transition = "1sec";
                          document.getElementById(
                            "privateChatList"
                          ).style.right = "-100vw";
                          setTimeout(() => {
                            setPrivateChatList(false)
                          }, 200);
                        }
                      }}>
                    <SoapboxTooltip title={"CHATHIVE"} placement="bottom" privateTooltip={true}>
                      <img src={messagesicon} width="30px" 
                      />
                        
                    </SoapboxTooltip>
                    <span style={{ fontSize: "14px",marginLeft:'-6px' }}>CHATHIVE </span>
                   
                  </span>
                  {chatUnview!==0?<div className="notify-num"  onClick={() => {
                   
                    resetChatView(userFullName)
                        if (!privateChatList) {
                          setPrivateChatList(!privateChatList)

                          setTimeout(() => {
                            if (
                              document.getElementById(
                                "privateChatList"
                              )
                            ) {
                              document.getElementById(
                                "privateChatList"
                              ).style.transition = "1sec";
                              document.getElementById(
                                "privateChatList"
                              ).style.right = "0.8rem";
                            }
                          }, 1);
                        } else {
                          document.getElementById(
                            "privateChatList"
                          ).style.transition = "1sec";
                          document.getElementById(
                            "privateChatList"
                          ).style.right = "-100vw";
                          setTimeout(() => {
                            setPrivateChatList(false)
                          }, 200);
                        }
                      }}>{chatUnview}</div>:null}
                  <span onClick={() => setInviteBox(true)}>
                    <SoapboxTooltip title={"Invite"} placement="bottom" privateTooltip={true}>
                      <img src={inviteicon} width="30px" />
                    </SoapboxTooltip>
                  </span>

                  <span>
                    <SoapboxTooltip title={"Club Rules"} placement="bottom" privateTooltip={true}>
                      <img
                        src={rules}
                        width="30px"
                        onClick={() => {
                          if (showClubRules) {
                            document.getElementById(
                              "slideCR"
                            ).style.transition = "2sec";
                            document.getElementById("slideCR").style.right =
                              "-100vw";

                            setTimeout(() => {
                              setShowClubRules(false);
                            }, 1000);
                          } else {
                            setShowClubRules(true),
                              setOnDemandMedia(false),
                              setShowCreateHoot(false),
                              setShowRequest(false);
                            setShowFeed(false);
                            setShowSubscribers(false);
                            setShowPricingSetting(false);
                            setShowNotification(false);
                            setShowChatRoom(true);

                            setTimeout(() => {
                              if (document.getElementById("slideCR")) {
                                document.getElementById(
                                  "slideCR"
                                ).style.transition = "1sec";
                                document.getElementById("slideCR").style.right =
                                  "150px";
                              }
                            }, 1);
                          }
                        }}
                      />
                    </SoapboxTooltip>
                  </span>

                  <SoapboxTooltip title={"Create Breakoff Chat"} placement="bottom">
                    <span style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#FFF',
                      fontSize: "1.5rem"
                    }}
                      onClick={() => {
                        if (userInfo[0].communityClub == 1) {
                          if (subscribe || userInformation.username == username) {
                            if (showBreakoffForm) {
                              document.getElementById("showBreakoffFormId").style.transition =
                                "2s";
                              document.getElementById("showBreakoffFormId").style.right = "-100vw";

                              setTimeout(() => {
                                setShowBreakoffForm(false);
                              }, 1000);
                            } else {
                              setShowBreakoffForm(true);

                              setTimeout(() => {
                                if (document.getElementById("showBreakoffFormId")) {
                                  document.getElementById("showBreakoffFormId").style.transition =
                                    "1s";
                                  document.getElementById("showBreakoffFormId").style.right =
                                    "30%";
                                }
                              }, 1);
                            }
                          } else { toast.success('Members Only Access') }
                        } else {
                          toast.success('BreakOff Chat can be accessible only in Community Clubs')
                        }
                      }}
                    >
                      <BsPlusCircleFill />
                    </span>
                  </SoapboxTooltip>

                  <span
                    id="chatRoomopen"
                    onClick={() => {
                      setOneOnOneCall(false);
                      setGroupCall(false);
                      setRequestMessage(false);
                      setVerifiedAutograph(false);
                      setShowFeed(true);
                      setShowSubscribeButton(false);
                      setShowChatRoom(!showChatRoom);
                      setOnDemandMedia(false);
                      socket.emit("room", userInfo[0].username);
                     
                    }}
                    style={{ display: "none" }}
                  >
                    CLUB CHAT
                  </span>
                </div>
              </div>

              {inviteBox
                ? <MyVerticallyCenteredModal
                  title={"Invitation"}
                  closeModal={() => setInviteBox(false)}
                  clubname={userInfo[0].communityClub == 1 ? username : `${userInfo[0].name}'s Private `}
                  clublink={`https://megahoot.net/${uuidv4()}/private/Club/${username}/${uuidv4()}`}
                  username={userFullName}
                  show={inviteBox}
                  inviteRoute="inviteHandlerClub"
                  mailText={"You Have Been Invited to a Soapbox Club"}
                  onHide={() => setInviteBox(false)}
                />
                : null}
                 {inviteBoxChat
                ? <MyVerticallyCenteredModal
                  title={"Invitation"}
                  closeModal={() => setInviteBoxChat(false)}
                  clubname={userInfo[0].communityClub == 1 ? username : `${userInfo[0].name}'s Private `}
                  clublink={`https://megahoot.net/profile/${username}`}

                  username={userFullName}
                  show={inviteBoxChat}
                  inviteRoute="inviteHandlerChat"
                  mailText={"You've Been Invited to a MegaHoot Soapbox Private Chat"}
                  onHide={() => setInviteBox(false)}
                />
                : null}

              {scheduleBox
                ? <MyVerticallyCenteredScheduler
                  title={"Schedule an event"}
                  closeModal={() => setScheduleBox(false)}
                  clubname={userInfo[0].communityClub == 1 ? username : `${userInfo[0].name}'s Private `}
                  clublink={`https://megahoot.net/${uuidv4()}/private/Club/${username}/${uuidv4()}`}
                  username={userInformation.username}
                  fullName={userFullName}
                  sumitChatData={(data) => { sumitChatDataFromScheduler(data) }}
                  show={scheduleBox}
                  onHide={() => setScheduleBox(false)}
                /> : null}

{showReply?<ReplyModal sendReplyToChat={(data)=>{sendReplyToChat(data)}} data={replyData} onHide={() => setShowReply(false)} show={showReply} />:null}

              {showClubRules ? (
                <SoapboxPrivateClubRules setShowClubRules={setShowClubRules} />
              ) : null}

              {showBreakoffForm
                ? <div className="showBreakoffForm" id="showBreakoffFormId">
                  <h5>Enter The Topic for BreakOff Chat</h5>
                  <div style={{ padding: '33px', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> <input placeholder="Enter Topic" value={breakOffInput} onChange={(e) => {
                    setBreakOffInput(e.target.value);
                  }} />
                    <button className="d-grid col-12 btn-main login-form-button" style={{ position: 'absolute', right: '0' }}
                      onClick={() => {
                        if (breakOffInput) { createBreakoff() } else {
                          toast.success(
                            "Please Enter Topic for Breakoff chat"
                          );
                        }

                      }}
                    >Create Now</button>
                  </div>

                </div>
                : null}

              {oneOnOnecall ? (
                <div className="slide-container">
                  <div
                    id="slideOOC"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      borderRadius: "0.5rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slideOOC-class"
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                          margin: "0.5rem"
                        }}
                        onClick={() => {
                          document.getElementById("slideOOC").style.transition = "2sec";
                          document.getElementById("slideOOC").style.right = "-100vw";

                          setTimeout(() => {
                            setShowSubscribeButton(false);
                            setOneOnOneCall(false);
                          }, 1000);
                        }}
                      />
                    </span>

                    <div style={{ flex: "0.7" }}>
                      {" "}
                      <img
                        src={oneonone}
                        width="100%"
                        style={{
                          borderRadius: "0.5rem",
                          boxShadow: "rgb(50 50 105 / 15%) 0px 2px 5px 0px, rgb(0 0 0 / 5%) 0px 1px 1px 0px"
                        }}
                      />

                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify',
                          marginTop: "0.5rem"
                        }}
                      >
                        MegaHoot Soapbox recommends that members use the XMG
                        Payment Portal to purchase Virtual Experiences and
                        digital items in the Fortis Marketplace. This is the one
                        way that we can fully protect all Members and Club
                        Owners from fraud. XMG Coins can be purchased from your
                        XMG Wallet at www.megahoot.org. If you do not have one
                        it's very simple to create your XMG Wallet.
                      </p>

                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify'
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>

                    <Form style={{ padding: "0.5rem 1rem !important", flex: "0.3" }}
                      className="login-form mx-auto p-4 pb-0"
                    >
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request 1 on 1 call
                      </p>

                      <button
                        disabled={oneOnOnecallPrice == 0 ? true : false}
                        className="d-grid col-12 btn-main login-form-button"
                        variant="primary"
                        type="submit"
                      >
                        Request Now for {oneOnOnecallPrice} XMG
                      </button>
                    </Form>
                  </div>
                </div>
              ) : null}

              {showIframe ? (
                <div className="slide-container">
                  <div
                    id="slideIFM"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      width: '100%',
                      overflowY: 'scroll',
                      height: '100vh',
                    }}
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                        }}
                        onClick={() => {
                          document.getElementById("slideIFM").style.transition = "2sec";
                          document.getElementById("slideIFM").style.right = "-100vw";

                          setClubFloor(true);
                          setTimeout(() => {
                            setShowIframe(false);
                          }, 500);
                        }}
                      />
                    </span>

                    <iframe
                      src={iframeBox.src}
                      allow={`camera ${iframeBox.src}; microphone ${iframeBox.src}`}
                      title={iframeBox.title}
                      width="100%"
                      height="100%"
                    >
                    </iframe>
                  </div>
                </div>
              ) : null}

              {showSubscribeButton ? (
                <div className="slide-container">
                  <div
                    id="slideSSB"
                    style={{
                      display: "flex",
                      flexDirection: subscribe ? "column" : "row",
                      justifyContent: "center",
                      alignItems: subscribe ? "center" : "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      borderRadius: "0.5rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slideSSB-class"
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                          margin: "0.5rem"
                        }}
                        onClick={() => {
                          document.getElementById("slideSSB").style.transition = "2sec";
                          document.getElementById("slideSSB").style.right = "-100vw";

                          setTimeout(() => {
                            setShowSubscribeButton(false);
                          }, 1000);
                        }}
                      />
                    </span>

                    <div style={{ flex: "0.7" }}>
                      {" "}
                      <img
                        src={membershipGraphic}
                        width="100%"
                        style={{
                          borderRadius: "0.5rem",
                          maxWidth: "400px",
                          boxShadow: "rgb(50 50 105 / 15%) 0px 2px 5px 0px, rgb(0 0 0 / 5%) 0px 1px 1px 0px"
                        }}
                      />

                      {!subscribe ? (
                        <div>
                          <p
                            style={{
                              maxWidth: "390px",
                              lineHeight: "1.6rem",
                              fontSize: "smaller",
                              textAlign: 'justify',
                              marginTop: "0.5rem"
                            }}
                          >
                            MegaHoot Soapbox recommends that members use the XMG
                            Payment Portal to purchase Virtual Experiences and
                            digital items in the Fortis Marketplace. This is the
                            one way that we can fully protect all Members and
                            Club Owners from fraud. XMG Coins can be purchased
                            from your XMG Wallet at www.megahoot.org. If you do
                            not have one it's very simple to create your XMG
                            Wallet.
                          </p>

                          <p
                            style={{
                              maxWidth: "390px",
                              lineHeight: "1.6rem",
                              fontSize: "smaller",
                              textAlign: 'justify'
                            }}
                          >
                            Alternatively we do give the option for members to
                            use their credit card via our credit card processing
                            partners Stripe for convenience.
                          </p>
                        </div>
                      ) : null}
                    </div>

                    {!subscribe ? (
                      <Form style={{ padding: "0.5rem 1rem !important", flex: "0.3" }}
                        className="login-form mx-auto p-4 pb-0"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <p
                          className="text-center mb-1 signup-head"
                          style={{ fontSize: "smaller" }}
                        >
                          {!subscribe
                            ? `Request Membership`
                            : `Already a Member`}
                        </p>

                        <form
                          method="POST"
                          action="https://megahoot.org/mh_api_checkout.php"
                          target="_blank"
                        >
                          <input
                            type="hidden"
                            name="mid"
                            value="SB7MQws35cr7x4tDnAdyKyx0grdOx3yEWi736OKuExjPXVrPF9TKYTvOLxJJl6UyrMz4yFSBahDVF1l3eKgZHf4W1k4TM34hAak1GDnM6RgcN6VqaTJreY8vL8NV7ewvEAf14Voigb3U"
                          />

                          <input
                            type="hidden"
                            name="inv"
                            value={currentInvoice}
                          />

                          <input
                            type="hidden"
                            name="subtotal"
                            value={subscribePrice}
                          />

                          <input type="hidden" name="curr" value="XMG" />

                          <input type="hidden" name="tp[]" value="1" />

                          <input
                            type="hidden"
                            name="name[]"
                            value={`${userInfo[0].name}'s Club Membership`}
                          />

                          <input
                            type="hidden"
                            name="amount[]"
                            value={subscribePrice}
                          />

                          <input type="hidden" name="q[]" value="1" />

                          <input
                            type="submit"
                            id="redirectToPayment"
                            value="Proceed to checkout"
                            className="primary block"
                            style={{
                              display: "none",
                              padding: "5px",
                              backgroundColor: "rgb(241, 195, 89)",
                              borderRadius: "5px",
                              color: "black",
                            }}
                          />
                        </form>

                        {userInfo[0].communityClub == 1 ? (
                          <button
                            onClick={() => {
                              addMembershipInDb(username, 0, "", "", 1);
                            }}
                            className="d-grid col-12 btn-main login-form-button"
                            variant="primary"
                          >
                            {!subscribe
                              ? `Activate Membership `
                              : `Already a Member`}
                          </button>
                        ) : (
                          <div>
                            <button
                              onClick={() => {
                                dataUploaderForOrder();
                              }}
                              className="d-grid col-12 btn-main login-form-button"
                              variant="primary"
                              type="submit"
                            >
                              {!subscribe
                                ? `Get Membership Now for ${subscribePrice} USD/Month`
                                : `Already a Member`}
                            </button>

                            <br></br>

                            <button
                              onClick={() => {
                                verifyOrder(username);
                              }}
                              className="d-grid col-12 btn-main login-form-button"
                              variant="primary"
                              type="submit"
                            >
                              {!subscribe
                                ? `Activate Services If Paid Already`
                                : `Already a Member`}
                            </button>

                            <p className="get-membership-or">Or</p>

                            <button
                              onClick={() => {
                                history.push({
                                  pathname: `/${uuidv4()}/Payments/${uuidv4()}`,
                                  state: {
                                    amount: subscribePrice * 100,
                                    currency: "usd",
                                    member: userInformation.username,
                                    owner: username,
                                    returnUrl: `https://megahoot.net/${uuidv4()}/private/Club/${username}/${uuidv4()}`,
                                    receipt_email: userEmail,
                                  },
                                });
                              }}
                              className="d-grid col-12 btn-main login-form-button"
                              variant="primary"
                            >
                              Pay via Card
                            </button>
                          </div>
                        )}

                        {/* <StripePage storeDbData={{owner:username,
            member:userInformation.username,
            price:subscribePrice}} data={{amount:subscribePrice*100,currency:"usd"}} returnUrl={`/${uuidv4()}/private/Club/${username}/${uuidv4()}`} /> */}
                      </Form>
                    ) : (
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        {!subscribe ? `Request Membership` : `Already a Member`}
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {groupCall ? (
                <div className="slide-container">
                  <div
                    id="slidegC"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      borderRadius: "0.5rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slidegC-class"
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                          margin: "0.5rem"
                        }}
                        onClick={() => {
                          document.getElementById("slidegC").style.transition = "2sec";
                          document.getElementById("slidegC").style.right = "-100vw";

                          setTimeout(() => {
                            setShowSubscribeButton(false);
                            setGroupCall(false);
                          }, 1000);
                        }}
                      />
                    </span>

                    <div style={{ flex: "0.7" }}>
                      {" "}
                      <img
                        src={groupcall}
                        width="100%"
                        style={{
                          borderRadius: "0.5rem",
                          boxShadow: "rgb(50 50 105 / 15%) 0px 2px 5px 0px, rgb(0 0 0 / 5%) 0px 1px 1px 0px"
                        }}
                      />

                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify',
                          marginTop: "0.5rem"
                        }}
                      >
                        MegaHoot Soapbox recommends that members use the XMG
                        Payment Portal to purchase Virtual Experiences and
                        digital items in the Fortis Marketplace. This is the one
                        way that we can fully protect all Members and Club
                        Owners from fraud. XMG Coins can be purchased from your
                        XMG Wallet at www.megahoot.org. If you do not have one
                        it's very simple to create your XMG Wallet.
                      </p>

                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify'
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>

                    <Form style={{ padding: "0.5rem 1rem !important", flex: "0.3" }}
                      className="login-form mx-auto p-4 pb-0"
                    >
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request Group call
                      </p>

                      <button
                        disabled={groupCallPrice == 0 ? true : false}
                        className="d-grid col-12 btn-main login-form-button"
                        variant="primary"
                        type="submit"
                      >
                        Request Now for {groupCallPrice} XMG
                      </button>
                    </Form>{" "}
                  </div>
                </div>
              ) : null}

              {requestMessage ? (
                <div className="slide-container">
                  <div
                    id="slideRM"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      borderRadius: "0.5rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slideRM-class"
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                          margin: "0.5rem"
                        }}
                        onClick={() => {
                          document.getElementById("slideRM").style.transition = "2sec";
                          document.getElementById("slideRM").style.right = "-100vw";

                          setTimeout(() => {
                            setShowSubscribeButton(false);
                            setRequestMessage(0);
                          }, 1000);
                        }}
                      />
                    </span>

                    <div style={{ flex: "0.7" }}>
                      <img
                        src={personalmessage}
                        width="100%"
                        style={{
                          borderRadius: "0.5rem",
                          boxShadow: "rgb(50 50 105 / 15%) 0px 2px 5px 0px, rgb(0 0 0 / 5%) 0px 1px 1px 0px"
                        }}
                      />

                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify',
                          marginTop: "0.5rem"
                        }}
                      >
                        MegaHoot Soapbox recommends that members use the XMG
                        Payment Portal to purchase Virtual Experiences and
                        digital items in the Fortis Marketplace. This is the one
                        way that we can fully protect all Members and Club
                        Owners from fraud. XMG Coins can be purchased from your
                        XMG Wallet at www.megahoot.org. If you do not have one
                        it's very simple to create your XMG Wallet.
                      </p>
                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify'
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>

                    <Form style={{ padding: "0.5rem 1rem !important", flex: "0.3" }}
                      className="login-form mx-auto p-4 pb-0"
                    >
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request Personal Message
                      </p>

                      <button
                        disabled={requestMessagePrice == 0 ? true : false}
                        className="d-grid col-12 btn-main login-form-button"
                        variant="primary"
                        type="submit"
                      >
                        Request Now for {requestMessagePrice} XMG
                      </button>
                    </Form>
                  </div>
                </div>
              ) : null}

              {verifiedAutograph ? (
                <div className="slide-container">
                  <div
                    id="slideVA"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      borderRadius: "0.5rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slideVA-class"
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                          margin: "0.5rem"
                        }}
                        onClick={() => {
                          document.getElementById("slideVA").style.transition = "2sec";
                          document.getElementById("slideVA").style.right = "-100vw";

                          setTimeout(() => {
                            setShowSubscribeButton(false);
                            setVerifiedAutograph(0);
                          }, 1000);
                        }}
                      />
                    </span>

                    <div style={{ flex: "0.7" }}>
                      <img
                        src={groupcall}
                        width="100%"
                        style={{
                          borderRadius: "0.5rem",
                          boxShadow: "rgb(50 50 105 / 15%) 0px 2px 5px 0px, rgb(0 0 0 / 5%) 0px 1px 1px 0px"
                        }}
                      />

                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify',
                          marginTop: "0.5rem"
                        }}
                      >
                        MegaHoot Soapbox recommends that members use the XMG
                        Payment Portal to purchase Virtual Experiences and
                        digital items in the Fortis Marketplace. This is the one
                        way that we can fully protect all Members and Club
                        Owners from fraud. XMG Coins can be purchased from your
                        XMG Wallet at www.megahoot.org. If you do not have one
                        it's very simple to create your XMG Wallet.
                      </p>
                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "1.6rem",
                          fontSize: "smaller",
                          textAlign: 'justify'
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>

                    <Form style={{ padding: "0.5rem 1rem !important", flex: "0.3" }}
                      className="login-form mx-auto p-4 pb-0"
                    >
                      <h5
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request Verified Autograph
                      </h5>

                      <button
                        disabled={verifiedAutographPrice == 0 ? true : false}
                        className="d-grid col-12 btn-main login-form-button"
                        variant="primary"
                        type="submit"
                      >
                        Request Now for {verifiedAutographPrice} XMG
                      </button>
                    </Form>
                  </div>
                </div>
              ) : null}

              {/* channel-media */}
              {subscribe ? (
                <div
                  className="channel-media"
                  id="feed"
                  style={{ display: "flex", transition: "1s" }}
                >
                  {clubFloor
                    ? uploads && (
                      <div style={{ flex: "0.5" }}>
                        <InfiniteScroll
                          dataLength={uploads.length}
                          next={fetchMoreHoots}
                          hasMore={hasMore}
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
                                />
                              </div>
                            );
                          })}
                        </InfiniteScroll>
                      </div>
                    ) : null}


{marketPlaceArea ? (
                <FortisMarketplaceArea />
              ) : null}

                  {privateChat ? (
                    <div className="privateChat-club" id="privatechatslide">
                      <div
                        className="live-header"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#8149a06c",
                          color: "white",
                          borderRadius: "3px",
                          maxWidth: "440px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {privateChatPerson &&
                            privateChatPerson.profilePic ? (
                            <img
                              src={privateChatPerson.profilePic}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "15px",
                              }}
                            />
                          ) : null}
                          <p
                            style={{
                              fontWeight: "400",
                              fontSize: "0.93rem",
                              marginTop: "12px",
                            }}
                          >
                            {privateChatPerson.name}
                          </p>
                        </span>

                        <span>
                          Private Chat
                          <FaWindowClose
                            className="FaWindowClose"
                            onClick={() => {
                              document.getElementById(
                                "privatechatslide"
                              ).style.transition = "2sec";
                              document.getElementById(
                                "privatechatslide"
                              ).style.right = "-100vw";

                              setTimeout(() => {
                                setPrivateChat(false);
                                setClubFloor(true);
                                setShowChatRoom(true)
                              }, 200);
                            }}
                          />
                        </span>
                      </div>

                      <div
                        className="chatarea"
                        style={{
                          marginTop: VideoAvailable ? "300px" : "0px",
                          zIndex: "-1",
                        }}
                      >
                        {chatDataPrivate.length
                          ? chatDataPrivate.map((e) => (
                            <div
                              className="messageBox"
                            
                            
                            >
                              <div className="ProfileBox"   onClick={() => {
                                setPrivateChat(true);
                                setClubFloor(false);

                                setTimeout(() => {
                                  if (
                                    document.getElementById(
                                      "privatechatslide"
                                    )
                                  ) {
                                    document.getElementById(
                                      "privatechatslide"
                                    ).style.transition = "1sec";
                                    document.getElementById(
                                      "privatechatslide"
                                    ).style.right = "30px";
                                  }
                                }, 1);
                              }}>
                                <img
                                  className="chat-profile"
                                  src={e.imgSrc ? e.imgSrc : null}
                                />
                                <p>{e.chatname}</p>
                                <p className="timestamp"> {e.timestamp}</p>
                              </div>
                              <Linkify
                                componentDecorator={(
                                  decoratedHref,
                                  decoratedText,
                                  key
                                ) => (
                                  <a
                                    target="blank"
                                    href={decoratedHref}
                                    key={key}
                                  >
                                    {decoratedText}
                                  </a>
                                )}
                              >
                                {" "}
                                <div
                                  className={
                                    e.isEmoji ? "message-emoji" : "message"
                                  }
                                >
                                  {!e.isVideo && !e.isImage
                                    ? e.message
                                    : null}
                                </div>
                              </Linkify>
                           
                              {e.isVideo ? (
                                <video
                                  onDragStart={(e) => e.preventDefault()}
                                  onmousedown={(event) => {
                                    event.preventDefault
                                      ? event.preventDefault()
                                      : (event.returnValue = false);
                                  }}
                                  style={{
                                    maxWidth: "200px",
                                    marginTop: "20px",
                                    borderRadius: "5px",
                                  }}
                                  controls={true}
                                  src={e.message}
                                ></video>
                              ) : null}

                              {e.isImage ? (
                                <img
                                  src={e.message}
                                  onDragStart={(e) => e.preventDefault()}
                                  onmousedown={(event) => {
                                    event.preventDefault
                                      ? event.preventDefault()
                                      : (event.returnValue = false);
                                  }}
                                  style={{
                                    maxWidth: e.isSticker ? "60px" : "200px",
                                    marginTop: "20px",
                                    borderRadius: "5px",
                                  }}
                                />
                              ) : null}
                            </div>
                          ))
                          : null}

   {srcPrivate && mimeTypePrivate.substr(0, 5) == "image" ? (
                        <div className="messageBox">
                          <img
                            src={srcPrivate}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "-10px",
                            }}
                          />
                          <button
                            onClick={() => {
                              uploadPrivate(filePrivate, filePrivate.type);
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}

                      {srcPrivate && mimeTypePrivate.substr(0, 5) == "video" ? (
                        <div className="messageBox">
                          <video
                            src={srcPrivate}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "-10px",
                            }}
                            className="messageBox"
                          />
                          <button
                            onClick={() => {
                              uploadPrivate(filePrivate, filePrivate.type);
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}
                        {emojiPickerPrivate && (
                          <ClickAwayListener
                            onClickAway={() => {
                              setEmojiPickerPrivate(false);
                            }}
                          >
                            <div>
                              <Picker
                                native
                                onEmojiClick={(event, emojiObject) => {
                                  setMessageInboxValuePrivate(
                                    messageInboxValuePrivate + emojiObject.emoji
                                  );
                                  // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                  //  // socket.emit('send',message);
                                  // socket.emit('send', {
                                  //     name: userFullName,
                                  //     message: emojiObject.emoji,
                                  //     profilePic: userProfilePic,
                                  //     isEmoji: true
                                  // });
                                }}
                                pickerStyle={{
                                  position: "absolute",
                                  bottom: "0px",
                                  left: "0.2rem",
                                  zIndex: "1111",
                                }}
                              />
                            </div>
                          </ClickAwayListener>
                        )}

{stickerPickerPrivate ? <div style={{
                       position: "sticky",
                       bottom: "0px",
                        bottom: "3rem",
                        left: "0.5rem",
                        backgroundColor: '#652C90',
                        borderRadius: '5px',
                        padding: '8px',
                        zIndex: "1111", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap'
                      }}>
                        {stickersImages.map((image) => <img src={image}
                          onClick={() => {
                            let today = new Date();
                            let message=image;
                            let threadId = uuidv4()
                                let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
                              
                            appendPrivate(
                              userFullName,
                              `${image}`,
                              "left",
                              `${BaseURL}/profile-pictures/${userProfilePic}`,
                              false,
                              timestamp,
                              false,
                              true,true
                            );
                            // socket.emit("send", {
                            //   name: userFullName,
                            //   message: `${image}`,
                            //   profilePic: userProfilePic,
                            //   isEmoji: false,
                            //   isVideo: false,
                            //   isImage: true,
                            //   isSticker: true
                            // });
                           
                            socket.emit("private-message-soapbox", {
                              threadId:threadId,
                              to: privateChatPerson.name,
                              from: userFullName,
                              isClub: 0,
                              isPrivate: 1,
                              isCommunity: 0,
                              name: userFullName,
                              message: message,
                              profilePic: userProfilePic,
                              isEmoji: false,
                              isSticker:true,
                              isImage:true,
                              timestamp: timestamp
                            });
                            setStickerPickerPrivate(false)
                          }}
                          style={{ width: '70px', minWidth: '70px', minHeight: '70px', margin: '5px', cursor: 'pointer', backgroundColor: 'whitesmoke', padding: '5px' }} />)}
                      </div> : null
                      }
                      </div>

                      <div className="send-private" >
                        <ReactTooltip />
                        <form
                          action="#"
                          id="send-container"
                          style={{ marginLeft: privateChat ? "5px" : "5px" }}
                          onSubmit={(e) => messagesubmitPrivate(e,privateChatPerson,userProfilePic,userFullName)}
                        >
                          <label htmlFor="post-video">
                            <SoapboxTooltip title={"Share Video"} placement="top">
                              <img
                                src={videochat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                width="27px"
                              />
                            </SoapboxTooltip>
                          </label>
                          <input
                            type="file"
                            id="post-video"
                            name="video"
                            accept="video/*"
                            onChange={handleFilePrivate}
                            disabled={false}
                            hidden
                          />

                          <label htmlFor="post-image">
                            <SoapboxTooltip title={"Share Photos"} placement="top">
                              <img
                                src={imagechat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                width="27px"
                              />
                            </SoapboxTooltip>
                          </label>
                          <input
                            type="file"
                            id="post-image"
                            name="image"
                            accept="image/*"
                            onChange={handleFilePrivate}
                            hidden
                            disabled={false}
                          />

                          <SoapboxTooltip title={"Share File"} placement="top">
                            <img
                              src={filechat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              width="27px"
                            />
                          </SoapboxTooltip>
                          <SoapboxTooltip title={"Stickers"} placement="top">
                            <img
                              src={stickerIcon}
                              style={{ width: '25px', padding: '3px', borderRadius: '15px', margin: "5px", cursor: "pointer", backgroundColor: '#8249A0' }}
                              onClick={() => {
                                setStickerPickerPrivate(!stickerPickerPrivate);
                              }}
                            />
                          </SoapboxTooltip>

                          <SoapboxTooltip title={"Emoji"} placement="top">
                            <img
                              src={emojiIcon}
                              style={{ margin: "5px", cursor: "pointer" }}
                              onClick={() => {
                                setEmojiPickerPrivate(!emojiPickerPrivate);
                              }}
                              width="27px"
                            />
                          </SoapboxTooltip>

                          <input
                            type="text"
                            name="messageInp"
                            value={messageInboxValuePrivate}
                            autoComplete="off"
                            id="messageInp"
                            style={{ width: privateChat ? "230px" : "230px" }}
                            onChange={(e) => {
                              setMessageInboxValuePrivate(e.target.value);
                            }}
                          />

                          <button
                            type="submit"
                            style={{
                              border: "none",
                              outline: "none",
                              background: "none",
                              marginLeft: "5px",
                            }}
                          >
                            <SoapboxTooltip title={"Send Message"} placement="top" >
                              <img src={sendIcon} width="27px" />
                            </SoapboxTooltip>
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : null}

                  {privateChatList
                    ? <div className="privateChatListBox" id="privateChatList">
                      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}} >
                   
                      <h5 style={{
                          textAlign: 'center',
                          fontSize: '0.93rem',
                          fontWeight: '600',
                          margin: '0.5rem 0',
                          borderRadius: '5px',
                          padding: '0.5rem',
                          width: '100%',
                          backgroundColor: "whitesmoke"
                        }}
                        >
                            <img
                      
                      src={chathive}
                      className="chativelogo"
                    />
                    ChatHive
                        </h5>
                        <button className="closebtn" onClick={() => {
                          if (!privateChatList) {
                            setPrivateChatList(!privateChatList)
                          
                            setTimeout(() => {
                              if (document.getElementById("privateChatList")) {
                                document.getElementById("privateChatList").style.transition = "1sec";
                                document.getElementById("privateChatList").style.right = "0.8rem";
                              }
                            }, 1);
                          } else {
                            document.getElementById("privateChatList").style.transition = "1sec";
                            document.getElementById("privateChatList").style.right = "-100vw";

                            setTimeout(() => {
                              setPrivateChatList(false)
                            }, 200);
                          }
                        }}>X</button>
                      </div>
                      <InboxMessage setInviteBox={()=>{setInviteBoxChat(true)}} socket={socket} actualUsername={userInformation.username} username={userFullName} openPrivateChatfromInbox={(e)=>{openPrivateChatfromInbox(e)}} />
                    </div>
                    : null
                  }

                  {/* ------------------- Chat Container newly style added here ------------------- */}
                  {showChatRoom ? (
                    <div
                      className="container"
                      style={{
                        // left: clubFloor || privateChat ? "20px" : "100px",
                        // width: clubFloor || privateChat ? "40%" : "80%",

                        // minWidth: clubFloor || privateChat ? "500px" : "700px",
                        transition: "1s",
                        marginTop: "0.4rem",
                        backgroundColor: "#EDEDFF",
                        border: "2px solid #D9D2FA",
                        overflowX: "hidden",
                        maxHeight: '80vh',
                        flex: clubFloor ? "0.5" : "1",
                        maxWidth:clubFloor ? "500px" : "60vw"
                      }}
                    >
                      <div
                        className="live-header"
                        style={{
                          // backgroundColor: "#C1A9D5",
                          // color: "white",
                          // borderRadius: "3px",
                          // marginLeft: "-15px",
                          // marginTop: "-33px",
                          // display: "flex",
                          // flexDirection: "column",
                          // alignItems: "center",
                          // position: "fixed",
                          // width: "25%",
                          // minWidth: clubFloor || privateChat ? "450px" : "650px",
                          // zIndex: "5",

                          margin: 0,
                          backgroundColor: "#8249A0",
                          color: "white",
                          // borderRadius: "3px",
                          // marginLeft: "-35px",
                          // marginTop: "-35px",
                          display: "flex",
                          // flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // position: "fixed",
                          // width: "25%",
                          // minWidth: clubFloor || privateChat ? "450px" : "650px",
                          // minWidth: "inherit",
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          padding: "0.5rem",
                          gap: "0.5rem",
                          zIndex: "5",
                        }}
                      >
                        {" "}
                        <span>
                          {userInfo[0] && userInfo[0].name}'s Club Chat
                        </span>
                        <div style={{
                          display: 'flex', justifyContent: 'space-between',
                          width: '88px', flexDirection: 'row'
                        }}>
                          <SoapboxTooltip title={"Invite"} placement="bottom">
                            <span style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                              backgroundColor: '#dcd5fa',
                              color: "#8249A0",
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              // marginLeft: '15px',
                              fontSize: '1rem'
                            }}
                              onClick={() => setInviteBox(true)}
                            >
                              <Share />
                            </span>
                          </SoapboxTooltip>
                          <SoapboxTooltip title={"Schedule Event"} placement="top">
                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#dcd5fa',
                                color: "#8249A0",
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                // marginLeft: '15px',
                                fontSize: '1.1rem'
                              }}
                              onClick={() => { setScheduleBox(!scheduleBox) }}
                            >
                              <RiCalendarEventLine />
                            </span>
                          </SoapboxTooltip>
                          <SoapboxTooltip title={"Create Poll"} placement="top">
                            <span
                              onClick={() => {
                                if (showPollForm) {
                                  document.getElementById("showPollFormId").style.transition = "2s";
                                  document.getElementById("showPollFormId").style.left = "200vw";

                                  setTimeout(() => {
                                    setShowPollForm(false);
                                  }, 1000);
                                } else {
                                  setShowPollForm(true);

                                  setTimeout(() => {
                                    if (document.getElementById("showPollFormId")) {
                                      document.getElementById("showPollFormId").style.transition = "1s";
                                      document.getElementById("showPollFormId").style.left = "70px";
                                    }
                                  }, 1);
                                }
                              }}
                              style={{
                                // display: 'flex', 
                                // justifyContent: 'center',
                                // alignItems: 'center', 
                                // cursor: 'pointer', 
                                // backgroundColor: '#CF2128', 
                                // width: '22px', 
                                // height: '22px', 
                                // borderRadius: '27px', 
                                // marginLeft: '15px',
                                // fontSize: '18px'

                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#dcd5fa',
                                color: "#8249A0",
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                // marginLeft: '15px',
                                fontSize: '1.1rem'
                              }}
                            >
                              <RiBookmark3Line />
                            </span>
                          </SoapboxTooltip></div>
                      </div>

                      {showPollForm
                        ? <div className="showPollForm" id="showPollFormId">
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: '#652C90'
                            }}
                          >
                            <h5>Create A Poll</h5>
                            <FaWindowClose className="FaWindowClose" onClick={() => {
                              if (showPollForm) {
                                document.getElementById("showPollFormId").style.transition = "2s";
                                document.getElementById("showPollFormId").style.left = "200vw";

                                setTimeout(() => {
                                  setShowPollForm(false);
                                }, 1000);
                              } else {
                                setShowPollForm(true);

                                setTimeout(() => {
                                  if (document.getElementById("showPollFormId")) {
                                    document.getElementById("showPollFormId").style.transition = "1s";
                                    document.getElementById("showPollFormId").style.left = "70px";
                                  }
                                }, 1);
                              }
                            }} /></div>
                          <div style={{
                            padding: '33px',
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            paddingTop: '0px',
                            paddingBottom: '0px'
                          }}>

                            {/* <input placeholder="Enter Question For Poll" value={breakOffInput}  onChange={(e) => {
                                setBreakOffInput(e.target.value);
                              }}  />
                       <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',paddding:'5px',backgroundColor:'lightgray',borderRadius:'50px',width:'90%',margin:'5px'}}>  
                       <div  style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
                       <input type="checkbox" style={{flex:'0.2'}} />
                        <p style={{flex:'0.8',margin:'0px'}}>July 3</p>
                         </div>
                        <progress value="32" max="100"  />
                        </div>
                       
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',paddding:'5px',backgroundColor:'lightgray',borderRadius:'50px',alignItems:'center',width:'90%',margin:'5px'}}>  
                        <input type="checkbox" style={{flex:'0.2'}} /><p style={{flex:'0.8',margin:'0px'}}>July 4</p></div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',paddding:'5px',backgroundColor:'lightgray',borderRadius:'50px',alignItems:'center',width:'90%',margin:'5px'}}>  
                        <input type="checkbox" style={{flex:'0.2'}} /><p style={{flex:'0.8',margin:'0px'}}>July 5</p></div>
                     */}
                            {FormEditPoll ?
                              <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Group className="mb-3" >
                                  <Form.Label>Poll Expiry Duration</Form.Label>
                                  <Form.Control as="select" onChange={(e) => setPollFormExpiry(e.target.value)} aria-label="Default select example">
                                    <option value="24">24 Hours</option>
                                    <option value="48">2 Days</option>
                                    <option value="72">3 Days</option>
                                    <option value="96">4 Days</option>
                                    <option value="120">5 Days</option>
                                    <option value="144">6 Days</option>
                                    <option value="168">7 Days</option>
                                  </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                  <Form.Label>Enter Question For Poll</Form.Label>
                                  <Form.Control type="text" value={pollFormDataQ}
                                    onChange={(e) => { setPollFormDataQ(e.target.value) }} placeholder="Enter Question For Poll" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                  <Form.Label>Option A</Form.Label>
                                  <Form.Control value={pollFormDataOA} onChange={(e) => { setPollFormDataOA(e.target.value) }} placeholder="Option A" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                  <Form.Label>Option B</Form.Label>
                                  <Form.Control value={pollFormDataOB} onChange={(e) => { setPollFormDataOB(e.target.value) }} placeholder="Option b" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                  <Form.Label>Option C</Form.Label>
                                  <Form.Control value={pollFormDataOC} onChange={(e) => { setPollFormDataOC(e.target.value) }} placeholder="Option c" />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
                                {/* <Button variant="primary" onClick={()=>{setFormEditPoll(!FormEditPoll)}} >
    Preview 
  </Button> */}
                                <Button variant="primary" type="submit" style={{ marginLeft: '5px' }} onClick={() => { handlePollFormSubmission(userFullName) }}>
                                  Save
                                </Button>
                              </Form>
                              : <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Group className="mb-3" >
                                  <Form.Label>{pollFormData.Question}</Form.Label>

                                </Form.Group>
                                <Form.Group className="mb-3" >

                                  <Form.Check type="checkbox" label={pollFormData.OptionA} />
                                  <ProgressBar animated variant="success" now={pollFormData.pollA} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                  <Form.Check type="checkbox" label={pollFormData.OptionB} />
                                  <ProgressBar animated variant="info" now={pollFormData.pollB} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                  <Form.Check type="checkbox" label={pollFormData.OptionC} />
                                  <ProgressBar animated variant="warning" now={pollFormData.pollC} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
                                <Button variant="primary" onClick={() => { setFormEditPoll(!FormEditPoll) }} >
                                  Edit
                                </Button>
                                <Button variant="primary" type="submit" style={{ marginLeft: '5px' }} onClick={() => { sentPollMessageInChat(pollFormData) }}>
                                  Submit
                                </Button>
                              </Form>
                            }
                            {/* <button className="d-grid col-12 btn-main login-form-button" 
                onClick={()=>{
                  if(breakOffInput){createBreakoff()}else{
                    toast.success(
                     "Please Enter Topic for Breakoff chat"
                   ); 
                   }
                  
                }}
                >Create Now</button> */}
                          </div>
                        </div>
                        : null}

                      <div>
                        <VideoChat
                          hallId={hallId}
                          userName={userInformation.username}
                          videoAvailable={() => {
                            setVideoAvailable(true);
                          }}
                          host={username}
                        />
                      </div>

                      <div
                        className="chatarea"
                        style={{
                          marginTop: VideoAvailable ? "300px" : "0px",
                          zIndex: "-1",
                          marginBottom: "3rem",
                          overflow: "auto",
                        }}
                      >
                      {chatData.length
                        ? chatData.map((e) => (
                          e.isReply?   
                          <div
                          className="messageBox"
                         
                       
                        >
                             <div
                          className="messageBox"
                          style={{
                            maxWidth:
                              e.parentChat.isVideo || e.parentChat.isImage ? "200px" : "100%",
                              backgroundColor:'#D3D3D3',
                              margin:'0px',
                              marginBottom:'8px'
                            // width: "max-content",
                            // maxWidth: "fit-content",
                            // marginLeft: "auto",
                            // position: "relative",
                            // left: "3rem",
                            // marginRight: "3.5rem"
                          }}
                       
                        >
                          <div className="ProfileBox"   
                         >
                            <img
                              className="chat-profile"
                              src={e.parentChat.imgSrc ? e.parentChat.imgSrc : null}
                            />
                            <p>{e.parentChat.chatname}</p>
                            {/* <p className="timestamp"> {e.parentChat.timestamp}</p> */}
                          </div>
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key
                            ) => (
                              <a
                                target="blank"
                                href={decoratedHref}
                                key={key}
                              >
                                {decoratedText}
                              </a>
                            )}
                          >
                            {" "}
                            <div
                              className={
                                e.parentChat.isEmoji ? "message-emoji" : "message"
                              }
                            >
                              {!e.parentChat.isVideo && !e.parentChat.isImage && !e.parentChat.isPoll && !e.parentChat.isEvent
                                ? e.parentChat.message
                                : null}
                            </div>
                          </Linkify>
                          {e.parentChat.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                            <Form onSubmit={(e) => e.preventDefault()}>

                              <Form.Group className="mb-3" >
                                <Form.Label>{e.pollData.Question}</Form.Label>

                              </Form.Group>

                              <Form.Group className="mb-3" >

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]
                                    e.pollData.pollA = e.pollData.pollA + 1
                                    e.pollData.pollB = e.pollData.pollB
                                    e.pollData.pollC = e.pollData.pollC


                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                              
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                 
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                     
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                     </Form.Group>

                              <Form.Group className="mb-3" >
                             
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]

                                    // e.pollData.pollC = 100
                                    // e.pollData.pollA = 0
                                    // e.pollData.pollB = 0

                                    e.pollData.pollC = e.pollData.pollC + 1
                                    e.pollData.pollA = e.pollData.pollA
                                    e.pollData.pollB = e.pollData.pollB
                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                  <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                     </Form.Group>
                              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check type="radio" name="radio" label="Check me out" />
</Form.Group> */}
                              <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                let messageContainer = document.querySelector(".chatarea");

                                messageContainer.scrollTop = messageContainer.scrollHeight;
                                setChatData(chatData.filter((chat) => chat !== e))
                                setChatData((chat) => [...chat, e])
                                updatePollData(e)
                              }}>
                                Vote
                              </Button>
                            </Form>
                          </div> : null}
                          {e.parentChat.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                            <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                            <p>Event Title : {e.parentChat.event.eventTitle}</p>
                            {e.event.eventDesc ? <p>Event Description : {e.parentChat.event.eventDesc}</p> : null}
                            <p>Event Date : {e.parentChat.event.eventDate}</p>
                            <p>Event Time : {e.parentChat.event.eventTime}</p>
                          </div> : null}
                          {e.parentChat.isVideo ? (
                            <video
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                              controls={true}
                              src={e.parentChat.message}
                            ></video>
                          ) : null}
                          {e.parentChat.isImage ? (
                            <img
                              src={e.parentChat.message}
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: e.parentChat.isSticker ? "60px" : "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                            />
                          ) : null}

                          {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                          {/* {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                            className="reply-button" 
                            onClick={()=>{
                              setReplyData({chatData:e,user:{
                              name: userFullName,
                              profilePic: userProfilePic,
                            }});setShowReply(!showReply)}}>{showReply?"Reply":"Reply"}</button> : null}
                          <div className="reply-box"></div> */} ghfgh
                        
                        </div>
                          <div className="ProfileBox"    onClick={() => {
                            if (e.chatname !== userFullName && !e.isPoll) {
                              toast.success(
                                `Opening Private Chat with ${e.chatname}`
                              );
                              setPrivateChatPerson({
                                name: e.chatname,
                                profilePic: e.imgSrc,
                              });
                              setPrivateChat(true);
                              setClubFloor(false);
                              // socket.emit("room", userInfo[0].username+userInformation.username);
                              getChatDataPrivate(e.chatname, userFullName)
                              // socket.emit("new-user-joined", {
                              //     name: userFullName,
                              //     profilePic: userProfilePic,
                              //   });

                              setTimeout(() => {
                                if (
                                  document.getElementById(
                                    "privatechatslide"
                                  )
                                ) {
                                  document.getElementById(
                                    "privatechatslide"
                                  ).style.transition = "1sec";
                                  document.getElementById(
                                    "privatechatslide"
                                  ).style.right = "30px";
                                }
                              }, 1);
                            }
                          }}>
                            <img
                              className="chat-profile"
                              src={e.imgSrc ? e.imgSrc : null}
                            />
                            <p>{e.chatname}</p>
                            <p className="timestamp"> {e.timestamp}</p>
                          </div>
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key
                            ) => (
                              <a
                                target="blank"
                                href={decoratedHref}
                                key={key}
                              >
                                {decoratedText}
                              </a>
                            )}
                          >
                            {" "}
                            <div
                              className={
                                e.isEmoji ? "message-emoji" : "message"
                              }
                            >
                              {!e.isVideo && !e.isImage && !e.isPoll && !e.isEvent
                                ? e.message
                                : null}
                            </div>
                          </Linkify>
                          {e.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                            <Form onSubmit={(e) => e.preventDefault()}>

                              <Form.Group className="mb-3" >
                                <Form.Label>{e.pollData.Question}</Form.Label>

                              </Form.Group>

                              <Form.Group className="mb-3" >

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]
                                    e.pollData.pollA = e.pollData.pollA + 1
                                    e.pollData.pollB = e.pollData.pollB
                                    e.pollData.pollC = e.pollData.pollC


                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                              
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                 
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                     
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                     </Form.Group>

                              <Form.Group className="mb-3" >
                             
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]

                                    // e.pollData.pollC = 100
                                    // e.pollData.pollA = 0
                                    // e.pollData.pollB = 0

                                    e.pollData.pollC = e.pollData.pollC + 1
                                    e.pollData.pollA = e.pollData.pollA
                                    e.pollData.pollB = e.pollData.pollB
                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                  <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                     </Form.Group>
                              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check type="radio" name="radio" label="Check me out" />
</Form.Group> */}
                              <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                let messageContainer = document.querySelector(".chatarea");

                                messageContainer.scrollTop = messageContainer.scrollHeight;
                                setChatData(chatData.filter((chat) => chat !== e))
                                setChatData((chat) => [...chat, e])
                                updatePollData(e)
                              }}>
                                Vote
                              </Button>
                            </Form>
                          </div> : null}
                          {e.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                            <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                            <p>Event Title : {e.event.eventTitle}</p>
                            {e.event.eventDesc ? <p>Event Description : {e.event.eventDesc}</p> : null}
                            <p>Event Date : {e.event.eventDate}</p>
                            <p>Event Time : {e.event.eventTime}</p>
                          </div> : null}
                          {e.isVideo ? (
                            <video
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                              controls={true}
                              src={e.message}
                            ></video>
                          ) : null}
                          {e.isImage ? (
                            <img
                              src={e.message}
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: e.isSticker ? "60px" : "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                            />
                          ) : null}

                          {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                          {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                            className="reply-button" 
                            onClick={()=>{
                              setReplyData({chatData:e.parentChat,user:{
                              name: userFullName,
                              profilePic: userProfilePic,
                            }});setShowReply(!showReply)}}
                            >{e.replyCount?e.replyCount+' more':0} Replies</button> : null}
                          {/* <div className="reply-box"></div> */}
                        </div>
                       :
                          <div
                            className="messageBox"
                           
                          >
                            <div className="ProfileBox"    onClick={() => {
                              if (e.chatname !== userFullName && !e.isPoll) {
                                toast.success(
                                  `Opening Private Chat with ${e.chatname}`
                                );
                                setPrivateChatPerson({
                                  name: e.chatname,
                                  profilePic: e.imgSrc,
                                });
                                setPrivateChat(true);
                                setClubFloor(false);
                                // socket.emit("room", userInfo[0].username+userInformation.username);
                                getChatDataPrivate(e.chatname, userFullName)
                                // socket.emit("new-user-joined", {
                                //     name: userFullName,
                                //     profilePic: userProfilePic,
                                //   });

                                setTimeout(() => {
                                  if (
                                    document.getElementById(
                                      "privatechatslide"
                                    )
                                  ) {
                                    document.getElementById(
                                      "privatechatslide"
                                    ).style.transition = "1sec";
                                    document.getElementById(
                                      "privatechatslide"
                                    ).style.right = "30px";
                                  }
                                }, 1);
                              }
                            }}>
                              <img
                                className="chat-profile"
                                src={e.imgSrc ? e.imgSrc : null}
                              />
                              <p>{e.chatname}</p>
                              <p className="timestamp"> {e.timestamp}</p>
                            </div>
                            <Linkify
                              componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key
                              ) => (
                                <a
                                  target="blank"
                                  href={decoratedHref}
                                  key={key}
                                >
                                  {decoratedText}
                                </a>
                              )}
                            >
                              {" "}
                              <div
                                className={
                                  e.isEmoji ? "message-emoji" : "message"
                                }
                              >
                                {!e.isVideo && !e.isImage && !e.isPoll && !e.isEvent
                                  ? e.message
                                  : null}
                              </div>
                            </Linkify>
                            {e.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                              <Form onSubmit={(e) => e.preventDefault()}>

                                <Form.Group className="mb-3" >
                                  <Form.Label>{e.pollData.Question}</Form.Label>

                                </Form.Group>

                                <Form.Group className="mb-3" >

                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                   
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                    onChange={() => {

                                      // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                      // chatData[chatData.indexOf(e)]
                                      e.pollData.pollA = e.pollData.pollA + 1
                                      e.pollData.pollB = e.pollData.pollB
                                      e.pollData.pollC = e.pollData.pollC


                                      // let messageContainer = document.querySelector(".chatarea");

                                      // messageContainer.scrollTop = messageContainer.scrollHeight;
                                      // setChatData(chatData.filter((chat) => chat !== e))
                                      // setChatData((chat) => [...chat, e])
                                      // updatePollData(e)
                                    }}
                                  />
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                    <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                   
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                   
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                       
                                    <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                       </Form.Group>

                                <Form.Group className="mb-3" >
                               
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                    onChange={() => {

                                      // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                      // chatData[chatData.indexOf(e)]

                                      // e.pollData.pollC = 100
                                      // e.pollData.pollA = 0
                                      // e.pollData.pollB = 0

                                      e.pollData.pollC = e.pollData.pollC + 1
                                      e.pollData.pollA = e.pollData.pollA
                                      e.pollData.pollB = e.pollData.pollB
                                      // let messageContainer = document.querySelector(".chatarea");

                                      // messageContainer.scrollTop = messageContainer.scrollHeight;
                                      // setChatData(chatData.filter((chat) => chat !== e))
                                      // setChatData((chat) => [...chat, e])
                                      // updatePollData(e)
                                    }}
                                  />
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                    <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                       </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="radio" name="radio" label="Check me out" />
  </Form.Group> */}
                                <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                  toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                  let messageContainer = document.querySelector(".chatarea");

                                  messageContainer.scrollTop = messageContainer.scrollHeight;
                                  setChatData(chatData.filter((chat) => chat !== e))
                                  setChatData((chat) => [...chat, e])
                                  updatePollData(e)
                                }}>
                                  Vote
                                </Button>
                              </Form>
                            </div> : null}
                            {e.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                              <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                              <p>Event Title : {e.event.eventTitle}</p>
                              {e.event.eventDesc ? <p>Event Description : {e.event.eventDesc}</p> : null}
                              <p>Event Date : {e.event.eventDate}</p>
                              <p>Event Time : {e.event.eventTime}</p>
                            </div> : null}
                            {e.isVideo ? (
                              <video
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                                controls={true}
                                src={e.message}
                              ></video>
                            ) : null}
                            {e.isImage ? (
                              <img
                                src={e.message}
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: e.isSticker ? "60px" : "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                              />
                            ) : null}

                            {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                            {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                              className="reply-button" 
                              onClick={()=>{
                                setReplyData({chatData:e,user:{
                                name: userFullName,
                                profilePic: userProfilePic,
                              }});setShowReply(!showReply)}}>{showReply?"Reply":"Reply"}</button> : null}
                            <div className="reply-box"></div>
                          </div>
                        ))
                        : null}
                        
                      {src && mimeType.substr(0, 5) == "image" ? (
                        <div className="messageBox">
                          <img
                            src={src}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "-10px",
                            }}
                          />
                          <button
                            onClick={() => {
                              upload(file, file.type);
                              setFile([]);
                              setSrc(null);
                              setMimeType("");
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setFile([]);
                              setSrc(null);
                              setMimeType("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}

                      {src && mimeType.substr(0, 5) == "video" ? (
                        <div className="messageBox">
                          <video
                            src={src}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "-10px",
                            }}
                            className="messageBox"
                          />
                          <button
                            onClick={() => {
                              upload(file, file.type);
                              setFile([]);
                              setSrc(null);
                              setMimeType("");
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setFile([]);
                              setSrc(null);
                              setMimeType("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}
                      </div>

                      {emojiPicker && (
                        <ClickAwayListener
                          onClickAway={() => {
                            setEmojiPicker(false);
                          }}
                        >
                          <div>
                            <Picker
                              native
                              onEmojiClick={(event, emojiObject) => {
                                setMessageInboxValue(
                                  messageInboxValue + emojiObject.emoji
                                );
                                // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                //  // socket.emit('send',message);
                                // socket.emit('send', {
                                //     name: userFullName,
                                //     message: emojiObject.emoji,
                                //     profilePic: userProfilePic,
                                //     isEmoji: true
                                // });
                              }}
                              pickerStyle={{
                                position: "absolute",
                                bottom: "3rem",
                                left: "0.5rem",
                                zIndex: "1111",
                              }}
                            />
                          </div>
                        </ClickAwayListener>
                      )}
                      {stickerPicker ? <div style={{
                        position: "absolute",
                        bottom: "3rem",
                        left: "0.5rem",
                        backgroundColor: '#652C90',
                        borderRadius: '5px',
                        padding: '8px',
                        zIndex: "1111", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap'
                      }}>
                        {stickersImages.map((image) => <img src={image}
                          onClick={() => {

                            append(
                              userFullName,
                              `${image}`,
                              "left",
                              `${BaseURL}/profile-pictures/${userProfilePic}`,
                              false,
                              false,
                              true, "", "", "", true
                            );
                            socket.emit("send", {
                              name: userFullName,
                              message: `${image}`,
                              profilePic: userProfilePic,
                              isEmoji: false,
                              isVideo: false,
                              isImage: true,
                              isSticker: true
                            });
                            setStickerPicker(false)
                          }}
                          style={{ width: '70px', minWidth: '70px', minHeight: '70px', margin: '5px', cursor: 'pointer', backgroundColor: 'whitesmoke', padding: '5px' }} />)}
                      </div> : null
                      }



                      {/* ----------------------------- newly redesigned chat area ------------------------- */}
                      <div className="send">
                        <ReactTooltip />
                        <form
                          action="#"
                          id="send-container"
                          style={{
                            // marginLeft: clubFloor || privateChat ? "5px" : "50px",
                          }}
                          onSubmit={(e) => messagesubmit(e)}
                        >
                          <div className="in-chat-sharing-options">
                            <label htmlFor="post-video">
                              <SoapboxTooltip title={"Share Video"} placement="top">
                                <img
                                  src={videochat}
                                  style={{ margin: "5px", cursor: "pointer" }}
                                  width="27px"
                                />
                              </SoapboxTooltip>
                            </label>
                            <input
                              type="file"
                              id="post-video"
                              name="video"
                              accept="video/*"
                              onChange={handleFile}
                              hidden
                            />

                            <label htmlFor="post-image">
                              <SoapboxTooltip title={"Share Photos"} placement="top">
                                <img
                                  src={imagechat}
                                  style={{ margin: "5px", cursor: "pointer" }}
                                  width="27px"
                                />
                              </SoapboxTooltip>
                            </label>
                            <input
                              type="file"
                              id="post-image"
                              name="image"
                              accept="image/*"
                              onChange={handleFile}
                              hidden
                            />

                            <SoapboxTooltip title={"Share File"} placement="top">
                              <img
                                src={filechat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                width="27px"
                              />
                            </SoapboxTooltip>
                            <SoapboxTooltip title={"Stickers"} placement="top">
                              <img
                                src={stickerIcon}
                                style={{ width: '25px', padding: '3px', borderRadius: '15px', margin: "5px", cursor: "pointer", backgroundColor: '#8249A0' }}
                                onClick={() => {
                                  setStickerPicker(!stickerPicker);
                                }}
                              />
                            </SoapboxTooltip>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <SoapboxTooltip title={"Emoji"} placement="top">
                              <img
                                src={emojiIcon}
                                style={{ margin: "5px", cursor: "pointer" }}
                                onClick={() => {
                                  setEmojiPicker(!emojiPicker);
                                }}
                                width="27px"
                              />
                            </SoapboxTooltip>

                            <input
                              type="text"
                              name="messageInp"
                              value={messageInboxValue}
                              autoComplete="off"
                              id="messageInp"
                              style={{
                                // width: clubFloor || privateChat ? "350px" : "600px",
                              }}
                              onChange={(e) => {
                                setMessageInboxValue(e.target.value);
                              }}
                            />

                            <button
                              type="submit"
                              style={{
                                border: "none",
                                outline: "none",
                                background: "none",
                                marginLeft: "5px",
                              }}
                            >
                              <SoapboxTooltip title={"Send Message"} placement="top">
                                <img src={sendIcon} width="27px" />
                              </SoapboxTooltip>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {onDemandMedia ? (
                <div
                  className="channel-media"
                  id="feed"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {onDemandUploads && (
                    <InfiniteScroll
                      dataLength={onDemandUploads.length}
                      next={fetchMoreOnDemandHoots}
                      hasMore={onDemandHasMore}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        padding: "1rem",
                        margin: "1rem",
                      }}
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
                            {!hoot.mimeType ? (
                              <div className="img-container">
                                <div
                                  className="hoot-img-vertical-profile"
                                  style={{
                                    animation: "none",
                                    backgroundColor: "#d9d1f8",
                                  }}
                                  onContextMenu={(e) => e.preventDefault()}
                                  onClick={() => {
                                    history.push(
                                      `/${hoot.authorUsername}/hoot/${btoa(
                                        hoot.id
                                      )}`
                                    );
                                  }}
                                >
                                  {(ReactPlayer.canPlay(hoot.link) &&
                                    hoot.link.endsWith(".mp4")) ||
                                    hoot.link.endsWith(".mkv") ||
                                    hoot.link.endsWith(".mov") ||
                                    hoot.link.endsWith(".ogv") ||
                                    hoot.link.endsWith(".webm") ||
                                    hoot.link.endsWith(".mpg") ? (
                                    <div className="vdo-container">
                                      <video
                                        muted
                                        disablePictureInPicture
                                        className="hoot-vdo-profile"
                                        style={{ margin: "0" }}
                                        onMouseOver={(event) =>
                                          event.target.play()
                                        }
                                        onMouseOut={(event) =>
                                          event.target.pause()
                                        }
                                        onDragStart={(e) => e.preventDefault()}
                                      >
                                        <source src={hoot.link} />
                                        Your browser does not support HTML
                                        video.
                                      </video>
                                    </div>
                                  ) : hoot.link.endsWith(".mp3") ||
                                    hoot.link.endsWith(".ogg") ||
                                    hoot.link.endsWith(".wav") ||
                                    hoot.link.endsWith(".flac") ||
                                    hoot.link.endsWith(".aac") ||
                                    hoot.link.endsWith(".alac") ||
                                    hoot.link.endsWith(".dsd") ? (
                                    <div className="vdo-container">
                                      <video
                                        muted
                                        poster={`${BaseURL}/profile-pictures/${`${BaseURL}/profile-pictures/${hoot.profilePic}`}`}
                                        className="hoot-vdo-profile"
                                        style={{ margin: "0" }}
                                        onDragStart={(e) => e.preventDefault()}
                                      >
                                        <source src={hoot.link} />
                                        Your browser does not support HTML
                                        video.
                                      </video>
                                    </div>
                                  ) : (
                                    ReactPlayer.canPlay(hoot.link) && (
                                      <div className="player-profile-wrapper">
                                        <ReactPlayer
                                          url={hoot.link}
                                          className="react-player"
                                          controls="true"
                                          width={hoot.mimeType ? "97%" : "100%"}
                                          height="100%"
                                          light={true}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                <FiPlayCircle
                                  className="GIF-overlay"
                                  style={{ borderRadius: "50%" }}
                                  onClick={() => {
                                    history.push(
                                      `/${hoot.authorUsername}/hoot/${btoa(
                                        hoot.id
                                      )}`
                                    );
                                  }}
                                />
                              </div>
                            ) : hoot.mimeType.substr(0, 5) == "audio" ? (
                              <ExploreHoot
                                hootId={hoot.id}
                                username={hoot.authorUsername}
                                mimeType={hoot.mimeType}
                                hootImgId={hoot.image}
                              />
                            ) : (
                              <HootOutside
                                hootId={hoot.id}
                                username={hoot.authorUsername}
                                mimeType={hoot.mimeType}
                                hootImgId={hoot.image}
                              />
                            )}
                          </div>
                        );
                      })}
                    </InfiniteScroll>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* owner user */}
          {userInformation.username == username ? (
            <div className="channel-user-content" style={{ flex: '0.8' }} >
              {/* Top tabs bar with options */}
              <div
                onmousedown={(event) => {
                  event.preventDefault
                    ? event.preventDefault()
                    : (event.returnValue = false);
                }}
                onDragStart={(e) => e.preventDefault()}
                className="channel-tabs shadow-sm"
                style={{
                  position: "sticky",
                  top: "3.5rem",
                  alignSelf: "flex-start",
                }}
              >
                <div className="tabs" style={{ margin: "0 0.5rem" }}>
                  {/* Hamburger menu */}
                  <SoapboxTooltip title={clubFloor ? "Hide Feeds" : "Show Feeds"} placement="bottom">
                    <div>
                      <HiMenuAlt2
                        style={{
                          color: "#FFFFFF",
                          cursor: "pointer",
                          outline: "none",
                          fontSize: "1.4rem",
                          marginTop: "0.2rem"
                        }}
                        onClick={() => {
                          if (privateChat == false) {
                            setClubFloor(!clubFloor);
                           
                            setMarketPlaceArea(false);
                          } else {
                            toast.success("Please close Private chat to view feeds");
                          }
                        }}
                      />
                    </div>
                  </SoapboxTooltip>

                  {/* CLUB FLOOR tab  */}
                  <span
                    style={{
                      borderRadius: "8px",
                      fontSize: "14px"
                    }}
                    onClick={() => {
                      if (privateChat == false) {
                        setMarketPlaceArea(false);
                        setShowRequest(false);
                        setClubFloor(true);
                        setShowSubscribers(false);
                        setShowPricingSetting(false);
                        setShowNotification(false);
                        setShowChatRoom(true);
                        setOnDemandMedia(false);
                      } else {
                        toast.success("Please close Private chat to view feeds");
                      }
                    }}
                  >
                    CLUB FLOOR
                  </span>

                  {/* <span 
                        style={{ backgroundColor: showRequest ? "#8249A0" : '#A279BA', borderRadius: '8px' }}
                        onClick={() => { 
                          setShowRequest(!showRequest);
                          setShowFeed(false); 
                          setShowSubscribers(false);
                          setShowPricingSetting(false); 
                          setShowNotification(false); 
                          setShowChatRoom(false) }} 
                          >
                            Requests
                      </span> */}

                  {/* <span 
                        style={{ backgroundColor: showSubscribers ? "#8249A0" : '#A279BA', borderRadius: '8px' }}
                        onClick={() => { 
                          setShowRequest(false); 
                          setShowFeed(false); 
                          setShowSubscribers(!showSubscribers); 
                          setShowPricingSetting(false); 
                          setShowNotification(false); 
                          setShowChatRoom(false) }} 
                          >
                            Memberships
                      </span> */}

                  {/* <span onClick={() => { 
                        setShowRequest(false); 
                        setShowSubscribers(false); 
                        setShowPricingSetting(false); 
                        setShowNotification(!showNotification) }} 
                        >
                          Notifications
                      </span> */}

                  {/* <span>Marketplace</span> */}

                  {/* <span onClick={() => {history.push(`/${uuidv4()}/RecordMessage/${uuidv4()}/${userInfo[0].name}/${uuidv4()}/${uuidv4()}`);}}>
                        <div className="channel-btn-icon">
                          Record Message
                        </div>
                      </span> */}

                  {/* CLUB CHAT tab (note: right now "display: none") */}
                  <span
                    id="chatRoomopen"
                    style={{
                      display: "none",
                      backgroundColor: showChatRoom ? "#8249A0" : "#A279BA",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      setMarketPlaceArea(false);
                      setShowRequest(false);
                      setShowSubscribers(false);
                      setShowPricingSetting(false);
                      setShowNotification(false);
                      setShowFeed(true);
                      setShowChatRoom(false);
                      setShowChatRoom(!showChatRoom);
                      setOnDemandMedia(false);
                      socket.emit("room", userInfo[0].username);
                      socket.emit("new-user-joined", {
                        name: userFullName,
                        profilePic: userProfilePic,
                      });
                    }}
                  >
                    CLUB CHAT
                  </span>

                  {/* CLUB AMENITIES tab */}
                  <span
                    style={{
                      borderRadius: "8px",
                      fontSize: "14px ",
                    }}
                  >
                    CLUB AMENITIES
                  </span>

                  {/* EVENTS tab */}
                  <span
                    style={{
                      fontSize: "14px ",
                      borderRadius: "8px",
                    }}
                    onClick={() => getAllEvents(username)}
                  >
                    EVENTS
                  </span>

                  {/* <span style={{ backgroundColor: '#A279BA', borderRadius: '8px', fontSize:'14px'}}>MARKETPLACE</span>
                      <span style={{ backgroundColor: '#A279BA', borderRadius: '8px', fontSize:'14px'}}>MESSAGES</span> */}

                  {/* MARKETPLACE tab */}
                  <span>
                    <SoapboxTooltip title={"MARKETPLACE"} placement="bottom" privateTooltip={true}>
                      <img
                        src={marketplaceicon}
                        width="30px"
                        onClick={() => {
                          setInviteBox(false);
                          setScheduleBox(false);
                          setShowRequest(false);
                          setShowPricingSetting(false);
                          setAllMyEvents(false);
                          setShowSubscribers(false);
                          setShowCreateHoot(false);
                          setShowIframe(false);
                          setShowBreakoffForm(false);
                          setShowClubRules(false);
                          setShowNotification(false);
                          setClubFloor(false);
                          setShowFeed(false);
                          setShowChatRoom(false);
                          setPrivateChat(false);
                          setOnDemandMedia(false);

                          setMarketPlaceArea(true);
                        }}
                      />
                    </SoapboxTooltip>
                  </span>

                  {/* MESSAGES tab */}
                  <span  onClick={() => {
                     resetChatView(userFullName)
                          if (!privateChatList) {
                            setPrivateChatList(!privateChatList)

                            setTimeout(() => {
                              if (document.getElementById("privateChatList")) {
                                document.getElementById("privateChatList").style.transition = "1sec";
                                document.getElementById("privateChatList").style.right = "0.8rem";
                              }
                            }, 1);
                          } else {
                            document.getElementById("privateChatList").style.transition = "1sec";
                            document.getElementById("privateChatList").style.right = "-100vw";

                            setTimeout(() => {
                              setPrivateChatList(false)
                            }, 200);
                          }
                        }}>
                    <SoapboxTooltip title={"CHATHIVE"} placement="bottom" privateTooltip={true}>
                      <img
                        width="30px"
                        src={messagesicon}
                        />
                          
                    </SoapboxTooltip>
                    <span style={{ fontSize: "14px",marginLeft:'-6px'  }}>CHATHIVE</span>
                   
                  </span>
                  {chatUnview!==0?<div className="notify-num" onClick={() => {
                   
                   resetChatView(userFullName)
                       if (!privateChatList) {
                         setPrivateChatList(!privateChatList)

                         setTimeout(() => {
                           if (
                             document.getElementById(
                               "privateChatList"
                             )
                           ) {
                             document.getElementById(
                               "privateChatList"
                             ).style.transition = "1sec";
                             document.getElementById(
                               "privateChatList"
                             ).style.right = "0.8rem";
                           }
                         }, 1);
                       } else {
                         document.getElementById(
                           "privateChatList"
                         ).style.transition = "1sec";
                         document.getElementById(
                           "privateChatList"
                         ).style.right = "-100vw";
                         setTimeout(() => {
                           setPrivateChatList(false)
                         }, 200);
                       }
                     }}>{chatUnview}</div>:null}
                  {/* Invite tab */}
                  <span onClick={() => setInviteBox(true)}>
                    <SoapboxTooltip title={"Invite"} placement="bottom" privateTooltip={true}>
                      <img src={inviteicon} width="30px" />
                    </SoapboxTooltip>
                  </span>

                  {/* Club Rules tab */}
                  <span>
                    <SoapboxTooltip title={"Club Rules"} placement="bottom" privateTooltip={true}>
                      <img
                        src={rules}
                        width="30px"
                        onClick={() => {
                          if (showClubRules) {
                            document.getElementById("slideCR").style.transition = "2sec";
                            document.getElementById("slideCR").style.right = "-100vw";

                            setTimeout(() => {
                              setShowClubRules(false);
                            }, 1000);
                          } else {
                            setShowClubRules(true),
                              setOnDemandMedia(false),
                              setShowCreateHoot(false),
                              setShowRequest(false);
                            setShowFeed(false);
                            setShowSubscribers(false);
                            setShowPricingSetting(false);
                            setShowNotification(false);
                            setShowChatRoom(true);

                            setTimeout(() => {
                              if (document.getElementById("slideCR")) {
                                document.getElementById("slideCR").style.transition = "1sec";
                                document.getElementById("slideCR").style.right = "150px";
                              }
                            }, 1);
                          }
                        }}
                      />
                    </SoapboxTooltip>
                  </span>

                  {/* Create Private Hoot tab */}
                  <span
                    onClick={() => {
                      if (showCreateHoot) {
                        document.getElementById("slideH").style.transition = "2sec";
                        document.getElementById("slideH").style.left = "-100vw";

                        setTimeout(() => {
                          setShowCreateHoot(false);
                        }, 1000);
                      } else {
                        setOnDemandMedia(false);
                        setShowCreateHoot(true);
                        setShowRequest(false);
                        setShowFeed(false);
                        setShowSubscribers(false);
                        setShowPricingSetting(false);
                        setShowNotification(false);
                        setShowChatRoom(true);

                        setTimeout(() => {
                          if (document.getElementById("slideH")) {
                            document.getElementById("slideH").style.transition = "1sec";
                            // document.getElementById("slideH").style.left = "150px";

                            document.getElementById("slideH").style.left = "50%";
                            document.getElementById("slideH").style.top = "14.5rem";
                            document.getElementById("slideH").style.transform = "translate(-50%, -50%)";
                          }
                        }, 1);
                      }
                    }}
                  >
                    <SoapboxTooltip title={"Create Private Hoot"} placement="bottom" privateTooltip={true}>
                      <img src={privatehooticon} width="30px" />
                    </SoapboxTooltip>
                  </span>

                  {/* Create Breakoff Chat tab */}
                  <SoapboxTooltip title={"Create Breakoff Chat"} placement="bottom">
                    <span style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#FFF',
                      fontSize: "1.5rem"
                    }}
                      onClick={() => {
                        if (userInfo[0].communityClub == 1) {
                          if (subscribe || userInformation.username == username) {
                            if (showBreakoffForm) {
                              document.getElementById("showBreakoffFormId").style.transition = "2s";
                              document.getElementById("showBreakoffFormId").style.right = "-100vw";

                              setTimeout(() => {
                                setShowBreakoffForm(false);
                              }, 1000);
                            } else {
                              setShowBreakoffForm(true);

                              setTimeout(() => {
                                if (document.getElementById("showBreakoffFormId")) {
                                  document.getElementById("showBreakoffFormId").style.transition = "1s";
                                  document.getElementById("showBreakoffFormId").style.right = "30%";
                                }
                              }, 1);
                            }
                          } else {
                            toast.success('Members Only Access');
                          }
                        } else {
                          toast.success('BreakOff Chat can be accessible only in Community Clubs')
                        }
                      }}
                    >
                      <BsPlusCircleFill />
                    </span>
                  </SoapboxTooltip>
                </div>

                {/* <span onClick={() => { 
                  setShowRequest(false); 
                  setShowSubscribers(false); 
                  setShowPricingSetting(false); 
                  setShowNotification(!showNotification) }}
                  >
                    Notifications
                  </span> */}

                {/* <FiSearch className="search-channel-content" /> */}
              </div>

            

              {inviteBox ? (
                <MyVerticallyCenteredModal
                  title={"Invitation"}
                  closeModal={() => setInviteBox(false)}
                  clubname={userInfo[0].communityClub == 1 ? username : `${userInfo[0].name}'s Private `}
                  clublink={`https://megahoot.net/${uuidv4()}/private/Club/${username}/${uuidv4()}`}
                  username={userFullName}
                  show={inviteBox}
                  inviteRoute="inviteHandlerClub"
                  mailText={"You Have Been Invited to a Soapbox Club"}
                  onHide={() => setInviteBox(false)}
                />
              ) : null}
               {inviteBoxChat
                ? <MyVerticallyCenteredModal
                  title={"Invitation"}
                  closeModal={() => setInviteBoxChat(false)}
                  clubname={userInfo[0].communityClub == 1 ? username : `${userInfo[0].name}'s Private `}
                  clublink={`https://megahoot.net/profile/${username}`}
                  username={userFullName}
                  show={inviteBoxChat}
                  inviteRoute="inviteHandlerChat"
                  mailText={"You've Been Invited to a MegaHoot Soapbox Private Chat"}
                  onHide={() => setInviteBox(false)}
                />
                : null}

              {scheduleBox
                ? <MyVerticallyCenteredScheduler
                  title={"Schedule an event"}
                  closeModal={() => setScheduleBox(false)}
                  clubname={userInfo[0].communityClub == 1 ? username : `${userInfo[0].name}'s Private `}
                  clublink={`https://megahoot.net/${uuidv4()}/private/Club/${username}/${uuidv4()}`}
                  username={userInformation.username}
                  sumitChatData={(data) => { sumitChatDataFromScheduler(data) }}
                  show={scheduleBox}
                  fullName={userFullName}
                  onHide={() => setScheduleBox(false)}
                /> : null}

                {showReply?<ReplyModal sendReplyToChat={(data)=>{sendReplyToChat(data)}} data={replyData} onHide={() => setShowReply(false)} show={showReply} />:null}
  
              {showRequest ? (
                <div className="slide-container">
                  <div
                    id="slideR"
                    style={{
                      borderRadius: "10px",
                      minWidth: "600px",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      backgroundColor: "#D6C8E1",
                      margin: "1rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slideR-class"
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        // padding: "5px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                        padding: "0.5rem",
                      }}
                    >
                      <h5 style={{ fontSize: "1.2rem", marginBottom: 0 }}>Club Requests </h5>
                      <SoapboxTooltip title="Close" placement="left">
                        <span>
                          <IoCloseCircle
                            style={{ cursor: "pointer", color: "#DCD5FA", fontSize: "1.7rem" }}
                            onClick={() => {
                              document.getElementById("slideR").style.transition = "2sec";
                              document.getElementById("slideR").style.right = "-100vw";

                              setTimeout(() => {
                                setShowRequest(false);
                              }, 1000);
                            }}
                          />
                        </span>
                      </SoapboxTooltip>

                    </div>
                    {/* <p>No Requests</p> */}
                    {/* <h5>Club Request</h5> */}
                    <div
                      style={{
                        maxHeight: "400px",
                        padding: "1rem",
                        overflowY: "auto",
                      }}
                    >
                      {clubRequestsData.map((user, index) => (
                        <div
                          key={user.id}
                          className="messageBox"
                          style={{
                            minWidth: "250px",
                            padding: "1px",
                            margin: "8px",
                            display: 'flex',
                            flexDirection: 'row'
                          }}
                        >
                          <SubscribedUser username={user.username} />
                          <button
                            className="Approve-request"
                            onClick={() => { handleClubRequestApprove(user) }}
                          >
                            Approve
                          </button>

                          <button
                            className="Delete-request"
                            onClick={() => deleteClubRequest(user)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {showPricingSetting ? (
                <div className="slide-container">
                  <div
                    id="slide"
                    style={{
                      borderRadius: "10px",
                      minWidth: "600px",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#D6C8E1",
                      margin: "1rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slide-class"
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        // padding: "5px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                        padding: "0.5rem",
                      }}
                    >
                      <h5 style={{ fontSize: "1.2rem", marginBottom: 0 }}>Set Service Price </h5>
                      <SoapboxTooltip title="Close" placement="left">
                        <span>
                          <IoCloseCircle
                            style={{ cursor: "pointer", color: "#DCD5FA", fontSize: "1.7rem" }}
                            onClick={() => {
                              document.getElementById("slide").style.transition = "2sec";
                              document.getElementById("slide").style.right = "-100vw";

                              setTimeout(() => {
                                setShowPricingSetting(false);
                              }, 1000);
                            }}
                          />
                        </span>
                      </SoapboxTooltip>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "1rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <label style={{ minWidth: "30vw", padding: "0.5rem" }}>1 on 1 call:{" "}</label>
                      <input
                        style={{
                          borderRadius: "8px",
                          padding: "4px",
                          border: "none",
                          borderBottom: "3px solid grey",
                          marginRight: "5px",
                          outline: "none",
                        }}
                        type="number"
                        value={oneOnOnecallPrice}
                        placeholder="Amount XMG"
                        min={5}
                        max={100}
                        onChange={(e) => {
                          setOneOnOneCallPrice(e.target.value);
                        }}
                      />
                      XMG
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "1rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <label style={{ minWidth: "30vw", padding: "0.5rem" }}>Group call:{" "}</label>
                      <input
                        style={{
                          borderRadius: "8px",
                          padding: "4px",
                          border: "none",
                          borderBottom: "3px solid grey",
                          marginRight: "5px",
                          outline: "none",
                        }}
                        type="number"
                        value={groupCallPrice}
                        placeholder="Amount XMG"
                        min={5}
                        max={100}
                        onChange={(e) => {
                          setGroupCallPrice(e.target.value);
                        }}
                      />
                      XMG
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "1rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <label style={{ minWidth: "30vw", padding: "0.5rem" }}>Personal Message:{" "}</label>
                      <input
                        style={{
                          borderRadius: "8px",
                          padding: "4px",
                          border: "none",
                          borderBottom: "3px solid grey",
                          marginRight: "5px",
                          outline: "none",
                        }}
                        type="number"
                        value={requestMessagePrice}
                        placeholder="Amount XMG"
                        min={5}
                        max={100}
                        onChange={(e) => {
                          setRequestMessagePrice(e.target.value);
                        }}
                      />
                      XMG
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "1rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <label style={{ minWidth: "30vw", padding: "0.5rem" }}>Verified Autograph Price:{" "}</label>
                      <input
                        style={{
                          borderRadius: "8px",
                          padding: "4px",
                          border: "none",
                          borderBottom: "3px solid grey",
                          marginRight: "5px",
                          outline: "none",
                        }}
                        type="number"
                        value={verifiedAutographPrice}
                        placeholder="Amount XMG"
                        min={5}
                        max={100}
                        onChange={(e) => {
                          setVerifiedAutographPrice(e.target.value);
                        }}
                      />
                      XMG
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "1rem",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <label style={{ minWidth: "30vw", padding: "0.5rem" }}>Membership:{" "}</label>
                      <input
                        style={{
                          borderRadius: "8px",
                          padding: "4px",
                          border: "none",
                          borderBottom: "3px solid grey",
                          marginRight: "5px",
                          outline: "none",
                        }}
                        type="number"
                        value={subscribePrice}
                        placeholder="Amount XMG"
                        min={5}
                        max={100}
                        onChange={(e) => {
                          setSubscribePrice(e.target.value);
                        }}
                      />
                      XMG
                    </div>

                    <div className="btns">
                      <button
                        onClick={() => {
                          updatePricing();
                        }}
                        style={{
                          minWidth: "30vw",
                          backgroundColor: "#8249A0",
                        }}
                      >
                        Update Changes
                      </button>
                    </div>
                    <p style={{ padding: "0.5rem", textAlign: "center !important" }}>Note: The minimum amount for service price is 5 XMG</p>
                  </div>{" "}
                </div>
              ) : null}

              {showAllMyEvents
                ? <div className="slide-container">
                  <div
                    id="slideE"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      backgroundColor: "#D6C8E1",
                      // margin: "1rem",
                      // minWidth: "600px",
                      width: "90%",
                      maxWidth: "600px",
                      minHeight: "400px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        padding: "5px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",

                      }}
                    >
                      <h5>My Scheduled Events</h5>
                      <FaWindowClose
                        className="FaWindowClose"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // document.getElementById("slideE").style.transition = "1sec";
                          // document.getElementById("slideE").style.right = "-200vw";

                          setTimeout(() => {
                            setShowAllMyEvents(false);
                          }, 100);
                        }}
                      />

                    </div>
                    {/* <p>No Requests</p> */}
                    {/* <h5>Club Request</h5> */}
                    <div
                      style={{
                        maxHeight: "400px",
                        padding: "1rem",
                        overflowY: "auto",
                      }}
                    >
                      {AllMyEvents.map((event, index) => (
                        <div
                          key={index}
                          className="messageBox"
                          style={{
                            minWidth: "300px",
                            padding: "1px",
                            margin: "8px",
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <p style={{ fontSize: '14px', marginLeft: '1rem' }}>Event Title: {event.eventTitle}</p>
                          <p style={{ fontSize: '14px', marginLeft: '1rem' }}>Event Date : {event.eventDate}</p>
                          <p style={{ fontSize: '14px', marginLeft: '1rem' }}>Event Time :{event.eventTime}</p>
                          {event.eventDesc ? <p style={{ fontSize: '14px', marginLeft: '1rem' }}>Event Description :{event.eventDesc}</p>
                            : null}
                          {/* <SubscribedUser username={user.username} /> */}
                          {/* <button
                            className="Approve-request"
                            onClick={() => { handleClubRequestApprove(user) }}
                          >
                            Approve
                          </button>
                          <button
                            className="Delete-request"
                            onClick={() => deleteClubRequest(user)}
                          >
                            Delete
                          </button> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                : null}

              {showSubscribers ? (
                <div className="slide-container">
                  <div
                    id="slideM"
                    style={{
                      borderRadius: "10px",
                      minWidth: "600px",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      backgroundColor: "#D6C8E1",
                      margin: "1rem",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    }}
                    className="slideM-class"
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        // padding: "5px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                        padding: "0.5rem",
                      }}
                    >
                      <h5 style={{ fontSize: "1.2rem", marginBottom: 0 }}>Memberships </h5>
                      <SoapboxTooltip title="Close" placement="left">
                        <span>
                          <IoCloseCircle
                            // className="FaWindowClose"
                            style={{ cursor: "pointer", color: "#DCD5FA", fontSize: "1.7rem" }}
                            onClick={() => {
                              document.getElementById("slideM").style.transition = "2sec";
                              document.getElementById("slideM").style.right = "-100vw";

                              setTimeout(() => {
                                setShowSubscribers(false);
                              }, 1000);
                            }}
                          />
                        </span>
                      </SoapboxTooltip>
                    </div>

                    <div
                      style={{
                        maxHeight: "400px",
                        padding: "1rem",
                        overflowY: "auto",
                      }}
                    >
                      {subscribedMembers.map((user, index) => (
                        <div
                          key={user.id}
                          className="messageBox"
                          style={{
                            minWidth: "250px",
                            padding: "1px",
                            margin: "8px",
                          }}
                        >
                          <SubscribedUser username={user.member} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {showCreateHoot ? (
                <div className="slide-container">
                  <div id="slideH" className='sH-responsive'>
                    <CreatePrivateHoot
                      closeHoot={() => {
                        document.getElementById("slideH").style.transition =
                          "2sec";
                        document.getElementById("slideH").style.right =
                          "-100vw";

                        setTimeout(() => {
                          setShowCreateHoot(false);
                          window.location.reload(false);
                        }, 1000);
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {showIframe ? (
                <div className="slide-container">
                  <div
                    id="slideIFM"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "#DCD5FA",
                      padding: "1rem",
                      margin: "1rem",
                      width: '100%',
                      height: '100vh',
                    }}
                  >
                    <span>
                      <IoCloseCircle
                        style={{
                          cursor: "pointer",
                          color: "#8249A0",
                          fontSize: "1.7rem",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                        }}
                        onClick={() => {
                          document.getElementById("slideIFM").style.transition = "2sec";
                          document.getElementById("slideIFM").style.right = "-100vw";

                          setClubFloor(true);
                          setTimeout(() => {
                            setShowIframe(false);
                          }, 500);
                        }}
                      />
                    </span>

                    <iframe
                      src={iframeBox.src}
                      allow={`camera ${iframeBox.src}; microphone ${iframeBox.src}`}
                      title={iframeBox.title}
                      width="100%"
                      height="100%"
                    >
                    </iframe>
                  </div>
                </div>
              ) : null}

              {showBreakoffForm ? (
                <div className="showBreakoffForm" id="showBreakoffFormId">
                  <h5>Enter The Topic for BreakOff Chat</h5>
                  <div style={{ padding: '33px', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> <input placeholder="Enter Topic" value={breakOffInput} onChange={(e) => {
                    setBreakOffInput(e.target.value);
                  }} />
                    <button className="d-grid col-12 btn-main login-form-button" style={{ position: 'absolute', right: '0' }}
                      onClick={() => {
                        if (breakOffInput) { createBreakoff() } else {
                          toast.success(
                            "Please Enter Topic for Breakoff chat"
                          );
                        }


                      }}
                    >Create Now</button>
                  </div>

                </div>
              ) : null}

              {showClubRules ? (
                <SoapboxPrivateClubRules setShowClubRules={setShowClubRules} />
              ) : null}

              {showNotification ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DCD5FA",
                    padding: "1rem",
                    margin: "1rem",
                  }}
                >
                  <h5>Notification</h5>
                  <p>No Notification</p>
                </div>
              ) : null}

              {/* channel-media */}
              <div
                className="channel-media"
                id="feed"
                style={{ display: "flex", transition: "1s" }}
              >
                {clubFloor
                  ? uploads && (
                    <div style={{ flex: "0.5" }}>
                      <InfiniteScroll
                        dataLength={uploads.length}
                        next={fetchMoreHoots}
                        hasMore={hasMore}
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
                              />
                            </div>
                          );
                        })}
                      </InfiniteScroll>
                    </div>
                  ) : null}

{marketPlaceArea ? (
                <FortisMarketplaceArea />
              ) : null}

                {privateChat ? (
                  <div className="privateChat-club" id="privatechatslide">
                    <div
                      className="live-header"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#8149a06c",
                        color: "white",
                        borderRadius: "3px",
                        maxWidth: "440px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {privateChatPerson && privateChatPerson.profilePic ? (
                          <img
                            src={privateChatPerson.profilePic}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "15px",
                            }}
                          />
                        )
                          : null
                        }

                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "0.93rem",
                            marginTop: "12px",
                          }}
                        >
                          {privateChatPerson.name}
                        </p>
                      </span>

                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {userInfo[0].communityClub == 1
                          ? null
                          : <SoapboxTooltip title={"Delete Chat"} placement="bottom">
                            <span
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#CF2128',
                                width: '22px',
                                height: '22px',
                                borderRadius: '27px',
                                marginRight: '15px',
                                fontSize: '18px'
                              }}
                              onClick={() => { deletePrivateChatDuo(userInfo[0].name, privateChatPerson.name) }}
                            >
                              <BsTrash />
                            </span>
                          </SoapboxTooltip>
                        }
                        Private Chat
                        <FaWindowClose
                          className="icon-text"
                          onClick={() => {
                            document.getElementById(
                              "privatechatslide"
                            ).style.transition = "2sec";
                            document.getElementById(
                              "privatechatslide"
                            ).style.right = "-100vw";

                            setTimeout(() => {
                              setPrivateChat(false);
                              setClubFloor(true);
                              setShowChatRoom(true)
                            }, 200);
                          }}
                        />
                      </span>
                    </div>
                    <div
                      className="chatarea"
                      style={{
                        marginTop: VideoAvailable ? "300px" : "0px",
                        zIndex: "-1",
                      }}
                    >
                      {chatDataPrivate.length
                        ? chatDataPrivate.map((e) => (
                          <div
                            className="messageBox"
                           

                          >
                            <div className="ProfileBox">
                              <img
                                className="chat-profile"
                                src={e.imgSrc ? e.imgSrc : null}
                              />
                              <p>{e.chatname}</p>
                             <p className="timestamp"> {e.timestamp}</p>
                            </div>
                            <Linkify
                              componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key
                              ) => (
                                <a
                                  target="blank"
                                  href={decoratedHref}
                                  key={key}
                                >
                                  {decoratedText}
                                </a>
                              )}
                            >
                              {" "}
                              <div
                                className={
                                  e.isEmoji ? "message-emoji" : "message"
                                }
                              >
                                {!e.isVideo && !e.isImage && !e.isPoll && !e.isEvent ? e.message : null}
                              </div>
                            </Linkify>
                            
                    
                            {e.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                              <Form onSubmit={(e) => e.preventDefault()}>

                                <Form.Group className="mb-3" >
                                  <Form.Label>{e.pollData.Question}</Form.Label>

                                </Form.Group>

                                <Form.Group className="mb-3" >

                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                   
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                    onChange={() => {

                                      // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                      // chatData[chatData.indexOf(e)]
                                      e.pollData.pollA = e.pollData.pollA + 1
                                      e.pollData.pollB = e.pollData.pollB
                                      e.pollData.pollC = e.pollData.pollC


                                      // let messageContainer = document.querySelector(".chatarea");

                                      // messageContainer.scrollTop = messageContainer.scrollHeight;
                                      // setChatData(chatData.filter((chat) => chat !== e))
                                      // setChatData((chat) => [...chat, e])
                                      // updatePollData(e)
                                    }}
                                  />
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                    <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                   
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                   
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                       
                                    <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                       </Form.Group>

                                <Form.Group className="mb-3" >
                               
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                    onChange={() => {

                                      // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                      // chatData[chatData.indexOf(e)]

                                      // e.pollData.pollC = 100
                                      // e.pollData.pollA = 0
                                      // e.pollData.pollB = 0

                                      e.pollData.pollC = e.pollData.pollC + 1
                                      e.pollData.pollA = e.pollData.pollA
                                      e.pollData.pollB = e.pollData.pollB
                                      // let messageContainer = document.querySelector(".chatarea");

                                      // messageContainer.scrollTop = messageContainer.scrollHeight;
                                      // setChatData(chatData.filter((chat) => chat !== e))
                                      // setChatData((chat) => [...chat, e])
                                      // updatePollData(e)
                                    }}
                                  />
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                    <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                       </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="radio" name="radio" label="Check me out" />
  </Form.Group> */}
                                <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                  toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                  let messageContainer = document.querySelector(".chatarea");

                                  messageContainer.scrollTop = messageContainer.scrollHeight;
                                  setChatData(chatData.filter((chat) => chat !== e))
                                  setChatData((chat) => [...chat, e])
                                  updatePollData(e)
                                }}>
                                  Vote
                                </Button>
                              </Form>
                            </div> : null}
                            {e.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                              <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                              <p>Event Title : {e.event.eventTitle}</p>
                              {e.event.eventDesc ? <p>Event Description : {e.event.eventDesc}</p> : null}
                              <p>Event Date : {e.event.eventDate}</p>
                              <p>Event Time : {e.event.eventTime}</p>
                            </div> : null}
                            {e.isVideo ? (
                              <video
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                                controls={true}
                                src={e.message}
                              ></video>
                            ) : null}
                            {e.isImage ? (
                              <img
                                src={e.message}
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: e.isSticker ? "60px" : "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                              />
                            ) : null}

                            {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                            {/* {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                              className="reply-button" 
                              onClick={()=>{
                                setReplyData({chatData:e,user:{
                                name: userFullName,
                                profilePic: userProfilePic,
                              }});setShowReply(!showReply)}}>{showReply?"Reply":"Reply"}</button> : null} */}
                            <div className="reply-box"></div>
                          </div>
                        ))
                        : null}
  {srcPrivate && mimeTypePrivate.substr(0, 5) == "image" ? (
                        <div className="messageBox">
                          <img
                            src={srcPrivate}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "-10px",
                            }}
                          />
                          <button
                            onClick={() => {
                              uploadPrivate(filePrivate, filePrivate.type);
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}

                      {srcPrivate && mimeTypePrivate.substr(0, 5) == "video" ? (
                        <div className="messageBox">
                          <video
                            src={srcPrivate}
                            style={{
                              width: "200px",
                              height: "auto",
                              marginTop: "-10px",
                            }}
                            className="messageBox"
                          />
                          <button
                            onClick={() => {
                              uploadPrivate(filePrivate, filePrivate.type);
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setFilePrivate([]);
                              setSrcPrivate(null);
                              setMimeTypePrivate("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}
                      {emojiPickerPrivate && (
                        <ClickAwayListener
                          onClickAway={() => {
                            setEmojiPickerPrivate(false);
                          }}
                        >
                          <div>
                            <Picker
                              native
                              onEmojiClick={(event, emojiObject) => {
                                setMessageInboxValuePrivate(
                                  messageInboxValuePrivate + emojiObject.emoji
                                );
                                // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                //  // socket.emit('send',message);
                                // socket.emit('send', {
                                //     name: userFullName,
                                //     message: emojiObject.emoji,
                                //     profilePic: userProfilePic,
                                //     isEmoji: true
                                // });
                              }}
                              pickerStyle={{
                                position: "absolute",
                                bottom: "0px",
                                left: "0.2rem",
                                zIndex: "1111",
                              }}
                            />
                          </div>
                        </ClickAwayListener>
                      )}

{stickerPickerPrivate ? <div style={{
                         position: "sticky",
                         bottom: "0px",
                        left: "0.5rem",
                        backgroundColor: '#652C90',
                        borderRadius: '5px',
                        padding: '8px',
                        zIndex: "1111", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap'
                      }}>
                        {stickersImages.map((image) => <img src={image}
                          onClick={() => {
                            let today = new Date();
                            let message=image;
                            let threadId = uuidv4()
                                let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
                              
                            appendPrivate(
                              userFullName,
                              `${image}`,
                              "left",
                              `${BaseURL}/profile-pictures/${userProfilePic}`,
                              false,
                              timestamp,
                              false,
                             true,true
                            );
                            // socket.emit("send", {
                            //   name: userFullName,
                            //   message: `${image}`,
                            //   profilePic: userProfilePic,
                            //   isEmoji: false,
                            //   isVideo: false,
                            //   isImage: true,
                            //   isSticker: true
                            // });
                          
                            socket.emit("private-message-soapbox", {
                              threadId:threadId,
                              to: privateChatPerson.name,
                              from: userFullName,
                              isClub: 0,
                              isPrivate: 1,
                              isCommunity: 0,
                              name: userFullName,
                              message: message,
                              profilePic: userProfilePic,
                              isEmoji: false,
                              isSticker:true,
                              isImage:true,
                              timestamp: timestamp
                            });
                            setStickerPickerPrivate(false)
                          }}
                          style={{ width: '70px', minWidth: '70px', minHeight: '70px', margin: '5px', cursor: 'pointer', backgroundColor: 'whitesmoke', padding: '5px' }} />)}
                      </div> : null
                      }
                    </div>

                    <div className="send-private">
                      <ReactTooltip />
                      <form
                        action="#"
                        id="send-container"
                        style={{ marginLeft: privateChat ? "5px" : "5px" }}
                        onSubmit={(e) => messagesubmitPrivate(e,privateChatPerson,userProfilePic,userFullName)}
                      >
                        <label htmlFor="post-video">
                          <SoapboxTooltip title={"Share Video"} placement="top">
                            <img
                              src={videochat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              width="27px"
                            />
                          </SoapboxTooltip>
                        </label>
                        <input
                          type="file"
                          id="post-video"
                          name="video"
                          accept="video/*"
                          onChange={handleFilePrivate}
                          hidden
                          disabled={false}
                        />

                        <label htmlFor="post-image">
                          <SoapboxTooltip title={"Share Photos"} placement="top">
                            <img
                              src={imagechat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              width="27px"
                            />
                          </SoapboxTooltip>
                        </label>
                        <input
                          type="file"
                          id="post-image"
                          name="image"
                          accept="image/*"
                          onChange={handleFilePrivate}
                          hidden
                          disabled={false}
                        />

                        <SoapboxTooltip title={"Share File"} placement="top">
                          <img
                            src={filechat}
                            style={{ margin: "5px", cursor: "pointer" }}
                            width="27px"
                          />
                        </SoapboxTooltip>
                        <SoapboxTooltip title={"Stickers"} placement="top">
                          <img
                            src={stickerIcon}
                            style={{ width: '25px', padding: '3px', borderRadius: '15px', margin: "5px", cursor: "pointer", backgroundColor: '#8249A0' }}
                            onClick={() => {
                              setStickerPickerPrivate(!stickerPickerPrivate);
                            }}
                          />
                        </SoapboxTooltip>

                        <SoapboxTooltip title={"Emoji"} placement="top">
                          <img
                            src={emojiIcon}
                            style={{ margin: "5px", cursor: "pointer" }}
                            onClick={() => {
                              setEmojiPickerPrivate(!emojiPickerPrivate);
                            }}
                            width="27px"
                          />
                        </SoapboxTooltip>

                        <input
                          type="text"
                          name="messageInp"
                          value={messageInboxValuePrivate}
                          autoComplete="off"
                          id="messageInp"
                          style={{ width: privateChat ? "230px" : "230px" }}
                          onChange={(e) => {
                            setMessageInboxValuePrivate(e.target.value);
                          }}
                        />

                        <button
                          type="submit"
                          style={{
                            border: "none",
                            outline: "none",
                            background: "none",
                            marginLeft: "5px",
                          }}
                        >
                          <SoapboxTooltip title={"Send Message"} placement="top">
                            <img src={sendIcon} width="27px" />
                          </SoapboxTooltip>
                        </button>
                      </form>
                    </div>
                  </div>
                ) : null}

{privateChatList
                    ? <div className="privateChatListBox" id="privateChatList">
                      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}} >
                      
                        <h5 style={{
                          textAlign: 'center',
                          fontSize: '0.93rem',
                          fontWeight: '600',
                          margin: '0.5rem 0',
                          borderRadius: '5px',
                          padding: '0.5rem',
                          width: '100%',
                          backgroundColor: "whitesmoke"
                        }}
                        >
                            <img
                      
                      src={chathive}
                      className="chativelogo"
                    />
                      ChatHive
                        </h5>
                        <button className="closebtn" onClick={() => {
                          if (!privateChatList) {
                            setPrivateChatList(!privateChatList)
                   
                            setTimeout(() => {
                              if (document.getElementById("privateChatList")) {
                                document.getElementById("privateChatList").style.transition = "1sec";
                                document.getElementById("privateChatList").style.right = "0.8rem";
                              }
                            }, 1);
                          } else {
                            document.getElementById("privateChatList").style.transition = "1sec";
                            document.getElementById("privateChatList").style.right = "-100vw";

                            setTimeout(() => {
                              setPrivateChatList(false)
                            }, 200);
                          }
                        }}>X</button>
                      </div>
                      <InboxMessage setInviteBox={()=>{setInviteBoxChat(true)}} socket={socket} actualUsername={userInformation.username} username={userFullName}  openPrivateChatfromInbox={(e)=>{openPrivateChatfromInbox(e)}} />
                    </div>
                    : null
                  }

                {/* ------------------- Chat Container newly style added here ------------------- */}
                {showChatRoom ? (
                  <div
                    className="container"
                    style={{
                      // left: clubFloor || privateChat ? "20px" : "100px",
                      // width: clubFloor || privateChat ? "40%" : "80%",

                      // minWidth: clubFloor || privateChat ? "500px" : "700px",
                      transition: "1s",
                      marginTop: "0.4rem",
                      backgroundColor: "#EDEDFF",
                      border: "2px solid #D9D2FA",
                      overflowX: "hidden",
                      maxHeight: '80vh',
                      flex: clubFloor ? "0.5" : "1",
                      maxWidth:clubFloor ? "500px" : "60vw"
                    }}
                  >
                    <div
                      className="live-header"
                      style={{
                        margin: 0,
                        backgroundColor: "#8249A0",
                        color: "white",
                        // borderRadius: "3px",
                        // marginLeft: "-35px",
                        // marginTop: "-35px",
                        display: "flex",
                        // flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // position: "fixed",
                        // width: "25%",
                        // minWidth: clubFloor || privateChat ? "450px" : "650px",
                        // minWidth: "inherit",
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        padding: "0.5rem",
                        gap: "0.5rem",
                        zIndex: "5",
                      }}
                    >
                      {" "}
                      <span>
                        {userInfo[0].name}'s Club Chat
                      </span>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: "0.5rem"
                      }}
                      >
                        {/* <img
                                src={videolive}
                                style={{ cursor: "pointer" }}
                                width="28px"
                                onClick={() => {
                                  setBroadcastStream(true);
                                }}
                              /> */}
                        <SoapboxTooltip title={"Invite"} placement="bottom">
                          <span style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#dcd5fa',
                            color: "#8249A0",
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            // marginLeft: '15px',
                            fontSize: '1rem'
                          }}
                            onClick={() => setInviteBox(true)}
                          >
                            <Share />
                          </span>
                        </SoapboxTooltip>
                        <SoapboxTooltip title={"Stream Live"} placement="bottom">
                          <span style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#dcd5fa',
                            color: "#8249A0",
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            // marginLeft: '15px',
                            fontSize: '1.1rem'
                          }}
                            onClick={() => {
                              setBroadcastStream(true);
                            }}
                          >
                            <RiLiveLine />
                          </span>
                        </SoapboxTooltip>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '58px', flexDirection: 'row' }}>
                          <SoapboxTooltip title={"Schedule Event"} placement="top">
                            <span style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                              backgroundColor: '#dcd5fa',
                              color: "#8249A0",
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              // marginLeft: '15px',
                              fontSize: '1.1rem'
                            }}
                              onClick={() => { setScheduleBox(!scheduleBox) }}
                            >
                              <RiCalendarEventLine />
                            </span>
                          </SoapboxTooltip>
                          <SoapboxTooltip title={"Create Poll"} placement="top">
                            <span style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                              backgroundColor: '#dcd5fa',
                              color: "#8249A0",
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              // marginLeft: '15px',
                              fontSize: '1.1rem'
                            }}
                              onClick={() => {
                                if (showPollForm) {
                                  document.getElementById("showPollFormId").style.transition = "2s";
                                  document.getElementById("showPollFormId").style.left = "200vw";

                                  setTimeout(() => {
                                    setShowPollForm(false);
                                  }, 1000);
                                } else {
                                  setShowPollForm(true);

                                  setTimeout(() => {
                                    if (document.getElementById("showPollFormId")) {
                                      document.getElementById("showPollFormId").style.transition = "1s";
                                      document.getElementById("showPollFormId").style.left = "70px";
                                    }
                                  }, 1);
                                }
                              }}
                            >
                              <RiBookmark3Line />
                            </span>
                          </SoapboxTooltip></div>

                        {userInfo[0].communityClub == 1
                          ? null
                          : <SoapboxTooltip title={"Delete Chat"} placement="bottom">
                            <span style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                              backgroundColor: '#dcd5fa',
                              color: "#8249A0",
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              // marginLeft: '15px', 
                              fontSize: '1.1rem'
                            }}
                              onClick={() => { deletePrivateChatAll(userInfo[0].username) }}
                            >
                              <FaRegTrashAlt />
                            </span>
                          </SoapboxTooltip>}
                      </div>
                    </div>

                    {showPollForm
                      ? <div className="showPollForm" id="showPollFormId">
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#652C90'
                        }}
                        >
                          <h5>Create A Poll</h5>
                          <FaWindowClose className="FaWindowClose" onClick={() => {
                            if (showPollForm) {
                              document.getElementById("showPollFormId").style.transition = "2s";
                              document.getElementById("showPollFormId").style.left = "200vw";

                              setTimeout(() => {
                                setShowPollForm(false);
                              }, 1000);
                            } else {
                              setShowPollForm(true);

                              setTimeout(() => {
                                if (document.getElementById("showPollFormId")) {
                                  document.getElementById("showPollFormId").style.transition = "1s";
                                  document.getElementById("showPollFormId").style.left = "70px";
                                }
                              }, 1);
                            }
                          }} />
                        </div>

                        <div style={{
                          padding: '33px',
                          position: 'relative',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                          paddingTop: '0px',
                          paddingBottom: '0px'
                        }}>

                          {FormEditPoll ?
                            <Form onSubmit={(e) => e.preventDefault()}>
                              <Form.Group className="mb-3" >
                                <Form.Label>Poll Expiry Duration</Form.Label>
                                <Form.Control as="select" onChange={(e) => setPollFormExpiry(e.target.value)} aria-label="Default select example">
                                  <option value="24">24 Hours</option>
                                  <option value="48">2 Days</option>
                                  <option value="72">3 Days</option>
                                  <option value="96">4 Days</option>
                                  <option value="120">5 Days</option>
                                  <option value="144">6 Days</option>
                                  <option value="168">7 Days</option>
                                </Form.Control>
                              </Form.Group>

                              <Form.Group className="mb-3" >
                                <Form.Label>Enter Question For Poll</Form.Label>
                                <Form.Control type="text" value={pollFormDataQ}
                                  onChange={(e) => { setPollFormDataQ(e.target.value) }} placeholder="Enter Question For Poll" />
                              </Form.Group>
                              <Form.Group className="mb-3" >
                                <Form.Label>Option A</Form.Label>
                                <Form.Control value={pollFormDataOA} onChange={(e) => { setPollFormDataOA(e.target.value) }} placeholder="Option A" />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                                <Form.Label>Option B</Form.Label>
                                <Form.Control value={pollFormDataOB} onChange={(e) => { setPollFormDataOB(e.target.value) }} placeholder="Option b" />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                                <Form.Label>Option C</Form.Label>
                                <Form.Control value={pollFormDataOC} onChange={(e) => { setPollFormDataOC(e.target.value) }} placeholder="Option c" />
                              </Form.Group>

                              <Button variant="primary" type="submit" style={{ marginLeft: '5px' }} onClick={() => { handlePollFormSubmission(userFullName) }}>
                                Save
                              </Button>
                            </Form>
                            : <Form onSubmit={(e) => e.preventDefault()}>
                              <Form.Group className="mb-3" >
                                <Form.Label>{pollFormData.Question}</Form.Label>

                              </Form.Group>
                              <Form.Group className="mb-3" >

                                <Form.Check type="checkbox" label={pollFormData.OptionA} />
                                <ProgressBar animated variant="success" now={pollFormData.pollA} />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                                <Form.Check type="checkbox" label={pollFormData.OptionB} />
                                <ProgressBar animated variant="info" now={pollFormData.pollB} />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                                <Form.Check type="checkbox" label={pollFormData.OptionC} />
                                <ProgressBar animated variant="warning" now={pollFormData.pollC} />
                              </Form.Group>

                              <Button variant="primary" onClick={() => { setFormEditPoll(!FormEditPoll) }} >
                                Edit
                              </Button>
                              <Button variant="primary" type="submit" style={{ marginLeft: '5px' }} onClick={() => { sentPollMessageInChat(pollFormData) }}>
                                Submit
                              </Button>
                            </Form>
                          }
                        </div>

                      </div>
                      : null
                    }

                    {broadcastStream ? (
                      <VideoChat
                        hallId={hallId}
                        userName={userInformation.username}
                        videoAvailable={() => {
                          setVideoAvailable(true);
                        }}
                        host={username}
                      />
                    )
                      : null
                    }

                    <div
                      className="chatarea"
                      style={{
                        marginTop: VideoAvailable ? "300px" : "0px",
                        zIndex: "-1",
                        marginBottom: "3rem",
                        overflow: "auto",
                      }}
                    >
                      {chatData.length
                        ? chatData.map((e) => (
                          e.isReply?   
                          <div
                          className="messageBox"
                         
                       
                        >
                             <div
                          className="messageBox"
                          style={{
                           
                              backgroundColor:'#D3D3D3',
                              margin:'0px',
                              marginBottom:'8px'
                            // width: "max-content",
                            // maxWidth: "fit-content",
                            // marginLeft: "auto",
                            // position: "relative",
                            // left: "3rem",
                            // marginRight: "3.5rem"
                          }}
                       
                        >
                          <div className="ProfileBox"   
                         >
                            <img
                              className="chat-profile"
                              src={e.parentChat.imgSrc ? e.parentChat.imgSrc : null}
                            />
                            <p>{e.parentChat.chatname}</p>
                            {/* <p className="timestamp"> {e.parentChat.timestamp}</p> */}
                          </div>
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key
                            ) => (
                              <a
                                target="blank"
                                href={decoratedHref}
                                key={key}
                              >
                                {decoratedText}
                              </a>
                            )}
                          >
                            {" "}
                            <div
                              className={
                                e.parentChat.isEmoji ? "message-emoji" : "message"
                              }
                            >
                              {!e.parentChat.isVideo && !e.parentChat.isImage && !e.parentChat.isPoll && !e.parentChat.isEvent
                                ? e.parentChat.message
                                : null}
                            </div>
                          </Linkify>
                          {e.parentChat.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                            <Form onSubmit={(e) => e.preventDefault()}>

                              <Form.Group className="mb-3" >
                                <Form.Label>{e.pollData.Question}</Form.Label>

                              </Form.Group>

                              <Form.Group className="mb-3" >

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]
                                    e.pollData.pollA = e.pollData.pollA + 1
                                    e.pollData.pollB = e.pollData.pollB
                                    e.pollData.pollC = e.pollData.pollC


                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                              
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                 
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                     
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                     </Form.Group>

                              <Form.Group className="mb-3" >
                             
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]

                                    // e.pollData.pollC = 100
                                    // e.pollData.pollA = 0
                                    // e.pollData.pollB = 0

                                    e.pollData.pollC = e.pollData.pollC + 1
                                    e.pollData.pollA = e.pollData.pollA
                                    e.pollData.pollB = e.pollData.pollB
                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                  <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                     </Form.Group>
                              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check type="radio" name="radio" label="Check me out" />
</Form.Group> */}
                              <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                let messageContainer = document.querySelector(".chatarea");

                                messageContainer.scrollTop = messageContainer.scrollHeight;
                                setChatData(chatData.filter((chat) => chat !== e))
                                setChatData((chat) => [...chat, e])
                                updatePollData(e)
                              }}>
                                Vote
                              </Button>
                            </Form>
                          </div> : null}
                          {e.parentChat.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                            <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                            <p>Event Title : {e.parentChat.event.eventTitle}</p>
                            {e.event.eventDesc ? <p>Event Description : {e.parentChat.event.eventDesc}</p> : null}
                            <p>Event Date : {e.parentChat.event.eventDate}</p>
                            <p>Event Time : {e.parentChat.event.eventTime}</p>
                          </div> : null}
                          {e.parentChat.isVideo ? (
                            <video
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                              controls={true}
                              src={e.parentChat.message}
                            ></video>
                          ) : null}
                          {e.parentChat.isImage ? (
                            <img
                              src={e.parentChat.message}
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: e.parentChat.isSticker ? "60px" : "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                            />
                          ) : null}

                          {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                          {/* {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                            className="reply-button" 
                            onClick={()=>{
                              setReplyData({chatData:e,user:{
                              name: userFullName,
                              profilePic: userProfilePic,
                            }});setShowReply(!showReply)}}>{showReply?"Reply":"Reply"}</button> : null}
                          <div className="reply-box"></div> */}
                        
                        </div>
                          <div className="ProfileBox"    onClick={() => {
                            if (e.chatname !== userFullName && !e.isPoll) {
                              toast.success(
                                `Opening Private Chat with ${e.chatname}`
                              );
                              setPrivateChatPerson({
                                name: e.chatname,
                                profilePic: e.imgSrc,
                              });
                              setPrivateChat(true);
                              setClubFloor(false);
                              // socket.emit("room", userInfo[0].username+userInformation.username);
                              getChatDataPrivate(e.chatname, userFullName)
                              // socket.emit("new-user-joined", {
                              //     name: userFullName,
                              //     profilePic: userProfilePic,
                              //   });

                              setTimeout(() => {
                                if (
                                  document.getElementById(
                                    "privatechatslide"
                                  )
                                ) {
                                  document.getElementById(
                                    "privatechatslide"
                                  ).style.transition = "1sec";
                                  document.getElementById(
                                    "privatechatslide"
                                  ).style.right = "30px";
                                }
                              }, 1);
                            }
                          }}>
                            <img
                              className="chat-profile"
                              src={e.imgSrc ? e.imgSrc : null}
                            />
                            <p>{e.chatname}</p>
                            <p className="timestamp"> {e.timestamp}</p>
                          </div>
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key
                            ) => (
                              <a
                                target="blank"
                                href={decoratedHref}
                                key={key}
                              >
                                {decoratedText}
                              </a>
                            )}
                          >
                            {" "}
                            <div
                              className={
                                e.isEmoji ? "message-emoji" : "message"
                              }
                            >
                              {!e.isVideo && !e.isImage && !e.isPoll && !e.isEvent
                                ? e.message
                                : null}
                            </div>
                          </Linkify>
                          {e.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                            <Form onSubmit={(e) => e.preventDefault()}>

                              <Form.Group className="mb-3" >
                                <Form.Label>{e.pollData.Question}</Form.Label>

                              </Form.Group>

                              <Form.Group className="mb-3" >

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]
                                    e.pollData.pollA = e.pollData.pollA + 1
                                    e.pollData.pollB = e.pollData.pollB
                                    e.pollData.pollC = e.pollData.pollC


                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                              </Form.Group>

                              <Form.Group className="mb-3" >
                              
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                 
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                 
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                     
                                  <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                     </Form.Group>

                              <Form.Group className="mb-3" >
                             
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                  onChange={() => {

                                    // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                    // chatData[chatData.indexOf(e)]

                                    // e.pollData.pollC = 100
                                    // e.pollData.pollA = 0
                                    // e.pollData.pollB = 0

                                    e.pollData.pollC = e.pollData.pollC + 1
                                    e.pollData.pollA = e.pollData.pollA
                                    e.pollData.pollB = e.pollData.pollB
                                    // let messageContainer = document.querySelector(".chatarea");

                                    // messageContainer.scrollTop = messageContainer.scrollHeight;
                                    // setChatData(chatData.filter((chat) => chat !== e))
                                    // setChatData((chat) => [...chat, e])
                                    // updatePollData(e)
                                  }}
                                />
                                  <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                  <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                     </Form.Group>
                              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check type="radio" name="radio" label="Check me out" />
</Form.Group> */}
                              <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                let messageContainer = document.querySelector(".chatarea");

                                messageContainer.scrollTop = messageContainer.scrollHeight;
                                setChatData(chatData.filter((chat) => chat !== e))
                                setChatData((chat) => [...chat, e])
                                updatePollData(e)
                              }}>
                                Vote
                              </Button>
                            </Form>
                          </div> : null}
                          {e.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                            <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                            <p>Event Title : {e.event.eventTitle}</p>
                            {e.event.eventDesc ? <p>Event Description : {e.event.eventDesc}</p> : null}
                            <p>Event Date : {e.event.eventDate}</p>
                            <p>Event Time : {e.event.eventTime}</p>
                          </div> : null}
                          {e.isVideo ? (
                            <video
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                              controls={true}
                              src={e.message}
                            ></video>
                          ) : null}
                          {e.isImage ? (
                            <img
                              src={e.message}
                              onDragStart={(e) => e.preventDefault()}
                              onmousedown={(event) => {
                                event.preventDefault
                                  ? event.preventDefault()
                                  : (event.returnValue = false);
                              }}
                              style={{
                                maxWidth: e.isSticker ? "60px" : "200px",
                                marginTop: "20px",
                                borderRadius: "5px",
                              }}
                            />
                          ) : null}

                          {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                          {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                            className="reply-button" 
                            onClick={()=>{
                              setReplyData({chatData:e.parentChat,user:{
                              name: userFullName,
                              profilePic: userProfilePic,
                            }});setShowReply(!showReply)}}
                            >{e.replyCount?e.replyCount+' more':0} Replies</button> : null}
                          {/* <div className="reply-box"></div> */}
                        </div>
                       :
                          <div
                            className="messageBox"
                           
                         
                          >
                            <div className="ProfileBox"    onClick={() => {
                              if (e.chatname !== userFullName && !e.isPoll) {
                                toast.success(
                                  `Opening Private Chat with ${e.chatname}`
                                );
                                setPrivateChatPerson({
                                  name: e.chatname,
                                  profilePic: e.imgSrc,
                                });
                                setPrivateChat(true);
                                setClubFloor(false);
                                // socket.emit("room", userInfo[0].username+userInformation.username);
                                getChatDataPrivate(e.chatname, userFullName)
                                // socket.emit("new-user-joined", {
                                //     name: userFullName,
                                //     profilePic: userProfilePic,
                                //   });

                                setTimeout(() => {
                                  if (
                                    document.getElementById(
                                      "privatechatslide"
                                    )
                                  ) {
                                    document.getElementById(
                                      "privatechatslide"
                                    ).style.transition = "1sec";
                                    document.getElementById(
                                      "privatechatslide"
                                    ).style.right = "30px";
                                  }
                                }, 1);
                              }
                            }}>
                              <img
                                className="chat-profile"
                                src={e.imgSrc ? e.imgSrc : null}
                              />
                              <p>{e.chatname}</p>
                              <p className="timestamp"> {e.timestamp}</p>
                            </div>
                            <Linkify
                              componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key
                              ) => (
                                <a
                                  target="blank"
                                  href={decoratedHref}
                                  key={key}
                                >
                                  {decoratedText}
                                </a>
                              )}
                            >
                              {" "}
                              <div
                                className={
                                  e.isEmoji ? "message-emoji" : "message"
                                }
                              >
                                {!e.isVideo && !e.isImage && !e.isPoll && !e.isEvent
                                  ? e.message
                                  : null}
                              </div>
                            </Linkify>
                            {e.isPoll ? <div style={{ marginTop: '30px' }} className="pollFormDiv">
                              <Form onSubmit={(e) => e.preventDefault()}>

                                <Form.Group className="mb-3" >
                                  <Form.Label>{e.pollData.Question}</Form.Label>

                                </Form.Group>

                                <Form.Group className="mb-3" >

                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                   
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionA}
                                    onChange={() => {

                                      // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                      // chatData[chatData.indexOf(e)]
                                      e.pollData.pollA = e.pollData.pollA + 1
                                      e.pollData.pollB = e.pollData.pollB
                                      e.pollData.pollC = e.pollData.pollC


                                      // let messageContainer = document.querySelector(".chatarea");

                                      // messageContainer.scrollTop = messageContainer.scrollHeight;
                                      // setChatData(chatData.filter((chat) => chat !== e))
                                      // setChatData((chat) => [...chat, e])
                                      // updatePollData(e)
                                    }}
                                  />
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)}%`}</span></div>
                                    <ProgressBar now={getVotingPercentage(e.pollData.pollA, e.pollData.pollB, e.pollData.pollC)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                   
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionB} onChange={() => {

// setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
// chatData[chatData.indexOf(e)]
// e.pollData.pollB = 100
// e.pollData.pollA = 0
// e.pollData.pollC = 0
e.pollData.pollA = e.pollData.pollA
e.pollData.pollB = e.pollData.pollB + 1
e.pollData.pollC = e.pollData.pollC


// let messageContainer = document.querySelector(".chatarea");

// messageContainer.scrollTop = messageContainer.scrollHeight;
// setChatData(chatData.filter((chat) => chat !== e))
// setChatData((chat) => [...chat, e])
// updatePollData(e)
}} />
                                   
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)}%`}</span></div>
                       
                                    <ProgressBar now={getVotingPercentage(e.pollData.pollB, e.pollData.pollA, e.pollData.pollC)} />
                       </Form.Group>

                                <Form.Group className="mb-3" >
                               
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Form.Check type="radio" name="radio" label={e.pollData.OptionC}
                                    onChange={() => {

                                      // setChatData(chatData.filter((chat)=>e.pollData.threadId!==chat.pollData.threadId))
                                      // chatData[chatData.indexOf(e)]

                                      // e.pollData.pollC = 100
                                      // e.pollData.pollA = 0
                                      // e.pollData.pollB = 0

                                      e.pollData.pollC = e.pollData.pollC + 1
                                      e.pollData.pollA = e.pollData.pollA
                                      e.pollData.pollB = e.pollData.pollB
                                      // let messageContainer = document.querySelector(".chatarea");

                                      // messageContainer.scrollTop = messageContainer.scrollHeight;
                                      // setChatData(chatData.filter((chat) => chat !== e))
                                      // setChatData((chat) => [...chat, e])
                                      // updatePollData(e)
                                    }}
                                  />
                                    <span className="votingPercentage">{`${getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)}%`}</span></div>
                                    <ProgressBar  now={getVotingPercentage(e.pollData.pollC, e.pollData.pollA, e.pollData.pollB)} />
                       </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="radio" name="radio" label="Check me out" />
  </Form.Group> */}
                                <Button variant="primary" type="submit" disabled={e.pollData.isVoted} id={e.pollData.threadId} onClick={() => {
                                  toast.success('Voted Successfully'); document.getElementById(e.pollData.threadId).disabled = true; uploadPollResponse(e);
                                  let messageContainer = document.querySelector(".chatarea");

                                  messageContainer.scrollTop = messageContainer.scrollHeight;
                                  setChatData(chatData.filter((chat) => chat !== e))
                                  setChatData((chat) => [...chat, e])
                                  updatePollData(e)
                                }}>
                                  Vote
                                </Button>
                              </Form>
                            </div> : null}
                            {e.isEvent ? <div style={{ marginTop: '30px' }} className="EventFormDiv">
                              <h5 style={{ fontSize: '15px' }}>Event Created by {e.event.fullName}</h5>
                              <p>Event Title : {e.event.eventTitle}</p>
                              {e.event.eventDesc ? <p>Event Description : {e.event.eventDesc}</p> : null}
                              <p>Event Date : {e.event.eventDate}</p>
                              <p>Event Time : {e.event.eventTime}</p>
                            </div> : null}
                            {e.isVideo ? (
                              <video
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                                controls={true}
                                src={e.message}
                              ></video>
                            ) : null}
                            {e.isImage ? (
                              <img
                                src={e.message}
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: e.isSticker ? "60px" : "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                              />
                            ) : null}

                            {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                            {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                              className="reply-button" 
                              onClick={()=>{
                                setReplyData({chatData:e,user:{
                                name: userFullName,
                                profilePic: userProfilePic,
                              }});setShowReply(!showReply)}}>{showReply?"Reply":"Reply"}</button> : null}
                            <div className="reply-box"></div>
                          </div>
                        ))
                        : null}

{src && mimeType.substr(0, 5) == "image" ? (
                      <div className="messageBox">
                        <img
                          src={src}
                          style={{
                            width: "200px",
                            height: "auto",
                            marginTop: "-10px",
                          }}
                        />
                        <button
                          onClick={() => {
                            upload(file, file.type);
                            setFile([]);
                            setSrc(null);
                            setMimeType("");
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFile([]);
                            setSrc(null);
                            setMimeType("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )
                      : null
                    }

                    {src && mimeType.substr(0, 5) == "video" ? (
                      <div className="messageBox">
                        <video
                          src={src}
                          style={{
                            width: "200px",
                            height: "auto",
                            marginTop: "-10px",
                          }}
                          className="messageBox"
                        />
                        <button
                          onClick={() => {
                            upload(file, file.type);
                            setFile([]);
                            setSrc(null);
                            setMimeType("");
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setFile([]);
                            setSrc(null);
                            setMimeType("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )
                      : null
                    }
                    </div>

                    {emojiPicker && (
                      <ClickAwayListener
                        onClickAway={() => {
                          setEmojiPicker(false);
                        }}
                      >
                        <div>
                          <Picker
                            native
                            onEmojiClick={(event, emojiObject) => {
                              setMessageInboxValue(
                                messageInboxValue + emojiObject.emoji
                              );
                              // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                              //  // socket.emit('send',message);
                              // socket.emit('send', {
                              //     name: userFullName,
                              //     message: emojiObject.emoji,
                              //     profilePic: userProfilePic,
                              //     isEmoji: true
                              // });
                            }}
                            pickerStyle={{
                              position: "absolute",
                              bottom: "3rem",
                              left: "0.5rem",
                              zIndex: "1111",
                            }}
                          />
                        </div>
                      </ClickAwayListener>
                    )}

                    {stickerPicker ? <div style={{
                      position: "absolute",
                      bottom: "3rem",
                      left: "0.5rem",
                      backgroundColor: '#652C90',
                      borderRadius: '5px',
                      padding: '8px',
                      zIndex: "1111", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap'
                    }}>
                      {stickersImages.map((image) => <img src={image}
                        onClick={() => {

                          append(
                            userFullName,
                            `${image}`,
                            "left",
                            `${BaseURL}/profile-pictures/${userProfilePic}`,
                            false,
                            false,
                            true, "", "", "", true
                          );
                          socket.emit("send", {
                            name: userFullName,
                            message: `${image}`,
                            profilePic: userProfilePic,
                            isEmoji: false,
                            isVideo: false,
                            isImage: true,
                            isSticker: true
                          });
                          setStickerPicker(false)
                        }}
                        style={{ width: '70px', minWidth: '70px', minHeight: '70px', margin: '5px', cursor: 'pointer', backgroundColor: 'whitesmoke', padding: '5px' }} />)}
                    </div> : null
                    }

                   

                    {/* ----------------------------- newly redesigned chat area ------------------------- */}
                    <div className="send">
                      <ReactTooltip />
                      <form
                        action="#"
                        id="send-container"
                        style={{
                          // marginLeft: clubFloor || privateChat ? "5px" : "50px",
                        }}
                        onSubmit={(e) => messagesubmit(e)}
                      >
                        <div className="in-chat-sharing-options">
                          <label htmlFor="post-video">
                            <SoapboxTooltip title={"Share Video"} placement="top">
                              <img
                                src={videochat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                width="27px"
                              />
                            </SoapboxTooltip>
                          </label>
                          <input
                            type="file"
                            id="post-video"
                            name="video"
                            accept="video/*"
                            onChange={handleFile}
                            hidden
                          />

                          <label htmlFor="post-image">
                            <SoapboxTooltip title={"Share Photos"} placement="top">
                              <img
                                src={imagechat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                width="27px"
                              />
                            </SoapboxTooltip>
                          </label>
                          <input
                            type="file"
                            id="post-image"
                            name="image"
                            accept="image/*"
                            onChange={handleFile}
                            hidden
                          />

                          <SoapboxTooltip title={"Share File"} placement="top">
                            <img
                              src={filechat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              width="27px"
                            />
                          </SoapboxTooltip>
                          <SoapboxTooltip title={"Stickers"} placement="top">
                            <img
                              src={stickerIcon}
                              style={{ width: '25px', padding: '3px', borderRadius: '15px', margin: "5px", cursor: "pointer", backgroundColor: '#8249A0' }}
                              onClick={() => {
                                setStickerPicker(!stickerPicker);
                              }}
                            />
                          </SoapboxTooltip>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                          <SoapboxTooltip title={"Emoji"} placement="top">
                            <img
                              src={emojiIcon}
                              style={{ margin: "5px", cursor: "pointer" }}
                              onClick={() => {
                                setEmojiPicker(!emojiPicker);
                              }}
                              width="27px"
                            />
                          </SoapboxTooltip>

                          <input
                            type="text"
                            name="messageInp"
                            value={messageInboxValue}
                            autoComplete="off"
                            id="messageInp"
                            style={{
                              // width: clubFloor || privateChat ? "350px" : "600px",
                            }}
                            onChange={(e) => {
                              setMessageInboxValue(e.target.value);
                            }}
                          />

                          <button
                            type="submit"
                            style={{
                              border: "none",
                              outline: "none",
                              background: "none",
                              marginLeft: "5px",
                            }}
                          >
                            <SoapboxTooltip title={"Send Message"} placement="top">
                              <img src={sendIcon} width="27px" />
                            </SoapboxTooltip>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}
              </div>

              {onDemandMedia ? (
                <div
                  className="channel-media"
                  id="feed"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {onDemandUploads && (
                    <InfiniteScroll
                      dataLength={onDemandUploads.length}
                      next={fetchMoreOnDemandHoots}
                      hasMore={onDemandHasMore}
                      style={{
                        display: "flex",
                        margin: "1rem",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        padding: "1rem",
                      }}
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
                            {!hoot.mimeType ? (
                              <div className="img-container">
                                <div
                                  className="hoot-img-vertical-profile"
                                  style={{
                                    animation: "none",
                                    backgroundColor: "#d9d1f8",
                                  }}
                                  onContextMenu={(e) => e.preventDefault()}
                                  onClick={() => {
                                    history.push(
                                      `/${hoot.authorUsername}/hoot/${btoa(
                                        hoot.id
                                      )}`
                                    );
                                  }}
                                >
                                  {(ReactPlayer.canPlay(hoot.link) &&
                                    hoot.link.endsWith(".mp4")) ||
                                    hoot.link.endsWith(".mkv") ||
                                    hoot.link.endsWith(".mov") ||
                                    hoot.link.endsWith(".ogv") ||
                                    hoot.link.endsWith(".webm") ||
                                    hoot.link.endsWith(".mpg") ? (
                                    <div className="vdo-container">
                                      <video
                                        muted
                                        disablePictureInPicture
                                        className="hoot-vdo-profile"
                                        style={{ margin: "0" }}
                                        onMouseOver={(event) =>
                                          event.target.play()
                                        }
                                        onMouseOut={(event) =>
                                          event.target.pause()
                                        }
                                        onDragStart={(e) => e.preventDefault()}
                                      >
                                        <source src={hoot.link} />
                                        Your browser does not support HTML
                                        video.
                                      </video>
                                    </div>
                                  ) : hoot.link.endsWith(".mp3") ||
                                    hoot.link.endsWith(".ogg") ||
                                    hoot.link.endsWith(".wav") ||
                                    hoot.link.endsWith(".flac") ||
                                    hoot.link.endsWith(".aac") ||
                                    hoot.link.endsWith(".alac") ||
                                    hoot.link.endsWith(".dsd") ? (
                                    <div className="vdo-container">
                                      <video
                                        muted
                                        poster={`${BaseURL}/profile-pictures/${`${BaseURL}/profile-pictures/${hoot.profilePic}`}`}
                                        className="hoot-vdo-profile"
                                        style={{ margin: "0" }}
                                        onDragStart={(e) => e.preventDefault()}
                                      >
                                        <source src={hoot.link} />
                                        Your browser does not support HTML
                                        video.
                                      </video>
                                    </div>
                                  ) : (
                                    ReactPlayer.canPlay(hoot.link) && (
                                      <div className="player-profile-wrapper">
                                        <ReactPlayer
                                          url={hoot.link}
                                          className="react-player"
                                          controls="true"
                                          width={hoot.mimeType ? "97%" : "100%"}
                                          height="100%"
                                          light={true}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                <FiPlayCircle
                                  className="GIF-overlay"
                                  style={{ borderRadius: "50%" }}
                                  onClick={() => {
                                    history.push(
                                      `/${hoot.authorUsername}/hoot/${btoa(
                                        hoot.id
                                      )}`
                                    );
                                  }}
                                />
                              </div>
                            ) : hoot.mimeType.substr(0, 5) == "audio" ? (
                              <ExploreHoot
                                hootId={hoot.id}
                                username={hoot.authorUsername}
                                mimeType={hoot.mimeType}
                                hootImgId={hoot.image}
                              />
                            ) : (
                              <HootOutside
                                hootId={hoot.id}
                                username={hoot.authorUsername}
                                mimeType={hoot.mimeType}
                                hootImgId={hoot.image}
                              />
                            )}
                          </div>
                        );
                      })}
                    </InfiniteScroll>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default PrivateChannels;