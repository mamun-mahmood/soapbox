import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post';

const UserFollowHoots = ({ user }) => {
    const [myUploads, setMyUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);

    const LIMIT = 3;

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getUserFollowHoots = async () => {
            axios.get(`${BaseURL}/upload/user/follows/p/${user}?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setMyUploads(response.data.results);
                })
        }
        getUserFollowHoots();
    }, [user])

    const fetchMoreUserFollowHoots = async () => {
        await axios.get(`${BaseURL}/upload/user/follows/p/${user}?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const hootsFromServer = response.data.results;

                setMyUploads([...myUploads, ...hootsFromServer]);

                if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    }

    return (
        <div>
            {/* <InfiniteScroll
                dataLength={myUploads.length}
                next={fetchMoreUserFollowHoots}
                hasMore={hasMore}
            > */}
            {myUploads.map((upload) => {
                return (
                    <div key={upload.id}>
                        <Post
                            hootId={upload.id}
                            username={upload.authorUsername}
                            mimeType={upload.mimeType}
                            hootImgId={upload.image}
                            likes={upload.likes}
                            views={upload.views}
                            followers={upload.followers}
                            caption={upload.caption}
                            link={upload.link}
                            ephemeral={upload.ephemeral}
                            privateHoot={upload.private}
                            expiryDate={upload.expiryDate}
                            timeStamp={upload.timeStamp}
                            edited={upload.edited}
                            editedTimeStamp={upload.editedTimeStamp}
                        />
                    </div>
                )
            })}
            {/* </InfiniteScroll> */}
        </div>
    )
}

export default UserFollowHoots
