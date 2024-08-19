import axios from "axios";
import { useEffect, useState } from "react";
import { Container, FormControl, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

export default function SearchBorrower() {
    const baseUrl = "http://localhost:8888/borrowers";
    const [searchTerm, setSearchTerm] = useState("");
    const [borrowers, setBorrowers] = useState([]);
    const auth = useAuth();
    
    useEffect(() => {
        const fetch = async () => {
            const errText = document.querySelector("#errText");
            if(errText) document.querySelector("#resultArea").removeChild(errText);
            if (!searchTerm){
                setBorrowers([]);
                return;
            }
            try {
                let result = await axios.get(`${baseUrl}/search?key=${searchTerm}`, {headers: {Authorization: `Bearer ${auth.user.token}`}});
                setBorrowers(result.data.message);
            }
            catch (err) {
                console.log(err);
                setBorrowers([]);
                const p = document.createElement("p");
                p.setAttribute('id',"errText");
                p.innerText = err.response.data.message;
                document.querySelector("#resultArea").appendChild(p);
            }
        };
        fetch();
    }, [searchTerm]);
    return (<>
        <FormControl type="search" className="container mb-3" name="searchTerm" id="searchTerm" placeholder="search..."
            onInput={() => { setSearchTerm(document.querySelector("#searchTerm").value) }} />
        <Container id="resultArea">
            
            {(borrowers.length > 0)
                ? <>
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
                </> : null}
        </Container>

    </>)
}