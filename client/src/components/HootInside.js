import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import format from "date-fns/format";
import ClickAwayListener from "react-click-away-listener";
import MediaContent from "./MediaContent";
import HootComments from "./Comment/HootComments";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import { formatCount, formatSi } from "../Helpers/formatNumbers";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  FiTwitter,
  FiShare2,
  FiRepeat,
  FiMail,
  FiMessageSquare,
  FiEye,
  FiLink,
  FiShare,
  FiCopy,
} from "react-icons/fi";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaHeart,
  FaRegHeart,
  FaTumblr,
} from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { ImReddit, ImPinterest2 } from "react-icons/im";
import { AiOutlineLinkedin } from "react-icons/ai";
import { HiBadgeCheck, HiOutlineCode } from "react-icons/hi";
import Highlighter from "react-highlight-words";
import { v4 as uuidv4 } from "uuid";
import "./IndividualHoot/individualHoot.css";
import Expire from "./Expire";
import ReactPlayer from "react-player";
import CaptionComp from "./CaptionComp";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const HootInside = ({
  userId,
  name,
  profilePic,
  verified,
  website,
  bio,
  hootId,
  username,
  mimeType,
  hootImgId,
  audioPoster,
  likes,
  views,
  followers,
  caption,
  link,
  ephemeral,
  privateHoot,
  onDemandMedia,
  expiryDate,
  timeStamp,
  edited,
  editedTimeStamp,
  privateProtected,
  fontFamilyStyle,
  fontColor,
  fontStyleSize,
  isSensitive,
  setIsSensitive,
}) => {
  const BaseURL = process.env.REACT_APP_API_URL; // API url
  const hostURL = "https://www.megahoot.net"; // main website
  const filePath = `${BaseURL}/images/${hootImgId}`; // media url from server
  const shareBaseUrl = `${hostURL}/${username}/hoot/${btoa(
    hootId
  )}/${uuidv4()}`;
  const shareUrl = encodeURIComponent(shareBaseUrl);
  // const shareCaption = encodeURIComponent(`${caption.length > 10 ? caption.substring(0, 70) : caption} @${username}`);
  const [shareCaption, setShareCaption] = useState(
    encodeURIComponent(`${caption}`)
  );
  const [previewUrl, setPreviewUrl] = useState("");
  // const shareCaption = encodeURIComponent(`${caption}`);
  const shareHashtags = encodeURIComponent("");
  // const shareHashtags = encodeURIComponent("megahoot,soapbox");
  // const twitterShare = `http://twitter.com/share?text=${shareCaption}&url=${shareUrl}&hashtags=${shareHashtags}`;
  const twitterShare = `http://twitter.com/share?text=${shareCaption}&url=${shareUrl}`;
  const mailShare = `mailto:?subject="Hoot from MegaHoot Soapbox"&body=${shareCaption}%20Checkout more at ${shareUrl}`;
  const facebookShare = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
  const redditShare = `https://reddit.com/submit?url=${shareUrl}&title=${shareCaption}`;
  // image is must to share something on pinterest.
  const pinterestShare = `https://pinterest.com/pin/create/bookmarklet/?media=${filePath}&url=${shareUrl}&description=jio`;
  const linkedInShare = `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareCaption}`;
  const tumblrShare = `https://www.tumblr.com/share/link?url=${shareUrl}&tags=${shareHashtags}&description=${shareCaption}`;

  // const [shareBaseUrl, setShareBaseUrl] = useState(
  //   `${hostURL}/${username}/hoot/${btoa(
  //     hootId
  //   )}/${uuidv4()}`
  // );
  // const [shareUrl, setShareUrl] = useState(encodeURIComponent(shareBaseUrl));

  // url for individual hoot for main soapbox website
  // encoded share url for individual hoot to be shared on other social media
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [isEdited, setIsEdited] = useState(edited);
  const [liked, setLiked] = useState(false);
  const [likesCount, setlikesCount] = useState(likes);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [followedAlready, setFollowedAlready] = useState(true);
  const [userFollowers, setUserFollowers] = useState([]);
  const [followersCount, setFollowersCount] = useState(followers);
  const [isReadMore, setIsReadMore] = useState(true);

  const getUserFollowData = async () => {
    await axios
      .get(`${BaseURL}/user/followers/${username}`)
      .then((response) => {
        setUserFollowers(response.data);
      });
  };

  useEffect(() => {
    getUserFollowData();
  }, [followed]);

  const history = useHistory();

  const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
  const path = userInfo
    ? userInfo.username === username
      ? `/profile/${username}`
      : `/user/${username}`
    : `/user/${username}`;
  const profilePath = `/profile/${username}`;

  const date = new Date(); // timeStamp can be implemented at server-side...
  const eTimeStamp = format(date, "LLL dd, yyyy • HH:mm");

  // finding out hashtags and stocks from caption and storing it in array
  const hashtagsFound = caption.split(" ").filter((v) => v.startsWith("#"));
  const stocksFound = caption.split(" ").filter((v) => v.startsWith("$"));
  const usernamesFound = caption.split(" ").filter((v) => v.startsWith("@"));
  const urlRegex = /(https?:\/\/[^ ]*)/;
  // let previewUrl = "";
  // try {
  //   previewUrl = caption.match(urlRegex)[1];
  // } catch (err) {
  //   console.log("No link in the post");
  // }

  useEffect(() => {
    try {
      setPreviewUrl(caption.match(urlRegex)[1]);
    } catch (err) {
      // console.log("No link in the post");
    }
  }, []);

  useEffect(() => {
    try {
      let index = urlRegex.exec(caption).index;
      let trimmedCaption = caption.slice(0, index);
      setShareCaption(trimmedCaption);
    } catch (error) {
      // console.log("No caption url to be trimmed");
    }
  }, [caption]);

  // const linkData = link
  // link && console.log("linkData", linkData);

  // // extraLinks = JSON.parse(linkData);
  // const fromDBLinks = JSON.parse(linkData)
  // const [dbLink, setDbLink] = useState([]);

  const [userData, setUserData] = useState([]);
  const [showReactPlayer, setShowReactPlayer] = useState(false);

  useEffect(() => {
    if (ReactPlayer.canPlay(link)) {
      setShowReactPlayer(true);
    } else {
      setShowReactPlayer(false);
    }
  }, [link]);

  //getting user data
  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`${BaseURL}/user/${username}`).then((response) => {
        setUserData(response.data[0]);
      });
    };

    try {
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  // getting all uploads(hoots) of particuler user
  useEffect(() => {
    axios.get(`${BaseURL}/upload/user/${username}`).then((response) => {
      setUsers(response.data);
    });

    setEditCaption(caption);
    // setDbLink(JSON.parse(link))
  }, []);

  // dbLink
  //     ?
  //     console.log("DBLINK from use effect", dbLink)
  //     : null

  var totalViews = 0;
  var totalLikes = 0;

  users.map((upload) => {
    totalViews += upload.views;
    totalLikes += upload.likes;
  });

  var commentName = null;
  var commentProfilePic = null;

  // getting user data for comment info
  const [userInfoC, setUserInfoC] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`${BaseURL}/user/${userInfo && userInfo.username}`)
        .then((response) => {
          setUserInfoC(response.data);
        });
    };
    getUserData();
  }, []);

  userInfoC.map((user) => {
    commentName = user.name;
    commentProfilePic = user.profilePic;
  });

  // like functionality added to hoots.
  useEffect(() => {
    axios.put(`${BaseURL}/upload/likes`, {
      likes: likesCount,
      // image: hootImgId
      hootId: hootId,
    });
  }, [likesCount]);

  //getting all comments
  useEffect(() => {
    axios.get(`${BaseURL}/comment/${hootId}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const setShortUrl = async () => {
    setIsShareModalOpen(true);
    // await axios
    //   .get(
    //     `https://api.shrtco.de/v2/shorten?url=${hostURL}/${username}/hoot/${btoa(
    //       hootId
    //     )}/${uuidv4()}`
    //   )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Setting the data : ", data);
    //     setShareBaseUrl(data.result.full_short_link);
    //     setShareUrl(encodeURIComponent(shareBaseUrl));
    //   })
    //   .catch((err) => {
    //     console.log("Failed in the query");
    //   });
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsMoreModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setIsMoreModalOpen(false);
  };

  const deleteHoot = async () => {
    setIsMoreModalOpen(false);

    if (mimeType) {
      axios.delete(`${BaseURL}/upload/delete/${hootImgId}`);
    } else {
      axios.delete(`${BaseURL}/upload/delete/external-player/${hootId}`);
    }

    (userInfo &&
      window.location.pathname.includes(`private/Club/${userInfo.username}`)) ||
      history.push("/");
    window.location.reload();
  };

  const editHoot = () => {
    axios.put(`${BaseURL}/upload/edit`, {
      editCaption: editCaption,
      hootId: hootId,
      edited: 1,
      editedTimeStamp: eTimeStamp,
    });

    window.location.reload();
  };

  const addComment = () => {
    if (!userInfo) {
      toast.error("Please Login to Comment");
    } else {
      axios
        .post(`${BaseURL}/comment/`, {
          name: commentName,
          username: userInfo && userInfo.username,
          commentBody: newComment,
          profilePic: commentProfilePic,
          hootId: hootId,
        })
        .then((response) => {
          setNewComment("");

          const commentProfilePicPath = `${BaseURL}/profile-pictures/${commentProfilePic}`;

          const addNewComment = {
            name: commentName,
            username: userInfo && userInfo.username,
            commentBody: newComment,
            profilePic: commentProfilePicPath,
          };

          setComments([...comments, addNewComment]);
        });
    }
  };

  const copyLinkToClipboard = () => {
    // fetch(
    //   `https://api.shrtco.de/v2/shorten?url=https://api.shrtco.de/v2/shorten?url=${shareBaseUrl}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     navigator.clipboard.writeText(data.result.full_short_link);
    //     setTimeout(() => {
    //       setIsMoreModalOpen(false);
    //       setIsShareModalOpen(false);
    //     }, 100);
    //     toast.success("Link to hoot copied to clipboard");
    //   });
    navigator.clipboard.writeText(shareBaseUrl);
    setTimeout(() => {
      setIsMoreModalOpen(false);
      setIsShareModalOpen(false);
    }, 100);
    toast.success("Link to hoot copied to clipboard");
  };

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setTimeout(() => {
      setIsMoreModalOpen(false);
      setIsShareModalOpen(false);
    }, 100);
    toast.success("Text copied to clipboard");
  };

  const shareVia = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share({
            title: `${username} (${name}) on MegaHoot Soapbox`,
            text: `${caption}`,
            url: `${shareBaseUrl}`,
          })
          .then(() =>
            console.log("Hooray! Your content was shared to the world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log("Web share is currently not supported on this browser.");
    }
  };

  const openComments = () => {
    setIsCommentModalOpen(true);
  };

  const [hoverInfo, setHoverInfo] = useState(false);

  const random = (min = 10, max = 50) => {
    let num = Math.random() * (max - min) + min;

    return Math.round(num);
  };

  // on every page load likes will increase reandomly - just remove this useEffect to get back to normal like counts
  useEffect(() => {
    // we want to show likes 0 for newly created hoots and after 30 sec likes will increase
    if (likes === 0) {
      setTimeout(() => {
        setlikesCount(likesCount + random(20, 50));
      }, 30000);
    } else {
      setlikesCount(likesCount + random(20, 50));
    }

    // to make likes count 0
    // setlikesCount(0)
  }, []);

  const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

  const followAction = () => {
    if (userInfo) {
      null;
    } else {
      toast.error("Please login to Follow");
    }
  };

  // const jsonLink = JSON.parse(JSON.stringify(link));
  // console.log("link", jsonLink);
  // console.log("stringify link", JSON.stringify(link));

  // var outputArray = [];
  // for (let element in jsonLink) {
  //     outputArray.push({
  //         id: element,
  //         name: jsonLink[element]
  //     });
  // }
  // console.log(outputArray)

  // const obj = JSON.parse(link);

  // var extraLinks = [
  //     // { name: 'https://bapunawarsaddam.medium.com/add-and-remove-…amically-using-react-and-react-hooks-3b033c3c0bf5' },
  //     // { name: 'https://www.youtube.com/watch?v=YehL_mrK94o' }
  // ]

  // link != null && (console.log("fromDBLinks parsed", fromDBLinks), setDbLink(fromDBLinks))

  const openEmbedModal = () => {
    setIsShareModalOpen(false);
    setIsEmbedModalOpen(true);
  };

  const embedHootLink = `https://www.megahoot.net/embed/hoot/${btoa(
    hootId
  )}/${uuidv4()}`;

  const homeRef = useRef(null);
  // const [iframeHeight, setIframeHeight] = useState(0)
  // const [iframeWidth, setIframeWidth] = useState(0)

  // useLayoutEffect(() => {
  //     setIframeWidth(homeRef.current.clientWidth);
  //     setIframeHeight(homeRef.current.clientHeight);
  // }, [])

  // useEffect(() => {
  //     const element = document.getElementById('element-id');
  //     if (element) {
  //         setIframeWidth(element.scrollHeight);
  //         setIframeHeight(element.scrollHeight);
  //     }
  // }, []);

  const iframe = `<iframe src=${embedHootLink} name="hootiFrame" scrolling="no" width="100%" height=600></iframe>`;

  const copyIframe = () => {
    navigator.clipboard.writeText(iframe);
    setTimeout(() => {
      setIsEmbedModalOpen(false);
    }, 100);
    toast.success("Embed Code copied to clipboard");
  };

  // converting array of object to normal array
  const userFollowersArr = userFollowers.map((user) => {
    return user.followedBy;
  });

  const addFollower = async () => {
    await getUserFollowData();

    if (userInfo) {
      setFollowed(true);
      setFollowersCount(followersCount + 1);

      axios.post(`${BaseURL}/user/followedBy`, {
        username: username,
        loggedInUsername: userInfo.username,
      });
    }

    if (userInfo) {
      toast.success(`Followed ${username}`);
    } else {
      toast.error("Please login to Follow");
    }
  };

  const removeFollower = async () => {
    await getUserFollowData();
    setFollowed(false);
    setFollowedAlready(false);
    setFollowersCount(followersCount - 1);

    if (userInfo) {
      axios.post(`${BaseURL}/user/followedBy/delete`, {
        username: username,
        loggedInUsername: userInfo.username,
      });
    }

    toast.success(`Unfollowed ${username}`);
  };

  const joinMyClub = () => {
    if (userInfo) {
      if (userData.privateChannel) {
        if (userInfo && userInfo.username === username) {
          window.location.pathname.includes(`private/Club/${username}`) ||
            history.push(`/${uuidv4()}/private/Club/${username}/${uuidv4()}`);
        } else {
          history.push(`/${uuidv4()}/private/Club/${username}/${uuidv4()}`);
        }
      } else {
        toast.info("Private Club not available!");
      }
    } else {
      toast.info("Please Login to Join Club");
    }
  };

  return (
    <Fragment>
      {ephemeral === 1 ? (
        <Expire expiryDate={expiryDate} hootImgId={hootImgId}>
          <div className="home">
            <div className="home-container" ref={homeRef} id="element-id">
              <ReactTooltip />
              <div className="post-heading">
                <div
                  onMouseEnter={() => setHoverInfo(true)}
                  onMouseLeave={() => setHoverInfo(false)}
                  className="avatar_name"
                >
                  <Link to={path}>
                    <div
                      className="avatar-wraper"
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <Avatar
                        size={50}
                        round={true}
                        name={name ? name : username}
                        src={profilePicPath}
                        className={profilePic === null ? null : "skeleton-img"}
                      />
                    </div>

                    {/* <img class="avatar" src={avatar} alt="avatar" /> */}
                  </Link>
                  <div className="div-username-name">
                    <div className="name-verification">
                      <Link to={path}>
                        <div className="name">{name ? name : username}</div>
                      </Link>
                      {verified === 1 ? (
                        <div className="verification-badge">
                          <HiBadgeCheck
                            data-tip="Verified account"
                            data-text-color="#8249A0"
                            data-background-color="#D9D2FA"
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="at-name" style={{ fontSize: "0.9rem" }}>
                      @{username}
                    </div>
                  </div>
                </div>

                {hoverInfo && (
                  <div
                    onMouseEnter={() => setHoverInfo(true)}
                    onMouseLeave={() => setHoverInfo(false)}
                    className="hover-info"
                  >
                    <div className="hover-user-follow">
                      <Link to={path}>
                        <div
                          className="avatar-hover-wraper"
                          onDragStart={(e) => e.preventDefault()}
                        >
                          <Avatar
                            size={50}
                            round={true}
                            name={name ? name : username}
                            src={profilePicPath}
                            // className="skeleton-img"
                          />
                        </div>
                        {/* <img class="hover-avatar" src={avatar} alt="avatar" /> */}
                      </Link>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                          fontSize: "small",
                        }}
                      >
                        {userInfo ? (
                          userInfo.username === username ? (
                            // <button className="btn-hoot-follow">
                            //   Following1
                            // </button>
                            ""
                          ) : userFollowers.length === 0 ? (
                            <button
                              className="btn-hoot-follow"
                              onClick={addFollower}
                            >
                              {followed ? "Following" : "Follow"}
                            </button>
                          ) : userFollowersArr.some((user) =>
                              (userInfo && userInfo.username).includes(user)
                            ) ? (
                            <button
                              className="btn-hoot-follow"
                              onClick={
                                followedAlready ? removeFollower : addFollower
                              }
                            >
                              {followedAlready ? "Following" : "Follow"}
                            </button>
                          ) : (
                            <button
                              className="btn-hoot-follow"
                              onClick={followed ? removeFollower : addFollower}
                            >
                              {followed ? "Following" : "Follow"}
                            </button>
                          )
                        ) : (
                          <button
                            className="btn-hoot-follow"
                            onClick={followAction}
                          >
                            Follow
                          </button>
                        )}
                        {userInfo ? (
                          window.location.pathname.includes(
                            `private/Club/${username}`
                          ) ? null : userInfo.username !== username ? (
                            <button
                              className="btn-hoot-follow join-my-club-margin"
                              onClick={joinMyClub}
                            >
                              Go To My Club
                            </button>
                          ) : (
                            <button
                              className="btn-hoot-follow join-my-club-margin"
                              onClick={joinMyClub}
                            >
                              Go To My Club
                            </button>
                          )
                        ) : (
                          <button
                            className="btn-hoot-follow join-my-club-margin"
                            onClick={joinMyClub}
                          >
                            Go To My Club
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="hoot-user-info">
                      <div className="hoot-username">
                        <div className="name-verification">
                          <Link to={path}>
                            <div className="name">{name}</div>
                          </Link>
                          {verified === 1 ? (
                            <div className="verification-badge">
                              <HiBadgeCheck
                                data-tip="Verified account"
                                data-text-color="#8249A0"
                                data-background-color="#D9D2FA"
                              />
                            </div>
                          ) : null}
                        </div>
                        <div
                          className="hover-at-name"
                          style={{ fontSize: "0.9rem" }}
                        >
                          @{username}
                        </div>
                      </div>
                      <div className="user-hoot-count">
                        <div>
                          <span className="hoot-counts">
                            {formatCount(totalViews) + formatSi(totalViews)}
                          </span>
                          views
                        </div>
                        <div>
                          <span className="hoot-counts">
                            {formatCount(totalLikes) + formatSi(totalLikes)}
                          </span>
                          likes
                        </div>
                      </div>
                      <hr style={{ margin: "0.2rem", marginRight: "0" }} />
                      <div className="user-bio-hover">{bio}</div>
                    </div>
                  </div>
                )}

                <div className="user-actions">
                  {/* <button className="btn-hoot-follow" onClick={followAction}>Follow</button> */}
                  {userInfo ? (
                    userInfo.username === username ? (
                      // <button className="btn-hoot-follow">Following2</button>
                      ""
                    ) : userFollowers.length === 0 ? (
                      <button className="btn-hoot-follow" onClick={addFollower}>
                        {followed ? "Following" : "Follow"}
                      </button>
                    ) : userFollowersArr.some((user) =>
                        (userInfo && userInfo.username).includes(user)
                      ) ? (
                      <button
                        className="btn-hoot-follow"
                        onClick={followedAlready ? removeFollower : addFollower}
                      >
                        {followedAlready ? "Following" : "Follow"}
                      </button>
                    ) : (
                      <button
                        className="btn-hoot-follow"
                        onClick={followed ? removeFollower : addFollower}
                      >
                        {followed ? "Following" : "Follow"}
                      </button>
                    )
                  ) : (
                    <button className="btn-hoot-follow" onClick={followAction}>
                      Follow
                    </button>
                  )}

                  {userInfo ? (
                    window.location.pathname.includes(
                      `private/Club/${username}`
                    ) ? null : userInfo.username !== username ? (
                      <button
                        className="btn-hoot-follow join-my-club-margin"
                        onClick={joinMyClub}
                      >
                        Go To My Club
                      </button>
                    ) : (
                      <button
                        className="btn-hoot-follow join-my-club-margin"
                        onClick={joinMyClub}
                      >
                        Go To My Club
                      </button>
                    )
                  ) : (
                    <button
                      className="btn-hoot-follow join-my-club-margin"
                      onClick={joinMyClub}
                    >
                      Go To My Club
                    </button>
                  )}

                  <div
                    className="more"
                    onMouseEnter={() => setIsMoreModalOpen(true)}
                    onMouseLeave={() => setIsMoreModalOpen(false)}
                  >
                    <BiDotsHorizontalRounded className="more-icon" />
                  </div>
                </div>

                {/* More Option Modal */}
                {isMoreModalOpen && (
                  <Fragment>
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsMoreModalOpen(false);
                      }}
                    >
                      <div
                        className="more-modal"
                        onMouseEnter={() => setIsMoreModalOpen(true)}
                        onMouseLeave={() => setIsMoreModalOpen(false)}
                      >
                        {userInfo ? (
                          username === userInfo.username ? (
                            <div className="more-options">
                              <span
                                onClick={() => {
                                  history.push(
                                    `/${username}/hoot/${btoa(
                                      hootId
                                    )}/${uuidv4()}`
                                  );
                                }}
                              >
                                Go to Hoot
                              </span>
                              <span onClick={shareVia}>Share to</span>
                              <span onClick={copyLinkToClipboard}>
                                Copy Link
                              </span>
                              <span onClick={copyTextToClipboard}>
                                Copy Text
                              </span>
                              <span onClick={openEditModal}>Edit</span>
                              <span onClick={openDeleteModal}> Delete</span>
                            </div>
                          ) : (
                            <div className="more-options">
                              <span
                                onClick={() => {
                                  history.push(
                                    `/${username}/hoot/${btoa(
                                      hootId
                                    )}/${uuidv4()}`
                                  );
                                }}
                              >
                                Go to Hoot
                              </span>
                              <span onClick={shareVia}>Share to</span>
                              <span onClick={copyLinkToClipboard}>
                                Copy Link
                              </span>
                              <span onClick={copyTextToClipboard}>
                                Copy Text
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="more-options">
                            <span
                              onClick={() => {
                                history.push(
                                  `/${username}/hoot/${btoa(
                                    hootId
                                  )}/${uuidv4()}`
                                );
                              }}
                            >
                              Go to Hoot
                            </span>
                            <span onClick={shareVia}>Share to</span>
                            <span onClick={copyLinkToClipboard}>Copy Link</span>
                            <span onClick={copyTextToClipboard}>Copy Text</span>
                          </div>
                        )}

                        {/* {userInfo || */}
                        {/* {userInfo || username === userInfo.username ||
                                                    <div className="more-options">
                                                        <span onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}>Go to Hoot</span>
                                                        <span onClick={shareVia}>Share to</span>
                                                        <span onClick={copyLinkToClipboard}>Copy Link</span>
                                                        <span onClick={copyTextToClipboard}>Copy Text</span>
                                                    </div>
                                                } */}
                        {/* <span onClick={() => { setTimeout(() => { setIsMoreModalOpen(false) }, 500) }}>Report Hoot</span> */}
                        {/* <IoCloseOutline className="close-modal" onClick={() => setIsMoreModalOpen(false)} /> */}
                      </div>
                    </ClickAwayListener>
                  </Fragment>
                )}

                {/* Embed modal  */}
                {isEmbedModalOpen && (
                  <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsEmbedModalOpen(false);
                      }}
                    >
                      <div className="embed-modal">
                        <h4>Embed Hoot</h4>
                        <div>How to Embed this Hoot:</div>
                        <div style={{ margin: "0.5rem 0" }}>
                          Paste this code directly into the HTML portion of your
                          site, and you'll be good to go.
                        </div>

                        <div className="embed-iframe">{iframe}</div>
                        <div className="btn-post mt-3 embed-info">
                          <Button
                            variant="primary mx-1"
                            className="btn-login"
                            onClick={copyIframe}
                          >
                            <FiCopy /> Copy code
                          </Button>{" "}
                        </div>
                        <IoCloseOutline
                          className="close-modal"
                          onClick={() => setIsEmbedModalOpen(false)}
                        />
                      </div>
                    </ClickAwayListener>
                  </Fragment>
                )}

                {/* Edit Modal */}
                {isEditModalOpen && (
                  <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsEditModalOpen(false);
                      }}
                    >
                      <div className="outer-div">
                        <div className="edit-modal">
                          {/* edit username  */}
                          <h5>
                            You are editing hoot as
                            <span
                              className="user-edit"
                              style={{ fontSize: "1rem" }}
                            >
                              {" "}
                              @
                              <Link to={profilePath} className="name-comment">
                                {username}
                              </Link>
                            </span>
                          </h5>
                          <div className="edit-content">
                            {/* left side image */}
                            <div
                              className="post-media"
                              style={{
                                width: !mimeType && "100%",
                                margin: !mimeType && "0.5rem",
                                marginLeft: !mimeType && "0",
                              }}
                              onContextMenu={(e) => e.preventDefault()}
                            >
                              {!mimeType ? (
                                (ReactPlayer.canPlay(link) &&
                                  link.endsWith(".mp4")) ||
                                link.endsWith(".mkv") ||
                                link.endsWith(".mov") ||
                                link.endsWith(".ogv") ||
                                link.endsWith("webm") ||
                                link.endsWith(".mpg") ? (
                                  <div>
                                    <video
                                      muted
                                      controls
                                      disablePictureInPicture
                                      className="hoot-vdo"
                                      style={{ width: "" }}
                                      controlsList="nodownload"
                                      onLoadStart={() => {
                                        axios.put(
                                          `${BaseURL}/upload/views/external-player`,
                                          {
                                            views: views + random(50, 400),
                                            id: hootId,
                                          }
                                        );
                                      }}
                                      onDragStart={(e) => e.preventDefault()}
                                    >
                                      <source src={link} />
                                      Your browser does not support HTML video.
                                    </video>
                                  </div>
                                ) : link.endsWith(".mp3") ||
                                  link.endsWith(".ogg") ||
                                  link.endsWith(".wav") ||
                                  link.endsWith(".flac") ||
                                  link.endsWith(".aac") ||
                                  link.endsWith(".alac") ||
                                  link.endsWith(".dsd") ? (
                                  <div>
                                    <video
                                      muted
                                      controls
                                      poster={
                                        hootImgId
                                          ? filePath
                                          : `${BaseURL}/profile-pictures/${profilePic}`
                                      }
                                      className="hoot-ado"
                                      controlsList="nodownload"
                                      onLoadStart={() => {
                                        axios.put(
                                          `${BaseURL}/upload/views/external-player`,
                                          {
                                            views: views + random(50, 400),
                                            id: hootId,
                                          }
                                        );
                                      }}
                                      onDragStart={(e) => e.preventDefault()}
                                    >
                                      <source src={link} />
                                      Your browser does not support HTML video.
                                    </video>
                                  </div>
                                ) : (
                                  ReactPlayer.canPlay(link) && (
                                    <div className="player-wrapper">
                                      <ReactPlayer
                                        url={link}
                                        className="react-player"
                                        controls="true"
                                        width={mimeType ? "97%" : "100%"}
                                        height="100%"
                                        onLoadStart={() => {
                                          axios.put(
                                            `${BaseURL}/upload/views/external-player`,
                                            {
                                              views: views + random(50, 400),
                                              id: hootId,
                                            }
                                          );
                                        }}
                                      />
                                    </div>
                                  )
                                )
                              ) : link.endsWith(".mp3") ||
                                link.endsWith(".ogg") ||
                                link.endsWith(".wav") ||
                                link.endsWith(".flac") ||
                                link.endsWith(".aac") ||
                                link.endsWith(".alac") ||
                                link.endsWith(".dsd") ? null : (
                                <MediaContent
                                  hootId={hootId}
                                  mimeType={mimeType}
                                  filePath={filePath}
                                  audioPoster={audioPoster}
                                  editOpen={isEditModalOpen}
                                  profilePicPath={profilePicPath}
                                  isSensitive={isSensitive}
                                  setIsSensitive={setIsSensitive}
                                />
                              )}
                            </div>
                            {/* right side edit box */}
                            <div className="edit-caption d-flex flex-wrap">
                              <div className="edit-profile-username">
                                <div
                                  className="avatar-wraper"
                                  onDragStart={(e) => e.preventDefault()}
                                >
                                  <Avatar
                                    size={50}
                                    round={true}
                                    name={name ? name : username}
                                    src={profilePicPath}
                                  />
                                </div>
                                {/* <img className="avatar" src={avatar} alt="avatar" /> */}
                                <div className="name avatar_name">
                                  {name ? name : username}
                                </div>
                              </div>
                              <div className="post-content">
                                <textarea
                                  autoFocus
                                  maxLength={
                                    privateHoot &&
                                    window.location.pathname.includes(
                                      `private/Club/${username}`
                                    )
                                      ? 2200
                                      : 300
                                  }
                                  className="editarea-style"
                                  placeholder="What to edit?"
                                  value={editCaption}
                                  onChange={(event) => {
                                    setEditCaption(event.target.value);
                                  }}
                                ></textarea>
                                <div className="d-flex justify-content-between m-1 btn-caption-top">
                                  <div className="caption-count">
                                    <h6
                                      className={
                                        editCaption.length >
                                          (privateHoot &&
                                          window.location.pathname.includes(
                                            `private/Club/${username}`
                                          )
                                            ? 2120
                                            : 280) && "text-danger"
                                      }
                                    >
                                      {" "}
                                      {editCaption.length}/
                                      {privateHoot &&
                                      window.location.pathname.includes(
                                        `private/Club/${username}`
                                      )
                                        ? 2200
                                        : 300}
                                    </h6>
                                  </div>
                                  <div className="btn-post my-2">
                                    <Button
                                      variant="primary mx-1"
                                      className="btn-edit-hoot"
                                      onClick={editHoot}
                                      disabled={!editCaption}
                                    >
                                      Edit
                                    </Button>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <IoCloseOutline
                            className="close-modal"
                            onClick={() => setIsEditModalOpen(false)}
                          />
                        </div>
                      </div>
                    </ClickAwayListener>
                  </Fragment>
                )}

                {/* Delete Modal */}
                {isDeleteModalOpen && (
                  <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsDeleteModalOpen(false);
                      }}
                    >
                      <div className="delete-modal">
                        <h4>Delete Hoot</h4>
                        <div className="delete-info">
                          Are you sure you want to delete this hoot? This can’t
                          be undone and it will be removed from your profile and
                          from Soapbox search results.
                        </div>
                        <div className="btn-post mt-3 delete-info">
                          <Button
                            variant="primary mx-1"
                            className="btn-login"
                            onClick={deleteHoot}
                          >
                            Delete
                          </Button>{" "}
                        </div>
                        <IoCloseOutline
                          className="close-modal"
                          onClick={() => setIsDeleteModalOpen(false)}
                        />
                      </div>
                    </ClickAwayListener>
                  </Fragment>
                )}

                {/* Comment Modal */}
                {isCommentModalOpen && (
                  <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsCommentModalOpen(false);
                      }}
                    >
                      <div className="hoot-comment-modal">
                        <h4>
                          {comments.length > 0 && comments.length} Comments,
                        </h4>
                        {/* Comment Box */}
                        <div className="comment-box-end">
                          <div className="comment-box">
                            <input
                              className="comment-input"
                              type="text"
                              maxLength="300"
                              value={newComment}
                              placeholder="Add a Comment"
                              onKeyDown={(event) => {
                                event.keyCode === 13 && addComment();
                              }}
                              onChange={(event) => {
                                setNewComment(event.target.value);
                              }}
                            />
                            <button
                              className="add-comment"
                              onClick={addComment}
                              disabled={!newComment}
                            >
                              hoot
                            </button>
                          </div>

                          {/* all comments */}
                          <div className="commets-scroll">
                            {userInfo ? (
                              comments.length > 0 ? (
                                <HootComments
                                  comments={comments}
                                  verified={verified}
                                  sliceValue={0}
                                />
                              ) : (
                                <div className="login-to-comment">
                                  Be the first one to Comment on this hoot
                                </div>
                              )
                            ) : (
                              <div className="login-to-comment">
                                Please Login to Comment
                              </div>
                            )}
                          </div>
                        </div>
                        <IoCloseOutline
                          className="close-modal"
                          onClick={() => setIsCommentModalOpen(false)}
                        />
                      </div>
                    </ClickAwayListener>
                  </Fragment>
                )}
              </div>

              {caption && (
                <div className="post-comment">
                  {" "}
                  <span className="hoot-comment">
                    <Highlighter
                      highlightClassName="highlighterClass"
                      searchWords={[
                        ...hashtagsFound,
                        ...stocksFound,
                        ...usernamesFound,
                      ]}
                      autoEscape={true}
                      textToHighlight={
                        caption.length > 300
                          ? isReadMore
                            ? caption.slice(0, 320)
                            : caption
                          : caption
                      }
                    />
                  </span>{" "}
                  <span
                    className="read-more-caption"
                    onClick={() => {
                      setIsReadMore(!isReadMore);
                    }}
                  >
                    {caption.length > 300 &&
                      (isReadMore ? (
                        <Fragment>
                          Read More
                          <FaAngleDoubleRight
                            style={{
                              marginBottom: "0.1rem",
                              marginLeft: "0.1rem",
                            }}
                          />
                        </Fragment>
                      ) : (
                        <Fragment>
                          Read Less
                          <FaAngleDoubleLeft
                            style={{
                              marginBottom: "0.1rem",
                              marginLeft: "0.1rem",
                            }}
                          />
                        </Fragment>
                      ))}
                  </span>
                  <br />{" "}
                  {!ReactPlayer.canPlay(link) && (
                    <span className="hoot-link">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-content"
                      >
                        {link}
                      </a>
                    </span>
                  )}
                  {/* {dbLink ?
                                    dbLink.map((link, index) => {
                                        return (
                                            <div key={index} style={{ padding: "0rem 0.5rem 0rem 0rem", wordBreak: "break-all" }}>
                                                <a href={link.name} target="_blank" rel="noopener noreferrer" className="link-content">{link.name}</a>
                                            </div>
                                        )
                                    })
                                    : null
                                } */}
                </div>
              )}
              {/* <hr className="mx-1" /> */}

              {/* {link.endsWith('.mp4') || link.endsWith('.mkv') || link.endsWith('.mov') || link.endsWith('.ogv') || link.endsWith('webm') || link.endsWith('.mpg')
                                ?
                                <video
                                    muted controls
                                    disablePictureInPicture
                                    className="external-vdo"
                                    controlsList="nodownload"
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
                                        poster={`${BaseURL}/profile-pictures/${profilePic}`}
                                        className="external-vdo"
                                        controlsList="nodownload"
                                    >
                                        <source
                                            src={link}
                                        />
                                        Your browser does not support HTML video.
                                    </video>
                                    :
                                    ReactPlayer.canPlay(link) &&
                                    <div className='player-wrapper'>
                                        <ReactPlayer
                                            url={link}
                                            className='react-player'
                                            controls="true"
                                            width='100%'
                                            height='100%'
                                        />
                                    </div>
                            } */}

              <div className="right-icons">
                {/* <div className="post-media"> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: mimeType || "100%",
                    paddingRight: mimeType || "0.5rem",
                    marginRight: mimeType || "0.5rem",
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {(ReactPlayer.canPlay(link) && link.endsWith(".mp4")) ||
                  link.endsWith(".mkv") ||
                  link.endsWith(".mov") ||
                  link.endsWith(".ogv") ||
                  link.endsWith(".webm") ||
                  link.endsWith(".mpg") ? (
                    <div>
                      <video
                        muted
                        controls
                        disablePictureInPicture
                        className="hoot-vdo"
                        style={{ width: "" }}
                        controlsList="nodownload"
                        onLoadStart={() => {
                          axios.put(`${BaseURL}/upload/views/external-player`, {
                            views: views + random(50, 400),
                            id: hootId,
                          });
                        }}
                        onDragStart={(e) => e.preventDefault()}
                      >
                        <source src={link} />
                        Your browser does not support HTML video.
                      </video>
                    </div>
                  ) : link.endsWith(".mp3") ||
                    link.endsWith(".ogg") ||
                    link.endsWith(".wav") ||
                    link.endsWith(".flac") ||
                    link.endsWith(".aac") ||
                    link.endsWith(".alac") ||
                    link.endsWith(".dsd") ? (
                    <div>
                      <video
                        muted
                        controls
                        poster={
                          hootImgId
                            ? filePath
                            : `${BaseURL}/profile-pictures/${profilePic}`
                        }
                        className="hoot-ado"
                        controlsList="nodownload"
                        onLoadStart={() => {
                          axios.put(`${BaseURL}/upload/views/external-player`, {
                            views: views + random(50, 400),
                            id: hootId,
                          });
                        }}
                        onDragStart={(e) => e.preventDefault()}
                      >
                        <source src={link} />
                        Your browser does not support HTML video.
                      </video>
                    </div>
                  ) : (
                    ReactPlayer.canPlay(link) && (
                      <div className="player-wrapper">
                        <ReactPlayer
                          url={link}
                          className="react-player"
                          controls="true"
                          width={mimeType ? "97%" : "100%"}
                          height="100%"
                          onLoadStart={() => {
                            axios.put(
                              `${BaseURL}/upload/views/external-player`,
                              {
                                views: views + random(50, 400),
                                id: hootId,
                              }
                            );
                          }}
                        />
                      </div>
                    )
                  )}

                  {mimeType && (
                    <MediaContent
                      hootId={hootId}
                      mimeType={mimeType}
                      filePath={filePath}
                      audioPoster={audioPoster}
                      views={views}
                      image={hootImgId}
                      profilePicPath={profilePicPath}
                      isSensitive={isSensitive}
                      setIsSensitive={setIsSensitive}
                    />
                  )}
                </div>

                {/* <MediaContent
                                    hootId={hootId}
                                    mimeType={mimeType}
                                    filePath={filePath}
                                    views={views}
                                    image={hootImgId}
                                    profilePicPath={profilePicPath}
                                /> */}
                {/* </div> */}
                <div className="post-icons">
                  {/* <div className="grp-1"> */}
                  <div className="like-count">
                    <div className="like">
                      {liked ? (
                        <FaHeart
                          className="hoot-likes-fill"
                          onClick={(e) => {
                            setLiked(false), setlikesCount(likesCount - 1);
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className="hoot-likes-border"
                          onClick={(e) => {
                            setLiked(true), setlikesCount(likesCount + 1);
                          }}
                        />
                      )}
                    </div>

                    {/* normal like counts - to get back to normal uncomment below line */}
                    {/* <div className="like-count">{likesCount}</div> */}

                    {/* artificially increased like counts */}
                    <div className="like-count">
                      {likes === 0
                        ? likesCount
                        : formatCount(likesCount) + formatSi(likesCount)}
                    </div>
                  </div>
                  <div className="comment-count">
                    <div className="comment">
                      <FiMessageSquare
                        className="cursor-pointer"
                        onClick={openComments}
                      />
                    </div>
                    <div className="comment-count">{comments.length}</div>
                  </div>
                  <div className="view-count">
                    <div className="view">
                      <FiEye className="cursor-pointer" />
                    </div>
                    <div className="view-count">
                      {formatCount(views) + formatSi(views)}
                    </div>
                  </div>

                  <div className="share">
                    <FiShare2
                      onMouseEnter={() => setShortUrl()}
                      onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Share Modal with Social Media Icons */}
                  {isShareModalOpen && (
                    <Fragment>
                      <div className="modal-overlay"></div>
                      <ClickAwayListener
                        onClickAway={() => {
                          setIsShareModalOpen(false);
                        }}
                      >
                        <div
                          className="share-modal"
                          onMouseLeave={() => setIsShareModalOpen(false)}
                        >
                          {/* <div className="text-center">
                                            <span className="share-hoot-to share-head">Share Hoot to...</span>
                                        </div> */}
                          <div className="share-flex-icons">
                            <div className="share-icons">
                              <a
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <FiRepeat className="twitter-share" />
                                  <span className="share-hoot-to">Re-Hoot</span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div
                                  className="share-icons-text"
                                  onClick={openEmbedModal}
                                >
                                  <HiOutlineCode className="twitter-share" />
                                  <span className="share-hoot-to">
                                    Embed Hoot
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={twitterShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <FiTwitter className="twitter-share" />
                                  <span className="share-hoot-to">
                                    Share to Twitter
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={linkedInShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <AiOutlineLinkedin className="linkedin-share" />
                                  <span className="share-hoot-to">
                                    Share to LinkedIn
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={facebookShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <RiFacebookCircleLine className="facebook-share" />
                                  <span className="share-hoot-to">
                                    Share to Facebook
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={redditShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <ImReddit className="reddit-share" />
                                  <span className="share-hoot-to">
                                    Share to Reddit
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={pinterestShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <ImPinterest2 className="pinterest-share" />
                                  <span className="share-hoot-to">
                                    Share to Pinterest
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={tumblrShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <FaTumblr className="tumblr-share" />
                                  <span className="share-hoot-to">
                                    Share to Tumblr
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                href={mailShare}
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div className="share-icons-text">
                                  <FiMail className="twitter-share" />
                                  <span className="share-hoot-to">
                                    Share to Email
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div
                                  className="share-icons-text"
                                  onClick={copyLinkToClipboard}
                                >
                                  <FiLink className="copy-hoot-link-share" />
                                  <span className="share-hoot-to">
                                    Copy Hoot Link
                                  </span>
                                </div>
                              </a>
                            </div>

                            <div className="share-icons">
                              <a
                                target="_blank"
                                rel="nofollow"
                                class="block button-transparent"
                              >
                                <div
                                  className="share-icons-text"
                                  onClick={shareVia}
                                >
                                  <FiShare className="Share-hoot-via-share" />
                                  <span className="share-hoot-to">
                                    Share Hoot Via
                                  </span>
                                </div>
                              </a>
                            </div>
                            <IoCloseOutline
                              className="close-modal"
                              onClick={() => setIsShareModalOpen(false)}
                            />
                          </div>
                        </div>
                      </ClickAwayListener>
                    </Fragment>
                  )}

                  {/* save/bookmark icon  */}

                  {/* <div className="save">
                            <BiBookmark className="cursor-pointer" />
                        </div> */}

                  {/* </div> */}
                </div>
              </div>

              {/*created time and  edited time */}
              <div className="view-post-comment">
                {/* <div className="post-time">{timeStamp}</div> */}
                {/* {(isEdited === 1) && <small class="badge outline-badge d-flex flex-end">EDITED</small>} */}
                {isEdited === 1 && (
                  <div className="post-time">
                    {/* last edited at {editedTimeStamp} */}
                    <small class="badge outline-badge d-flex flex-end">
                      EDITED
                    </small>
                  </div>
                )}

                {ephemeral === 1 && (
                  <small class="badge outline-badge d-flex flex-end">
                    EPHEMERAL
                  </small>
                )}

                {privateHoot === 1 && (
                  <small class="badge outline-badge d-flex flex-end">
                    PRIVATE
                  </small>
                )}
                {onDemandMedia === 1 && (
                  <small class="badge outline-badge d-flex flex-end">
                    ON DEMAND
                  </small>
                )}
              </div>

              <hr className="mx-1 my-1 hr-color" />
            </div>
          </div>
        </Expire>
      ) : (
        <div className="home">
          <div className="home-container">
            <ReactTooltip />
            <div className="post-heading">
              {privateHoot !== 1 ? (
                <div
                  onMouseEnter={() => setHoverInfo(true)}
                  onMouseLeave={() => setHoverInfo(false)}
                  className="avatar_name"
                >
                  <Link to={path}>
                    <div
                      className="avatar-wraper"
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <Avatar
                        size={50}
                        round={true}
                        name={name ? name : username}
                        src={profilePicPath}
                        className={profilePic === null ? null : "skeleton-img"}
                      />
                    </div>

                    {/* <img class="avatar" src={avatar} alt="avatar" /> */}
                  </Link>

                  <div className="div-username-name">
                    <div className="name-verification">
                      <Link to={path}>
                        <div className="name">{name ? name : username}</div>
                      </Link>
                      {verified === 1 ? (
                        <div className="verification-badge">
                          <HiBadgeCheck
                            data-tip="Verified account"
                            data-text-color="#8249A0"
                            data-background-color="#D9D2FA"
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="at-name" style={{ fontSize: "0.9rem" }}>
                      @{username}
                    </div>
                  </div>
                </div>
              ) : null}
              {/* {privateHoot !== 1 ?:null} */}

              {/* {hoverInfo && */}
              {hoverInfo && (
                <div
                  onMouseEnter={() => setHoverInfo(true)}
                  onMouseLeave={() => setHoverInfo(false)}
                  className="hover-info"
                >
                  <div className="hover-user-follow">
                    <Link to={path}>
                      <div
                        className="avatar-hover-wraper"
                        onDragStart={(e) => e.preventDefault()}
                      >
                        <Avatar
                          size={50}
                          round={true}
                          name={name ? name : username}
                          src={profilePicPath}
                          // className="skeleton-img"
                        />
                      </div>
                      {/* <img class="hover-avatar" src={avatar} alt="avatar" /> */}
                    </Link>
                    {privateHoot !== 1 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                          fontSize: "small",
                        }}
                      >
                        {userInfo ? (
                          userInfo.username === username ? (
                            // <button className="btn-hoot-follow">
                            //   Following3
                            // </button>
                            ""
                          ) : userFollowers.length === 0 ? (
                            <button
                              className="btn-hoot-follow"
                              onClick={addFollower}
                            >
                              {followed ? "Following" : "Follow"}
                            </button>
                          ) : userFollowersArr.some((user) =>
                              (userInfo && userInfo.username).includes(user)
                            ) ? (
                            <button
                              className="btn-hoot-follow"
                              onClick={
                                followedAlready ? removeFollower : addFollower
                              }
                            >
                              {followedAlready ? "Following" : "Follow"}
                            </button>
                          ) : (
                            <button
                              className="btn-hoot-follow"
                              onClick={followed ? removeFollower : addFollower}
                            >
                              {followed ? "Following" : "Follow"}
                            </button>
                          )
                        ) : (
                          <button
                            className="btn-hoot-follow"
                            onClick={followAction}
                          >
                            Follow
                          </button>
                        )}
                        {userInfo ? (
                          window.location.pathname.includes(
                            `private/Club/${username}`
                          ) ? null : userInfo.username !== username ? (
                            <button
                              className="btn-hoot-follow"
                              onClick={joinMyClub}
                            >
                              Go To My Club
                            </button>
                          ) : (
                            <button
                              className="btn-hoot-follow"
                              onClick={joinMyClub}
                            >
                              Go To My Club
                            </button>
                          )
                        ) : (
                          <button
                            className="btn-hoot-follow"
                            onClick={joinMyClub}
                          >
                            Go To My Club
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="hoot-user-info">
                    <div className="hoot-username">
                      <div className="name-verification">
                        <Link to={path}>
                          <div className="name">{name}</div>
                        </Link>
                        {verified === 1 ? (
                          <div className="verification-badge">
                            <HiBadgeCheck
                              data-tip="Verified account"
                              data-text-color="#8249A0"
                              data-background-color="#D9D2FA"
                            />
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="hover-at-name"
                        style={{ fontSize: "0.9rem" }}
                      >
                        @{username}
                      </div>
                      {/* {verified === 1
                                                ?
                                                <small className="verified-account">Verified account</small>
                                                : null
                                            } */}
                    </div>
                    {/* <div className="user-hoot-count">
                                            <span className="hoot-counts">{users.length}</span>
                                            hoots
                                        </div> */}

                    <div className="user-hoot-count">
                      <div>
                        <span className="hoot-counts">
                          {formatCount(totalViews) + formatSi(totalViews)}
                        </span>
                        views
                      </div>
                      {/* </div>
                                        <div className="user-hoot-count"> */}
                      <div>
                        <span className="hoot-counts">
                          {formatCount(totalLikes) + formatSi(totalLikes)}
                        </span>
                        likes
                      </div>
                    </div>
                    <hr style={{ margin: "0.2rem", marginRight: "0" }} />
                    <div className="user-bio-hover">{bio}</div>
                  </div>
                </div>
              )}
              {privateHoot !== 1 ? (
                <div className="user-actions">
                  {/* <button className="btn-hoot-follow" onClick={followAction}>Follow</button> */}
                  {userInfo ? (
                    userInfo.username === username ? (
                      // <button className="btn-hoot-follow">Following4</button>
                      ""
                    ) : userFollowers.length === 0 ? (
                      <button className="btn-hoot-follow" onClick={addFollower}>
                        {followed ? "Following" : "Follow"}
                      </button>
                    ) : userFollowersArr.some((user) =>
                        (userInfo && userInfo.username).includes(user)
                      ) ? (
                      <button
                        className="btn-hoot-follow"
                        onClick={followedAlready ? removeFollower : addFollower}
                      >
                        {followedAlready ? "Following" : "Follow"}
                      </button>
                    ) : (
                      <button
                        className="btn-hoot-follow"
                        onClick={followed ? removeFollower : addFollower}
                      >
                        {followed ? "Following" : "Follow"}
                      </button>
                    )
                  ) : (
                    <button className="btn-hoot-follow" onClick={followAction}>
                      Follow
                    </button>
                  )}

                  {userInfo ? (
                    window.location.pathname.includes(
                      `private/Club/${username}`
                    ) ? null : userInfo.username !== username ? (
                      <button
                        className="btn-hoot-follow join-my-club-margin"
                        onClick={joinMyClub}
                      >
                        Go To My Club
                      </button>
                    ) : (
                      <button
                        className="btn-hoot-follow join-my-club-margin"
                        onClick={joinMyClub}
                      >
                        Go To My Club
                      </button>
                    )
                  ) : (
                    <button
                      className="btn-hoot-follow join-my-club-margin"
                      onClick={joinMyClub}
                    >
                      Go To My Club
                    </button>
                  )}

                  <div
                    className="more"
                    onMouseEnter={() => setIsMoreModalOpen(true)}
                    onMouseLeave={() => setIsMoreModalOpen(false)}
                  >
                    <BiDotsHorizontalRounded className="more-icon" />
                  </div>
                </div>
              ) : (
                //created main div for user info and actions -> contains 2 divs :
                // 1) User avatar and description
                // 2) User delete option
                <div style={{ width: "100%" }}>
                  <div
                    onMouseEnter={() => setHoverInfo(true)}
                    onMouseLeave={() => setHoverInfo(false)}
                    className="avatar_name"
                    style={{
                      display: "inline-block",
                      width: "90%",
                    }}
                  >
                    <Link to={path}>
                      <div
                        className="avatar-wraper"
                        onDragStart={(e) => e.preventDefault()}
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <Avatar
                          size={50}
                          round={true}
                          name={name ? name : username}
                          src={profilePicPath}
                          className={
                            profilePic === null ? null : "skeleton-img"
                          }
                        />
                      </div>

                      {/* <img class="avatar" src={avatar} alt="avatar" /> */}
                    </Link>

                    <div
                      className="div-username-name"
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <div className="name-verification">
                        <Link to={path}>
                          <div className="name">{name ? name : username}</div>
                        </Link>
                        {verified === 1 ? (
                          <div className="verification-badge">
                            <HiBadgeCheck
                              data-tip="Verified account"
                              data-text-color="#8249A0"
                              data-background-color="#D9D2FA"
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="at-name" style={{ fontSize: "0.9rem" }}>
                        @{username}
                      </div>
                    </div>
                  </div>
                  <div
                    className="user-actions"
                    style={{
                      display: "inline-block",
                      width: "10%",
                    }}
                  >
                    <div
                      className="more"
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                      onMouseEnter={() => setIsMoreModalOpen(true)}
                      onMouseLeave={() => setIsMoreModalOpen(false)}
                    >
                      <span>
                        <BiDotsHorizontalRounded className="more-icon" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* More Option Modal */}
              {isMoreModalOpen && (
                <Fragment>
                  <ClickAwayListener
                    onClickAway={() => {
                      setIsMoreModalOpen(false);
                    }}
                  >
                    <div
                      className="more-modal"
                      onMouseEnter={() => setIsMoreModalOpen(true)}
                      onMouseLeave={() => setIsMoreModalOpen(false)}
                    >
                      {userInfo ? (
                        username === userInfo.username ? (
                          <div className="more-options">
                            {!privateHoot && (
                              <span
                                onClick={() => {
                                  history.push(
                                    `/${username}/hoot/${btoa(
                                      hootId
                                    )}/${uuidv4()}`
                                  );
                                }}
                              >
                                Go to Hoot
                              </span>
                            )}
                            {!privateHoot && (
                              <span onClick={shareVia}>Share to </span>
                            )}
                            {!privateHoot && (
                              <span onClick={copyLinkToClipboard}>
                                Copy Link
                              </span>
                            )}
                            {!privateHoot && (
                              <span onClick={copyTextToClipboard}>
                                Copy Text
                              </span>
                            )}
                            {!privateHoot && (
                              <span onClick={openEditModal}>Edit</span>
                            )}
                            <span onClick={openDeleteModal}> Delete</span>
                            {/* <span onClick={() => { setTimeout(() => { setIsMoreModalOpen(false) }, 500) }}>Report Hoot</span> */}
                          </div>
                        ) : (
                          <div className="more-options">
                            <span
                              onClick={() => {
                                history.push(
                                  `/${username}/hoot/${btoa(
                                    hootId
                                  )}/${uuidv4()}`
                                );
                              }}
                            >
                              Go to Hoot
                            </span>
                            <span onClick={shareVia}>Share to</span>
                            <span onClick={copyLinkToClipboard}>Copy Link</span>
                            <span onClick={copyTextToClipboard}>Copy Text</span>
                            {/* <span onClick={() => { setTimeout(() => { setIsMoreModalOpen(false) }, 500) }}>Report Hoot</span> */}
                          </div>
                        )
                      ) : (
                        <div className="more-options">
                          <span
                            onClick={() => {
                              history.push(
                                `/${username}/hoot/${btoa(hootId)}/${uuidv4()}`
                              );
                            }}
                          >
                            Go to Hoot
                          </span>
                          <span onClick={shareVia}>Share to</span>
                          <span onClick={copyLinkToClipboard}>Copy Link</span>
                          <span onClick={copyTextToClipboard}>Copy Text</span>
                          {/* <span onClick={() => { setTimeout(() => { setIsMoreModalOpen(false) }, 500) }}>Report Hoot</span> */}
                        </div>
                      )}

                      {/* {userInfo || */}
                      {/* {userInfo || username === userInfo.username ||
                                                    <div className="more-options">
                                                        <span onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}>Go to Hoot</span>
                                                        <span onClick={shareVia}>Share to</span>
                                                        <span onClick={copyLinkToClipboard}>Copy Link</span>
                                                        <span onClick={copyTextToClipboard}>Copy Text</span>
                                                    </div>
                                                } */}
                      {/* <IoCloseOutline className="close-modal" onClick={() => setIsMoreModalOpen(false)} /> */}
                    </div>
                  </ClickAwayListener>
                </Fragment>
              )}

              {/* Embed modal  */}
              {isEmbedModalOpen && (
                <Fragment>
                  <div className="modal-overlay"></div>
                  <ClickAwayListener
                    onClickAway={() => {
                      setIsEmbedModalOpen(false);
                    }}
                  >
                    <div className="embed-modal">
                      <h4>Embed Hoot</h4>
                      <div>How to Embed this Hoot:</div>
                      <div style={{ margin: "0.5rem 0" }}>
                        Paste this code directly into the HTML portion of your
                        site, and you'll be good to go.
                      </div>

                      <div className="embed-iframe">{iframe}</div>
                      <div className="btn-post mt-3 embed-info">
                        <Button
                          variant="primary mx-1"
                          className="btn-login"
                          onClick={copyIframe}
                        >
                          <FiCopy /> Copy code
                        </Button>{" "}
                      </div>
                      <IoCloseOutline
                        className="close-modal"
                        onClick={() => setIsEmbedModalOpen(false)}
                      />
                    </div>
                  </ClickAwayListener>
                </Fragment>
              )}

              {/* Edit Modal */}
              {isEditModalOpen && (
                <Fragment>
                  <div className="modal-overlay"></div>
                  <ClickAwayListener
                    onClickAway={() => {
                      setIsEditModalOpen(false);
                    }}
                  >
                    <div className="outer-div">
                      <div className="edit-modal">
                        {/* edit username  */}
                        <h5>
                          You are editing hoot as
                          <span
                            className="user-edit"
                            style={{ fontSize: "1rem" }}
                          >
                            {" "}
                            @
                            <Link to={profilePath} className="name-comment">
                              {username}
                            </Link>
                          </span>
                        </h5>
                        <div className="edit-content">
                          {/* left side image */}
                          <div
                            className="post-media"
                            style={{
                              width: !mimeType && "100%",
                              margin: !mimeType && "0.5rem",
                              marginLeft: !mimeType && "0",
                            }}
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            {!mimeType ? (
                              (ReactPlayer.canPlay(link) &&
                                link.endsWith(".mp4")) ||
                              link.endsWith(".mkv") ||
                              link.endsWith(".mov") ||
                              link.endsWith(".ogv") ||
                              link.endsWith(".webm") ||
                              link.endsWith(".mpg") ? (
                                <div>
                                  <video
                                    muted
                                    controls
                                    disablePictureInPicture
                                    className="hoot-vdo"
                                    style={{ width: "" }}
                                    controlsList="nodownload"
                                    onLoadStart={() => {
                                      axios.put(
                                        `${BaseURL}/upload/views/external-player`,
                                        {
                                          views: views + random(50, 400),
                                          id: hootId,
                                        }
                                      );
                                    }}
                                    onDragStart={(e) => e.preventDefault()}
                                  >
                                    <source src={link} />
                                    Your browser does not support HTML video.
                                  </video>
                                </div>
                              ) : link.endsWith(".mp3") ||
                                link.endsWith(".ogg") ||
                                link.endsWith(".wav") ||
                                link.endsWith(".flac") ||
                                link.endsWith(".aac") ||
                                link.endsWith(".alac") ||
                                link.endsWith(".dsd") ? (
                                <div>
                                  <video
                                    muted
                                    controls
                                    poster={
                                      hootImgId
                                        ? filePath
                                        : `${BaseURL}/profile-pictures/${profilePic}`
                                    }
                                    className="hoot-ado"
                                    controlsList="nodownload"
                                    onLoadStart={() => {
                                      axios.put(
                                        `${BaseURL}/upload/views/external-player`,
                                        {
                                          views: views + random(50, 400),
                                          id: hootId,
                                        }
                                      );
                                    }}
                                    onDragStart={(e) => e.preventDefault()}
                                  >
                                    <source src={link} />
                                    Your browser does not support HTML video.
                                  </video>
                                </div>
                              ) : (
                                ReactPlayer.canPlay(link) && (
                                  <div className="player-wrapper">
                                    <ReactPlayer
                                      url={link}
                                      className="react-player"
                                      controls="true"
                                      width={mimeType ? "97%" : "100%"}
                                      height="100%"
                                      onLoadStart={() => {
                                        axios.put(
                                          `${BaseURL}/upload/views/external-player`,
                                          {
                                            views: views + random(50, 400),
                                            id: hootId,
                                          }
                                        );
                                      }}
                                    />
                                  </div>
                                )
                              )
                            ) : (
                              <MediaContent
                                hootId={hootId}
                                mimeType={mimeType}
                                filePath={filePath}
                                audioPoster={audioPoster}
                                editOpen={isEditModalOpen}
                                profilePicPath={profilePicPath}
                                isSensitive={isSensitive}
                                setIsSensitive={setIsSensitive}
                              />
                            )}
                          </div>
                          {/* right side edit box */}
                          <div className="edit-caption d-flex flex-wrap">
                            <div className="edit-profile-username">
                              <div
                                className="avatar-wraper"
                                onDragStart={(e) => e.preventDefault()}
                              >
                                <Avatar
                                  size={50}
                                  round={true}
                                  name={name ? name : username}
                                  src={profilePicPath}
                                />
                              </div>
                              {/* <img className="avatar" src={avatar} alt="avatar" /> */}
                              <div className="name avatar_name">
                                {name ? name : username}
                              </div>
                            </div>
                            <div className="post-content">
                              <textarea
                                autoFocus
                                maxLength={
                                  privateHoot &&
                                  window.location.pathname.includes(
                                    `private/Club/${username}`
                                  )
                                    ? 2200
                                    : 300
                                }
                                className="editarea-style"
                                placeholder="What to edit?"
                                value={editCaption}
                                onChange={(event) => {
                                  setEditCaption(event.target.value);
                                }}
                              ></textarea>
                              <div className="d-flex justify-content-between m-1 btn-caption-top">
                                <div className="caption-count">
                                  <h6
                                    className={
                                      editCaption.length >
                                        (privateHoot &&
                                        window.location.pathname.includes(
                                          `private/Club/${username}`
                                        )
                                          ? 2120
                                          : 280) && "text-danger"
                                    }
                                  >
                                    {" "}
                                    {editCaption.length}/
                                    {privateHoot &&
                                    window.location.pathname.includes(
                                      `private/Club/${username}`
                                    )
                                      ? 2200
                                      : 300}
                                  </h6>
                                </div>
                                <div className="btn-post my-2">
                                  <Button
                                    variant="primary mx-1"
                                    className="btn-edit-hoot"
                                    onClick={editHoot}
                                    disabled={!editCaption}
                                  >
                                    Edit
                                  </Button>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <IoCloseOutline
                          className="close-modal"
                          onClick={() => setIsEditModalOpen(false)}
                        />
                      </div>
                    </div>
                  </ClickAwayListener>
                </Fragment>
              )}

              {/* Delete Modal */}
              {isDeleteModalOpen && (
                <Fragment>
                  <div className="modal-overlay"></div>
                  <ClickAwayListener
                    onClickAway={() => {
                      setIsDeleteModalOpen(false);
                    }}
                  >
                    <div className="delete-modal">
                      <h4>Delete Hoot</h4>
                      <div className="delete-info">
                        Are you sure you want to delete this hoot? This can’t be
                        undone and it will be removed from your profile and from
                        Soapbox search results.
                      </div>
                      <div className="btn-post mt-3 delete-info">
                        <Button
                          variant="primary mx-1"
                          className="btn-login"
                          onClick={deleteHoot}
                        >
                          Delete
                        </Button>{" "}
                      </div>
                      <IoCloseOutline
                        className="close-modal"
                        onClick={() => setIsDeleteModalOpen(false)}
                      />
                    </div>
                  </ClickAwayListener>
                </Fragment>
              )}

              {/* Comment Modal */}
              {isCommentModalOpen && (
                <Fragment>
                  <div className="modal-overlay"></div>
                  <ClickAwayListener
                    onClickAway={() => {
                      setIsCommentModalOpen(false);
                    }}
                  >
                    <div className="hoot-comment-modal">
                      <h4>
                        {comments.length > 0 && comments.length} Comments,
                      </h4>
                      {/* Comment Box */}
                      <div className="comment-box-end">
                        <div className="comment-box">
                          <input
                            className="comment-input"
                            type="text"
                            maxLength="300"
                            value={newComment}
                            placeholder="Add a Comment"
                            onKeyDown={(event) => {
                              event.keyCode === 13 && addComment();
                            }}
                            onChange={(event) => {
                              setNewComment(event.target.value);
                            }}
                          />
                          <button
                            className="add-comment"
                            onClick={addComment}
                            disabled={!newComment}
                          >
                            hoot
                          </button>
                        </div>

                        {/* all comments */}
                        <div className="commets-scroll">
                          {userInfo ? (
                            comments.length > 0 ? (
                              <HootComments
                                comments={comments}
                                verified={verified}
                                sliceValue={0}
                              />
                            ) : (
                              <div className="login-to-comment">
                                Be the first one to Comment on this hoot
                              </div>
                            )
                          ) : (
                            <div className="login-to-comment">
                              Please Login to Comment
                            </div>
                          )}
                        </div>
                      </div>
                      <IoCloseOutline
                        className="close-modal"
                        onClick={() => setIsCommentModalOpen(false)}
                      />
                    </div>
                  </ClickAwayListener>
                </Fragment>
              )}
            </div>

            {caption && (
              <div className="post-comment">
                <CaptionComp
                  caption={caption}
                  username={username}
                  isReadMore={isReadMore}
                  fontFamilyStyle={fontFamilyStyle}
                  fontColor={fontColor}
                  fontStyleSize={fontStyleSize}
                  hootId={hootId}
                  views={views}
                  likes={likes}
                />
                {/* {" "}<span className="hoot-comment" dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize((
                                        caption.length > 300
                                            ? (isReadMore
                                                ? caption.slice(0, 320)
                                                : caption)
                                            : caption
                                    ))
                                }}> */}
                {/* <Highlighter
                                        highlightClassName="highlighterClass"
                                        searchWords={[...hashtagsFound, ...stocksFound, ...usernamesFound]}
                                        autoEscape={true}
                                        textToHighlight={ */}
                {/* { */}
                {/* (caption.length > 300
                                        ? (isReadMore
                                            ? caption.slice(0, 320)
                                            : caption)
                                        : caption) */}
                {/* } */}
                {/* }
                                    /> */}
                {/* </span> */}{" "}
                <span
                  className="read-more-caption"
                  onClick={() => {
                    setIsReadMore(!isReadMore);
                  }}
                >
                  {caption.length > 300 &&
                    (isReadMore ? (
                      <Fragment>
                        Read More
                        <FaAngleDoubleRight
                          style={{
                            marginBottom: "0.1rem",
                            marginLeft: "0.1rem",
                          }}
                        />
                      </Fragment>
                    ) : (
                      <Fragment>
                        Read Less
                        <FaAngleDoubleLeft
                          style={{
                            marginBottom: "0.1rem",
                            marginLeft: "0.1rem",
                          }}
                        />
                      </Fragment>
                    ))}
                </span>
                {previewUrl.length > 0 && (
                  <LinkPreview url={previewUrl} width="100%"></LinkPreview>
                )}
                <br />{" "}
                {!ReactPlayer.canPlay(link) && (
                  <span className="hoot-link">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-content"
                    >
                      {link}
                    </a>
                  </span>
                )}
                {/* {dbLink ?
                                dbLink.map((link, index) => {
                                    return (
                                        <div key={index} style={{ padding: "0rem 0.5rem 0rem 0rem", wordBreak: "break-all" }}>
                                            <a href={link.name} target="_blank" rel="noopener noreferrer" className="link-content">{link.name}</a>
                                        </div>
                                    )
                                })
                                : null
                            } */}
              </div>
            )}
            {/* <hr className="mx-1" /> */}

            {/* width: 100%;
                            max-height: 500px;
                            object-fit: scale-down;
                            padding: 0.5rem;
                            border-radius: 0.95rem; */}

            {/* <ReactPlayer
                            url='https://www.youtube.com/watch?v=oM5lC7k9c-A'
                            controls="true"
                            // style={{
                            //     width: "100%",
                            //     maxHeight: "500px",
                            //     objectFit: "scale-down",
                            //     padding: "0.5rem",
                            //     borderRadius: "0.5rem"
                            // }}
                            width='100%'
                            height='100%'
                            style={{
                                borderRadius: "0.5rem",
                            }}
                        /> */}

            {/* {link.endsWith('.mp4') || link.endsWith('.mkv') || link.endsWith('.mov') || link.endsWith('.ogv') || link.endsWith('webm') || link.endsWith('.mpg')
                            ?
                            <video
                                muted controls
                                disablePictureInPicture
                                className="external-vdo"
                                controlsList="nodownload"
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
                                    poster={`${BaseURL}/profile-pictures/${profilePic}`}
                                    className="external-vdo"
                                    controlsList="nodownload"
                                >
                                    <source
                                        src={link}
                                    />
                                    Your browser does not support HTML video.
                                </video>
                                :
                                ReactPlayer.canPlay(link) &&
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        url={link}
                                        className='react-player'
                                        controls="true"
                                        width='100%'
                                        height='100%'
                                    />
                                </div>
                        } */}

            <div className="right-icons">
              {/* <div className="post-media"> */}
              {/* {ReactPlayer.canPlay(link)
                                ?
                                link.endsWith('.mp4') || link.endsWith('.mkv') || link.endsWith('.mov') || link.endsWith('.ogv') || link.endsWith('webm') || link.endsWith('.mpg')
                                    ?
                                    <div>
                                        <video
                                            muted controls
                                            disablePictureInPicture
                                            className="hoot-vdo"
                                            controlsList="nodownload"
                                        >
                                            <source
                                                src={link}
                                            />
                                            Your browser does not support HTML video.
                                        </video>
                                    </div>
                                    :
                                    link.endsWith('.mp3') || link.endsWith('.ogg') || link.endsWith('.wav') || link.endsWith('.flac') || link.endsWith('.aac') || link.endsWith('.alac') || link.endsWith('.dsd')
                                        ?
                                        <div>
                                            <video
                                                muted controls
                                                poster={`${BaseURL}/profile-pictures/${profilePic}`}
                                                className="hoot-vdo"
                                                controlsList="nodownload"
                                            >
                                                <source
                                                    src={link}
                                                />
                                                Your browser does not support HTML video.
                                            </video>
                                        </div>
                                        :
                                        ReactPlayer.canPlay(link) &&
                                        <div className='player-wrapper'>
                                            <ReactPlayer
                                                url={link}
                                                className='react-player'
                                                controls="true"
                                                width='100%'
                                                height='100%'
                                            />
                                        </div>
                                :
                                <MediaContent
                                    hootId={hootId}
                                    mimeType={mimeType}
                                    filePath={filePath}
                                    views={views}
                                    image={hootImgId}
                                    profilePicPath={profilePicPath}
                                />
                            } */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: mimeType || "100%",
                  paddingRight: mimeType || "0.5rem",
                  marginRight: mimeType || "0.5rem",
                }}
                onContextMenu={(e) => e.preventDefault()}
              >
                {(ReactPlayer.canPlay(link) && link.endsWith(".mp4")) ||
                link.endsWith(".mkv") ||
                link.endsWith(".mov") ||
                link.endsWith(".ogv") ||
                link.endsWith(".webm") ||
                link.endsWith(".mpg") ? (
                  <div>
                    <video
                      muted
                      controls
                      disablePictureInPicture
                      className="hoot-vdo"
                      style={{ width: "" }}
                      controlsList="nodownload"
                      onLoadStart={() => {
                        axios.put(`${BaseURL}/upload/views/external-player`, {
                          views: views + random(50, 400),
                          id: hootId,
                        });
                      }}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <source src={link} />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                ) : link.endsWith(".mp3") ||
                  link.endsWith(".ogg") ||
                  link.endsWith(".wav") ||
                  link.endsWith(".flac") ||
                  link.endsWith(".aac") ||
                  link.endsWith(".alac") ||
                  link.endsWith(".dsd") ? (
                  <div>
                    <video
                      muted
                      controls
                      poster={
                        hootImgId
                          ? filePath
                          : `${BaseURL}/profile-pictures/${profilePic}`
                      }
                      className="hoot-ado"
                      controlsList="nodownload"
                      onLoadStart={() => {
                        axios.put(`${BaseURL}/upload/views/external-player`, {
                          views: views + random(50, 400),
                          id: hootId,
                        });
                      }}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <source src={link} />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                ) : (
                  ReactPlayer.canPlay(link) && (
                    <div className="player-wrapper">
                      <ReactPlayer
                        url={link}
                        className="react-player"
                        controls="true"
                        width={mimeType ? "97%" : "100%"}
                        height="100%"
                        onReady={() => {
                          axios.put(`${BaseURL}/upload/views/external-player`, {
                            views: views + random(50, 400),
                            id: hootId,
                          });
                        }}
                      />
                    </div>
                  )
                )}

                {mimeType &&
                  (link.endsWith(".mp3") ||
                  link.endsWith(".ogg") ||
                  link.endsWith(".wav") ||
                  link.endsWith(".flac") ||
                  link.endsWith(".aac") ||
                  link.endsWith(".alac") ||
                  link.endsWith(".dsd") ? null : (
                    <MediaContent
                      hootId={hootId}
                      mimeType={mimeType}
                      filePath={filePath}
                      audioPoster={audioPoster}
                      views={views}
                      image={hootImgId}
                      profilePicPath={profilePicPath}
                      isSensitive={isSensitive}
                      setIsSensitive={setIsSensitive}
                    />
                  ))}
              </div>

              {/* <MediaContent
                                    hootId={hootId}
                                    mimeType={mimeType}
                                    filePath={filePath}
                                    views={views}
                                    image={hootImgId}
                                    profilePicPath={profilePicPath}
                                /> */}
              {/* </div> */}
              <div className="post-icons">
                {/* <div className="grp-1"> */}
                {privateHoot !== 1 ? (
                  <div className="like-count">
                    <div className="like">
                      {liked ? (
                        <FaHeart
                          className="hoot-likes-fill"
                          onClick={(e) => {
                            setLiked(false), setlikesCount(likesCount - 1);
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className="hoot-likes-border"
                          onClick={(e) => {
                            setLiked(true), setlikesCount(likesCount + 1);
                          }}
                        />
                      )}
                    </div>

                    {/* normal like counts - to get back to normal uncomment below line */}
                    {/* <div className="like-count">{likesCount}</div> */}

                    {/* artificially increased like counts */}
                    <div className="like-count">
                      {likes === 0
                        ? likesCount
                        : formatCount(likesCount) + formatSi(likesCount)}
                    </div>
                  </div>
                ) : null}
                {privateHoot !== 1 ? (
                  <div className="comment-count">
                    <div className="comment">
                      <FiMessageSquare
                        className="cursor-pointer"
                        onClick={openComments}
                      />
                    </div>
                    <div className="comment-count">{comments.length}</div>
                  </div>
                ) : null}
                {privateHoot !== 1 ? (
                  <div className="view-count">
                    <div className="view">
                      <FiEye className="cursor-pointer" />
                    </div>
                    <div className="view-count">
                      {formatCount(views) + formatSi(views)}
                    </div>
                  </div>
                ) : null}
                {privateHoot !== 1 ? (
                  <div className="share">
                    <FiShare2
                      onMouseEnter={() => setShortUrl()}
                      onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                      className="cursor-pointer"
                    />
                  </div>
                ) : null}

                {/* Share Modal with Social Media Icons */}
                {isShareModalOpen && (
                  <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener
                      onClickAway={() => {
                        setIsShareModalOpen(false);
                      }}
                    >
                      <div
                        className="share-modal"
                        onMouseLeave={() => setIsShareModalOpen(false)}
                      >
                        {/* <div className="text-center">
                                            <span className="share-hoot-to share-head">Share Hoot to...</span>
                                        </div> */}
                        <div className="share-flex-icons">
                          <div className="share-icons">
                            <a
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <FiRepeat className="twitter-share" />
                                <span className="share-hoot-to">Re-Hoot</span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div
                                className="share-icons-text"
                                onClick={openEmbedModal}
                              >
                                <HiOutlineCode className="twitter-share" />
                                <span className="share-hoot-to">
                                  Embed Hoot
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={twitterShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <FiTwitter className="twitter-share" />
                                <span className="share-hoot-to">
                                  Share to Twitter
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={linkedInShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <AiOutlineLinkedin className="linkedin-share" />
                                <span className="share-hoot-to">
                                  Share to LinkedIn
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={facebookShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <RiFacebookCircleLine className="facebook-share" />
                                <span className="share-hoot-to">
                                  Share to Facebook
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={redditShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <ImReddit className="reddit-share" />
                                <span className="share-hoot-to">
                                  Share to Reddit
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={pinterestShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <ImPinterest2 className="pinterest-share" />
                                <span className="share-hoot-to">
                                  Share to Pinterest
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={tumblrShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <FaTumblr className="tumblr-share" />
                                <span className="share-hoot-to">
                                  Share to Tumblr
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              href={mailShare}
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div className="share-icons-text">
                                <FiMail className="twitter-share" />
                                <span className="share-hoot-to">
                                  Share to Email
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div
                                className="share-icons-text"
                                onClick={copyLinkToClipboard}
                              >
                                <FiLink className="copy-hoot-link-share" />
                                <span className="share-hoot-to">
                                  Copy Hoot Link
                                </span>
                              </div>
                            </a>
                          </div>

                          <div className="share-icons">
                            <a
                              target="_blank"
                              rel="nofollow"
                              class="block button-transparent"
                            >
                              <div
                                className="share-icons-text"
                                onClick={shareVia}
                              >
                                <FiShare className="Share-hoot-via-share" />
                                <span className="share-hoot-to">
                                  Share Hoot Via
                                </span>
                              </div>
                            </a>
                          </div>
                          <IoCloseOutline
                            className="close-modal"
                            onClick={() => setIsShareModalOpen(false)}
                          />
                        </div>
                      </div>
                    </ClickAwayListener>
                  </Fragment>
                )}

                {/* save/bookmark icon  */}

                {/* <div className="save">
                            <BiBookmark className="cursor-pointer" />
                        </div> */}

                {/* </div> */}
              </div>
            </div>

            {/*created time and  edited time */}
            <div className="view-post-comment">
              {/* <div className="post-time">{timeStamp}</div> */}
              {/* {(isEdited === 1) && <small class="badge outline-badge d-flex flex-end">EDITED</small>} */}
              {isEdited === 1 && (
                <div className="post-time">
                  {/* last edited at {editedTimeStamp} */}
                  <small class="badge outline-badge d-flex flex-end">
                    EDITED
                  </small>
                </div>
              )}

              {ephemeral === 1 && (
                <small class="badge outline-badge d-flex flex-end">
                  EPHEMERAL
                </small>
              )}

              {privateHoot === 1 && (
                <small class="badge outline-badge d-flex flex-end">
                  PRIVATE
                </small>
              )}
              {onDemandMedia === 1 && (
                <small class="badge outline-badge d-flex flex-end">
                  ON DEMAND
                </small>
              )}
            </div>

            <hr className="mx-1 my-1 hr-color" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default HootInside;
