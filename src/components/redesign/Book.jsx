import { Outlet, useNavigate } from "react-router";
import { Container, InputGroup, FormSelect, Form, Button, Row, Col, Card, CardImg, CardImgOverlay, CardBody, CardText, CardFooter, CardTitle } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "../services/Helpers";
import axios from "axios";
import { toast } from "react-toastify";

function Book() {
    const navi = useNavigate();
    const { user } = useAuth();
    const [searchParam, setSearchParam] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParam.get("search") ?? "");
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [count, setCount] = useState(0);
    const [by, setBy] = useState("");
    const [errText, setErrText] = useState("");

    const borrow = (bookId) => {
        const brw = async () => {
            try {
                const result = await axios.post(`${baseUrl}/library/borrow`, {
                    bookId
                }, { headers: { Authorization: `Bearer ${user.token}` } });
                toast.success(result.data.message, { position: "top-center" });
            }
            catch (err) {
                console.log(err);
                toast.error(err?.response?.data.message, { position: "top-center" });
            }
        }
        brw();
    }

    const remove = (bookId) => {
        const rmb = async () => {
            try {
                const result = await axios.delete(`${baseUrl}/books/${bookId}`, { headers: { Authorization: `Bearer ${user.token}` } });
                toast.success(result.data.message, { position: "top-center" });
                setCount(count + 1);
            }
            catch (err) {
                console.log(err);
                toast.error(err?.response?.data?.message, { position: "top-center" });
            }
        }
        rmb();
    }

    const sort = () => {
        const srt = async () => {
            try {
                const result = await axios.get(`${baseUrl}/books/sort${(sortBy) && `?by=${sortBy}`}`);
                setBooks(result.data.message);
            }
            catch (err) {
                toast.error("Something went wrong :: " + err.response?.data?.message, { position: "top-center" });
            }
        }
        srt();
    }

    useEffect(() => {
        setErrText('');
        async function fetch() {
            try {
                const result = await axios.get(`${baseUrl}/books${(searchTerm) ? (by) ? `/search?key=${searchTerm}&by=${by}` : `/search?key=${searchTerm}` : ""}`);
                if (result.data.status > 300) {
                    console.log(result.data.statusCode);
                }
                setBooks(result.data.message);
            }
            catch (err) {
                setBooks([])
                setErrText(err.response?.data?.message);
            }
        }
        fetch();
    }, [searchTerm, by, count]);

    return <>
        <Container className="pt-2">
            <InputGroup>
                <FormSelect className="focus-no-shadow" style={{ flex: '0 0 13%' }} value={by} onChange={(e) => setBy(e.target.value)}>
                    <option value="">By title</option>
                    <option value="author">By Author</option>
                    <option value="genre">By Genre</option>
                </FormSelect>
                <Form.Control className="focus-no-shadow" type="search" placeholder="search..." value={searchTerm}
                    onChange={(e) => { setSearchParam({ search: e.target.value }); setSearchTerm(e.target.value) }}
                    onBlur={() => (searchTerm == "") && setSearchParam({})} />
            </InputGroup>
            <Container id="resultArea" className="my-3">
                <header className="d-flex justify-content-between">
                    <h5>Books</h5>
                    {!searchTerm && <InputGroup className="w-auto">
                        <FormSelect value={sortBy} onChange={(e) => { setSortBy(e.target.value); }}>
                            <option value="">By Title</option>
                            <option value="author">By Author</option>
                            <option value="pub-date">By Publication Date</option>
                        </FormSelect>
                        <Button onClick={sort}>Sort</Button>
                    </InputGroup>}
                    {!searchTerm && user.role == "ADMIN" && <Button variant="success" onClick={() => navi("add")}>Add Book</Button>}
                </header>
                <Row className="g-3 mt-2">
                    {books.map((book) => {
                        return (
                            <Col key={book.id} sm={6} md={4} xl={3}>
                                <Card className="book-card">
                                    <CardImg variant="top" style={{ height: "150px" }} className="bg-dark" />
                                    <CardImgOverlay>
                                        <CardTitle className="text-light">{book.title}</CardTitle>
                                    </CardImgOverlay>
                                    <CardBody className="d-flex flex-column justify-content-between overflow-hidden">
                                        <CardText>{book.author.name}</CardText>
                                        <CardText>{book.genre}</CardText>
                                        <CardText>{book.publicationDate}</CardText>
                                    </CardBody>
                                    {user.token && <CardFooter style={{ zIndex: 2 }}>
                                        {user.role == "BORROWER" &&
                                            <Button style={{ cursor: "pointer" }} variant="success" onClick={() => borrow(book.id)}>Borrow</Button>}
                                        {user.role == "ADMIN" &&
                                            <Button style={{ background: "red", border: "none" }} onClick={() => remove(book.id)}>Remove</Button>}
                                    </CardFooter>}
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <p className="text-danger text-center">{errText}</p>
            </Container>
        </Container>
    </>
}
export default Book;
