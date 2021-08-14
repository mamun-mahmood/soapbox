import React, { Fragment } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import IndividualHoot from './IndividualHoot/IndividualHoot'
import FloatingButton from '../components/FloatingButton/FloatingButton'

const HootPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <IndividualHoot />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default HootPage
