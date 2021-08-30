import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const InfiniteScrollLoader = () => {
    return (
        <div className="loading-is">
            <BeatLoader color={"#8249A0"} size={10} />
        </div>
    )
}

export default InfiniteScrollLoader
