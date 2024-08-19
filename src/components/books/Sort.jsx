import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, FormSelect, Table } from "react-bootstrap";

function SortBook() {
    const baseUrl = "http://localhost:8888"
    const [books, setBooks] = useState([]);
    const [by, setBy] = useState(null);
    useEffect(() => {
        async function fetch() {
            try {
                let result;
                if (!by)
                    result = await axios.get(`${baseUrl}/books/sort`);
                else
                    result = await axios.get(`${baseUrl}/books/sort?by=${by}`)
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
    }, [by]);

    return (
        <>
            <Container className="mb-5">
                <FormSelect className="form-select" name="choice" id="choice" onChange={() => setBy(document.querySelector("#choice").value)}>
                    <option value="">By Title</option>
                    <option value="author">By Author</option>
                    <option value="pub-date">By Publication Date</option>
                </FormSelect>
            </Container>
            <Table striped className="container">
                <thead className="table-primary">
                    <tr>
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
            </Table>
        </>);

}

export default SortBook;