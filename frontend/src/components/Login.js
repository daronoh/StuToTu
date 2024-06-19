import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/login';

const Login = () => {
    const { setToken } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            // Store JWT token in local storage or cookie
            const accessToken = response?.data?.accessToken;
            setToken(accessToken);
            setUser('');
            setPwd('');
            navigate(from, { replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Username or Password does not exist');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    return (
        <div>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>   
            <h1>StuToTu</h1>
            <h2>Sign In</h2> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    className='textbox'
                    type="text" 
                    id ="username"
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    className='textbox'
                    type="password" 
                    id ="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <button>Sign In</button>
            </form>
            <p id="signin">
                Don't have an Account?<br />
                <span className='line'>
                    <a href="/register">Sign Up</a>
                </span>
            </p>
        </div>
    )
}

export default Login
