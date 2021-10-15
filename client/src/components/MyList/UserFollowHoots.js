import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post';

const UserFollowHoots = ({ userFollows }) => {
    const [myUploads, setMyUploads] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);

    const LIMIT = 5;

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getUserFollowHoots = async () => {
            await axios.post(`${BaseURL}/mylist/user/public/follows/p/?page=1&limit=${LIMIT}`, {
                userFollows: JSON.stringify(userFollows)
            }).then((response) => {
                setMyUploads(response.data.results);
            })
        }
        getUserFollowHoots();
    }, [userFollows])

    const fetchMoreUserFollowHoots = async () => {
        await axios.post(`${BaseURL}/mylist/user/public/follows/p/?page=${page}&limit=${LIMIT}`, {
            userFollows: JSON.stringify(userFollows)
        }).then((response) => {
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
            <InfiniteScroll
                dataLength={myUploads.length}
                next={fetchMoreUserFollowHoots}
                hasMore={hasMore}
            >
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
            </InfiniteScroll>
        </div>
    )
}

export default UserFollowHoots
