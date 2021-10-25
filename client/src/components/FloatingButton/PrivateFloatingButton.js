import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import './floatingButton.css'
import axios from 'axios'

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
            <Link to={userData.privateChannel
                ? "/create-private"
                : "/create"
            }>
                <FiPlus className="plus" />
            </Link>
        </div>
    )
}

export default PrivateFloatingButton
