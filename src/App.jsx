import './components/services/Polyfills.js'
import { Route, Routes, useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AddAuthor from './components/author/Add.jsx';
import AddBook from './components/books/Add.jsx';
import Login from './components/authentication/Login.jsx';
import AdminRegister from './components/authentication/AdminRegister.jsx';
import Register from './components/authentication/Register.jsx';
import RequireAuth from './components/authentication/RequireAuth.jsx';
import Unauthorized from './components/extras/Unauthorized.jsx';
import ChatRoom from './components/chat-room/ChatRoom.jsx';
import AddBotQuestion from './components/Bot/Add.jsx';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Book from './components/redesign/Book.jsx';
import Author from './components/redesign/Author.jsx';
import NavBar from './components/redesign/NavBar.jsx';
import Borrower from './components/redesign/Borrower.jsx';
import Bot from './components/redesign/Bot.jsx';
import Library from './components/redesign/Library.jsx';
import NotFound404 from './components/extras/NotFound404.jsx';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div id='response'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin-signup' element={<AdminRegister />} />
          <Route path='/borrower-signup' element={<Register />} />
          <Route path='/authors' element={<Author />} />
          <Route path='/books' element={<Book />} />

          <Route element={<RequireAuth />}>
            <Route path='/help' element={<ChatRoom />} />
            <Route path='/library' element={<Library />} />
          </Route>

          <Route element={<RequireAuth roles={"ADMIN"} />}>
            <Route path='/authors/add' element={<AddAuthor />} />
            <Route path='/books/add' element={<AddBook />} />
            <Route path='/bot' element={<Bot />} />
            <Route path='/borrowers' element={<Borrower />} />
            <Route path='/bot/add' element={<AddBotQuestion />} />
          </Route>
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NotFound404/>}/>
        </Routes>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;