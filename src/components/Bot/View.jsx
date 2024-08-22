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
        <Container>
            {questions.map((question) => {
                return <React.Fragment key={question.id}>
                    <Row>
                        <Col>{question.question}</Col>
                    </Row>
                    <Row>
                        <Col md={{ offset: 1 }}>{question.answer}</Col>
                    </Row>
                </React.Fragment>
            })}
        </Container>
    )
}
