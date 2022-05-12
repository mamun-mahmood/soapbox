import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CaptionComp = ({
  caption,
  username,
  isReadMore,
  fontFamilyStyle,
  fontColor,
  fontStyleSize,
  hootId,
  views,
  likes,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
  const styles = {
    fontFamily: fontFamilyStyle,
    color: fontColor,
    fontSize: fontStyleSize,
  };
  const BaseURL = process.env.REACT_APP_API_URL;
  const random = (min = 10, max = 50) => {
    let num = Math.random() * (max - min) + min;

    return Math.round(num);
  };
  useEffect(() => {
    axios.put(`${BaseURL}/upload/views/external-player`, {
      views: views + random(50, 400),
      id: hootId,
    });
  }, []);

  return (
    caption.length > 300
      ? isReadMore
        ? caption.slice(0, 320)
        : caption
      : caption
  )
    .split(" ")
    .map((item, index) => {
      if (item.startsWith("@")) {
        return (
          <span key={index} className="hoot-comment">
            <Link
              to={
                userInfo
                  ? userInfo.username === item.replace(/[@,.]/g, "")
                    ? `/profile/${item.replace(/[@,.]/g, "")}`
                    : `/user/${item.replace(/[@,.]/g, "")}`
                  : `/user/${item.replace(/[@,.]/g, "")}`
              }
              className="mention-highlighter"
            >
              {item}
            </Link>{" "}
          </span>
        );
      }

      if (item.startsWith("#")) {
        return (
          <span key={index} className="hoot-comment">
            <span className="mention-highlighter">{item}</span>{" "}
          </span>
        );
      }

      if (item.startsWith("$")) {
        return (
          <span key={index} className="hoot-comment">
            <span className="mention-highlighter">{item}</span>{" "}
          </span>
        );
      }

      return (
        <span key={index} className="hoot-comment" style={{ ...styles }}>
          {item}{" "}
        </span>
      );
    });
};

export default CaptionComp;
