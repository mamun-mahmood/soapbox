import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import './floatingButton.css'
import axios from 'axios'
import { SoapboxTooltip } from '../SoapboxTooltip'

const PrivateFloatingButton = () => {
    const [userData, setUserData] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));

    //getting user data
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${userInfo && userInfo.username}`)
                .then((response) => {
                    setUserData(response.data[0]);
                });
        }

        try {
            getUserData();
        } catch (error) {
            console.log(error);
        }
    }, [userInfo && userInfo.username])

    return (
        <div className="float">
            <Link to={
                userData.privateChannel
                    ? "/create-private"
                    : "/create"
            }>
                <SoapboxTooltip title={
                    userData.privateChannel
                        ? "Create Private Hoot"
                        : "Create Hoot"
                } placement="left">
                    <div>
                        <FiPlus className="plus" />
                    </div>
                </SoapboxTooltip>
            </Link>
        </div>
    )
}

export default PrivateFloatingButton
