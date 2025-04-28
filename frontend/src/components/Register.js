import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    // Define state variables using useState
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'STUDENT'
    });
    const [message, setMessage] = useState('');

    // Define handleSubmit inside the component
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            console.log('Response:', response);
            setMessage('Registration successful!');
        } catch (error) {
            console.error('Error details:', error.response || error);
            setMessage(`Registration failed: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div className="register-form">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
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
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="RESEARCHER">Researcher</option>
                        <option value="SPONSOR">Sponsor</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
        </div>
    );
}

export default Register; 