import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Button, Container, FormLabel, FormSelect, Row } from "react-bootstrap";
import { baseUrl } from "../services/Helpers";

export default function Borrow() {
    const [bookId, setBookId] = useState(-1);
    const [books, setBooks] = useState([]);
    const {user} = useAuth();

    const borrow = async () => {
        try {
            const result = await axios.post(`${baseUrl}/library/borrow`, {
                bookId
            }, { headers: { Authorization: `Bearer ${user.token}` } });
            console.log(result.data);
            document.querySelector("#result").classList.add("text-success");
            document.querySelector("#result").innerText = result.data.message;
        }
        catch (err) {
            console.log(err);
            document.querySelector("#result").classList.add("text-danger");
            document.querySelector("#result").innerText = err?.response?.data.message;
        }
    }

    useEffect(() => {
        async function getBooks() {
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
        getBooks();
    }, []);

    return (
        <>
            <Container>
                <FormLabel htmlFor="book">Book</FormLabel>
                <FormSelect name="book" id="book" className="form-control" value={bookId} onChange={(e) => setBookId(e.target.value)}>
                    <option value=""></option>
                    {
                        books.map((bk) => {
                            return (<option key={bk.id} value={bk.id}>{bk.title}</option>)
                        })
                    }
                </FormSelect><br />
                <Button onClick={borrow}>Borrow</Button>
            </Container>
            <Container><p id="result" className="text-center"></p></Container>
        </>
    );
}