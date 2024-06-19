import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(token);
        }
    }, []);

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setAuth(token);
        console.log('setting token: ', token);
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    return (
        <AuthContext.Provider value = {{ auth, setAuth, setToken, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;