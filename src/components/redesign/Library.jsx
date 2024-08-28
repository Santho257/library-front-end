import { useEffect, useState } from "react";
import useReceiver from "../../hooks/useReceiver";
import { Button, Card, CardBody, CardHeader, CardText, Col, Container, FormSelect, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { baseUrl } from "../services/Helpers";
import { toast } from "react-toastify";

export default function Library() {
    const [borrower, setBorrower] = useState("");
    const [borrowers, setBorrowers] = useState([]);
    const [library, setLibrary] = useState([]);
    const [count, setCount] = useState(0);
    const [isUnreturned, setIsUnreturned] = useState(false);
    const { user } = useAuth();
    const { receiver } = useReceiver();
    useEffect(() => {
        all();
    }, [borrower, count]);

    const all = async () => {
        setIsUnreturned(false);
        if (user.role == "BORROWER") {
            try {
                const result = await axios.get(`${baseUrl}/library/borrower`, { headers: { Authorization: `Bearer ${user.token}` } });
                setLibrary(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
            return;
        }
        try {
            const result = await axios.get(`${baseUrl}/library${borrower && `/borrower/${borrower}`}`, { headers: { Authorization: `Bearer ${user.token}` } });
            setLibrary(result.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user.role == "BORROWER") return;
        async function fetch() {
            try {
                const result = await axios.get(`${baseUrl}/borrowers`, { headers: { Authorization: `Bearer ${user.token}` } });
                setBorrowers(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, []);

    const unreturned = () => {
        setIsUnreturned(true);
        async function fetch() {
            try {
                const result = await axios.get(`${baseUrl}/library${(borrower) ? `/borrower/${borrower}` : user.role == "BORROWER" ? `/borrower` : ""}/unreturned`, { headers: { Authorization: `Bearer ${user.token}` } });
                setLibrary(result.data.message);
            }
            catch (err) {
                toast(err);
            }
        }
        fetch();
    }

    const returnBook = (id) => {
        console.log("Returning...")
        const rtn = async () => {
            try {
                const result = await axios.post(`${baseUrl}/library/return/${id}`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
                console.log(result)
                toast.success(result.data.message);
                setCount(count + 1)
            }
            catch (err) {
                console.log(err)
                toast.error(err.response?.data?.message || err.response?.data)
            }
        }
        rtn();
    };

    return (
        <Container className="pt-2">
            <header className="d-flex justify-content-between">
                <h5>Borrow History</h5>
                {isUnreturned ? <Button onClick={all}>All History</Button> : <Button onClick={unreturned}>Unreturned</Button>}
                {user.role == "ADMIN" && <InputGroup className="w-auto">
                    <InputGroupText>Borrower</InputGroupText>
                    <FormSelect value={borrower} onChange={(e) => { setBorrower(e.target.value); }}>
                        <option value=""></option>
                        {(receiver.email) && <option value={receiver.email}>Support: {receiver.name}</option>}
                        {borrowers.map(brw => {
                            return receiver.email != brw.username && brw.role == "BORROWER" && <option key={brw.username} value={brw.username}>{brw.username}</option>
                        })}
                    </FormSelect>
                </InputGroup>}
            </header>
            <Row className="g-3 my-2">
                {
                    library.map((lib) => {
                        return (
                            <Col key={lib.id} md={6} lg={4}>
                                <Card>
                                    <CardHeader className="bg-info">
                                        {lib.title}
                                    </CardHeader>
                                    <CardBody>
                                        {(!borrower || user.role == "BORROWER") && <CardText>Borrower: <span className="text-blue">{lib.borrowerId}</span></CardText>}
                                        <CardText>Borrowed On: {lib.borrowedOn}</CardText>
                                        <CardText>Return On:
                                            {(lib.returnedOn)
                                                ? lib.returnedOn
                                                : (user.role == "BORROWER")
                                                    ? <Button onClick={() => returnBook(lib.id)}>Return</Button>
                                                    : "Not Returned"}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
