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
        console.log('setting auth state:' + user + ',' + token);
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        setAuth({user, token});
    }

    const getToken = () => {
        console.log('returning token: ' + auth.token);
        return auth.token;
    };

    const getUser = () => {
        return auth.user;
    }

    return (
        <AuthContext.Provider value = {{ auth, setAuthState, setAuth, getToken, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;