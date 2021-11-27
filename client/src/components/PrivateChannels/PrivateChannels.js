import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Post from "../Post";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "../Feed/InfiniteScrollLoader";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import { FaTumblr, IoSend, FaWindowClose } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FcInvite, FcRules } from "react-icons/fc";
import {
  FiTwitter,
  FiSearch,
  FiSend,
  FiFolder,
  FiImage,
  FiVideo,
  FiSmile,
  FiStopCircle,
  FiSkipBack,
  FiPlayCircle,
  FiPlus,
} from "react-icons/fi";
import socket, { startSocket } from "../../socketChat";
import { GiHamburgerMenu } from "react-icons/gi";
import Picker from "emoji-picker-react";
import Linkify from "react-linkify";
import CreatePrivateHoot from "../../pages/CreatePrivateHoot";

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
import { toast } from "react-toastify";
import SubscribedUser from "../SubscribedUser";
import { IoRecording } from "react-icons/io5";
import { BiVideoRecording } from "react-icons/bi";
import { Call, Event, LiveTvRounded, VideoCall } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import oneonone from "../../assets/oneonone.png";
import groupcall from "../../assets/groupcall.png";
import personalmessage from "../../assets/personalmessage.png";
import membershipGraphic from "../../assets/membershipGraphic.png";

