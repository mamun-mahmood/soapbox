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
                            src="/images/soapbox_img"
                            alt="Megahoot Soapbox"
                            width="190"
                            height="45"
                            class="d-inline-block align-text-top"
                        />
                    </Link>
                    {/* <a class="navbar-brand cursor-pointer">
                        <img src="/images/soap-box-logo-1" alt="" width="50" height="50" class="d-inline-block align-text-top" />
                    </a>
                    <Link className="fw-bolder fs-4 nav-brand navbar-brand" to="/home">Soap Box</Link> */}
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
                                <Link className="nav-link" to="/login" onClick={logout}><HiOutlineLogout /></Link>
                            </Fragment>
                            :
                            <Fragment>
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                                <Link className="nav-link" to="/login">Login</Link>
                            </Fragment>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
