import './components/services/Polyfills.js'
import { Route, Routes, useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Author from './components/Author.jsx';
import Book from './components/Book.jsx'
import Borrower from './components/Borrower.jsx';
import Library from './components/Library.jsx';
import AddAuthor from './components/author/Add.jsx';
import ListAuthor from './components/author/List.jsx';
import DeleteAuthor from './components/author/Delete.jsx';
import SortAuthor from './components/author/Sort.jsx';
import ListBook from './components/books/List.jsx';
import AddBook from './components/books/Add.jsx';
import DeleteBook from './components/books/Delete.jsx';
import SortBook from './components/books/Sort.jsx';
import ListBorrowers from './components/borrowers/List.jsx';
import AddBorrower from './components/borrowers/Add.jsx';
import DeleteBorrower from './components/borrowers/Delete.jsx';
import SortBorrower from './components/borrowers/Sort.jsx';
import History from './components/library/History.jsx';
import Borrow from './components/library/Borrow.jsx';
import Return from './components/library/Return.jsx';
import UnReturned from './components/library/UnReturned.jsx';
import SearchAuthor from './components/author/Search.jsx';
import SearchBooks from './components/books/Search.jsx';
import SearchBorrower from './components/borrowers/Search.jsx';
import Login from './components/authentication/Login.jsx';
import AdminRegister from './components/authentication/AdminRegister.jsx';
import Register from './components/authentication/Register.jsx';
import { Container, Navbar, NavbarBrand, NavItem, NavLink } from 'react-bootstrap';
import RequireAuth from './components/authentication/RequireAuth.jsx';
import Unauthorized from './components/extras/Unauthorized.jsx';
import useAuth from './hooks/useAuth.jsx';
import useStomp from './hooks/useStomp.jsx';

function App() {
  const navi = useNavigate();
  const auth = useAuth();
  const {stompClient, updateStompClient} = useStomp();

  const links = [{ page: "/books/list", head: "Books", show: true }, { page: "/authors/list", head: "Authors", show: true }, { page: "/borrowers/list", head: "Borrowers", show: auth.user.token && auth.user.role == "ADMIN" }, { page: "/library", head: "Library", show: auth.user.token }, { page: "/login", head: "Login", show: !auth.user.token }, { page: "/admin-signup", head: "Admin Signup", show: !auth.user.token }, { page: "/borrower-signup", head: "Borrower Signup", show: !auth.user.token }
  ];

  const logout = (e) => {
    e.preventDefault();
    const clearStomp = async () => {
      await stompClient.send(`/app/user.disconnect`, {}, JSON.stringify({}));
      updateStompClient(null);
    }
    clearStomp();
    auth.updateUser({ token: "", role: "" });
    navi("/login");
  };

  return (
    <>
      <Navbar className="navbar-dark bg-dark">
        <Container>
          <NavbarBrand>Library Management System</NavbarBrand>
          <ul className="navbar-nav" id="nav">
            {links.map((link, i) => {
              return link.show && <NavItem key={i}>
                <NavLink href="" onClick={() => navi(link.page)}>{link.head}</NavLink>
              </NavItem>
            })}
            {auth.user.token && <NavItem>
              <NavLink href="" onClick={logout}>Logout</NavLink>
            </NavItem>}

            {auth.user.token && <NavItem>
              <NavLink href="" onClick={(e) => {
                e.preventDefault();
                navi("/help")
              }}>Help</NavLink>
            </NavItem>}
          </ul>
        </Container>
      </Navbar>
      <div id='response'>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin-signup' element={<AdminRegister />} />
          <Route path='/borrower-signup' element={<Register />} />

          <Route path='/authors' element={<Author />}>
            <Route path='list' element={<ListAuthor />} />
            <Route path='sort' element={<SortAuthor />} />
            <Route path='search' element={<SearchAuthor />} />

            <Route element={<RequireAuth roles={"ADMIN"} />}>
              <Route path='add' element={<AddAuthor />} />
              <Route path='remove' element={<DeleteAuthor />} />
            </Route>
          </Route>

          <Route path='/books' element={<Book />} >
            <Route path='list' element={<ListBook />} />
            <Route path='sort' element={<SortBook />} />
            <Route path='search' element={<SearchBooks />} />
            <Route element={<RequireAuth roles={"ADMIN"} />}>
              <Route path='add' element={<AddBook />} />
              <Route path='remove' element={<DeleteBook />} />
            </Route>
          </Route>

          <Route element={<RequireAuth roles={"ADMIN"} />}>
            <Route path='/borrowers' element={<Borrower />} >
              <Route path='add' element={<AddBorrower />} />
              <Route path='list' element={<ListBorrowers />} />
              <Route path='remove' element={<DeleteBorrower />} />
              <Route path='sort' element={<SortBorrower />} />
              <Route path='search' element={<SearchBorrower />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='/library' element={<Library />} >
              <Route element={<RequireAuth roles={"ADMIN"} />}>
                <Route path='history' element={<History />} />
                <Route path='unreturned' element={<UnReturned />} />
              </Route>
              <Route element={<RequireAuth roles={"BORROWER"} />}>
                <Route path='borrow' element={<Borrow />} />
                <Route path='return' element={<Return />} />
              </Route>
            </Route>
          </Route>
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </div>
    </>
  );
}

export default App;