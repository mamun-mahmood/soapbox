import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginComp from '../../components/LoginComp'
import SignupComp from '../../components/SignupComp'
import './landingPage.css'

const LandingPage = () => {
    const [toggle, setToggle] = useState(true);

    return (
        <div className="page">
            <nav className="nav">
                <div className="brand">
                    <Link to="/" class="navbar-brand cursor-pointer">
                        <img
                            src="/images/soapbox_favicon_.ico"
                            alt="Megahoot Soapbox"
                            width="50"
                            height="50"
                            class="d-inline-block align-text-top"
                        />
                    </Link>
                    <Link className="brand-name" to="/">Soapbox</Link>
                </div>

                <ul className="list-inline">
                    <div className="title">
                        How Soapbox Works
                    </div>
                    <div className="title">
                        Soapbox FAQ
                    </div>
                    <div className="title">
                        Subscriptions
                    </div>
                    <div className="title">
                        <a href="https://www.megahoot.com/">
                            MegaHoot Tech
                        </a>
                    </div>
                </ul>
            </nav>

            <main className="landing-page">
                <div className="landing-ls">
                    <img src="./images/soapbox_landing_image" alt="soapbox_landing_page" />
                </div>
                <div className="landing-rs">
                    {toggle ? <LoginComp /> : <SignupComp />}

                    {toggle ?
                        <div className="text-center text-decoration-none mt-2">
                            <small>New to Soapbox? </small>
                            <Link onClick={() => { setToggle(false) }} className="text-decoration-none primary-color"> Sign up</Link><br />
                        </div>
                        :
                        <div className="text-center text-decoration-none mt-2">
                            <small>Already have an account? </small>
                            <Link onClick={() => { setToggle(true) }} className="text-decoration-none primary-color">Login</Link>
                        </div>}
                </div>
            </main>

            <footer>
                &copy; <strong>Copyright MegaHoot Technologies, Inc</strong> All Rights Reserved
            </footer>
        </div>
    )
}

export default LandingPage
