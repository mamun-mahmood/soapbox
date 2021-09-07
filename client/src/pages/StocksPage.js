import React, { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar'

const Stocks = Loadable({
    loader: () => import('../components/Stocks/Stocks' /* webpackChunkName: "Stocks" */),
    loading() {
        return <Loading />
    }
})

const StocksPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <Stocks />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default StocksPage
