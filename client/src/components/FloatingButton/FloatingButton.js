import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import './floatingButton.css'

const FloatingButton = () => {
    return (
        <div className="float">
            <Link to="/create">
                <FiPlus className="plus" />
            </Link>
        </div>
    )
}

export default FloatingButton
