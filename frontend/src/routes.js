import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Home from './components/Home'

const BaseRouter = () => (
    <div>
        <Routes>
            <Route exact path = '/' Component = {Login}/>
            <Route exact path = '/register' Component = {Register}/>
            <Route exact path = '/home' Component = {Home}/>
        </Routes>
    </div>
    
)

export default BaseRouter;