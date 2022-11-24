import React, { Fragment, useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "../components/NavBar/NavBar";
import PublicProfile from "../components/PublicProfile";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import BeatLoader from "react-spinners/BeatLoader";

const PublicProfilePage = () => {
  const { username } = useParams();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
  const BaseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // to chech if username === to logged in username then we redirect them to profile page
    // if (username == userInformation.username) {
    //     const profilePath = `/profile/${username}`;
    //     history.push(profilePath);
    // }

    const getUserData = async () => {
      await axios.get(`${BaseURL}/user/${username}`).then((response) => {
        setUserInfo(response.data);
      });
      setLoading(false);
    };
    getUserData();
  }, [username]);

  return (
    <Fragment>
      <NavBar />
      <div className="main-body">
        <SideBar />
        {loading && (
          <div className="loading">
            <BeatLoader color={"#8249A0"} loading={loading} size={20} />
          </div>
        )}
        {!loading &&
          userInfo.map((user) => {
            return (
              <div style={{ width: "100%" }} key={user.id}>
                {console.log(user)}
                <PublicProfile
                  userId={user.id}
                  verified={user.verified}
                  badge={user.badge}
                  privateChannel={user.privateChannel}
                  followers={user.followers}
                  name={user.name}
                  userName={user.username}
                  profilePic={user.profilePic}
                  website={user.website}
                  bio={user.bio}
                  twitter={user.twitter}
                  instagram={user.instagram}
                  linkedIn={user.linkedIn}
                  facebook={user.facebook}
                  tiktok={user.tiktok}
                  snapchat={user.snapchat}
                  reddit={user.reddit}
                  pinterest={user.pinterest}
                  medium={user.medium}
                  tumblr={user.tumblr}
                />
                <Helmet>
                  <title>
                    {user.name} (@{username}) on MegaHoot Soapbox : A Club
                    Community Where Content Creators Become Club Owners, Earn
                    and Build.
                  </title>
                  <meta
                    name="description"
                    content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build."
                  />
                </Helmet>
              </div>
            );
          })}
        <FloatingButton />
      </div>
    </Fragment>
  );
};

export default PublicProfilePage;
