import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../../components/Post'
import NavBar from '../../components/NavBar'
import Comments from '../../components/Comments'
import { useParams, Link } from 'react-router-dom'
import './individualHoot.css'
import '../../components/Feed/feed.css'

const IndividualHoot = () => {
    const { id } = useParams();
    const [hoot, setHoot] = useState([]);
    const [comments, setComments] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // here id is hootId 
        axios.get(`${BaseURL}/hoot/${id}`)
            .then((response) => {
                setHoot(response.data);
            });

        // here id is hootId 
        axios.get(`${BaseURL}/comment/${id}`)
            .then((response) => {
                setComments(response.data);
            });
    }, [])

    return (
        <div>
            <NavBar />
            {hoot.length === 0 &&
                <div className="no-hoots">
                    <p>Something went wrong! please try again...</p>
                    <div className="individual-hoot">
                        <Link to="/create">
                            Create Hoot
                        </Link>
                    </div>
                </div>
            }

            <div className="individualHoot">
                {/* <div className="hootArea"> */}
                {hoot.map((hoot) => {
                    return (<div className="top-margin" key={hoot.id}>
                        <Post
                            hootId={hoot.id}
                            avatar="/images/default_user_profile.svg"
                            username={hoot.authorUsername}
                            mimeType={hoot.mimeType}
                            hootImgId={hoot.image}
                            likes={hoot.likes}
                            caption={hoot.caption}
                            timeStamp={hoot.timeStamp}
                            edited={hoot.edited}
                            editedTimeStamp={hoot.editedTimeStamp}
                        />
                    </div>)
                }).reverse()}
                {/* </div> */}

                {/* <Comments comments={comments} hoot={hoot} /> */}

            </div>
        </div>
    )
}

export default IndividualHoot
