import axios from "axios";
import React, { useState, useEffect } from "react";
import "./admin.css";
import EditModal from "./EditModal";

export default function Admin() {
  const BaseURL = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    axios
      .get(`${BaseURL}/user`, {})
      .then((response) => {
        setUsers(response.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const UpdateFollower = () => {
    axios
      .put(`${BaseURL}/user/updateUserByAdmin`, {
        username: user.username,
        email: user.email,
        verified: user.verified,
        followers: user.followers,
        communityClub: user.communityClub,
        privateChannel: user.privateChannel,
      })
      .then(() => {
        alert(`Updated details of ${user.username}`);
        setShowEdit((prev) => !prev);
      });
  };

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div>
      {!user.username ? (
        <h4 style={{ textAlign: "center" }}>MegaHoot Admin Panel</h4>
      ) : null}

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Verifed</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.length
            ? users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.verified ? "Yes" : "No"}</td>
                  <td>
                    {/* <button
                      className="admin-btn"
                      onClick={() => {
                        setUser(user);
                        setShowEdit((prev) => !prev);
                        topFunction();
                      }}
                    >
                      Edit
                    </button> */}
                    <EditModal setUser={setUser} user={user} />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
