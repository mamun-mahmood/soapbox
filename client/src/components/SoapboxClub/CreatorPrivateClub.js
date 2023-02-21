import React, { useEffect, useState } from "react";
import "./soapboxClub.css";
import Avatar from "react-avatar";
import { formatCount, formatSi } from "../../Helpers/formatNumbers";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import privateClubIcon from "../../assets/privateclub.png";
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
const CreatorPrivateClub = ({ creator }) => {
  const [creatorsData, setCreatorsData] = useState([]);
  const BaseURL = process.env.REACT_APP_API_URL;
  const profilePicPath = `${BaseURL}/profile-pictures/${creator.profilePic}`;
  const [badge, setBadge] = useState(null);
  const [designation, setDesignation] = useState(null);
  // getting all uploads(hoots) of
  // particuler user for counting all views and likes
  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`${BaseURL}/upload/user/${creator.username}`)
        .then((res) => {
          setCreatorsData(res.data);
        });
      await axios
        .get(`${BaseURL}/user/${creator.username}`)
        .then((response) => {
          setBadge(response.data[0].badge);
          setDesignation(response.data[0].designation);
        });
    };

    getUserData();
  }, []);

  var totalViews = 0;
  var totalLikes = 0;

  creatorsData.map((creator) => {
    totalViews += creator.views;
    totalLikes += creator.likes;
  });
  return (
    <div
      className="creator-private-club"
      onDragStart={(e) => e.preventDefault()}
    >
      <img src={privateClubIcon} alt="" width="30px" className="cpc-badge" />

      {/* creator profile pic */}
      <div className="cpc-c1">
        <div className="cpc-profile-pic">
          <Avatar
            size={100}
            round={true}
            name={creator.name}
            src={profilePicPath}
            className="cpc-bg"
          />
        </div>

        {/* verifed creator name */}
        <div className="cpc-verifed">
          <div className="cpc-name">{creator.name}</div>

          {creator.verified === 1 ? (
            <div
              className="profile-verification-badge"
              style={{
                padding: 0,
                fontSize: "1.2rem",
                marginBottom: "0.2rem",
              }}
            >
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
          ) : null}
        </div>

        {/* verifed creator username */}
        <div className="cpc-username">@{creator.username}</div>
        {designation && designation === "Official" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <p>
              <img
                src={OfficalSoapbox}
                height="18px"
                width="18px"
                alt={designation}
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
              {designation}
            </p>
          </div>
        ) : designation && designation.includes("Media") ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <p>
              <img
                src={MediaSoapbox}
                height="18px"
                width="18px"
                alt={designation}
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
              {designation}
            </p>
          </div>
        ) : designation && designation.includes("Corporate") ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <p>
              <img
                src={CorporateSoapbox}
                height="18px"
                width="18px"
                alt={designation}
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
              {designation}
            </p>
          </div>
        ) : designation && designation.includes("Adult") ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <p>
              <img
                src={AdultSoapbox}
                height="18px"
                width="18px"
                alt={designation}
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
              {designation}
            </p>
          </div>
        ) : designation && designation.includes("Goverment") ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <p>
              <img
                src={GovermentSoapbox}
                height="18px"
                width="18px"
                alt={designation}
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
              {designation}
            </p>
          </div>
        ) : designation && designation.includes("Club") ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <p>
              <img
                src={ClubSoapbox}
                height="18px"
                width="18px"
                alt={designation}
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
              {designation}
            </p>
          </div>
        ) : (
          designation && designation.includes("Parody") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <p>
                <img
                  src={ParodySoapbox}
                  height="18px"
                  width="18px"
                  alt={designation}
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
                {designation}
              </p>
            </div>
          )
        )}

        {/* user's likes and views */}
        <div className="cpc-stats">
          <div className="cpc-stat-item">
            <b className="cpc-count">
              {formatCount(totalLikes) + formatSi(totalLikes)}
            </b>
            <span className="cpc-label"> Likes </span>
          </div>

          <div className="cpc-stat-item">
            <b className="cpc-count">
              {formatCount(totalViews) + formatSi(totalViews)}
            </b>
            <span className="cpc-label"> Views</span>
          </div>
        </div>
      </div>

      <div className="cpc-c2">
        <Link to={`/${uuidv4()}/private/Club/${creator.username}/${uuidv4()}`}>
          Go to My Club
        </Link>
      </div>
    </div>
  );
};

export default CreatorPrivateClub;
