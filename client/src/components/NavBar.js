import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';

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

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
                <div className="container">
                    <Link to="/home" class="navbar-brand cursor-pointer">
                        <img
                            src="/images/MegaHoot_Owl3_app.png"
                            alt="Megahoot Soapbox"
                            width="50"
                            height="50"
                            class="d-inline-block align-text-top"
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
                                <Link className="nav-link" to="/public-profile"><BiSearch /></Link>
                                <Link className="nav-link" to="/home">Home</Link>
                                <Link className="nav-link" to="/create">Create Hoot</Link>
                                <Link className="nav-link" to={`/profile/${username}`}>{userInfo && userInfo.username}</Link>
                                <Link className="nav-link" to="/" onClick={logout}><HiOutlineLogout /></Link>
                            </Fragment>
                            :
                            <Fragment>
                                <Link className="nav-link" to="/login">Login</Link>
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </Fragment>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
