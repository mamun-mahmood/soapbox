import React, { Fragment } from 'react'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar'
import Engagements from '../components/Engagements/Engagements'
import IndividualHoot from './IndividualHoot/IndividualHoot'
import Feed from '../components/Feed/Feed'

const HootPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="soapbox">
                <SideBar />
                <IndividualHoot />
                {/* <Feed /> */}
                <Engagements />
            </div>
        </Fragment>
    )
}

export default HootPage
