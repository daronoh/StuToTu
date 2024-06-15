import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Login from "./components/Login";
import Register from './components/Register';
import Home from './components/Home';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import ProfileEdit from './components/ProfileEdit';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {}
        <Route path = "Login" element={<Login />} />
        <Route path = "Register" element={<Register />} />
        <Route path = "Unauthorized" element={<Unauthorized />} />
        {}
        <Route element={<RequireAuth />}>
        <Route path = "Home" element={<Home />} />
        <Route path = "ProfileEdit" element={<ProfileEdit />} />
        </Route>
        {}
        <Route path = "*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
