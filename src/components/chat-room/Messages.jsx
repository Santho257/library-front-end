import { useParams } from "react-router-dom";
import MessageListItem from "./MessageListItem";
import ReceiverDetail from "./ReceiverDetail";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { baseUrl } from "../utils/service";
import SendMessage from "./SendMessage";

export default function Messages() {
    const receiverEmail = useParams();
    const { user } = useContext(UserContext);
    const [receiver, setReceiver] = useState(user);
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get(`${baseUrl}/users/${receiverEmail.receiver}`);
            setReceiver({
                email: receiverEmail.receiver,
                name: result.data.name,
                profile: result.data.profile
            });

            const messResult = await axios.get(`${baseUrl}/messages/${user.email}/${receiverEmail.receiver}`);
            console.log(messResult.data);
            setMessages(messResult.data);
        }
        fetch();

    }, [receiverEmail]);

    useEffect(() => {
        console.log(user, receiver);
    }, [receiver])

    return <div id="message-area" className="bg-white h-[100vh] w-[75%]">
        <ReceiverDetail receiver={receiver}/>
        <div id="messages" className="bg-gradient-to-br bg-bgyellow h-[90vh] overflow-auto no-scrollbar">
            <ul id="message-list" className='border-transparent border-2 max-w-[800px] item m-auto'>
                {messages?.map((message) => {
                    return <MessageListItem key={message.id} self={message.sender == user.email} message={message.content} />
                })}
            </ul>
        </div>
        <SendMessage receiver={receiverEmail.receiver} sender={user.email}/>
    </div>
}