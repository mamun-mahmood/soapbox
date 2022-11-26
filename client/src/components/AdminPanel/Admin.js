import axios from "axios";
import React, { useState, useEffect } from "react";
import "./admin.css";
import EditModal from "./EditModal";

export default function Admin() {
  const BaseURL = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseURL}/user`, {})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
