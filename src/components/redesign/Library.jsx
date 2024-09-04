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
    const [book, setBook] = useState(-1);
    const [borrowers, setBorrowers] = useState([]);
    const [books, setBooks] = useState([]);
    const [library, setLibrary] = useState([]);
    const [count, setCount] = useState(0);
    const [isUnreturned, setIsUnreturned] = useState(false);
    const { user } = useAuth();
    const { receiver } = useReceiver();

    useEffect(() => {
        all();
    }, [count]);

    const all = async () => {
        if(borrower != "" || book != -1)    return;
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
            const result = await axios.get(`${baseUrl}/library`, { headers: { Authorization: `Bearer ${user.token}` } });
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
                const bookResult = await axios.get(`${baseUrl}/books`, { headers: { Authorization: `Bearer ${user.token}` } });
                setBorrowers(result.data.message);
                setBooks(bookResult.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, []);

    const unreturned = () => {
        setBook(-1);
        setBorrower("");
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

    useEffect(() => {
        if(borrower == ""){
            setCount(count+1);
            return;
        }
        const brwChange = async () => {
            try {
                const result = await axios.get(`${baseUrl}/library/borrower/${borrower}`, { headers: { Authorization: `Bearer ${user.token}` } });
                setLibrary(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        setBook(-1);
        brwChange();
    },[borrower]);
    useEffect( () => {
        if(book == -1){
            setCount(count+1);
            return;
        }
        const bookChange = async () => {
            try {
                const result = await axios.get(`${baseUrl}/library/book/${book}`, { headers: { Authorization: `Bearer ${user.token}` } });
                console.log(result.data);
                setLibrary(result.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        setBorrower("");
        bookChange();
    },[book]);

    return (
        <Container className="pt-2">
            <header className="d-flex justify-content-between">
                <h5>Borrow History</h5>
                {isUnreturned ? <Button onClick={all}>All History</Button> : <Button onClick={unreturned}>Unreturned</Button>}
                {user.role == "ADMIN" && <InputGroup className="w-auto">
                    <InputGroupText>Borrower</InputGroupText>
                    <FormSelect value={borrower} onChange={(e) => { setBorrower(e.target.value);
                     }}>
                        <option value=""></option>
                        {borrowers.map(brw => {
                            return receiver.email != brw.username && brw.role == "BORROWER" && <option key={brw.username} value={brw.username}>{brw.username}</option>
                        })}
                    </FormSelect>
                </InputGroup>}
                {user.role == "ADMIN" && <InputGroup className="w-auto">
                    <InputGroupText>Book</InputGroupText>
                    <FormSelect value={book} onChange={(e) => { setBook(e.target.value);}}>
                        <option value={-1}></option>
                        {(receiver.email) && <option value={receiver.email}>Support: {receiver.name}</option>}
                        {books.map(book => {
                            return <option key={book.id} value={book.id}>{book.title}</option>
                        })}
                    </FormSelect>
                </InputGroup>}
            </header>
            <Row className="g-3 my-2">
                {
                    library.length > 0 ? library.map((lib) => {
                        return (
                            <Col key={lib.id} md={6} lg={4}>
                                <Card>
                                    <CardHeader className="bg-info">
                                        {lib.title}
                                    </CardHeader>
                                    <CardBody>
                                        {(!borrower || user.role == "BORROWER") && <CardText>Borrower: <span className="text-blue">{lib.borrowerId}</span></CardText>}
                                        <CardText>Borrowed On: {lib.borrowedOn}</CardText>
                                        {(lib.returnedOn)
                                            ?
                                            <CardText>Return On: {lib.returnedOn}</CardText>
                                            : (user.role == "BORROWER")
                                                ? <Button onClick={() => returnBook(lib.id)}>Return</Button>
                                                : <CardText>Not Returned</CardText>
                                        }
                                    </CardBody>
                                </Card>
                            </Col>
                        ) 
                    }): <p className="text-center text-danger">No data available</p>
                }
            </Row>
        </Container>
    )
}
