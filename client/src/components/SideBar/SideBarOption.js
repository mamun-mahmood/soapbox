import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const SideBarOption = ({ option, link, Icon, looks }) => {
    return (
        <li >
            <Link className={looks} to={link}>
                <Icon className={"sidebar-icon"} />
                <span>
                    {option}
                </span>
            </Link>
        </li>
    )
}

export default SideBarOption
