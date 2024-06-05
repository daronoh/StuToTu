import React, { useEffect, useRef, useState, useContext } from 'react';
import AuthContext from "./context/AuthProvider";


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser('');
        setPwd('');
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <div id = "success">
                    <h1>Success!</h1>
                    <br />
                    <p>
                        <a href='/'>Go to Home</a>
                    </p>
                </div>
            ) : (
        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>   
            <h1>StuToTu</h1>
            <h2>Sign In</h2> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id ="username"
                    ref={userRef}
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
                Need an Account?<br />
                <span className='line'>
                    {/*put router link here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </div>
            )}
            </>
    )
}

export default Login
