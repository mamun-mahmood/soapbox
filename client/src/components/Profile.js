import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useCallback,
} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { formatCount, formatSi } from "../Helpers/formatNumbers";
import { HiBadgeCheck } from "react-icons/hi";
import { FiPlayCircle, FiTwitter } from "react-icons/fi";
import {
  RiFacebookCircleLine,
  RiSnapchatLine,
  RiPinterestLine,
} from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { FaTumblr } from "react-icons/fa";
import { BsExclude } from "react-icons/bs";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineReddit,
  AiOutlineMedium,
} from "react-icons/ai";
import chathive from "../assets/chathive.png";
import BeatLoader from "react-spinners/BeatLoader";
import HootOutside from "./HootOutside/HootOutside";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "./Feed/InfiniteScrollLoader";
import ReactTooltip from "react-tooltip";
// import toast from 'react-hot-toast';
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import ShowModalForIframes from "./showModalForIframes";
import MyVerticallyCenteredModal from "./PrivateChannels/model";

const Profile = ({
  verified,
  privateChannel,
  followers,
  userName,
  name,
  profilePic,
  website,
  bio,
  twitter,
  instagram,
  linkedIn,
  facebook,
  tiktok,
  snapchat,
  reddit,
  pinterest,
  medium,
  tumblr,
}) => {
  const { username } = useParams();
  const [myUploads, setMyUploads] = useState([]);
  const [allUploads, setAllUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [followersCount, setFollowersCount] = useState(followers);
  const [page, setpage] = useState(2);
  const [privateC, setPrivateC] = useState(privateChannel);
  const history = useHistory();
  const [showIframe, setShowIframe] = useState(false);
  const [iframeBox, setIframeBox] = useState(null);
  const LIMIT = 9;

  const BaseURL = process.env.REACT_APP_API_URL;
  const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

  useEffect(() => {
    const getUserUploadData = async () => {
      await axios.all[
        (axios
          .get(
            `${BaseURL}/upload/user/public/p/${username}?page=1&limit=${LIMIT}`
          )
          .then((response) => {
            setMyUploads(response.data.results);
          }),
        axios.get(`${BaseURL}/upload/user/${username}`).then((response) => {
          setAllUploads(response.data);
        }))
      ];
      setLoading(false);
    };
    getUserUploadData();
  }, [username]);

  const fetchProfileHoots = async () => {
    await axios
      .get(
        `${BaseURL}/upload/user/public/p/${username}?page=${page}&limit=${LIMIT}`
      )
      .then((response) => {
        const hootsFromServer = response.data.results;

        setMyUploads([...myUploads, ...hootsFromServer]);

        if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
          setHasMore(false);
        }
      });

    setpage(page + 1);
  };

  var totalViews = 0;
  var totalLikes = 0;

  allUploads.map((upload) => {
    totalViews += upload.views;
    totalLikes += upload.likes;
  });

  const addPrivateChannel = () => {
    if (verified) {
      setPrivateC(1);
      const privateChannel = async () => {
        await axios.put(`${BaseURL}/user/private-channel`, {
          privateChannel: 1,
          username: username,
        });
      };

      const privateChannelToast = privateChannel();
      toast.promise(privateChannelToast, {
        pending: "Adding your Private Club...",
        success: "Private Club added Successfully",
        error: "Please try again",
      });
    } else {
      setPrivateC(0);
      toast(() => (
        <div>
          Only Available to Verified
          <HiBadgeCheck className="verification-badge" />
          Creators
        </div>
      ));
    }
  };
  const createPrivateClubRequest = (privateC) => {
    if (!privateC) {
      history.push(`/request-private-club/${username}`);
    } else {
      toast.error(
        "You Can not request for another Private Club if you already have one!"
      );
    }
  };

  return (
    <div className="profile-page-main">
      {loading && (
        <div className="loading-iv">
          <BeatLoader color={"#8249A0"} size={20} />
        </div>
      )}

      {!loading && !showIframe && (
        <div className="profile-page">
          <div className="new-profile">
            <div className="profile-container">
              <div
                className="profile-picture"
                onDragStart={(e) => e.preventDefault()}
              >
                <Avatar
                  size={160}
                  round={true}
                  name={name}
                  src={profilePicPath}
                />
              </div>

              <ReactTooltip />

              <div className="user-info">
                <div className="display-name">
                  <div className="profile-name-verification">
                    <h1 style={{ fontSize: "14px" }}>{name}</h1>
                    {verified === 1 ? (
                      <div className="profile-verification-badge">
                        <HiBadgeCheck
                          data-tip="Verified account"
                          data-text-color="#8249A0"
                          data-background-color="#D9D2FA"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="user-name-page" style={{ fontSize: "14px" }}>
                  @{username}
                </div>

                <button className="btn-edit-profile">
                  <Link to={`/edit/profile/${username}`}>Edit Profile</Link>
                </button>
                <button className="btn-edit-profile">
                  <Link to={`/chathive/${username}`}>
                    {" "}
                    <img src={chathive} className="chativelogo" />
                  </Link>
                </button>

                <ReactTooltip />

                {privateC ? (
                  <button className="btn-add-private-c">
                    {/* <Link to={`/${uuidv4()}/SoapboxHall/${uuidv4()}/${username}/${uuidv4()}/${uuidv4()}`}> */}
                    <Link
                      to={`/${uuidv4()}/private/Club/${username}/${uuidv4()}`}
                    >
                      Go to My Club
                    </Link>
                  </button>
                ) : (
                  <button
                    className="btn-add-private-c"
                    onClick={() => {
                      createPrivateClubRequest(privateC);
                    }}
                  >
                    Request Private Club
                  </button>
                )}
              </div>
            </div>

            <div className="profile-links">
              <div className="user-counts">
                <div className="counts-stack">
                  <span className="counts-bold">
                    {formatCount(followers) + formatSi(followers)} Followers
                  </span>
                </div>
                <div className="counts-stack">
                  <span className="counts-bold">
                    {formatCount(totalViews) + formatSi(totalViews)} Views
                  </span>{" "}
                </div>
                <div className="counts-stack">
                  <span className="counts-bold">
                    {formatCount(totalLikes) + formatSi(totalLikes)} Likes
                  </span>{" "}
                </div>
              </div>
              {bio && <div className="user-desc">{bio}</div>}
              {website && (
                <a
                  href={
                    !website.includes("https://")
                      ? "https://" + website
                      : website
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-website"
                >
                  {website.includes("https://") ? website.slice(8) : website}
                </a>
              )}
              <div className="social-profile-icon-links">
                {twitter && (
                  <a
                    href={
                      !twitter.includes("https://")
                        ? "https://" + twitter
                        : twitter
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiTwitter className="social-profile-icon s-twitter" />
                  </a>
                )}
                {instagram && (
                  <a
                    href={
                      !instagram.includes("https://")
                        ? "https://" + instagram
                        : instagram
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineInstagram className="social-profile-icon s-instagram" />
                  </a>
                )}
                {linkedIn && (
                  <a
                    href={
                      !linkedIn.includes("https://")
                        ? "https://" + linkedIn
                        : linkedIn
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineLinkedin className="social-profile-icon s-linkedin" />
                  </a>
                )}
                {facebook && (
                  <a
                    href={
                      !facebook.includes("https://")
                        ? "https://" + facebook
                        : facebook
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiFacebookCircleLine className="social-profile-icon s-facebook" />
                  </a>
                )}
                {tiktok && (
                  <a
                    href={
                      !tiktok.includes("https://")
                        ? "https://" + tiktok
                        : tiktok
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiTiktok className="social-profile-icon s-tiktok" />
                  </a>
                )}
                {snapchat && (
                  <a
                    href={
                      !snapchat.includes("https://")
                        ? "https://" + snapchat
                        : snapchat
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiSnapchatLine className="social-profile-icon s-snapchat" />
                  </a>
                )}
                {reddit && (
                  <a
                    href={
                      !reddit.includes("https://")
                        ? "https://" + reddit
                        : reddit
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineReddit className="social-profile-icon s-reddit" />
                  </a>
                )}
                {pinterest && (
                  <a
                    href={
                      !pinterest.includes("https://")
                        ? "https://" + pinterest
                        : pinterest
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiPinterestLine className="social-profile-icon s-pinterest" />
                  </a>
                )}
                {medium && (
                  <a
                    href={
                      !medium.includes("https://")
                        ? "https://" + medium
                        : medium
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineMedium className="social-profile-icon s-medium" />
                  </a>
                )}
                {tumblr && (
                  <a
                    href={
                      !tumblr.includes("https://")
                        ? "https://" + tumblr
                        : tumblr
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTumblr className="social-profile-icon s-tumblr" />
                  </a>
                )}
              </div>
              <div
                className="live-header"
                style={{
                  backgroundColor: "rgb(130 73 160 / 52%)",
                  color: "white",
                  borderRadius: "3px",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                Member Tools
              </div>
              <div
                className="social-profile-icon-links"
                style={{ marginLeft: "35px", width: "90%" }}
              >
                <button
                  className="btn-add-private-c"
                  style={{
                    minWidth: "165px",
                    maxWidth: "166px !important",
                    margin: "0px",
                  }}
                >
                  My Memberships
                </button>
                <button
                  className="btn-add-private-c"
                  style={{
                    minWidth: "165px",
                    maxWidth: "166px !important",
                    margin: "0px",
                  }}
                  onClick={() => {
                    if (showIframe) {
                      document.getElementById("slideIFMP").style.transition =
                        "2sec";
                      document.getElementById("slideIFMP").style.left = "200vw";

                      setTimeout(() => {
                        setShowIframe(false);
                      }, 500);
                    } else {
                      setIframeBox({
                        src: "https://www.verohive.net",
                        title: "VeroHive",
                      });
                      setShowIframe(true);
                      setTimeout(() => {
                        if (document.getElementById("slideIFMP")) {
                          document.getElementById(
                            "slideIFMP"
                          ).style.transition = "1sec";
                          document.getElementById("slideIFMP").style.left =
                            "30%";
                        }
                      }, 1);
                    }
                  }}
                >
                  Video Meetings
                </button>
                <button
                  className="btn-add-private-c"
                  style={{
                    minWidth: "165px",
                    maxWidth: "166px !important",
                    margin: "0px",
                  }}
                  onClick={() => {
                    if (showIframe) {
                      document.getElementById("slideIFMP").style.transition =
                        "2sec";
                      document.getElementById("slideIFMP").style.left = "200vw";

                      setTimeout(() => {
                        setShowIframe(false);
                      }, 500);
                    } else {
                      setIframeBox({
                        src: "https://www.documega.com/enterprise-solutions/documega/",
                        title: "DocuMega",
                      });
                      setShowIframe(true);
                      setTimeout(() => {
                        if (document.getElementById("slideIFMP")) {
                          document.getElementById(
                            "slideIFMP"
                          ).style.transition = "1sec";
                          document.getElementById("slideIFMP").style.left =
                            "30%";
                        }
                      }, 1);
                    }
                  }}
                >
                  eDocuments
                </button>
              </div>{" "}
              <div
                className="live-header"
                style={{
                  backgroundColor: "rgb(130 73 160 / 52%)",
                  color: "white",
                  borderRadius: "3px",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                Crypto Tools
              </div>
              <div
                className="social-profile-icon-links"
                style={{ marginLeft: "35px", width: "90%" }}
              >
                <button
                  className="btn-add-private-c"
                  style={{
                    minWidth: "165px",
                    maxWidth: "166px !important",
                    margin: "0px",
                  }}
                  onClick={() => {
                    if (showIframe) {
                      document.getElementById("slideIFMP").style.transition =
                        "2sec";
                      document.getElementById("slideIFMP").style.left = "200vw";

                      setTimeout(() => {
                        setShowIframe(false);
                      }, 500);
                    } else {
                      setIframeBox({
                        src: "https://www.megahoot.com/xmg-fintech-digital-payment-portal/xmg-fintech/",
                        title: "XMG Wallet",
                      });

                      setShowIframe(true);
                      setTimeout(() => {
                        if (document.getElementById("slideIFMP")) {
                          document.getElementById(
                            "slideIFMP"
                          ).style.transition = "1sec";
                          document.getElementById("slideIFMP").style.left =
                            "30%";
                        }
                      }, 1);
                    }
                  }}
                >
                  Buy XMG
                </button>
                <button
                  className="btn-add-private-c"
                  style={{
                    minWidth: "165px",
                    maxWidth: "166px !important",
                    margin: "0px",
                  }}
                  onClick={() => {
                    if (showIframe) {
                      document.getElementById("slideIFMP").style.transition =
                        "2sec";
                      document.getElementById("slideIFMP").style.left = "200vw";

                      setTimeout(() => {
                        setShowIframe(false);
                      }, 500);
                    } else {
                      setIframeBox({
                        src: "https://www.megahoot.com/vault/megahoot-vault/",
                        title: "MegaHoot Vault",
                      });

                      setShowIframe(true);
                      setTimeout(() => {
                        if (document.getElementById("slideIFMP")) {
                          document.getElementById(
                            "slideIFMP"
                          ).style.transition = "1sec";
                          document.getElementById("slideIFMP").style.left =
                            "30%";
                        }
                      }, 1);
                    }
                  }}
                >
                  MegaHoot Vault
                </button>
                <button
                  className="btn-add-private-c"
                  style={{
                    minWidth: "165px",
                    maxWidth: "166px !important",
                    margin: "0px",
                  }}
                  onClick={() => {
                    if (showIframe) {
                      document.getElementById("slideIFMP").style.transition =
                        "2sec";
                      document.getElementById("slideIFMP").style.left = "200vw";

                      setTimeout(() => {
                        setShowIframe(false);
                      }, 500);
                    } else {
                      setIframeBox({
                        src: "https://www.megahootvault.com/",
                        title: "Crypto Index",
                      });

                      setShowIframe(true);
                      setTimeout(() => {
                        if (document.getElementById("slideIFMP")) {
                          document.getElementById(
                            "slideIFMP"
                          ).style.transition = "1sec";
                          document.getElementById("slideIFMP").style.left =
                            "30%";
                        }
                      }, 1);
                    }
                  }}
                >
                  Crypto Index
                </button>
              </div>
            </div>
          </div>

          <hr />

          <div className="pt-2">
            {myUploads.length === 0 && (
              <div className="no-hoots">
                <p>No hoots yet!</p>
                <div className="profile-hoot">
                  <Link to="/create">Create Hoot</Link>
                </div>
              </div>
            )}

            {loading && (
              <div className="loading">
                <BeatLoader color={"#8249A0"} size={20} />
              </div>
            )}

            {/* no need to reverse the list as it is getting reversed from the server itself  */}
            {!loading && myUploads.length > 0 && (
              <InfiniteScroll
                dataLength={myUploads.length}
                next={fetchProfileHoots}
                hasMore={hasMore}
                loader={myUploads.length > 10 && <InfiniteScrollLoader />}
              >
                <div className="hoot-profile-layout">
                  {myUploads.map((upload) => {
                    console.log(upload);
                    return (
                      <div key={upload.id}>
                        {!upload.mimeType ? (
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
                                  `/${username}/hoot/${btoa(
                                    upload.id
                                  )}/${uuidv4()}`
                                );
                              }}
                            >
                              {(ReactPlayer.canPlay(upload.link) &&
                                upload.link.endsWith(".mp4")) ||
                              upload.link.endsWith(".mkv") ||
                              upload.link.endsWith(".mov") ||
                              upload.link.endsWith(".ogv") ||
                              upload.link.endsWith(".webm") ||
                              upload.link.endsWith(".mpg") ? (
                                <div className="vdo-container">
                                  <video
                                    muted
                                    disablePictureInPicture
                                    className="hoot-vdo-profile"
                                    style={{ margin: "0" }}
                                    onMouseOver={(event) => event.target.play()}
                                    onMouseOut={(event) => event.target.pause()}
                                    onDragStart={(e) => e.preventDefault()}
                                  >
                                    <source src={upload.link} />
                                    Your browser does not support HTML video.
                                  </video>
                                </div>
                              ) : upload.link.endsWith(".mp3") ||
                                upload.link.endsWith(".ogg") ||
                                upload.link.endsWith(".wav") ||
                                upload.link.endsWith(".flac") ||
                                upload.link.endsWith(".aac") ||
                                upload.link.endsWith(".alac") ||
                                upload.link.endsWith(".dsd") ? (
                                <div className="vdo-container">
                                  <video
                                    muted
                                    poster={`${BaseURL}/profile-pictures/${profilePic}`}
                                    className="hoot-vdo-profile"
                                    style={{ margin: "0" }}
                                    onDragStart={(e) => e.preventDefault()}
                                  >
                                    <source src={upload.link} />
                                    Your browser does not support HTML video.
                                  </video>
                                </div>
                              ) : (
                                ReactPlayer.canPlay(upload.link) && (
                                  <div className="player-profile-wrapper">
                                    <ReactPlayer
                                      url={upload.link}
                                      className="react-player"
                                      controls="true"
                                      width={upload.mimeType ? "97%" : "100%"}
                                      height="100%"
                                      light={true}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            {/* <FiPlayCircle
                              className="GIF-overlay"
                              style={{ borderRadius: "50%" }}
                              onClick={() => {
                                history.push(
                                  `/${username}/hoot/${btoa(
                                    upload.id
                                  )}/${uuidv4()}`
                                );
                              }}
                            /> */}
                            <div
                              style={{
                                width: "80%",
                                position: "absolute",
                                bottom: "10rem",
                                left: " 2rem",
                                zIndex: "44",
                                fontFamily: upload.fontFamilyStyle.includes(
                                  "fontFamilyStyle"
                                )
                                  ? upload.fontFamilyStyle.fontFamily
                                  : upload.fontFamilyStyle || "Arial",
                              }}
                            >
                              {upload.caption.length > 30
                                ? upload.caption.slice(0, 25) + "..."
                                : upload.caption}
                            </div>
                          </div>
                        ) : (
                          <HootOutside
                            hootId={upload.id}
                            username={upload.authorUsername}
                            mimeType={upload.mimeType}
                            hootImgId={upload.image}
                            audioPoster={upload.audioPoster}
                            profilePicPath={profilePicPath}
                            fontFamilyStyle={upload.fontFamilyStyle}
                            fontColor={upload.fontColor}
                            fontStyleSize={upload.fontStyleSize}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      )}
      {showIframe ? (
        <div id="slideIFMP">
          <div className="header-iframe">
            {/* <div>{iframeBox.title}</div> */}
            <button
              onClick={() => {
                document.getElementById("slideIFMP").style.transition = "2sec";
                document.getElementById("slideIFMP").style.left = "200vw";

                setTimeout(() => {
                  setShowIframe(false);
                }, 500);
              }}
              className="close-button-iframe"
            >
              X
            </button>
          </div>
          <iframe
            src={iframeBox.src}
            allow={`camera ${iframeBox.src}; microphone ${iframeBox.src}`}
            title={iframeBox.title}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
