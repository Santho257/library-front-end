import React, { useState } from 'react'
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import useStomp from '../../hooks/useStomp';
import useReceiver from '../../hooks/useReceiver';
import useMessages from '../../hooks/useMessages';

export default function SendMessage() {
    const [message, setMessage] = useState("");
    const {receiver} = useReceiver();
    const {stompClient} = useStomp();
    const { updateMessages } = useMessages();
    
    const sendMessage = () => {
        const send = async () => {
            await stompClient?.send(`/app/private-chat`,{},JSON.stringify({
                receiver: receiver.email,
                content: message
            }));
        }
        send();
        updateMessages({
            receiver: receiver.email,
            content: message,
            sentAt: new Date()
        })
        setMessage("");
    }
    return (
        <Container>
            <InputGroup>
                <FormControl as="textarea" rows="1" className='scroll-none' type='text-area' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='message...'/>
                <Button onClick={sendMessage}>Send</Button>
            </InputGroup>
        </Container>
    )
}
