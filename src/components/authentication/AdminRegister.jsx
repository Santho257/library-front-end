import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { baseUrl } from "../services/Helpers";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminRegister() {
  const navigator = useNavigate();
  const auth = useAuth();
  const [alert,setAlert] = useState({
    variant: "primary",
    content: "Enter Details"
  })
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    name:"",
    password: ""
  });

  const handleFeildChange = (feild, value) => {
    setLoginDetail({ ...loginDetail, [feild]: value })
  }

  const handleSubmit = async (e) => {
    console.log(loginDetail);
    e.preventDefault();
    try {
      const result = await axios.post(`${baseUrl}/auth/admin-signup`, loginDetail);
      auth.setUser(result.data);
      navigator("/books/list");
    }
    catch (err) {
      setAlert({
        variant:"danger",
        content: JSON.stringify(err.response.data)
      })
      console.log(err.response.data);
    }
  }
  return (
    <Container className="m-5">
      <Alert variant={alert.variant}>{alert.content}</Alert>
      <Form>

        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email"
            placeholder="name@example.com"
            value={loginDetail.email}
            onInput={(e) => { handleFeildChange("username", e.target.value) }} />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingName"
          label="Name"
          className="mb-3"
        >
          <Form.Control type="text"
            placeholder="Ur Name"
            value={loginDetail.name}
            onInput={(e) => { handleFeildChange("name", e.target.value) }} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control type="password"
            placeholder="Password"
            value={loginDetail.password}
            onInput={(e) => { handleFeildChange("password", e.target.value) }} />
        </FloatingLabel>

        <Button variant="primary" type="submit"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}