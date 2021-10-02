import React, { createContext, useState } from 'react'

export const MyList = createContext();

const MyListContext = ({ children }) => {
    const [myList, setMyList] = useState(false);

    return (
        <MyList.Provider value={{ myList, setMyList }}>
            {children}
        </MyList.Provider>
    )
}

export default MyListContext
