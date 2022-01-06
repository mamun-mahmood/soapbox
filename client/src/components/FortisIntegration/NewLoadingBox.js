import React from 'react';
import { CircularProgress } from '@material-ui/core'
import './fortisIntegration.css';

const NewLoadingBox = () => {
    return (
        <div className="new-load">
            <CircularProgress className="new-loading-box" style={{ color: "#ccc3f1" }} />
            <div>Loading...</div>
        </div>
    )
}

export default NewLoadingBox
