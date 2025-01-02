import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const login = async (username, password) => {
        const response = await fetch('/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setToken(data.token);
            return data.token;
        } else {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{token, login, isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
};