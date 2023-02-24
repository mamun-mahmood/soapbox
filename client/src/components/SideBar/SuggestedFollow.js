import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import Notable from "../../assets/RegularVerified.svg";
import PremiumVerified from "../../assets/PremiumVerified.svg";
import CorporateVerified from "../../assets/CorporateVerified.svg";
import General from "../../assets/purple.svg";
import Media from "../../assets/MediaVerified.svg";
import OfficalSoapbox from "../../assets/designation-icons/Official_Soapbox.svg";
import ClubSoapbox from "../../assets/designation-icons/Club_Soapbox.svg";
import AdultSoapbox from "../../assets/designation-icons/Adult_Soapbox.svg";
import CorporateSoapbox from "../../assets/designation-icons/Corporate_Soapbox.svg";
import GovermentSoapbox from "../../assets/designation-icons/Government_Soapbox.svg";
import MediaSoapbox from "../../assets/designation-icons/Media_Soapbox.svg";
import ParodySoapbox from "../../assets/designation-icons/Parody_Soapbox.svg";

const SuggestedFollow = ({ verifiedUser }) => {
  const [users, setUsers] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followedAlready, setFollowedAlready] = useState(true);
  const [userFollowers, setUserFollowers] = useState(null);
  const [userData, setUserData] = useState([]);

  const history = useHistory();

  const getUserFollowData = async () => {
    await axios
      .get(`${BaseURL}/user/followers/${verifiedUser.username}`)
      .then((response) => {
        setUserFollowers(response && response.data);
      });
  };

  useEffect(() => {
    getUserFollowData();
  }, [followed]);

  const BaseURL = process.env.REACT_APP_API_URL;

  // getting all uploads(hoots) of particuler user for counting all views and likes
  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`${BaseURL}/upload/user/${verifiedUser.username}`)
        .then((response) => {
          setUsers(response.data);
        });
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`${BaseURL}/user/${verifiedUser.username}`)
        .then((response) => {
          setUserData(response.data[0]);
        });
    };

    try {
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, [verifiedUser.username]);

  var totalViews = 0;
  var totalLikes = 0;

  users.map((user) => {
    totalViews += user.views;
    totalLikes += user.likes;
  });

  const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
  const path = userInfo
    ? userInfo.username === verifiedUser.username
      ? `/profile/${verifiedUser.username}`
      : `/user/${verifiedUser.username}`
    : `/user/${verifiedUser.username}`;

  const addFollower = async () => {
    await getUserFollowData();

    if (userInfo) {
      setFollowed(true);

      axios.post(`${BaseURL}/user/followedBy`, {
        username: verifiedUser.username,
        loggedInUsername: userInfo.username,
      });
    }

    if (userInfo) {
      toast.success(`Followed ${verifiedUser.username}`);
    } else {
      toast.error("Please login to Follow");
    }
  };

  const removeFollower = async () => {
    await getUserFollowData();
    setFollowed(false);
    setFollowedAlready(false);

    if (userInfo) {
      axios.post(`${BaseURL}/user/followedBy/delete`, {
        username: verifiedUser.username,
        loggedInUsername: userInfo.username,
      });
    }

    toast.success(`Unfollowed ${verifiedUser.username}`);
  };

  // converting array of object to normal array
  const userFollowersArr =
    userFollowers &&
    userFollowers.map((user) => {
      return user.followedBy;
    });

  const followAction = () => {
    if (userInfo) {
      null;
    } else {
      toast.error("Please login to Follow");
    }
  };

  const joinMyClub = () => {
    if (userInfo) {
      if (userData.privateChannel) {
        history.push(
          `/${uuidv4()}/private/Club/${verifiedUser.username}/${uuidv4()}`
        );
      } else {
        toast.info("Private Club not available!");
      }
    } else {
      toast.info("Please Login to Join Club");
    }
  };

  return (
    <Fragment>
      <div style={{ position: "relative" }} className="suggested-follow">
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
                name={
                  verifiedUser.name ? verifiedUser.name : verifiedUser.username
                }
                src={`${BaseURL}/profile-pictures/${verifiedUser.profilePic}`}
                className={
                  `${BaseURL}/profile-pictures/${verifiedUser.profilePic}`
                    ? "skeleton-img-no-src"
                    : "skeleton-img"
                }
                // className="skeleton-img"
              />
            </div>
          </Link>

          <div className="div-suggested-username-name">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              <p
                style={{
                  maxWidth: "calc(60%)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="m-0 name"
              >
                {" "}
                <Link to={path} className="name">
                  {verifiedUser.name ? verifiedUser.name.trim() : verifiedUser.username.trim()}
                </Link>
              </p>
              <p className="m-0 ml-1 mr-1 ">
                {verifiedUser.verified === 1 ? (
                  <Fragment>
                    {verifiedUser.badge === "Premium" ? (
                      <img
                        src={PremiumVerified}
                        height="18px"
                        width="18px"
                        alt="premium_verified"
                      />
                    ) : verifiedUser.badge === "Corporate" ? (
                      <img
                        src={CorporateVerified}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : verifiedUser.badge === "Notable" ? (
                      <img
                        src={Notable}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : verifiedUser.badge === "General" ? (
                      <img
                        src={General}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : verifiedUser.badge === "Media" ? (
                      <img
                        src={Media}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : (
                      <img
                        src={Notable}
                        height="18px"
                        width="18px"
                        alt="regular_verified"
                      />
                    )}
                  </Fragment>
                ) : null}
              </p>
              <p
                className="m-0"
                style={{
                  maxWidth: "calc(33%)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {" "}
                @{verifiedUser.username.trim()}
              </p>
            </div>
            {verifiedUser.designation &&
            verifiedUser.designation === "Official" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p>
                  <img
                    src={OfficalSoapbox}
                    height="18px"
                    width="18px"
                    alt={verifiedUser.designation}
                  />
                </p>
                <p
                  style={{
                    color: "#6D6E71",
                    fontSize: "12px",
                    marginLeft: "3px",
                    marginTop: "4px",
                  }}
                >
                  {verifiedUser.designation}
                </p>
              </div>
            ) : verifiedUser.designation &&
              verifiedUser.designation.includes("Media") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p>
                  <img
                    src={MediaSoapbox}
                    height="18px"
                    width="18px"
                    alt={verifiedUser.designation}
                  />
                </p>
                <p
                  style={{
                    color: "#BCBEC0",
                    fontSize: "12px",
                    marginLeft: "3px",
                    marginTop: "4px",
                  }}
                >
                  {verifiedUser.designation}
                </p>
              </div>
            ) : verifiedUser.designation &&
              verifiedUser.designation.includes("Corporate") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p>
                  <img
                    src={CorporateSoapbox}
                    height="18px"
                    width="18px"
                    alt={verifiedUser.designation}
                  />
                </p>
                <p
                  style={{
                    color: "#BCBEC0",
                    fontSize: "12px",
                    marginLeft: "3px",
                    marginTop: "4px",
                  }}
                >
                  {verifiedUser.designation}
                </p>
              </div>
            ) : verifiedUser.designation &&
              verifiedUser.designation.includes("Adult") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p>
                  <img
                    src={AdultSoapbox}
                    height="18px"
                    width="18px"
                    alt={verifiedUser.designation}
                  />
                </p>
                <p
                  style={{
                    color: "#BCBEC0",
                    fontSize: "12px",
                    marginLeft: "3px",
                    marginTop: "4px",
                  }}
                >
                  {verifiedUser.designation}
                </p>
              </div>
            ) : verifiedUser.designation &&
              verifiedUser.designation.includes("Goverment") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p>
                  <img
                    src={GovermentSoapbox}
                    height="18px"
                    width="18px"
                    alt={verifiedUser.designation}
                  />
                </p>
                <p
                  style={{
                    color: "#6D6E71",
                    fontSize: "12px",
                    marginLeft: "3px",
                    marginTop: "4px",
                  }}
                >
                  {verifiedUser.designation}
                </p>
              </div>
            ) : verifiedUser.designation &&
              verifiedUser.designation.includes("Club") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p>
                  <img
                    src={ClubSoapbox}
                    height="18px"
                    width="18px"
                    alt={verifiedUser.designation}
                  />
                </p>
                <p
                  style={{
                    color: "#6D6E71",
                    fontSize: "12px",
                    marginLeft: "3px",
                    marginTop: "4px",
                  }}
                >
                  {verifiedUser.designation}
                </p>
              </div>
            ) : (
              verifiedUser.designation &&
              verifiedUser.designation.includes("Parody") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "5px",
                  }}
                >
                  <p>
                    <img
                      src={ParodySoapbox}
                      height="18px"
                      width="18px"
                      alt={verifiedUser.designation}
                    />
                  </p>
                  <p
                    style={{
                      color: "#6D6E71",
                      fontSize: "12px",
                      marginLeft: "3px",
                      marginTop: "4px",
                    }}
                  >
                    {verifiedUser.designation}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {hoverInfo && (
          <div
            onMouseEnter={() => setHoverInfo(true)}
            onMouseLeave={() => setHoverInfo(false)}
            className="suggested-hover-info"
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
                    name={
                      verifiedUser.name
                        ? verifiedUser.name
                        : verifiedUser.username
                    }
                    src={`${BaseURL}/profile-pictures/${verifiedUser.profilePic}`}
                    // className="skeleton-img"
                  />
                </div>
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
                  userInfo.username === verifiedUser.username ? (
                    <button className="btn-hoot-follow">Following</button>
                  ) : userFollowers && userFollowers.length === 0 ? (
                    <button className="btn-hoot-follow" onClick={addFollower}>
                      {followed ? "Following" : "Follow"}
                    </button>
                  ) : userFollowers &&
                    userFollowersArr.some((user) =>
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
                  userInfo.username !== verifiedUser.username ? (
                    <button className="btn-hoot-follow" onClick={joinMyClub}>
                      Go To My Club
                    </button>
                  ) : (
                    <button className="btn-hoot-follow" onClick={joinMyClub}>
                      Go To My Club
                    </button>
                  )
                ) : (
                  <button className="btn-hoot-follow" onClick={joinMyClub}>
                    Go To My Club
                  </button>
                )}
              </div>
            </div>

            <div className="hoot-user-info">
              <div className="hoot-username">
              <div
              style={{
                display: "flex",
                alignItems: "center",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              <p
                style={{
                  maxWidth: "calc(60%)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="m-0 name"
              >
                {" "}
                <Link to={path} className="name">
                  {verifiedUser.name ? verifiedUser.name.trim() : verifiedUser.username.trim()}
                </Link>
              </p>
              <p className="m-0 ml-1 mr-1 ">
                {verifiedUser.verified === 1 ? (
                  <Fragment>
                    {verifiedUser.badge === "Premium" ? (
                      <img
                        src={PremiumVerified}
                        height="18px"
                        width="18px"
                        alt="premium_verified"
                      />
                    ) : verifiedUser.badge === "Corporate" ? (
                      <img
                        src={CorporateVerified}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : verifiedUser.badge === "Notable" ? (
                      <img
                        src={Notable}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : verifiedUser.badge === "General" ? (
                      <img
                        src={General}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : verifiedUser.badge === "Media" ? (
                      <img
                        src={Media}
                        height="18px"
                        width="18px"
                        alt="corporate_verified"
                      />
                    ) : (
                      <img
                        src={Notable}
                        height="18px"
                        width="18px"
                        alt="regular_verified"
                      />
                    )}
                  </Fragment>
                ) : null}
              </p>
              <p
                className="m-0"
                style={{
                  maxWidth: "calc(33%)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {" "}
                @{verifiedUser.username.trim()}
              </p>
            </div>
                {verifiedUser.designation &&
                verifiedUser.designation === "Official" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      <img
                        src={OfficalSoapbox}
                        height="18px"
                        width="18px"
                        alt={verifiedUser.designation}
                      />
                    </p>
                    <p
                      style={{
                        color: "#6D6E71",
                        fontSize: "12px",
                        marginLeft: "3px",
                        marginTop: "4px",
                      }}
                    >
                      {verifiedUser.designation}
                    </p>
                  </div>
                ) : verifiedUser.designation &&
                  verifiedUser.designation.includes("Media") ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      <img
                        src={MediaSoapbox}
                        height="18px"
                        width="18px"
                        alt={verifiedUser.designation}
                      />
                    </p>
                    <p
                      style={{
                        color: "#BCBEC0",
                        fontSize: "12px",
                        marginLeft: "3px",
                        marginTop: "4px",
                      }}
                    >
                      {verifiedUser.designation}
                    </p>
                  </div>
                ) : verifiedUser.designation &&
                  verifiedUser.designation.includes("Corporate") ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      <img
                        src={CorporateSoapbox}
                        height="18px"
                        width="18px"
                        alt={verifiedUser.designation}
                      />
                    </p>
                    <p
                      style={{
                        color: "#BCBEC0",
                        fontSize: "12px",
                        marginLeft: "3px",
                        marginTop: "4px",
                      }}
                    >
                      {verifiedUser.designation}
                    </p>
                  </div>
                ) : verifiedUser.designation &&
                  verifiedUser.designation.includes("Adult") ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      <img
                        src={AdultSoapbox}
                        height="18px"
                        width="18px"
                        alt={verifiedUser.designation}
                      />
                    </p>
                    <p
                      style={{
                        color: "#BCBEC0",
                        fontSize: "12px",
                        marginLeft: "3px",
                        marginTop: "4px",
                      }}
                    >
                      {verifiedUser.designation}
                    </p>
                  </div>
                ) : verifiedUser.designation &&
                  verifiedUser.designation.includes("Goverment") ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      <img
                        src={GovermentSoapbox}
                        height="18px"
                        width="18px"
                        alt={verifiedUser.designation}
                      />
                    </p>
                    <p
                      style={{
                        color: "#6D6E71",
                        fontSize: "12px",
                        marginLeft: "3px",
                        marginTop: "4px",
                      }}
                    >
                      {verifiedUser.designation}
                    </p>
                  </div>
                ) : verifiedUser.designation &&
                  verifiedUser.designation.includes("Club") ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      <img
                        src={ClubSoapbox}
                        height="18px"
                        width="18px"
                        alt={verifiedUser.designation}
                      />
                    </p>
                    <p
                      style={{
                        color: "#6D6E71",
                        fontSize: "12px",
                        marginLeft: "3px",
                        marginTop: "4px",
                      }}
                    >
                      {verifiedUser.designation}
                    </p>
                  </div>
                ) : (
                  verifiedUser.designation &&
                  verifiedUser.designation.includes("Parody") && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "5px",
                      }}
                    >
                      <p>
                        <img
                          src={ParodySoapbox}
                          height="18px"
                          width="18px"
                          alt={verifiedUser.designation}
                        />
                      </p>
                      <p
                        style={{
                          color: "#6D6E71",
                          fontSize: "12px",
                          marginLeft: "3px",
                          marginTop: "4px",
                        }}
                      >
                        {verifiedUser.designation}
                      </p>
                    </div>
                  )
                )}
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
              <div className="user-bio-hover">{verifiedUser.bio}</div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SuggestedFollow;
