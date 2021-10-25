import React from 'react'
import { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'

import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';

const StockHoots = Loadable({
    loader: () => import('../components/StockHoots/StockHoots' /* webpackChunkName: "StockHootsPage" */),
    loading() {
        return <Loading />
    }
})

const StockHootsPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <StockHoots />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default StockHootsPage
