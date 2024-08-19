import { Outlet, useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";

function Borrower() {
    const navi = useNavigate();
    return <>
        <Container className="m-2">
            <Row className="justify-content-center">
                <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("list")}>List</button>
                </Col>
                <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("remove")}>Remove</button>
                </Col>
                <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("sort")}>Sort</button>
                </Col>
                <Col md="auto">
                    <button className="btn btn-primary" onClick={() => navi("search")}>Search</button>
                </Col>
            </Row>
        </Container>
        <Outlet/>
    </>
}
export default Borrower;