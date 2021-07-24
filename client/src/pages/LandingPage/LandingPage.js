import React from 'react'
import { Link } from 'react-router-dom'
import './landingPage.css'

const LandingPage = () => {
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
                    <div className="btn-login">
                        <Link to="/login">
                            Login
                        </Link>
                    </div>
                    <div className="btn-signup">
                        <Link to="/signup">
                            Sign up
                        </Link>
                    </div>
                </ul>
            </nav>

            <main className="landing-page">
                <div className="landing-ls">
                    <img src="./images/soapbox_landing_image" alt="soapbox_landing_page" />
                </div>
                <div className="landing-rs">
                    <span>MegaHoot Soapbox where members monetize their social media time</span>
                </div>
            </main>
        </div>
    )
}

export default LandingPage
