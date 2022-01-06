import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import './fortisIntegration.css';

const FortisSignIn = ({ handleChange, setSignedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);

    const signInHandler = (event) => {
        setSaveLoading(true);
        event.preventDefault()

        const fortisSignin = async () => {
            await axios.post(`https://fortisab.com/api/users/signin`, {
                email,
                password,
            }).then((response) => {
                if (response.data) {
                    localStorage.setItem("Marketplace", JSON.stringify(response.data));
                    toast.success("Marketplace Sign In Successful!");
                    setSignedIn(true);
                    setTimeout(() => {
                        handleChange(true);
                    }, 1000);
                    setSaveLoading(false);
                }
            })
        };

        fortisSignin();
    }

    return (
        <form className="form" onSubmit={signInHandler}>
            <div>
                <h1 style={{
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 0,
                    paddingBottom: 0,
                    marginTop: "1rem"
                }}
                >
                    Marketplace Sign In
                </h1>
            </div>

            <hr />

            <div>
                <label htmlFor="email" className="label-new-style">Email address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    className='input-new-style'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password" className="label-new-style">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className='input-new-style'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <label className="label-new-style" />
                <button
                    className="create-product-button"
                    type="submit"
                    style={{
                        margin: 0,
                        fontSize: "1.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem"
                    }}
                >
                    <span style={{ color: "#374151" }}>Sign In</span>
                    {saveLoading && <CircularProgress style={{ color: "#374151", fontSize: "0.5rem", width: 20, height: 20 }} />}
                </button>
            </div>

            <div>
                <div style={{
                    fontWeight: 500,
                    color: "rgb(112, 122, 131)",
                    marginTop: "0rem",
                }}>
                    New customer?{" "}
                    <a href="https://fortisab.com/register"
                        target="_blank" rel="noopener noreferrer"
                        style={{ color: "#334155", fontWeight: 600, textDecoration: "none" }}
                    >
                        Create account
                    </a>
                </div>
            </div>
        </form>
    );
}

export default FortisSignIn
