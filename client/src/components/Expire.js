import axios from "axios";
import React, { useEffect, useState } from "react";

const Expire = ({ expiryDate, hootImgId, children }) => {
    const [visible, setVisible] = useState(true);
    const BaseURL = process.env.REACT_APP_API_URL;
    var delay;

    delay = expiryDate - new Date();

    // below code will run when delay === 0 
    setTimeout(() => {
        setVisible(false);
        axios.delete(`${BaseURL}/upload/delete/${hootImgId}`)
    }, delay);

    return visible ? <div>{children}</div> : <div />;
};

export default Expire;
