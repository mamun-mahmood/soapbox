import React, { Fragment } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'

const NavBar = () => {
    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    var username = "";

    if (userInfo) {
        username = userInfo.username;
    }

    const logout = () => {
        history.push("/login");
        localStorage.clear();
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top"
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className="container">
                    <Link to={window.location.pathname} class="navbar-brand cursor-pointer">
                        <img
                            src="/images/MegaHoot_Owl3_app.png"
                            alt="Megahoot Soapbox"
                            width="50"
                            height="50"
                            class="d-inline-block align-text-top"
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={scrollToTop}
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        {localStorage.getItem("loggedIn") ?
                            <Fragment>
                                <NavLink
                                    activeClassName="nav-link-active"
                                    className="nav-link"
                                    to="/home"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    activeClassName="nav-link-active"
                                    className="nav-link"
                                    to="/create"
                                >
                                    Create Hoot
                                </NavLink>
                                <NavLink
                                    activeClassName="nav-link-active"
                                    className="nav-link"
                                    to={`/profile/${username}`}
                                >
                                    {userInfo && userInfo.username}
                                </NavLink>
                                <NavLink
                                    exact
                                    activeClassName="nav-link-active"
                                    className="nav-link"
                                    to="/"
                                    onClick={logout}
                                >
                                    Logout
                                </NavLink>
                            </Fragment>
                            :
                            <Fragment>
                                <NavLink
                                    exact
                                    activeClassName="nav-link-active"
                                    className="nav-link"
                                    to="/"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    exact
                                    activeClassName="nav-link-active"
                                    className="nav-link"
                                    to="/"
                                >
                                    Sign Up
                                </NavLink>
                            </Fragment>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
