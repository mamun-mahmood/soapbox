import React, { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';
import '../components/Hashtags/hashtags.css'

const Hashtags = Loadable({
    loader: () => import('../components/Hashtags/Hashtags' /* webpackChunkName: "Hashtags" */),
    loading() {
        return <Loading />
    }
})

const HashtagsPage = () => {
    return (
        <Fragment>
            <NavBar />
            <div className="main-body">
                <SideBar />
                <Hashtags />
                <FloatingButton />
            </div>
        </Fragment>
    )
}

export default HashtagsPage
