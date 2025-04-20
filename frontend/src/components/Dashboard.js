import React, { useState } from 'react';
import AddListing from './AddListing';
import ViewListings from './ViewListings';
import EditListing from './EditListing';

function Dashboard({ userName, userRole }) {
    const [showAddListing, setShowAddListing] = useState(false);
    const [showViewListings, setShowViewListings] = useState(false);
    const [showEditListing, setShowEditListing] = useState(false);

    return (
        <div className="dashboard">
            <h1>Research Management System</h1>
            <h2>Welcome to Your Dashboard</h2>
            <p>Name: {userName}</p>
            <p>Role: {userRole}</p>

            <button 
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => setShowAddListing(true)}
            >
                Add Listing
            </button>

            <button 
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    backgroundColor: '#ffa726',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => setShowEditListing(true)}
            >
                Edit Listing
            </button>

            <button 
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    backgroundColor: '#0088cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => setShowViewListings(true)}
            >
                View Listings
            </button>

            <button 
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    backgroundColor: '#00bcd4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Trends
            </button>

            {showAddListing && <AddListing onClose={() => setShowAddListing(false)} />}
            {showViewListings && <ViewListings onClose={() => setShowViewListings(false)} />}
            {showEditListing && <EditListing onClose={() => setShowEditListing(false)} userId={3} />}
        </div>
    );
}

export default Dashboard; 