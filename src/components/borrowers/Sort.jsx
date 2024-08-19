import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Table } from "react-bootstrap";

export default function SortBorrower() {
    const baseUrl = "http://localhost:8888"
    const [authors, setBorrowers] = useState([]);
    const auth = useAuth();
    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/borrowers/sort`, { headers: { Authorization: `Bearer ${auth.user.token}` } });
                if (result.data.statusCode != "OK") {
                    console.log(result.data.statusCode);
                }
                setBorrowers(result.data.message);
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
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map((author, i) => {
                            return (
                                <tr key={author.username}>
                                    <td>{i + 1}</td>
                                    <td>{author.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>);

}