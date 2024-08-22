import axios from "axios";
import React ,{ useEffect, useState } from "react";
import { baseUrl } from "../services/Helpers";
import { Col, Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

function DeleteBotQuestion() {
    const { user } = useAuth();
    const [count, setCount] = useState(0);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/bot`, {headers: {Authorization: `Bearer ${user.token}`}});
                setQuestions(result.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [count]);

    const deleteQuestion = async (id) => {
        let result = await axios.delete(`${baseUrl}/bot/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
        document.querySelector("#deletedMessage").innerText = "Question deleted with Id :: " + id;
        setCount(count + 1)
    };

    return (
        <>
            <Container><p id="deletedMessage" className="text-success text-center"></p></Container>
            <Container>
            {questions.map((question) => {
                return <React.Fragment key={question.id}>
                    <Row>
                        <Col>{question.question} <a className="link" type="button" onClick={() => deleteQuestion(question.id)}>delete</a></Col>
                    </Row>
                    <Row>
                        <Col md={{ offset: 1 }}>{question.answer}</Col>
                    </Row>
                </React.Fragment>
            })}
            </Container>
        </>)

}

export default DeleteBotQuestion;