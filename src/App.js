import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Home from './Pages/Home'
import SignIn from './Pages/Signin'
import SignUp from './Pages/Signup'
import BookMark from './Pages/BookMark'
import BTO from './Pages/BTO'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/bto" element={<BTO/>} />
        <Route path="/bookmark" element={<BookMark/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
