import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ImGoogle3 } from "react-icons/im";
import { FaFacebook, FaApple } from "react-icons/fa";
import { toast } from 'react-toastify';

const LoginComp = () => {
    const history = useHistory();
    const [saveLoading, setSaveLoading] = useState(false);

    const BaseURL = process.env.REACT_APP_API_URL;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            setSaveLoading(false);
        }
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = (event) => {
        setSaveLoading(true);
        event.preventDefault()

        const userLogin = async () => {
            await axios.post(`${BaseURL}/user/login`, {
                email,
                password,
            }).then((response) => {
                if (response.data.loggedIn) {
                    const loggedIn = {
                        username: response.data.username,
                        email: response.data.email
                    }

                    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
                    setTimeout(() => {
<<<<<<< HEAD
                        // history.push("/home");
                        history.push(`/profile/${response.data.username}`);
=======
                        history.push("/");
>>>>>>> 626386f40bbfbcfb49f034d335a31332b9e0a893
                    }, 200);
                }

                response.data.message === "Logged in Successful!"
                    ? toast.success(response.data.message)
                    : toast.info(response.data.message)
            })
        }

        userLogin();

        setTimeout(() => {
            setSaveLoading(false);
        }, 1000);
    }

    const handleGoogleLoginSuccess = async googleAccountData => {
        console.log(googleAccountData.profileObj.email);
        console.log(googleAccountData.profileObj.name);

        await axios.post(`${BaseURL}/user/google-login`, {
            tokenId: googleAccountData.tokenId,
        }).then((response) => {
            if (response.data.loggedIn) {
                const loggedIn = {
                    username: response.data.username,
                    email: response.data.email
                }

                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
                setTimeout(() => {
                    history.push("/");
                }, 200);
            }

            response.data.message === "Logged in Successful!"
                ? toast.success(response.data.message)
                : toast.info(response.data.message)
        })
    }

    const handleGoogleLoginFailure = response => { }

    const handleFacebookLoginSuccess = async facebookAccountData => {
        await axios.post(`${BaseURL}/user/facebook-login`, {
            facebookUserEmail: facebookAccountData.email,
        }).then((response) => {
            if (response.data.loggedIn) {
                const loggedIn = {
                    username: response.data.username,
                    email: response.data.email
                }

                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
                setTimeout(() => {
                    history.push("/");
                }, 200);
            }

            response.data.message === "Logged in Successful!"
                ? toast.success(response.data.message)
                : toast.info(response.data.message)
        })
    }

    return (
        <div>
            <Form className="login-form mx-auto p-4 pb-0">
                <h3 className="text-center mb-2 login-head">Login</h3>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label className="text-color-auth">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="login-form-input"
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label className="text-color-auth">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="login-form-input"
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </Form.Group>

                <div className="text-end text-decoration-none">
                    <Link
                        to="/forgot_password"
                        className="text-decoration-none primary-color forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <strong className="text-center d-flex justify-content-center m-2 text-color-auth">
                    {message}
                </strong>

                <button
                    className="d-grid col-12 btn-main login-form-button"
                    variant="primary"
                    type="submit"
                    onClick={login}
                    disabled={!email || !password}
                >
                    {saveLoading
                        ? <BeatLoader color={"#fff"} size={10} />
                        : "Login"
                    }
                </button>

                <div style={{ position: "relative" }}>
                    <hr className="sl-hr" />
                    <small className="sl-or">OR</small>
                </div>

                <div className="social-logins">
                    <GoogleLogin
                        clientId={googleClientId}
                        buttonText="Login"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <div className="sl-icon">
                                <div
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <ImGoogle3 style={{ fontSize: "1.3rem" }} />
                                </div>
                            </div>
                        )}
                    />

                    <FacebookLogin
                        appId={facebookAppId}
                        fields="name,email,picture"
                        callback={handleFacebookLoginSuccess}
                        render={renderProps => (
                            <div className="sl-icon">
                                <div onClick={renderProps.onClick}>
                                    <FaFacebook style={{ fontSize: "1.3rem" }} />
                                </div>
                            </div>
                        )}
                    />

                    <div className="sl-icon">
                        <div>
                            <FaApple style={{ fontSize: "1.3rem" }} />
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default LoginComp
