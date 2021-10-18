import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import EmbedHoot from '../components/EmbedHoot';

const EmbedHootPage = () => {
    const { hootId } = useParams();
    const [hoot, setHoot] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getHootById = async () => {
            await axios.get(`${BaseURL}/hoot/public/${hootId}`)
                .then((response) => {
                    console.log("response: ", response);
                    setHoot(response.data);
                });
        }

        try {
            getHootById();
        } catch (error) {
            console.log("error fetching...", error);
        }
    }, [])

    return (
        <Fragment>
            {hoot &&
                hoot.map((hoot) => {
                    return (
                        <div style={{ backgroundColor: "#fff", height: "100%" }} key={hoot.id}>
                            <EmbedHoot
                                hootId={hoot.id}
                                timeStamp={hoot.timeStamp}
                                caption={hoot.caption}
                                link={hoot.link}
                                ephemeral={hoot.ephemeral}
                                mimeType={hoot.mimeType}
                                hootImgId={hoot.image}
                                likes={hoot.likes}
                                views={hoot.views}
                                username={hoot.authorUsername}
                                email={hoot.authorEmail}
                                edited={hoot.edited}
                                eTimeStamp={hoot.editedTimeStamp}
                            />
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default EmbedHootPage
