import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const LoginComp = () => {
    const history = useHistory();
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            setSaveLoading(false);
            // history.push("/home");
        }
    })

    const BaseURL = process.env.REACT_APP_API_URL;

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
                    setMessage(response.data.message);
                    setTimeout(() => {
                        // history.push("/home");
                        history.push("/");
                    }, 200);
                }
                setMessage(response.data.message);
            })
        }
        userLogin();

        // const userLoginToast = userLogin();
        // toast.promise(userLoginToast, {
        //     loading: 'logging in...',
        //     success: 'Login Successful',
        //     error: 'Login Unsuccessful',
        // });

        setTimeout(() => {
            setSaveLoading(false);
        }, 1000);
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
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </Form.Group>

                <div className="text-end text-decoration-none">
                    <Link to="/forgot-password" className="text-decoration-none primary-color forgot-password">Forgot Password?</Link>
                </div>

                <strong className="text-center d-flex justify-content-center m-2 text-color-auth">{message}</strong>

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
