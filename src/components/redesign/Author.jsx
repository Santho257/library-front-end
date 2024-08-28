import { useNavigate } from "react-router";
import { Container, InputGroup, FormSelect, Form, Button, Row, Col, Card, CardImg, CardImgOverlay, CardBody, CardText, CardFooter, CardTitle } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "../services/Helpers";
import axios from "axios";
import { toast } from "react-toastify";

function Author() {
    const navi = useNavigate();
    const { user } = useAuth();
    const [searchParam, setSearchParam] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParam.get("search") ?? "");
    const [authors, setAuthors] = useState([]);
    const [count, setCount] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [errText, setErrText] = useState("");

    const remove = (authorId) => {
        const rmb = async () => {
            try {
                const result = await axios.delete(`${baseUrl}/authors/${authorId}`, { headers: { Authorization: `Bearer ${user.token}` } });
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
                const result = await axios.get(`${baseUrl}/authors/sort${(sortBy) && `?by=${sortBy}`}`);
                setAuthors(result.data.message);
            }
            catch (err) {
                toast.error("Something went wrong :: " + err.response?.data?.message, { position: "top-center" });
            }
        }
        srt();
    }

    useEffect(() => {
        setErrText('')
        async function fetch() {
            try {
                const result = await axios.get(`${baseUrl}/authors${(searchTerm) ? `/search?key=${searchTerm}` : ""}`);
                if (result.data.status > 300) {
                    console.log(result.data.statusCode);
                }
                setAuthors(result.data.message);
            }
            catch (err) {
                setAuthors([]);
                setErrText(err.response?.data?.message);
            }
        }
        fetch();
    }, [searchTerm, count]);

    return <>
        <Container className="pt-2">
            <InputGroup>
                <Form.Control className="focus-no-shadow" type="search" placeholder="search..." value={searchTerm}
                    onChange={(e) => { setSearchParam({ search: e.target.value }); setSearchTerm(e.target.value) }}
                    onBlur={() => (searchTerm == "") && setSearchParam({})} />
            </InputGroup>
            <Container id="resultArea" className="my-3">
                <header className="d-flex justify-content-between">
                    <h5>Authors</h5>
                    {!searchTerm && <InputGroup className="w-auto">
                        <FormSelect value={sortBy} onChange={(e) => { setSortBy(e.target.value); }}>
                        <option value="">By Name</option>
                        <option value="booksWritten">By Books Written</option>
                        </FormSelect>
                        <Button onClick={sort}>Sort</Button>
                    </InputGroup>}
                    {!searchTerm && user.role == "ADMIN" && <Button variant="success" onClick={() => navi("add")}>Add Author</Button>}
                </header>
                <Row className="g-3 mt-2">
                    {authors.map((author) => {
                        return (
                            <Col key={author.id} sm={6} md={4} xl={3}>
                                <Card className="author-card">
                                    <CardImg variant="top" style={{ height: "150px" }} className="bg-dark" />
                                    <CardImgOverlay>
                                        <CardTitle className="text-light">{author.name}</CardTitle>
                                    </CardImgOverlay>
                                    <CardBody>
                                        <CardTitle>{author.name}</CardTitle>
                                        {sortBy && author.count && <CardText>Books Written: {author.count}</CardText>}
                                    </CardBody>
                                    {user.role == "ADMIN" && <CardFooter style={{ zIndex: 2 }}>
                                        <Button style={{ background: "red", border: "none" }} onClick={() => remove(author.id)}>Remove</Button>
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
export default Author;
