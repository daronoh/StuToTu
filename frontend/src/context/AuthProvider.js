import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : {token: null};
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ token });
        }
    }, []);

    const setToken = (token) => {
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
        setAuth({ token });
    };

    const getToken = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        return token;
    };

    return (
        <AuthContext.Provider value = {{ auth, setAuth, setToken, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;