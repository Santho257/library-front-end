import { Outlet, useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import SearchBooks from "./books/Search";

function Book() {
    const navi = useNavigate();
    const auth = useAuth();
    return <>
        <Container className="mt-2">
            <SearchBooks />
            <Outlet />
        </Container>
    </>
}
export default Book;