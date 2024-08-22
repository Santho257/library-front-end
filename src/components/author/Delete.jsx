import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { baseUrl } from "../services/Helpers";
import { Container, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

function DeleteAuthor() {
    const {user} = useAuth();
    const [count, setCount] = useState(0);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/authors`);
                if (result.data.statusCode != "OK") {
                    console.log(result.data.statusCode);
                }
                setAuthors(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [count]);

    const deleteAuthor = async (id) => {
        let result = await axios.delete(`${baseUrl}/authors/${id}`,{headers:{Authorization: `Bearer ${user.token}`}});
        document.querySelector("#deletedMessage").innerText = result.data.message;
        setCount(count+1)
    };

    return(
    <>
    <Container><p id="deletedMessage" className="text-success"></p></Container>
    <Table striped className="container">
        <thead className="table-primary">
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                authors.map((author, i) => {
                    return (
                        <tr key={author.id}>
                            <td>{i + 1}</td>
                            <td>{author.name}</td>
                            <td><a className="link" type="button" onClick={() => deleteAuthor(author.id)}>delete</a></td>
                        </tr>
                    )
                })
            }
        </tbody>
    </Table>
    </>)

}

export default DeleteAuthor;