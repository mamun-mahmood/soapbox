import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const LoginComp = () => {
    const history = useHistory();
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            setTimeout(() => {
                setSaveLoading(false);
                history.push("/home");
            }, 1000);
        }
    })

    const BaseURL = process.env.REACT_APP_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = (event) => {
        setSaveLoading(true);
        event.preventDefault()

        axios.post(`${BaseURL}/user/login`, {
            email,
            password,
        }).then((response) => {
            if (response.data.loggedIn) {
                const loggedIn = {
                    username: response.data.username,
                    email: response.data.email
                }
                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
            }
            setMessage(response.data.message);
        })
    }

    return (
        <div>
            <Form className="login-form mx-auto p-4 pb-0">
                <h1 className="text-center mb-4 login-head">Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-color-auth">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-color-auth">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </Form.Group>

                <div className="text-end text-decoration-none">
                    <Link to="/forgot-password" className="text-decoration-none primary-color forgot-password">Forgot Password?</Link>
                </div>

                <strong className="text-center d-flex justify-content-center m-2">{message}</strong>

                {/* <Button
                    className="d-grid col-12"
                    variant="primary"
                    type="submit"
                    onClick={login}
                    disabled={!email || !password}
                >
                    Login
                </Button> */}

                <button
                    className="d-grid col-12 btn-main"
                    variant="primary"
                    type="submit"
                    onClick={login}
                    disabled={!email || !password}
                >
                    {saveLoading
                        ?
                        <BeatLoader color={"#fff"} size={10} />
                        :
                        "Login"
                    }

                </button>

            </Form>
        </div>
    )
}

export default LoginComp
