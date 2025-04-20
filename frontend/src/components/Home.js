import React from 'react';

function Home({ user }) {
    return (
        <div className="home-page">
            <h2>Welcome to Your Dashboard</h2>
            <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
            
            <div style={{ marginTop: '20px' }}>
                {user.role === 'RESEARCHER' ? (
                    <button style={{
                        padding: '10px 20px',
                        margin: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        Add Listing
                    </button>
                ) : (
                    <div>
                        <button style={{
                            padding: '10px 20px',
                            margin: '10px',
                            backgroundColor: '#cccccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'not-allowed'
                        }} disabled>
                            Add Listing
                        </button>
                        <p style={{ color: 'red', fontSize: '14px' }}>
                            (Only Researchers Associated with the University can add listings)
                        </p>
                    </div>
                )}
                
                <button style={{
                    padding: '10px 20px',
                    margin: '10px',
                    backgroundColor: '#008CBA',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    View Listings
                </button>
                
                <button style={{
                    padding: '10px 20px',
                    margin: '10px',
                    backgroundColor: '#008CBA',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Trends
                </button>
            </div>
        </div>
    );
}

export default Home; 