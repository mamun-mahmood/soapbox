import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginComp from '../../components/LoginComp'
import SignupComp from '../../components/SignupComp'
import './landingPage.css'

const LandingPage = () => {
    const [toggle, setToggle] = useState(true);
    const locattion = useLocation();

    const disableRightClick = () => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    return (
        <div className="page">
            <nav className="nav">
                <div className="brand">
                    <Link to="/" class="navbar-brand cursor-pointer">
                        <div className="outer-img">
                            <a href={locattion.pathname}>
                                <img
                                    onContextMenu={(e) => e.preventDefault()}
                                    src="/images/MegaHoot_Owl3_app.png"
                                    alt="Megahoot Soapbox"
                                    class="d-inline-block align-text-top"
                                />
                            </a>
                        </div>
                    </Link>
                    {/* <Link className="brand-name" to="/">Soapbox</Link> */}
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
                    <a href={locattion.pathname}>
                        <img
                            onContextMenu={(e) => e.preventDefault()}
                            src="./images/soapbox_landing_image"
                            alt="soapbox_landing_page"
                        />
                    </a>
                    <span>
                        MegaHoot Soapbox where members monetize their social media time
                    </span>
                </div>
                <div className="landing-rs">
                    {toggle ? <LoginComp /> : <SignupComp />}

                    {toggle ?
                        <div className="text-center text-decoration-none mt-2">
                            <small>New to Soapbox? </small>
                            <Link onClick={() => { setToggle(false) }} className="text-decoration-none primary-color fw-bold"> Sign up</Link><br />
                        </div>
                        :
                        <div className="text-center text-decoration-none mt-2">
                            <small>Already have an account? </small>
                            <Link onClick={() => { setToggle(true) }} className="text-decoration-none primary-color fw-bold">Login</Link>
                        </div>}
                </div>
            </main>

            <footer>
                <strong>&copy; Copyright MegaHoot Technologies, Inc</strong> All Rights Reserved
                <span>
                    Privacy Policy
                </span>
                <span>
                    Terms & Conditions
                </span>
            </footer>
        </div>
    )
}

export default LandingPage
