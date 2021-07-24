import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      history.push("/home");
    }
  }, [])

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
        // localStorage.setItem("loggedIn", true);
        // localStorage.setItem("email", response.data.email);

        const loggedIn = {
          username: response.data.username,
          email: response.data.email
        }

        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));

        setTimeout(() => {
          history.push('/home')
        }, "0");
      }
      setMessage(response.data.message);
    })
  }

  return (
    <Fragment>
      <NavBar />
      <div>
        <Form className="login-form mx-auto mt p-4">
          <h1 className="text-center mb-4">Login</h1>
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

          <Button
            className="d-grid col-12"
            variant="primary"
            type="submit"
            onClick={login}
            disabled={!email || !password}
          >
            Login
          </Button>

          <div className="text-center text-decoration-none mt-2">
            <small>New to Soap Box? </small>
            <Link to="/signup" className="text-decoration-none primary-color"> Sign up</Link><br />
          </div>
        </Form>
      </div>
    </Fragment>
  )
}

export default Login
