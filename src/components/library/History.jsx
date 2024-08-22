import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth'
import {baseUrl} from '../services/Helpers'
import { Container, FormSelect, Table } from "react-bootstrap";
import useReceiver from "../../hooks/useReceiver";


export default function History() {
    const [borrower, setBorrower] = useState("");
    const [borrowers, setBorrowers] = useState([]);
    const [library, setLibrary] = useState([]);
    const {user} = useAuth();
    const {receiver} = useReceiver();
    useEffect(() => {
        async function fetch() {
            if(user.role == "BORROWER"){
                try{
                    const result = await axios.get(`${baseUrl}/library/borrower`,{headers: {Authorization: `Bearer ${user.token}`}});
                    setLibrary(result.data.message);
                }
                catch(err){
                    console.log(err);
                }
                return;
            }
            try {
                let result;
                if(!borrower)
                    result = await axios.get(`${baseUrl}/library`,{headers: {Authorization: `Bearer ${user.token}`}});
                else
                    result = await axios.get(`${baseUrl}/library/borrower/${borrower}`, {headers: {Authorization: `Bearer ${user.token}`}})
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
        if(user.role == "BORROWER"){
            return;
        } 
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/borrowers`, {headers: {Authorization: `Bearer ${user.token}`}});
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
        {(user.role =="ADMIN") && <Container className="mb-3">
            Borrower:
            <FormSelect name="bwr" id="bwr" className="form-select" onChange={() => setBorrower(bwr.value) } value={borrower}>
                <option value=""></option>
                {(receiver.email)&&<option value={receiver.email}>Support: {receiver.name}</option>}
                {borrowers.map(brw => {
                    return receiver.email != brw.username && <option key={brw.username} value={brw.username}>{brw.username}</option>
                })}
            </FormSelect>
        </Container>}
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