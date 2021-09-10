import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Avatar from 'react-avatar'
import toast from 'react-hot-toast';
import { useParams, useHistory } from 'react-router-dom'
import { HiBadgeCheck } from 'react-icons/hi'
import './editProfile.css'
import BeatLoader from "react-spinners/BeatLoader";

const EditProfile = ({
    userId,
    verified,
    name,
    userName,
    profilePic,
    website,
    bio,
    twitter,
    instagram,
    linkedIn,
    facebook,
    tiktok,
    snapchat,
    reddit,
    pinterest,
    medium,
    tumblr,
}) => {
    const { username } = useParams();
    const history = useHistory();

    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newProfilePic, setNewProfilePic] = useState([]);
    const [src, setSrc] = useState(null);

    const [newTwitter, setNewTwitter] = useState("");
    const [newInstagram, setNewInstagram] = useState("");
    const [newLinkedIn, setNewLinkedIn] = useState("");
    const [newFacebook, setNewFacebook] = useState("");
    const [newTikTok, setNewTikTok] = useState("");
    const [newSnapchat, setNewSnapchat] = useState("");
    const [newReddit, setNewReddit] = useState("");
    const [newPinterest, setNewPinterest] = useState("");
    const [newMedium, setNewMedium] = useState("");
    const [newTumblr, setNewTumblr] = useState("");


    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePath = `/profile/${username}`;
    const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;
    // const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);

    const handleFile = (event) => {
        const pic = event.target.files[0];
        setNewProfilePic(pic);
        setSrc(URL.createObjectURL(pic));
    }

    //getting user data
    useEffect(() => {
        setNewName(name);
        setNewUsername(userName);
        setNewWebsite(website);
        setNewBio(bio);

        setNewTwitter(twitter);
        setNewInstagram(instagram);
        setNewLinkedIn(linkedIn);
        setNewFacebook(facebook);
        setNewTikTok(tiktok);
        setNewSnapchat(snapchat);
        setNewReddit(reddit);
        setNewPinterest(pinterest);
        setNewMedium(medium);
        setNewTumblr(tumblr);
    }, [])

    const saveProfile = (event) => {
        setSaveLoading(true);

        event.preventDefault()

        const formData = new FormData();
        formData.append("newUserId", userId);
        formData.append("newName", newName);
        formData.append("newUsername", newUsername);
        formData.append("newWebsite", newWebsite);
        formData.append("newBio", newBio);
        formData.append("newTwitter", newTwitter);
        formData.append("newInstagram", newInstagram);
        formData.append("newLinkedIn", newLinkedIn);
        formData.append("newFacebook", newFacebook);
        formData.append("newTikTok", newTikTok);
        formData.append("newSnapchat", newSnapchat);
        formData.append("newReddit", newReddit);
        formData.append("newPinterest", newPinterest);
        formData.append("newMedium", newMedium);
        formData.append("newTumblr", newTumblr);
        (newProfilePic && formData.append("file", newProfilePic));

        const saveProfileData = async () => {
            await axios.put(`${BaseURL}/profile/edit`, formData)
                .then((response) => {
                    console.log(response);
                })
        }

        const saveProfileToast = saveProfileData();
        toast.promise(saveProfileToast, {
            loading: 'Saving...',
            success: 'Profile saved',
            error: 'Could not save',
        });

        setTimeout(() => {
            setSaveLoading(false);
            history.push(profilePath);
        }, 1000);
    }

    return (
        <div className="edit-body">
            <div className="edit-container">
                <div className="profile-picture">
                    <Avatar
                        size={160}
                        round={true}
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
                        <div className="profile-name-verification">
                            <h1>{name}</h1>
                            {verified === 1
                                ?
                                <div className="profile-verification-badge">
                                    <HiBadgeCheck />
                                </div>
                                : null
                            }
                        </div>
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
                        <small>
                            Link to a place on the internet where people can know more about you.
                        </small>
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Bio</div>
                    <div className="edit-item-info bio-area">
                        <textarea
                            maxLength="300"
                            type="text"
                            placeholder="Write a short bio to show on your profile"
                            value={newBio}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewBio(value);
                            }}
                        />
                        <div className="bio-count">
                            <span className={newBio.length > 250 && "text-danger"}>
                                {" "}
                                {newBio.length}/300
                            </span>
                        </div>
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter social-line">Link your social media accounts</div>
                    <div className="edit-item-info">
                        <small>
                            Add links to your social media accounts for people to get to know you better. This will be a part of your public profile on Soapbox.
                        </small>
                    </div>
                </div>

                {/* <hr className="social-hr" /> */}

                <div className="edit-item">
                    <div className="edit-parameter">Twitter</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Twitter account"
                            value={newTwitter}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewTwitter(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Instagram</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Instagram account"
                            value={newInstagram}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewInstagram(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">LinkedIn</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your LinkedIn account"
                            value={newLinkedIn}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewLinkedIn(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Facebook</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Facebook account"
                            value={newFacebook}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewFacebook(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">TikTok</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your TikTok account"
                            value={newTikTok}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewTikTok(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Snapchat</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Snapchat account"
                            value={newSnapchat}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewSnapchat(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Reddit</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Reddit account"
                            value={newReddit}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewReddit(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Pinterest</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Pinterest account"
                            value={newPinterest}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewPinterest(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Medium</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Medium account"
                            value={newMedium}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewMedium(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="edit-parameter">Tumblr</div>
                    <div className="edit-item-info">
                        <input
                            maxLength="100"
                            type="text"
                            placeholder="Enter link to your Tumblr account"
                            value={newTumblr}
                            onChange={(event) => {
                                const value = event.target.value;
                                setNewTumblr(value);
                            }}
                        />
                    </div>
                </div>

                <div className="edit-item">
                    <div className="btn-edit">
                        <button
                            className="btn-edit-save"
                            onClick={saveProfile}
                            disabled={!newName || !newUsername}
                        >
                            {saveLoading
                                ?
                                <BeatLoader color={"#fff"} size={5} />
                                :
                                "Save"
                            }
                        </button>
                        <button
                            className="btn-edit-cancel"
                            onClick={() => history.push(profilePath)}
                            disabled={!newName || !newUsername}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
