import React, { useState } from 'react';

export default function Rating(props) {
  const { likes, views } = props;
  const [showlikes, setShowLikes] = useState('fa fa-heart-o')
  const [likeCount, setLikeCount] = useState(likes)
  return (
    <div className="rating" style={{ textAlign: "center" }}>
      {/* <span>
        <i
          className={
            rating >= 1
              ? 'fa fa-star'
              : rating >= 0.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fa fa-star'
              : rating >= 1.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fa fa-star'
              : rating >= 2.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fa fa-star'
              : rating >= 3.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fa fa-star'
              : rating >= 4.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>fa-heart 
      </span> */}
      <div style={{ color: "#8249A0" }}>
        <span><i className={showlikes} style={{ cursor: 'pointer', fontWeight: "600" }} aria-hidden="true" onClick={() => {
          {
            showlikes == "fa fa-heart" ?
              setLikeCount(likes) : setLikeCount(likes)
          }; {
            showlikes == "fa fa-heart" ?
              setShowLikes('fa fa-heart-o') : setShowLikes('fa fa-heart')
          }
        }}>  </i>{" "}{likes}</span>
        {" "}{" "}
        <span> <i className="fa fa-eye" aria-hidden="true" style={{ fontWeight: "600" }}> </i>{" "}{views}</span>
      </div>
    </div>
  );
}