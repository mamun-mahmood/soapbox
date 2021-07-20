import React from 'react'
import { Link } from 'react-router-dom'

const SideBarOption = ({ option, link, Icon }) => {
    return (
        <li>
            <Link to={link}>
                <Icon className="sidebar-icon" />
                <span>
                    {option}
                </span>
            </Link>
        </li>
    )
}

export default SideBarOption
