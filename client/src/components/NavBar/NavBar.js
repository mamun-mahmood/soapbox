import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { IoCloseOutline } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { HiMenuAlt3 } from 'react-icons/hi';
import './navbar.css';
import axios from 'axios';
import { SoapboxTooltip } from '../SoapboxTooltip';
import CreatePublicHoot from '../../pages/CreatePublicHoot';
import { MyPublicHootBox } from '../../context/MyPublicHootBoxContext';

const NavBar = ({ width, header, height, privateUserImage, showExtraFeatures, setShowExtraFeatures }) => {
    const history = useHistory();
    const [showLinks, setShowLinks] = useState(false);
    const [userData, setUserData] = useState([]);

    const {
        showNavCreatePublicHoot,
        setShowNavCreatePublicHoot,
        setShowFloatingCreatePublicHoot
    } = useContext(MyPublicHootBox);

    useEffect(() => {
        if (showNavCreatePublicHoot) {
            setShowFloatingCreatePublicHoot(false);
        }
    }, [showNavCreatePublicHoot]);

    const BaseURL = process.env.REACT_APP_API_URL;

    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    var username = "";

    if (userInfo) {
        username = userInfo.username;
    }

    //getting user data
    useEffect(() => {
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${userInfo && userInfo.username}`)
                .then((response) => {
                    setUserData(response.data[0]);
                });
        }

        try {
            getUserData();
        } catch (error) {
            console.log(error);
        }
    }, [userInfo && userInfo.username])

    const logout = () => {
        toast.success('logout Successful');
        history.push("/login");
        localStorage.clear();
    }

    const scrollToTop = () => window.scrollTo(0, 0);

    return (
        <nav className="main-nav shadow-sm" style={{ zIndex: "11111" }}>
            <div className="max-width-nav" style={{ maxWidth: width, height: height }}>
                <div className="main-brand">
                    <Link to="/All-Hoots" className="navbar-brand cursor-pointer">
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

                {userData && userData.privateChannel && privateUserImage
                    ? <SoapboxTooltip title={showExtraFeatures ? "Hide Profile" : "Show Profile"} placement="bottom">
                        <div
                            className="extra-div-block"
                            onClick={() => setShowExtraFeatures(!showExtraFeatures)}
                        >
                            <img
                                src={privateUserImage}
                                alt={userData.username}
                            />
                        </div>
                    </SoapboxTooltip>
                    : null
                }

                <ul className="main-list-inline" id={showLinks ? height ? "private-main-hidden" : "main-hidden" : ""}>
                    {localStorage.getItem("loggedIn")
                        ? <Fragment>
                            {userData.privateChannel && header
                                ? null
                                : <NavLink
                                    activeClassName=""
                                    className="nav-link main-title"
                                    to="/All-Hoots"
                                >
                                    Home
                                </NavLink>
                            }

                            {userData.privateChannel && header
                                ? null
                                : <a
                                    activeClassName="nav-link-active"
                                    className="nav-link main-title"
                                    target="_blank"
                                    href="https://www.megahoot.com/megahoot-soapbox/megahoot-soapbox-tutorials/"
                                >
                                    Tutorial
                                </a>
                            }

                            {userData && userData.privateChannel && header
                                ? null
                                : <Link
                                    // activeClassName="nav-link-active"
                                    activeClassName=""
                                    className="nav-link main-title"
                                    to={window.location.pathname === "/create-private"
                                        ? "/create-private"
                                        : userData.privateChannel && header
                                            ? "/create-private"
                                            : showNavCreatePublicHoot ? "#" : "#create-hoot"
                                    }
                                >
                                    {window.location.pathname === "/create-private"
                                        ? "Create Private Hoot"
                                        : userData.privateChannel && header
                                            ? "Create Private Hoot"
                                            : <span
                                                onClick={() => {
                                                    if (showNavCreatePublicHoot) {
                                                        document.getElementById("slideH").style.transition = "2sec";
                                                        document.getElementById("slideH").style.left = "-200vw";

                                                        setTimeout(() => {
                                                            setShowNavCreatePublicHoot(false);
                                                        }, 1000);
                                                    } else {
                                                        setTimeout(() => {
                                                            setShowNavCreatePublicHoot(true);

                                                            if (document.getElementById("slideH")) {
                                                                document.getElementById("slideH").style.transition = "2sec";
                                                                document.getElementById("slideH").style.left = "50%";
                                                                document.getElementById("slideH").style.top = "14.5rem";
                                                                document.getElementById("slideH").style.transform = "translate(-50%, -50%)";
                                                            }
                                                        }, 1);
                                                    }
                                                }}
                                            >
                                                Create Hoot
                                            </span>
                                    }
                                </Link>
                            }

                            <NavLink
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
                                to={`/profile/${username}`}
                            >
                                {userInfo && userInfo.username}
                            </NavLink>

                            {showLinks &&
                                <NavLink
                                    exact
                                    activeClassName="nav-link-active"
                                    className="nav-link main-title"
                                    to="/explore"
                                >
                                    Explore
                                </NavLink>
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
                        : <Fragment>
                            <a
                                activeClassName="nav-link-active"
                                className="nav-link main-title"
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

                {showLinks
                    ? <IoCloseOutline className="main-nav-menu" onClick={() => setShowLinks(!showLinks)} />
                    : <HiMenuAlt3 className="main-nav-menu" onClick={() => setShowLinks(!showLinks)} />
                }
            </div>

            {showNavCreatePublicHoot ? (
                <div className="slide-container">
                    <div id="slideH" className='sHn-responsive' style={{ top: "14.5rem", boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;" }}>
                        <CreatePublicHoot
                            closeHoot={() => {
                                document.getElementById("slideH").style.transition = "1sec";
                                document.getElementById("slideH").style.right = "-200vw";

                                setTimeout(() => {
                                    setShowNavCreatePublicHoot(false);
                                    window.location.reload(false);
                                }, 1000);
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </nav>
    )
}

export default NavBar
