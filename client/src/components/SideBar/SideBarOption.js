import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBarOption = ({ option, link, Icon, looks }) => {
    return (
        <li>
            {link
                ?
                <NavLink
                    activeClassName={option === "Home" ? null : "sidebar-option-active"}
                    className={looks}
                    to={link}
                >
                    <Icon className={"sidebar-icon"} />
                    <span>
                        {option}
                    </span>
                </NavLink>
                :
                <a
                    activeClassName="sidebar-option-active"
                    className={looks}
                    href="soapbox:;"
                >
                    <Icon className={"sidebar-icon"} />
                    <span>
                        {option}
                    </span>
                </a>
            }
        </li>
    )
}

export default SideBarOption
