import { Outlet, useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function Library() {
    const navi = useNavigate();
    const auth = useAuth();

    return <>
        <Container className="mt-2 mb-2 align-items-center d-flex">
            <Container>
                <button className="btn btn-primary" onClick={() => navi("history")}>History</button>
            </Container>
            {auth.user?.role == "BORROWER" && <Container>
                <button className="btn btn-primary" onClick={() => navi("borrow")}>Borrow</button>
            </Container>}
            {auth.user?.role == "BORROWER" && <Container>
                <button className="btn btn-primary" onClick={() => navi("return")}>Return</button>
            </Container>}
            {auth.user?.role == "ADMIN" && <Container>
                <button className="btn btn-primary" onClick={() => navi("unreturned")}>Unreturned</button>
            </Container>}
        </Container>
        <Outlet />
    </>
}
export default Library;