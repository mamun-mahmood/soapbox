import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './admin.css'

export default function Admin() {
  const BaseURL = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])


  const [showEdit, setShowEdit] = useState(false)
  useEffect(() => {
    axios.get(`${BaseURL}/user`, {
    }).then((response) => {

      setUsers(response.data)
    }).catch((err) => console.log(err))
  }, [])

  const UpdateFollower = () => {
    axios.put(`${BaseURL}/user/updateUserByAdmin`, {
      username: user.username,
      email: user.email,
      verified: user.verified,
      followers: user.followers,
      communityClub: user.communityClub
    }).then(() => {
      alert(`Updated details of ${user.username}`)
      setShowEdit(!showEdit)
    })
  }

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div>
      {!user.username ? <h4 style={{ textAlign: 'center' }}>MegaHoot Admin Panel</h4> : null}
      {user.username && showEdit ?
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
                communityClub: user.communityClub
              })
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
                communityClub: user.communityClub
              })
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
                communityClub: user.communityClub
              })
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
                communityClub: user.communityClub
              })
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
                communityClub: e.target.value
              })
            }}
          />

          <button
            className="admin-btn"
            onClick={() => { UpdateFollower() }}>
            Update
          </button>

          <p>Note:Type <b>1</b> for Verified and <b>0</b> for not Verified</p>
        </div>
        :
        null
      }

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="admin-btn"
                  onClick={() => {
                    setUser(user);
                    setShowEdit(!showEdit);
                    topFunction()
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))
            :
            null
          }
        </tbody>
      </table>
    </div>
  )
}
