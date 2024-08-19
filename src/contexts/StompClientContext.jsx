import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl } from "../components/services/Helpers";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import useAuth from "../hooks/useAuth";
import useReceiver from "../hooks/useReceiver";
import useMessages from "../hooks/useMessages";
import { jwtDecode } from "jwt-decode";

export const StompContext = createContext();

export const StompContextProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const { user } = useAuth();
    const { receiver, updateReceiver } = useReceiver();
    const { updateMessages } = useMessages();

    const updateStompClient = (stomp) => {
        setStompClient(stomp);
    }

    const connect = useCallback(() => {
        if (!user.token) return;
        try {
            const sock = new SockJS(`${baseUrl}/ws?token=${user.token}`);
            setStompClient(over(sock));
        }
        catch (err) {
            console.log(err);
        }
    }, [user.token]);
    
    useEffect(() => {
        stompClient?.connect({}, onConnected, onError);
    },[stompClient]);

    useEffect(() => {
        stompClient?.disconnect();
        connect();
    }, [user.token, connect]);

    
    const onConnected = () => {
        const subscribe = async () => {
            stompClient.subscribe(`/user/${jwtDecode(user.token).sub}/queue/messages`, messageReceived);
            stompClient.subscribe("/topic/public", messageReceived);
            await stompClient.send(`/app/user.connect`, {}, JSON.stringify(user));
        }
        subscribe();
    }

    const onError = (err) => {
        console.log(err);
    }

    const messageReceived = (payload) => {
        console.log("Message Incoming...")
        console.log(payload.body);
        const receivedMessage = JSON.parse(payload.body);
        if (receivedMessage.messageType == "ASSIGNED") {
            updateReceiver({ email: receivedMessage.email, name: receivedMessage.name, status: receivedMessage.email })
        }
        else if (receivedMessage.messageType == "RECEIVED") {
            if (receivedMessage.sender == receiver.email) {
                updateMessages(receivedMessage);
            }
        }
    }
    return <StompContext.Provider value={{ stompClient,updateStompClient }}>{children}</StompContext.Provider>
}
