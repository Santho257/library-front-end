import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, FormControl, FormLabel, FormSelect, FormText } from "react-bootstrap";

function AddBook() {
    const genres = ["STORY", "SCI_FI", "FANTASY", "HISTORY", "ROMANCE", "HORROR", "THRILLER", "BIOGRAPHY",
        "AUTO_BIOGRAPHY", "ADVENTURE", "COMIC", "FICTIONAL", "THOUGHTS_AND_HABITS"]
    const [authors, setAuthors] = useState([]);
    const baseUrl = "http://localhost:8888";

    const add = async () => {
        console.log(document.querySelector("#publicationDate").value);
        try {
            const result = await axios.post(`${baseUrl}/books`, {
                title: document.querySelector("#title").value,
                authorId: document.querySelector("#authorId").value,
                genre: document.querySelector("#genre").value,
                publicationDate: document.querySelector("#publicationDate").value
            });
            console.log(result.data);
            document.querySelector("#result").innerText = result.data.message;
        }
        catch (err) {
            document.querySelector("#result").innerText = err.response.data.message;
        }
    }

    useEffect(() => {
        async function getAuthors() {
            try {
                let result = await axios.get(`${baseUrl}/authors`);
                if (result.data.statusCode != "OK") {
                    console.log(result.data.statusCode);
                }
                setAuthors(result.data.message);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAuthors();
    }, []);

    return (
        <>
            <Container className="mt-3">
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl id="title" type="text" placeholder="title" ></FormControl><br />
                <FormLabel htmlFor="authorId">Author</FormLabel>
                <FormSelect name="authorId" id="authorId" className="form-select">
                    <option value=""></option>
                    {
                        authors.map((au) => {
                            return (<option key={au.id} value={au.id}>{au.name}</option>)
                        })
                    }
                </FormSelect><br />
                <label htmlFor="genre">Genre</label>
                <FormSelect name="genre" id="genre" className="form-select">
                    <option value=""></option>
                    {
                        genres.map((gen, i) => {
                            return (<option key={i} value={gen}>{gen}</option>)
                        })
                    }
                </FormSelect><br />
                <FormLabel htmlFor="publicationDate">Publication date</FormLabel>
                <FormControl type="date" name="publicationDate" id="publicationDate" /><br />
                <Button className="btn btn-primary" onClick={add}>Add</Button>
            </Container>
            <Container><p id="result"></p></Container>
        </>
    );
}

export default AddBook;