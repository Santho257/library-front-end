import axios from "axios";
import { Button, Container, FormControl, FormLabel, FormText } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

function AddAuthor() {
    const [name, setName] = useState("");
    const {user} = useAuth();
    const baseUrl = "http://localhost:8888";
    const add = async () => {
        let result = await axios.post(`${baseUrl}/authors`, {
            name
        },{headers:{Authorization: `Bearer ${user.token}`}});
        toast.success(result.data.message,{position: "top-center"});
    }
    return (
        <>
            <Container>
                <FormLabel htmlFor="name">Author Name</FormLabel>
                <FormControl id="name" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} ></FormControl><br />
                <Button variant="primary" onClick={add}>Add</Button>
            </Container>
        </>
    );
}
export default AddAuthor;