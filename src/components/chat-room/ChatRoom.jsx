import useReceiver from "../../hooks/useReceiver";
import MessageArea from "./MessageArea";
import SendMessage from "./SendMessage";
import BotInteraction from "./BotInteraction";
import useAuth from "../../hooks/useAuth";
import { Container } from "react-bootstrap";

const ChatRoom = () => {
    const { receiver } = useReceiver();
    const { user } = useAuth();

    return (
        <>
            {(receiver.email)
                ? <>
                    <MessageArea />
                    <SendMessage />
                </>
                : (user.role == "BORROWER")
                    ? <BotInteraction />
                    : <Container>
                        <h6 className="text-danger text-center">No Borrower assigned yet</h6>
                    </Container>}
        </>
    )
}

export default ChatRoom;