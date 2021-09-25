import React, { Fragment } from 'react'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import NavBar from '../components/NavBar/NavBar'
import PrivateChannels from '../components/PrivateChannels/PrivateChannels'

const PrivateChannelsPage = () => {
    return (
        <Fragment>
            <NavBar width={"none"} header={"Soapbox Private Channels"} />
            <PrivateChannels />
            <FloatingButton />
        </Fragment>
    )
}

export default PrivateChannelsPage
