import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../services/Helpers";
import useAuth from "../../hooks/useAuth";
import { Container, Table } from "react-bootstrap";


export default function Return(){
    const auth = useAuth();
    const [library, setLibrary] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        async function fetch() {
            try {
                let result = await axios.get(`${baseUrl}/library/borrower/unreturned`,{ headers: { Authorization: `Bearer ${auth.user.token}` } });
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
    }, [count]);

    const returnBook = async (id) => {
        console.log(auth.user.token)
        let result = await axios.post(`${baseUrl}/library/return/${id}`, {},{ headers: { Authorization: `Bearer ${auth.user.token}` } });
        document.querySelector("#returnedMessage").innerText = result.data.message;
        setCount(count+1)
    };

    return <>
        <Container><p id="returnedMessage"></p></Container>
        <Table striped className = "container">
            <thead className="table-primary">
                <tr>
                    <th>S.No</th>
                    <th>Title</th>
                    <th>Borrower</th>
                    <th>Borrowed On</th>
                    <th>Return</th>
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
                                <td><a type="button" className="link"onClick={() => returnBook(lib.bookId)}>return</a></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </>
}