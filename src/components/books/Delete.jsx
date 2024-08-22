import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { baseUrl } from "../services/Helpers";
import useAuth from "../../hooks/useAuth";

function DeleteBook() {
    const {user} = useAuth();
    const [count, setCount] = useState(0);
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
    }, [count]);    

    const deleteBook = async (id) => {
        let result = await axios.delete(`${baseUrl}/books/${id}`,{headers: {
            Authorization: `Bearer ${user.token}`
        }});
        document.querySelector("#deletedMessage").innerText = result.data.message;
        setCount(count+1)
    };

    return (
        <>
            <Container><p id="deletedMessage" className="text-success text-center"></p></Container>
            <Table striped className="container">
                <thead className="table-primary">
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Delete</th>
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
                                    <td><a type="button" className="link" onClick={() => deleteBook(book.id)}>delete</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default DeleteBook;