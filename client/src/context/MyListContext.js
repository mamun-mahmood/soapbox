import React, { createContext, useState } from 'react'

export const MyLists = createContext();

const MyListContext = ({ children }) => {
    const [myList, setMyList] = useState(false);

    return (
        <MyLists.Provider value={{ myList, setMyList }}>
            {children}
        </MyLists.Provider>
    )
}

export default MyListContext
