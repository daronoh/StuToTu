import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (user && token && role) {
            return { user, token , role};
        }
        return null;
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (user && token && role) {
            setAuth({user, token, role});
        }
    }, []);

    const setAuthState = (user, token, role) => {
        if (user && token && role) {
            console.log('setting auth state:' + user + ',' + token + ',' + role);
            localStorage.setItem('user', user);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setAuth({user, token, role});
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setAuth(null);
        }
    };

    const logout = () => {
        console.log('logging out');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuth(null);
    }

    const getToken = () => {
        console.log('getting token');
        return auth ? auth?.token : null;
    };

    const getUser = () => {
        return auth ? auth?.user : null;
    }

    const getRole = () => {
        return auth ? auth?.role : null;
    }

    return (
        <AuthContext.Provider value = {{ auth, setAuthState, logout, setAuth, getToken, getUser, getRole}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;