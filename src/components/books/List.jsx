import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";

function ListBook() {
    const baseUrl = "http://localhost:8888"
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
        <Container>
            <Table striped hover>
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
        </Container>
    )
}

export default ListBook;