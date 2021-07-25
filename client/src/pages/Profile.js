import React, { useState, useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../components/Post'
import NavBar from '../components/NavBar'
// import Default from '../../public/images/default_user_profile.svg'

const Profile = () => {
    const { username } = useParams();
    const [myUploads, setMyUploads] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${BaseURL}/user/profile/${username}`).then((response) => {
            setMyUploads(response.data);
            console.log(response);
        });
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div>
                <div className="profile-container">
                    <div>
                        <img className="profile-picture" src="/images/default_user_profile.svg" alt="profile" />
                    </div>
                    <div className="user-info">
                        <div className="display-name">
                            <h1>{username}</h1>
                        </div>
                        <div className="user-counts">
                            <div><span className="counts-bold">42</span> posts</div>
                            <div><span className="counts-bold">10M</span> followers</div>
                            <div><span className="counts-bold">400</span> following</div>
                        </div>
                        <div className="user-name">@{username}</div>
                        <div className="user-desc">
                            Actor. Producer. Running in movies since 1981.
                        </div>
                        <div>
                            <a className="user-website" href="http://tomcruise.com/">tomcruise.com</a>
                        </div>
                        <button className="btn-edit-profile">Edit Profile</button>
                    </div>
                </div>
                <hr />
                <div className="user-posts">
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

                    {myUploads.map((upload) => {
                        return (<div key={upload.id}>
                            <Post
                                hootId={upload.id}
                                avatar="https://pbs.twimg.com/profile_images/603269306026106880/42CwEF4n_200x200.jpg"
                                username={upload.authorUsername}
                                mimeType={upload.mimeType}
                                hootImgId={upload.image}
                                likes={upload.likes}
                                caption={upload.caption}
                                timeStamp={upload.timeStamp}
                                edited={upload.edited}
                                editedTimeStamp={upload.editedTimeStamp}
                            />
                        </div>)
                    }).reverse()}
                </div>
            </div>
        </Fragment>
    )
}

export default Profile
