import React from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
import Loading from "../../assets/Loading-bar.gif";

function CustomComponent({ loading, preview }) {
  return loading ? (
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
        <img height="30%" width="30%" src={preview.img} alt={preview.title} />
      ) : null}
      {/* {preview.description ? <p> {preview.description} </p> : null} */}
    </div>
  );
}

function CustomHandler({ url }) {
  return <LinkPreview url={url} render={CustomComponent} />;
}

export default CustomHandler;
