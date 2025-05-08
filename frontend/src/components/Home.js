import React, { useState } from 'react';
import AddResearchForm from './AddResearchForm';
import ViewListings from './ViewListings';

function Home({ user, onLogout }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showViewListings, setShowViewListings] = useState(false);
    const [trends, setTrends] = useState([]);
    const [showTrends, setShowTrends] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchTrends = () => {
        fetch('http://localhost:8080/trends')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched trends:', data);
                // Expecting an array from backend
                if (Array.isArray(data)) {
                    setTrends(data);
                } else {
                    console.warn('Unexpected data format:', data);
                    setTrends([]); // fallback
                }
                setLastUpdated(new Date().toLocaleString());
                setShowTrends(true);
            })
            .catch(error => {
                console.error('Error fetching trends:', error);
                setTrends([]); // prevent crash
            });
    };     

    return (
        <div>
            {/* Log Out Button */}
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

            {/* Buttons */}
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
                        setShowTrends(false); // Hide trends if viewing listings
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

            {/* Add Listing Form */}
            {showAddForm && <AddResearchForm onClose={() => setShowAddForm(false)} user={user} />}

            {/* View Listings */}
            {showViewListings && (
                <ViewListings onClose={() => setShowViewListings(false)} />
            )}

            {/* Trends Section */}
            {showTrends && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Research Trends</h3>

                    {/* Last Updated Timestamp */}
                    {lastUpdated && (
                        <p style={{ fontSize: '14px', color: '#555', marginTop: '10px' }}>
                            🕒 Last Updated: {lastUpdated}
                        </p>
                    )}

                    {/* Trends List */}
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {Array.isArray(trends) && trends.map((trend, index) => (
                            <li key={index}>{trend}</li>
                        ))}
                        </ul>

                </div>
            )}
        </div>
    );
}

export default Home;
