import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/register';


const RegisterStudent = () => {

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] =useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] =useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] =useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [role] = useState('STUDENT');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // for the case where button was enabled illegally
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        // use axios to submit user and pwd
        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({username: user, password: pwd, firstName, lastName, email, gender, role}),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg(err.response.data);
            } else {
                setErrMsg('Registration failed')
            }
        }
    }

    return (
        <>
        {
            success ? (
                <div id="success">
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </div>
            ) : (
        <div>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>StuToTu</h1>
            <h2>Register as a Student</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    className='textbox'
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 16 characters and must begin with a letter.
                </p>


                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    className='textbox'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"   
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}      
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include a letter and a number.
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    className='textbox'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Does not match password.
                </p>
                <label htmlFor="firstname">First Name: </label>
                <input
                    type="text"
                    id="firstname"
                    className='textbox'
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="lastname">Last Name: </label>
                <input
                    type="text"
                    id="lastname"
                    className='textbox'
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    className='textbox'
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <InputLabel sx={{color: 'black'}}>Gender</InputLabel>
                    <Select
                        value={gender}
                        label="Gender"
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                    </Select>
                    <button disabled={!validName || !validPwd || !validMatch ? true : false} className='loginbutton'>Sign Up</button>
            </form>
            <p id="signin">
                Have an account?<br />
                <span className="line">
                    <a href="/login">Sign In</a>
                </span>
            </p>
        </div>
            )
        }
        </>
    )
}

export default RegisterStudent;
