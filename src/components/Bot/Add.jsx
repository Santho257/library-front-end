import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FormControl, FormLabel } from 'react-bootstrap'
import { baseUrl } from '../services/Helpers';
import useAuth from '../../hooks/useAuth';

export default function AddBotQuestion() {
    const {user} = useAuth();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const add = async () => {
        const result = await axios.post(`${baseUrl}/bot`,{
            question, answer
        }, {headers:{Authorization: `Bearer ${user.token}`}});
          
        document.querySelector('#result').innerText = `Question Added With ID :: ${result.data}`;
    }
    return (
        <>
            <Container>
                <FormLabel htmlFor="question" className="scroll-none">Question</FormLabel>
                <FormControl id="question" as="textarea" placeholder="question" value={question} onChange={(e) => setQuestion(e.target.value)} ></FormControl><br />
                <FormLabel htmlFor="answer">Question</FormLabel>
                <FormControl id="answer" className="scroll-none" as="textarea" placeholder="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}></FormControl><br />
                <Button variant="primary" onClick={add}>Add</Button>
            </Container>
            <Container><p id="result" className='text-center text-success'></p></Container>
        </>
    )
}
