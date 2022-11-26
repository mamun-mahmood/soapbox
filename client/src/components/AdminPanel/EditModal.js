import React, { useState } from "react";
import {
  Modal,
} from "@material-ui/core";
import axios from "axios";
import "./admin.css";
import UpdateBadge from "./UpdateBadge";
import UpdateDesignation from "./UpdateDesignation";
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
        handleClose();
        console.log(res.data);
      });
  };
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>followers</label>
            <input
              placeholder="followers"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
            />

            <label>Verify</label>
            <input
              placeholder="verify"
              value={verified}
              onChange={(e) => {
                setVerified(e.target.value);
              }}
            />

            <label>Username</label>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Community Club</label>
            <input
              placeholder="Community Club"
              value={communityClub}
              onChange={(e) => setCommunityClub(e.target.value)}
            />
            <label>Private Club</label>
            <input
              placeholder="Private Club"
              value={privateChannel}
              onChange={(e) => setPrivateChannel(e.target.value)}
            />
            <div>
              <p>
                Current Badge:{" "}
                {user.verified === 1 ? (
                  <span>{user.badge ? user.badge : "Notable"}</span>
                ) : (
                  "Not Verified"
                )}
              </p>
            </div>
            <UpdateBadge
              setBadge={setBadge}
              badge={badge}
              setBadgeUpdate={setBadgeUpdate}
            />

            <div>
              <p>
                Account type:{" "}
                <span>
                  {user.designation ? user.designation : "Not assigned"}
                </span>
              </p>
            </div>
            <UpdateDesignation
              setDesignation={setDesignation}
              setDesignationUpdate={setDesignationUpdate}
              designation={designation}
            />
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
              style={{ color: "red", marginTop: "10px" }}
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
