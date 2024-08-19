import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

function ListAuthor() {
    const baseUrl = "http://localhost:8888"
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
    }, []);

    return(<Table striped hover className="container">
        <thead>
            <tr className="table-primary">
                <th>S.No</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody className="table-group-divider">
            {
                authors.map((author, i) => {
                    return (
                        <tr key={author.id}>
                            <td>{i + 1}</td>
                            <td>{author.name}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </Table>)

}

export default ListAuthor;