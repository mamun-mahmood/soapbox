import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Signup = () => {
    const history = useHistory();
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

        // let userInfo = { username, email, password }
        // console.log(userInfo);

        axios.post('http://localhost:3001/user/signup', {
            username,
            email,
            password,
        }).then((response) => {
            // console.log("response", response);
            // localStorage.setItem("user-info", JSON.stringify(userInfo));
            history.push("/login");
        })
    }

    return (
        <Fragment>
            <NavBar />
            <div>
                <Form className="login-form mx-auto mt p-4">
                    <h1 className="text-center mb-4">Sign Up</h1>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(event) => { setUsername(event.target.value) }}
                        />
                    </Form.Group>

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

                    <Button
                        className="d-grid col-12"
                        variant="primary"
                        type="submit"
                        onClick={signup}
                        disabled={!username || !email || !password}
                    >
                        Sign Up
                    </Button>

                    <div className="text-center text-decoration-none mt-2">
                        <small>Already have an account? </small>
                        <Link to="/login" className="text-decoration-none primary-color">Login</Link>
                    </div>
                </Form>
            </div>
        </Fragment>
    )
}

export default Signup
