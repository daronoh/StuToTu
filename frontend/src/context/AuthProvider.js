import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user: null, token: null});

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
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        setAuth({user, token});
    };

    const logout = () => {
        console.log('logging out');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuth({ user: null, token: null });
    }

    const getToken = () => {
        console.log('returning token: ' + auth.token);
        return auth?.token;
    };

    const getUser = () => {
        return auth?.user;
    }

    return (
        <AuthContext.Provider value = {{ auth, setAuthState, logout, setAuth, getToken, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;