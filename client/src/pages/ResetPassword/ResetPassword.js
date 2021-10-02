import React, { useState } from 'react'
import '../ForgotPassword/forgotPassword.css'
import axios from 'axios'
import SBlogo from '../../assets/Soapbox.png'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("")
    const BaseURL = process.env.REACT_APP_API_URL;

    const location = useLocation();
    const history = useHistory();
    const username = new URLSearchParams(location.search).get('reset');
    const { token } = useParams();

    const updatePassword = () => {
        const updatePass = async () => {
            await axios.post(`${BaseURL}/nodemailer/reset-password`, {
                newPassword: newPassword,
                sentToken: token,
            }).then((response) => {
                setMessage(response.data.message);
            }).catch((err) => { console.log(err) })
        };

        updatePass();
        setTimeout(() => {
            history.push("/login")
        }, 3000)
    }

    return (
        <div className="FP">
            <div className="forgot-password-box">
                <div className="soapbox-forgot-password-logo">
                    <img src={SBlogo} alt="Soapbox" onContextMenu={(e) => e.preventDefault()} />
                </div>
                <div className="reset-password-header">
                    Change password for <br /> @{username}
                </div>
                <div className="reset-form" style={{ width: "100%" }}>
                    <div className="email-input-for-password">
                        <input
                            value={newPassword}
                            onChange={(event) => { setNewPassword(event.target.value) }}
                            type="password"
                            placeholder="New password"
                        />
                    </div>
                    <button
                        onClick={updatePassword}
                    >Change password</button>
                </div>
                <small>{message}</small>
            </div>
            <div className="FP-footer">
                <Link to="/TOS">Terms Of Service</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <a href="soapbox:;">About</a>
                <a href="soapbox:;">Contact</a>
                <Link to="/">Home</Link>
                <br />
                <div style={{ margin: "0.5rem", marginTop: "0.2rem", padding: "0", textAlign: "center", color: "#9CA3AF" }}>
                    &copy; 2021<a href="https://www.megahoot.com/"> MegaHoot Technologies, Inc</a>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
