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
                    <div className="img-text">
                        <a href={locattion.pathname}>
                            <img
                                onContextMenu={(e) => e.preventDefault()}
                                src="./images/soapbox_landing_image"
                                alt="soapbox_landing_page"
                            />
                        </a>
                        <div className="landing-text">
                            MegaHoot Soapbox Where Content Creators Monetize Their Private Channels and Build Their Brand, Build Their Business With No Startup Cost.
                            <br />
                            <br />
                            Content Creators can offer monthly subscriptions or have one time events with ticket sales or both. They will be able to offer their subscribers , their fans , the ability to join their live broadcast on MegaHoot Soapbox and interact in real time, this can be one on one or for large audiences.
                        </div>
                    </div>
                    <span>
                        MegaHoot Brings Value to Content Creators Globally
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
                            Temporarily Invitation Only
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
                    MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels
                </title>
                <meta name="description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                {/* <meta name="image" content={ } /> */}

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/" />
                <meta property="og:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </div>
    )
}

export default LandingPage
