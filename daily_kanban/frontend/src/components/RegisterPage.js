import React, { useState } from 'react';
import '../../static/css/register-page.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrftoken = document.querySelector('[name=csrf-token]').content;

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            first_name: formData.firstName,
            last_name: formData.lastName
        };

        try {
            const response = await fetch('/register/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: ''
                    }
                );
                setSuccessMessage('Your account was created successfully!')
                console.log('Registration successful:', result);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
        }

    };


    return (
        <div className="register-container">
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;