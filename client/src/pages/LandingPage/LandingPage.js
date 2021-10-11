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
                                src="./images/MegaHoot_Soapbox_LandingPage_600_2_web.png"
                                alt="MegaHoot Soapbox"
                            />
                        </a>
                        <div className="landing-text">
                            <p>
                                MegaHoot Soapbox Where Content Creators Monetize Their Private Clubs, Virtual Experiences, Personal Messages and Build Their Brand, Build Their Business With No Startup Cost.
                            </p>
                            <p>
                                Content Creators can offer monthly membership subscriptions for their Private Club, have one time or weekly PPV live events with ticket sales, offer personal messages and live one on one OR group Vero Calls. They will be able to offer their members, their fans, the ability to join their live broadcast on MegaHoot Soapbox and interact in real time with the chat feature. Members will be able to engage in the Private Clubs with interactive chats with the host, with other members and in some cases post approved listings in the Clubs Marketplace.
                            </p>
                            <p>
                                Content Creators find a great partner in MegaHoot Technologies with MegaHoot Soapbox, maximizing the benefits of our content partners.
                            </p>
                            {/* <p>
                                <ul>
                                    <li>
                                        FastTrack to account verification
                                    </li>
                                    <li>
                                        Higher content partner payouts plus unique incentives
                                    </li>
                                    <li>
                                        Access to other MegaHoot Technologies products
                                    </li>
                                    <li>
                                        Pay Per View creation with ticketing with no startup cost
                                    </li>
                                    <li>
                                        Access to selling digital products and collectibles
                                    </li>
                                    <li>
                                        NFT Partnership Opportunities
                                    </li>
                                    <li>
                                        Fraud protection for both creators and members
                                    </li>
                                    <li>
                                        Authentication System for Autographs and much more
                                    </li>
                                </ul>
                            </p> */}
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
