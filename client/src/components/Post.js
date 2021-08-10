import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet";
import format from "date-fns/format"
import ClickAwayListener from 'react-click-away-listener';
import MediaContent from './MediaContent';
import HootComments from './Comment/HootComments';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { BiDotsHorizontalRounded, BiComment, BiBookmark } from 'react-icons/bi'
import { FiTwitter, FiShare2, FiRepeat, FiMail, FiMessageSquare, FiEye } from 'react-icons/fi'
import { FaHeart, FaRegHeart, FaTumblr } from 'react-icons/fa'
import { RiFacebookCircleLine } from 'react-icons/ri'
import { IoCloseOutline } from 'react-icons/io5'
import { ImReddit, ImPinterest2 } from 'react-icons/im'
import { AiOutlineLinkedin } from 'react-icons/ai'

const Post = ({
    hootId,
    avatar,
    username,
    mimeType,
    hootImgId,
    likes,
    views,
    caption,
    timeStamp,
    edited,
    editedTimeStamp
}) => {
    const BaseURL = process.env.REACT_APP_API_URL;

    // main website name
    const hostURL = "https://www.megahoot.net";

    // images from server
    const filePath = `${BaseURL}/images/${hootImgId}`;

    // main server url
    const serverURL = "https://soapboxapi.megahoot.net"

    // url for individual hoot for main soapbox website
    const shareBaseUrl = `${hostURL}/${username}/hoot/${hootId}`;

    // encoded share url for individual hoot to be shared on other social media
    const shareUrl = encodeURIComponent(shareBaseUrl);
    const shareCaption = encodeURIComponent(`${caption.length > 10 ? caption.substring(0, 70) : caption} @${username}`);
    const shareHashtags = encodeURIComponent("");
    // const shareHashtags = encodeURIComponent("megahoot,soapbox");

    const twitterShare = `http://twitter.com/share?text=${shareCaption}&url=${shareUrl}&hashtags=${shareHashtags}`;
    const mailShare = `mailto:?subject="Hoot from MegaHoot Soapbox"&body=${shareCaption}%20Checkout more at ${shareUrl}`;
    const facebookShare = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
    const redditShare = `https://reddit.com/submit?url=${shareUrl}&title=${shareCaption}`;

    // image is must to share something on pinterest.
    const pinterestShare = `https://pinterest.com/pin/create/bookmarklet/?media=${filePath}&url=${shareUrl}&description=jio`
    const linkedInShare = `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareCaption}`
    const tumblrShare = `https://www.tumblr.com/share/link?url=${shareUrl}&tags=${shareHashtags}&description=${shareCaption}`

    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [editCaption, setEditCaption] = useState("");
    const [isEdited, setIsEdited] = useState(edited);
    const [liked, setLiked] = useState(false);
    const [likesCount, setlikesCount] = useState(likes)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const history = useHistory();
    const location = useLocation();

    // timeStamp can be implemented at server-side...
    const date = new Date();
    const eTimeStamp = format(date, 'LLL dd, yyyy • HH:mm');

    const setLikesCount = (e) => {
        setlikesCount(likesCount + 1);
    }

    const random = (min = 10, max = 50) => {
        let num = Math.random() * (max - min) + min;

        return Math.round(num);
    };

    // on every page load likes will increase reandomly - just remove this useEffect to get back to normal view counts
    useEffect(() => {
        setlikesCount(likesCount + random(1, 50));

        // to make likes count 0 
        // setlikesCount(0)
    }, [])

    // like functionality added to hoots.
    useEffect(() => {
        axios.put(`${BaseURL}/upload/likes`, {
            likes: likesCount,
            image: hootImgId
        }).then((response) => {
            // console.log(response.data.likes);
        })
    }, [likesCount])

    // add username as loggedIn username...
    // const commentPlaceHolder = `Comment as ${username}`;

    //getting all comments
    useEffect(() => {
        axios.get(`${BaseURL}/comment/${hootId}`)
            .then((response) => {
                setComments(response.data);
            });
    }, [])

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    const path = (userInfo.username === username ? `/profile/${username}` : `/user/${username}`);
    const profilePath = `/profile/${username}`

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
        setIsMoreModalOpen(false);
    }

    const openEditModal = () => {
        setIsEditModalOpen(true);
        setIsMoreModalOpen(false);
    }

    const deleteHoot = () => {
        setIsMoreModalOpen(false);
        axios.delete(`${BaseURL}/upload/delete/${hootImgId}`, {
            username: userInfo.username,
        });
        window.location.reload();
        console.log("Hoot Deleted...");
    }

    const editHoot = () => {
        axios.put(`${BaseURL}/upload/edit`, {
            editCaption: editCaption,
            hootImgId: hootImgId,
            edited: 1,
            editedTimeStamp: eTimeStamp,
        });

        window.location.reload();
        console.log("Caption Edited:", isEdited);
    }

    const addComment = () => {
        axios.post(`${BaseURL}/comment/`, {
            username: userInfo.username,
            commentBody: newComment,
            hootId: hootId
        }).then((response) => {
            setNewComment("");

            const addNewComment = {
                username: userInfo.username,
                commentBody: newComment
            }
            setComments([...comments, addNewComment])
            console.log("comment added");
        })
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareBaseUrl);
        setTimeout(() => {
            setIsMoreModalOpen(false)
        }, 100);
    }

    const openComments = () => {
        setIsCommentModalOpen(true)
    }

    const [hoverInfo, setHoverInfo] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${BaseURL}/user/profile/${username}`).then((response) => {
            setUsers(response.data);
        });
    }, [])

    return (
        <div className="home">
            <div className="home-container">
                <div className="post-heading">
                    <div
                        onMouseEnter={() => setHoverInfo(true)}
                        onMouseLeave={() => setHoverInfo(false)}
                        className="avatar_name"
                    >
                        <Link to={path}>
                            <img class="avatar" src={avatar} alt="avatar" />
                        </Link>
                        <Link to={path}>
                            <div className="name">{username}</div>
                        </Link>
                        <div className="at-name">@{username}</div>
                    </div>

                    {hoverInfo &&
                        <div
                            onMouseEnter={() => setHoverInfo(true)}
                            onMouseLeave={() => setHoverInfo(false)}
                            className="hover-info"
                        >
                            <div className="hover-user-follow">
                                <Link to={path}>
                                    <img class="hover-avatar" src={avatar} alt="avatar" />
                                </Link>
                                <button className="hover-btn-hoot-follow">Follow</button>
                            </div>

                            <div className="hoot-user-info">
                                <div className="hoot-username">
                                    <Link to={path}>
                                        <div className="name">{username}</div>
                                    </Link>
                                    <div className="hover-at-name">@{username}</div>
                                </div>
                                <div className="user-hoot-count">
                                    <span className="hoot-counts">{users.length}</span>
                                    hoots
                                </div>
                            </div>
                        </div>
                    }

                    <div className="user-actions">
                        <button className="btn-hoot-follow">Follow</button>
                        <div
                            className="more"
                            onMouseEnter={() => setIsMoreModalOpen(true)}
                            onMouseLeave={() => setIsMoreModalOpen(false)}
                        >
                            <BiDotsHorizontalRounded
                                className="more-icon"
                                onClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
                            />
                        </div>
                    </div>

                    {/* More Option Modal */}
                    {isMoreModalOpen &&
                        <Fragment>
                            <ClickAwayListener onClickAway={() => { setIsMoreModalOpen(false) }}>
                                <div
                                    className="more-modal"
                                    onMouseEnter={() => setIsMoreModalOpen(true)}
                                    onMouseLeave={() => setIsMoreModalOpen(false)}
                                >
                                    {username === userInfo.username &&
                                        <div className="more-options">
                                            <span onClick={openDeleteModal}> Delete</span>
                                            <span onClick={openEditModal}>Edit</span>
                                            <span onClick={copyToClipboard}>Copy Link</span>
                                            <span onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}>Go to Hoot</span>
                                            {/* <span onClick={() => { setTimeout(() => { setIsMoreModalOpen(false) }, 500) }}>Report Hoot</span> */}
                                        </div>
                                    }

                                    {username === userInfo.username ||
                                        <div className="more-options">
                                            <span onClick={copyToClipboard}>Copy Link</span>
                                            <span onClick={() => { history.push(`/${username}/hoot/${hootId}`) }}>Go to Hoot</span>
                                            {/* <span onClick={() => { setTimeout(() => { setIsMoreModalOpen(false) }, 500) }}>Report Hoot</span> */}
                                        </div>
                                    }
                                    {/* <IoCloseOutline className="close-modal" onClick={() => setIsMoreModalOpen(false)} /> */}
                                </div>
                            </ClickAwayListener>
                        </Fragment>
                    }

                    {/* Edit Modal */}
                    {isEditModalOpen &&
                        <Fragment>
                            <div className="modal-overlay"></div>
                            <ClickAwayListener onClickAway={() => { setIsEditModalOpen(false) }}>
                                <div className="outer-div">
                                    <div className="edit-modal">
                                        {/* edit username  */}
                                        <h5>You are editing hoot as
                                            <span className="user-edit">
                                                {" "}@
                                                <Link
                                                    to={profilePath}
                                                    className="name-comment">
                                                    {username}
                                                </Link>
                                            </span>,
                                        </h5>
                                        <div className="edit-content">
                                            {/* left side image */}
                                            <div className="post-media">
                                                <MediaContent mimeType={mimeType} filePath={filePath} editOpen={isEditModalOpen} />
                                            </div>
                                            {/* right side edit box */}
                                            <div className="edit-caption d-flex flex-wrap">
                                                <div className="edit-profile-username">
                                                    <img className="avatar" src={avatar} alt="avatar" />
                                                    <div className="name avatar_name">{userInfo && userInfo.username}</div>
                                                </div>
                                                <div className="post-content">
                                                    <textarea
                                                        autoFocus
                                                        maxLength="255"
                                                        className="editarea-style"
                                                        placeholder="What to edit?"
                                                        value={editCaption}
                                                        onChange={(event) => {
                                                            setEditCaption(event.target.value);
                                                        }}
                                                    ></textarea>
                                                    <div className="d-flex justify-content-between m-1 btn-caption-top">
                                                        <div className="caption-count">
                                                            <h6 className={editCaption.length > 220 && "text-danger"}>
                                                                {" "}
                                                                {editCaption.length}/255
                                                            </h6>
                                                        </div>
                                                        <div className="btn-post my-2">
                                                            <Button
                                                                variant="primary mx-1"
                                                                className="btn-edit-hoot"
                                                                onClick={editHoot}
                                                                disabled={!editCaption}
                                                            >
                                                                Edit
                                                            </Button>{' '}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <IoCloseOutline className="close-modal" onClick={() => setIsEditModalOpen(false)} />
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Fragment>
                    }

                    {/* Delete Modal */}
                    {isDeleteModalOpen &&
                        <Fragment>
                            <div className="modal-overlay"></div>
                            <ClickAwayListener onClickAway={() => { setIsDeleteModalOpen(false) }}>
                                <div className="delete-modal">
                                    <h4>Delete Hoot</h4>
                                    <div className="delete-info">Are you sure you want to delete this hoot? This can’t be undone and it will be removed from your profile and from Soapbox search results.</div>
                                    <div className="btn-post mt-3 delete-info">
                                        <Button
                                            variant="primary mx-1"
                                            className="btn-login"
                                            onClick={deleteHoot}
                                        >
                                            Delete
                                        </Button>{' '}
                                    </div>
                                    <IoCloseOutline className="close-modal" onClick={() => setIsDeleteModalOpen(false)} />
                                </div>
                            </ClickAwayListener>
                        </Fragment>
                    }

                    {/* Comment Modal */}
                    {isCommentModalOpen &&
                        <Fragment>
                            <div className="modal-overlay"></div>
                            <ClickAwayListener onClickAway={() => { setIsCommentModalOpen(false) }}>
                                <div className="hoot-comment-modal">
                                    <h4>{comments.length > 0 && comments.length} Comments,</h4>
                                    {/* Comment Box */}
                                    <div className="comment-box">
                                        <input
                                            className="comment-input"
                                            type="text"
                                            maxLength="290"
                                            value={newComment}
                                            placeholder="Add a comment"
                                            onChange={(event) => {
                                                setNewComment(event.target.value);
                                            }} />
                                        <button
                                            className="add-comment"
                                            onClick={addComment}
                                            disabled={!newComment}
                                        >
                                            hoot
                                        </button>
                                    </div>

                                    {/* comments list */}
                                    {/* comments based on location */}
                                    {/* {(location.pathname).match(/hoot/gi) == "hoot" ?
                                    comments.length > 0 && <HootComments comments={comments} sliceValue={0} />
                                    :
                                    comments.length > 0 && <HootComments comments={comments} sliceValue={-2} />
                                } */}

                                    {/* all comments */}
                                    <div className="commets-scroll">
                                        {comments.length > 0 && <HootComments comments={comments} sliceValue={0} />}
                                    </div>

                                    <IoCloseOutline className="close-modal" onClick={() => setIsCommentModalOpen(false)} />
                                </div>
                            </ClickAwayListener>
                        </Fragment>
                    }
                </div>

                <div className="post-comment">
                    {/* <Link className="name-comment">
                        <span onClick={() => { history.push(`${ path } / ${ username }`) }}
                        >
                            {username}
                        </span>
                    </Link> */}
                    {" "}<span className="hoot-comment">{caption}</span>
                </div>
                {/* <hr className="mx-1" /> */}
                <div className="right-icons">
                    {/* <div className="post-media"> */}
                    <MediaContent
                        mimeType={mimeType}
                        filePath={filePath}
                        views={views}
                        image={hootImgId}
                    />
                    {/* </div> */}
                    <div className="post-icons">
                        {/* <div className="grp-1"> */}
                        <div className="like-count">
                            <div className="like">
                                {liked ? <FaHeart
                                    className="hoot-likes-fill"
                                    onClick={e => { setLiked(false), setlikesCount(likesCount - 1) }
                                    }
                                /> : <FaRegHeart
                                    className="hoot-likes-border"
                                    onClick={e => { setLiked(true), setlikesCount(likesCount + 1) }
                                    }
                                />}
                            </div>
                            <div className="like-count">{likesCount}</div>
                        </div>
                        <div className="comment-count">
                            <div className="comment">
                                <FiMessageSquare
                                    className="cursor-pointer"
                                    onClick={openComments}
                                />
                                <div className="comment-count">{comments.length}</div>
                            </div>
                        </div>
                        <div className="view-count">
                            <div className="view">
                                <FiEye className="cursor-pointer" />
                            </div>
                            <div className="view-count">{views}</div>
                        </div>

                        <div className="share">
                            <FiShare2
                                onMouseEnter={() => setIsShareModalOpen(true)}
                                onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Share Modal with Social Media Icons */}
                        {isShareModalOpen &&
                            <Fragment>
                                <div className="modal-overlay"></div>
                                <ClickAwayListener onClickAway={() => { setIsShareModalOpen(false) }}>
                                    <div
                                        className="share-modal"
                                        onMouseLeave={() => setIsShareModalOpen(false)}
                                    >
                                        <div className="text-center">
                                            <span className="share-hoot-to share-head">Share Hoot to...</span>
                                        </div>
                                        <div className="share-flex-icons">
                                            {/* <SocialShare share={twitterShare} Icon={FiTwitter} name="Twitter" />
                                        <SocialShare share={mailShare} Icon={FiMail} name="Email" />
                                        <SocialShare share={facebookShare} Icon={FiTwitter} name="Facebook" />
                                        <SocialShare share={redditShare} Icon={ImReddit} name="Reddit" />
                                        <SocialShare share={pinterestShare} Icon={ImPinterest2} name="Pinterest" />
                                        <SocialShare share={linkedInShare} Icon={AiOutlineLinkedin} name="LinkedIn" />
                                        <SocialShare share={tumblrShare} Icon={FiTwitter} name="Tumblr" /> */}
                                            <div className="share-icons">
                                                <a target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <FiRepeat className="twitter-share" />
                                                        <span className="share-hoot-to">
                                                            Re-hoot
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={twitterShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <FiTwitter className="twitter-share" />
                                                        <span className="share-hoot-to">
                                                            Twitter
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={mailShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <FiMail className="twitter-share" />
                                                        <span className="share-hoot-to">
                                                            Email
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={facebookShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <RiFacebookCircleLine className="facebook-share" />
                                                        <span className="share-hoot-to">
                                                            Facebook
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={redditShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <ImReddit className="reddit-share" />
                                                        <span className="share-hoot-to">
                                                            Reddit
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={pinterestShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <ImPinterest2 className="pinterest-share" />
                                                        <span className="share-hoot-to">
                                                            Pinterest
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={linkedInShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <AiOutlineLinkedin className="linkedin-share" />
                                                        <span className="share-hoot-to">
                                                            LinkedIn
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="share-icons">
                                                <a href={tumblrShare} target="_blank" rel="nofollow" class="block button-transparent">
                                                    <div className="share-icons-text">
                                                        <FaTumblr className="tumblr-share" />
                                                        <span className="share-hoot-to">
                                                            Tumblr
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <IoCloseOutline className="close-modal" onClick={() => setIsShareModalOpen(false)} />
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            </Fragment>
                        }

                        {/* save/bookmark icon  */}

                        {/* <div className="save">
                            <BiBookmark className="cursor-pointer" />
                        </div> */}

                        {/* </div> */}
                    </div>
                </div>

                {/* <div className="like-count">{likesCount} likes</div> */}
                {/* <div className="post-comment">
                    <Link className="name-comment">
                        <span onClick={() => { history.push(`${ path } / ${ username }`) }}
                        >
                            {username}
                        </span>
                    </Link>
                    {" "}<span className="hoot-comment">{caption}</span>
                </div> */}

                {/* <div className="view-post-comment">
                    {comments.length > 0 &&

                    <div
                        className="post-view-comment"
                        onClick={() => { history.push(`/ hoot / ${ hootId }`) }}
                    >
                        View all {comments.length > 0 && comments.length} comments
                    </div>

                    }

                    {(isEdited === 1) && <small class="badge outline-badge d-flex flex-end">EDITED</small>}
                </div> */}

                {/*created time and  edited time */}
                <div className="view-post-comment">
                    <div className="post-time">{timeStamp}</div>
                    {/* {(isEdited === 1) && <small class="badge outline-badge d-flex flex-end">EDITED</small>} */}
                    {(isEdited === 1) &&
                        <div className="post-time">
                            last edited at {editedTimeStamp}
                            {/* <small class="badge outline-badge d-flex flex-end">EDITED</small> */}
                        </div>}
                </div>

                <hr className="mx-1 my-1 hr-color" />

                {/* Comment Box */}
                {/* <div className="comment-box">
                    <input
                        className="comment-input"
                        type="text"
                        maxLength="300"
                        value={newComment}
                        placeholder="Add a comment..."
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }} />
                    <button
                        className="add-comment"
                        onClick={addComment}
                    >
                        hoot
                    </button>
                </div> */}

                {/* comments list */}
                {/* {(location.pathname).match(/hoot/gi) == "hoot" ?
                    comments.length > 0 && <HootComments comments={comments} sliceValue={0} />
                    :
                    comments.length > 0 && <HootComments comments={comments} sliceValue={-2} />
                } */}

            </div>
        </div>
    )
}

export default Post
