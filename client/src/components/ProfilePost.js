import React from 'react'

const ProfilePost = ({ img }) => {
    return (
        <div>
            <img className="post-item" src={img} alt="post" />
        </div>
    )
}

export default ProfilePost
