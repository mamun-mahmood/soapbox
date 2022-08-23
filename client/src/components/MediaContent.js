import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import LazyLoad from "react-lazyload";
import faker from "faker";
import { words, numbers } from "../Helpers/Constants";
import BeatLoader from "react-spinners/BeatLoader";
import eye from "../assets/eyes.png";

const MediaContent = ({
  hootId,
  mimeType,
  filePath,
  audioPoster,
  views,
  image,
  editOpen,
  profilePicPath,
  isSensitive,
  setIsSensitive,
}) => {
  const BaseURL = process.env.REACT_APP_API_URL;

  const [viewCount, setViewCount] = useState(views);
  const [isVertical, setIsVertical] = useState("hoot-img-vertical");
  const ref = useRef(null);
  const divRef = useRef();
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const audioPosterPath = `${BaseURL}/audio-posters/${audioPoster}`; // media url from server

  const random = (min = 10, max = 50) => {
    let num = Math.random() * (max - min) + min;

    return Math.round(num);
  };

  // on every page load view will increase reandomly - just remove this useEffect to get back to normal view counts
  useEffect(() => {
    setViewCount(viewCount + random(50, 400));

    // to make view count 0
    // setViewCount(0)
  }, []);

  // view functionality added to hoots.
  useEffect(() => {
    axios
      .put(`${BaseURL}/upload/views`, {
        views: viewCount,
        image: image,
      })
      .then((response) => {});
  }, [viewCount]);

  const fakeCommentFirstName = faker.name.firstName();
  const fakeCommentLastName = faker.name.lastName();
  const fakeCommentUsername = fakeCommentFirstName.toLowerCase();
  const fakeCommentAvatar = faker.image.avatar();
  const fakeCommentBody = words[Math.floor(Math.random() * words.length)];
  const fakeCommentNumber =
    numbers[Math.floor(Math.random() * numbers.length)].toLowerCase();

  // auto commenting
  const autoComments = async () => {
    await axios.post(`${BaseURL}/comment/`, {
      name: fakeCommentFirstName + " " + fakeCommentLastName,
      username: fakeCommentUsername + fakeCommentNumber,
      commentBody: fakeCommentBody,
      profilePic: fakeCommentAvatar,
      hootId: hootId,
    });
  };

  const imgRef = () => {
    const height = ref.current.clientWidth;
    const width = ref.current.clientHeight;

    if (height > width) {
      setIsVertical("hoot-img-vertical");
    } else {
      setIsVertical("hoot-img-horizontal");
    }

    autoComments();
  };

  const PlaceholderComponent = () => {
    return (
      <div className="placeholder">
        <BeatLoader color={"#8249A0"} size={20} />
      </div>
    );
  };

  const toggleSensitivity = () => {
    setIsSensitive(!isSensitive);
  };

  const divLoad = () => {
    setImgHeight(divRef.current.clientHeight);
    setImgWidth(divRef.current.clientWidth);
  };

  return (
    <Fragment>
      {mimeType.match(/image/gi) == "image" && (
        <div
          // offset={15000}
          // placeholder={<PlaceholderComponent />}
          ref={divRef}
          onLoad={divLoad}
          style={
            isSensitive ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          <img
            ref={ref}
            src={filePath}
            alt="soapbox-img"
            className={isVertical}
            onContextMenu={(e) => e.preventDefault()}
            onLoad={(e) => {
              setViewCount(viewCount + 1);
              imgRef();
            }}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      )}
      {mimeType.match(/video/gi) == "video" && (
        <div
          // offset={15000}
          // placeholder={<PlaceholderComponent />}
          ref={divRef}
          onLoad={divLoad}
          style={
            isSensitive ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          <video
            loop
            muted
            controls
            autoPlay
            disablePictureInPicture
            className="hoot-vdo"
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            onLoadStart={(e) => {
              setViewCount(viewCount + 1);
              autoComments();
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            <source
              src={filePath}
              // type={mimeType}
            />
            Your browser does not support HTML video.
          </video>
        </div>
      )}
      {mimeType.match(/audio/gi) == "audio" && (
        <div
          // offset={15000}
          // placeholder={<PlaceholderComponent />}
          onLoad={divLoad}
          style={
            isSensitive ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          <video
            className={editOpen ? "hoot-ado-fix" : "hoot-vdo"}
            controls
            poster={audioPoster !== null ? audioPosterPath : profilePicPath}
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            onLoadStart={(e) => {
              setViewCount(viewCount + 1);
              autoComments();
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            <source
              src={filePath}
              // type="video/mp4"
            />
            Your browser does not support the audio element.
          </video>
        </div>
      )}
      {!!isSensitive && (
        <div
          className="sensitivity-blur"
          style={{
            height: `${
              imgHeight > 100 ? (imgHeight > 300 ? 300 : imgHeight) : 180
            }px`,
            width: `${
              imgWidth > 100 ? (imgWidth > 300 ? 300 : imgWidth) : 180
            }px`,
            padding: "2px",
          }}
        >
          {imgHeight > 180 && (
            <div style={{ background: "white", marginTop: "10%" }}>
              <img
                src={eye}
                alt="sensitive_eye"
                style={{ height: "70px", width: "70px", marginLeft: "35%" }}
              />
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            This hoot may contain sensitive content. Do you still want to view
            the content?
          </div>
          <div onClick={toggleSensitivity} className="sensitivity-button">
            VIEW CONTENT
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MediaContent;
