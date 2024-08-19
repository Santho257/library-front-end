import axios from "axios";
import { Button, Container, FormControl, FormLabel, FormText } from "react-bootstrap";

function AddAuthor() {
    const baseUrl = "http://localhost:8888";
    const add = async () => {
        const name = document.querySelector("#name").value;
        let result = await axios.post(`${baseUrl}/authors`, {
            name
        });
        document.querySelector("#result").innerText = result.data.message;
    }
    return (
        <>
            <Container>
                <FormLabel htmlFor="name">Author Name</FormLabel>
                <FormControl id="name" type="text" placeholder="name" ></FormControl><br />
                <Button variant="primary" onClick={add}>Add</Button>
            </Container>
            <div><p id="result"></p></div>
        </>
    );
}
export default AddAuthor;