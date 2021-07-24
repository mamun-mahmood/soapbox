import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const PageNotFound = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="text-center page-404-not-found">
                <h3>Sorry, this page isn't available.</h3>
                <h6 style={{ color: "#8E8E8E" }}>The link you followed may be broken, or the page may have been removed. Go back to
                    <Link to="/home" className="primary-color home-link"> Home Page</Link>
                </h6>
                <img className="page-404 my-4" src="/images/page_not_found.svg" alt="404 Page not Found" />
            </div>
        </Fragment>
    )
}

export default PageNotFound
