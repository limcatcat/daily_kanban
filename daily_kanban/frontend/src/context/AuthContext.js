import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const csrftoken = document.querySelector('[name=csrf-token]').content;


    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);


    const login = async (username, password) => {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setToken(data.token);
            return data.token;
        } else {
            throw new Error(error.error || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }


    // // expose login and logout globally so that they can be called from outside React app
    // useEffect(() => {
    //     window.loginFunction = login;
    //     window.logoutFunction = logout;
    // }, [login, logout]);


    return (
        <AuthContext.Provider value={{token, login, isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
};