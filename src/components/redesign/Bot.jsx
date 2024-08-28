import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../services/Helpers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Bot() {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const navi = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                console.log("fetching questions")
                const result = await axios.get(`${baseUrl}/bot`, { headers: { Authorization: `Bearer ${user.token}` } });
                setQuestions(result.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, [count]);

    const remove = (questionId) => {
        const rmv = async () => {
            try {
                const result = await axios.delete(`${baseUrl}/bot/${questionId}`, { headers: { Authorization: `Bearer ${user.token}` } });
                toast.success(result.data);
                setCount(count + 1);
            }
            catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message ?? err.response?.data);
            }
        }
        rmv();
    }
    return (
        <Container className="py-2">
            <header className="d-flex justify-content-between">
                <h5>Bot Questions</h5>
                <Button variant="success" onClick={() => navi("add")}>Add Question</Button>
            </header>
            {questions.map((question) => {
                return (
                    <Card className="g-3 mt-2" key={question.id}>
                        <CardHeader>
                            <Row>
                                <Col md={10}>
                                    {question.question}
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" onClick={() => remove(question.id)}>Remove</Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <CardText>{question.answer}</CardText>
                        </CardBody>
                    </Card>
                )
            })}
        </Container>
    )
}
