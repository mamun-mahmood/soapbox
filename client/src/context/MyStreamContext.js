import React, { createContext, useState } from 'react'

export const MyStream = createContext();

const MyStreamContext = ({ children }) => {
    const [myStream, setMyStream] = useState(null);
    const [hookStream, setHookStream] = useState(null);

    return (
        <MyStream.Provider value={{ myStream, setMyStream, hookStream, setHookStream }}>
            {children}
        </MyStream.Provider>
    )
}

export default MyStreamContext
