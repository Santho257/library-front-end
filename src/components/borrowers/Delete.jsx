import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Table } from "react-bootstrap";
import { baseUrl } from "../services/Helpers";

export default function DeleteBorrower() {
    const {user} = useAuth();
    const [count, setCount] = useState(0);
    const [borrowers, setBorrowers] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/borrowers`, { headers: { Authorization: `Bearer ${user.token}` } });
                if (result.data.statusCode != "OK") {
                    document.querySelector("#deletedMessage").innerText = result.data.message;
                }
                else
                    setBorrowers(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [count]);

    const deleteBorrower = async (id) => {
        let result = await axios.delete(`${baseUrl}/borrowers/${id}`, {headers: {Authorization: `Bearer ${user.token}`}});
        document.querySelector("#deletedMessage").innerText = result.data.message;
        setCount(count + 1)
    };

    return (
        <>
            <Container><p id="deletedMessage" className="text-center text-success"></p></Container>
            <Table className="container" striped hover>
                <thead className="table-primary">
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        borrowers.map((borrower, i) => {
                            return (
                                <tr key={borrower.username}>
                                    <td>{i + 1}</td>
                                    <td>{borrower.username}</td>
                                    <td><a className="link" type="button" onClick={() => deleteBorrower(borrower.username)}>delete</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>)

}