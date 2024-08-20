import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import useMessages from '../../hooks/useMessages'
import useAuth from '../../hooks/useAuth';
import useReceiver from '../../hooks/useReceiver';
import MessageListItem from './MessageListItem';

export default function MessageArea() {
    const { user } = useAuth();
    const { receiver } = useReceiver();
    const { messages } = useMessages();

    useEffect(() => {
        console.log(messages)
    }, [receiver, messages]);
    return (
        <Container className='message-area'>
            <ul>
                {messages.map((message, i) => <MessageListItem message={message} key={message.id ?? i} />)}
            </ul>
        </Container>
    )
}
