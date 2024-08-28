import { createContext, useCallback, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
        ?? {token: '', role: ''}
    ); 
    const updateUser = useCallback((user) => {
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
    },[user]);

    return <AuthenticationContext.Provider value={{user, updateUser}}>{children}</AuthenticationContext.Provider>
}