import { Outlet, useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function Library() {
    const navi = useNavigate();
    const auth = useAuth();
    
    return <>
        <Container className="m-2">
            <Row className="justify-content-center">
                {auth.user?.role == "ADMIN" && <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("history")}>History</button>
                </Col>}
                {auth.user?.role == "BORROWER" && <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("borrow")}>Borrow</button>
                </Col>}
                {auth.user?.role == "BORROWER" &&<Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("return")}>Return</button>
                </Col>}
                {auth.user?.role == "ADMIN" && <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("unreturned")}>Unreturned</button>
                </Col>}
            </Row>
        </Container>
        <Outlet/>
    </>
}
export default Library;