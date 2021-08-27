import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
    return (
        <div className="loading">
            <BeatLoader color={"#8249A0"} size={20} />
        </div>
    )
}

export default Loading
