import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Avatar from 'react-avatar';
import { formatCount, formatSi } from '../Helpers/formatNumbers'
import { Link, useParams, useHistory } from 'react-router-dom'
import { HiBadgeCheck } from 'react-icons/hi'
import { FiPlayCircle, FiTwitter } from 'react-icons/fi'
import { RiFacebookCircleLine, RiSnapchatLine, RiPinterestLine } from 'react-icons/ri'
import { SiTiktok } from 'react-icons/si'
import { FaTumblr } from 'react-icons/fa'
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineReddit, AiOutlineMedium } from 'react-icons/ai'
import BeatLoader from "react-spinners/BeatLoader";
import HootOutside from './HootOutside/HootOutside';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollLoader from './Feed/InfiniteScrollLoader';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import ReactPlayer from 'react-player';
const PublicProfile = ({
    verified,
    privateChannel,
    followers,
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
    const [users, setUsers] = useState([]);
    const [allUserUploads, setAllUserUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const [followed, setFollowed] = useState(false);
    const [userFollowers, setUserFollowers] = useState([]);
    const [followersCount, setFollowersCount] = useState(followers);
    const history = useHistory();


    const LIMIT = 9;

    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePicPath = `${BaseURL}/profile-pictures/${profilePic}`;

    const { username } = useParams();

    // follow functionality added to hoots.
    useEffect(() => {
        axios.put(`${BaseURL}/user/followers`, {
            followers: followersCount,
            username: userName
        })
    }, [followersCount])

    const getUserFollowData = async () => {
        axios.get(`${BaseURL}/user/followers/${userName}`)
            .then((response) => {
                setUserFollowers(response.data);
            })
    }

    useEffect(async () => {
        await getUserFollowData();
    }, [followed])

    // converting array of object to normal array
    const userFollowersArr = userFollowers.map((user) => {
        return (
            user.followedBy
        )
    })

    const addFollower = async () => {
        await getUserFollowData();

        if (userInformation) {
            setFollowed(true)
            setFollowersCount(followersCount + 1)

            axios.post(`${BaseURL}/user/followedBy`, {
                username: userName,
                loggedInUsername: userInformation.username
            })
        }

        if (userInformation) {
            toast.success(`Followed ${userName}`);
        } else {
            toast.error('Please login to Follow');
        }
    }

    const removeFollower = async () => {
        await getUserFollowData();
        setFollowed(false)
        setFollowersCount(followersCount - 1)

        if (userInformation) {
            axios.post(`${BaseURL}/user/followedBy/delete`, {
                username: userName,
                loggedInUsername: userInformation.username
            })
        }

        toast.success(`Unfollowed ${userName}`);
    }

    const random = (min = 10, max = 50) => {
        let num = Math.random() * (max - min) + min;

        return Math.round(num);
    };

    // on every page load followers will increase reandomly - just remove this useEffect to get back to normal followers counts
    useEffect(() => {
        if (followers === 0) {
            setTimeout(() => {
                setFollowersCount(followersCount + random(1, 20));
            }, 30000);
        } else {
            setFollowersCount(followersCount + random(1, 20));
        }

        // to make followers count 0 
        // followersCount(0)
    }, [])

    useEffect(() => {
        const getUserUploadData = async () => {
            await axios.all[(
                axios.get(`${BaseURL}/upload/user/public/p/${username}?page=1&limit=${LIMIT}`)
                    .then((response) => {
                        setUsers(response.data.results);
                    }),
                axios.get(`${BaseURL}/upload/user/${username}`)
                    .then((response) => {
                        setAllUserUploads(response.data);
                    })
            )]
            setLoading(false);
        }
        getUserUploadData();

    }, [username])

    const fetchProfileHoots = async () => {
        await axios.get(`${BaseURL}/upload/user/public/p/${username}?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const hootsFromServer = response.data.results;

                setUsers([...users, ...hootsFromServer]);

                if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    }

    var totalViews = 0;
    var totalLikes = 0;

    allUserUploads.map((user) => {
        totalViews += user.views
        totalLikes += user.likes
    })

    return (
        <Fragment>
            {loading &&
                <div className="loading-iv">
                    <BeatLoader color={"#8249A0"} size={20} />
                </div>
            }

            {!loading &&
                <div className="public-profile-page">
                    <div className="new-profile">
                        <div className="profile-container">
                            <div className="profile-picture" onDragStart={(e) => e.preventDefault()}>
                                <Avatar
                                    size={160}
                                    round={true}
                                    name={name}
                                    src={profilePicPath}
                                />
                            </div>

                            <ReactTooltip />

                            <div className="user-info">
                                <div className="display-name">
                                    <div className="profile-name-verification">
                                        <h1 style={{fontSize:'14px'}}>{name}</h1>
                                        {verified === 1
                                            ?
                                            <div className="profile-verification-badge">
                                                <HiBadgeCheck data-tip="Verified account" data-text-color="#8249A0" data-background-color="#D9D2FA" />
                                            </div>
                                            : null
                                        }
                                    </div>
                                </div>

                                <div className="user-name-page" style={{fontSize:'14px'}}>@{username}</div>

                                <div className="user-follow">
                                    {userInformation ?
                                        userFollowers.length === 0
                                            ? <button
                                                className="btn-follow"
                                                onClick={addFollower}
                                            >
                                                {followed
                                                    ? "Following"
                                                    : "Follow"
                                                }
                                            </button>
                                            :
                                            userFollowersArr.some(user => (userInformation && userInformation.username).includes(user))
                                                ?
                                                <button
                                                    className="btn-follow"
                                                    onClick={removeFollower}
                                                >
                                                    Following
                                                </button>
                                                :
                                                <button
                                                    className="btn-follow"
                                                    onClick={followed ? removeFollower : addFollower}
                                                >
                                                    {followed
                                                        ? "Following"
                                                        : "Follow"
                                                    }
                                                </button>
                                        :
                                        <button
                                            className="btn-follow"
                                            onClick={addFollower}
                                        >
                                            {followed
                                                ? "Following"
                                                : "Follow"
                                            }
                                        </button>
                                    }
                                </div>

                                {privateChannel ?
                                    <button className="public-btn-add-private-c">
                                        <Link to={`/${uuidv4()}/private/Club/${username}/${uuidv4()}`}>
                                            Go to My Club
                                        </Link>
                                    </button>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="profile-links">
                            <div className="user-counts">
                                <div className="counts-stack"><span className="counts-bold">{formatCount(followersCount) + formatSi(followersCount)} Followers</span> </div>
                                <div className="counts-stack"><span className="counts-bold">{formatCount(totalViews) + formatSi(totalViews)} Views</span> </div>
                                <div className="counts-stack"><span className="counts-bold">{formatCount(totalLikes) + formatSi(totalLikes)} Likes</span> </div>
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

                        </div>
                    </div>

                    <hr />

                    <div className="pt-2">
                        {users.length === 0 &&
                            <div className="no-hoots">
                                <p>No hoots yet!</p>
                            </div>
                        }

                        {loading &&
                            <div className="loading">
                                <BeatLoader color={"#8249A0"} size={20} />
                            </div>
                        }

                        {/* no need to reverse the list as it is getting reversed from the server itself  */}
                        {!loading &&
                            users.length > 0 &&
                            <InfiniteScroll
                                dataLength={users.length}
                                next={fetchProfileHoots}
                                hasMore={hasMore}
                                loader={users.length > 10 && <InfiniteScrollLoader />}
                            >
                                <div className="hoot-profile-layout">
                                    {users.map((user) => {
                                        return (
                                            <div key={user.id}>
                                                {!user.mimeType
                                                    ?
                                                    <div className="img-container">
                                                        <div
                                                            className="hoot-img-vertical-profile"
                                                            style={{ animation: "none", backgroundColor: "#d9d1f8" }}
                                                            onContextMenu={(e) => e.preventDefault()}
                                                            onClick={() => { history.push(`/${username}/hoot/${btoa(user.id)}/${uuidv4()}`) }}
                                                        >
                                                            {ReactPlayer.canPlay(user.link) &&
                                                                user.link.endsWith('.mp4') || user.link.endsWith('.mkv') || user.link.endsWith('.mov') || user.link.endsWith('.ogv') || user.link.endsWith('webm') || user.link.endsWith('.mpg')
                                                                ?
                                                                <div className="vdo-container">
                                                                    <video
                                                                        muted
                                                                        disablePictureInPicture
                                                                        className="hoot-vdo-profile"
                                                                        style={{ margin: "0" }}
                                                                        onMouseOver={event => event.target.play()}
                                                                        onMouseOut={event => event.target.pause()}
                                                                        onDragStart={(e) => e.preventDefault()}
                                                                    >
                                                                        <source
                                                                            src={user.link}
                                                                        />
                                                                        Your browser does not support HTML video.
                                                                    </video>
                                                                </div>
                                                                :
                                                                user.link.endsWith('.mp3') || user.link.endsWith('.ogg') || user.link.endsWith('.wav') || user.link.endsWith('.flac') || user.link.endsWith('.aac') || user.link.endsWith('.alac') || user.link.endsWith('.dsd')
                                                                    ?
                                                                    <div className="vdo-container">
                                                                        <video
                                                                            muted
                                                                            poster={`${BaseURL}/profile-pictures/${profilePic}`}
                                                                            className="hoot-vdo-profile"
                                                                            style={{ margin: "0" }}
                                                                            onDragStart={(e) => e.preventDefault()}
                                                                        >
                                                                            <source
                                                                                src={user.link}
                                                                            />
                                                                            Your browser does not support HTML video.
                                                                        </video>
                                                                    </div>
                                                                    :
                                                                    ReactPlayer.canPlay(user.link) &&
                                                                    <div className='player-profile-wrapper'>
                                                                        <ReactPlayer
                                                                            url={user.link}
                                                                            className='react-player'
                                                                            controls="true"
                                                                            width={user.mimeType ? '97%' : '100%'}
                                                                            height='100%'
                                                                            light={true}
                                                                        />
                                                                    </div>
                                                            }
                                                        </div>
                                                        <FiPlayCircle
                                                            className="GIF-overlay"
                                                            style={{ borderRadius: "50%" }}
                                                            onClick={() => { history.push(`/${username}/hoot/${btoa(user.id)}/${uuidv4()}`) }}
                                                        />
                                                    </div>
                                                    :
                                                    <HootOutside
                                                        hootId={user.id}
                                                        username={user.authorUsername}
                                                        mimeType={user.mimeType}
                                                        hootImgId={user.image}
                                                        audioPoster={user.audioPoster}
                                                        profilePicPath={profilePicPath}
                                                    />
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </InfiniteScroll>
                        }
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default PublicProfile