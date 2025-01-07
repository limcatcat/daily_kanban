import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../../static/css/login-page.css'

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
        <div className="login-container">
            <h2 className="login-heading">Sign in</h2>
            <div className="login-inputs">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleLogin();
                        }
                    }}
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
            Sign in
            </button>
            <div className="register-link">
                <Link to="/register">Don't have an account yet? Register here</Link>
            </div>
        </div>
    );

};

export default LoginPage;