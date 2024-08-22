import axios from "axios";
import { Button, Container, FormControl, FormLabel } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../services/Helpers";
import { useState } from "react";

export default function AddBorrower() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const {user} = useAuth();
    const add = async () => {
        let result = await axios.post(`${baseUrl}/borrowers`, {
            username,
            name,
            password
        },{headers: {Authorization: `Bearer ${user.token}`}});
        document.querySelector("#result").innerText = result.data.message;
    }
    return (
        <>
            <Container>
                <FormLabel htmlFor="username">UserName</FormLabel>
                <FormControl id="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl id="name" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/><br />
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
                <Button className="btn btn-primary" onClick={add}>Add</Button>
            </Container>
            <Container><p id="result" className="text-center text-success"></p></Container>
        </>
    );
}