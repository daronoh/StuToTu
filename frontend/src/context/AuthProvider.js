import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            return { user, token };
        }
        return null;
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            setAuth({user, token});
        }
    }, []);

    const setAuthState = (user, token) => {
        if (user && token) {
            console.log('setting auth state:' + user + ',' + token);
            localStorage.setItem('user', user);
            localStorage.setItem('token', token);
            setAuth({user, token});
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setAuth(null);
        }
    };

    const logout = () => {
        console.log('logging out');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuth(null);
    }

    const getToken = () => {
        console.log('returning token: ' + auth.token);
        return auth ? auth?.token : null;
    };

    const getUser = () => {
        return auth ? auth?.user : null;
    }

    return (
        <AuthContext.Provider value = {{ auth, setAuthState, logout, setAuth, getToken, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;