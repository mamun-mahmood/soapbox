import React from 'react'

const Comments = ({ comments, hoot }) => {
    return (
        <div className="comment-center">
            <div className="commentArea">
                <h3>Comment Section</h3>

                {comments.length === 0 &&
                    <div className="no-hoots">
                        <p>No comments yet!</p>
                    </div>
                }

                {comments.length > 0 &&
                    <div className="comment">
                        {comments.map((comment) => {
                            return (<h6 key={hoot.id}>
                                {comment.commentBody}
                            </h6>)
                        }).reverse()}
                    </div>
                }
            </div>
        </div>
    )
}

export default Comments
