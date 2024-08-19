import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FormSelect, Table } from "react-bootstrap";

function SortAuthor() {
    const baseUrl = "http://localhost:8888"
    const [authors, setAuthors] = useState([]);
    const [by, setBy] = useState(null);
    useEffect(() => {
        async function fetch() {
            try {
                let result;
                if (!by)
                    result = await axios.get(`${baseUrl}/authors/sort`);
                else
                    result = await axios.get(`${baseUrl}/authors/sort?by=${by}`)
                if (result.data.statusCode != "OK") {
                    console.log(result.data.statusCode);
                }
                console.log(result.data.message);
                setAuthors(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [by]);

    return (
        <>
            <div>
                <FormSelect className="container mb-2"  name="choice" id="choice" onChange={() => setBy(document.querySelector("#choice").value)}>
                    <option value="">By Name</option>
                    <option value="booksWritten">By Books Written</option>
                </FormSelect>
            </div>
            <Table striped className="container">
                <thead className="table-primary">
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        {by ? <th>Books Count</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map((author, i) => {
                            return (
                                <tr key={author.id}>
                                    <td>{i + 1}</td>
                                    <td>{author.name}</td>
                                    {by ? <td>{author.count}</td> : null}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>);

}

export default SortAuthor;