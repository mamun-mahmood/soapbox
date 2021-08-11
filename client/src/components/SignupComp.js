import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SignupComp = () => {
    const history = useHistory();

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            history.push("/home");
        }
    }, [])

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = (event) => {
        event.preventDefault();

        axios.post(`${BaseURL}/user/signup`, {
            username,
            email,
            password,
        }).then((response) => {
            history.push("/login");
        })
    }

    return (
        <div>
            <Form className="login-form mx-auto p-4 pb-0">
                <h1 className="text-center mb-4 signup-head">Sign Up</h1>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        disabled
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
                        disabled
                    />
                </Form.Group>

                <Button
                    className="d-grid col-12"
                    variant="primary"
                    type="submit"
                    onClick={signup}
                    disabled={!username || !email || !password}
                >
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default SignupComp
