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
        try {
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
                setIsAuthenticated(true);
                console.log(`Signed in with: ${username}`);
                
                return data.token;
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                throw new Error(errorData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            throw error;
        }
    };

    // const logout = async () => {

    //     const token_latest = localStorage.getItem('token');

    //     const response = await fetch('/api/logout/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Authorization': `Bearer ${token_latest}`,
    //         },
    //     });

    //     if (response.ok) {
    //         localStorage.removeItem('token');
    //         setToken(null);
    //         setIsAuthenticated(false);
    //         console.log('Logged out successfully');
    //     } else {
    //         console.error('Logout failed');
    //     }
    // };

    const logout = () => {
            localStorage.removeItem('token');
            setToken(null);
            setIsAuthenticated(false);
            console.log('Logged out successfully');
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