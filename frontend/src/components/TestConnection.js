import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestConnection() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/test/hello')
            .then(response => {
                setMessage(response.data);
                setError('');
            })
            .catch(err => {
                setError('Failed to connect to backend');
                console.error('Error:', err);
            });
    }, []);

    return (
        <div>
            <h2>Testing Backend Connection:</h2>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default TestConnection; 