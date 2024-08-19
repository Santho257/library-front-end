import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { baseUrl } from "../services/Helpers";
import useAuth from "../../hooks/useAuth";
import { Container, Table } from "react-bootstrap";

export default function ListBorrowers() {
    const [borrowers, setBorrowers] = useState([]);
    const auth = useAuth();
    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/borrowers`, { headers: { Authorization: `Bearer ${auth.user.token}` } });
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
    return <Container>
        <Table striped hover>
            <thead className="table-primary">
                <tr>
                    <th>S.No</th>
                    <th>Username</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    borrowers.map((borrower, i) => {
                        return (
                            <tr key={borrower.username}>
                                <td>{i + 1}</td>
                                <td>{borrower.username}</td>
                                <td>{borrower.name}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </Container>
}