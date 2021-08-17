import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Avatar from 'react-avatar'
import { Helmet } from 'react-helmet'
import { useParams, useHistory } from 'react-router-dom'
import './editProfile.css'

const EditProfile = ({
    userId,
    name,
    userName,
    profilePic,
    website,
    bio,
}) => {
    const { username } = useParams();
    const history = useHistory();

    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newProfilePic, setNewProfilePic] = useState([]);
    const [src, setSrc] = useState(null);
    const [userInfo, setUserInfo] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

    const handleFile = (event) => {
        const pic = event.target.files[0];
        setNewProfilePic(pic);

        // (pic && setMimeType(pic.type));
        setSrc(URL.createObjectURL(pic));
    }

    //getting user data
    useEffect(() => {
        axios.get(`${BaseURL}/user/${username}`)
            .then((response) => {
                setUserInfo(response.data);
            });

        setNewName(name);
        setNewUsername(userName);
        setNewWebsite(website);
        setNewBio(bio);
    }, [])

    var newUserId = "";
    userInfo.map((user) => {
        newUserId = user.id
        console.log(newUserId);
    })

    const saveProfile = (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("newUserId", newUserId);
        formData.append("newName", newName);
        formData.append("newUsername", newUsername);
        formData.append("newWebsite", newWebsite);
        formData.append("newBio", newBio);
        (newProfilePic && formData.append("file", newProfilePic));

        axios.put(`${BaseURL}/profile/edit`, formData)
            .then((response) => {
                console.log(response);

                const profilePath = `/profile/${username}`;
                history.push(profilePath);
            })

        console.log("Name: ", newName);
        console.log("Username: ", newUsername);
        console.log("Website: ", newWebsite);
        console.log("Bio: ", newBio);
    }

    return (
        <Fragment>
            <div className="edit-body">
                <div className="edit-container">
                    <div className="profile-picture">
                        <Avatar
                            size={160}
                            round={true}
                            // here instead username display name will come
                            name={name}
                            src={src ? src : profilePicPath}
                        />
                    </div>
                    {/* <img className="profile-picture" src="/images/default_user_profile.svg" alt="profile" /> */}

                    <form action="">
                        <label htmlFor="edit-image" className="edit-profile-picture">change photo</label>
                        <input
                            type="file"
                            id="edit-image"
                            name="photo"
                            accept="image/*"
                            onChange={handleFile}
                            hidden
                        />
                    </form>
                    <div className="user-info">
                        <div className="edit-display-name">
                            {/* here instead username display name will come */}
                            <h1>{name}</h1>
                        </div>
                    </div>
                </div>

                <hr className="edit-hr" />

                <div className="edit-contents">
                    <div className="edit-item">
                        <div className="edit-parameter">Name</div>
                        <div className="edit-item-info">
                            <input
                                maxLength="50"
                                type="text"
                                placeholder="Name"
                                value={newName}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setNewName(value);
                                }}
                            />
                            <small>
                                This could be your first name, full name, nickname or a business name,
                                it's how you'll appear on Soapbox.
                            </small>
                        </div>
                    </div>

                    <div className="edit-item">
                        <div className="edit-parameter">Username</div>
                        <div className="edit-item-info">
                            <input
                                maxLength="50"
                                type="text"
                                placeholder="Username"
                                value={newUsername}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setNewUsername(value);
                                }}
                                disabled
                            />
                            <small>
                                This is what identifies you as a Creator on Soapbox.
                            </small>
                        </div>
                    </div>

                    <div className="edit-item">
                        <div className="edit-parameter">Website</div>
                        <div className="edit-item-info">
                            <input
                                maxLength="100"
                                type="text"
                                placeholder="Website"
                                value={newWebsite}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setNewWebsite(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="edit-item">
                        <div className="edit-parameter">Bio</div>
                        <div className="edit-item-info">
                            <textarea
                                maxLength="300"
                                type="text"
                                value={newBio}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setNewBio(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="edit-item">
                        <button
                            onClick={saveProfile}
                            disabled={!newName || !newUsername}
                        >
                            Save
                        </button>
                    </div>
                </div>

            </div>
            <Helmet>
                <title>Edit Profile / MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
            </Helmet>
        </Fragment >
    )
}

export default EditProfile
