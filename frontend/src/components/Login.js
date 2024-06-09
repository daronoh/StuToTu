import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const LOGIN_URL = '/auth';

const Login = () => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
            setUser('');
            setPwd('');
            setSuccess(true);
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
        <>
            {success ? (
                <div id = "success">
                    <h1>Success!</h1>
                    <br />
                    <p>
                        <a href='/home'>Go to Home</a>
                    </p>
                </div>
            ) : (
        <div>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>   
            <h1>StuToTu</h1>
            <h2>Sign In</h2> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id ="username"
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
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
            )}
            </>
    )
}

export default Login
