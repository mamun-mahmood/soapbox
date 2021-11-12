import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ImGoogle3 } from 'react-icons/im'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const SignupComp = ({ handleChange }) => {
    const history = useHistory();

    const BaseURL = process.env.REACT_APP_API_URL;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            history.push("/");
        }
    }, [])

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const signup = (event) => {
        event.preventDefault();

        axios.post(`${BaseURL}/user/signup`, {
            name,
            username,
            email,
            password,
        }).then((response) => {
            response.data.message === "Signup Successful!"
                ? (toast.success(response.data.message),
                    setTimeout(() => {
                        handleChange(true);
                    }, 1000))
                : toast.info(response.data.message)
        })
    }

    const handleGoogleLoginSuccess = googleAccountData => {
        setName(googleAccountData.profileObj.name);
        setEmail(googleAccountData.profileObj.email);

        toast.info("Please fill Additional fields!");
    }

    const handleFacebookLoginSuccess = facebookAccountData => {
        setName(facebookAccountData.name);
        setEmail(facebookAccountData.email);

        toast.info("Please fill Additional fields!");
    }

    const handleGoogleLoginFailure = (response) => { }

    return (
        <div>
            <Form className="login-form mx-auto p-4 pb-0">
                <h3 className="text-center mb-1 signup-head">Sign Up</h3>
                <Form.Group className="mb-1" controlId="formBasicName">
                    <Form.Label className="text-color-auth">Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name}
                        className="login-form-input"
                        onChange={(event) => { setName(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicUsername">
                    <Form.Label className="text-color-auth">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="login-form-input"
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                    <Form.Text className="text-muted">
                        Username can not be changed once created.
                    </Form.Text>
                </Form.Group>

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

                <strong className="text-center d-flex justify-content-center m-2 text-color-auth">
                    {message}
                </strong>

                <button
                    className="d-grid col-12 btn-main login-form-button"
                    variant="primary"
                    type="submit"
                    onClick={signup}
                    disabled={!email || !password || !username || !name}
                >
                    Sign Up
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
                                <div
                                    onClick={renderProps.onClick}
                                >
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

export default SignupComp
