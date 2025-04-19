import React from 'react';

function Home({ user }) {
    return (
        <div className="home-page">
            <h2>Welcome to Your Dashboard</h2>
            <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
}

export default Home; 