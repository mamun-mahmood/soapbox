import React, { createContext, useState } from 'react'

export const MyPublicHootBox = createContext();

const MyPublicHootBoxContext = ({ children }) => {
    const [showNavCreatePublicHoot, setShowNavCreatePublicHoot] = useState(false);
    const [showFloatingCreatePublicHoot, setShowFloatingCreatePublicHoot] = useState(false);

    return (
        <MyPublicHootBox.Provider value={{
            showNavCreatePublicHoot,
            setShowNavCreatePublicHoot,
            showFloatingCreatePublicHoot,
            setShowFloatingCreatePublicHoot
        }}
        >
            {children}
        </MyPublicHootBox.Provider>
    )
}

export default MyPublicHootBoxContext
