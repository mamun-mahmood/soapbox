import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import Notable from "../assets/RegularVerified.svg";
import PremiumVerified from "../assets/PremiumVerified.svg";
import CorporateVerified from "../assets/CorporateVerified.svg";
import General from "../assets/purple.svg";
import Media from "../assets/MediaVerified.svg";
// import OfficalSoapbox from "../assets/designation-icons/Official_Soapbox.svg";
// import ClubSoapbox from "../assets/designation-icons/Club_Soapbox.svg";
// import AdultSoapbox from "../assets/designation-icons/Adult_Soapbox.svg";
// import CorporateSoapbox from "../assets/designation-icons/Corporate_Soapbox.svg";
// import GovermentSoapbox from "../assets/designation-icons/Government_Soapbox.svg";
// import MediaSoapbox from "../assets/designation-icons/Media_Soapbox.svg";
// import ParodySoapbox from "../assets/designation-icons/Parody_Soapbox.svg";
const FoundUsers = ({ user }) => {
  const BaseURL = process.env.REACT_APP_API_URL;
  const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
  const path = userInfo
    ? userInfo.username === user.username
      ? `/profile/${user.username}`
      : `/user/${user.username}`
    : `/user/${user.username}`;
  const [badge, setBadge] = useState(null);
  const [designation, setDesignation] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`${BaseURL}/user/${user.username}`).then((response) => {
        setBadge(response.data[0].badge);
        setDesignation(response.data[0].designation);
      });
    };

    getUserData();
  }, []);
  return (
    <Fragment>
      <div className="avatar_name">
        <Link to={path}>
          <div className="avatar-wraper">
            <Avatar
              size={50}
              round={true}
              name={user.name ? user.name : user.username}
              src={`${BaseURL}/profile-pictures/${user.profilePic}`}
              className={
                `${BaseURL}/profile-pictures/${user.profilePic}`
                  ? "skeleton-img-no-src"
                  : "skeleton-img"
              }
            />
          </div>
        </Link>

        <div className="div-suggested-username-name">
          <div className="name-verification">
            <Link to={path}>
              <div className="name">
                {user.name
                  ? user.name.length > 15
                    ? user.name.substring(0, 15) + "..."
                    : user.name
                  : user.username}
              </div>
            </Link>

            {user.verified === 1 && (
              <div className="profile-verification-badge">
                {badge === "Premium" ? (
                  <img
                    src={PremiumVerified}
                    height="18px"
                    width="18px"
                    alt="premium_verified"
                  />
                ) : badge === "Corporate" ? (
                  <img
                    src={CorporateVerified}
                    height="18px"
                    width="18px"
                    alt="corporate_verified"
                  />
                ) : badge === "Notable" ? (
                  <img
                    src={Notable}
                    height="18px"
                    width="18px"
                    alt="corporate_verified"
                  />
                ) : badge === "General" ? (
                  <img
                    src={General}
                    height="18px"
                    width="18px"
                    alt="corporate_verified"
                  />
                ) : badge === "Media" ? (
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
              </div>
            )}
          </div>
          <div className="at-suggested-name">@{user.username}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default FoundUsers;
