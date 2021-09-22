import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom'
import Loadable from 'react-loadable';
import LandingNav from './LandingNav';
import FormLoading from '../../components/Loading/FormLoading';
import './landingPage.css'

const LoginComp = Loadable({
    loader: () => import('../../components/LoginComp' /* webpackChunkName: "LoginComp" */),
    loading() {
        return <FormLoading />
    }
})
const SignupComp = Loadable({
    loader: () => import('../../components/SignupComp' /* webpackChunkName: "SignupComp" */),
    loading() {
        return <FormLoading />
    }
})

const LandingPage = () => {
    const [toggle, setToggle] = useState(true);
    const locattion = useLocation();

    const handleChange = (value) => {
        setToggle(value);
    }

    return (
        <div className="page">
            <LandingNav />

            <main className="landing-page">
                <div className="landing-ls">
                    <span>
                        MegaHoot Partnering with Content Creators Globally
                    </span>
                    <div className="img-text">
                        <a href={locattion.pathname}>
                            <img
                                onContextMenu={(e) => e.preventDefault()}
                                src="./images/MegaHootApp_mobilemockup_web_SPBX.png"
                                alt="MegaHoot Soapbox"
                            />
                        </a>
                        <div className="landing-text">
                            <p>
                                MegaHoot Soapbox Where Content Creators Monetize Their Private Channels and Build Their Brand, Build Their Business With No Startup Cost.
                            </p>
                            <p>
                                Content Creators can offer monthly subscriptions or have one time events with ticket sales or both. They will be able to offer their subscribers , their fans , the ability to join their live broadcast on MegaHoot Soapbox and interact in real time, this can be one on one or for large audiences.
                            </p>
                            <p>
                                Content Creators come partner with MegaHoot Technologies and maximize the benefits from working with us.
                            </p>
                            <p>
                                <ul>
                                    <li>
                                        FastTrack to account verification, that badge everyone wants.
                                    </li>
                                    <li>
                                        Higher content partner payouts plus unique incentives
                                    </li>
                                    <li>
                                        Access to other MegaHoot Technologies products
                                    </li>
                                    <li>
                                        Create a PPV live event with ticketing at no initial cost to you
                                    </li>
                                    <li>
                                        Access to selling your digital products
                                    </li>
                                    <li>
                                        Partnership level growth initiative system and much more
                                    </li>
                                    <li>
                                        NFT Partnership Opportunities
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="landing-rs">
                    <div>
                        {toggle ? <LoginComp /> : <SignupComp handleChange={handleChange} />}

                        {toggle ?
                            <div className="text-center text-decoration-none mt-2">
                                <small className="text-color-auth">New to Soapbox? </small>
                                <Link onClick={() => { setToggle(false) }} className="text-decoration-none primary-color fw-bold"> Sign up</Link><br />
                            </div>
                            :
                            <div className="text-center text-decoration-none mt-2">
                                <small className="text-color-auth">Already have an account? </small>
                                <Link onClick={() => { setToggle(true) }} className="text-decoration-none primary-color fw-bold">Login</Link>
                            </div>
                        }
                    </div>
                    <div className="invitation-only">
                        <div>
                            MegaHoot Soapbox <small className="landing-badge landing-solid-badge">BETA</small>
                        </div>
                        <div>
                            Free to join
                        </div>
                    </div>
                    <div className="go-to-feed">
                        {/* <Link to="/home"> */}
                        <Link to="/">
                            <button>
                                Go to Feed
                            </button>
                        </Link>
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

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta name="twitter:image" content="/images/MegaHoot_Owl3_app.png" />

                {/* OpenGraph tags */}
                <meta property="og:url" content="https://www.megahoot.net/" />
                <meta property="og:title" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:description" content="MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels" />
                <meta property="og:image" content="/images/MegaHoot_Owl3_app.png" />
            </Helmet>
        </div>
    )
}

export default LandingPage
