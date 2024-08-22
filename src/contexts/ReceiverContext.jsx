import { createContext, useCallback, useEffect, useState } from "react";

export const ReceiverContext = createContext();

export const ReceiverContextProvider = ({ children }) => {
    const [receiver, setReceiver] = useState(
        JSON.parse(sessionStorage.getItem("receiver")) ?? { email: "", status: "", name: ""}
    );

    useEffect(() => {
        sessionStorage.setItem("receiver", JSON.stringify(receiver));
    },[receiver]);

    const updateReceiver = useCallback((receiver) => {
        if (receiver)
            setReceiver(receiver);
        else
            setReceiver({ email: "", status: "", name: ""});
    }, []);

    return <ReceiverContext.Provider value={{ receiver, updateReceiver }}>{children}</ReceiverContext.Provider>
}