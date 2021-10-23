import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const ProtectedRoute = ({ page }) => {
    const Page = page;
    const history = useHistory();
    const [userData, setUserData] = useState([]);

    const BaseURL = process.env.REACT_APP_API_URL;
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));

    useEffect(() => {
        if (!localStorage.getItem("loggedIn")) {
            history.push("/login");
        } else {
            const getUserData = async () => {
                await axios.get(`${BaseURL}/user/${userInfo && userInfo.username}`)
                    .then((response) => {
                        // setUserData(response.data[0]);
                        if (window.location.pathname === "/create-private") {
                            if (response.data[0].privateChannel === 0) {
                                history.push("/");
                            }
                        }
                    });
            }

            try {
                getUserData();
            } catch (error) {
                console.log(error);
            }
        }
    }, [])

    return (
        <Page />
    )
}

export default ProtectedRoute
