import { createContext, useCallback, useEffect, useState } from "react";
import useReceiver from "../hooks/useReceiver";
import axios from "axios";
import { baseUrl } from "../components/services/Helpers";
import useAuth from "../hooks/useAuth";

export const MessagesContext = createContext();

export const MessagesContextProvider = ({ children }) => {
    const {receiver} = useReceiver();
    const auth = useAuth();
    const [messages, setMessages] = useState([]);

    const updateMessages = useCallback((message) => {
        messages.push(message);
        setMessages([...messages]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    })

    const fetchMessages = useCallback(() => {
        const fetch = async () => {
            try {
                if (!receiver.email) return;
                const result = await axios.get(`${baseUrl}/messages/${receiver.email}`, { headers: { Authorization: `Bearer ${auth.user.token}` } });
                setMessages(result.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [receiver.receiver]);
    
    return <MessagesContext.Provider value={{ messages, updateMessages, clearMessages,fetchMessages }}>{children}</MessagesContext.Provider>
}