import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Post from "../Post";
import EndMsg from "./EndMsg";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "./InfiniteScrollLoader";
import "./feed.css";

const Feed = () => {
  const [uploads, setUploads] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setpage] = useState(2);
  const BaseURL = process.env.REACT_APP_API_URL;

  const LIMIT = 10;

  useEffect(() => {
    const getAllUploadData = async () => {
      await axios
        .get(`${BaseURL}/upload/public/p?page=1&limit=${LIMIT}`)
        .then((response) => {
          setUploads(response.data.results);
        });
    };
    getAllUploadData();
  }, []);

  const fetchMoreHoots = async () => {
    await axios
      .get(`${BaseURL}/upload/public/p?page=${page}&limit=${LIMIT}`)
      .then((response) => {
        const hootsFromServer = response.data.results;

        setUploads([...uploads, ...hootsFromServer]);

        if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
          setHasMore(false);
        }
      });

    setpage(page + 1);
  };

  return (
    <div className="feed start" style={{ width: "100%" }}>
      {/* no need to reverse the list as it is getting reversed from the server itself  */}
      {uploads && (
        <InfiniteScroll
          dataLength={uploads.length}
          next={fetchMoreHoots}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          endMessage={<EndMsg />}
        >
          {uploads.map((upload) => {
            console.log(upload);
            return (
              <div key={upload.id}>
                <Post
                  hootId={upload.id}
                  username={upload.authorUsername}
                  mimeType={upload.mimeType}
                  hootImgId={upload.image}
                  audioPoster={upload.audioPoster}
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
                  fontFamilyStyle={upload.fontFamilyStyle }
                />
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Feed;
