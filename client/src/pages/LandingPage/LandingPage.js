import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from "react-helmet";
import LoginComp from '../../components/LoginComp'
import SignupComp from '../../components/SignupComp'
import './landingPage.css'

const LandingPage = () => {
    const [toggle, setToggle] = useState(true);
    const locattion = useLocation();

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
                </div>

                <ul className="list-inline">
                    <div className="title">
                        <a href="https://www.megahoot.com/megahoot-soapbox/" target="_blank" rel="nofollow">
                            How Soapbox Works
                        </a>
                    </div>
                    <div className="title">
                        Soapbox FAQ
                    </div>
                    <div className="title">
                        Subscriptions
                    </div>
                    <div className="title">
                        <a href="https://www.megahoot.com/" target="_blank" rel="nofollow">
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
                        MegaHoot Soapbox Where Members Monetize Their Social Media Time
                    </span>
                </div>
                <div className="landing-rs">
                    <div>
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
                            </div>
                        }
                    </div>
                    <div className="invitation-only">
                        <div>
                            MegaHoot Soapbox <small className="badge solid-badge">BETA</small>
                        </div>
                        <div>
                            Temporary Invitation Only
                        </div>
                    </div>
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

            <Helmet>
                {/* General tags */}
                <title>
                    MegaHoot Soapbox
                </title>
                <meta name="description" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                {/* <meta name="image" content={ } /> */}

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/" />
                <meta property="og:title" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                <meta property="og:description" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                <meta property="og:image" content="https://drive.google.com/file/d/1kGbf20hrxL-lkDiDkJlVCdBvd4ylrsJg/view?usp=sharing" />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                <meta name="twitter:description" content="MegaHoot Soapbox Where Members Monetize Their Social Media Time" />
                <meta name="twitter:image" content="https://drive.google.com/file/d/1kGbf20hrxL-lkDiDkJlVCdBvd4ylrsJg/view?usp=sharing" />
            </Helmet>
        </div>
    )
}

export default LandingPage
