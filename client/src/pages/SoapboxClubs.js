import React, { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Loading from '../components/Loading/Loading'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import Loadable from 'react-loadable';

const SoapboxClub = Loadable({
    loader: () => import('../components/SoapboxClub/SoapboxClub' /* webpackChunkName: "SoapboxClubs" */),
    loading() {
        return <Loading />
    }
})

const SoapboxClubs = () => {
    return (
        <Fragment>
            <NavBar />

            <div className="main-body">
                <SideBar />
                <SoapboxClub />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default SoapboxClubs
