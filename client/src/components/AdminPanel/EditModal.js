import React, { useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import axios from "axios";
import "./admin.css";
import UpdateBadge from "./UpdateBadge";
import CorporateVerified from "../../assets/CorporateVerified.svg";
import RegularVerified from "../../assets/RegularVerified.svg";
import purple from "../../assets/purple.svg";
import gold from "../../assets/gold.svg";
import PremiumVerified from "../../assets/PremiumVerified.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: "100%",
  //   bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EditModal = ({ setUser, user }) => {
  const BaseURL = process.env.REACT_APP_API_URL;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [badge, setBadge] = useState(null);
  const UpdateFollower = () => {
    axios
      .put(`${BaseURL}/user/updateUserByAdmin`, {
        username: user.username,
        email: user.email,
        verified: user.verified,
        followers: user.followers,
        communityClub: user.communityClub,
        privateChannel: user.privateChannel,
        badge: badge,
      })
      .then(() => {
        alert(`Updated details of ${user.username}`);
        handleClose();
      });
  };

  console.log(user);
  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <button className="admin-btn" onClick={handleOpen}>
        Edit
      </button>
      <Modal open={open} onClose={handleClose}>
        <div style={style}>
          <div className="edit-admin-panel">
            <h4>Update details of {user.username}</h4>
            <label>Email</label>
            <input
              placeholder="email"
              value={user.email}
              onChange={(e) => {
                setUser({
                  username: user.username,
                  followers: user.followers,
                  verify: user.verified,
                  email: e.target.value,
                  communityClub: user.communityClub,
                  privateChannel: user.privateChannel,
                });
              }}
            />

            <label>followers</label>
            <input
              placeholder="followers"
              value={user.followers}
              onChange={(e) => {
                setUser({
                  username: user.username,
                  followers: e.target.value,
                  verified: user.verified,
                  email: user.email,
                  communityClub: user.communityClub,
                  privateChannel: user.privateChannel,
                });
              }}
            />

            <label>Verify</label>
            <input
              placeholder="verify"
              value={user.verified}
              onChange={(e) => {
                setUser({
                  username: user.username,
                  followers: user.followers,
                  verified: e.target.value,
                  email: user.email,
                  communityClub: user.communityClub,
                  privateChannel: user.privateChannel,
                });
              }}
            />

            <label>Username</label>
            <input
              placeholder="Username"
              value={user.username}
              onChange={(e) => {
                setUser({
                  username: e.target.value,
                  followers: user.followers,
                  verified: user.verified,
                  email: user.email,
                  communityClub: user.communityClub,
                  privateChannel: user.privateChannel,
                });
              }}
            />
            <label>Community Club</label>
            <input
              placeholder="Community Club"
              value={user.communityClub}
              onChange={(e) => {
                setUser({
                  username: user.username,
                  followers: user.followers,
                  verified: user.verified,
                  email: user.email,
                  communityClub: e.target.value,
                  privateChannel: user.privateChannel,
                });
              }}
            />
            <label>Private Club</label>
            <input
              placeholder="Private Club"
              value={user.privateChannel}
              onChange={(e) => {
                setUser({
                  username: user.username,
                  followers: user.followers,
                  verified: user.verified,
                  email: user.email,
                  communityClub: user.communityClub,
                  privateChannel: e.target.value,
                });
              }}
            />
            <div>
              <p>
                Current Badge:{" "}
                {user.verified === 1 ? (
                  <span>{user.badge ? user.badge : "Regular"}</span>
                ) : (
                  "Not Verified"
                )}
              </p>
            </div>
            <UpdateBadge setBadge={setBadge} badge={badge} />
            <button
              className="admin-btn"
              onClick={() => {
                UpdateFollower();
              }}
            >
              Update
            </button>
            <button
              className="admin-btn"
              onClick={handleClose}
              style={{ color: "red" }}
            >
              Cancel
            </button>
            <p>
              Note:Type <b>1</b> for Verified and <b>0</b> for not Verified
            </p>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditModal;
