import axios from "axios";
import { Button, Container, FormControl, FormLabel } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

export default function AddBorrower() {
    const auth = useAuth();
    const baseUrl = "http://localhost:8888";
    const add = async () => {
        let result = await axios.post(`${baseUrl}/borrowers`, {
            username: document.querySelector("#username").value,
            name: document.querySelector("#name").value,
            password: document.querySelector("#password").value
        },{headers: {Authorization: `Bearer ${auth.user.token}`}});
        document.querySelector("#result").innerText = result.data.message;
    }
    return (
        <>
            <Container>
                <FormLabel htmlFor="username">UserName</FormLabel>
                <FormControl id="username" type="text" placeholder="username" /><br />
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl id="name" type="text" placeholder="name" /><br />
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl id="password" type="password" placeholder="password" /><br />
                <Button className="btn btn-primary" onClick={add}>Add</Button>
            </Container>
            <Container><p id="result"></p></Container>
        </>
    );
}