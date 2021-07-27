import React from 'react'
import CommentBody from './CommentBody';

const Comments = ({ comments, username }) => {
    // const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    // var username = "";

    // if (userInfo) {
    //     username = userInfo.username;
    // }

    return (
        <div className="comment-center">
            <div className="commentArea">
                {/* <h3>Comment Section</h3> */}

                {/* 
                {comments.length === 0 &&
                    <div className="no-hoots">
                        <p>No comments yet!</p>
                    </div>
                } */}

                {comments.length > 0 &&
                    <div className="">
                        {comments.map((comment) => {
                            return (
                                <div className="comment-info">
                                    <CommentBody
                                        id={comment.id}
                                        username={username}
                                        commentBody={comment.commentBody}
                                    />
                                </div>
                            )
                        }).reverse()}
                    </div>
                }
            </div>
        </div>
    )
}

export default Comments
