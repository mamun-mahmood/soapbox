import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import "./landingPage.css";
import SoapboxLogo from "../../assets/SoapboxLogo_2023.svg";
const LandingNav = () => {
  const locattion = useLocation();
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="nav">
      <div className="main-brand">
        <Link to="/" className="navbar-brand cursor-pointer">
          <div className="outer-img">
            <a href={locattion.pathname}>
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={SoapboxLogo}
                alt="Megahoot Soapbox"
                className="d-inline-block align-text-top"
              />
            </a>
          </div>
        </Link>
      </div>

      <ul className="list-inline" id={showLinks ? "hidden" : ""}>
        <div className="title">
          <a
            href="https://www.megahoot.com/megahoot-soapbox/"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Soapbox Works
          </a>
        </div>
        <div className="title">Soapbox FAQ</div>
        <div className="title">Subscriptions</div>
        <div className="title">
          <a
            href="https://www.megahoot.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MegaHoot Tech
          </a>
        </div>
      </ul>
      {showLinks ? (
        <IoCloseOutline
          className="nav-menu"
          onClick={() => setShowLinks(!showLinks)}
        />
      ) : (
        <FiMenu className="nav-menu" onClick={() => setShowLinks(!showLinks)} />
      )}
    </nav>
  );
};

export default LandingNav;
