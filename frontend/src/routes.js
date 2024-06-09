import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';

const BaseRouter = () => (
    <div>
        <Routes>
            <Route exact path = '/' Component = {Login}/>
            <Route exact path = '/register' Component = {Register}/>
        </Routes>
    </div>
    
)

export default BaseRouter;