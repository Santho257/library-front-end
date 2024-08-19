import { createContext, useCallback, useEffect, useState } from "react";
import useStomp from "../hooks/useStomp";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [user, setUser] = useState({
        token: '', role: ''
    }); 
    const updateUser = useCallback((user) => {
        setUser(user);
    },[user]);

    return <AuthenticationContext.Provider value={{user, updateUser}}>{children}</AuthenticationContext.Provider>
}