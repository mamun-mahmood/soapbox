import React, { useState, useEffect, Fragment } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Avatar from 'react-avatar';
import Post from '../components/Post'
import ScrollToTop from '../components/Feed/ScrollToTop'
import { HiBadgeCheck } from 'react-icons/hi'
import { FiTwitter } from 'react-icons/fi'
import { RiFacebookCircleLine, RiSnapchatLine, RiPinterestLine } from 'react-icons/ri'
import { SiTiktok } from 'react-icons/si'
import { FaTumblr } from 'react-icons/fa'
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineReddit, AiOutlineMedium } from 'react-icons/ai'
import BeatLoader from "react-spinners/BeatLoader";
import HootOutside from './HootOutside/HootOutside';

const Profile = ({
    verified,
    userName,
    name,
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
    const [myUploads, setMyUploads] = useState([]);
    const [loading, setLoading] = useState(true);

    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

    useEffect(() => {
        const getUserUploadData = async () => {
            await axios.get(`${BaseURL}/upload/user/${username}`)
                .then((response) => {
                    setMyUploads(response.data);
                });
            setLoading(false);
        }
        setTimeout(() => {
            getUserUploadData();
        }, 0);
    }, [])

    var totalViews = 0;
    var totalLikes = 0;

    myUploads.map((upload) => {
        totalViews += upload.views
        totalLikes += upload.likes
    })

    // count will be formatted 
    const formatCount = count => {
        if (count < 1e3) return count;
        if (count >= 1e3 && count < 1e6) return +(count / 1e3).toFixed(1);
        if (count >= 1e6 && count < 1e9) return +(count / 1e6).toFixed(1);
        if (count >= 1e9 && count < 1e12) return +(count / 1e9).toFixed(1);
        if (count >= 1e12) return +(count / 1e12).toFixed(1);
    };

    // si stands for International System of Units
    const formatSi = count => {
        if (count < 1e3) return "";
        if (count >= 1e3 && count < 1e6) return "K";
        if (count >= 1e6 && count < 1e9) return "M";
        if (count >= 1e9 && count < 1e12) return "B";
        if (count >= 1e12) return "T";
    };

    return (
        <Fragment>

            {loading &&
                <div className="loading-iv">
                    <BeatLoader color={"#8249A0"} size={20} />
                </div>
            }

            {!loading &&
                <div className="profile-page">
                    <div className="profile-container">
                        <div className="profile-picture">
                            <Avatar
                                size={160}
                                round={true}
                                name={name}
                                src={profilePicPath}
                            />
                        </div>
                        {/* <img className="profile-picture" src="/images/default_user_profile.svg" alt="profile" /> */}
                        <div className="user-info">
                            <div className="display-name">
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
                            <div className="user-name-page">@{username}</div>
                            <div className="user-counts">
                                {/* <div><span className="counts-bold">{myUploads.length}</span> hoots</div> */}
                                <div><span className="counts-bold">0</span> Followers</div>
                                <div><span className="counts-bold">{formatCount(totalViews) + formatSi(totalViews)}</span> Views</div>
                                <div><span className="counts-bold">{formatCount(totalLikes) + formatSi(totalLikes)}</span> Likes</div>
                                {/* <div><span className="counts-bold">0</span> following</div> */}
                            </div>

                            {bio &&
                                <div className="user-desc">
                                    {bio}
                                </div>
                            }

                            {website &&
                                <a
                                    href={!website.includes("https://") ? ("https://" + website) : website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-website"
                                >
                                    {website.includes("https://") ? website.slice(8) : website}
                                </a>
                            }

                            <div className="social-profile-icon-links">
                                {twitter &&
                                    <a href={!twitter.includes("https://") ? ("https://" + twitter) : twitter} target="_blank" rel="noopener noreferrer" >
                                        <FiTwitter className="social-profile-icon s-twitter" />
                                    </a>
                                }
                                {instagram &&
                                    <a href={!instagram.includes("https://") ? ("https://" + instagram) : instagram} target="_blank" rel="noopener noreferrer" >
                                        <AiOutlineInstagram className="social-profile-icon s-instagram" />
                                    </a>
                                }
                                {linkedIn &&
                                    <a href={!linkedIn.includes("https://") ? ("https://" + linkedIn) : linkedIn} target="_blank" rel="noopener noreferrer" >
                                        <AiOutlineLinkedin className="social-profile-icon s-linkedin" />
                                    </a>
                                }
                                {facebook &&
                                    <a href={!facebook.includes("https://") ? ("https://" + facebook) : facebook} target="_blank" rel="noopener noreferrer">
                                        <RiFacebookCircleLine className="social-profile-icon s-facebook" />
                                    </a>
                                }
                                {tiktok &&
                                    <a href={!tiktok.includes("https://") ? ("https://" + tiktok) : tiktok} target="_blank" rel="noopener noreferrer" >
                                        <SiTiktok className="social-profile-icon s-tiktok" />
                                    </a>
                                }
                                {snapchat &&
                                    <a href={!snapchat.includes("https://") ? ("https://" + snapchat) : snapchat} target="_blank" rel="noopener noreferrer" >
                                        <RiSnapchatLine className="social-profile-icon s-snapchat" />
                                    </a>
                                }
                                {reddit &&
                                    <a href={!reddit.includes("https://") ? ("https://" + reddit) : reddit} target="_blank" rel="noopener noreferrer" >
                                        <AiOutlineReddit className="social-profile-icon s-reddit" />
                                    </a>
                                }
                                {pinterest &&
                                    <a href={!pinterest.includes("https://") ? ("https://" + pinterest) : pinterest} target="_blank" rel="noopener noreferrer" >
                                        <RiPinterestLine className="social-profile-icon s-pinterest" />
                                    </a>
                                }
                                {medium &&
                                    <a href={!medium.includes("https://") ? ("https://" + medium) : medium} target="_blank" rel="noopener noreferrer" >
                                        <AiOutlineMedium className="social-profile-icon s-medium" />
                                    </a>
                                }
                                {tumblr &&
                                    <a href={!tumblr.includes("https://") ? ("https://" + tumblr) : tumblr} target="_blank" rel="noopener noreferrer" >
                                        <FaTumblr className="social-profile-icon s-tumblr" />
                                    </a>
                                }
                            </div>

                            <button className="btn-edit-profile">
                                <Link to={`/edit/profile/${username}`}>
                                    Edit Profile
                                </Link>
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="pt-2">
                        {myUploads.length === 0 &&
                            <div className="no-hoots">
                                <p>No hoots yet!</p>
                                <div className="profile-hoot">
                                    <Link to="/create">
                                        Create Hoot
                                    </Link>
                                </div>
                            </div>
                        }

                        {loading &&
                            <div className="loading">
                                <BeatLoader color={"#8249A0"} size={20} />
                            </div>
                        }
                        {/* {!loading &&
                            myUploads.map((upload) => {
                                return (
                                    <div key={upload.id}>
                                        <Post
                                            hootId={upload.id}
                                            username={upload.authorUsername}
                                            mimeType={upload.mimeType}
                                            views={upload.views}
                                            hootImgId={upload.image}
                                            likes={upload.likes}
                                            views={upload.views}
                                            caption={upload.caption}
                                            timeStamp={upload.timeStamp}
                                            edited={upload.edited}
                                            editedTimeStamp={upload.editedTimeStamp}
                                        />
                                    </div>
                                )
                            }).reverse()
                        } */}

                        <div className="hoot-profile-layout">
                            {!loading &&
                                myUploads.map((upload) => {
                                    return (
                                        <div key={upload.id}>
                                            <HootOutside
                                                hootId={upload.id}
                                                username={upload.authorUsername}
                                                mimeType={upload.mimeType}
                                                hootImgId={upload.image}
                                            />
                                        </div>
                                    )
                                }).reverse()}
                        </div>

                        {/* {myUploads.length > 3 && <ScrollToTop />} */}

                    </div>
                </div>
            }

        </Fragment>
    )
}

export default Profile