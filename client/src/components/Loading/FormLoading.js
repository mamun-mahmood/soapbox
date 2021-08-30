import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const FormLoading = () => {
    return (
        <div className="form-loading">
            <BeatLoader color={"#8249A0"} size={20} />
        </div>
    )
}

export default FormLoading
