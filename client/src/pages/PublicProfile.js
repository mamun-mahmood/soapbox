import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import NavBar from '../components/NavBar'
import { useLocation, useParams } from 'react-router-dom'

const PublicProfile = () => {
    const [users, setUsers] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    const { username } = useParams();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

        axios.get(`${BaseURL}/user/profile/${username}`).then((response) => {
            setUsers(response.data);
        });

        console.log(users);
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div>
                <div className="profile-container">
                    <div>
                        <img className="profile-picture" src="https://pbs.twimg.com/profile_images/1167221863103074305/Ziap6jxO_200x200.png" alt="profile-pic" />
                    </div>
                    <div className="user-info">
                        <div className="follow-user">
                            <div className="display-name">
                                <h1>{username}</h1>
                            </div>
                            <div className="user-follow">
                                <button className="btn-follow">Follow</button>
                            </div>
                        </div>

                        <div className="user-counts">
                            <div><span className="counts-bold">4177</span> posts</div>
                            <div><span className="counts-bold">14.1M</span> followers</div>
                            <div><span className="counts-bold">114</span> following</div>
                        </div>
                        <div className="user-name">@{username}</div>
                        <div className="user-desc">
                            The official home of Star Wars on Soapbox.
                        </div>
                        <div>
                            <a className="user-website" href="https://www.starwars.com/">www.starwars.com</a>
                        </div>
                        <div className="followed-by">
                            <small >
                                Followed by
                                <span className="followed-by-user"> louis</span>,
                                <span className="followed-by-user"> hrshmistry</span>,
                                and
                                <span className="followed-by-user"> aakash</span>
                            </small>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="user-posts">
                    {users.map((user) => {
                        return (<div key={user.id}>
                            <Post
                                hootId={user.id}
                                avatar="https://pbs.twimg.com/profile_images/603269306026106880/42CwEF4n_200x200.jpg"
                                username={user.authorUsername}
                                mimeType={user.mimeType}
                                hootImgId={user.image}
                                likes={user.likes}
                                caption={user.caption}
                                timeStamp={user.timeStamp}
                                edited={user.edited}
                                editedTimeStamp={user.editedTimeStamp}
                            />
                        </div>)
                    }).reverse()}
                </div>
            </div>
        </Fragment>
    )
}

export default PublicProfile
