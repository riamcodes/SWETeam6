import React, { useState } from 'react';
import AddResearchForm from './AddResearchForm';
import ViewListings from './ViewListings';

function Home({ user, onLogout }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showViewListings, setShowViewListings] = useState(false);

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
            {showAddForm && <AddResearchForm onClose={() => setShowAddForm(false)} user={user} />}
            {showViewListings && (
                <ViewListings onClose={() => setShowViewListings(false)} />
            )}
        </div>
    );
}

export default Home; 