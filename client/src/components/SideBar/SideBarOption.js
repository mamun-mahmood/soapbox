import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBarOption = ({ option, link, Icon, looks }) => {
    return (
        <li >
            <NavLink
                activeClassName="sidebar-option-active"
                className={looks}
                to={link}
            >
                <Icon className={"sidebar-icon"} />
                <span>
                    {option}
                </span>
            </NavLink>
        </li>
    )
}

export default SideBarOption
