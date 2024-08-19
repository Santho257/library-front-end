import { Container, Row } from "react-bootstrap";

export default function Unauthorized() {
    return <Container>
        <Row className="justify-content-center align-items-center">
            <h3>You are not authorized to perform this function</h3>
        </Row>
    </Container>
}