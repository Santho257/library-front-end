import { Container, Navbar, NavbarBrand, NavItem, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useReceiver from "../../hooks/useReceiver";
import useStomp from "../../hooks/useStomp";

export default function NavBar() {
  const navi = useNavigate();
  const { user, updateUser } = useAuth();
  const { receiver, updateReceiver } = useReceiver();
  const { stompClient, updateStompClient } = useStomp();

  const links = [{ page: "/books", head: "Books", show: true },
  { page: "/authors", head: "Authors", show: true },
  { page: "/borrowers", head: "Borrowers", show: user.token && user.role == "ADMIN" },
  { page: "/bot", head: "Bot", show: user.token && user.role == "ADMIN" },
  { page: "/library", head: "Library", show: user.token },
  { page: "/login", head: "Login", show: !user.token },
  { page: "/admin-signup", head: "Admin Signup", show: !user.token },
  { page: "/borrower-signup", head: "Borrower Signup", show: !user.token }
  ];

  const logout = (e) => {
    e.preventDefault();
    const clearStomp = async () => {
      await stompClient.send(`/app/user.disconnect`, {}, JSON.stringify({
        receiver: receiver.email
      }));
      updateStompClient(null);
    }
    clearStomp();
    updateUser({ token: "", role: "" });
    updateReceiver()
    navi("/login");
  };


  return (
    <Navbar className="navbar-dark bg-dark">
      <Container>
        <NavbarBrand>Library Management System</NavbarBrand>
        <ul className="navbar-nav" id="nav">
          {links.map((link, i) => {
            return link.show && <NavItem key= {i}>
              <NavLink href="" onClick={() => navi(link.page)}>{link.head}</NavLink>
            </NavItem>
          })}
          {user.token && <NavItem>
            <NavLink href="" onClick={logout}>Logout</NavLink>
          </NavItem>}

          {user.token && <NavItem>
            <NavLink href="" onClick={(e) => {
              e.preventDefault();
              navi("/help")
            }}>Help</NavLink>
          </NavItem>}
        </ul>
      </Container>
    </Navbar>
  )
}
