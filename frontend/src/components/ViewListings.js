import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewListings({ onClose }) {
    const [listings, setListings] = useState([]);
    
    useEffect(() => {
        const fetchListings = async () => {
            try {
                console.log('Fetching listings...');
                const response = await axios.get('http://localhost:8080/api/research/all');
                console.log('Received listings:', response.data);
                setListings(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto'
        }}>
            <h2>Research Listings</h2>
            {listings.length === 0 ? (
                <p>No listings found</p>
            ) : (
                listings.map((listing) => (
                    <div key={listing.id} style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '4px'
                    }}>
                        <h3>{listing.project_name}</h3>
                        <p>Description: {listing.description}</p>
                        <p>Start Date: {listing.start_date}</p>
                        <p>Needs Students: {listing.needs_students ? 'Yes' : 'No'}</p>
                        <p>Needs Sponsors: {listing.needs_sponsors ? 'Yes' : 'No'}</p>
                    </div>
                ))
            )}
            <button onClick={onClose} style={{
                marginTop: '20px',
                padding: '8px 16px',
                backgroundColor: '#ddd',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>Close</button>
        </div>
    );
}

export default ViewListings; 