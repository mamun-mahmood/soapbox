import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar'
import FloatingButton from '../components/FloatingButton/FloatingButton'

import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';

const IndividualHoot = Loadable({
    loader: () => import('../components/IndividualHoot/IndividualHoot' /* webpackChunkName: "IndividualHoot" */),
    loading() {
        return <Loading />
    }
})

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
