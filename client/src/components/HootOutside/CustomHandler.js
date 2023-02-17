import React, { useEffect, useState } from "react";
// import LinkPreview from "@ashwamegh/react-link-preview";
import Loading from "../../assets/Loading-bar.gif";
import axios from "axios";
function CustomHandler({ url }) {
  const BaseURL = process.env.REACT_APP_API_URL;
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${BaseURL}/metadata?url=${url}`)
        .then((res) => {
          if (res.data && res.data.og) {
            setPreview(res.data.og);
          } else setPreview({ title: "" });
        });
    };
    fetch();
  }, []);
  return !preview ? (
    <div
      style={{
        width: "100%",
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={Loading} alt="Loading..."></img>
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        // background: "white",
        padding: "1px",
      }}
    >
      <h2>{preview.title}</h2>
      <img
        style={{ width: "100%", height: "100%" }}
        src={preview.image}
        alt={preview.title}
      />
      <p> {preview.description} </p>
    </div>
  );
}

export default CustomHandler;
