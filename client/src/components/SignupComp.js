import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SignupComp = ({ handleChange }) => {
    const history = useHistory();

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            // history.push("/home");
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
            setMessage(response.data.message)
        })
    }

    if (message == "Signup Successful!") {
        setTimeout(() => {
            handleChange(true);
        }, 1000);
    }

    return (
        <div>
            <Form className="login-form mx-auto p-4 pb-0">
                <h3 className="text-center mb-1 signup-head">Sign Up</h3>
                <Form.Group className="mb-1" controlId="formBasicText">
                    <Form.Label className="text-color-auth">Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name}
                        className="login-form-input"
                        onChange={(event) => { setName(event.target.value) }}
                    // disabled
                    />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicText">
                    <Form.Label className="text-color-auth">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="login-form-input"
                        onChange={(event) => { setUsername(event.target.value) }}
                    // disabled
                    />
                    <Form.Text className="text-muted">
                        Note: username can not be changed once created.
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
                    // disabled
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
                    // disabled
                    />
                </Form.Group>

                {/* <Button
                    className="d-grid col-12"
                    variant="primary"
                    type="submit"
                    onClick={signup}
                    disabled={!username || !email || !password}
                >
                    Sign Up
                </Button> */}

                <strong className="text-center d-flex justify-content-center m-2 text-color-auth">{message}</strong>

                <button
                    className="d-grid col-12 btn-main login-form-button"
                    variant="primary"
                    type="submit"
                    onClick={signup}
                    disabled={!email || !password || !username || !name}
                >
                    Sign Up
                </button>

            </Form>
        </div>
    )
}

export default SignupComp
