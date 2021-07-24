import React, { Fragment } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { useState } from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState([]);
    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    const email = userInfo.email;

    console.log("email:", email);
    const date = new Date();
    const timeStamp = format(date, 'LLL dd, yyyy • HH:mm aa');

    const upload = (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("timeStamp", timeStamp)
        formData.append("caption", caption)
        formData.append("authorEmail", email)
        formData.append("file", file);

        axios.post('http://localhost:3001/upload', formData)
            .then((response) => {
                console.log(response);
                history.push("/home");
            })
    }

    return (
        <Fragment>
            <NavBar />

            <div className="upload-post">
                <div className="post-caption d-flex flex-wrap">
                    <img className="avatar" src="https://pbs.twimg.com/profile_images/603269306026106880/42CwEF4n_200x200.jpg" alt="avatar" />
                    <div className="name avatar_name">{userInfo && userInfo.username}</div>

                    <div className="post-content">
                        <textarea
                            autoFocus
                            maxLength="255"
                            className="textarea-style"
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(event) => {
                                const value = event.target.value;
                                setCaption(value);
                            }}
                        ></textarea>

                        <div className="d-flex justify-content-between m-1 btn-caption-top">
                            <form action="">
                                <div className="d-flex justify-content-end my-2">

                                    {/* Photo */}
                                    <label htmlFor="post-image" className="btn-label">Photo</label>
                                    <input
                                        type="file"
                                        id="post-image"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            setFile(file);
                                        }}
                                        hidden
                                    />

                                    {/* Video */}
                                    <label htmlFor="post-video" className="btn-label">Video</label>
                                    <input
                                        type="file"
                                        name="video"
                                        id="post-video"
                                        accept="video/*"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            setFile(file);
                                        }}
                                        hidden
                                    />

                                    {/* Audio */}
                                    <label htmlFor="post-audio" className="btn-label">Audio</label>
                                    <input
                                        type="file"
                                        name="audio"
                                        id="post-audio"
                                        accept="audio/*"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            setFile(file);
                                        }}
                                        hidden
                                    />
                                </div>
                            </form>

                            <div className="caption-count">
                                <h6 className={caption.length > 220 && "text-danger"}>
                                    {" "}
                                    {caption.length}/255
                                </h6>
                            </div>

                            <div className="btn-post my-2">
                                <Button
                                    variant="primary mx-1"
                                    className="btn-login"
                                    onClick={upload}
                                    disabled={!caption}
                                >
                                    Hoot
                                </Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreatePost
