import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router';

const SuggestedHoots = () => {
    const [uploads, setUploads] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;
    const history = useHistory();

    const LIMIT = 4;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.get(`${BaseURL}/upload/p?page=1&limit=${LIMIT}`).then((response) => {
                setUploads(response.data.results);
            });
        }
        getAllUploadData();
    }, [])

    return (
        <Fragment>
            {uploads.map((upload) => {
                const hashtagsFound = upload.caption.split(' ').filter(v => v.startsWith('#'));
                const stocksFound = upload.caption.split(' ').filter(v => v.startsWith('$'));
                const usernamesFound = upload.caption.split(' ').filter(v => v.startsWith('@'));

                return (
                    <div key={upload.id}>
                        {upload.mimeType.match(/image/gi) == "image"
                            ?
                            <div className="suggested-hoots"
                                onClick={() => { history.push(`/${upload.username}/hoot/${upload.id}`) }}
                            >
                                <div className="sh-media">
                                    <img
                                        className="suggested-hoot-img"
                                        src={`${BaseURL}/images/${upload.image}`}
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                </div>
                                <div className="sh-caption">
                                    <Highlighter
                                        highlightClassName="highlighterClass"
                                        searchWords={[...hashtagsFound, ...stocksFound, ...usernamesFound]}
                                        autoEscape={true}
                                        textToHighlight={upload.caption.substring(0, 50) + "..."}
                                    />
                                    {/* {upload.caption.substring(0, 50)} ... */}
                                </div>
                            </div>
                            :
                            null
                        }

                        {upload.mimeType.match(/video/gi) == "video"
                            ?
                            <div className="suggested-hoots"
                                onClick={() => { history.push(`/${upload.username}/hoot/${upload.id}`) }}
                            >
                                <div className="sh-media">
                                    <video
                                        loop
                                        autoPlay
                                        muted
                                        disablePictureInPicture
                                        controlsList="nodownload"
                                        className="suggested-hoot-img"
                                        onContextMenu={(e) => e.preventDefault()}
                                    >
                                        <source
                                            src={`${BaseURL}/images/${upload.image}`}
                                            type={upload.mimeType}
                                        />
                                        Your browser does not support HTML video.
                                    </video>
                                </div>
                                <div className="sh-caption">
                                    <Highlighter
                                        highlightClassName="highlighterClass"
                                        searchWords={[...hashtagsFound, ...stocksFound, ...usernamesFound]}
                                        autoEscape={true}
                                        textToHighlight={upload.caption.substring(0, 50) + "..."}
                                    />
                                    {/* {upload.caption.substring(0, 50)} ... */}
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                )
            })}
        </Fragment>
    )
}

export default SuggestedHoots
