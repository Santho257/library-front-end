import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, FormControl, FormLabel, FormSelect, FormText } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../services/Helpers";
import { toast } from "react-toastify";

function AddBook() {
    const { user } = useAuth();
    const genres = ["STORY", "SCI_FI", "FANTASY", "HISTORY", "ROMANCE", "HORROR", "THRILLER", "BIOGRAPHY",
        "AUTO_BIOGRAPHY", "ADVENTURE", "COMIC", "FICTIONAL", "THOUGHTS_AND_HABITS"];

    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState(0);
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    const add = async () => {
        console.log(document.querySelector("#publicationDate").value);
        try {
            const result = await axios.post(`${baseUrl}/books`, {
                title,
                authorId,
                genre,
                publicationDate
            }, { headers: { Authorization: `Bearer ${user.token}` } });
            toast.success(result.data.message, {position: "top-center"});
            setTitle('');
            setAuthorId(0);
            setGenre('');
            setPublicationDate('');
        }
        catch (err) {
            toast.error(err.response?.data?.message, {position: "top-center"});
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
            <Container>
                <h3 className="text-dark     text-center">Add Book</h3>
            </Container>
            <Container className="mt-3">
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl id="title" type="text" placeholder="title"
                value={title} onChange={(e) => setTitle(e.target.value)}></FormControl><br />
                
                
                <FormLabel htmlFor="authorId">Author</FormLabel>
                <FormSelect name="authorId" id="authorId" className="form-select" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    <option value=""></option>
                    {
                        authors.map((au) => {
                            return (<option key={au.id} value={au.id}>{au.name}</option>)
                        })
                    }
                </FormSelect><br />
                <label htmlFor="genre">Genre</label>
                <FormSelect name="genre" id="genre" className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value=""></option>
                    {
                        genres.map((gen, i) => {
                            return (<option key={i} value={gen}>{gen}</option>)
                        })
                    }
                </FormSelect><br />
                <FormLabel htmlFor="publicationDate">Publication date</FormLabel>
                <FormControl type="date" name="publicationDate" id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} /><br />
                <Button className="btn btn-primary" onClick={add}>Add</Button>
            </Container>
            <Container><p id="result"></p></Container>
        </>
    );
}

export default AddBook;