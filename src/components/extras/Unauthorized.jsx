import { Container, Row } from "react-bootstrap";

export default function Unauthorized() {
    return <Container>
       <h3 className="text-danger text-center">You are not allowed to perform this.</h3>
    </Container>
}