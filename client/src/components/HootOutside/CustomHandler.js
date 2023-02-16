import React, { useEffect, useState } from "react";
// import LinkPreview from "@ashwamegh/react-link-preview";
import Loading from "../../assets/Loading-bar.gif";
import axios from "axios";
function CustomHandler({ url }) {
  const BaseURL = process.env.REACT_APP_API_URL;
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      await axios.get(`http://localhost:3001/metadata?url=${url}`).then((res) => {
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
        maxHeight: "110px",
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
        maxHeight: "110px",
        background: "white",
        padding: "1px",
      }}
    >
      {preview.title ? <h2>{preview.title}</h2> : null}
      {preview.img ? (
        <img style={{width: "100%"}} src={preview.image} alt={preview.title} />
      ) : null}
      {preview.description ? <p> {preview.description} </p> : null}
    </div>
  );
}

export default CustomHandler;
