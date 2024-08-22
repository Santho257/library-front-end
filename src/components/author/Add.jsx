import axios from "axios";
import { Button, Container, FormControl, FormLabel, FormText } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function AddAuthor() {
    const [name, setName] = useState("");
    const {user} = useAuth();
    const baseUrl = "http://localhost:8888";
    const add = async () => {
        let result = await axios.post(`${baseUrl}/authors`, {
            name
        },{headers:{Authorization: `Bearer ${user.token}`}});
        document.querySelector("#result").innerText = result.data.message;
    }
    return (
        <>
            <Container>
                <FormLabel htmlFor="name">Author Name</FormLabel>
                <FormControl id="name" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} ></FormControl><br />
                <Button variant="primary" onClick={add}>Add</Button>
            </Container>
            <div><p id="result" className="text-center text-success"></p></div>
        </>
    );
}
export default AddAuthor;