import { Form } from "react-bootstrap";
import ClickAwayListener from "react-click-away-listener";
import Autolinker from "autolinker";
import RandomSuggestedFollows from "../SideBar/RandomSuggestedFollows";
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
import videochat from "../../assets/videochat.png";
import imagechat from "../../assets/imagechat.png";
import filechat from "../../assets/filechat.png";
import emojiIcon from "../../assets/emoji.png";
import privatehooticon from "../../assets/private-hoot.png";
import xmgwallet from "../../assets/xmgwallet.png";
import StripePage from "../Stripe/StripePage";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
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
  const [chatDataPrivate, setChatDataPrivate] = useState([]);
  
  const [uploads, setUploads] = useState([]);
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

  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [broadcastStream, setBroadcastStream] = useState(false);
  const [messageInboxValuePrivate, setMessageInboxValuePrivate] = useState("");
  const [messageInboxValue, setMessageInboxValue] = useState("");
  
  const [file, setFile] = useState([]);
  const [src, setSrc] = useState(null);
  const [mimeType, setMimeType] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState("");
  const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
  const form = document.getElementById("send-container");
  const messageInput = document.getElementById("messageInp");

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

  const append = (
    chatname,
    message,
    position,
    imgSrc,
    isEmoji,
    isVideo,
    isImage
  ) => {
    setChatData((e) => [
      ...e,
      { chatname, message, position, imgSrc, isEmoji, isVideo, isImage },
    ]);
    

    var messageContainer = document.querySelector(".container");

    messageContainer.scrollTop = messageContainer.scrollHeight;
  };
  const appendPrivate = (
    chatname,
    message,
    position,
    imgSrc,
    isEmoji,
    isVideo,
    isImage
  ) => {
    setChatDataPrivate((e) => [
      ...e,
      { chatname, message, position, imgSrc, isEmoji, isVideo, isImage },
    ]);

    var messageContainer = document.querySelector(".privateChat-club");

    messageContainer.scrollTop = messageContainer.scrollHeight;
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
  const messagesubmit = (e) => {
    e.preventDefault();
    if (messageInboxValue) {
      const message = messageInboxValue;
      let emojiValidator = isEmoji(message);

      append(
        userFullName,
        `${message}`,
        "right",
        `${BaseURL}/profile-pictures/${userProfilePic}`,
        emojiValidator
      );
      // socket.emit('send',message);
      let isCommunity=userInfo[0].communityClub
      let isClub=userInfo[0].communityClub==1?0:1
      socket.emit("send", {
        name: userFullName,
        isClub:isClub,
         isPrivate:0,
         isCommunity:isCommunity,
        message: message,
        profilePic: userProfilePic,
        isEmoji: isEmoji(message),
      });
      setMessageInboxValue("");
    }
  };
  const messagesubmitPrivate = (e) => {
    e.preventDefault();
    if (messageInboxValuePrivate) {
      const message = messageInboxValuePrivate;
      let emojiValidator = isEmoji(message);

      appendPrivate(
        userFullName,
        `${message}`,
        "right",
        `${BaseURL}/profile-pictures/${userProfilePic}`,
        emojiValidator
      );
      // socket.emit('send',message);
      socket.emit("private-message-soapbox", {
         to:privateChatPerson.name,
         from:userFullName,
         isClub:0,
         isPrivate:1,
         isCommunity:0,
        name: userFullName,
        message: message,
        profilePic: userProfilePic,
        isEmoji: isEmoji(message),
      });
      setMessageInboxValuePrivate("");
    }
  };

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
          data.isEmoji
        );
      } else {
        append(
          data.name,
          `${data.message}`,
          "left",
          `${BaseURL}/profile-pictures/${data.profilePic}`,
          data.isEmoji,
          data.isVideo,
          data.isImage
        );
      }
    });
    socket.on("receive-private-chat-soapbox", (data) => {
    
        if(data.to==userFullName && data.from==privateChatPerson?privateChatPerson.name:userInformation.username){

        if (data.isEmoji) {
          appendPrivate(
            data.name,
            `${data.message}`,
            "left",
            `${BaseURL}/profile-pictures/${data.profilePic}`,
            data.isEmoji
          );
        } else {
            appendPrivate(
            data.name,
            `${data.message}`,
            "left",
            `${BaseURL}/profile-pictures/${data.profilePic}`,
            data.isEmoji,
            data.isVideo,
            data.isImage
          );
        }
        }
       
      });

    

    socket.on("left", (name) => {
      append(name, `${name} left the chat`);
    });
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`${BaseURL}/user/${username}`).then((response) => {
        setUserInfo(response.data);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getChatData = (username) => {
    axios
      .post(`${BaseURL}/upload/getChatData`, {
        roomname: username,
      })
      .then((res) => {
        console.log(chatData, "sky5");
        res.data.forEach((i) => {
          let chatname = i.chat.name,
            message = i.chat.message,
            position = i.chat.position,
            imgSrc = `${BaseURL}/profile-pictures/${i.chat.profilePic}`,
            isEmoji = i.chat.isEmoji,
            isVideo = i.chat.isVideo,
            isImage = i.chat.isImage;
          setChatData((e) => [
            ...e,
            { chatname, message, position, imgSrc, isEmoji, isVideo, isImage },
          ]);
        });

        setTimeout(() => {
           if(document.querySelector(".container")){
          var messageContainer = document.querySelector(".container");

          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
        }, 1000);
       
      
      });
  };
  const getChatDataPrivate = (a,b) => {
    
      setChatDataPrivate([]);
    axios
      .post(`${BaseURL}/upload/getChatDataPrivate`, {
        to:a,
        from:b
      })
      .then((res) => {
      
        res.data.forEach((i) => {
          let chatname = i.chat.name,
            message = i.chat.message,
            position = i.chat.position,
            imgSrc = `${BaseURL}/profile-pictures/${i.chat.profilePic}`,
            isEmoji = i.chat.isEmoji,
            isVideo = i.chat.isVideo,
            isImage = i.chat.isImage;
          setChatDataPrivate((e) => [
            ...e,
            { chatname, message, position, imgSrc, isEmoji, isVideo, isImage },
          ]);
        });
        setTimeout(() => {
           if(document.querySelector(".privateChat-club")){
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

  useEffect(() => {}, []);

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

  // useEffect(() => {
  // }, []);

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

  const privateProtected = {
    userSelect: "none",
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

  const callRequestUser = () => {
    setCallRequest(!callRequest);

    toast.success(
      `Requested call to ${username}`
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

    toast.success(
      `Cancelled call request to ${username}`
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
      let messageContainer = document.querySelector(".container");
      messageContainer.scrollTop = messageContainer.scrollHeight;
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
    // toast.promise(uploadDataToast, {
    //     pending: 'Sending Hoot...',
    //     success: 'Hoot Successful',
    //     error: 'Please try again',
    // });
  };

  // const getThisUserData=(username)=>{
  //     axios.get(`${BaseURL}/user/${username}`).then((res) => {
  //        return res.data[0]
  // })
  // .catch(err => { console.log(err) })
  // }

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
      .post(`http://localhost:3001/Payments/checkout`, {
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

  return (
    <Fragment>
      <div className="private-channels" style={{ userSelect: "none" }}>
        <div className="channel-banner">
          {/* <img src={banner} alt="banner" /> */}
        </div>
        <div className="channel-content">
          {userInfo.map((user) => {
            return (
              <Fragment key={user.id}>
                <div className="channel-user-info">
                  <ul
                    style={{
                      position: "sticky",
                      maxHeight: "90vh",
                      overflowY: "scroll",
                      alignSelf: "flex-start",
                    }}
                  >
                    <div
                      className="channel-banner"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: "75px",
                          left: "75px",
                          zIndex: 5,
                        }}
                        className="clubOwner"
                      >
                        Club Owner
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "59px",
                          left: "130px",
                          zIndex: 5,
                        }}
                        className="arrow-down"
                      ></div>

                      <img
                        src={banner}
                        alt="banner"
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>

                    <div
                      className="profile-pic"
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <img
                        src={`${BaseURL}/profile-pictures/${user.profilePic}`}
                        alt="profile"
                      />
                    </div>
                    <div>
                      <div className="user-information">
                        <div
                          className="name verificationBadgeContainer"
                          style={{ fontSize: "14px" }}
                        >
                          {user.name}
                          {user.verified === 1 ? (
                            <div className="profile-verification-badge">
                              <HiBadgeCheck
                                data-tip="Verified account"
                                data-text-color="#8249A0"
                                data-background-color="#D9D2FA"
                              />
                            </div>
                          ) : null}
                        </div>
                        <div className="username" style={{ fontSize: "14px" }}>
                          @{user.username}
                        </div>
                        <div className="followers">
                          <b style={{ fontSize: "14px" }}>
                            {formatCount(likes) + formatSi(likes)}
                          </b>
                          <span style={{ fontSize: "14px" }}> Likes </span>
                          <b style={{ fontSize: "14px" }}>
                            {formatCount(views) + formatSi(views)}
                          </b>
                          <span style={{ fontSize: "14px" }}> Views</span>
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
                        {userInfo[0].communityClub == 1 ? (
                                <div>
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
                                  <div className="control">
                                    <button>Marketplace</button>

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
                              <div className="control">
                                <button style={{ minWidth: "208px" }}>
                                  XMG Wallet
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Pecu Novus Wallet
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  MegaHoot Vault
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Crypto Index
                                </button>
                              </div>
                            </div>
                          ) : null}
                          {userInformation.username !== username &&
                          userInfo[0].communityClub !== 1 ? (
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
                            <div>
                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                Membership
                              </div>
                              <div className="control">
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showSubscribers) {
                                      document.getElementById(
                                        "slideM"
                                      ).style.transition = "2sec";
                                      document.getElementById(
                                        "slideM"
                                      ).style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowSubscribers(false);
                                      }, 1000);
                                    } else {
                                      setOnDemandMedia(false),
                                        setShowRequest(false);
                                      setShowFeed(false);
                                      setShowSubscribers(!showSubscribers);
                                      setShowPricingSetting(false);
                                      setShowNotification(false);
                                      setShowChatRoom(true);

                                      setTimeout(() => {
                                        if (document.getElementById("slideM")) {
                                          document.getElementById(
                                            "slideM"
                                          ).style.transition = "1sec";
                                          document.getElementById(
                                            "slideM"
                                          ).style.right = "250px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Membership
                                </button>

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
                                          ).style.right = "250px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Requests
                                </button>
                              </div>
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
                              <div className="control">
                                <button style={{ minWidth: "208px" }}>
                                  XMG Wallet
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Pecu Novus Wallet
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  MegaHoot Vault
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Crypto Index
                                </button>
                              </div>
                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                Club Toolbox
                              </div>
                              <div className="control">
                                <button style={{ minWidth: "208px" }}>
                                  Schedule a Virtual Experience
                                </button>

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
                                <button
                                  style={{ minWidth: "208px" }}
                                  onClick={() => {
                                    if (showPricingSetting) {
                                      document.getElementById(
                                        "slide"
                                      ).style.transition = "2sec";
                                      document.getElementById(
                                        "slide"
                                      ).style.right = "-100vw";

                                      setTimeout(() => {
                                        setShowPricingSetting(false);
                                      }, 1000);
                                    } else {
                                      setOnDemandMedia(false),
                                        setShowRequest(false);
                                      setShowFeed(false);
                                      setShowSubscribers(false);
                                      setShowPricingSetting(
                                        !showPricingSetting
                                      );
                                      setShowNotification(false);
                                      setShowChatRoom(true);
                                      setPrivateChat(false);

                                      setTimeout(() => {
                                        if (document.getElementById("slide")) {
                                          document.getElementById(
                                            "slide"
                                          ).style.transition = "1sec";
                                          document.getElementById(
                                            "slide"
                                          ).style.right = "250px";
                                        }
                                      }, 1);
                                    }
                                  }}
                                >
                                  Price Settings
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Podcasts
                                </button>

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

                              <br></br>

                              <div
                                className="live-header"
                                style={{
                                  backgroundColor: "#8249A0",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              >
                                Pay Per View Event
                              </div>
                              <div className="control">
                                <button style={{ minWidth: "208px" }}>
                                  Schedule Pay Per View
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Broadcast Vero Live PPV
                                </button>
                                <button style={{ minWidth: "208px" }}>
                                  Broadcast Vero Pre-recorded PPV
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {userInfo[0].communityClub !== 1 ? (
                                <div className="control">
                                  {/* <button>
                              {callRequest
                                ? "Virtual Experiences"
                                : "Virtual Experiences"}
                            </button> */}

                                  <button
                                    onClick={() => {
                                      if (oneOnOnecall) {
                                        document.getElementById(
                                          "slideOOC"
                                        ).style.transition = "2sec";
                                        document.getElementById(
                                          "slideOOC"
                                        ).style.right = "-100vw";

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
                                          if (
                                            document.getElementById("slideOOC")
                                          ) {
                                            document.getElementById(
                                              "slideOOC"
                                            ).style.transition = "1sec";
                                            document.getElementById(
                                              "slideOOC"
                                            ).style.right = "250px";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    1 on 1 call
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (groupCall) {
                                        document.getElementById(
                                          "slidegC"
                                        ).style.transition = "2sec";
                                        document.getElementById(
                                          "slidegC"
                                        ).style.right = "-100vw";

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
                                          if (
                                            document.getElementById("slidegC")
                                          ) {
                                            document.getElementById(
                                              "slidegC"
                                            ).style.transition = "1sec";
                                            document.getElementById(
                                              "slidegC"
                                            ).style.right = "250px";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    {callRequest ? "Group call" : "Group call"}
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (requestMessage) {
                                        document.getElementById(
                                          "slideRM"
                                        ).style.transition = "2sec";
                                        document.getElementById(
                                          "slideRM"
                                        ).style.right = "-100vw";

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
                                          if (
                                            document.getElementById("slideRM")
                                          ) {
                                            document.getElementById(
                                              "slideRM"
                                            ).style.transition = "1sec";
                                            document.getElementById(
                                              "slideRM"
                                            ).style.right = "250px";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    Message
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (verifiedAutograph) {
                                        document.getElementById(
                                          "slideVA"
                                        ).style.transition = "2sec";
                                        document.getElementById(
                                          "slideVA"
                                        ).style.right = "-100vw";

                                        setTimeout(() => {
                                          setVerifiedAutograph(false);
                                        }, 1000);
                                      } else {
                                        setOneOnOneCall(false);
                                        setGroupCall(false);
                                        setRequestMessage(false);
                                        setVerifiedAutograph(
                                          !verifiedAutograph
                                        );
                                        setShowFeed(false);
                                        setShowSubscribeButton(false);

                                        setTimeout(() => {
                                          if (
                                            document.getElementById("slideVA")
                                          ) {
                                            document.getElementById(
                                              "slideVA"
                                            ).style.transition = "1sec";
                                            document.getElementById(
                                              "slideVA"
                                            ).style.right = "250px";
                                          }
                                        }, 1);
                                      }
                                    }}
                                  >
                                    Autograph
                                  </button>
                                  <button>Marketplace</button>

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

                      <div className="channel-live-events">
                        <div
                          className="live-header"
                          style={{
                            backgroundColor: "#8249A0",
                            color: "white",
                            borderRadius: "3px",
                          }}
                        >
                          Live Events
                        </div>
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
                onDragStart={(e) => e.preventDefault()}
                onmousedown={(event) => {
                  event.preventDefault
                    ? event.preventDefault()
                    : (event.returnValue = false);
                }}
              >
                <div className="tabs" style={{ margin: "0 0.5rem" }}>
                  <span
                    onClick={() => {
                      if(privateChat==false){
                         setOneOnOneCall(false);
                      setGroupCall(false);
                      setRequestMessage(false);
                      setVerifiedAutograph(false);
                      setClubFloor(true);
                      setShowSubscribeButton(false);
                      setShowChatRoom(true);
                      setOnDemandMedia(false);
                      }else{
                        toast.success("Please close Private chat to view feeds");
                      }
                     
                    }}
                    style={{ fontSize: "14px" }}
                  >
                    CLUB FLOOR
                  </span>

                  {/* <span>Audio</span>
                                    <span>Video</span>
                                    <span>Podcasts</span> */}

                  {/* <span>Marketplace</span> */}
                  <span style={{ fontSize: "14px" }}>CLUB AMENITIES</span>
                  <span style={{ fontSize: "14px" }}>EVENTS</span>

                  <span>
                    <SoapboxTooltip title={"MARKETPLACE"} placement="left">
                      <img src={marketplaceicon} width="30px" />
                    </SoapboxTooltip>
                  </span>

                  <span>
                    <SoapboxTooltip title={"MESSAGES"} placement="left">
                      <img src={messagesicon} width="30px"   onClick={() => {
                                    if(!privateChatList){
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
                                                    ).style.right = "0px";
                                                  }
                                                }, 1);}else{
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
                                  }} />
                    </SoapboxTooltip>
                  </span>
                  <span>
                    <SoapboxTooltip title={"Club Rules"} placement="left">
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

                  {/* <button  style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}}>INVITE</button> */}
                  {/* <button  style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}}>CLUB RULES</button> */}
                
                  <SoapboxTooltip title={"Create Breakoff Chat"} placement="left">
                  <span style={{display:'flex',justifyContent:'center',alignItems:'center',height:'22px',backgroundColor:'white',color:'purple',borderRadius:'5px'}}
                    onClick={()=>{
                      
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
                    }}
                  >
                 
                      <FiPlus />
                  
                   
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
                      socket.emit("new-user-joined", {
                        name: userFullName,
                        profilePic: userProfilePic,
                      });
                    }}
                    style={{ display: "none" }}
                  >
                    CLUB CHAT
                  </span>
                </div>

                <FiSearch className="search-channel-content" />
              </div>
              {showClubRules ? (
                <div className="slide-container clubRulesText">
                  <div
                    id="slideCR"
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
                    <div
                      style={{
                        maxHeight: "450px",
                        overflowY: "scroll",
                        position: "relative",
                      }}
                    >
                      <FaWindowClose
                        className="FaWindowClose"
                        style={{
                          cursor: "pointer",
                          color: "red",
                          position: "absolute",
                          right: "0px",
                        }}
                        onClick={() => {
                          document.getElementById("slideCR").style.transition =
                            "2sec";
                          document.getElementById("slideCR").style.right =
                            "-100vw";

                          setTimeout(() => {
                            setShowClubRules(false);
                          }, 1000);
                        }}
                      />
                      <h4> RULES OF THE ROAD</h4>
                      <p>
                        Soapbox is a Club Community where members can not only
                        connect but Club Owners can build real businesses as
                        Private Club Owners.. All Community Clubs are here for
                        you, our members, that allow you to create discussions,
                        share ideas, support each other, create events, connect
                        with likeminded people and we encourage you to find the
                        right community club for you. Even create build your own
                        virtual business as a Private Club Owner, a real
                        business.
                      </p>
                      <p>
                        So with that said these are some general Club rules that
                        all members have to adhere to:
                      </p>
                      <h5>RULE 1</h5>

                      <p>
                        Be mindful of others and don't join a community club to
                        cause disruption. Community Clubs are topic specific
                        with Break-Off Chats that are created by members to
                        create conversation, find the club that is right for
                        you. Members that create disruption by adding offensive
                        content, hate speech, attacking others, inciting
                        violence, well they run the risk of not only being
                        banned from that Club Community but also run the risk of
                        being banned from Soapbox in general. We take this very
                        seriously and bans are not temporary, they are
                        permanent.
                      </p>
                      <h5>RULE 2</h5>
                      <p>
                        Privacy and Security, All club members must adhere to
                        privacy policies and in simple terms respect other
                        members' privacy and keep the community safe. Don't
                        harass other members with repeated private chat requests
                        or messages, Do not instigate harassment by revealing
                        someone's personal information, sharing sexually
                        explicit media of someone or threatening them. Violators
                        run the risk of not only being banned from that Club but
                        also being banned from Soapbox in general.
                        <h5> RULE 3</h5>
                        Impersonating someone to mislead others, sharing sexual
                        or suggestive content involving minors, threatening
                        other members will be cause for an immediate ban.
                        Soapbox members don't have to use their real names but
                        impersonating a celebrity or business to trick people is
                        a NO NO, we protect our members and have a zero
                        tolerance policy as it relates to these three issues.
                        <h5> RULE 4</h5>
                        Don't be a bully, no one likes a bully, so remember to
                        help build the Club Communities for the better of the
                        community. Sharing opinions is encouraged, creating
                        conversations with opposing views is fine, trying to
                        bully someone into sharing your opinion as it relates to
                        political views, parenting or other is a violation.
                        Everyone is entitled to their own views so respect that,
                        if you don't like their views then create your OWN
                        Break-Off Chat for a topic that you want or better yet
                        Request to be a Private Club Owner and control your own
                        little world.
                        <h5>RULE 5 </h5>
                        Spamming, just don't do it, keep the community clean ,
                        robust and enjoyable. Spammers will be banned.
                        <h5>RULE 6 </h5>
                        Sharing illegal content, soliciting or facilitating
                        illegal transactions or prohibited transactions will
                        result in an immediate ban.
                        <h5>RULE 7 </h5>
                        Safety first, Soapbox uses the XMG Coin as an internal
                        cryptocurrency for ALL transactions on Soapbox. This
                        protects our members from credit card fraud, illegal
                        chargebacks and fraud in general. Soapbox can guarantee
                        against fraud this way, so all transactions for products
                        or services MUST be kept on Soapbox for your protection,
                        Transactions done away from Soapbox are a violation of
                        our security measures and prevent us from protecting
                        members. All products, services and other listings that
                        are in the Marketplace are directly posted on Fortis
                        Auction Blockmarket, this is Soapbox's ONLY Marketplace.
                        Members must adhere to using Fortis for their sales of
                        products, services and other transactions. Avoid fraud
                        and adhere to our security measures for your protection.
                        <h5>RULE 8 </h5>
                        Virtual Experiences are a great tool for members to
                        connect with Private Club Owners that may be
                        celebrities, pro athletes, authors and more.
                        Transactions away from Soapbox are a violation and can
                        cause the Private Club Owner and Member to receive a
                        first warning, if it happens a second time then the
                        Member can be banned and the Private Club Owner will
                        lose their club ownership rights.
                      </p>
                      <h5>RULE 9</h5>
                      <p>
                        Virtual and In Person Events can be set up on Soapbox
                        for the better of the community, don't abuse that and if
                        in person events are being arranged please put safety
                        first. We want our members to always be safe and sound.
                      </p>
                      <p>
                        The rules are simple and enforcement of these rules come
                        from our members HOWEVER falsely reporting a member for
                        a violation can result in a first warning to the member
                        that falsely reported . We needed to make that crystal
                        clear to avoid false reports.
                      </p>
                      <p>
                        Above all please protect your communities, help to grow
                        them, help and support others, make it your own. For
                        Private Club Owners, this is your business, so treat it
                        as such and build it strong for the better of your Club
                        and the Soapbox Community in general.
                      </p>

                      <h5>ENFORCEMENT OF RULES</h5>

                      <p>
                        Well we have a number of ways that rules are enforced
                        and we take it seriously. We will ask you nicely to cut
                        it out the first time, the next step won't be that
                        friendly and the last step is not only a permanent ban
                        from that Community or Private Club but from the entire
                        MegaHoot ecosystem. Trust me you don't want that as you
                        will not be able to use Soapbox, VeroHive, DocuMega, XMG
                        Fintech, MegaHoot Vault, ZecureHive, gaming or any
                        platforms that will be added in the future. So play by
                        the rules and make Soapbox as great as it can be!
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {showBreakoffForm?<div className="showBreakoffForm" id="showBreakoffFormId">
                <h5>Enter The Topic for Breakoff Chat</h5>
                <div style={{padding:'33px',position:'relative',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}> <input placeholder="Enter Topic"  />
                <button className="d-grid col-12 btn-main login-form-button" style={{position:'absolute',right:'0'}}>Create Now</button>
                </div>
               
              </div>:null}
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
                    }}
                  >
                    <FaWindowClose
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "0px",
                        color: "red",
                        top: "0px",
                      }}
                      className="FaWindowClose"
                      onClick={() => {
                        document.getElementById("slideOOC").style.transition =
                          "2sec";
                        document.getElementById("slideOOC").style.right =
                          "-100vw";

                        setTimeout(() => {
                          setShowSubscribeButton(false);
                        }, 1000);
                      }}
                    />
                    <div>
                      {" "}
                      <img src={oneonone} width="400px" />
                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "25px",
                          fontSize: "smaller",
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
                          lineHeight: "25px",
                          fontSize: "smaller",
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>
                    <Form className="login-form mx-auto p-4 pb-0">
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request 1 on 1 call
                      </p>
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
                    }}
                  >
                    <FaWindowClose
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "5px",
                        color: "red",
                        top: "5px",
                      }}
                      className="FaWindowClose"
                      onClick={() => {
                        document.getElementById("slideSSB").style.transition =
                          "2sec";
                        document.getElementById("slideSSB").style.right =
                          "-100vw";

                        setTimeout(() => {
                          setShowSubscribeButton(false);
                        }, 1000);
                      }}
                    />
                    <div>
                      {" "}
                      <img src={membershipGraphic} width="400px" />
                      {!subscribe ? (
                        <div>
                          <p
                            style={{
                              maxWidth: "390px",
                              lineHeight: "25px",
                              fontSize: "smaller",
                             
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
                              lineHeight: "25px",
                              fontSize: "smaller",
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
                      <Form
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

                        {/* <p>Cost: {groupCallPrice} XMG</p> */}

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
                            <p style={{ textAlign: "center" }}>Or</p>
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
                    {/* <div className="btns"> <button>Request</button></div> */}
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
                    }}
                  >
                    <FaWindowClose
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "0px",
                        color: "red",
                        top: "0px",
                      }}
                      className="FaWindowClose"
                      onClick={() => {
                        document.getElementById("slidegC").style.transition =
                          "2sec";
                        document.getElementById("slidegC").style.right =
                          "-100vw";

                        setTimeout(() => {
                          setShowSubscribeButton(false);
                        }, 1000);
                      }}
                    />
                    <div>
                      {" "}
                      <img src={groupcall} width="400px" />
                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "25px",
                          fontSize: "smaller",
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
                          lineHeight: "25px",
                          fontSize: "smaller",
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>
                    <Form className="login-form mx-auto p-4 pb-0">
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request Group call
                      </p>

                      {/* <p>Cost: {groupCallPrice} XMG</p> */}
                      <button
                        disabled={groupCallPrice == 0 ? true : false}
                        className="d-grid col-12 btn-main login-form-button"
                        variant="primary"
                        type="submit"
                      >
                        Request Now for {groupCallPrice} XMG
                      </button>
                    </Form>{" "}
                    {/* <div className="btns"> <button>Request</button></div> */}
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
                    }}
                  >
                    {/* <h5>Request Personal Message</h5>
                                
                                <img src={personalmessage} width="400px" />
                                <p>Cost: {requestMessagePrice} XMG</p>
                                <input placeholder="Type Message" /> */}
                    {/* <div className="btns"> <button>Request</button></div> */}

                    <FaWindowClose
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "0px",
                        color: "red",
                        top: "0px",
                      }}
                      className="FaWindowClose"
                      onClick={() => {
                        document.getElementById("slideRM").style.transition =
                          "2sec";
                        document.getElementById("slideRM").style.right =
                          "-100vw";

                        setTimeout(() => {
                          setShowSubscribeButton(false);
                        }, 1000);
                      }}
                    />
                    <div>
                      <img src={personalmessage} width="400px" />
                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "25px",
                          fontSize: "smaller",
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
                          lineHeight: "25px",
                          fontSize: "smaller",
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>
                    <Form className="login-form mx-auto p-4 pb-0">
                      <p
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request Personal Message
                      </p>

                      {/* <p>Cost: {groupCallPrice} XMG</p> */}
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
                    }}
                  >
                    {/* <h5>Verified Autograph</h5>
                                <p>Cost: {verifiedAutographPrice} XMG</p>
                                <div className="btns"> <button>Request</button></div> */}

                    <FaWindowClose
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "0px",
                        color: "red",
                        top: "0px",
                      }}
                      className="FaWindowClose"
                      onClick={() => {
                        document.getElementById("slideVA").style.transition =
                          "2sec";
                        document.getElementById("slideVA").style.right =
                          "-100vw";

                        setTimeout(() => {
                          setShowSubscribeButton(false);
                        }, 1000);
                      }}
                    />
                    <div>
                      <img src={groupcall} width="400px" />
                      <p
                        style={{
                          maxWidth: "390px",
                          lineHeight: "25px",
                          fontSize: "smaller",
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
                          lineHeight: "25px",
                          fontSize: "smaller",
                        }}
                      >
                        Alternatively we do give the option for members to use
                        their credit card via our credit card processing
                        partners Stripe for convenience.
                      </p>
                    </div>

                    <Form className="login-form mx-auto p-4 pb-0">
                      <h5
                        className="text-center mb-1 signup-head"
                        style={{ fontSize: "smaller" }}
                      >
                        Request Verified Autograph
                      </h5>

                      {/* <p>Cost: {groupCallPrice} XMG</p> */}
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

              {subscribe ? (
                <div>
                  <div
                    className="channel-media"
                    id="feed"
                    style={{ display: "flex", transition: "1s" }}
                  >
                    <GiHamburgerMenu
                      className="GiHamburgerMenu"
                      data-tip={clubFloor ? "Hide Feeds" : "Show Feeds"}
                      onClick={() => {
                        if (privateChat==false) {
                          setClubFloor(!clubFloor);
                        } else {
                          toast.success(
                            "Please close Private chat to view feeds"
                          );
                        }
                        //   if(document.getElementById('slideFeed')){

                        //     document.getElementById('slideFeed').style.transition='1sec';
                        //     document.getElementById('slideFeed').style.left=clubFloor?'-100vw':'30px';
                        // }
                      }}
                    />
                    {clubFloor
                      ? uploads && (
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
                        )
                      : null}
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
                                  style={{
                                    maxWidth:
                                      e.isVideo || e.isImage ? "200px" : "100%",
                                  }}
                                  onClick={() => {
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
                                  }}
                                >
                                  <div className="ProfileBox">
                                    <img
                                      className="chat-profile"
                                      src={e.imgSrc ? e.imgSrc : null}
                                    />
                                    <p>{e.chatname}</p>
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
                                        maxWidth: "200px",
                                        marginTop: "20px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              ))
                            : null}
                        </div>

                        <div className="send">
                          <ReactTooltip />
                          <form
                            action="#"
                            id="send-container"
                            style={{ marginLeft: privateChat ? "5px" : "5px" }}
                            onSubmit={(e) => messagesubmitPrivate(e)}
                          >
                            {/* <FaWindowClose data-tip="Close ChatRoom" className="icon-text"
                                                onClick={() => {
                                                    setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setClubFloor(!clubFloor); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                                }}

                                            /> */}
                            <label htmlFor="post-video">
                              <img
                                src={videochat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                data-tip="Share Video"
                                width="27px"
                              />

                              {/* <FiVideo data-tip="Share Video" className="icon-text" /> */}
                            </label>
                            <input
                              type="file"
                              id="post-video"
                              name="video"
                              accept="video/*"
                              onChange={handleFile}
                              disabled={true}
                              hidden
                            />
                            <label htmlFor="post-image">
                              <img
                                src={imagechat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                data-tip="Share Photos"
                                width="27px"
                              />
                              {/* <FiImage data-tip="Share Photos" className="icon-text" /> */}
                            </label>
                            <input
                              type="file"
                              id="post-image"
                              name="image"
                              accept="image/*"
                              onChange={handleFile}
                              hidden
                              disabled={true}
                            />
                            {/* <FiFolder data-tip="Share File" className="icon-text" /> */}
                            <img
                              src={filechat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              data-tip="Share File"
                              width="27px"
                            />

                            {/* <FiSmile className="icon-text" data-tip="Emoji"
                                               
                                            /> */}
                            <img
                              src={emojiIcon}
                              style={{ margin: "5px", cursor: "pointer" }}
                              data-tip="Emoji"
                            //   onClick={() => {
                            //     setEmojiPicker(!emojiPicker);
                            //   }}
                              width="27px"
                            />
                            <input
                              type="text"
                              name="messageInp"
                              value={messageInboxValuePrivate}
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
                              <SoapboxTooltip
                                title={"Send Message"}
                                placement="top"
                              >
                                <img src={sendIcon} width="27px" />
                              </SoapboxTooltip>
                            </button>
                          </form>
                        </div>
                      </div>
                    ) : null}
                    {privateChatList?<div className="privateChatListBox" id="privateChatList">
                    <div><h5 style={{textAlign:'center',fontSize:'0.93rem',fontWeight:'600',margin:'0.5rem',borderRadius:'5px',padding:'0.5rem',width:'100%',backgroundColor:"whitesmoke"}}>Private Messages</h5></div>
               
                    </div>:null}

                    {showChatRoom ? (
                      <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            className="container"
                            style={{
                              left: clubFloor || privateChat ? "20px" : "100px",
                              width: clubFloor || privateChat ? "40%" : "80%",
                              minWidth:
                                clubFloor || privateChat ? "500px" : "700px",
                              transition: "1s",

                            
                            }}
                          >
                            <div
                              className="live-header"
                              style={{
                                backgroundColor: "#C1A9D5",
                                color: "white",
                                borderRadius: "3px",
                                marginLeft: "-15px",
                                marginTop: "-33px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                position: "fixed",
                                width: "25%",
                                minWidth:
                                  clubFloor || privateChat ? "450px" : "650px",
                                zIndex: "5",
                              }}
                            >
                              {" "}
                              {userInfo[0].name}`s Club Chat
                            </div>
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
                              }}
                            >
                              {chatData.length
                                ? chatData.map((e) => (
                                    <div
                                      className="messageBox"
                                      style={{
                                        maxWidth:
                                          e.isVideo || e.isImage
                                            ? "200px"
                                            : "100%",
                                      }}
                                      onClick={() => {
                                          if(e.chatname!==userFullName){
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
                                        getChatDataPrivate(e.chatname,userFullName)
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
                                      
                                      }}
                                    >
                                      <div className="ProfileBox">
                                        <img
                                          className="chat-profile"
                                          src={e.imgSrc ? e.imgSrc : null}
                                        />
                                        <p>{e.chatname}</p>
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
                                            e.isEmoji
                                              ? "message-emoji"
                                              : "message"
                                          }
                                        >
                                          {!e.isVideo && !e.isImage
                                            ? e.message
                                            : null}
                                        </div>
                                      </Linkify>
                                      {e.isVideo ? (
                                        <video
                                          onDragStart={(e) =>
                                            e.preventDefault()
                                          }
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
                                          onDragStart={(e) =>
                                            e.preventDefault()
                                          }
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
                                        />
                                      ) : null}
                                    </div>
                                  ))
                                : null}
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
                                      bottom: "0px",
                                      left: "0.2rem",
                                      zIndex: "1111",
                                    }}
                                  />
                                </div>
                              </ClickAwayListener>
                            )}
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
                          {/* {!clubFloor? <div className="community-club">
                                            <div className="live-header" style={{ backgroundColor: '#8149a06c', color: 'white', borderRadius: '3px' }} >Community Clubs</div>
                                            <RandomCommunitySuggestion />
                                        </div>:null} */}
                        </div>

                        <div className="send">
                          <ReactTooltip />
                          <form
                            action="#"
                            id="send-container"
                            style={{
                              marginLeft:
                                clubFloor || privateChat ? "5px" : "50px",
                            }}
                            onSubmit={(e) => messagesubmit(e)}
                          >
                            {/* <FaWindowClose data-tip="Close ChatRoom" className="icon-text"
                                                onClick={() => {
                                                    setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setClubFloor(!clubFloor); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                                }}

                                            /> */}
                            <label htmlFor="post-video">
                              <img
                                src={videochat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                data-tip="Share Video"
                                width="27px"
                              />

                              {/* <FiVideo data-tip="Share Video" className="icon-text" /> */}
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
                              <img
                                src={imagechat}
                                style={{ margin: "5px", cursor: "pointer" }}
                                data-tip="Share Photos"
                                width="27px"
                              />
                              {/* <FiImage data-tip="Share Photos" className="icon-text" /> */}
                            </label>
                            <input
                              type="file"
                              id="post-image"
                              name="image"
                              accept="image/*"
                              onChange={handleFile}
                              hidden
                            />
                            {/* <FiFolder data-tip="Share File" className="icon-text" /> */}
                            <img
                              src={filechat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              data-tip="Share File"
                              width="27px"
                            />

                            {/* <FiSmile className="icon-text" data-tip="Emoji"
                                               
                                            /> */}
                            <img
                              src={emojiIcon}
                              style={{ margin: "5px", cursor: "pointer" }}
                              data-tip="Emoji"
                              onClick={() => {
                                setEmojiPicker(!emojiPicker);
                              }}
                              width="27px"
                            />
                            <input
                              type="text"
                              name="messageInp"
                              value={messageInboxValue}
                              id="messageInp"
                              style={{
                                width:
                                  clubFloor || privateChat ? "350px" : "600px",
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
                              <SoapboxTooltip
                                title={"Send Message"}
                                placement="top"
                              >
                                <img src={sendIcon} width="27px" />
                              </SoapboxTooltip>
                            </button>
                          </form>
                        </div>
                      </div>
                    ) : null}
                  </div>
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

          {userInformation.username == username ? (
            <div className="channel-user-content">
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
                  top: "4.2rem",
                  alignSelf: "flex-start",
                }}
              >
                <div className="tabs" style={{ margin: "0 0.5rem" }}>
                  <span
                    style={{
                      backgroundColor: clubFloor ? "#8249A0" : "#A279BA",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      if(privateChat==false){
                          setShowRequest(false);
                      setClubFloor(true);
                      setShowSubscribers(false);
                      setShowPricingSetting(false);
                      setShowNotification(false);
                      setShowChatRoom(true);
                      setOnDemandMedia(false);
                      }else{
                        toast.success("Please close Private chat to view feeds");
                      }
                    
                    }}
                    style={{ fontSize: "14px" }}
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
                  <span
                    id="chatRoomopen"
                    style={{
                      display: "none",
                      backgroundColor: showChatRoom ? "#8249A0" : "#A279BA",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
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
                  <span
                    style={{
                      backgroundColor: "#652C90",
                      borderRadius: "8px",
                      fontSize: "14px ",
                    }}
                  >
                    CLUB AMENITIES
                  </span>

                  <span
                    style={{
                      backgroundColor: "#652C90",
                      fontSize: "14px ",
                      borderRadius: "8px",
                    }}
                  >
                    EVENTS
                  </span>
                  {/*                                                                    
                                                                       <span  style={{fontSize:'14px'}}
                                        style={{ backgroundColor: '#A279BA', borderRadius: '8px',fontSize:'14px ' }}
                                    >MARKETPLACE</span>
                                     <span  style={{fontSize:'14px'}}
                                        style={{ backgroundColor: '#A279BA', borderRadius: '8px',fontSize:'14px ' }}
                                    >MESSAGES</span> */}
                  <span>
                    <SoapboxTooltip title={"MARKETPLACE"} placement="left">
                      <img src={marketplaceicon} width="30px" />
                    </SoapboxTooltip>
                  </span>

                  <span>
                    <SoapboxTooltip title={"MESSAGES"} placement="left">
                      <img src={messagesicon} width="30px" onClick={() => {

                        if(!privateChatList){
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
                                        ).style.right = "0px";
                                      }
                                    }, 1);}else{
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
                                   
                                  }} />
                    </SoapboxTooltip>
                  </span>

                  <span>
                    <SoapboxTooltip title={"Invite"} placement="left">
                      <img src={inviteicon} width="30px" />
                    </SoapboxTooltip>
                  </span>
                  <span>
                    <SoapboxTooltip title={"Club Rules"} placement="left">
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
                
                  {/* <button  style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}}>INVITE</button>
                                    <button style={{fontSize:'14px',padding:'1px',paddingLeft:'2px',paddingRight:'2px',outline:'none',border:'none',borderRadius:'5px',borderRadius:'2px'}} >CLUB RULES</button> */}
                  {/*                              
                             <span>
          <SoapboxTooltip title={
                   "XMG Wallet"
                } placement="left">
                   <img src={xmgwallet} width="30px" />
                </SoapboxTooltip>
                </span> */}
                  <span
                    onClick={() => {
                      if (showCreateHoot) {
                        document.getElementById("slideH").style.transition =
                          "2sec";
                        document.getElementById("slideH").style.left = "-100vw";

                        setTimeout(() => {
                          setShowCreateHoot(false);
                        }, 1000);
                      } else {
                        setOnDemandMedia(false),
                          setShowCreateHoot(true),
                          setShowRequest(false);
                        setShowFeed(false);
                        setShowSubscribers(false);
                        setShowPricingSetting(false);
                        setShowNotification(false);
                        setShowChatRoom(true);

                        setTimeout(() => {
                          if (document.getElementById("slideH")) {
                            document.getElementById("slideH").style.transition =
                              "1sec";
                            document.getElementById("slideH").style.left =
                              "150px";
                          }
                        }, 1);
                      }
                    }}
                  >
                    <SoapboxTooltip
                      title={"Create Private Hoot"}
                      placement="left"
                    >
                      <img src={privatehooticon} width="30px" />
                    </SoapboxTooltip>
                  </span>
                  <SoapboxTooltip title={"Create Breakoff Chat"} placement="left">
                  <span style={{display:'flex',justifyContent:'center',alignItems:'center',height:'22px',backgroundColor:'white',color:'purple',borderRadius:'5px'}}
                  onClick={()=>{
                  
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
                  
                  }}
                  >
                 
                      <FiPlus />
                  
                   
                    </span>
                    </SoapboxTooltip>
                </div>

                {/* <span onClick={() => { setShowRequest(false); setShowSubscribers(false); setShowPricingSetting(false); setShowNotification(!showNotification) }} >Notifications</span> */}

                {/* <FiSearch className="search-channel-content" /> */}
              </div>

              {showRequest ? (
                <div className="slide-container">
                  <div
                    id="slideR"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      backgroundColor: "#D6C8E1",
                      margin: "1rem",
                      minWidth: "600px",
                      minHeight: "400px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        padding: "5px",
                        width: "600px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <h5>Requests</h5>
                      <FaWindowClose
                       className="FaWindowClose"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("slideR").style.transition =
                            "2sec";
                          document.getElementById("slideR").style.right =
                            "-100vw";

                          setTimeout(() => {
                            setShowRequest(false);
                          }, 1000);
                        }}
                      />
                    </div>
                    <p>No Requests</p>
                  </div>
                </div>
              ) : null}
              {showPricingSetting ? (
                <div className="slide-container">
                  <div
                    id="slide"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#D6C8E1",
                      margin: "1rem",
                      minWidth: "600px",
                      minHeight: "400px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        padding: "5px",
                        width: "600px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <h5>Set Service Price</h5>
                      <FaWindowClose
                       className="FaWindowClose"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("slide").style.transition =
                            "2sec";
                          document.getElementById("slide").style.right =
                            "-100vw";

                          setTimeout(() => {
                            setShowPricingSetting(false);
                          }, 1000);
                        }}
                      />
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
                      <label style={{ minWidth: "300px" }}>
                        1 on 1 call :{" "}
                      </label>
                      <input
                        style={{
                          borderRadius: "10px",
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
                      <label style={{ minWidth: "300px" }}>Group call : </label>
                      <input
                        style={{
                          borderRadius: "10px",
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
                      <label style={{ minWidth: "300px" }}>
                        Personal Message :{" "}
                      </label>
                      <input
                        style={{
                          borderRadius: "10px",
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
                      <label style={{ minWidth: "300px" }}>
                        verified Autograph Price :{" "}
                      </label>
                      <input
                        style={{
                          borderRadius: "10px",
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
                      <label style={{ minWidth: "300px" }}>Membership : </label>
                      <input
                        style={{
                          borderRadius: "10px",
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
                          minWidth: "400px",
                          borderRadius: "8px",
                          backgroundColor: "#8249A0",
                        }}
                      >
                        Update Changes
                      </button>
                    </div>
                    <p>Note: The minimum amount for service price is 5 XMG</p>
                  </div>{" "}
                </div>
              ) : null}
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
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#8249A0",
                        padding: "5px",
                        width: "600px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <h5>Memberships </h5>
                      <FaWindowClose
                        className="FaWindowClose"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("slideM").style.transition =
                            "2sec";
                          document.getElementById("slideM").style.right =
                            "-100vw";

                          setTimeout(() => {
                            setShowSubscribers(false);
                          }, 1000);
                        }}
                      />
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
                  <div id="slideH">
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

{showBreakoffForm?<div className="showBreakoffForm" id="showBreakoffFormId">
<h5>Enter The Topic for Breakoff Chat</h5>

<div style={{padding:'33px',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}> <input placeholder="Enter Topic"  />
<button className="d-grid col-12 btn-main login-form-button" style={{position:'absolute',right:'0'}}>Create Now</button>
</div>
  
</div>:null}

              {showClubRules ? (
                <div className="slide-container clubRulesText">
                  <div
                    id="slideCR"
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
                    <div
                      style={{
                        maxHeight: "450px",
                        overflowY: "scroll",
                        position: "relative",
                      }}
                    >
                      <FaWindowClose
                        className="FaWindowClose"
                        style={{
                          cursor: "pointer",
                          color: "red",
                          position: "absolute",
                          right: "0px",
                        }}
                        onClick={() => {
                          document.getElementById("slideCR").style.transition =
                            "2sec";
                          document.getElementById("slideCR").style.right =
                            "-100vw";

                          setTimeout(() => {
                            setShowClubRules(false);
                          }, 1000);
                        }}
                      />
                      <h4> RULES OF THE ROAD</h4>
                      <p>
                        Soapbox is a Club Community where members can not only
                        connect but Club Owners can build real businesses as
                        Private Club Owners.. All Community Clubs are here for
                        you, our members, that allow you to create discussions,
                        share ideas, support each other, create events, connect
                        with likeminded people and we encourage you to find the
                        right community club for you. Even create build your own
                        virtual business as a Private Club Owner, a real
                        business.
                      </p>
                      <p>
                        So with that said these are some general Club rules that
                        all members have to adhere to:
                      </p>
                      <h5>RULE 1</h5>

                      <p>
                        Be mindful of others and don't join a community club to
                        cause disruption. Community Clubs are topic specific
                        with Break-Off Chats that are created by members to
                        create conversation, find the club that is right for
                        you. Members that create disruption by adding offensive
                        content, hate speech, attacking others, inciting
                        violence, well they run the risk of not only being
                        banned from that Club Community but also run the risk of
                        being banned from Soapbox in general. We take this very
                        seriously and bans are not temporary, they are
                        permanent.
                      </p>
                      <h5>RULE 2</h5>
                      <p>
                        Privacy and Security, All club members must adhere to
                        privacy policies and in simple terms respect other
                        members' privacy and keep the community safe. Don't
                        harass other members with repeated private chat requests
                        or messages, Do not instigate harassment by revealing
                        someone's personal information, sharing sexually
                        explicit media of someone or threatening them. Violators
                        run the risk of not only being banned from that Club but
                        also being banned from Soapbox in general.
                        <h5> RULE 3</h5>
                        Impersonating someone to mislead others, sharing sexual
                        or suggestive content involving minors, threatening
                        other members will be cause for an immediate ban.
                        Soapbox members don't have to use their real names but
                        impersonating a celebrity or business to trick people is
                        a NO NO, we protect our members and have a zero
                        tolerance policy as it relates to these three issues.
                        <h5> RULE 4</h5>
                        Don't be a bully, no one likes a bully, so remember to
                        help build the Club Communities for the better of the
                        community. Sharing opinions is encouraged, creating
                        conversations with opposing views is fine, trying to
                        bully someone into sharing your opinion as it relates to
                        political views, parenting or other is a violation.
                        Everyone is entitled to their own views so respect that,
                        if you don't like their views then create your OWN
                        Break-Off Chat for a topic that you want or better yet
                        Request to be a Private Club Owner and control your own
                        little world.
                        <h5>RULE 5 </h5>
                        Spamming, just don't do it, keep the community clean ,
                        robust and enjoyable. Spammers will be banned.
                        <h5>RULE 6 </h5>
                        Sharing illegal content, soliciting or facilitating
                        illegal transactions or prohibited transactions will
                        result in an immediate ban.
                        <h5>RULE 7 </h5>
                        Safety first, Soapbox uses the XMG Coin as an internal
                        cryptocurrency for ALL transactions on Soapbox. This
                        protects our members from credit card fraud, illegal
                        chargebacks and fraud in general. Soapbox can guarantee
                        against fraud this way, so all transactions for products
                        or services MUST be kept on Soapbox for your protection,
                        Transactions done away from Soapbox are a violation of
                        our security measures and prevent us from protecting
                        members. All products, services and other listings that
                        are in the Marketplace are directly posted on Fortis
                        Auction Blockmarket, this is Soapbox's ONLY Marketplace.
                        Members must adhere to using Fortis for their sales of
                        products, services and other transactions. Avoid fraud
                        and adhere to our security measures for your protection.
                        <h5>RULE 8 </h5>
                        Virtual Experiences are a great tool for members to
                        connect with Private Club Owners that may be
                        celebrities, pro athletes, authors and more.
                        Transactions away from Soapbox are a violation and can
                        cause the Private Club Owner and Member to receive a
                        first warning, if it happens a second time then the
                        Member can be banned and the Private Club Owner will
                        lose their club ownership rights.
                      </p>
                      <h5>RULE 9</h5>
                      <p>
                        Virtual and In Person Events can be set up on Soapbox
                        for the better of the community, don't abuse that and if
                        in person events are being arranged please put safety
                        first. We want our members to always be safe and sound.
                      </p>
                      <p>
                        The rules are simple and enforcement of these rules come
                        from our members HOWEVER falsely reporting a member for
                        a violation can result in a first warning to the member
                        that falsely reported . We needed to make that crystal
                        clear to avoid false reports.
                      </p>
                      <p>
                        Above all please protect your communities, help to grow
                        them, help and support others, make it your own. For
                        Private Club Owners, this is your business, so treat it
                        as such and build it strong for the better of your Club
                        and the Soapbox Community in general.
                      </p>

                      <h5>ENFORCEMENT OF RULES</h5>

                      <p>
                        Well we have a number of ways that rules are enforced
                        and we take it seriously. We will ask you nicely to cut
                        it out the first time, the next step won't be that
                        friendly and the last step is not only a permanent ban
                        from that Community or Private Club but from the entire
                        MegaHoot ecosystem. Trust me you don't want that as you
                        will not be able to use Soapbox, VeroHive, DocuMega, XMG
                        Fintech, MegaHoot Vault, ZecureHive, gaming or any
                        platforms that will be added in the future. So play by
                        the rules and make Soapbox as great as it can be!
                      </p>
                    </div>
                  </div>
                </div>
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

              <div
                className="channel-media"
                id="feed"
                style={{ display: "flex", transition: "1s" }}
              >
                <GiHamburgerMenu
                  className="GiHamburgerMenu"
                  data-tip={clubFloor ? "Hide Feeds" : "Show Feeds"}
                  onClick={() => {
                    if (privateChat==false) {
                      setClubFloor(!clubFloor);
                    } else {
                      toast.success("Please close Private chat to view feeds");
                    }
                    //   if(document.getElementById('slideFeed')){

                    //     document.getElementById('slideFeed').style.transition='1sec';
                    //     document.getElementById('slideFeed').style.left=clubFloor?'-100vw':'30px';
                    // }
                  }}
                />

                {clubFloor
                  ? uploads && (
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
                    )
                  : null}
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
                              style={{
                                maxWidth:
                                  e.isVideo || e.isImage ? "200px" : "100%",
                              }}
                             
                            >
                              <div className="ProfileBox">
                                <img
                                  className="chat-profile"
                                  src={e.imgSrc ? e.imgSrc : null}
                                />
                                <p>{e.chatname}</p>
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
                                  {!e.isVideo && !e.isImage ? e.message : null}
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
                                    maxWidth: "200px",
                                    marginTop: "20px",
                                    borderRadius: "5px",
                                  }}
                                />
                              ) : null}
                            </div>
                          ))
                        : null}
                    </div>

                    <div className="send">
                      <ReactTooltip />
                      <form
                        action="#"
                        id="send-container"
                        style={{ marginLeft: privateChat ? "5px" : "5px" }}
                        onSubmit={(e) => messagesubmitPrivate(e)}
                      >
                        {/* <FaWindowClose data-tip="Close ChatRoom" className="icon-text"
                                                onClick={() => {
                                                    setOneOnOneCall(false); setGroupCall(false); setRequestMessage(false); setVerifiedAutograph(false); setClubFloor(!clubFloor); setShowSubscribeButton(false); setShowChatRoom(!showChatRoom);
                                                }}

                                            /> */}
                        <label htmlFor="post-video">
                          <img
                            src={videochat}
                            style={{ margin: "5px", cursor: "pointer" }}
                            data-tip="Share Video"
                            width="27px"
                          />

                          {/* <FiVideo data-tip="Share Video" className="icon-text" /> */}
                        </label>
                        <input
                          type="file"
                          id="post-video"
                          name="video"
                          accept="video/*"
                          onChange={handleFile}
                          hidden
                          disabled={true}
                        />
                        <label htmlFor="post-image">
                          <img
                            src={imagechat}
                            style={{ margin: "5px", cursor: "pointer" }}
                            data-tip="Share Photos"
                            width="27px"
                          />
                          {/* <FiImage data-tip="Share Photos" className="icon-text" /> */}
                        </label>
                        <input
                          type="file"
                          id="post-image"
                          name="image"
                          accept="image/*"
                          onChange={handleFile}
                          hidden
                          disabled={true}
                        />
                        {/* <FiFolder data-tip="Share File" className="icon-text" /> */}
                        <img
                          src={filechat}
                          style={{ margin: "5px", cursor: "pointer" }}
                          data-tip="Share File"
                          width="27px"
                        />

                        {/* <FiSmile className="icon-text" data-tip="Emoji"
                                               
                                            /> */}
                        <img
                          src={emojiIcon}
                          style={{ margin: "5px", cursor: "pointer" }}
                          data-tip="Emoji"
                        //   onClick={() => {
                        //     setEmojiPicker(!emojiPicker);
                        //   }}
                          width="27px"
                        />
                        <input
                          type="text"
                          name="messageInp"
                          value={messageInboxValuePrivate}
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
                          <SoapboxTooltip
                            title={"Send Message"}
                            placement="top"
                          >
                            <img src={sendIcon} width="27px" />
                          </SoapboxTooltip>
                        </button>
                      </form>
                    </div>
                  </div>
                ) : null}
                 {privateChatList?<div className="privateChatListBox" id="privateChatList">
                 <div><h5 style={{textAlign:'center',fontSize:'0.93rem',fontWeight:'600',margin:'0.5rem',borderRadius:'5px',padding:'0.5rem',width:'100%',backgroundColor:"whitesmoke"}}>Private Messages</h5></div>
                 
                 </div>:null}
                {showChatRoom ? (
                  <div style={{ position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        className="container"
                        style={{
                          left: clubFloor || privateChat ? "20px" : "100px",
                          width: clubFloor || privateChat ? "40%" : "80%",
                          minWidth:
                            clubFloor || privateChat ? "500px" : "700px",
                          transition: "1s",
                        }}
                      >
                        <div
                          className="live-header"
                          style={{
                            backgroundColor: "#C1A9D5",
                            color: "white",
                            borderRadius: "3px",
                            marginLeft: "-15px",
                            marginTop: "-33px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "fixed",
                            width: "25%",
                            minWidth:
                              clubFloor || privateChat ? "450px" : "650px",
                            zIndex: "5",
                          }}
                        >
                          {" "}
                          {userInfo[0].name}`s Club Chat
                          <SoapboxTooltip title={"Stream Live"} placement="top">
                            <img
                              src={videolive}
                              style={{ cursor: "pointer" }}
                              width="30px"
                              onClick={() => {
                                setBroadcastStream(true);
                              }}
                            />
                          </SoapboxTooltip>
                        </div>
                        {broadcastStream ? (
                          <VideoChat
                            hallId={hallId}
                            userName={userInformation.username}
                            videoAvailable={() => {
                              setVideoAvailable(true);
                            }}
                            host={username}
                          />
                        ) : null}

                        <div
                          className="chatarea"
                          style={{
                            marginTop: VideoAvailable ? "300px" : "0px",
                            zIndex: "-1",
                          }}
                        >
                          {chatData.length
                            ? chatData.map((e) => (
                                <div
                                  className="messageBox"
                                  style={{
                                    maxWidth:
                                      e.isVideo || e.isImage ? "200px" : "100%",
                                  }}
                                  onClick={() => {
                                    if(e.chatname!==userFullName){
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
                                  getChatDataPrivate(e.chatname,userFullName)
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
                                  }}
                                >
                                  <div className="ProfileBox">
                                    <img
                                      className="chat-profile"
                                      src={e.imgSrc ? e.imgSrc : null}
                                    />
                                    <p>{e.chatname}</p>
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
                                        maxWidth: "200px",
                                        marginTop: "20px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              ))
                            : null}
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
                                  bottom: "0px",
                                  left: "0.2rem",
                                  zIndex: "1111",
                                }}
                              />
                            </div>
                          </ClickAwayListener>
                        )}
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
                      {/* {!clubFloor? <div className="community-club">
                                            <div className="live-header" style={{ backgroundColor: '#8149a06c', color: 'white', borderRadius: '3px' }} >Community Clubs</div>
                                            <RandomCommunitySuggestion />
                                        </div>:null} */}
                    </div>

                    <div className="send">
                      <ReactTooltip />
                      <form
                        action="#"
                        id="send-container"
                        style={{
                          marginLeft: clubFloor || privateChat ? "5px" : "50px",
                        }}
                        onSubmit={(e) => messagesubmit(e)}
                      >
                        <label htmlFor="post-video">
                          <img
                            src={videochat}
                            style={{ margin: "5px", cursor: "pointer" }}
                            data-tip="Share Video"
                            width="27px"
                          />

                          {/* <FiVideo data-tip="Share Video" className="icon-text" /> */}
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
                          <img
                            src={imagechat}
                            style={{ margin: "5px", cursor: "pointer" }}
                            data-tip="Share Photos"
                            width="27px"
                          />
                          {/* <FiImage data-tip="Share Photos" className="icon-text" /> */}
                        </label>
                        <input
                          type="file"
                          id="post-image"
                          name="image"
                          accept="image/*"
                          onChange={handleFile}
                          hidden
                        />
                        {/* <FiFolder data-tip="Share File" className="icon-text" /> */}
                        <img
                          src={filechat}
                          style={{ margin: "5px", cursor: "pointer" }}
                          data-tip="Share File"
                          width="27px"
                        />

                        {/* <FiSmile className="icon-text" data-tip="Emoji"
                                               
                                            /> */}
                        <img
                          src={emojiIcon}
                          style={{ margin: "5px", cursor: "pointer" }}
                          data-tip="Emoji"
                          onClick={() => {
                            setEmojiPicker(!emojiPicker);
                          }}
                          width="27px"
                        />

                        <input
                          type="text"
                          name="messageInp"
                          value={messageInboxValue}
                          id="messageInp"
                          style={{
                            width: clubFloor || privateChat ? "350px" : "600px",
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
                          <SoapboxTooltip
                            title={"Send Message"}
                            placement="top"
                          >
                            <img src={sendIcon} width="27px" />
                          </SoapboxTooltip>
                        </button>
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
