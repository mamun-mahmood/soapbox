import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from "uuid";
const RamdomSuggestedHoots = () => {
    const [uploads, setUploads] = useState([]);
    const [page, setpage] = useState(2);
    const BaseURL = process.env.REACT_APP_API_URL;
    const history = useHistory();

    const LIMIT = 3;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.get(`${BaseURL}/upload/public/p?page=1&limit=${LIMIT}`).then((response) => {
                setUploads(response.data.results);
            });
        }
        getAllUploadData();
    }, [])

    const fetchMoreSuggestedHoots = async () => {
        await axios.get(`${BaseURL}/upload/public/p?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const hootsFromServer = response.data.results;

                setUploads([...uploads, ...hootsFromServer]);

                // if (hootsFromServer === 0 || hootsFromServer < LIMIT) {
                //     setHasMore(false);
                // }
            });

        setpage(page + 1);
    }

    return (
        <Fragment>
            {uploads.map((upload) => {
                const hashtagsFound = upload.caption.split(' ').filter(v => v.startsWith('#'));
                const stocksFound = upload.caption.split(' ').filter(v => v.startsWith('$'));
                const usernamesFound = upload.caption.split(' ').filter(v => v.startsWith('@'));

                return (
                    <div key={upload.id}>
                        {upload.mimeType &&
                            upload.mimeType.match(/image/gi) == "image"
                            ?
                            <div className="suggested-hoots"
                                onClick={() => { history.push(`/${upload.authorUsername}/hoot/${btoa(upload.id)}/${uuidv4()}`) }}
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
                                        textToHighlight={upload.caption.substring(0, 45) + " ..."}
                                    />
                                </div>
                            </div>
                            :
                            null
                        }

                        {upload.mimeType &&
                            upload.mimeType.match(/video/gi) == "video"
                            ?
                            <div className="suggested-hoots"
                                onClick={() => { history.push(`/${upload.authorUsername}/hoot/${btoa(upload.id)}/${uuidv4()}`) }}
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
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                )
            })}
            <div style={{ textAlign: "right", paddingRight: "1rem", marginTop: "-0.5rem" }}>
                <small className="see-more-suggested" onClick={fetchMoreSuggestedHoots}>see more</small>
            </div>
        </Fragment>
    )
}

export default RamdomSuggestedHoots
