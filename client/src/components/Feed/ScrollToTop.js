import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUp } from 'react-icons/fi'
import './feed.css'

const ScrollToTop = () => {

    const GoToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="extra d-flex justify-content-center">
            <div className="btn-top">
                <Link
                    to="#"
                    onClick={GoToTop}
                >
                    <span>
                        Back to Top
                    </span>
                    <FiArrowUp className="up-arrow" />
                </Link>
            </div>
        </div>
    )
}

export default ScrollToTop
