import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";


export default function UnReturned(){
    const auth = useAuth();
    const baseUrl = "http://localhost:8888"
    const [library, setLibrary] = useState([]);
    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/library/unreturned`,{headers: {Authorization: `Bearer ${auth.user.token}`}});
                if (result.data.statusCode != "OK") {
                    console.log(result.data.statusCode);
                }
                setLibrary(result.data.message);
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
                    <th>Title</th>
                    <th>Borrower</th>
                    <th>Borrowed On</th>
                </tr>
            </thead>
            <tbody>
                {
                    library.map((lib, i) => {
                        return (
                            <tr key={lib.id}>
                                <td>{i + 1}</td>
                                <td>{lib.title}</td>
                                <td>{lib.borrowerId}</td>
                                <td>{lib.borrowedOn}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </Container>
}