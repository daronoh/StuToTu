import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from "./components/Login";
import Missing from './components/Missing';
import ProfileEdit from './components/ProfileEdit';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';


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
