import React, { useEffect, useState } from 'react'
import './soapboxClub.css'
import Avatar from "react-avatar";
import { HiBadgeCheck, HiMenuAlt2 } from "react-icons/hi";
import { formatCount, formatSi } from '../../Helpers/formatNumbers';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import privateClubIcon from '../../assets/privateclub.png'
import { SoapboxTooltip } from '../../components/SoapboxTooltip';

const CreatorPrivateClub = ({ creator }) => {
    const [creatorsData, setCreatorsData] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;
    const profilePicPath = `${BaseURL}/profile-pictures/${creator.profilePic}`;

    // getting all uploads(hoots) of 
    // particuler user for counting all views and likes
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/upload/user/${creator.username}`)
                .then((res) => {
                    setCreatorsData(res.data);
                })
        }

        getUserData();
    }, [])

    var totalViews = 0;
    var totalLikes = 0;

    creatorsData.map((creator) => {
        totalViews += creator.views
        totalLikes += creator.likes
    })

    return (
        <div className="creator-private-club" onDragStart={(e) => e.preventDefault()}>
            <img src={privateClubIcon} alt="" width="30px" className="cpc-badge" />

            {/* creator profile pic */}
            <div className="cpc-c1">
                <div className="cpc-profile-pic">
                    <Avatar
                        size={100}
                        round={true}
                        name={creator.name}
                        src={profilePicPath}
                        className="cpc-bg"
                    />
                </div>

                {/* verifed creator name */}
                <div className="cpc-verifed">
                    <div className="cpc-name">
                        {creator.name}
                    </div>

                    {creator.verified === 1 ? (
                        <div
                            className="profile-verification-badge"
                            style={{
                                padding: 0,
                                fontSize: "1.2rem",
                                marginBottom: "0.2rem"
                            }}
                        >
                            <HiBadgeCheck
                                data-tip="Verified account"
                                data-text-color="#8249A0"
                                data-background-color="#D9D2FA"
                            />
                        </div>
                    ) : null}
                </div>

                {/* verifed creator username */}
                <div className="cpc-username">
                    @{creator.username}
                </div>

                {/* <div className="cpc-line">
                    <div className="cpc-line-dash"></div>
                </div> */}

                {/* user's likes and views */}
                <div className="cpc-stats">
                    <div className="cpc-stat-item">
                        <b className="cpc-count">{formatCount(totalLikes) + formatSi(totalLikes)}</b>
                        <span className="cpc-label"> Likes </span>
                    </div>

                    <div className="cpc-stat-item">
                        <b className="cpc-count">{formatCount(totalViews) + formatSi(totalViews)}</b>
                        <span className="cpc-label"> Views</span>
                    </div>
                </div>
            </div>

            <div className="cpc-c2">
                <Link to={`/${uuidv4()}/private/Club/${creator.username}/${uuidv4()}`}>
                    Go to My Club
                </Link>
            </div>
        </div>
    )
}

export default CreatorPrivateClub
