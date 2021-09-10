import React from 'react'
import { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'

import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';
const HashtagHoots = Loadable({
    loader: () => import('../components/HashtagHoots/HashtagHoots' /* webpackChunkName: "HashtagHootsPage" */),
    loading() {
        return <Loading />
    }
})

const HashtagHootsPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <HashtagHoots />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default HashtagHootsPage
