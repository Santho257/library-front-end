import axios from "axios";
import react from '../../assets/react.svg'
import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardImg, CardImgOverlay, CardTitle, Col, Container, FormControl, FormSelect, InputGroup, ListGroup, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function SearchBooks() {
    const baseUrl = "http://localhost:8888/books";
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParam, setSearchParam] = useSearchParams({})
    const [books, setBooks] = useState([]);
    const [errText, setErrText] = useState("");
    const [by, setBy] = useState("");
    useEffect(() => {
        const fetch = async () => {
            setErrText("");
            if (!searchTerm) {
                setBooks([]);
                return;
            }
            let result;
            try {
                if (!by) {
                    console.log("Working..");
                    result = await axios.get(`${baseUrl}/search?key=${searchTerm}`);
                } else {
                    result = await axios.get(`${baseUrl}/search?key=${searchTerm}&by=${by}`);
                }
                console.log(result)
                if (result.data.statusCode != "OK") {
                    document.querySelector("#result").classList.add("text-success")
                    document.querySelector("#result").innerText = result.data.message;
                }
                setBooks(result.data.message);
            }
            catch (err) {
                console.log(err);
                setBooks([]);
                setErrText(err.response.data.message);
            }
        }
        fetch();
    }, [searchTerm]);
    return (<>
        <InputGroup>
            <div className="input-group-prepend">
                <FormSelect id="by" className="flex-select" onChange={() => setBy(document.querySelector("#by").value)}>
                    <option value="">By title</option>
                    <option value="author">By Author</option>
                    <option value="genre">By Genre</option>
                </FormSelect>
            </div>
            <FormControl type="search" className="flex-search" placeholder="search..." value={searchTerm}
                onChange={(e) => { setSearchParam({ search: e.target.value }); setSearchTerm(e.target.value) }}
                onBlur={() => (searchTerm == "") && setSearchParam({})} />
        </InputGroup >
        <Container id="resultArea" className="my-3">
            <p className="text-danger">{errText}</p>
            <Row className="g-3">
                {books.map((book) => {
                    return (
                        <Col key={book.id} sm={6} md={4} lg={3}>
                            <Card style={{ height: "300px" }}>
                                <CardImg variant="top" style={{ height: "150px" }} className="bg-dark" />
                                <CardImgOverlay>
                                    <CardTitle className="text-light">{book.title}</CardTitle>
                                </CardImgOverlay>
                                <CardBody className="d-flex flex-column justify-content-between">
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>{book.author.name}</ListGroup.Item>
                                        <ListGroup.Item>{book.genre}</ListGroup.Item>
                                        <ListGroup.Item>{book.publicationDate}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Link type="button">Borrow</Card.Link>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    </>)
}