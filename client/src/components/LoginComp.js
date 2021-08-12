import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

const LoginComp = () => {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            history.push("/home");
        }
    })

    const BaseURL = process.env.REACT_APP_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = (event) => {
        event.preventDefault()

        axios.post(`${BaseURL}/user/login`, {
            email,
            password,
        }).then((response) => {
            console.log(response);

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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </Form.Group>

                <div className="text-end text-decoration-none">
                    <Link to="/forgot-password" className="text-decoration-none primary-color">Forgot Password?</Link>
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
                    Login
                </button>

            </Form>
        </div>
    )
}

export default LoginComp
