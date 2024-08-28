import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FormControl, FormLabel } from 'react-bootstrap'
import { baseUrl } from '../services/Helpers';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function AddBotQuestion() {
    const {user} = useAuth();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const add = async () => {
        const result = await axios.post(`${baseUrl}/bot`,{
            question, answer
        }, {headers:{Authorization: `Bearer ${user.token}`}});
        toast.success(`Question Added With ID :: ${result.data}`);
        setAnswer("");
        setQuestion('');
    }
    return (
        <>
            <Container className='my-3'>
                <h3 className='text-primary text-center'>Add Question</h3>
                <FormLabel htmlFor="question" className="scroll-none">Question</FormLabel>
                <FormControl id="question" as="textarea" placeholder="question" value={question} onChange={(e) => setQuestion(e.target.value)} ></FormControl><br />
                <FormLabel htmlFor="answer">Answer</FormLabel>
                <FormControl id="answer" className="scroll-none" as="textarea" placeholder="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}></FormControl><br />
                <Button variant="success" onClick={add}>Add</Button>
            </Container>
            <Container><p id="result" className='text-center text-success'></p></Container>
        </>
    )
}
