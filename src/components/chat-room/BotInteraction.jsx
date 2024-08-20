import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Container, ListGroupItem } from 'react-bootstrap';
import { baseUrl } from '../services/Helpers';
import useStomp from '../../hooks/useStomp';
import MessageListItem from './MessageListItem';

export default function BotInteraction() {
    const { user } = useAuth();
    const [msgs, setMsgs] = useState([]);
    const { stompClient } = useStomp();
    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const result = await axios.get(`${baseUrl}/bot`, { headers: { Authorization: `Bearer ${user.token}` } });
            console.log(result.data)
            setMsgs(result.data.map(msg => {return {id: msg.id, content: msg.question, clickable: true}}));
        }
        catch (err) {
            console.log(err)
        }
    }

    const getAnswer = (id) => {

        const answer = async () => {
            try {
                const result = await axios.get(`${baseUrl}/bot/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
                msgs.push({id: result.data.id, content: result.data.question, self: true})
                msgs.push({id: result.data.id, content: result.data.answer});
                setMsgs([...msgs]);
            } catch (err) {
                console.log(err);
            }
        }
        answer();
    }

    const assignAdmin = () => {
        const assign = async () => {
            await stompClient.send(`/app/user.assign`, {}, JSON.stringify(user));
        }
        assign();
    }

    return (
        <Container className='message-area'>
            <ul>
                {msgs.map((msg, i) =>  
                    <li key={i} onClick={msg.clickable ? () => { getAnswer(msg.id) } : undefined}>
                    <p className={`message ${(msg.self && "self")}`}>{msg.content}</p>
                  </li>
                )}
                <li><p className='message'>Do you want to talk to admin?</p></li>
                <li onClick={assignAdmin}><p className='message'>Yes</p></li>
                <li onClick={fetch}><p className='message'>No</p></li>
            </ul>
        </Container>
    )
}
