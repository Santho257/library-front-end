import axios from "axios";
import { useEffect, useState } from "react"
import { Container, Form, FormControl, FormText, InputGroup, Table } from "react-bootstrap";

export default function SearchAuthor() {
    const baseUrl = "http://localhost:8888/authors";
    const [searchTerm, setSearchTerm] = useState("");
    const [debounce, setDebounce] = useState(null);
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const errText = document.querySelector("#errText");
            if(errText) document.querySelector("#resultArea").removeChild(errText);
            if (!searchTerm){
                setAuthors([]);
                return;
            }
            try {
                let result = await axios.get(`${baseUrl}/search?key=${searchTerm}`);
                setAuthors(result.data.message);
            }
            catch (err) {
                setAuthors([]);
                const p = document.createElement("h6");
                p.setAttribute('id',"errText");
                p.classList.add("text-danger")
                p.innerText = err.response.data.message;
                document.querySelector("#resultArea").appendChild(p);
            }
        };
        clearTimeout(debounce);
        setDebounce(setTimeout(fetch,200));
    },[searchTerm]);
    return (<>
        <FormControl type="search" className="container mb-5" name="searchTerm" id="searchTerm" placeholder="search..."
            onInput={() => { setSearchTerm(document.querySelector("#searchTerm").value) }} />
        <Container id="resultArea">
            
            {(authors.length > 0)
                ? <>
                    <Table className="container" striped hover>
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
                                        <tr key={author.id}>
                                            <td>{i + 1}</td>
                                            <td>{author.name}</td>
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