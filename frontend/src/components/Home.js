import React from 'react';

function Home({ user }) {
    return (
        <div>
            <h2>Welcome {user.name}</h2>
            <p>Status: {user.role}</p>
        </div>
    );
}

export default Home; 