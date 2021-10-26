import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import SuggestedFollow from './SuggestedFollow';

const RandomCommunitySuggestion = () => {
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [page, setpage] = useState(2);
    const BaseURL = process.env.REACT_APP_API_URL;

    const LIMIT = 4;

    // getting all verified users data
    useEffect(() => {
        const getAllVerifiedUsersData = async () => {
            await axios.get(`${BaseURL}/user/verified/p?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setVerifiedUsers(response.data.results);
                });
        }

        getAllVerifiedUsersData();
    }, [])

    const fetchMoreSuggestedFollows = async () => {
        await axios.get(`${BaseURL}/user/verified/p?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const verifiedUsersFromServer = response.data.results;

                setVerifiedUsers([...verifiedUsers, ...verifiedUsersFromServer]);

                // if (verifiedUsersFromServer === 0 || verifiedUsersFromServer < LIMIT) {
                //     setHasMore(false);
                // }
            });

        setpage(page + 1);
    }

    return (
        <Fragment>
            {verifiedUsers.map((verifiedUser) => {
                return (
                    <div key={verifiedUser.id}>
                        <SuggestedFollow verifiedUser={verifiedUser}  />
                    </div>
                )
            })}

            <div style={{ textAlign: "right", paddingRight: "1rem", marginTop: "-0.5rem" }}>
                <small className="see-more-suggested" onClick={fetchMoreSuggestedFollows}>see more</small>
            </div>
        </Fragment>
    )
}

export default RandomCommunitySuggestion
