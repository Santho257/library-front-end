import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useReceiver from "../../hooks/useReceiver";
import useStomp from "../../hooks/useStomp";
import useMessages from "../../hooks/useMessages";

const ChatRoom = () => {
    const {user} = useAuth();
    const {receiver, updateReceiver} = useReceiver();
    const {stompClient} = useStomp();
    const {messages, updateMessages} = useMessages();

    return (
        <>
        </>
    )
}

export default ChatRoom;