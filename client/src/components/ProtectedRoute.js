import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const ProtectedRoute = ({ page }) => {
    const Page = page;
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("loggedIn")) {
            history.push("/");
        }
    })

    return (
        <Page />
    )
}

export default ProtectedRoute
