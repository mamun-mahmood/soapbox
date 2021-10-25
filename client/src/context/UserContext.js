import React, { createContext, useState } from 'react'

export const UserContext = createContext();

const initialState = {
    views: "total views",
    likes: "total likes"
}

const User = ({ children }) => {
    const [user, setUser] = useState(initialState);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export default User;
