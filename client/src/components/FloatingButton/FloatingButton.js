import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { SoapboxTooltip } from '../SoapboxTooltip'
import hooticon from '../../assets/hoot-public.png'
import './floatingButton.css'

const FloatingButton = () => {
    return (
        <div className="float">
            <Link to="/create">
                <SoapboxTooltip title="Create Hoot" placement="left">
                <img src={hooticon}  className="hooticon" width="40px" />
                </SoapboxTooltip>
            </Link>
        </div>
    )
}

export default FloatingButton
