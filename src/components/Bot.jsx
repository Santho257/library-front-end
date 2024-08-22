import { Outlet, useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

function Bot() {
    const {user} =useAuth();
    const navi = useNavigate();
    return <>
        <Container className="m-2">
            <Row className="justify-content-center">
                <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("view")}>View</button>
                </Col>
                <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("remove")}>Remove</button>
                </Col>
                {user.role == 'ADMIN' && <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("add")}>Add</button>
                </Col>}
            </Row>
        </Container>
        <Outlet/>
    </>
}
export default Bot;