import axios from "axios";
import { useEffect, useState } from "react"
import { Container, FormControl, FormGroup, FormSelect, FormText, InputGroup, Table } from "react-bootstrap";

export default function SearchBooks() {
    const baseUrl = "http://localhost:8888/books";
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [by, setBy] = useState("");
    useEffect(() => {
        const fetch = async () => {
            const errText = document.querySelector("#errText");
            if (errText) document.querySelector("#resultArea").removeChild(errText);
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
                const p = document.createElement("p");
                p.setAttribute('id', "errText");
                p.classList.add("text-danger")
                p.innerText = err.response.data.message;
                document.querySelector("#resultArea").appendChild(p);
            }
        }
        fetch();
    }, [searchTerm]);
    return (<>
        <Container className="flex mb-3">
            <FormSelect id="by" className="flex-select" onChange={() => setBy(document.querySelector("#by").value)}>
                <option value="">By title</option>
                <option value="author">By Author</option>
                <option value="genre">By Genre</option>
            </FormSelect>
            <FormControl type="search" name="searchTerm" id="searchTerm" className="flex-search" placeholder="search..." onInput={
                () => { setSearchTerm(document.querySelector("#searchTerm").value) }
                // (e) => setSearchTerm(e.value)
            } ></FormControl>

        </Container>
        <Container id="resultArea">
            {(books.length > 0) ? <>
                <Table striped hover>
                    <thead>
                        <tr className="table-primary">
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Pub. date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, i) => {
                                return (
                                    <tr key={book.id}>
                                        <td>{i + 1}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author.name}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.publicationDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table></> : null}
        </Container>
    </>)
}