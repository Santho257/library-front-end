import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Col, Container, ListGroupItem, Row } from 'react-bootstrap';
import { baseUrl } from '../services/Helpers';
import useStomp from '../../hooks/useStomp';
import { jwtDecode } from 'jwt-decode';

export default function BotInteraction() {
    const { user } = useAuth();
    const [msgs, setMsgs] = useState([]);
    const { stompClient } = useStomp();
    useEffect(() => {
        fetch();
    }, []
    );

    useEffect(() => {
        document.querySelector('#auto-scroll').scrollTop = document.querySelector('#auto-scroll').scrollHeight;
    }, [msgs]);

    const fetch = async () => {
        try {
            console.log(msgs)
            const result = await axios.get(`${baseUrl}/bot`, { headers: { Authorization: `Bearer ${user.token}` } });
            setMsgs([...msgs, ...result.data.map(msg => { return { id: msg.id, content: msg.question, clickable: true } })]);
        }
        catch (err) {
            console.log(err)
        }
    }

    const getAnswer = (id) => {
        const answer = async () => {
            try {
                const result = await axios.get(`${baseUrl}/bot/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
                msgs.push({ id: result.data.id, content: result.data.question, self: true })
                msgs.push({ id: result.data.id, content: result.data.answer });
                setMsgs([...msgs]);
                fetch();
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
        <>
            <Container className='d-flex justify-content-between'>
                <p className='message'>Do you want to talk to admin?</p>
                <p role="button" onClick={assignAdmin} className='message'>Yes</p>
            </Container>
            <Container className='message-area bot mt-10' id='auto-scroll'>

                <ul>
                    <li className={`d-flex`}>
                        <p role='text' className='message'>{`Hii ${jwtDecode(user.token).sub}!`}</p>
                    </li>
                    <li className='d-flex'>
                        <p role='text' className='message'>{`Choose from the below questions to help you.
        If it doesn't solve your problem, Click talk to admin on the top.`}</p>
                    </li>

                    {msgs.map((msg, i) =>
                        <li key={i} className={`d-flex ${(msg.self && 'flex-row-reverse')}`}>
                            <p role={msg.clickable ? "button" : "text"} onClick={msg.clickable ? () => { getAnswer(msg.id) } : undefined} className={`message ${(msg.self && "self")}`}>{msg.content}</p>
                        </li>
                    )}
                </ul>
            </Container>
        </>
    )
}
