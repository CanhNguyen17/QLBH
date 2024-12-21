import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        
        if (token && storedUsername) {
            setLoggedIn(true);
            setUsername(storedUsername);//set de load ko mat username
        } else {
            setLoggedIn(false);
        }
    }, []);

    const login = (username, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setUsername(username);
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ username, loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>);
};

export { AuthContext, AuthProvider }