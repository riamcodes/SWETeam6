import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    // Define state variables
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('=== Frontend Login Attempt ===');
        console.log('Login data:', {
            email: formData.email,
            password: formData.password
        });

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
            console.log('Login successful:', response.data);
            setMessage(`Welcome ${response.data.name}! (${response.data.role})`);
        } catch (error) {
            console.error('Login failed:', {
                status: error.response?.status,
                data: error.response?.data,
                error: error.message
            });
            setMessage(error.response?.data || 'Login failed');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p className={message.includes('Welcome') ? 'success' : 'error'}>{message}</p>}
            {message.includes('Welcome') && (
                <button className="home-button">Go To Homepage</button>
            )}
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}

export default Login; 