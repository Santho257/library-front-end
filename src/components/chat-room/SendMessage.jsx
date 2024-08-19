import { useContext, useState } from "react"
import { StompContext } from "../contexts/StompContext";

export default function SendMessage({sender, receiver}) {
    const [message, setMessage] = useState("");
    const {stompClient} = useContext(StompContext);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        stompClient.send(`/app/chat`,{},JSON.stringify({
            sender: sender,
            receiver: receiver,
            content: message
        }));
        setMessage('');
        
    }

    return <div id="send-msg">
        <div id="input-div" className='grid grid-cols-11 gap-2 fixed bottom-8 m-3 w-[72%]'>
            <div id="input-area" className='col-span-10 h-[100%]'>
                <input type="text" name="message-input" value={message} onChange={handleMessageChange} id="message-input" className='w-[100%] h-[100%] rounded-lg border-notificationwhite p-2' />
            </div>
            <div id="sendButton" className="bg-blue rounded-xl text-center text-white text-xl">
                <input type="button" onClick={sendMessage} value="send" />
            </div>
        </div>
    </div>
}