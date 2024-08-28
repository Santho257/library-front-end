import { useNavigate } from "react-router";
import { Container, InputGroup, FormSelect, Form, Button, Row, Col, Card, CardImg, CardImgOverlay, CardBody, CardText, CardFooter, CardTitle } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "../services/Helpers";
import axios from "axios";
import { toast } from "react-toastify"; 

function Borrower() {
    const { user } = useAuth();
    const [searchParam, setSearchParam] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParam.get("search") ?? "");
    const [borrowers, setBorrowers] = useState([]);
    const [errText, setErrText] = useState("");
    const [count, setCount] = useState(0);

    const remove = (borrowerId) => {
        const rmb = async () => {
            try {
                const result = await axios.delete(`${baseUrl}/borrowers/${borrowerId}`, { headers: { Authorization: `Bearer ${user.token}` } });
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
                const result = await axios.get(`${baseUrl}/borrowers/sort`, {headers:{Authorization: `Bearer ${user.token}`}});
                setBorrowers(result.data.message);
            }
            catch (err) {
                toast.error("Something went wrong :: " + err.response?.data?.message, { position: "top-center" });
            }
        }
        srt();
    }

    useEffect(() => {
        async function fetch() {
            setErrText('');
            try {
                const result = await axios.get(`${baseUrl}/borrowers${(searchTerm) ? `/search?key=${searchTerm}` : ""}`, {headers:{Authorization: `Bearer ${user.token}`}});
                if (result.data.status > 300) {
                    console.log(result.data.statusCode);
                }
                setBorrowers(result.data.message);
            }
            catch (err) {
                setBorrowers([]);
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
                    <h5>borrowers</h5>
                    {!searchTerm && <InputGroup className="w-auto">
                        {/* <InputGroupText>Sort</InputGroupText> */}
                        <Button onClick={sort}>Sort</Button>
                    </InputGroup>}
                </header>
                <Row className="g-3 mt-2">
                    {borrowers.map((borrower) => {
                        
                        return (
                            <Col key={borrower.username} md={6} lg={4}>
                                <Card className="borrower-card">
                                    <CardImg variant="top" style={{ height: "150px" }} className="bg-dark" />
                                    <CardImgOverlay>
                                        <CardTitle className="text-light">{borrower.username}</CardTitle>
                                    </CardImgOverlay>
                                    <CardBody>
                                        <CardText>{borrower.username}</CardText>
                                        <CardText>{borrower.name}</CardText>
                                    </CardBody>
                                    {user.role == "ADMIN" && <CardFooter style={{ zIndex: 2 }}>
                                        <Button style={{ background: "red", border: "none" }} onClick={() => remove(borrower.username)}>Remove</Button>
                                    </CardFooter>}
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <p className="text-danger">{errText}</p>
        </Container>
    </>
}
export default Borrower;
