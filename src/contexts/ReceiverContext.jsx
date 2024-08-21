import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl } from "../components/services/Helpers";
import useAuth from "../hooks/useAuth";

export const ReceiverContext = createContext();

export const ReceiverContextProvider = ({ children }) => {
    const auth = useAuth();
    const [receiver, setReceiver] = useState({
        email: "",
        status: "",
        name: ""
    });

    const updateReceiver = useCallback((receiver) => {
        if(receiver)
            setReceiver(receiver);
        else
            setReceiver({
                email: "",
                status: "",
                name: ""
            });
    }, []);

    return <ReceiverContext.Provider value={{ receiver, updateReceiver }}>{children}</ReceiverContext.Provider>
}