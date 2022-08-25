import React from "react";
import "./LandingPage.css";
import soapbox from "../../assets/Soapbox.png";

const LandingPage = ({ userInfo }) => {
  const BaseURL = process.env.REACT_APP_API_URL;
  console.log(userInfo);

  let picPath = userInfo[0] ? userInfo[0].profilePic : "";
  const profilePicPath = `${BaseURL}/profile-pictures/${picPath}`;
  const ownerName = userInfo[0] ? `@${userInfo[0].username}'s club` : "my club";

  return (
    <div className="landing-container">
      <div className="landing-user-info">
        <div className="landing-user-pic">
          <img src={`${profilePicPath}`} alt="profile" />
        </div>

        <div
          className="landing-username-heading"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4 style={{ textAlign: "center" }}>{ownerName}</h4>
        </div>
      </div>

      <div className="landing-more">
        <div className="landing-more-item" id="landing-company-name">
          <h5 style={{ textAlign: "center" }}>Company NAME</h5>
        </div>
        <div className="landing-more-item" id="owner-revenue-projection">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="random_graph.txt"
            height="200px"
            width="100%"
            style={{ borderRadius: "30px" }}
          ></img>
        </div>
        <div className="landing-more-item" id="owner-company-overview"></div>
        <div className="landing-more-item" id="owner-video">
          <video width="100%" height="150px" poster={soapbox}>
            <source src={null}></source>
          </video>
        </div>
        <div className="landing-more-item" id="leaders-name-titles"></div>
        <div className="landing-more-item" id="owner-token-block"></div>

        <button className="landing-more-item" id="file-download">
          Download
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
