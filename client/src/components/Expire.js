import axios from "axios";
import React, { useEffect, useState } from "react";

const Expire = ({ delay, hootImgId, children }) => {
    const [visible, setVisible] = useState(true);
    const BaseURL = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    setTimeout(() => {
        setVisible(false);
        axios.delete(`${BaseURL}/upload/delete/${hootImgId}`)
    }, delay);
    // }, [delay]);

    return visible ? <div>{children}</div> : <div />;
};

export default Expire;
