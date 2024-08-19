import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth'
import {baseUrl} from '../services/Helpers'
import { Container, FormSelect, Table } from "react-bootstrap";


export default function History() {
    const [borrower, setBorrower] = useState("");
    const [borrowers, setBorrowers] = useState([]);
    const [library, setLibrary] = useState([]);
    const auth = useAuth();
    useEffect(() => {
        async function fetch() {
            console.log(auth.use)
            try {
                let result;
                if(!borrower)
                    result = await axios.get(`${baseUrl}/library`,{headers: {Authorization: `Bearer ${auth.user.token}`}});
                else
                    result = await axios.get(`${baseUrl}/library/borrower/${borrower}`, {headers: {Authorization: `Bearer ${auth.user.token}`}})
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
    }, [borrower]);

    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/borrowers`, {headers: {Authorization: `Bearer ${auth.user.token}`}});
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
    },[]);


    return <>
        <Container className="mb-3">
            Borrower:
            <FormSelect name="bwr" id="bwr" className="form-select" onChange={() => setBorrower(bwr.value)}>
                <option value=""></option>
                {borrowers.map(brw => {
                    return <option key={brw.username} value={brw.username}>{brw.username}</option>
                })}
            </FormSelect>
        </Container>
        <Table className="container" striped hover>
            <thead className="table-primary">
                <tr>
                    <th>S.No</th>
                    <th>Title</th>
                    <th>Borrower</th>
                    <th>Borrowed On</th>
                    <th>Returned On</th>
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
                                <td>{lib.returnedOn ? lib.returnedOn : "--"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </>
}