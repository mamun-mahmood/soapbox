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
        console.log("email", email);
        axios.post(`${BaseURL}/nodemailer`, {
            body: JSON.stringify({
                To: email,
                subject: "Please reset your password",
                text: "reset link for " + email,
                html: `<img src={SBlogo} style="width: 100px;">'
                        <h2 style="color: #5b5b5b;">Reset your Soapbox password</h2>

                        <h4 style="color: #757575;">Cheers!</h4>
                        <h4 style="color: #757575;">MegaHoot Soapbox Team</h4>
                        `,
            }),
        }).then(() => {
            setMessage("Email sent successfully")
        }).catch((err) => { console.log(err) })

        // fetch("/nodemailer", {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         To: email,
        //         subject: "Please reset your password",
        //         text: "reset link for " + email,
        //         html: `<img src={SBlogo} style="width: 100px;">'
        //                 <h1 style="color: #5b5b5b;">Reset your Soapbox password</h1>

        //                 <h4 style="color: #757575;">Cheers!</h4>
        //                 <h4 style="color: #757575;">MegaHoot Soapbox Team</h4>
        //                 `,
        //     }),
        // }).then(() => {
        //     console.log("email sent successfully");
        // }).catch((err) => console.log(err));
    };


    return (
        <div className="FP">
            <div className="forgot-password-box">
                <div className="soapbox-forgot-password-logo">
                    <img src={SBlogo} alt="Soapbox" />
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
            </div>
            <div className="FP-footer">
                <Link to="/TOS">Terms Of Service</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <a href="soapbox:;">About</a>
                <a href="soapbox:;">Contact</a>
                <br />
                <div style={{ margin: "0.5rem", marginTop: "0.2rem", padding: "0", textAlign: "center", color: "#9CA3AF" }}>
                    &copy; 2021<a href="https://www.megahoot.com/"> MegaHoot Technologies, Inc</a>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
