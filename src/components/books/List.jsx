import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { baseUrl } from "../services/Helpers";

function ListBook() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/books`);
                if (result.data.statusCode != "OK") {
                    console.log(result.data.statusCode);
                }
                setBooks(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, []);
    return (
        <Container id="resultArea" className="my-3">
            <h5 className="text-center">Books</h5>
            {/* <p className="text-danger">{errText}</p> */}
            <Row className="g-3">
                {books.map((book) => {
                    return (
                        <Col key={book.id} sm={6} md={4} lg={3}>
                            <Card style={{height: "300px"}}>
                                <CardImg variant="top" style={{ height: "150px"}} className="bg-dark"/>
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
    )
}

export default ListBook;