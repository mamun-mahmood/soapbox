import React from 'react'
import CommentBody from './CommentBody';

const HootComments = ({ comments, sliceValue, name, verified }) => {
    return (
        <div className="commentArea">
            {comments.length > 0 &&
                <div className="">
                    {comments.slice(sliceValue).map((comment) => {
                        return (
                            <div className="comment-info" key={comment.id}>
                                <CommentBody
                                    name={comment.name}
                                    username={comment.username}
                                    commentBody={comment.commentBody}
                                    commentProfilePic={comment.profilePic}
                                    verified={verified}
                                />
                            </div>
                        )
                    }).reverse()}
                </div>
            }
        </div>
    )
}

export default HootComments
