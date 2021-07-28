import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'

const CommentBody = ({ id, username, commentBody }) => {
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
        console.log("Comment Deleted...");
    }

    const editCommentHoot = () => {
        axios.put(`${BaseURL}/comment/edit`, {
            commentBody: editComment,
            oldComment: commentBody
        });

        window.location.reload();
        console.log("comment Edited:", editComment);
    }

    return (
        <Fragment>
            {/* Delete Modal */}
            {isCDeleteModalOpen &&
                <Fragment>
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
                </Fragment>
            }

            {/* Edit Modal */}
            {isCEditModalOpen &&
                <Fragment>
                    {/* <div className="modal-overlay"></div> */}
                    <div className="outer-div">
                        <div className="edit-comment-modal">
                            {/* edit username  */}
                            <h5>You are editing comment as
                                <span className="user-edit">
                                    {" "}@<Link to="/profile" className="name-comment">{username}</Link>
                                </span>,
                            </h5>
                            {/* <div className="edit-content"> */}
                            <div className="edit-caption d-flex flex-wrap">
                                <div className="edit-profile-username">
                                    <img
                                        className="avatar"
                                        src="https://pbs.twimg.com/profile_images/603269306026106880/42CwEF4n_200x200.jpg"
                                        alt="avatar"
                                    />
                                    <div className="name avatar_name">{userInfo && userInfo.username}</div>
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
                                    <div className="d-flex justify-content-between m-1 btn-caption-top">
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
                </Fragment>
            }

            {/* More Option Modal */}
            {isCMoreModalOpen &&
                <Fragment>
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
                </Fragment>
            }

            <div className="main">
                <div className="">
                    <span className="owner">{username}{" "}@{username}</span>
                    <br />
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
