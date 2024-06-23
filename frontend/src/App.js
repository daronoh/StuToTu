import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from "./components/Login";
import Missing from './components/Missing';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import useAuth from './hooks/useAuth';

function App() {

  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={auth ? <Navigate to="/Home" /> : <Navigate to="/Login" />} />
        <Route path="Login" element={auth ? <Navigate to="/Home" /> : <Login />} />
        <Route path = "Register" element={<Register />} />
        <Route path = "Unauthorized" element={<Unauthorized />} />
        {}
        <Route element={<RequireAuth />}>
        <Route path = "Home" element={<Home />} />
        <Route path = "Profile" element={<Profile />} />
        <Route path = "Profile/:username" element={<Profile />} />
        <Route path = "Profile/Edit/:username" element={<ProfileEdit />} />
        </Route>
        {}
        <Route path = "*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
