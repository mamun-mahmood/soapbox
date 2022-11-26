import React, { useState } from "react";
import { Box, Modal } from "@material-ui/core";
import axios from "axios";
import "./admin.css";
import UpdateBadge from "./UpdateBadge";
import UpdateDesignation from "./UpdateDesignation";
import { AfterpayClearpayMessageElement } from "@stripe/react-stripe-js";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
  const [alertMsg, setAlerMsg] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setAlerMsg(null);
  };
  const [badge, setBadge] = useState(user.badge);
  const [badgeUpdate, setBadgeUpdate] = useState(user.badgeUpdateTime);
  const [designation, setDesignation] = useState(user.designation);
  const [designationUpdate, setDesignationUpdate] = useState(
    user.designationUpdateTime
  );
  const [verified, setVerified] = useState(user.verified);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [followers, setFollowers] = useState(user.followers);
  const [communityClub, setCommunityClub] = useState(user.communityClub);
  const [privateChannel, setPrivateChannel] = useState(user.privateChannel);

  const UpdateFollower = () => {
    axios
      .put(`${BaseURL}/user/updateUserByAdmin`, {
        username: username,
        email: email,
        verified: verified,
        followers: followers,
        communityClub: communityClub,
        privateChannel: privateChannel,
        badge: badge,
        designation: designation,
        badgeUpdateTime: badgeUpdate,
        designationUpdateTime: designationUpdate,
      })
      .then((res) => {
        alert(res.data.message, "changedData: " + res.changedRows);
        setAlerMsg(res.data.message);
        handleClose();
      });
  };
  return (
    <React.Fragment>
      <button className="admin-btn" onClick={handleOpen}>
        Edit
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box style={style}>
          <div className="container-fluid rounded bg-light p-5">
            <h4 style={{ textAlign: "center" }}>
              Update details of {user.username}
            </h4>
            <div className="row w-100">
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                <p>Email: </p>
                <input
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                <p>Followers: </p>
                <input
                  placeholder="followers"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                <p>Username</p>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                <p>Verify</p>
                <input
                  placeholder="verify"
                  value={verified}
                  onChange={(e) => {
                    setVerified(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                <p>Community Club: </p>
                <input
                  placeholder="Community Club"
                  value={communityClub}
                  onChange={(e) => setCommunityClub(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                <p>Private Club: </p>
                <input
                  placeholder="Private Club"
                  value={privateChannel}
                  onChange={(e) => setPrivateChannel(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                {/* <p>
                  Current Badge:{" "}
                  {user.verified === 1 ? (
                    <span>{user.badge ? user.badge : "Notable"}</span>
                  ) : (
                    "Not Verified"
                  )}
                </p> */}
                <UpdateBadge
                  setBadge={setBadge}
                  badge={badge}
                  setBadgeUpdate={setBadgeUpdate}
                />
              </div>
              <div className="col-sm-12 col-md-6 edit-admin-panel">
                {/* <p>
                  Account type:{" "}
                  <span>
                    {user.designation ? user.designation : "Not assigned"}
                  </span>
                </p> */}
                <UpdateDesignation
                  setDesignation={setDesignation}
                  setDesignationUpdate={setDesignationUpdate}
                  designation={designation}
                />
              </div>
              <button
                className="admin-btn"
                onClick={handleClose}
                style={{ color: "red", marginTop: "10px" }}
              >
                Cancel
              </button>
              <button
                className="admin-btn"
                onClick={() => {
                  UpdateFollower();
                }}
              >
                Update
              </button>
            </div>
            <p style={{ textAlign: "center" }}>
              Note:Type <b>1</b> for Verified and <b>0</b> for not Verified
            </p>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default EditModal;
