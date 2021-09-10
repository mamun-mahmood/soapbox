import React, { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'

import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';

const Explore = Loadable({
    loader: () => import('../components/Explore/Explore' /* webpackChunkName: "Explore" */),
    loading() {
        return <Loading />
    }
})

const ExplorePage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <Explore />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default ExplorePage
