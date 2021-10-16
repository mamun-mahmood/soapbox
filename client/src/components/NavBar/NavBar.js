import React, { Fragment, useState } from 'react'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import { IoCloseOutline } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import './navbar.css';

const NavBar = ({ width, header }) => {
    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    var username = "";

    if (userInfo) {
        username = userInfo.username;
    }

    const logout = () => {
        toast.success('logout Successful'
            // , {
            //     style: {
            //         border: '2px solid #8249A0',
            //         color: '#8249A0',
            //     },
            //     iconTheme: {
            //         primary: '#8249A0',
            //         secondary: '#FFFAEE',
            //     },
            // }
        );

        history.push("/login");
        localStorage.clear();
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    const locattion = useLocation();
    const [showLinks, setShowLinks] = useState(false);

    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top"
        //         onContextMenu={(e) => e.preventDefault()}
        //     >
        //         <div className="container">
        //             <Link to="/home" className="navbar-brand cursor-pointer">
        //                 {/* {window.location.pathname} */}
        //                 <img
        //                     src="/images/MegaHoot_Owl3_app.png"
        //                     alt="Megahoot Soapbox"
        //                     width="50"
        //                     height="50"
        //                     className="d-inline-block align-text-top"
        //                     onContextMenu={(e) => e.preventDefault()}
        //                     onClick={scrollToTop}
        //                 />
        //             </Link>

        //             <button
        //                 className="navbar-toggler"
        //                 type="button"
        //                 data-bs-toggle="collapse"
        //                 data-bs-target="#navbarTogglerDemo02"
        //                 aria-controls="navbarTogglerDemo02"
        //                 aria-expanded="false"
        //                 aria-label="Toggle navigation"
        //             >
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>

        //             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        //                 {localStorage.getItem("loggedIn") ?
        //                     <Fragment>
        //                         <NavLink
        //                             activeClassName="nav-link-active"
        //                             className="nav-link"
        //                             to="/home"
        //                         >
        //                             Home
        //                         </NavLink>
        //                         <NavLink
        //                             activeClassName="nav-link-active"
        //                             className="nav-link"
        //                             to="/create"
        //                         >
        //                             Create Hoot
        //                         </NavLink>
        //                         <NavLink
        //                             activeClassName="nav-link-active"
        //                             className="nav-link"
        //                             to={`/profile/${username}`}
        //                         >
        //                             {userInfo && userInfo.username}
        //                         </NavLink>
        //                         <NavLink
        //                             exact
        //                             activeClassName="nav-link-active"
        //                             className="nav-link"
        //                             to="/"
        //                             onClick={logout}
        //                         >
        //                             Logout
        //                         </NavLink>
        //                     </Fragment>
        //                     :
        //                     <Fragment>
        //                         <NavLink
        //                             exact
        //                             activeClassName="nav-link-active"
        //                             className="nav-link"
        //                             to="/"
        //                         >
        //                             Login
        //                         </NavLink>
        //                         <NavLink
        //                             exact
        //                             activeClassName="nav-link-active"
        //                             className="nav-link"
        //                             to="/"
        //                         >
        //                             Sign Up
        //                         </NavLink>
        //                     </Fragment>
        //                 }
        //             </div>
        //         </div>
        //     </nav>
        // </div>
        <nav className="main-nav shadow-sm" style={{ zIndex: "11111" }}>
            <div className="max-width-nav" style={{ maxWidth: width }}>
                <div className="main-brand">
                    {/* <Link to="/home" className="navbar-brand cursor-pointer"> */}
                    <Link to="/" className="navbar-brand cursor-pointer">
                        <img
                            src="/images/MegaHoot_Owl3_app.png"
                            alt="Megahoot Soapbox"
                            className="d-inline-block align-text-top"
                            onClick={scrollToTop}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </Link>
                    <div className="nav-header">
                        {header}
                    </div>
                </div>

                <ul className="main-list-inline" id={showLinks ? "main-hidden" : ""}>
                    {localStorage.getItem("loggedIn") ?
                        <Fragment>
                            <NavLink
                                // activeClassName="nav-link-active"
                                activeClassName=""
                                className="nav-link main-title"
                                // to="/home"
                                to="/"
                            >
                                Home
                            </NavLink>
                            <a
                                // activeClassName="nav-link-active"
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                // to="/home"
                                target="_blank"
                                href="https://www.megahoot.com/megahoot-soapbox/megahoot-soapbox-tutorials/"
                            >
                                Tutorial
                            </a>
                            <NavLink
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                to="/create"
                            >
                                Create Hoot
                            </NavLink>
                            <NavLink
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                to={`/profile/${username}`}
                            >
                                {userInfo && userInfo.username}
                            </NavLink>
                            {showLinks &&
                                <Fragment>
                                    <NavLink
                                        exact
                                        activeClassName="nav-link-active"
                                        className="nav-link main-title"
                                        to="/explore"
                                    >
                                        Explore
                                    </NavLink>
                                </Fragment>
                            }
                            <NavLink
                                exact
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                to="/login"
                                onClick={logout}
                            >
                                Logout
                            </NavLink>
                        </Fragment>
                        :
                        <Fragment>
                            <a
                                // activeClassName="nav-link-active"
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                // to="/home"
                                target="_blank"
                                href="https://www.megahoot.com/megahoot-soapbox/megahoot-soapbox-tutorials/"
                            >
                                Tutorial
                            </a>
                            <NavLink
                                exact
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                to="/login"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                exact
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                to="/login"
                            >
                                Sign Up
                            </NavLink>


                        </Fragment>
                    }

                </ul>
                {
                    showLinks
                        ?
                        <IoCloseOutline className="main-nav-menu" onClick={() => setShowLinks(!showLinks)} />
                        :
                        <FiMenu className="main-nav-menu" onClick={() => setShowLinks(!showLinks)} />
                }
            </div>
        </nav>
    )
}

export default NavBar
