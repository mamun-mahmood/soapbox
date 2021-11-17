import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBarOption = ({ option, link, Icon, looks }) => {
    return (
        <li>
            {link
                ?
                <NavLink
                    activeClassName={option === "All Hoots" ? null : "sidebar-option-active"}
                    className={looks}
                    to={link}
                >
                 
                    <img src={Icon} width={option==="All Hoots"?"20px":"24px"} className={"sidebar-icon"} />
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
                    <img src={Icon} width={option==="All Hoots"?"20px":"24px"} className={"sidebar-icon"} />
                    <span>
                        {option}
                    </span>
                </a>
            }
        </li>
    )
}

export default SideBarOption
