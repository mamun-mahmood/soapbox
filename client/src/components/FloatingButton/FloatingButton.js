import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { SoapboxTooltip } from '../SoapboxTooltip'
import './floatingButton.css'

const FloatingButton = () => {
    return (
        <div className="float">
            <Link to="/create">
                <SoapboxTooltip title="Create Hoot" placement="left">
                    <div>
                        <FiPlus className="plus" />
                    </div>
                </SoapboxTooltip>
            </Link>
        </div>
    )
}

export default FloatingButton
