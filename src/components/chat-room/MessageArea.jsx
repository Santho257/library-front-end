import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import useMessages from '../../hooks/useMessages'
import useAuth from '../../hooks/useAuth';
import useReceiver from '../../hooks/useReceiver';
import MessageListItem from './MessageListItem';
import useStomp from '../../hooks/useStomp';

export default function MessageArea() {
    const { receiver } = useReceiver();
    const { messages, clearMessages } = useMessages();
    const {stompClient} = useStomp();

    useEffect(() => {
        console.log(receiver)
    }, [receiver, messages]);

    const endChat = () => {
        const end = async () => {
            try {
                await stompClient.send("/app/user.endchat",{},JSON.stringify({receiver: receiver.email}));
            }
            catch(err){
                console.log(err);
            }
        }
        end();
    }


    return (
        <Container className='message-area'>
            <div className='d-flex justify-content-between'>
            <h6>{receiver.name}</h6>
            <Button onClick={endChat}>End Chat</Button>
            </div>
            <ul>
                {messages.map((message, i) => <MessageListItem message={message} key={message.id ?? i} />)}
            </ul>
        </Container>
    )
}
