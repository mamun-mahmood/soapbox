import React, { useState } from 'react'
import './forgotPassword.css'
import axios from 'axios'
import SBlogo from '../../assets/Soapbox.png'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const BaseURL = process.env.REACT_APP_API_URL;

    const sendResetLink = () => {
        const sendEmail = async () => {
            await axios.post(`${BaseURL}/nodemailer/forgot-password`, {
                body: JSON.stringify({
                    To: email,
                    subject: "Please reset your password",
                    text: "reset link for " + email,
                }),
            }).then((response) => {
                setMessage(response.data.message);
            }).catch((err) => { console.log(err) })
        };

        sendEmail();
    }

    return (
        <div className="FP">
            <div className="forgot-password-box">
                <div className="soapbox-forgot-password-logo">
                    <img src={SBlogo} alt="Soapbox" onContextMenu={(e) => e.preventDefault()} />
                </div>
                <div className="reset-password-header">
                    Reset your password
                </div>
                <div className="reset-form">
                    <div className="reset-password-desc">
                        To reset your password, please provide your MegaHoot Soapbox email.
                    </div>
                    <div className="email-input-for-password">
                        <input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        onClick={sendResetLink}
                    >Send Reset Instructions</button>
                </div>
                <small>{message}</small>
                <div className="text-center text-decoration-none mt-2">
                    <small className="text-color-auth">New to Soapbox? </small>
                    <Link to="/login" className="text-decoration-none primary-color fw-bold"> Sign up</Link><br />
                </div>
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

export default ForgotPassword
