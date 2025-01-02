import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await login(username, password);
            console.log('Login successful');            
        } catch (error) {
            console.error('Login failed', error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='Username' 
            />
            <input
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
    
};

export default LoginPage;