import { createContext, useEffect, useState } from "react";
import axios from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : {};
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ token });
        }
    }, []);

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token });
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    axios.interceptors.request.use(
        config => {
            const token = getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    return (
        <AuthContext.Provider value = {{ auth, setAuth, setToken, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;