import React, { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);


    const csrftoken = document.querySelector('[name=csrf-token]').content;

    // useEffect(() => {
    //     localStorage.removeItem('token');
    //     setToken(null);
    //     setIsAuthenticated(false);
    //     console.log('User is logged out automatically on app start.');        
    // }, []);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);


    const login = async (username, password) => {
        try {
            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({username, password}),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.key);
                setToken(data.key);
                setIsAuthenticated(true);
                console.log(`Signed in with: ${username}`);

                // if (fetchTasks) {
                //     fetchTasks(new Date());
                //     console.log(`Tasks fetched for ${username}`);
                // }
                
                return data.key;
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
    //     try {
    //             const response = await fetch('/api/auth/logout/', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-type': 'application/json',
    //                     'Authorization': `Token ${token}`,
    //                 },
    //             });
        
    //             if (response.ok) {
    //                 localStorage.removeItem('token');
    //                 setToken(null);
    //                 setIsAuthenticated(false);
    //                 console.log('Logged out successfully');
    //             } else {
    //                 console.error('Logout failed');
    //                 console.log(response.status);
                    
    //                 // clear token and reset state if unauthorized
    //                 if (response.status === 401) {
    //                     localStorage.removeItem('token');
    //                     setToken(null);
    //                     setIsAuthenticated(false);
    //                     console.warn('Token was invalid. Token has been cleared from storage.');
    //                 } else {console.log('Status is not 401.');
    //                 }
    //             }
    //     } catch (error) {
    //         console.error('An error occurred during logout:', error);
    //         localStorage.removeItem('token');
    //         setToken(null);
    //         setIsAuthenticated(false);
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
        <AuthContext.Provider value={{token, setToken, isAuthenticated, setIsAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};