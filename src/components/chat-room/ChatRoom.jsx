import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useReceiver from "../../hooks/useReceiver";
import useStomp from "../../hooks/useStomp";
import useMessages from "../../hooks/useMessages";
import MessageArea from "./MessageArea";
import SendMessage from "./SendMessage";
import BotInteraction from "./BotInteraction";

const ChatRoom = () => {
    const { receiver, updateReceiver } = useReceiver();

    return (
        <>
            {(receiver.email)
            ?<>
                <MessageArea />
                <SendMessage />
            </>
            :<BotInteraction />}
        </>
    )
}

export default ChatRoom;