import React, { useState } from 'react';
import AddResearchForm from './AddResearchForm';
import ViewListings from './ViewListings';

function Home({ user, onLogout }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showViewListings, setShowViewListings] = useState(false);
    const [trends, setTrends] = useState([]); // <-- new: state to hold fetched trends
    const [showTrends, setShowTrends] = useState(false); // <-- new: control trends visibility

    const fetchTrends = () => {
        fetch('http://localhost:8080/trends')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched trends:', data);
                setTrends(data);
                setShowTrends(true);
            })
            .catch(error => {
                console.error('Error fetching trends:', error);
            });
    };

    return (
        <div>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px'
            }}>
                <button onClick={onLogout} style={{
                    padding: '8px 16px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Log Out
                </button>
            </div>

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
                    }} onClick={() => setShowAddForm(true)}>
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

                <button
                    onClick={() => {
                        console.log('View Listings clicked');
                        setShowViewListings(true);
                        setShowTrends(false); // hide trends when viewing listings
                    }}
                    style={{
                        padding: '10px 20px',
                        margin: '10px',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    View Listings
                </button>

                <button
                    onClick={fetchTrends}
                    style={{
                        padding: '10px 20px',
                        margin: '10px',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Trends
                </button>
            </div>

            {/* Forms and Listings */}
            {showAddForm && <AddResearchForm onClose={() => setShowAddForm(false)} user={user} />}
            {showViewListings && (
                <ViewListings onClose={() => setShowViewListings(false)} />
            )}

            {/* Display Trends */}
            {showTrends && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Research Trends</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {trends.map((trend, index) => (
                            <li key={index} style={{
                                background: '#e0f7fa',
                                margin: '5px 0',
                                padding: '10px',
                                borderRadius: '5px'
                            }}>
                                {trend}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Home;
