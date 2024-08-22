import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../services/Helpers';
import { Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

export default function ViewBotQuestions() {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await axios.get(`${baseUrl}/bot`, { headers: { Authorization: `Bearer ${user.token}` } });
                setQuestions(result.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, [])

    return (
        <Container className='mt-5'>
            {questions.map((question) => {
                return <React.Fragment key={question.id}>
                    <Row>
                        <Col><p className='bold'>{question.question}</p></Col>
                    </Row>
                    <Row>
                        <Col md={{ offset: 1 }}><p>{question.answer}</p></Col>
                    </Row>
                </React.Fragment>
            })}
        </Container>
    )
}
