import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import HashtagHoots from '../components/HashtagHoots/HashtagHoots'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar/SideBar'

const HashtagHootsPage = () => {
    const { hashtag } = useParams();

    useEffect(() => {

    })
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
