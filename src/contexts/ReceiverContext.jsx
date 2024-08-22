import { createContext, useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export const ReceiverContext = createContext();

export const ReceiverContextProvider = ({ children }) => {
    const auth = useAuth();
    const [receiver, setReceiver] = useState(
        JSON.parse(sessionStorage.getItem("receiver"))
        ?? { email: "", status: "", name: ""}
    );

    const updateReceiver = useCallback((receiver) => {
        if (receiver)
            setReceiver(receiver);
        else
            setReceiver({ email: "", status: "", name: ""});
        sessionStorage.setItem("receiver", JSON.stringify(receiver));
    }, []);

    return <ReceiverContext.Provider value={{ receiver, updateReceiver }}>{children}</ReceiverContext.Provider>
}