import React, { useState, Fragment } from 'react'
import axios from 'axios'
import ClickAwayListener from 'react-click-away-listener';
import Avatar from 'react-avatar';
import { Button } from 'react-bootstrap';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'

const CommentBody = ({ username, commentBody, name, commentProfilePic, verified }) => {
    const [isCMoreModalOpen, setIsCMoreModalOpen] = useState(false);
    const [isCDeleteModalOpen, setIsCDeleteModalOpen] = useState(false);
    const [isCEditModalOpen, setIsCEditModalOpen] = useState(false);
    const [editComment, setEditComment] = useState("")

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    const BaseURL = process.env.REACT_APP_API_URL;

    const openDeleteModal = () => {
        setIsCDeleteModalOpen(true);
        setIsCMoreModalOpen(false);
    }

    const openEditModal = () => {
        setIsCEditModalOpen(true);
        setIsCMoreModalOpen(false);
    }

    const deleteComment = () => {
        setIsCMoreModalOpen(false);
        axios.delete(`${BaseURL}/comment/delete/${commentBody}`, {
            username: userInfo.username,
        });
        window.location.reload();
        // Comment Deleted...
    }

    const editCommentHoot = () => {
        axios.put(`${BaseURL}/comment/edit`, {
            commentBody: editComment,
            oldComment: commentBody
        });

        window.location.reload();
        console.log("comment Edited:", editComment);
    }

    var commentProfilePicPath;
    if (commentProfilePic === null) {
        commentProfilePicPath = `${BaseURL}/profile-pictures/${commentProfilePic}`;
    } else {
        if (commentProfilePic && commentProfilePic.toString().match(/fakercloud/gi) == "fakercloud") {
            commentProfilePicPath = commentProfilePic;
        } else {
            commentProfilePicPath = `${BaseURL}/profile-pictures/${commentProfilePic}`;
        }
    }

    return (
        <Fragment>

            {/* Delete Modal */}
            {isCDeleteModalOpen &&
                <Fragment>
                    <ClickAwayListener onClickAway={() => { setIsCDeleteModalOpen(false) }}>

                        {/* <div className="modal-overlay"></div> */}
                        <div className="comment-delete-modal">
                            <h4>Delete Comment</h4>
                            <div className="delete-info">Are you sure you want to delete this comment?</div>
                            <div className="btn-post mt-3 delete-info">
                                <Button
                                    variant="primary mx-1"
                                    className="btn-login"
                                    onClick={deleteComment}
                                >
                                    Delete
                                </Button>{' '}
                            </div>
                            <IoCloseOutline className="close-modal" onClick={() => setIsCDeleteModalOpen(false)} />
                        </div>
                    </ClickAwayListener>
                </Fragment>
            }

            {/* Edit Modal */}
            {isCEditModalOpen &&
                <Fragment>
                    <ClickAwayListener onClickAway={() => { setIsCEditModalOpen(false) }}>
                        {/* <div className="modal-overlay"></div> */}
                        <div className="outer-div">
                            <div className="edit-comment-modal">
                                {/* edit username  */}
                                <h5>You are editing comment as
                                    <span className="user-edit">
                                        {" "}{username}
                                    </span>,
                                </h5>
                                {/* <div className="edit-content"> */}
                                <div className="edit-caption d-flex flex-wrap">
                                    <div className="edit-profile-username">
                                        <div className="avatar-wraper">
                                            <Avatar
                                                size={50}
                                                round={true}
                                                name={name}
                                                src={commentProfilePicPath}
                                            />
                                        </div>
                                        <div className="name avatar_name">{name}</div>
                                    </div>
                                    <div className="post-content">
                                        <textarea
                                            autoFocus
                                            maxLength="300"
                                            className="editarea-comment-style"
                                            placeholder="What to edit?"
                                            value={editComment}
                                            onChange={(event) => {
                                                setEditComment(event.target.value);
                                            }}
                                        ></textarea>
                                        <div className="d-flex justify-content-end pl-2 btn-caption-top">
                                            <div className="btn-post my-2">
                                                <Button
                                                    variant="primary mx-1"
                                                    className="btn-edit-hoot"
                                                    onClick={editCommentHoot}
                                                    disabled={!editComment}
                                                >
                                                    Edit
                                                </Button>{' '}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                                <IoCloseOutline className="close-modal" onClick={() => setIsCEditModalOpen(false)} />
                            </div>
                        </div>
                    </ClickAwayListener>
                </Fragment>
            }

            {/* More Option Modal */}
            {isCMoreModalOpen &&
                <Fragment>
                    <ClickAwayListener onClickAway={() => { setIsCMoreModalOpen(false) }}>
                        <div className="comment-modal">
                            {username === userInfo.username &&
                                <div className="comment-options">
                                    <span onClick={openDeleteModal}>Delete</span>
                                    <span onClick={openEditModal}>Edit</span>
                                </div>
                            }
                            {username === userInfo.username ||
                                <div className="comment-options">
                                    <span>Report</span>
                                </div>
                            }
                        </div>
                    </ClickAwayListener>
                </Fragment>
            }

            <div className="main">
                <div className="">
                    <div className="comment-owner">
                        <div className="avatar-comment-wraper">
                            <Avatar
                                size={20}
                                round={true}
                                name={name}
                                src={commentProfilePicPath}
                            // className={commentProfilePicPath === null ? null : "skeleton-img"}
                            />
                        </div>
                        <span className="owner">{name}&nbsp;</span>
                        <div className="at-name">@{username}</div>
                    </div>
                    <span className="content">
                        {commentBody}
                    </span>
                </div>

                <div className="c-more">
                    <BiDotsHorizontalRounded
                        className="more-icon"
                        onClick={() => setIsCMoreModalOpen(!isCMoreModalOpen)}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default CommentBody
